"use strict";

// ========================================
// 1. RECUPERO DEGLI ELEMENTI HTML
// ========================================

const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const storyScreen = document.getElementById("story-screen");

const startButton = document.getElementById("start-button");
const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");

const answerArea = document.getElementById("answer-area");
const quizHint = document.getElementById("quiz-hint");


// ========================================
// 2. CAMBIO DELLE SCHERMATE
// ========================================

function showScreen(screenToShow) {

    const screens = [
        welcomeScreen,
        quizScreen,
        storyScreen
    ];

    screens.forEach(function (screen) {

        const isTarget = screen === screenToShow;

        screen.hidden = !isTarget;
        screen.classList.toggle("active", isTarget);

    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ========================================
// 3. APERTURA DELLA SORPRESA
// ========================================

startButton.addEventListener("click", function () {

    showScreen(quizScreen);

});


// ========================================
// 4. PULSANTE NO CHE SI SPOSTA
// ========================================

let noAttempts = 0;

function moveNoButton() {

    noAttempts++;

    // Il pulsante SÌ cresce gradualmente.
	const yesScale = Math.min(
		1 + noAttempts * 0.08,
		1.5
	);

    yesButton.style.transform = `scale(${yesScale})`;

    // Attiviamo il posizionamento assoluto al primo movimento.
    noButton.style.position = "absolute";

    const areaRect = answerArea.getBoundingClientRect();
    const noRect = noButton.getBoundingClientRect();
    const yesRect = yesButton.getBoundingClientRect();

    const margin = 12;
    const minDistance = Math.min(100, areaRect.width * 0.25);

    // Posizione del SÌ rispetto all'area.
    const yesLeft = yesRect.left - areaRect.left;
    const yesTop = yesRect.top - areaRect.top;
    const yesRight = yesLeft + yesRect.width;
    const yesBottom = yesTop + yesRect.height;

    // Posizione attuale del NO rispetto all'area.
    const currentX = noRect.left - areaRect.left;
    const currentY = noRect.top - areaRect.top;

    // Limiti dell'area disponibile.
    const maxX = areaRect.width - noRect.width - margin;
    const maxY = areaRect.height - noRect.height - margin;

    let newX;
    let newY;
    let validPosition = false;

    // Cerchiamo una posizione lontana da quella attuale
    // e che non si sovrapponga al SÌ.
    for (let i = 0; i < 300; i++) {

        newX = margin + Math.random() * Math.max(0, maxX - margin);
        newY = margin + Math.random() * Math.max(0, maxY - margin);

        const distance = Math.hypot(
            newX - currentX,
            newY - currentY
        );

        const overlapsYes =
            newX < yesRight + margin &&
            newX + noRect.width > yesLeft - margin &&
            newY < yesBottom + margin &&
            newY + noRect.height > yesTop - margin;

        if (!overlapsYes && distance >= minDistance) {
			validPosition = true;
			break;
		}
    }

    if (validPosition) {
        noButton.style.left = `${newX}px`;
        noButton.style.top = `${newY}px`;
    }

    // Messaggi progressivi.
    if (noAttempts === 1) {
        quizHint.textContent = "Mmh... riprova. ♡";
    } else if (noAttempts === 2) {
        quizHint.textContent = "Sei proprio sicura?";
    } else if (noAttempts === 3) {
        quizHint.textContent = "Non credo che funzionerà...";
    } else {
        quizHint.textContent = "Il SÌ ti sta aspettando! ♥";
    }
}


// Mouse: il pulsante scappa quando il puntatore si avvicina.
noButton.addEventListener("pointerenter", function (event) {

    if (event.pointerType === "mouse") {
        moveNoButton();
    }

});


// Touch: il pulsante scappa quando viene toccato.
noButton.addEventListener("click", function (event) {

    event.preventDefault();

    moveNoButton();

});


// ========================================
// 5. RISPOSTA SÌ
// ========================================

yesButton.addEventListener("click", function () {

    quizHint.textContent = "Lo sapevo. ♥";

    // Piccola pausa per rendere il passaggio più naturale.

    yesButton.textContent = "LO SAPEVO ♥";
    yesButton.disabled = true;

    window.setTimeout(function () {

        showScreen(storyScreen);

        // Ripristino per eventuali visite successive.
        yesButton.textContent = "SÌ ♡";
        yesButton.disabled = false;

    }, 700);

});