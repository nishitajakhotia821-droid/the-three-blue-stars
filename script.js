"use strict";

/*==================================================
THE THREE BLUE STARS
Premium Friendship Website
Main Script
==================================================*/

/*==================================================
HELPERS
==================================================*/

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

/*==================================================
AOS
==================================================*/

if (typeof AOS !== "undefined") {

    AOS.init({

        duration: 1200,
        once: true,
        offset: 100

    });

}

/*==================================================
LOADER
==================================================*/

window.addEventListener("load", () => {

    const loader = $("#loader");

    if (!loader) return;

    setTimeout(() => {

        loader.style.opacity = "0";

        loader.style.pointerEvents = "none";

        setTimeout(() => {

            loader.remove();

        }, 700);

    }, 1800);

});

/*==================================================
BACKGROUND MUSIC
==================================================*/

const music = $("#bgMusic");
const musicBtn = $("#musicBtn");

if (music && musicBtn) {

    let playing = false;

    musicBtn.addEventListener("click", async () => {

        try {

            if (!playing) {

                await music.play();

                playing = true;

                musicBtn.innerHTML =
                    "<i class='fa-solid fa-volume-high'></i>";

                musicBtn.classList.add("playing");

                musicBtn.setAttribute(
                    "aria-label",
                    "Pause Music"
                );

            }

            else {

                music.pause();

                playing = false;

                musicBtn.innerHTML =
                    "<i class='fa-solid fa-music'></i>";

                musicBtn.classList.remove("playing");

                musicBtn.setAttribute(
                    "aria-label",
                    "Play Music"
                );

            }

        }

        catch (error) {

            console.warn(error);

        }

    });

}

/*==================================================
START JOURNEY
==================================================*/

const startBtn = $("#startJourney");

if (startBtn) {

    startBtn.addEventListener("click", () => {

        window.location.href = "pages/chapter1.html";

    });

}

/*==================================================
CURSOR
==================================================*/

const cursor = $(".cursor");

if (cursor) {

    window.addEventListener("pointermove", (e) => {

        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";

    });

}

/*==================================================
HERO FADE
==================================================*/

const hero = $(".hero");

if (hero) {

    window.addEventListener("scroll", () => {

        hero.style.opacity = Math.max(

            0,

            1 - window.scrollY / 700

        );

    });

}

/*==================================================
FLOATING STARS
==================================================*/

const stars = $("#stars");

if (stars) {

    const TOTAL = 180;

    for (let i = 0; i < TOTAL; i++) {

        const star = document.createElement("span");

        star.className = "star";

        star.style.left =
            Math.random() * 100 + "vw";

        star.style.top =
            Math.random() * 100 + "vh";

        star.style.opacity =
            Math.random();

        star.style.animationDuration =
            3 + Math.random() * 6 + "s";

        star.style.animationDelay =
            Math.random() * 5 + "s";

        stars.appendChild(star);

    }

}

/*==================================================
SHOOTING STAR
==================================================*/

function createMeteor() {

    const meteor = document.createElement("div");

    meteor.className = "meteor";

    meteor.style.left =
        Math.random() * innerWidth + "px";

    meteor.style.top = "-120px";

    meteor.style.animationDuration =
        2 + Math.random() + "s";

    document.body.appendChild(meteor);

    meteor.addEventListener("animationend", () => {

        meteor.remove();

    });

}

setInterval(createMeteor, 4000);

/*==================================================
TYPEWRITER QUOTE
==================================================*/

const quote = $(".quote h1");

if (quote) {

    const text = quote.textContent.trim();

    quote.textContent = "";

    let i = 0;
    let started = false;

    function typeWriter() {

        if (i >= text.length) return;

        quote.textContent += text.charAt(i);

        i++;

        setTimeout(typeWriter, 35);

    }

    const observer = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting && !started) {

                started = true;

                typeWriter();

                observer.disconnect();

            }

        });

    }, {

        threshold: 0.4

    });

    observer.observe(quote);

}

/*==================================================
SCROLL REVEAL
==================================================*/

const revealItems = $$(
    ".glass, .story, .missionCard, .characterCard, .promiseCard, .timelineItem, .certificateCard"
);

if (revealItems.length) {

    const revealObserver = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("fade-in");

                    revealObserver.unobserve(entry.target);

                }

            });

        },

        {

            threshold: 0.15

        }

    );

    revealItems.forEach((item) => {

        revealObserver.observe(item);

    });

}

/*==================================================
BUTTON GLOW
==================================================*/

if (musicBtn) {

    setInterval(() => {

        musicBtn.classList.toggle("glow");

    }, 1800);

}

/*==================================================
COUNTDOWN
==================================================*/

const daysEl = $("#days");
const hoursEl = $("#hours");
const minutesEl = $("#minutes");
const secondsEl = $("#seconds");

