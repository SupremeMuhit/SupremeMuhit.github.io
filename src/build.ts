import { writeFileSync, copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { resolve, join, dirname, basename } from "node:path";
import { fileURLToPath } from "node:url";
import { socials } from "../data/socials.js";
import { projects } from "../data/projects.js";
import { support } from "../data/support.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT = resolve(ROOT, "dist");

function copyStatic(sourceDir: string) {
  if (!existsSync(sourceDir)) return;
  const files = readdirSync(sourceDir);
  for (const file of files) {
    const src = join(sourceDir, file);
    if (statSync(src).isFile()) {
      copyFileSync(src, join(OUT, file));
      console.log(`  copied ${file}`);
    }
  }
}

function copyDir(sourceDir: string) {
  if (!existsSync(sourceDir)) return;
  const targetDir = join(OUT, basename(sourceDir));
  if (!existsSync(targetDir)) mkdirSync(targetDir, { recursive: true });
  const files = readdirSync(sourceDir);
  for (const file of files) {
    const src = join(sourceDir, file);
    if (statSync(src).isFile()) {
      copyFileSync(src, join(targetDir, file));
      console.log(`  copied ${basename(sourceDir)}/${file}`);
    }
  }
}

function renderProject(p: (typeof projects)[number]) {
  const sourceBtn = p.source
    ? `<a href="${p.source}" target="_blank" rel="noopener" class="project-source" title="Source">
          <i class="fa-brands fa-github"></i>
        </a>`
    : "";
  return `
        <div class="project">
          <a href="${p.link}" target="_blank" rel="noopener" class="project-main">
            <span class="project-marker">*</span>
            <span class="project-name">${p.title}</span>
            <span class="project-desc">${p.description}</span>
          </a>
          ${sourceBtn}
        </div>`;
}

function renderSocial(s: (typeof socials)[number]) {
  return `
        <a href="${s.link}" target="_blank" rel="noopener" class="social">
          <i class="${s.icon} social-icon"></i>
          <div class="social-body">
            <div class="social-row">
              <span class="social-title">${s.title}</span>
              <span class="social-handle">${s.handle}</span>
            </div>
            <span class="social-desc">${s.description}</span>
          </div>
        </a>`;
}

function renderSupportItem(s: (typeof support)[number]) {
  const discordBtn = s.discord
    ? `<a href="${s.discord}" target="_blank" rel="noopener" class="support-discord" title="Discord">
          <i class="fa-brands fa-discord"></i>
        </a>`
    : "";
  return `
        <div class="support-item">
          <a href="${s.link}" target="_blank" rel="noopener" class="support-main">
            <i class="${s.icon} support-icon"></i>
            <span class="support-name">${s.title}</span>
            <span class="support-desc">${s.description}</span>
          </a>
          ${discordBtn}
        </div>`;
}

const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>SupremeMuhit</title>
    <link rel="stylesheet" href="style.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✦</text></svg>" />
  </head>
  <body>
    <div class="page">
      <header class="masthead">
        <div class="masthead-avatar">
          <img src="https://i.imgur.com/e4GxPXm.png" alt="SupremeMuhit" />
        </div>
        <div class="masthead-text">
          <h1>𝖘𝖚𝖕𝖗𝖊𝖒𝖊𝖒𝖚𝖍𝖎𝖙</h1>
          <p class="masthead-role">Developer &amp; Tinkerer</p>
          <p class="masthead-bio">
            Hey, I'm Supreme. Self-taught developer and tech enthusiast with a
            passion for building clean, efficient applications. I spend most of my
            time exploring new technologies, writing code, and tinkering with game
            mechanics. Find me on
            <a href="https://discord.com/users/1341440502104592507" target="_blank" rel="noopener">Discord</a>
            &mdash; always open to new ideas.
          </p>
        </div>
      </header>

      <hr class="rule" />

      <section class="section" id="socials">
        <h2 class="section-label">Socials</h2>
        <div class="socials-grid">
          ${socials.map(renderSocial).join("\n")}
        </div>
      </section>

      <hr class="rule" />

      <section class="section" id="projects">
        <h2 class="section-label">Projects</h2>
        <div class="projects-list">
          ${projects.map(renderProject).join("\n")}
        </div>
      </section>

      <hr class="rule" />

      <section class="section" id="support">
        <h2 class="section-label">Support</h2>
        <p class="section-note">Projects by friends worth checking out.</p>
        <div class="support-grid">
          ${support.map(renderSupportItem).join("\n")}
        </div>
      </section>

      <hr class="rule" />

      <footer class="footer">
        <p>&copy; ${new Date().getFullYear()} SupremeMuhit</p>
      </footer>
    </div>

    <script src="script.js"></script>
    <script>
      fetch("https://ip-logger.suprememuhit.workers.dev/portfolio").catch(() => {});
    </script>
  </body>
</html>`;

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

writeFileSync(resolve(OUT, "index.html"), html, "utf-8");
console.log("Built dist/index.html");

copyStatic(resolve(ROOT, "public"));
copyDir(resolve(ROOT, ".well-known"));
copyFileSync(resolve(ROOT, "style.css"), resolve(OUT, "style.css"));
copyFileSync(resolve(ROOT, "script.js"), resolve(OUT, "script.js"));
console.log("Copied static assets");
