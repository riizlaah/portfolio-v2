export const profile = {
  name: "Naf'an Rizkilah",
  role: "Full Stack & Game Developer",
  location: "Indonesia",
  since: 2022,
  email: "nafan.rizkilah@gmail.com",
  phone: "+62 813 3197 6307",
  phoneHref: "+6281331976307",
  links: {
    github: "https://github.com/riizlaah",
    instagram: "https://www.instagram.com/nafanrizkilah/",
    facebook: "https://web.facebook.com/nafan.rizkilah",
  },
  bio: [
    "Saya Naf'an Rizkilah, pengembang perangkat lunak asal Indonesia. Sejak 2022 saya membangun aplikasi web, game, aplikasi desktop, aplikasi Android, dan REST API.",
    "Sebagian besar pekerjaan saya berangkat dari masalah operasional sehari-hari: manajemen laundry, parkir, restoran, klinik, hotel, sampai tagihan air PDAM. Di sisi lain, saya juga membuat game dan aset visualnya.",
    "Fokus saya saat ini adalah .NET dan Jetpack Compose. Saya senang membuat sistem yang rapi di belakang layar dan antarmuka yang jelas dipakai orang.",
  ],
  focus: [".NET", "Jetpack Compose", "REST API"],
};

export const disciplines = [
  { id: "web", label: "Web" },
  { id: "game", label: "Game" },
  { id: "desktop", label: "Desktop" },
  { id: "android", label: "Android" },
  { id: "rest-api", label: "REST API" },
  { id: "software-design", label: "Software Design" },
  { id: "other", label: "Lainnya" },
];

const disciplineIds = {
  web: "web",
  game: "game",
  desktop: "desktop",
  android: "android",
  "REST API": "rest-api",
  "software design": "software-design",
  other: "other",
};

export const techLabels = {
  php: "PHP",
  laravel: "Laravel",
  js: "JavaScript",
  database: "MySQL",
  godot: "Godot",
  blender: "Blender",
  gimp: "GIMP",
  audacity: "Audacity",
  aseprite: "Aseprite",
  python: "Python",
  "c-sharp": "C#",
  dotnet: ".NET",
  android: "Android",
  kotlin: "Kotlin",
  "jetpack-compose": "Jetpack Compose",
};

export const techGroups = [
  { id: "web", label: "Web" },
  { id: "game", label: "Game & aset" },
  { id: "app", label: "Desktop, Android & API" },
  { id: "tools", label: "Skrip & lingkungan" },
];

export const techStacks = [
  { name: "PHP", icon: "php", group: "web", year: 2022, month: 7, status: "intermediate" },
  { name: "JavaScript", icon: "js", group: "web", year: 2022, month: 11, status: "intermediate" },
  { name: "MySQL & MariaDB", icon: "database", group: "web", year: 2022, month: 12, status: "intermediate" },
  { name: "Laravel", icon: "laravel", group: "web", year: 2023, month: 2, status: "intermediate" },
  { name: "Godot & GDScript", icon: "godot", group: "game", year: 2023, month: 8, status: "intermediate" },
  { name: "Blender", icon: "blender", group: "game", year: 2024, month: 2, status: "beginner" },
  { name: "GIMP", icon: "gimp", group: "game", year: 2024, month: 4, status: "beginner" },
  { name: "Audacity", icon: "audacity", group: "game", year: 2024, month: 7, status: "beginner" },
  { name: "Aseprite", icon: "aseprite", group: "game", year: 2025, month: 7, status: "beginner" },
  { name: "C#", icon: "c-sharp", group: "app", year: 2026, month: 1, status: "beginner" },
  { name: ".NET, WinForms, ASP & EF", icon: "dotnet", group: "app", year: 2026, month: 1, status: "beginner" },
  { name: "Kotlin", icon: "kotlin", group: "app", year: 2026, month: 2, status: "beginner" },
  { name: "Jetpack Compose", icon: "jetpack-compose", group: "app", year: 2026, month: 2, status: "beginner" },
  { name: "Android", icon: "android", group: "app", year: 2026, month: 2, status: "beginner" },
  { name: "Python", icon: "python", group: "tools", year: 2023, month: 6, status: "intermediate" },
  { name: "Linux", icon: "linux", group: "tools", year: 2024, month: 1, status: "beginner" },
];