if (daysEl && hoursEl && minutesEl && secondsEl) {

    function getNextMeeting() {

        const now = new Date();

        const year = now.getFullYear();

        const august = new Date(year, 7, 15);
        const january = new Date(year, 0, 26);

        const dates = [];

        if (august > now)

            dates.push(august);

        else

            dates.push(new Date(year + 1, 7, 15));

        if (january > now)

            dates.push(january);

        else

            dates.push(new Date(year + 1, 0, 26));

        dates.sort((a, b) => a - b);

        return dates[0];

    }

    function updateCountdown() {

        const now = new Date();

        const target = getNextMeeting();

        const diff = target - now;

        if (diff <= 0) return;

        const days = Math.floor(diff / 86400000);

        const hours = Math.floor(diff % 86400000 / 3600000);

        const minutes = Math.floor(diff % 3600000 / 60000);

        const seconds = Math.floor(diff % 60000 / 1000);

        daysEl.textContent = String(days).padStart(2, "0");

        hoursEl.textContent = String(hours).padStart(2, "0");

        minutesEl.textContent = String(minutes).padStart(2, "0");

        secondsEl.textContent = String(seconds).padStart(2, "0");

    }

    updateCountdown();

    setInterval(updateCountdown, 1000);

}

/*==================================================
DOWNLOAD CERTIFICATE
==================================================*/

const downloadBtn = $("#downloadCertificate");

if (downloadBtn) {

    downloadBtn.addEventListener("click", () => {

        window.print();

    });

}

/*==================================================
SMOOTH BUTTON HOVER
==================================================*/

$$("button").forEach((button) => {

    button.addEventListener("mouseenter", () => {

        button.style.transform = "translateY(-4px) scale(1.04)";

    });

    button.addEventListener("mouseleave", () => {

        button.style.transform = "";

    });

});

/*==================================================
PREMIUM FIREWORKS ENGINE
==================================================*/

const canvas = document.getElementById("fireworks");

if (canvas) {

    const ctx = canvas.getContext("2d");

    let width;
    let height;

    let particles = [];
    let rockets = [];

    function resizeCanvas() {

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

    }

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    class Particle {

        constructor(x, y, color) {

            this.x = x;
            this.y = y;

            this.color = color;

            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 6 + 2;

            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;

            this.life = 100;
            this.alpha = 1;

            this.size = Math.random() * 3 + 2;

        }

        update() {

            this.x += this.vx;
            this.y += this.vy;

            this.vx *= 0.985;
            this.vy *= 0.985;

            this.vy += 0.04;

            this.life--;

            this.alpha = this.life / 100;

        }

        draw() {

            ctx.save();

            ctx.globalAlpha = this.alpha;

            ctx.beginPath();

            ctx.fillStyle = this.color;

            ctx.arc(

                this.x,
                this.y,
                this.size,
                0,
                Math.PI * 2

            );

            ctx.fill();

            ctx.restore();

        }

    }

    class Rocket {

        constructor() {

            this.x = Math.random() * width;

            this.y = height + 20;

            this.targetY =

                Math.random() * height * 0.45 +

                height * 0.15;

            this.speed = Math.random() * 3 + 7;

            this.color =

                `hsl(${Math.random() * 360},100%,70%)`;

        }

        update() {

            this.y -= this.speed;

            if (this.y <= this.targetY) {

                this.explode();

                return false;

            }

            return true;

        }

        draw() {

            ctx.beginPath();

            ctx.strokeStyle = this.color;

            ctx.lineWidth = 2;

            ctx.moveTo(this.x, this.y);

            ctx.lineTo(this.x, this.y + 18);

            ctx.stroke();

        }

        explode() {

            for (let i = 0; i < 90; i++) {

                particles.push(

                    new Particle(

                        this.x,

                        this.y,

                        this.color

                    )

                );

            }

        }

    }

    function launchRocket() {

        rockets.push(new Rocket());

    }

    function animate() {

        ctx.fillStyle = "rgba(4,8,25,0.18)";

        ctx.fillRect(

            0,

            0,

            width,

            height

        );

        rockets = rockets.filter((rocket) => {

            rocket.draw();

            return rocket.update();

        });

        particles = particles.filter((particle) => {

            particle.update();

            particle.draw();

            return particle.life > 0;

        });

        requestAnimationFrame(animate);

    }

    animate();

    const interval = setInterval(() => {

        if (!document.hidden) {

            launchRocket();

        }

    }, 900);

    document.addEventListener("visibilitychange", () => {

        if (!document.hidden) {

            launchRocket();

        }

    });

    window.addEventListener("beforeunload", () => {

        clearInterval(interval);

    });

}

/*==================================================
THE END

Thank You For Visiting
The Three Blue Stars

Created With 💙 By Nishita
==================================================*/