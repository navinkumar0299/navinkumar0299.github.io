/* =========================================================
   WEDDING INVITATION
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const coverScreen =
      document.getElementById(
        "coverScreen"
      );

    const bifoldStage =
      document.getElementById(
        "bifoldStage"
      );

    const openInvitationButton =
      document.getElementById(
        "openInvitation"
      );

    const music =
      document.getElementById(
        "weddingMusic"
      );

    const musicToggle =
      document.getElementById(
        "musicToggle"
      );

    const coverface = document.getElementById(
        "coverface"
    );

    const outerborder = document.getElementById(
        "outerborder"
    );

    const smallGanesh = document.getElementById(
        "small-ganesh"
    );

    let invitationOpened =
      false;

    let musicStarted =
      false;


    setTimeout(() => {
        const loader = document.getElementById('wedding-loader');
        const content = document.getElementById('content');
        
        loader.style.opacity = '0'; // Fade out effect
        
        setTimeout(() => {
        loader.style.display = 'none'; // Remove from view
        content.style.display = 'block'; // Reveal main page
        }, 500); // Match the CSS transition duration
        
    }, 2500);


    /* =====================================================
       CREATE PETALS
       ===================================================== */

    createPetals();


    function createPetals() {

      const container =
        document.getElementById(
          "petals"
        );

      if (!container) {
        return;
      }

      const numberOfPetals =
        window.innerWidth < 700
          ? 120
          : 220;


      for (
        let i = 0;
        i < numberOfPetals;
        i++
      ) {

        const petal =
          document.createElement(
            "span"
          );

        petal.className =
          "petal";


        const left =
          Math.random() * 100;

        const duration =
          8 + Math.random() * 10;

        const delay =
          Math.random() * 8;

        const drift =
          (-100 + Math.random() * 200)
          + "px";


        petal.style.left =
          `${left}%`;

        petal.style.animationDuration =
          `${duration}s`;

        petal.style.animationDelay =
          `${delay}s`;

        petal.style.setProperty(
          "--drift",
          drift
        );


        container.appendChild(
          petal
        );

      }

    }


    /* =====================================================
       OPEN INVITATION
       ===================================================== */

    function openInvitation() {

      if (invitationOpened) {
        return;
      }


      invitationOpened =
        true;


      /*
       * Start the opening animation.
       *
       * The CSS controls the actual sequence:
       *
       * 0s    -> folds closed
       * 0s    -> fold starts
       * 1.75s -> panels mostly open
       * 2.7s  -> camera completes zoom
       */

      coverScreen.classList.add(
        "is-opening"
      );


    setTimeout(
    () => {

        coverface.style.zIndex = 6;
        openInvitationButton.style.display = "none";
        outerborder.style.borderColor = "wine";
        smallGanesh.style.zIndex = 6;

    }, 600);

      /*
       * Start background music only
       * after the guest interacts.
       */

      startMusic();


      /*
       * Let the complete animation finish
       * before removing the cover.
       */

      setTimeout(
        () => {

          coverScreen.remove();

          document.body.classList.remove(
            "intro-active"
          );


          /*
           * Start first-page reveal.
           */

          const hero =
            document.querySelector(
              ".hero-section"
            );

          if (hero) {

            hero.classList.add(
              "visible"
            );

          }

        },

        2750

      );

    }


    /* =====================================================
       CLICK HANDLERS
       ===================================================== */

    bifoldStage.addEventListener(
      "click",
      openInvitation
    );


    openInvitationButton.addEventListener(
      "click",
      (event) => {

        /*
         * Prevent the same event from
         * triggering twice.
         */

        event.stopPropagation();

        openInvitation();

      }
    );


    /* =====================================================
       KEYBOARD ACCESS
       ===================================================== */

    bifoldStage.setAttribute(
      "tabindex",
      "0"
    );


    bifoldStage.addEventListener(
      "keydown",
      (event) => {

        if (
          event.key === "Enter" ||
          event.key === " "
        ) {

          event.preventDefault();

          openInvitation();

        }

      }
    );


    /* =====================================================
       MUSIC
       ===================================================== */

    async function startMusic() {

      if (
        !music ||
        musicStarted
      ) {

        return;

      }


      try {

        await music.play();

        musicStarted =
          true;

        musicToggle.classList.add(
          "playing"
        );

      } catch (error) {

        /*
         * Some browsers can still block
         * playback even after interaction.
         */

        console.info(
          "Music playback requires manual start."
        );

      }

    }


    async function toggleMusic() {

      if (!music) {
        return;
      }


      if (music.paused) {

        try {

          await music.play();

          musicToggle.classList.add(
            "playing"
          );

        } catch (error) {

          console.warn(
            "Could not play music:",
            error
          );

        }

      } else {

        music.pause();

        musicToggle.classList.remove(
          "playing"
        );

      }

    }


    musicToggle.addEventListener(
      "click",
      toggleMusic
    );


    /* =====================================================
       SCROLL REVEALS
       ===================================================== */

    const revealElements =
      document.querySelectorAll(
        ".reveal"
      );


    const revealObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                entry.target.classList.add(
                  "visible"
                );

                revealObserver.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: 0.15,
          rootMargin:
            "0px 0px -60px 0px"
        }
      );


    revealElements.forEach(
      (element) => {

        /*
         * Hero is manually revealed
         * after the cover disappears.
         */

        if (
          !element.classList.contains(
            "hero-section"
          )
        ) {

          revealObserver.observe(
            element
          );

        }

      }
    );


    /* =====================================================
       COUNTDOWN
       ===================================================== */

    /*
     * CHANGE THIS DATE/TIME.
     *
     * Current:
     * 20 December 2026
     * 7:00 PM
     */

    const weddingDate =
      new Date(
        "December 20, 2026 19:00:00"
      ).getTime();


    const daysElement =
      document.getElementById(
        "days"
      );

    const hoursElement =
      document.getElementById(
        "hours"
      );

    const minutesElement =
      document.getElementById(
        "minutes"
      );

    const secondsElement =
      document.getElementById(
        "seconds"
      );


    function updateCountdown() {

      const now =
        Date.now();


      const difference =
        weddingDate - now;


      if (
        difference <= 0
      ) {

        daysElement.textContent =
          "00";

        hoursElement.textContent =
          "00";

        minutesElement.textContent =
          "00";

        secondsElement.textContent =
          "00";

        return;

      }

      const targetDate = new Date("November 25, 2026 00:00:00").getTime();
      const current = new Date().getTime();
      const diff = targetDate - current;

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      const hours =
        Math.floor(
          (
            diff /
            (1000 * 60 * 60)
          ) % 24
        );


      const minutes =
        Math.floor(
          (
            diff /
            (1000 * 60)
          ) % 60
        );


      const seconds =
        Math.floor(
          (
            diff /
            1000
          ) % 60
        );


      daysElement.textContent =
        String(days)
          .padStart(2, "0");


      hoursElement.textContent =
        String(hours)
          .padStart(2, "0");


      minutesElement.textContent =
        String(minutes)
          .padStart(2, "0");


      secondsElement.textContent =
        String(seconds)
          .padStart(2, "0");

    }


    updateCountdown();


    setInterval(
      updateCountdown,
      1000
    );


    /* =====================================================
       ADD TO CALENDAR
       ===================================================== */

    const calendarButton =
      document.getElementById(
        "calendarButton"
      );


    calendarButton.addEventListener(
      "click",
      () => {

        /*
         * 7:00 PM IST
         *
         * IST is UTC + 5:30
         *
         * 7 PM IST = 13:30 UTC
         */

        const start =
          "20261220T133000Z";


        const end =
          "20261220T160000Z";


        const eventData = [

          "BEGIN:VCALENDAR",

          "VERSION:2.0",

          "PRODID:-//Ashish & Archana//Wedding Invitation//EN",

          "BEGIN:VEVENT",

          `UID:navin-priya-${Date.now()}@wedding`,

          `DTSTAMP:${formatICSDate(
            new Date()
          )}`,

          `DTSTART:${start}`,

          `DTEND:${end}`,

          "SUMMARY:Navin & Priya — Wedding",

          "LOCATION:The Grand Palace, Chennai, Tamil Nadu",

          "DESCRIPTION:Wedding celebration of Navin & Priya.",

          "END:VEVENT",

          "END:VCALENDAR"

        ].join("\r\n");


        const blob =
          new Blob(
            [eventData],
            {
              type:
                "text/calendar;charset=utf-8"
            }
          );


        const url =
          URL.createObjectURL(
            blob
          );


        const downloadLink =
          document.createElement(
            "a"
          );


        downloadLink.href =
          url;


        downloadLink.download =
          "Navin-Priya-Wedding.ics";


        document.body.appendChild(
          downloadLink
        );


        downloadLink.click();


        downloadLink.remove();


        URL.revokeObjectURL(
          url
        );

      }
    );


    function formatICSDate(
      date
    ) {

      const pad =
        (number) =>
          String(number)
            .padStart(2, "0");


      return (

        date.getUTCFullYear() +

        pad(
          date.getUTCMonth() + 1
        ) +

        pad(
          date.getUTCDate()
        ) +

        "T" +

        pad(
          date.getUTCHours()
        ) +

        pad(
          date.getUTCMinutes()
        ) +

        pad(
          date.getUTCSeconds()
        ) +

        "Z"

      );

    }

  }
);
