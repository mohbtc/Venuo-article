/* =========================================
   VENUO — INTERACTION LAYER
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -----------------------------------------
     Cursor movement
  ----------------------------------------- */

  const scene = document.querySelector(".transaction-scene");

  if (scene) {
    scene.addEventListener("mousemove", (event) => {

      const rect = scene.getBoundingClientRect();

      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;

      const moveX = (x - 0.5) * 12;
      const moveY = (y - 0.5) * 12;

      scene.style.setProperty(
        "--mouse-x",
        `${moveX}px`
      );

      scene.style.setProperty(
        "--mouse-y",
        `${moveY}px`
      );
    });

    scene.addEventListener("mouseleave", () => {
      scene.style.setProperty("--mouse-x", "0px");
      scene.style.setProperty("--mouse-y", "0px");
    });
  }


  /* -----------------------------------------
     Scroll reveal
  ----------------------------------------- */

  const revealItems = document.querySelectorAll(
    ".intro, .how-preview, .proof-section"
  );

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
        }

      });

    },
    {
      threshold: 0.15
    }
  );

  revealItems.forEach((item) => {
    item.classList.add("reveal");
    observer.observe(item);
  });


  /* -----------------------------------------
     Smooth navigation
  ----------------------------------------- */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId = link.getAttribute("href");

      if (targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });

});