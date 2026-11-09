import { disciplines, projectBySlug, projects, techLabels } from "./data.js";
import {
  disciplineLabel,
  disciplineLabels,
  esc,
  icon,
  linkAttrs,
  stackLabels,
  tag,
} from "./ui.js";

const searchInput = document.getElementById("project-search");
const filtersElement = document.getElementById("filters");
const listElement = document.getElementById("project-list");
const previewElement = document.getElementById("preview");
const emptyElement = document.getElementById("empty-state");
const resetButton = document.getElementById("reset-filters");
const resultNote = document.getElementById("result-note");
const layoutElement = document.querySelector(".work-layout");

const state = {
  query: "",
  discipline: "all",
  selected: null,
};

const normalize = (value) =>
  String(value)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "");

function searchableText(project) {
  return normalize(
    [
      project.title,
      project.description,
      project.category.join(" "),
      ...project.disciplines.map(disciplineLabel),
      ...project.techIcons.map((id) => techLabels[id] || id),
    ].join(" "),
  );
}

const searchIndex = new Map(projects.map((project) => [project.slug, searchableText(project)]));

function filteredProjects() {
  const query = normalize(state.query.trim());
  return projects.filter((project) => {
    const matchesDiscipline =
      state.discipline === "all" || project.disciplines.includes(state.discipline);
    const matchesQuery = !query || searchIndex.get(project.slug).includes(query);
    return matchesDiscipline && matchesQuery;
  });
}

function renderFilters() {
  const all = [
    { id: "all", label: "Semua", count: projects.length },
    ...disciplines.map((discipline) => ({
      ...discipline,
      count: projects.filter((project) => project.disciplines.includes(discipline.id)).length,
    })),
  ];

  filtersElement.innerHTML = all
    .filter((discipline) => discipline.id === "all" || discipline.count > 0)
    .map(
      (discipline) => `
        <button
          class="filter-btn"
          type="button"
          data-filter="${esc(discipline.id)}"
          aria-pressed="${state.discipline === discipline.id}">
          ${esc(discipline.label)} <span>${discipline.count}</span>
        </button>
      `,
    )
    .join("");
}

function syncFilterState() {
  filtersElement.querySelectorAll("[data-filter]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.filter === state.discipline));
  });
}

function renderPreview(project) {
  if (!project) {
    previewElement.innerHTML = "";
    return;
  }

  const disciplinesMarkup = project.disciplines
    .map((id, index) => tag(disciplineLabel(id), index === 0))
    .join("");
  const stackMarkup = project.techIcons.map((id) => tag(techLabels[id] || id)).join("");

  const demo = project.projectLink
    ? `<a class="btn btn-solid" href="${esc(project.projectLink)}"${linkAttrs(project.projectLink)}>${icon("external-link")} Demo</a>`
    : "";
  const repo = project.repoLink
    ? `<a class="btn btn-outline" href="${esc(project.repoLink)}"${linkAttrs(project.repoLink)}>${icon("code")} Repo</a>`
    : "";
  const links = demo || repo ? `<div class="preview-links">${demo}${repo}</div>` : "";

  previewElement.innerHTML = `
    <div class="preview-sticky">
      <div class="preview-image">
        <img src="${esc(project.thumb)}" alt="Cuplikan ${esc(project.title)}" decoding="async">
      </div>
      <div>
        <p class="preview-kicker">Karya ${String(project.index).padStart(2, "0")} dari ${projects.length}</p>
        <h2 class="preview-title">${esc(project.title)}</h2>
        <p class="preview-desc">${esc(project.description)}</p>
        <div class="preview-tags">${disciplinesMarkup}${stackMarkup}</div>
        ${links}
      </div>
    </div>
  `;
}

function renderList(items) {
  listElement.innerHTML = items
    .map(
      (project) => `
        <a
          class="work-row${project.slug === state.selected ? " is-selected" : ""}"
          href="#${esc(project.slug)}"
          data-slug="${esc(project.slug)}">
          <span class="row-no">${String(project.index).padStart(2, "0")}</span>
          <span class="row-body">
            <span class="row-title">${esc(project.title)}</span>
            <span class="row-desc">${esc(project.description)}</span>
          </span>
          <span class="row-meta">
            ${esc(disciplineLabels(project))}
            <span class="row-stack">${esc(stackLabels(project))}</span>
          </span>
        </a>
      `,
    )
    .join("");
}

function setSelected(slug, { updateUrl = true } = {}) {
  const project = projectBySlug[slug];
  if (!project) return;
  state.selected = slug;
  listElement.querySelectorAll(".work-row").forEach((row) => {
    row.classList.toggle("is-selected", row.dataset.slug === slug);
  });
  renderPreview(project);
  if (updateUrl) {
    const url = new URL(window.location.href);
    url.hash = slug;
    window.history.replaceState(null, "", url);
  }
}

function syncUrl() {
  const url = new URL(window.location.href);
  if (state.query.trim()) {
    url.searchParams.set("q", state.query.trim());
  } else {
    url.searchParams.delete("q");
  }
  if (state.discipline !== "all") {
    url.searchParams.set("discipline", state.discipline);
  } else {
    url.searchParams.delete("discipline");
  }
  if (state.selected) {
    url.hash = state.selected;
  } else {
    url.hash = "";
  }
  window.history.replaceState(null, "", url);
}

function render() {
  const items = filteredProjects();
  const label = items.length === projects.length ? `${projects.length} karya dalam katalog.` : `${items.length} karya ditemukan.`;
  resultNote.textContent = label;

  if (!items.length) {
    state.selected = null;
    listElement.innerHTML = "";
    previewElement.innerHTML = "";
    layoutElement.hidden = true;
    emptyElement.hidden = false;
    syncFilterState();
    syncUrl();
    return;
  }

  layoutElement.hidden = false;
  emptyElement.hidden = true;

  if (!items.some((project) => project.slug === state.selected)) {
    state.selected = items[0].slug;
  }

  renderList(items);
  syncFilterState();
  setSelected(state.selected, { updateUrl: false });
  syncUrl();
}

function applyInitialState() {
  const params = new URLSearchParams(window.location.search);
  state.query = params.get("q") || "";
  const requestedDiscipline = params.get("discipline") || "all";
  state.discipline = disciplines.some((discipline) => discipline.id === requestedDiscipline)
    ? requestedDiscipline
    : "all";

  const hash = window.location.hash.replace("#", "");
  if (hash && projectBySlug[hash]) {
    state.selected = hash;
  }

  searchInput.value = state.query;
  renderFilters();
  render();
}

filtersElement.addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  state.discipline = button.dataset.filter;
  render();
});

let searchTimer;
searchInput.addEventListener("input", () => {
  window.clearTimeout(searchTimer);
  searchTimer = window.setTimeout(() => {
    state.query = searchInput.value;
    render();
  }, 80);
});

listElement.addEventListener("click", (event) => {
  const row = event.target.closest(".work-row");
  if (!row) return;
  event.preventDefault();
  setSelected(row.dataset.slug);
});

listElement.addEventListener("focusin", (event) => {
  const row = event.target.closest(".work-row");
  if (!row) return;
  setSelected(row.dataset.slug);
});

resetButton.addEventListener("click", () => {
  state.query = "";
  state.discipline = "all";
  searchInput.value = "";
  render();
  searchInput.focus();
});

window.addEventListener("hashchange", () => {
  const slug = window.location.hash.replace("#", "");
  if (projectBySlug[slug]) setSelected(slug, { updateUrl: false });
});

applyInitialState();
