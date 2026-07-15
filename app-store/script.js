(function () {
  "use strict";

  const apps = window.APP_CATALOG || [];
  const appGrid = document.querySelector("#app-grid");
  const detailRoot = document.querySelector("#app-details");
  const archiveBody = document.querySelector("#archive-body");
  const search = document.querySelector("#app-search");
  const emptyState = document.querySelector("#empty-state");
  const lightbox = document.querySelector("#lightbox");
  const lightboxImage = lightbox.querySelector("img");
  const lightboxCaption = lightbox.querySelector("figcaption");
  const toast = document.querySelector("#toast");
  let activeFilter = "all";
  let lightboxSet = [];
  let lightboxIndex = 0;
  let toastTimer;

  const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[char]);

  function renderCatalog() {
    appGrid.innerHTML = apps.map((app) => `
      <article class="app-card" data-name="${escapeHtml(app.name.toLowerCase())}" data-category="${escapeHtml(app.category)}">
        <div class="app-card-preview">
          <img src="${escapeHtml(app.screenshots[0].src)}" alt="" loading="lazy">
        </div>
        <a class="app-card-content" href="#app-${escapeHtml(app.id)}" aria-label="Ver detalles de ${escapeHtml(app.name)}">
          <div class="app-card-main">
            <img class="app-icon" src="${escapeHtml(app.icon)}" alt="">
            <div><h3>${escapeHtml(app.name)}</h3><p>${escapeHtml(app.categoryLabel)} · v${escapeHtml(app.versions[0].version)}</p></div>
          </div>
          <span class="round-link" aria-hidden="true">↗</span>
        </a>
      </article>
    `).join("");
  }

  function renderDetails() {
    detailRoot.innerHTML = apps.map((app) => {
      const latest = app.versions[0];
      return `
        <article class="app-detail" id="app-${escapeHtml(app.id)}">
          <div class="detail-top">
            <div class="detail-identity">
              <img class="app-icon" src="${escapeHtml(app.icon)}" alt="">
              <div class="detail-copy">
                <p class="eyebrow">${escapeHtml(app.categoryLabel)}</p>
                <h3>${escapeHtml(app.name)}</h3>
                <p>${escapeHtml(app.longDescription)}</p>
                <div class="meta-row">
                  <span class="meta-pill">v${escapeHtml(latest.version)}</span>
                  <span class="meta-pill">${escapeHtml(app.minAndroid)}</span>
                  <span class="meta-pill">${escapeHtml(latest.size)}</span>
                </div>
                <a class="download-button" href="${escapeHtml(latest.apk)}" download>
                  <span>Descargar última APK</span><span aria-hidden="true">↓</span>
                </a>
              </div>
            </div>
            <ul class="feature-list">${app.features.map((feature) => `<li>${escapeHtml(feature)}</li>`).join("")}</ul>
          </div>
          <div class="detail-body">
            <div class="screenshots-block">
              <div class="subheading-row">
                <h4>Capturas de pantalla</h4>
                <div class="carousel-controls">
                  <button class="icon-button carousel-prev" type="button" data-target="shots-${escapeHtml(app.id)}" aria-label="Capturas anteriores">←</button>
                  <button class="icon-button carousel-next" type="button" data-target="shots-${escapeHtml(app.id)}" aria-label="Capturas siguientes">→</button>
                </div>
              </div>
              <div class="screenshot-track" id="shots-${escapeHtml(app.id)}">
                ${app.screenshots.map((shot, index) => `
                  <button class="screenshot-button" type="button" data-app="${escapeHtml(app.id)}" data-index="${index}" aria-label="Ampliar: ${escapeHtml(shot.alt)}">
                    <img src="${escapeHtml(shot.src)}" alt="${escapeHtml(shot.alt)}" loading="lazy">
                  </button>
                `).join("")}
              </div>
            </div>
            <aside class="version-panel">
              <h4>Última versión</h4>
              <div class="version-head">
                <div><div class="version-number">v${escapeHtml(latest.version)}</div><div class="version-date">${escapeHtml(latest.date)} · código ${latest.code}</div></div>
                <span class="channel-badge">${escapeHtml(latest.channel)}</span>
              </div>
              <ul class="change-list">${latest.changes.map((change) => `<li>${escapeHtml(change)}</li>`).join("")}</ul>
              <div class="hash-row"><code title="${latest.sha256}">${latest.sha256}</code><button class="copy-button" type="button" data-copy="${latest.sha256}">Copiar SHA</button></div>
            </aside>
          </div>
        </article>
      `;
    }).join("");
  }

  function renderArchive() {
    archiveBody.innerHTML = apps.flatMap((app) => app.versions.map((version) => `
      <tr>
        <td><span class="archive-app"><img src="${escapeHtml(app.icon)}" alt="">${escapeHtml(app.name)}</span></td>
        <td><strong>v${escapeHtml(version.version)}</strong><br><small>código ${version.code}</small></td>
        <td><time datetime="${escapeHtml(version.isoDate)}">${escapeHtml(version.date)}</time></td>
        <td>${escapeHtml(version.size)}</td>
        <td><span class="channel-badge">${escapeHtml(version.channel)}</span></td>
        <td><a class="archive-download" href="${escapeHtml(version.apk)}" download>APK ↓</a></td>
      </tr>
    `)).join("");
  }

  function filterCards() {
    const query = search.value.trim().toLowerCase();
    let visible = 0;
    document.querySelectorAll(".app-card").forEach((card) => {
      const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
      const matchesSearch = !query || card.dataset.name.includes(query);
      card.hidden = !(matchesCategory && matchesSearch);
      if (!card.hidden) visible += 1;
    });
    emptyState.hidden = visible !== 0;
  }

  function showToast(message) {
    clearTimeout(toastTimer);
    toast.textContent = message;
    toast.classList.add("is-visible");
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 1900);
  }

  function openLightbox(appId, index) {
    const app = apps.find((item) => item.id === appId);
    if (!app) return;
    lightboxSet = app.screenshots;
    lightboxIndex = index;
    updateLightbox();
    lightbox.showModal();
  }

  function updateLightbox() {
    const shot = lightboxSet[lightboxIndex];
    if (!shot) return;
    lightboxImage.src = shot.src;
    lightboxImage.alt = shot.alt;
    lightboxCaption.textContent = shot.alt;
  }

  function moveLightbox(direction) {
    lightboxIndex = (lightboxIndex + direction + lightboxSet.length) % lightboxSet.length;
    updateLightbox();
  }

  renderCatalog();
  renderDetails();
  renderArchive();
  document.querySelector("#app-count").textContent = String(apps.length).padStart(2, "0");
  document.querySelector("#build-count").textContent = String(apps.reduce((sum, app) => sum + app.versions.length, 0)).padStart(2, "0");
  document.querySelector("#footer-year").textContent = new Date().getFullYear();

  search.addEventListener("input", filterCards);
  document.querySelectorAll(".filter-chip").forEach((button) => button.addEventListener("click", () => {
    document.querySelectorAll(".filter-chip").forEach((chip) => chip.classList.remove("is-active"));
    button.classList.add("is-active");
    activeFilter = button.dataset.filter;
    filterCards();
  }));

  document.addEventListener("click", async (event) => {
    const screenshotButton = event.target.closest(".screenshot-button");
    if (screenshotButton) openLightbox(screenshotButton.dataset.app, Number(screenshotButton.dataset.index));

    const carouselButton = event.target.closest(".carousel-prev, .carousel-next");
    if (carouselButton) {
      const track = document.getElementById(carouselButton.dataset.target);
      track.scrollBy({ left: track.clientWidth * (carouselButton.classList.contains("carousel-next") ? 0.75 : -0.75), behavior: "smooth" });
    }

    const copyButton = event.target.closest(".copy-button");
    if (copyButton) {
      try {
        await navigator.clipboard.writeText(copyButton.dataset.copy);
        showToast("SHA-256 copiado");
      } catch (_) {
        showToast("No se pudo copiar automáticamente");
      }
    }
  });

  lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
  lightbox.querySelector(".lightbox-prev").addEventListener("click", () => moveLightbox(-1));
  lightbox.querySelector(".lightbox-next").addEventListener("click", () => moveLightbox(1));
  lightbox.addEventListener("click", (event) => { if (event.target === lightbox) lightbox.close(); });
  document.addEventListener("keydown", (event) => {
    if (!lightbox.open) return;
    if (event.key === "ArrowLeft") moveLightbox(-1);
    if (event.key === "ArrowRight") moveLightbox(1);
  });

  const sections = document.querySelectorAll("#catalogo, #actualizaciones, #archivo");
  const navLinks = document.querySelectorAll(".desktop-nav a");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`));
    });
  }, { rootMargin: "-30% 0px -65%", threshold: 0 });
  sections.forEach((section) => observer.observe(section));
})();
