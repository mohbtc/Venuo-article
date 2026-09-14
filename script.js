/* =========================================
   VENUO — MOTION SYSTEM
========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* -----------------------------------------
     HERO TRANSACTION MOTION
  ----------------------------------------- */

  const scene = document.querySelector(".transaction-scene");
  const walletA = document.querySelector(".wallet-a");
  const walletB = document.querySelector(".wallet-b");
  const proofNode = document.querySelector(".proof-node");

  if (scene) {

    /* Subtle cursor interaction */

    scene.addEventListener("mousemove", (e) => {

      const rect = scene.getBoundingClientRect();

      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      if (walletA) {
        walletA.style.transform =
          `translate(${x * 8}px, ${y * 6}px)`;
      }

      if (walletB) {
        walletB.style.transform =
          `translate(${x * -8}px, ${y * -6}px)`;
      }

      if (proofNode) {
        proofNode.style.transform =
          `translate(${x * 4}px, ${y * 4}px)`;
      }

    });


    scene.addEventListener("mouseleave", () => {

      if (walletA) {
        walletA.style.transform = "";
      }

      if (walletB) {
        walletB.style.transform = "";
      }

      if (proofNode) {
        proofNode.style.transform = "";
      }

    });

  }


  /* -----------------------------------------
     SCROLL REVEALS
  ----------------------------------------- */

  const revealItems = document.querySelectorAll(
    ".problem-copy, .privacy-visual, .approach-intro, .flow-stage, .how-preview .step, .proof-copy, .proof-visual"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add("revealed");

          revealObserver.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -60px 0px"
    }
  );


  revealItems.forEach((item) => {
    item.classList.add("reveal");
    revealObserver.observe(item);
  });


  /* -----------------------------------------
     FLOW STAGGER
  ----------------------------------------- */

  document.querySelectorAll(".flow-stage").forEach((stage, index) => {

    stage.style.transitionDelay = `${index * 120}ms`;

  });


  /* -----------------------------------------
     HASH FLOATING MOTION
  ----------------------------------------- */

  const hashes = document.querySelectorAll(".hash");

  hashes.forEach((hash, index) => {

    hash.style.animationDelay = `${index * 1.1}s`;

  });


  /* -----------------------------------------
     SMOOTH NAVIGATION
  ----------------------------------------- */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (e) => {

      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);

      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });

});