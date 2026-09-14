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

    stage.style.transitionDelay =
      `${index * 120}ms`;

  });


  /* =========================================
     HERO HASH MOTION
  ========================================= */

  const hashes =
    document.querySelectorAll(".hash");

  hashes.forEach((hash, index) => {

    hash.style.animationDelay =
      `${index * 1.1}s`;

  });


  /* =========================================
     PRIVACY TRANSFORMATION
  ========================================= */

  const privacyCard =
    document.querySelector("#privacyCard");

  const privacyToggle =
    document.querySelector("#privacyToggle");

  const privacyStatus =
    document.querySelector("#privacyStatus");

  const proofState =
    document.querySelector("#proofState");

  const toggleText =
    document.querySelector(".toggle-text");


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
     SECTION 02 — PROOF PIPELINE
  ========================================= */

  const pipelineStages =
    document.querySelectorAll(
      ".proof-flow .flow-stage"
    );

  const pipelineConnectors =
    document.querySelectorAll(
      ".proof-flow .flow-connector"
    );

  const approachBottom =
    document.querySelector(".approach-bottom");

  let activeStage = 0;


  function activatePipeline(stageNumber) {

    activeStage = stageNumber;


    /* Activate selected stage */

    pipelineStages.forEach((stage) => {

      const number =
        Number(stage.dataset.stage);

      stage.classList.toggle(
        "pipeline-active",
        number === stageNumber
      );

    });


    /* Activate connector after selected stage */

    pipelineConnectors.forEach((connector) => {

      const number =
        Number(connector.dataset.connector);

      connector.classList.toggle(
        "signal-active",
        number === stageNumber
      );

    });


    /* Complete statement after stage 03 */

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


  /* =========================================
     STAGE CLICK / TAP
  ========================================= */

  pipelineStages.forEach((stage) => {

    stage.addEventListener("click", () => {

      const number =
        Number(stage.dataset.stage);

      activatePipeline(number);

    });

  });


  /* =========================================
     START SECTION 02
     WHEN IT ENTERS VIEW
  ========================================= */

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
          threshold: 0.35
        }
      );


    approachObserver.observe(
      approachSection
    );

  }


  /* =========================================
     SMOOTH SCROLL
  ========================================= */

  document.querySelectorAll(
    'a[href^="#"]'
  ).forEach((link) => {

    link.addEventListener("click", (e) => {

      const targetId =
        link.getAttribute("href");


      if (
        !targetId ||
        targetId === "#"
      ) return;


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

/* =========================================
   SECTION 03 — TRANSACTION WALKTHROUGH
========================================= */

const walkthroughSteps =
  document.querySelectorAll(".walk-step");

const transactionWindow =
  document.querySelector(".transaction-window");

function activateWalkthrough(stepNumber) {

  if (!transactionWindow) return;

  walkthroughSteps.forEach((step) => {

    step.classList.toggle(
      "active",
      Number(step.dataset.step) === stepNumber
    );

  });

  transactionWindow.className =
    `transaction-window step-${stepNumber} active`;

}


/* =========================================
   STEP CLICK / TAP
========================================= */

walkthroughSteps.forEach((step) => {

  step.addEventListener("click", () => {

    const number =
      Number(step.dataset.step);

    activateWalkthrough(number);

  });

});


/* =========================================
   AUTO PROGRESSION
========================================= */

let walkthroughTimer;
let walkthroughStarted = false;

function startWalkthrough() {

  if (walkthroughStarted) return;

  walkthroughStarted = true;

  let currentStep = 1;

  activateWalkthrough(currentStep);

  walkthroughTimer = setInterval(() => {

    currentStep++;

    if (currentStep > 4) {
      currentStep = 1;
    }

    activateWalkthrough(currentStep);

  }, 3200);

}


/* =========================================
   START WHEN SECTION ENTERS VIEW
========================================= */

const howSection =
  document.querySelector("#how");

if (howSection) {

  const howObserver =
    new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            startWalkthrough();

            howObserver.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.3
      }
    );

  howObserver.observe(howSection);

}


/* =========================================
   PAUSE AUTO FLOW ON INTERACTION
========================================= */

walkthroughSteps.forEach((step) => {

  step.addEventListener("click", () => {

    clearInterval(walkthroughTimer);

    walkthroughStarted = true;

  });

});

/* =========================================
   SECTION 04 — V4 PROOF LAYER
   ISOLATED — DO NOT TOUCH SECTIONS 01–03
========================================= */

const v4ProofSection =
  document.querySelector("#proof");

const v4ProofTerminal =
  document.querySelector(".v4-proof-terminal");

const v4ProofRows =
  document.querySelectorAll(".v4-proof-row");

let v4ProofActivated = false;

function activateV4ProofLayer() {
  if (!v4ProofTerminal || v4ProofActivated) {
    return;
  }

  v4ProofActivated = true;

  v4ProofTerminal.classList.add("v4-proof-live");

  v4ProofRows.forEach((row, index) => {
    row.style.setProperty(
      "--v4-proof-delay",
      `${index * 450}ms`
    );

    row.classList.add("v4-proof-row-active");
  });
}


/* ---------- SCROLL ACTIVATION ---------- */

if (v4ProofSection) {
  const v4ProofObserver =
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activateV4ProofLayer();

            v4ProofObserver.unobserve(
              entry.target
            );
          }
        });
      },
      {
        threshold: 0.35
      }
    );

  v4ProofObserver.observe(v4ProofSection);
}


/* ---------- TERMINAL PARALLAX ---------- */

if (v4ProofTerminal) {

  v4ProofTerminal.addEventListener(
    "mousemove",
    (e) => {

      const rect =
        v4ProofTerminal.getBoundingClientRect();

      const x =
        (e.clientX - rect.left) /
          rect.width -
        0.5;

      const y =
        (e.clientY - rect.top) /
          rect.height -
        0.5;

      v4ProofTerminal.style.transform =
        `perspective(1200px)
         rotateY(${x * 2}deg)
         rotateX(${y * -2}deg)`;
    }
  );

  v4ProofTerminal.addEventListener(
    "mouseleave",
    () => {
      v4ProofTerminal.style.transform = "";
    }
  );
}