import {
  experienceSince,
  formatExperience,
  formatMonthYear,
  statusLabels,
  techGroups,
  techStacks,
} from "./data.js";
import { esc } from "./ui.js";

const container = document.getElementById("tech-timeline");
const now = new Date();
const yearStart = Math.min(...techStacks.map((tech) => tech.year));
const yearEnd = Math.max(now.getFullYear(), ...techStacks.map((tech) => tech.year));
const totalYears = yearEnd - yearStart + 1;
const years = Array.from({ length: totalYears }, (_, index) => yearStart + index);
const endPosition =
  ((yearEnd - yearStart + (now.getMonth() + 1) / 12) / totalYears) * 100;

document.querySelectorAll('[data-count="tools"]').forEach((node) => {
  node.textContent = String(techStacks.length);
});

function positionOf(year, month) {
  return ((year - yearStart + (month - 1) / 12) / totalYears) * 100;
}

function barFor(tech) {
  const start = positionOf(tech.year, tech.month);
  const end = Math.min(endPosition, 100);
  const width = Math.max(end - start, 1.2);
  return { left: start, width };
}

function renderAxis() {
  return `
    <div class="tech-axis" style="--years:${totalYears}">
      <span aria-hidden="true"></span>
      <div class="tech-axis-years" aria-hidden="true">
        ${years.map((year) => `<span>${year}</span>`).join("")}
      </div>
      <span aria-hidden="true"></span>
    </div>
  `;
}

function renderTech(tech) {
  const experience = experienceSince(tech.year, tech.month, now);
  const duration = formatExperience(experience.years, experience.months);
  const bar = barFor(tech);
  const beginner = tech.status === "beginner";

  return `
    <div class="tech-row">
      <div class="tech-label">
        <img src="assets/icons/${esc(tech.icon)}.png" alt="" width="20" height="20" loading="lazy" decoding="async">
        <div>
          <span class="tech-name">${esc(tech.name)}</span>
          <span class="tech-status${beginner ? " tech-status--beginner" : ""}">${esc(statusLabels[tech.status] || tech.status)}</span>
        </div>
      </div>
      <div class="tech-track" style="--years:${totalYears}">
        <span class="tech-bar${beginner ? " tech-bar--beginner" : ""}" style="left:${bar.left.toFixed(2)}%; width:${bar.width.toFixed(2)}%"></span>
      </div>
      <span class="tech-duration">${esc(duration)}</span>
      <span class="tech-mobile">Sejak ${esc(formatMonthYear(tech.year, tech.month))}, ${esc(duration)}.</span>
    </div>
  `;
}

container.innerHTML = `
  ${renderAxis()}
  ${techGroups
    .map((group) => {
      const tools = techStacks.filter((tech) => tech.group === group.id);
      if (!tools.length) return "";
      return `
        <section class="tech-group" aria-labelledby="group-${esc(group.id)}">
          <h2 class="tech-group-title" id="group-${esc(group.id)}">${esc(group.label)}</h2>
          <div class="tech-rows">
            ${tools.map(renderTech).join("")}
          </div>
        </section>
      `;
    })
    .join("")}
`;
