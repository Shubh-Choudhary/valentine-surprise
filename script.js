const textElement = document.getElementById("text");
const button = document.getElementById("startBtn");
const title = document.getElementById("title");
const music = document.getElementById("bgMusic");

const proposalBox = document.querySelector(".proposal");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const messages = [
    "I was trying to find the right words… 💭",
    "But my heart kept interrupting 🥹",
    "You make normal days feel special ✨"
];

let msgIndex = 0;
let charIndex = 0;
let musicPlayed = false;

/* ---------------- TYPING EFFECT ---------------- */
function typeText() {
    if (charIndex < messages[msgIndex].length) {
        textElement.textContent += messages[msgIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 55);
    } else {
        textElement.classList.add("glow", "sparkle");
    }
}

typeText();

/* ---------------- BUTTON CLICK ---------------- */
button.addEventListener("click", () => {

    // Play music only once
    if (!musicPlayed) {
        music.play().catch(() => { });
        musicPlayed = true;
    }

    textElement.classList.remove("glow", "sparkle");

    msgIndex++;
    if (msgIndex < messages.length) {
        textElement.textContent = "";
        charIndex = 0;
        typeText();
    } else {
        // Scene transition
        const card = document.querySelector(".card");
        card.classList.add("fade-out");

        setTimeout(() => {
            title.textContent = "Just one question… 💕";
            textElement.textContent = "Something I’ve been meaning to ask 😌";
            button.style.display = "none"; // hide continue button
            card.classList.remove("fade-out");

            // SHOW PROPOSAL (RIGHT PLACE)
            proposalBox.classList.remove("hidden");
        }, 600);
    }
});

/* ---------------- FLOATING HEARTS ---------------- */
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.textContent = "❤️";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = 3 + Math.random() * 3 + "s";
    document.querySelector(".hearts").appendChild(heart);

    setTimeout(() => heart.remove(), 6000);
}

setInterval(createHeart, 400);

/* ---------------- NO BUTTON RUNAWAY ---------------- */
function moveNoBtn() {
    const x = Math.random() * 200 - 100;
    const y = Math.random() * 200 - 100;
    noBtn.style.transform = `translate(${x}px, ${y}px)`;
}

noBtn.addEventListener("mouseenter", moveNoBtn);
noBtn.addEventListener("touchstart", moveNoBtn);

/* ---------------- YES BUTTON ---------------- */
yesBtn.addEventListener("click", () => {

    // Hide proposal box
    proposalBox.style.display = "none";

    // Hide the entire card to remove the card background
    const card = document.querySelector(".card");
    card.style.display = "none";

    // Clear Phase-3 text completely
    textElement.textContent = "";
    title.textContent = "";

    // Check if celebration message already exists
    let msg = document.querySelector(".celebration-msg");
    let confettiContainer = document.querySelector(".confetti-container");

    if (!msg) {
        // Celebration message
        msg = document.createElement("div");
        msg.classList.add("celebration-msg");
        msg.textContent = "I knew you’d say YES! 🥰";
        document.body.appendChild(msg);
    }

    if (!confettiContainer) {
        // Create confetti container
        confettiContainer = document.createElement("div");
        confettiContainer.classList.add("confetti-container");
        document.body.appendChild(confettiContainer);// Generate confetti
        for (let i = 0; i < 150; i++) {
            const confetti = document.createElement("div");
            confetti.classList.add("confetti"); confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
            confetti.style.left = Math.random() * 100 + "vw";
            confetti.style.animationDuration = 2 + Math.random() * 2 + "s";
            confetti.style.width = 5 + Math.random() * 10 + "px";
            confetti.style.height = 5 + Math.random() * 10 + "px";

            confettiContainer.appendChild(confetti);
            setTimeout(() => confetti.remove(), 4000);
        }
    }

    // Floating hearts boost (optional)
    for (let i = 0; i < 30; i++) {
        setTimeout(createHeart, i * 100);
    }
    // Big heart explosion after celebration
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const bigHeart = document.createElement("div");
            bigHeart.classList.add("big-heart");
            bigHeart.textContent = "💖";

            bigHeart.style.left = Math.random() * 90 + "vw";
            bigHeart.style.top = Math.random() * 80 + "vh";
            bigHeart.style.fontSize = 20 + Math.random() * 30 + "px";

            document.body.appendChild(bigHeart);

            setTimeout(() => bigHeart.remove(), 2000);
        }, i * 100);
    }

    // Show user input box after celebration
    const userMsgDiv = document.querySelector(".user-message");
    const customMsgInput = document.getElementById("customMsg");
    const sendMsgBtn = document.getElementById("sendMsg");

    // Show input box after 1s
    setTimeout(() => userMsgDiv.classList.remove("hidden"), 1000);

    // On send message
    sendMsgBtn.addEventListener("click", () => {
        const msg = customMsgInput.value.trim();
        if (msg === "") return;

        // Create floating message
        const floatMsg = document.createElement("div");
        floatMsg.textContent = msg;
        floatMsg.style.position = "fixed";
        floatMsg.style.left = Math.random() * 80 + "vw";
        floatMsg.style.top = "80vh";
        floatMsg.style.fontSize = "1.2rem";
        floatMsg.style.color = "#ff4d6d";
        floatMsg.style.zIndex = 10006;
        floatMsg.style.opacity = 1;
        floatMsg.style.fontFamily = "'Pacifico', cursive";
        document.body.appendChild(floatMsg);

        // Animate floating up
        let topPos = 80;
        const floatInterval = setInterval(() => {
            topPos -= 1;
            floatMsg.style.top = topPos + "vh";
            floatMsg.style.opacity -= 0.01;
            if (topPos < 20) {
                clearInterval(floatInterval);
                floatMsg.remove();
            }
        }, 20);

        // Clear input
        customMsgInput.value = "";

        // Optional: add floating hearts
        for (let i = 0; i < 5; i++) setTimeout(createHeart, i * 100);
    });
});