function slugify(value) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const rawProjects = [
  {
    title: "Hekerd",
    description: "Web untuk blogging dan kuis sederhana.",
    image: "hekerd.png",
    category: ["web"],
    techIcons: ["php", "laravel", "js", "database"],
    projectLink: "https://hekerd.eu.org",
    repoLink: null,
  },
  {
    title: "Loquas",
    description: "Game shooter yang unik dengan fitur yang cukup banyak.",
    image: "loquas.png",
    category: ["game"],
    techIcons: ["godot", "blender", "gimp", "audacity"],
    projectLink: "https://riizlaah.itch.io/loquas",
    repoLink: null,
  },
  {
    title: "Kuarkers",
    description: "Game absurd tanpa tujuan dan hampir open world.",
    image: "kuarkers.png",
    category: ["game"],
    techIcons: ["godot", "blender", "gimp", "audacity"],
    projectLink: null,
    repoLink: "https://github.com/riizlaah/kuarkers-g",
  },
  {
    title: "Infiroad",
    description: "Game racing 2D tanpa garis finish dengan jalan yang dihasilkan secara prosedural dan gaya pixel.",
    image: "infiroad.png",
    category: ["game"],
    techIcons: ["godot", "aseprite"],
    projectLink: "https://riizlaah.itch.io/infiroad",
    repoLink: null,
  },
  {
    title: "Grad Gen",
    description: "Tools untuk menghasilkan koleksi gradien yang bisa diekspor menjadi tekstur PNG.",
    image: "grad-gen.png",
    category: ["other"],
    techIcons: ["godot"],
    projectLink: null,
    repoLink: "https://github.com/riizlaah/grad-gen",
  },
  {
    title: "Bajaj Bercerita",
    description: "Game yang menceritakan bagian kecil kehidupan seorang supir bajaj. Memenangkan juara 1 IGW Game Jam 2025.",
    image: "bajaj-bercerita.png",
    category: ["game"],
    techIcons: ["godot", "aseprite"],
    projectLink: "https://riizlaah.itch.io/bajaj-bercerita",
    repoLink: "https://github.com/riizlaah/bajaj-bercerita",
  },
  {
    title: "Masked Work",
    description: "Game tentang cerita seorang budak di perusahaan gelap.",
    image: "masked-work.png",
    category: ["game"],
    techIcons: ["godot", "aseprite"],
    projectLink: "https://riizlaah.itch.io/masked-work",
    repoLink: "https://github.com/riizlaah/masked-work",
  },
  {
    title: "MonggoDB",
    description: "Database berbasis file JSON, plesetan dari MongoDB.",
    image: "monggodb.png",
    category: ["other"],
    techIcons: ["python"],
    projectLink: null,
    repoLink: "https://github.com/riizlaah/monggodb",
  },
  {
    title: "Bank Sederhana",
    description: "Aplikasi bank sederhana dengan tampilan CLI.",
    image: "bank-sederhana.png",
    category: ["other"],
    techIcons: ["python"],
    projectLink: "https://gist.github.com/riizlaah/dc1d6c0547038cce3f787df02f4ce721",
    repoLink: null,
  },
  {
    title: "Ngetik Aja Dulu",
    description: "Aplikasi kecil untuk melatih kecepatan mengetik.",
    image: "ngetik-aja-dulu.png",
    category: ["web"],
    techIcons: ["js"],
    projectLink: "https://ngetik-aja-dulu.pages.dev/",
    repoLink: "https://github.com/riizlaah/ngetik-aja-dulu",
  },
  {
    title: "Mitsu-in",
    description: "Website untuk mengelola anggota suatu LPK.",
    image: "mitsu-in.png",
    category: ["web"],
    techIcons: ["php", "laravel", "js", "database"],
    projectLink: null,
    repoLink: "https://github.com/starvann/mitsu-in",
  },
  {
    title: "Esemka Laundry",
    description: "Sistem informasi untuk manajemen laundry.",
    image: "esemka-laundry.png",
    category: ["desktop", "android"],
    techIcons: ["c-sharp", "dotnet", "database", "android", "kotlin", "jetpack-compose"],
    projectLink: null,
    repoLink: "https://github.com/riizlaah/esemka-laundry",
  },
  {
    title: "Mandheg Parking System",
    description: "Aplikasi desktop untuk manajemen tempat parkir.",
    image: "mandheg-parking-system.png",
    category: ["desktop"],
    techIcons: ["c-sharp", "dotnet", "database"],
    projectLink: null,
    repoLink: "https://github.com/riizlaah/MandhegParkingSystem",
  },
  {
    title: "Hov Sedhep",
    description: "Aplikasi desktop untuk manajemen restoran.",
    image: "hovsedhep.png",
    category: ["desktop"],
    techIcons: ["c-sharp", "dotnet", "database"],
    projectLink: null,
    repoLink: "https://github.com/riizlaah/hovsedhep",
  },
  {
    title: "Esemka Jati Hotel",
    description: "Sistem informasi untuk manajemen hotel.",
    image: "esemka-jati-hotel.png",
    category: ["desktop", "android", "REST API"],
    techIcons: ["c-sharp", "dotnet", "database", "android", "kotlin", "jetpack-compose"],
    projectLink: null,
    repoLink: "https://github.com/riizlaah/esemka-jati-hotel",
  },
  {
    title: "Smart Park Lite",
    description: "Sistem informasi untuk manajemen tempat parkir yang lebih sederhana.",
    image: "smartpark-lite.png",
    category: ["desktop", "android"],
    techIcons: ["c-sharp", "dotnet", "android", "kotlin", "jetpack-compose"],
    projectLink: null,
    repoLink: "https://github.com/riizlaah/smartpark-lite",
  },
  {
    title: "Papier",
    description: "Aplikasi Android untuk online shop.",
    image: "papier.png",
    category: ["android"],
    techIcons: ["android", "kotlin", "jetpack-compose"],
    projectLink: null,
    repoLink: "https://github.com/riizlaah/papier",
  },
  {
    title: "Esemka E-Sport Android",
    description: "Aplikasi Android untuk melihat detail tim dan pemain dari game MOBA.",
    image: "esemka-sport.png",
    category: ["android"],
    techIcons: ["android", "kotlin", "jetpack-compose"],
    projectLink: null,
    repoLink: "https://github.com/riizlaah/esemka-sport",
  },
  {
    title: "Ezemkofi",
    description: "Aplikasi Android untuk mencari menu kopi dan memesannya.",
    image: "ezemkofi.png",
    category: ["android"],
    techIcons: ["android", "kotlin", "jetpack-compose"],
    projectLink: null,
    repoLink: "https://github.com/riizlaah/ezemkofi",
  },
  {
    title: "GrowthSeekerAcademy API",
    description: "REST API untuk platform kursus online.",
    image: "gsa-api-swagger.png",
    category: ["REST API"],
    techIcons: ["c-sharp", "dotnet", "database"],
    projectLink: null,
    repoLink: "https://github.com/riizlaah/gsa-api",
  },
  {
    title: "EcoTrack",
    description: "Sistem informasi penjualan sampah daur ulang dengan versi desktop, REST API, dan Android.",
    image: "ecotrack.png",
    category: ["desktop", "android", "REST API"],
    techIcons: ["c-sharp", "dotnet", "database", "android", "kotlin", "jetpack-compose"],
    projectLink: null,
    repoLink: "https://github.com/riizlaah/ecotrack",
  },
  {
    title: "Gawean",
    description: "Aplikasi Android untuk mencari dan melamar pekerjaan.",
    image: "gawean.png",
    category: ["android"],
    techIcons: ["android", "kotlin", "jetpack-compose"],
    projectLink: null,
    repoLink: "https://github.com/riizlaah/gawean",
  },
  {
    title: "ParkSentry",
    description: "Software design untuk melacak dan memantau pelanggaran di tempat parkir.",
    image: "parksentry.png",
    category: ["software design"],
    techIcons: [],
    projectLink: null,
    repoLink: "https://github.com/riizlaah/ParkSentry",
  },
  {
    title: "Esemka Corporation",
    description: "Aplikasi desktop untuk administrasi perusahaan, termasuk mutasi dan promosi.",
    image: "esemka-corp.png",
    category: ["desktop"],
    techIcons: ["c-sharp", "dotnet", "database"],
    projectLink: null,
    repoLink: "https://github.com/riizlaah/esemka-corporation",
  },
  {
    title: "Esemka E-Sport Desktop",
    description: "Aplikasi desktop untuk melihat detail pertandingan dan memesan tiketnya.",
    image: "esemka-esport-desktop.png",
    category: ["desktop"],
    techIcons: ["c-sharp", "dotnet", "database"],
    projectLink: null,
    repoLink: "https://github.com/riizlaah/esemka-esport-desktop",
  },
  {
    title: "Society Vaccinations",
    description: "REST API untuk layanan vaksinasi.",
    image: "socvacc.png",
    category: ["REST API"],
    techIcons: ["c-sharp", "dotnet", "database"],
    projectLink: null,
    repoLink: "https://github.com/riizlaah/SocietyVaccinations",
  },
  {
    title: "Tokyo Olympic 2020",
    description: "Aplikasi Android untuk melihat pertandingan dan negara di Tokyo Olympic 2020.",
    image: "tokyo-olympic-2020.png",
    category: ["android"],
    techIcons: ["android", "kotlin", "jetpack-compose"],
    projectLink: null,
    repoLink: "https://github.com/riizlaah/tokyo-olympic",
  },
  {
    title: "MediTrack",
    description: "Sistem informasi pengelolaan inventaris medis dengan versi desktop, REST API, dan Android.",
    image: "meditrack.png",
    category: ["desktop", "android", "REST API"],
    techIcons: ["c-sharp", "dotnet", "database", "android", "kotlin", "jetpack-compose"],
    projectLink: null,
    repoLink: "https://github.com/riizlaah/MediTrack",
  },
  {
    title: "OurWater",
    description: "Sistem informasi PDAM untuk menghitung tagihan pengguna serta memantau konsumsi dan produksi debit air.",
    image: "ourwater.png",
    category: ["desktop", "android", "REST API", "software design"],
    techIcons: ["c-sharp", "dotnet", "database", "android", "kotlin", "jetpack-compose"],
    projectLink: null,
    repoLink: "https://github.com/riizlaah/OurWater",
  },
  {
    title: "HovSalad",
    description: "Aplikasi desktop untuk manajemen pesanan dengan bahan kustom yang fleksibel.",
    image: "hovsalad.png",
    category: ["desktop"],
    techIcons: ["c-sharp", "dotnet", "database"],
    projectLink: null,
    repoLink: "https://github.com/riizlaah/hovsalad",
  },
  {
    title: "MedicGo",
    description: "Sistem informasi Android dan REST API untuk membuat janji temu dengan dokter.",
    image: "medicgo.png",
    category: ["android", "REST API"],
    techIcons: ["c-sharp", "dotnet", "android", "kotlin", "jetpack-compose"],
    projectLink: null,
    repoLink: "https://github.com/riizlaah/medicgo",
  },
  {
    title: "Green Signal",
    description: "Software design untuk sistem pengajuan kredit.",
    image: "green-signal.png",
    category: ["software design"],
    techIcons: [],
    projectLink: null,
    repoLink: "https://github.com/riizlaah/green-signal",
  },
  {
    title: "MediConnect",
    description: "Sistem klinik dengan empat peran utama: administrator, resepsionis, dokter, dan pasien.",
    image: "mediconnect.png",
    category: ["software design", "desktop", "android", "REST API"],
    techIcons: ["c-sharp", "dotnet", "database", "android", "kotlin", "jetpack-compose"],
    projectLink: null,
    repoLink: "https://github.com/riizlaah/mediconnect",
  },
];

