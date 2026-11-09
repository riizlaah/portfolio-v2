import { achievementYears, featured, formatMonth, projectBySlug, projects, techStacks } from "./data.js";
import { disciplineLabels, esc, icon, primaryLink, stackLabels } from "./ui.js";

const featuredList = document.getElementById("featured-list");

if (featuredList) {
  featuredList.innerHTML = featured
    .slice(0, 3)
    .map((item, position) => {
      const project = projectBySlug[item.slug];
      if (!project) return "";
      return `
        <a class="feature-row" href="projects.html#${esc(project.slug)}">
          <span class="feature-index">${String(position + 1).padStart(2, "0")}</span>
          <span class="feature-thumb">
            <img src="${esc(project.thumb)}" alt="Cuplikan ${esc(project.title)}" loading="lazy" decoding="async">
          </span>
          <span class="feature-body">
            <span class="feature-title">${esc(project.title)}</span>
            <span class="feature-note">${esc(item.note)}</span>
            <span class="feature-tags">${esc(disciplineLabels(project))} — ${esc(stackLabels(project))}</span>
          </span>
          <span class="feature-arrow" aria-hidden="true">${icon("arrow-up-right")}</span>
        </a>
      `;
    })
    .join("");
}

const achievementList = document.getElementById("achievement-years");

function achievementHtml(item) {
  const media = item.certificate
    ? `
      <figure class="achievement-media">
        <a class="achievement-cert" href="${esc(item.certificate)}" target="_blank" rel="noopener noreferrer" aria-label="Buka ${esc(item.certificateAlt)}">
          <img src="${esc(item.certificate)}" alt="${esc(item.certificateAlt)}" width="1404" height="635" loading="lazy" decoding="async">
        </a>
        <figcaption>Sertifikat</figcaption>
      </figure>
    `
    : "";

  const link = item.link
    ? `<a class="achievement-link" href="${esc(item.link)}" target="_blank" rel="noopener noreferrer">${esc(item.linkLabel)} ${icon("arrow-up-right")}</a>`
    : "";

  return `
    <article class="achievement-item${item.certificate ? "" : " achievement-item--text"}">
      <div class="achievement-body">
        <p class="achievement-meta"><span>${esc(item.type)}</span><span>${esc(formatMonth(item.month))}</span></p>
        <h3 class="achievement-result">${esc(item.result)}</h3>
        <p class="achievement-event">${esc(item.event)}</p>
        <p class="achievement-detail">${esc(item.detail)}</p>
        <p class="achievement-note">${esc(item.note)}</p>
        ${link}
      </div>
      ${media}
    </article>
  `;
}

if (achievementList) {
  achievementList.innerHTML = achievementYears
    .map(
      ({ year, items }) => `
        <section class="achievement-year" aria-label="Pencapaian ${year}">
          <header class="achievement-year-head">
            <span class="achievement-year-label">${year}</span>
            <span class="achievement-year-count">${items.length} catatan</span>
          </header>
          <div class="achievement-list">${items.map(achievementHtml).join("")}</div>
        </section>
      `,
    )
    .join("");
}

document.querySelectorAll('[data-count="projects"]').forEach((node) => {
  node.textContent = String(projects.length);
});

document.querySelectorAll('[data-count="tools"]').forEach((node) => {
  node.textContent = String(techStacks.length);
});

const firstFeatured = projectBySlug[featured[0]?.slug];
if (firstFeatured && firstFeatured.projectLink) {
  const heroAwardLink = document.getElementById("hero-award-link");
  if (heroAwardLink) {
    heroAwardLink.href = firstFeatured.projectLink;
    heroAwardLink.target = "_blank";
    heroAwardLink.rel = "noopener noreferrer";
  }
}
