document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.getElementById("sidebar");
  const mobileToggle = document.getElementById("mobileToggle");

  const overlay = document.querySelector(".sidebar-overlay");

  mobileToggle.addEventListener("click", function () {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", function () {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });

  // const navItems = document.querySelectorAll(
  //   ".navbar__item li, .navbar__footer li"
  // );

  // navItems.forEach((item) => {
  //   item.addEventListener("click", function () {
  //     navItems.forEach((i) => i.classList.remove("navbar__item--active"));
  //     item.classList.add("navbar__item--active");
  //   });
  // });
});