export const projects = rawProjects.map((project, index) => ({
  ...project,
  index: index + 1,
  slug: slugify(project.title),
  disciplines: project.category.map((category) => disciplineIds[category] || category),
  thumb: `assets/thumbs/${project.image.replace(/\.png$/i, ".webp")}`,
  full: `assets/thumbnails/${project.image}`,
}));

export const featured = [
  {
    slug: "bajaj-bercerita",
    note: "Juara 1 IGW Game Jam 2025. Game naratif tentang bagian kecil kehidupan seorang supir bajaj.",
  },
  {
    slug: "ourwater",
    note: "Desktop, Android, REST API, dan software design dalam satu sistem untuk PDAM.",
  },
  {
    slug: "mediconnect",
    note: "Sistem klinik dengan empat peran pengguna: administrator, resepsionis, dokter, dan pasien.",
  },
  {
    slug: "hekerd",
    note: "Web blogging dan kuis yang sudah berjalan daring.",
  },
];

export const achievements = [
  {
    id: "lks-nasional-2026",
    year: 2026,
    month: 7,
    type: "Kompetisi",
    result: "Medal of Excellence",
    event: "LKS Nasional 2026",
    detail: "IT Software Solutions for Business",
    note: "Peringkat 5 nasional.",
    certificate: "assets/certs/thumbs/moe-lksn2026.webp",
    certificateAlt: "Sertifikat Medal of Excellence LKS Nasional 2026",
    link: null,
    linkLabel: null,
  },
  {
    id: "lks-jateng-2026",
    year: 2026,
    month: 4,
    type: "Kompetisi",
    result: "Juara 1",
    event: "LKS Provinsi Jawa Tengah 2026",
    detail: "IT Software Solutions for Business",
    note: "Tingkat provinsi Jawa Tengah.",
    certificate: "assets/certs/thumbs/juara1-lks-jateng2026.webp",
    certificateAlt: "Sertifikat Juara 1 LKS Provinsi Jawa Tengah 2026",
    link: null,
    linkLabel: null,
  },
  {
    id: "igw-game-jam-2025",
    year: 2025,
    month: 8,
    type: "Kompetisi",
    result: "Juara 1",
    event: "IGW Game Jam 2025",
    detail: "Bajaj Bercerita",
    note: "Game naratif tentang bagian kecil kehidupan seorang supir bajaj.",
    certificate: null,
    certificateAlt: null,
    link: "https://riizlaah.itch.io/bajaj-bercerita",
    linkLabel: "Mainkan Bajaj Bercerita",
  },
  {
    id: "agate-3d-game-art-2025",
    year: 2025,
    month: 4,
    type: "Kursus",
    result: "Kursus selesai",
    event: "3D Game Art Course",
    detail: "Agate",
    note: "Kursus 3D game art, bukan kompetisi.",
    certificate: "assets/certs/thumbs/agate-3d-game-art.webp",
    certificateAlt: "Sertifikat 3D Game Art Course Agate",
    link: null,
    linkLabel: null,
  },
];

export const achievementYears = [...new Set(achievements.map((item) => item.year))]
  .sort((a, b) => b - a)
  .map((year) => ({
    year,
    items: achievements.filter((item) => item.year === year),
  }));

export const projectBySlug = Object.fromEntries(
  projects.map((project) => [project.slug, project]),
);

export const disciplineById = Object.fromEntries(
  disciplines.map((discipline) => [discipline.id, discipline]),
);

export const statusLabels = {
  beginner: "Pemula",
  intermediate: "Menengah",
};

export function formatMonthYear(year, month) {
  return new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" }).format(
    new Date(year, month - 1, 1),
  );
}

export function formatMonth(month) {
  return new Intl.DateTimeFormat("id-ID", { month: "long" }).format(new Date(2026, month - 1, 1));
}

export function experienceSince(year, month, now = new Date()) {
  let years = now.getFullYear() - year;
  let months = now.getMonth() + 1 - month;
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  return { years, months };
}

export function formatExperience(years, months) {
  if (years === 0) return `${months} bulan`;
  if (months === 0) return `${years} tahun`;
  return `${years} tahun ${months} bulan`;
}

export function shortUrl(url) {
  if (!url) return "";
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}
