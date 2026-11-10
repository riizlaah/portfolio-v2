import {
  achievementYears,
  disciplines,
  experienceSince,
  featured,
  formatExperience,
  formatMonth,
  projectBySlug,
  projects,
  profile,
  shortUrl,
  statusLabels,
  techGroups,
  techStacks,
} from "./data.js";
import { disciplineLabel, disciplineLabels, esc, icon, stackLabels } from "./ui.js";

const now = new Date();
const yearEnd = Math.max(now.getFullYear(), ...techStacks.map((tech) => tech.year));
const yearStart = Math.min(...techStacks.map((tech) => tech.year));
const totalYears = yearEnd - yearStart + 1;
const years = Array.from({ length: totalYears }, (_, index) => yearStart + index);
const endPosition =
  ((yearEnd - yearStart + (now.getMonth() + 1) / 12) / totalYears) * 100;

const exportDateLabel = new Intl.DateTimeFormat("id-ID", {
  day: "2-digit",
  month: "short",
  year: "numeric",
}).format(now);

const pages = [];
const sectionPages = {};

function addPage(content, options = {}) {
  pages.push({ content, ...options });
  return pages.length;
}

function chunk(items, size) {
  const result = [];
  for (let index = 0; index < items.length; index += size) {
    result.push(items.slice(index, index + size));
  }
  return result;
}

function printHeader(section) {
  return `
    <header class="print-header">
      <strong>${esc(section)}</strong>
      <span>Naf'an Rizkilah, Katalog Kerja 2022—${yearEnd}</span>
    </header>
  `;
}

function pageFooter(page, pageNo, total) {
  return `
    <footer class="sheet-footer">
      <strong>Naf'an Rizkilah</strong>
      <span>${esc(page.section || "")}</span>
      <span class="sheet-page-no">${String(pageNo).padStart(2, "0")} / ${String(total).padStart(2, "0")}</span>
    </footer>
  `;
}

function renderSheet(page, pageNo, total) {
  if (page.cover) {
    return `<section class="sheet sheet-cover" aria-label="Cover">${page.content}</section>`;
  }

  if (page.back) {
    return `<section class="sheet sheet-back-cover" aria-label="Kontak dan penutup">${page.content}</section>`;
  }

  return `
    <section class="sheet" aria-label="Halaman ${pageNo}">
      <div class="sheet-inner">
        ${page.content}
      </div>
      ${pageFooter(page, pageNo, total)}
    </section>
  `;
}

function coverHtml() {
  const [firstName, ...restName] = profile.name.split(" ");
  return `
    <div class="sheet-inner">
      <div class="cover-top">
        <div class="brand-mark brand-mark--large cover-mark" aria-hidden="true">
          <span></span><span></span><span></span><span></span>
        </div>
        <div class="cover-meta">Katalog kerja<br>2022—${yearEnd}</div>
      </div>

      <div class="cover-grid">
        <div>
          <h1 class="cover-title">${esc(firstName)}<br>${esc(restName.join(" "))}</h1>
          <p class="cover-role">Full Stack &amp; Game Developer. Web, game, desktop, Android, dan REST API.</p>
        </div>
        <figure class="cover-photo">
          <img src="assets/opt/me-print.jpg" alt="Potret Naf'an Rizkilah">
          <figcaption>Naf'an Rizkilah, Indonesia.</figcaption>
        </figure>
      </div>

      <div class="cover-bottom">
        <div class="cover-award">
          <svg class="icon" style="width:5mm;height:5mm" aria-hidden="true"><use href="assets/icons.svg#award"></use></svg>
          <span><strong>Medal of Excellence</strong> · LKS Nasional 2026<br><strong>Juara 1</strong> · IGW Game Jam 2025</span>
        </div>
        <div class="cover-discs">
          <span>Web</span><span>Game</span>
          <span>Desktop</span><span>Android</span>
          <span>REST API</span><span>Software Design</span>
        </div>
      </div>
    </div>
  `;
}

function tocHtml() {
  return `
    ${printHeader("Daftar isi")}
    <div class="print-content print-content--flex">
      <p class="print-kicker">Dokumen</p>
      <h1 class="print-title">Daftar Isi</h1>
      <div class="toc-list" id="toc-list"></div>
    </div>
  `;
}

const disciplineCounts = disciplines
  .map((discipline) => ({
    ...discipline,
    count: projects.filter((project) => project.disciplines.includes(discipline.id)).length,
  }))
  .filter((discipline) => discipline.count > 0);

