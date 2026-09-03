document.addEventListener("DOMContentLoaded", () => {

const loadingScreen =
    document.getElementById("loadingScreen");

const giftScreen =
    document.getElementById("giftScreen");

const nameScreen =
    document.getElementById("nameScreen");

const mainContent =
    document.getElementById("mainContent");

const giftBox =
    document.getElementById("giftBox");

const beginButton =
    document.getElementById("beginButton");

const music =
    document.getElementById("birthdayMusic");

const musicButton =
    document.getElementById("musicButton");

const balloons =
    document.querySelectorAll(".balloon");

const balloonCounter =
    document.getElementById("balloonCounter");

const flames =
    document.querySelectorAll(".flame");

const candleMessage =
    document.getElementById("candleMessage");

const envelope =
    document.getElementById("envelope");

const openLetterButton =
    document.getElementById("openLetterButton");

const celebrateButton =
    document.getElementById("celebrateButton");


let balloonsRemaining = 6;
let candlesRemaining = 3;
let musicPlaying = false;


/* =========================
   LOADING
========================= */

window.addEventListener("load", () => {

    setTimeout(() => {

        loadingScreen.style.display = "none";

    }, 900);

});


/* =========================
   OPEN GIFT
========================= */

function openGift() {

    if (giftBox.classList.contains("opened")) {
        return;
    }

    giftBox.classList.add("opened");

    createConfetti(70);

    /*
     * Animate gift lid.
     */

    const lid =
        document.querySelector(".gift-lid");

    lid.style.transform =
        "translateY(-90px) rotate(-8deg)";

    lid.style.top = "5px";


    /*
     * After gift opens,
     * reveal Marya.
     */

    setTimeout(() => {

        giftScreen.classList.add("hidden");

        nameScreen.classList.remove("hidden");

    }, 1200);

}


giftBox.addEventListener(
    "click",
    openGift
);


giftBox.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            openGift();

        }

    }
);


/* =========================
   START EXPERIENCE
========================= */

beginButton.addEventListener(
    "click",
    async () => {

        nameScreen.classList.add(
            "hidden"
        );

        mainContent.classList.remove(
            "hidden"
        );

        window.scrollTo(0, 0);

        createConfetti(100);

        /*
         * Mobile browsers permit
         * audio after user interaction.
         */

        try {

            await music.play();

            musicPlaying = true;

            musicButton.textContent =
                "🔊";

        } catch (error) {

            console.log(
                "Music requires another tap."
            );

        }

    }
);


/* =========================
   BALLOONS
========================= */

balloons.forEach((balloon) => {

    balloon.addEventListener(
        "click",
        () => {

            if (
                balloon.classList.contains(
                    "popped"
                )
            ) {
                return;
            }


            balloon.classList.add(
                "popped"
            );


            balloonsRemaining--;


            balloonCounter.textContent =
                balloonsRemaining;


            createConfetti(12);


            if (
                balloonsRemaining === 0
            ) {

                balloonCounter.textContent =
                    "🎉 All popped!";

                createConfetti(100);


                setTimeout(() => {

                    document
                        .getElementById(
                            "cakeSection"
                        )
                        .scrollIntoView({
                            behavior:
                                "smooth"
                        });

                }, 1000);

            }

        }
    );

});


/* =========================
   CANDLES
========================= */

flames.forEach(
    (flame, index) => {

        flame.addEventListener(
            "click",
            () => {

                if (
                    flame.classList.contains(
                        "off"
                    )
                ) {
                    return;
                }


                flame.classList.add(
                    "off"
                );


                flame.parentElement.classList.add(
                    "blown"
                );


                candlesRemaining--;


                createConfetti(8);


                if (
                    candlesRemaining > 0
                ) {

                    candleMessage.textContent =
                        `🕯️ ${
                            candlesRemaining
                        } candle${
                            candlesRemaining > 1
                                ? "s"
                                : ""
                        } remaining`;

                } else {

                    candleMessage.textContent =
                        "✨ Wish made! Happy Birthday Marya! 🎉";

                    createConfetti(150);


                    setTimeout(() => {

                        document
                            .getElementById(
                                "messageSection"
                            )
                            .scrollIntoView({
                                behavior:
                                    "smooth"
                            });

                    }, 1400);

                }

            }
        );

    }
);


