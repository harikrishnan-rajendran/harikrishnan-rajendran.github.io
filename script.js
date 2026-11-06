
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("[data-tab]");
  const panels = document.querySelectorAll(".tab-panel");
  const nav = document.querySelector(".nav");
  const menuToggle = document.querySelector(".menu-toggle");

  function showTab(name) {
    const target = document.getElementById(name);
    if (!target || !target.classList.contains("tab-panel")) {
      name = "home";
    }

    panels.forEach(panel => {
      panel.classList.toggle("active", panel.id === name);
    });

    document.querySelectorAll(".nav a").forEach(link => {
      link.classList.toggle("active", link.dataset.tab === name);
    });

    window.scrollTo({ top: 0, behavior: "instant" });
    nav?.classList.remove("open");
  }

  links.forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const name = link.dataset.tab;

      if (!name) return;

      if (location.hash !== "#" + name) {
        history.pushState({ tab: name }, "", "#" + name);
      }

      showTab(name);
    });
  });

  window.addEventListener("popstate", () => {
    showTab(location.hash.slice(1) || "home");
  });

  menuToggle?.addEventListener("click", () => {
    nav?.classList.toggle("open");
  });

  showTab(location.hash.slice(1) || "home");

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
});
