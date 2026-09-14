document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     HERO INTERACTION
  ========================================= */

  const scene =
    document.querySelector(".transaction-scene");

  const walletA =
    document.querySelector(".wallet-a");

  const walletB =
    document.querySelector(".wallet-b");

  const proofNode =
    document.querySelector(".proof-node");


  if (scene) {

    scene.addEventListener("mousemove", (e) => {

      const rect =
        scene.getBoundingClientRect();

      const x =
        (e.clientX - rect.left) /
        rect.width -
        0.5;

      const y =
        (e.clientY - rect.top) /
        rect.height -
        0.5;


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



  /* =========================================
     SCROLL REVEALS
  ========================================= */

  const revealItems =
    document.querySelectorAll(
      ".problem-copy, " +
      ".privacy-visual, " +
      ".approach-intro, " +
      ".flow-stage, " +
      ".how-preview .step, " +
      ".proof-copy, " +
      ".proof-visual"
    );


  if (
    revealItems.length &&
    "IntersectionObserver" in window
  ) {

    const revealObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "revealed"
              );

              revealObserver.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.15,

          rootMargin:
            "0px 0px -60px 0px"
        }
      );


    revealItems.forEach((item) => {

      item.classList.add("reveal");

      revealObserver.observe(item);

    });

  }



  /* =========================================
     SECTION 02 STAGGER
  ========================================= */

  document
    .querySelectorAll(".flow-stage")
    .forEach((stage, index) => {

      stage.style.transitionDelay =
        `${index * 120}ms`;

    });



  /* =========================================
     HERO HASH MOTION
  ========================================= */

  document
    .querySelectorAll(".hash")
    .forEach((hash, index) => {

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


  if (
    privacyCard &&
    privacyToggle
  ) {

    privacyToggle.addEventListener(
      "click",
      () => {

        const isProtected =
          privacyCard.classList.contains(
            "protected"
          );


        privacyCard.classList.add(
          "protecting"
        );


        setTimeout(() => {

          privacyCard.classList.remove(
            "protecting"
          );

        }, 1000);


        if (!isProtected) {

          privacyCard.classList.add(
            "protected"
          );


          if (privacyStatus) {

            privacyStatus.innerHTML =
              "<i></i> PRIVATE";

          }


          if (proofState) {

            proofState.textContent =
              "VALID";

          }


          if (toggleText) {

            toggleText.textContent =
              "REVEAL TRANSACTION";

          }

        } else {

          privacyCard.classList.remove(
            "protected"
          );


          if (privacyStatus) {

            privacyStatus.innerHTML =
              "<i></i> PUBLIC";

          }


          if (proofState) {

            proofState.textContent =
              "VISIBLE";

          }


          if (toggleText) {

            toggleText.textContent =
              "PROTECT TRANSACTION";

          }

        }

      }
    );

  }



  /* =========================================
     SECTION 02
     PROOF PIPELINE
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
    document.querySelector(
      ".approach-bottom"
    );


  let activeStage = 0;


  function activatePipeline(stageNumber) {

    activeStage =
      stageNumber;


    pipelineStages.forEach((stage) => {

      const number =
        Number(
          stage.dataset.stage
        );


      stage.classList.toggle(
        "pipeline-active",
        number === stageNumber
      );

    });


    pipelineConnectors.forEach(
      (connector) => {

        const number =
          Number(
            connector.dataset.connector
          );


        connector.classList.toggle(
          "signal-active",
          number === stageNumber
        );

      }
    );


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

    stage.addEventListener(
      "click",
      () => {

        const number =
          Number(
            stage.dataset.stage
          );

        activatePipeline(number);

      }
    );

  });



  /* =========================================
     START SECTION 02
  ========================================= */

  const approachSection =
    document.querySelector(
      "#approach"
    );


  if (
    approachSection &&
    "IntersectionObserver" in window
  ) {

    const approachObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (
              entry.isIntersecting
            ) {

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
     SECTION 03
     TRANSACTION WALKTHROUGH
  ========================================= */

  const walkthroughSteps =
    document.querySelectorAll(
      ".walk-step"
    );

  const transactionWindow =
    document.querySelector(
      ".transaction-window"
    );


  function activateWalkthrough(
    stepNumber
  ) {

    if (!transactionWindow) {
      return;
    }


    walkthroughSteps.forEach(
      (step) => {

        step.classList.toggle(
          "active",
          Number(
            step.dataset.step
          ) === stepNumber
        );

      }
    );


    transactionWindow.className =
      `transaction-window step-${stepNumber} active`;

  }



  /* =========================================
     SECTION 03
     MANUAL CONTROLS
  ========================================= */

  walkthroughSteps.forEach(
    (step) => {

      step.addEventListener(
        "click",
        () => {

          const number =
            Number(
              step.dataset.step
            );


          activateWalkthrough(
            number
          );


          clearInterval(
            walkthroughTimer
          );


          walkthroughStarted =
            true;

        }
      );

    }
  );



  /* =========================================
     SECTION 03
     AUTO PROGRESSION
  ========================================= */

  let walkthroughTimer = null;

  let walkthroughStarted =
    false;


  function startWalkthrough() {

    if (
      walkthroughStarted ||
      !transactionWindow
    ) {

      return;

    }


    walkthroughStarted =
      true;


    let currentStep = 1;


    activateWalkthrough(
      currentStep
    );


    walkthroughTimer =
      setInterval(() => {

        currentStep++;


        if (
          currentStep > 4
        ) {

          currentStep = 1;

        }


        activateWalkthrough(
          currentStep
        );

      }, 3200);

  }



  /* =========================================
     START SECTION 03
     WHEN IT ENTERS VIEW
  ========================================= */

  const howSection =
    document.querySelector(
      "#how"
    );


  if (
    howSection &&
    "IntersectionObserver" in window
  ) {

    const howObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (
              entry.isIntersecting
            ) {

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


    howObserver.observe(
      howSection
    );

  }



  /* =========================================
     SMOOTH SCROLL
  ========================================= */

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach((link) => {

      link.addEventListener(
        "click",
        (e) => {

          const targetId =
            link.getAttribute(
              "href"
            );


          if (
            !targetId ||
            targetId === "#"
          ) {

            return;

          }


          const target =
            document.querySelector(
              targetId
            );


          if (!target) {

            return;

          }


          e.preventDefault();


          target.scrollIntoView({
            behavior: "smooth",
            block: "start"
          });

        }
      );

    });



  /* =========================================
     SECTION 04
     V4 PROOF LAYER
     COMPLETELY ISOLATED
  ========================================= */

  (() => {

    const v4Section =
      document.querySelector(
        "#proof.v4-proof-section"
      );


    const v4Terminal =
      document.querySelector(
        "#proof .v4-proof-terminal"
      );


    const v4Rows =
      document.querySelectorAll(
        "#proof .v4-proof-row"
      );


    if (
      !v4Section ||
      !v4Terminal
    ) {

      return;

    }


    let v4Activated =
      false;


    function activateV4() {

      if (v4Activated) {
        return;
      }


      v4Activated =
        true;


      v4Terminal.classList.add(
        "v4-proof-live"
      );


      v4Rows.forEach(
        (row, index) => {

          row.style.setProperty(
            "--v4-proof-delay",
            `${index * 450}ms`
          );


          row.classList.add(
            "v4-proof-row-active"
          );

        }
      );

    }



    /* =========================================
       V4 SCROLL ACTIVATION
    ========================================= */

    if (
      "IntersectionObserver" in window
    ) {

      const v4Observer =
        new IntersectionObserver(
          (entries) => {

            entries.forEach(
              (entry) => {

                if (
                  entry.isIntersecting
                ) {

                  activateV4();


                  v4Observer.unobserve(
                    entry.target
                  );

                }

              }
            );

          },
          {
            threshold: 0.25
          }
        );


      v4Observer.observe(
        v4Section
      );

    } else {

      activateV4();

    }



    /* =========================================
       V4 TERMINAL PARALLAX
    ========================================= */

    v4Terminal.addEventListener(
      "mousemove",
      (e) => {

        const rect =
          v4Terminal.getBoundingClientRect();


        const x =
          (
            e.clientX -
            rect.left
          ) /
          rect.width -
          0.5;


        const y =
          (
            e.clientY -
            rect.top
          ) /
          rect.height -
          0.5;


        v4Terminal.style.transform =
          `perspective(1200px)
           rotateY(${x * 2}deg)
           rotateX(${y * -2}deg)`;

      }
    );


    v4Terminal.addEventListener(
      "mouseleave",
      () => {

        v4Terminal.style.transform =
          "";

      }
    );


  })();

});