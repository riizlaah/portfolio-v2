import { disciplineById, techLabels } from "./data.js";

export function icon(name, className = "icon") {
  return `<svg class="${className}" aria-hidden="true"><use href="assets/icons.svg#${name}"></use></svg>`;
}

export function esc(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return map[character];
  });
}

export function disciplineLabel(id) {
  return disciplineById[id]?.label || id;
}

export function disciplineLabels(project, separator = ", ") {
  return project.disciplines.map(disciplineLabel).join(separator);
}

export function stackLabels(project, separator = ", ") {
  return project.techIcons.map((id) => techLabels[id] || id).join(separator);
}

export function primaryLink(project) {
  return project.projectLink || project.repoLink || null;
}

export function linkAttrs(url) {
  return url ? ' target="_blank" rel="noopener noreferrer"' : "";
}

export function linkIcon(url, label, iconName, className = "btn btn-outline") {
  if (!url) return "";
  return `<a class="${className}" href="${esc(url)}"${linkAttrs(url)}>${icon(iconName)}${esc(label)}</a>`;
}

export function tag(text, accent = false) {
  return `<span class="tag${accent ? " tag-accent" : ""}">${esc(text)}</span>`;
}
