document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const contentWrapper = document.querySelector(".content-wrapper");
  const toggleSidebar = document.getElementById("toggleSidebar");
  const mobileToggle = document.getElementById("mobileToggle");

  const overlay = document.createElement("div");
  overlay.className = "sidebar-overlay";
  document.body.appendChild(overlay);

  function toggleSidebarVisibility() {
    const isMobile = window.innerWidth <= 992;

    if (isMobile) {
      sidebar.classList.toggle("active");
      overlay.classList.toggle("active");
    } else {
      sidebar.classList.toggle("collapsed");
      contentWrapper.classList.toggle("sidebar-collapsed");
    }
  }

  toggleSidebar.addEventListener("click", toggleSidebarVisibility);
  mobileToggle.addEventListener("click", toggleSidebarVisibility);

  overlay.addEventListener("click", function () {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });

  window.addEventListener("resize", function () {
    const isMobile = window.innerWidth <= 992;

    if (!isMobile) {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
    }
  });

  // Initialize Lucide icons
  lucide.createIcons();
});