/* =========================
   LETTER
========================= */

openLetterButton.addEventListener(
    "click",
    () => {

        envelope.classList.toggle(
            "open"
        );


        if (
            envelope.classList.contains(
                "open"
            )
        ) {

            openLetterButton.textContent =
                "Letter Opened 💕";

        } else {

            openLetterButton.textContent =
                "Open Your Letter 💌";

        }

    }
);


/* =========================
   MUSIC
========================= */

musicButton.addEventListener(
    "click",
    async () => {

        if (musicPlaying) {

            music.pause();

            musicPlaying = false;

            musicButton.textContent =
                "🔇";

            return;
        }


        try {

            await music.play();

            musicPlaying = true;

            musicButton.textContent =
                "🔊";

        } catch (error) {

            alert(
                "Tap the page once and try again."
            );

        }

    }
);


/* =========================
   FINAL CELEBRATION
========================= */

celebrateButton.addEventListener(
    "click",
    () => {

        createConfetti(200);

        launchFireworks();

    }
);

});

/* =========================
CONFETTI
========================= */

function createConfetti(amount = 80) {

const container =
    document.getElementById(
        "confettiContainer"
    );


const isMobile =
    window.innerWidth <= 600;


if (isMobile) {

    amount =
        Math.min(amount, 120);

}


const fragment =
    document.createDocumentFragment();


for (
    let i = 0;
    i < amount;
    i++
) {

    const piece =
        document.createElement(
            "div"
        );


    piece.className =
        "confetti";


    piece.style.left =
        Math.random() * 100 + "%";


    piece.style.animationDelay =
        Math.random() * .8 + "s";


    piece.style.opacity =
        .3 +
        Math.random() * .7;


    piece.style.background =
        [
            "#ff5ca8",
            "#ffd34d",
            "#8d6bff",
            "#5de1ff",
            "#ffffff"
        ][
            Math.floor(
                Math.random() * 5
            )
        ];


    fragment.appendChild(piece);

}


container.appendChild(fragment);


setTimeout(() => {

    container.innerHTML = "";

}, 4500);

}

/* =========================
FIREWORKS
========================= */

function launchFireworks() {

const container =
    document.getElementById(
        "fireworks"
    );


container.innerHTML = "";


const isMobile =
    window.innerWidth <= 600;


const bursts =
    isMobile ? 6 : 10;


for (
    let burst = 0;
    burst < bursts;
    burst++
) {

    setTimeout(
        () => {

            createFirework(
                container
            );

        },
        burst * 350
    );

}

}

function createFirework(container) {

const centerX =
    10 +
    Math.random() * 80;


const centerY =
    10 +
    Math.random() * 55;


const particleCount =
    window.innerWidth <= 600
        ? 22
        : 32;


for (
    let i = 0;
    i < particleCount;
    i++
) {

    const particle =
        document.createElement(
            "div"
        );


    particle.className =
        "firework-particle";


    particle.style.left =
        centerX + "%";


    particle.style.top =
        centerY + "%";


    const angle =
        (Math.PI * 2 * i) /
        particleCount;


    const distance =
        60 +
        Math.random() * 120;


    particle.style.setProperty(
        "--x",
        `${Math.cos(angle) * distance}px`
    );


    particle.style.setProperty(
        "--y",
        `${Math.sin(angle) * distance}px`
    );


    const colors = [
        "#ff4fa3",
        "#ffd34d",
        "#8f72ff",
        "#55e5ff",
        "#ffffff"
    ];


    particle.style.background =
        colors[
            Math.floor(
                Math.random() *
                colors.length
            )
        ];


    container.appendChild(
        particle
    );


    setTimeout(
        () => {

            particle.remove();

        },
        1400
    );

}

}