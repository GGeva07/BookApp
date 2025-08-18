import Swal from "https://cdn.jsdelivr.net/npm/sweetalert2@11/+esm";

console.log("index.js cargado correctamente");

document.addEventListener("DOMContentLoaded", () => {
  const formularios = document.querySelectorAll(".form-eliminar");

  formularios.forEach((formulario) => {
    formulario.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log("Formulario interceptado");

      Swal.fire({
        title: "Esta seguro?",
        text: "Esto no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          formulario.submit();
        }
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  document.body.addEventListener("click", function (event) {
    const target = event.target;

    if (target.matches(".dropdown-toggle-custom")) {
      event.preventDefault();
      const dropdown = target.nextElementSibling;
      if (dropdown && dropdown.classList.contains("custom-dropdown-menu")) {
        const isVisible = dropdown.style.display === "block";

        document.querySelectorAll(".custom-dropdown-menu").forEach((menu) => {
          menu.style.display = "none";
        });

        dropdown.style.display = isVisible ? "none" : "block";
      }
      return;
    }
    if (target.closest(".custom-dropdown-menu")) {
      return;
    }

    if (!target.closest(".dropdown-custom")) {
      document.querySelectorAll(".custom-dropdown-menu").forEach((menu) => {
        menu.style.display = "none";
      });
    }
  });
});