function profileHtml() {
  return `
    ${printHeader("Profil")}
    <div class="print-content">
      <p class="print-kicker">Profil</p>
      <h1 class="print-title">Tentang saya</h1>

      <div class="print-profile-grid">
        <figure class="print-profile-photo">
          <img src="assets/opt/me-print.jpg" alt="Potret Naf'an Rizkilah">
          <figcaption>Naf'an Rizkilah, Indonesia.</figcaption>
        </figure>

        <div>
          <div class="print-body">
            ${profile.bio.map((paragraph) => `<p>${esc(paragraph)}</p>`).join("")}
          </div>

          <div class="print-focus">
            <p class="print-focus-title">Fokus saat ini</p>
            <div class="print-focus-list">
              ${profile.focus.map((item) => `<span class="print-tag">${esc(item)}</span>`).join("")}
            </div>
          </div>

          <dl class="print-facts">
            <div class="print-fact"><dt>Sejak</dt><dd>2022</dd></div>
            <div class="print-fact"><dt>Proyek</dt><dd>${projects.length}</dd></div>
            <div class="print-fact"><dt>Tool</dt><dd>${techStacks.length}</dd></div>
            <div class="print-fact"><dt>Lokasi</dt><dd>Indonesia</dd></div>
            <div class="print-fact"><dt>Penghargaan</dt><dd>Medal of Excellence — LKS Nasional 2026</dd></div>
            <div class="print-fact"><dt>Bidang</dt><dd>Web, game, desktop, Android, API</dd></div>
          </dl>

          <div class="print-disciplines">
            <p class="print-focus-title">Karya per bidang</p>
            <div class="print-discipline-grid">
              ${disciplineCounts
                .map(
                  (discipline) => `
                    <div class="print-discipline">
                      <strong>${String(discipline.count).padStart(2, "0")}</strong>
                      <span>${esc(discipline.label)}</span>
                    </div>
                  `,
                )
                .join("")}
            </div>
          </div>

          <div class="print-contact-mini">
            <span>${esc(profile.email)}</span>
            <span>${esc(profile.phone)}</span>
            <span>${esc(shortUrl(profile.links.github))}</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function printAchievement(item) {
  const link = item.link
    ? `<a class="print-achievement-link" href="${esc(item.link)}">${esc(item.linkLabel)}, ${esc(shortUrl(item.link))}</a>`
    : "";

  const media = item.certificate
    ? `
      <figure class="print-achievement-media">
        <img src="${esc(item.certificate)}" alt="${esc(item.certificateAlt)}">
        <figcaption>Sertifikat</figcaption>
      </figure>
    `
    : "";

  return `
    <article class="print-achievement${item.certificate ? "" : " print-achievement--text"}">
      <p class="print-achievement-meta">${esc(item.type)} · ${esc(formatMonth(item.month))}</p>
      <h2 class="print-achievement-result">${esc(item.result)}</h2>
      <p class="print-achievement-event">${esc(item.event)}</p>
      <p class="print-achievement-detail">${esc(item.detail)}</p>
      <p class="print-achievement-note">${esc(item.note)}</p>
      ${link}
      ${media}
    </article>
  `;
}

function achievementsHtml() {
  return `
    ${printHeader("Pencapaian")}
    <div class="print-content">
      <p class="print-kicker">Rekam jejak</p>
      <h1 class="print-title">Pencapaian</h1>
      <p class="print-body print-achievements-intro">Empat catatan dari kompetisi dan kursus, disusun dari yang terbaru. Pratinjau sertifikat sudah disamarkan pada nomor sensitif.</p>

      <div class="print-achievement-years">
        ${achievementYears
          .map(
            ({ year, items }) => `
              <section class="print-achievement-year" aria-label="Pencapaian ${year}">
                <header class="print-achievement-year-head">
                  <h2 class="print-achievement-year-label">${year}</h2>
                  <span>${items.length} catatan</span>
                </header>
                ${items.map(printAchievement).join("")}
              </section>
            `,
          )
          .join("")}
      </div>
    </div>
  `;
}

function printTechRow(tech) {
  const start = ((tech.year - yearStart + (tech.month - 1) / 12) / totalYears) * 100;
  const width = Math.max(endPosition - start, 1.2);
  const experience = experienceSince(tech.year, tech.month, now);
  const duration = formatExperience(experience.years, experience.months);
  const beginner = tech.status === "beginner";

  return `
    <div class="print-tech-row">
      <div class="print-tech-name">
        <img src="assets/icons/${esc(tech.icon)}.png" alt="" width="16" height="16">
        <span>${esc(tech.name)}</span>
        <span class="print-tech-status">${esc(statusLabels[tech.status] || tech.status)}</span>
      </div>
      <div class="print-tech-track" style="--years:${totalYears}">
        <span class="print-tech-bar${beginner ? " print-tech-bar--beginner" : ""}" style="left:${start.toFixed(2)}%;width:${width.toFixed(2)}%"></span>
      </div>
      <span class="print-tech-duration">${esc(duration)}</span>
    </div>
  `;
}

function capabilitiesHtml() {
  return `
    ${printHeader("Tools")}
    <div class="print-content">
      <p class="print-kicker">Tools</p>
      <h1 class="print-title">Tools &amp; pengalaman</h1>
      <p class="print-body" style="margin-top:4mm;max-width:70ch">Panjang batang menunjukkan lama pemakaian, bukan tingkat keahlian. Garis vertikal menandai awal tahun.</p>

      <div class="print-tech-axis" style="--years:${totalYears}">
        <span></span>
        <div class="print-tech-axis-years">
          ${years.map((year) => `<span>${year}</span>`).join("")}
        </div>
        <span></span>
      </div>

      ${techGroups
        .map((group) => {
          const tools = techStacks.filter((tech) => tech.group === group.id);
          if (!tools.length) return "";
          return `
            <div class="print-tech-group">
              <h2 class="print-tech-group-title">${esc(group.label)}</h2>
              ${tools.map(printTechRow).join("")}
            </div>
          `;
        })
        .join("")}

      <p class="print-body" style="margin-top:5mm;font-size:8pt;color:color-mix(in srgb, var(--color-ink) 55%, transparent)">Tingkat kemampuan adalah penilaian sendiri, bukan sertifikasi.</p>
    </div>
  `;
}

function featureHtml(item, position) {
  const project = projectBySlug[item.slug];
  const meta = [
    ...project.disciplines.map(disciplineLabel),
    ...project.techIcons.map((id) => stackLabels({ techIcons: [id] })),
  ];

  const links = [];
  if (project.projectLink) {
    links.push(
      `<div><span>Demo</span><a href="${esc(project.projectLink)}">${esc(shortUrl(project.projectLink))}</a></div>`,
    );
  }
  if (project.repoLink) {
    links.push(
      `<div><span>Repo</span><a href="${esc(project.repoLink)}">${esc(shortUrl(project.repoLink))}</a></div>`,
    );
  }

  const isGame = project.disciplines.includes("game");

  return `
    ${printHeader(`Karya pilihan ${position + 1} dari ${featured.length}`)}
    <div class="print-content print-feature">
      <h1 class="print-feature-title">${esc(project.title)}</h1>
      <div class="print-feature-image">
        <img src="${esc(project.full)}" alt="Cuplikan ${esc(project.title)}"${isGame ? ' style="image-rendering:pixelated"' : ""}>
      </div>
      <div class="print-feature-meta">
        ${meta.map((value) => `<span class="print-tag">${esc(value)}</span>`).join("")}
      </div>
      <p class="print-feature-desc">${esc(project.description)}</p>
      <p class="print-feature-note">${esc(item.note)}</p>
      <div class="print-feature-links">${links.join("")}</div>
    </div>
  `;
}

function indexItem(project) {
  const stack = stackLabels(project);
  const meta = stack ? `${disciplineLabels(project)}, ${stack}` : disciplineLabels(project);
  const link = project.projectLink || project.repoLink;

  return `
    <div class="print-index-item">
      <div class="print-index-no">${String(project.index).padStart(2, "0")}</div>
      <div class="print-index-title">${esc(project.title)}</div>
      <div class="print-index-meta">${esc(meta)}</div>
      <p class="print-index-desc">${esc(project.description)}</p>
      ${link ? `<a class="print-index-link" href="${esc(link)}">${esc(shortUrl(link))}</a>` : ""}
    </div>
  `;
}

function indexHtml(items, pageIndex, totalPages) {
  return `
    ${printHeader("Indeks karya")}
    <div class="print-content">
      <div style="display:flex;align-items:baseline;justify-content:space-between;gap:8mm">
        <div>
          <p class="print-kicker">Indeks</p>
          <h1 class="print-title">Karya</h1>
        </div>
        <span class="print-body" style="font-size:8pt">${projects.length} karya, halaman ${pageIndex + 1} dari ${totalPages}</span>
      </div>
      <div class="print-index">
        ${items.map(indexItem).join("")}
      </div>
    </div>
  `;
}

function backCoverHtml() {
  return `
    <div class="sheet-inner">
      <div class="back-cover-top">
        <div class="brand-mark brand-mark--large cover-mark" aria-hidden="true">
          <span></span><span></span><span></span><span></span>
        </div>
        <div class="cover-meta">Katalog kerja<br>2022—${yearEnd}</div>
      </div>

      <div class="back-cover-body">
        <h1 class="back-cover-title">Mari<br>berbincang.</h1>
        <p class="back-cover-lede">Untuk pertanyaan atau kerja sama, hubungi saya.</p>

        <div class="back-cover-contact">
          <a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>
          <a href="tel:${esc(profile.phoneHref)}">${esc(profile.phone)}</a>
        </div>

        <div class="back-cover-social">
          <a href="${esc(profile.links.github)}">GitHub, ${esc(shortUrl(profile.links.github))}</a>
          <a href="${esc(profile.links.instagram)}">Instagram, ${esc(shortUrl(profile.links.instagram))}</a>
          <a href="${esc(profile.links.facebook)}">Facebook, ${esc(shortUrl(profile.links.facebook))}</a>
        </div>
      </div>

      <div class="back-cover-bottom">
        <span>© ${yearEnd} Naf'an Rizkilah</span>
        <span>Diekspor pada ${esc(exportDateLabel)}</span>
      </div>
    </div>
  `;
}

sectionPages.cover = addPage(coverHtml(), { cover: true });
sectionPages.toc = addPage(tocHtml(), { section: "Daftar isi" });
sectionPages.profile = addPage(profileHtml(), { section: "Profil" });
sectionPages.achievements = addPage(achievementsHtml(), { section: "Pencapaian" });
sectionPages.capabilities = addPage(capabilitiesHtml(), { section: "Tools" });

sectionPages.featured = pages.length + 1;
featured.forEach((item, index) => {
  addPage(featureHtml(item, index), { section: `Karya pilihan ${index + 1}` });
});

sectionPages.index = pages.length + 1;
const indexChunks = chunk(projects, 11);
indexChunks.forEach((items, index) => {
  addPage(indexHtml(items, index, indexChunks.length), { section: "Indeks karya" });
});

sectionPages.contact = pages.length + 1;
addPage(backCoverHtml(), { back: true });

const stage = document.getElementById("print-stage");
stage.innerHTML = pages
  .map((page, index) => renderSheet(page, index + 1, pages.length))
  .join("");

function toastToc() {
  const tocList = document.getElementById("toc-list");
  if (!tocList) return;

  const entries = [
    { label: "Profil", page: sectionPages.profile },
    { label: "Pencapaian", page: sectionPages.achievements },
    { label: "Tools & pengalaman", page: sectionPages.capabilities },
    { label: "Karya pilihan", page: sectionPages.featured },
    ...featured.map((item, index) => ({
      label: projectBySlug[item.slug].title,
      page: sectionPages.featured + index,
      sub: true,
    })),
    { label: "Indeks karya", page: sectionPages.index },
    ...indexChunks.map((items, index) => ({
      label: `Karya ${String(items[0].index).padStart(2, "0")}—${String(items[items.length - 1].index).padStart(2, "0")}`,
      page: sectionPages.index + index,
      sub: true,
    })),
    { label: "Kontak", page: sectionPages.contact },
  ];

  tocList.innerHTML = entries
    .map(
      (entry) => `
        <div class="toc-item${entry.sub ? " toc-sub" : ""}">
          <span class="toc-label">${esc(entry.label)}</span>
          <span class="toc-dots" aria-hidden="true"></span>
          <span class="toc-page">${String(entry.page).padStart(2, "0")}</span>
        </div>
      `,
    )
    .join("");
}

toastToc();

const printButton = document.getElementById("print-btn");
const printHint = document.getElementById("print-hint");
printHint.textContent = `${pages.length} halaman A4. Margin None, scale 100%, background graphics ON.`;

async function waitForImages() {
  await document.fonts.ready;
  const images = Array.from(document.images);
  await Promise.all(
    images.map(
      (image) =>
        new Promise((resolve) => {
          if (image.complete) {
            resolve();
            return;
          }
          image.addEventListener("load", resolve, { once: true });
          image.addEventListener("error", resolve, { once: true });
        }),
    ),
  );
}

waitForImages().then(() => {
  printButton.disabled = false;
  printButton.innerHTML = `${icon("print")} Cetak / Simpan PDF`;
  if (new URLSearchParams(window.location.search).has("print")) {
    window.setTimeout(() => window.print(), 450);
  }
});

printButton.addEventListener("click", () => {
  window.print();
});
