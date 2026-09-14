document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     HERO INTERACTION
  ========================================= */

  const scene = document.querySelector(".transaction-scene");
  const walletA = document.querySelector(".wallet-a");
  const walletB = document.querySelector(".wallet-b");
  const proofNode = document.querySelector(".proof-node");

  if (scene) {

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

      if (walletA) walletA.style.transform = "";
      if (walletB) walletB.style.transform = "";
      if (proofNode) proofNode.style.transform = "";

    });

  }


  /* =========================================
     SCROLL REVEALS
  ========================================= */

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


  /* =========================================
     SECTION 02 STAGGER
  ========================================= */

  document.querySelectorAll(".flow-stage").forEach((stage, index) => {
    stage.style.transitionDelay = `${index * 120}ms`;
  });


  /* =========================================
     HERO HASH MOTION
  ========================================= */

  const hashes = document.querySelectorAll(".hash");

  hashes.forEach((hash, index) => {
    hash.style.animationDelay = `${index * 1.1}s`;
  });


  /* =========================================
     PRIVACY TRANSFORMATION
  ========================================= */

  const privacyCard = document.querySelector("#privacyCard");
  const privacyToggle = document.querySelector("#privacyToggle");
  const privacyStatus = document.querySelector("#privacyStatus");
  const proofState = document.querySelector("#proofState");
  const toggleText = document.querySelector(".toggle-text");

  if (privacyCard && privacyToggle) {

    privacyToggle.addEventListener("click", () => {

      const isProtected =
        privacyCard.classList.contains("protected");


      privacyCard.classList.add("protecting");


      setTimeout(() => {
        privacyCard.classList.remove("protecting");
      }, 1000);


      if (!isProtected) {

        privacyCard.classList.add("protected");

        privacyStatus.innerHTML =
          "<i></i> PRIVATE";

        proofState.textContent =
          "VALID";

        toggleText.textContent =
          "REVEAL TRANSACTION";

      } else {

        privacyCard.classList.remove("protected");

        privacyStatus.innerHTML =
          "<i></i> PUBLIC";

        proofState.textContent =
          "VISIBLE";

        toggleText.textContent =
          "PROTECT TRANSACTION";

      }

    });

  }


  /* =========================================
     SMOOTH SCROLL
  ========================================= */

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

  /* =========================================
     SECTION 02 — PROOF PIPELINE
  ========================================= */

  const pipelineStages = document.querySelectorAll(
    ".proof-flow .flow-stage"
  );

  const pipelineConnectors = document.querySelectorAll(
    ".proof-flow .flow-connector"
  );

  const approachBottom =
    document.querySelector(".approach-bottom");

  let activeStage = 0;

  function activatePipeline(stageNumber) {

    activeStage = stageNumber;

    pipelineStages.forEach((stage) => {

      const number =
        Number(stage.dataset.stage);

      stage.classList.toggle(
        "pipeline-active",
        number === stageNumber
      );

    });

    pipelineConnectors.forEach((connector) => {

      const number =
        Number(connector.dataset.connector);

      connector.classList.toggle(
        "signal-active",
        number === stageNumber
      );

    });

    if (
      approachBottom &&
      stageNumber === 3
    ) {

      approachBottom.classList.add(
        "pipeline-complete"
      );

    } else if (approachBottom) {

      approachBottom.classList.remove(
        "pipeline-complete"
      );

    }

  }


  pipelineStages.forEach((stage) => {

    stage.addEventListener("click", () => {

      const number =
        Number(stage.dataset.stage);

      activatePipeline(number);

    });

  });


  /* Start the sequence when Section 02 enters view */

  const approachSection =
    document.querySelector("#approach");

  if (approachSection) {

    const approachObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              activatePipeline(1);

              approachObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: .35
        }
      );

    approachObserver.observe(
      approachSection
    );

  }


  /* =========================================
     SMOOTH SCROLL
  ========================================= */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {

    link.addEventListener("click", (e) => {

      const targetId =
        link.getAttribute("href");

      if (!targetId || targetId === "#") return;

      const target =
        document.querySelector(targetId);

      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });

});