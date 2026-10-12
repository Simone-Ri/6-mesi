
"use strict";

// ========================================
// 1. RECUPERO DEGLI ELEMENTI HTML
// ========================================

const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const storyScreen = document.getElementById("story-screen");
const memoryScreen = document.getElementById("memory-screen");
const seaScreen = document.getElementById("sea-screen");
const fourthScreen = document.getElementById("fourth-screen");
const fifthScreen = document.getElementById("fifth-screen");
const futureScreen = document.getElementById("future-screen");
const galleryScreen = document.getElementById("gallery-screen");

const openGalleryButton =
    document.getElementById("open-gallery-button");

const galleryBackButton =
    document.getElementById("gallery-back-button");

const kittySurpriseButton =
    document.getElementById("kitty-surprise-button");

const filmFrames =
    document.querySelectorAll(".film-frame");

const memoryDialog =
    document.getElementById("memory-dialog");

const closeMemoryDialogButton =
    document.getElementById("close-memory-dialog");

const memoryDialogTitle =
    document.getElementById("memory-dialog-title");

const memoryDialogDescription =
    document.getElementById("memory-dialog-description");

const startButton = document.getElementById("start-button");
const yesButton = document.getElementById("yes-button");
const noButton = document.getElementById("no-button");

const continueStoryButton =
    document.getElementById("continue-story-button");

const continueMemoryButton =
    document.getElementById("continue-memory-button");

const continueSeaButton =
    document.getElementById("continue-sea-button");

const continueFourthButton =
    document.getElementById("continue-fourth-button");

const continueFifthButton =
    document.getElementById("continue-fifth-button");

const answerArea = document.getElementById("answer-area");
const quizHint = document.getElementById("quiz-hint");


// ========================================
// 2. CAMBIO DELLE SCHERMATE
// ========================================

function showScreen(screenToShow) {

	const screens = [
		welcomeScreen,
		quizScreen,
		storyScreen,
		memoryScreen,
		seaScreen,
		fourthScreen,
		fifthScreen,
		futureScreen,
		galleryScreen
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

    const yesScale = Math.min(
        1 + noAttempts * 0.08,
        1.5
    );

    yesButton.style.transform = `scale(${yesScale})`;

    noButton.style.position = "absolute";

    const areaRect = answerArea.getBoundingClientRect();
    const noRect = noButton.getBoundingClientRect();
    const yesRect = yesButton.getBoundingClientRect();

    const margin = 12;
    const minDistance = Math.min(100, areaRect.width * 0.25);

    const yesLeft = yesRect.left - areaRect.left;
    const yesTop = yesRect.top - areaRect.top;
    const yesRight = yesLeft + yesRect.width;
    const yesBottom = yesTop + yesRect.height;

    const currentX = noRect.left - areaRect.left;
    const currentY = noRect.top - areaRect.top;

    const maxX = areaRect.width - noRect.width - margin;
    const maxY = areaRect.height - noRect.height - margin;

    let newX;
    let newY;
    let validPosition = false;

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

noButton.addEventListener("pointerenter", function (event) {

    if (event.pointerType === "mouse") {
        moveNoButton();
    }

});

noButton.addEventListener("click", function (event) {

    event.preventDefault();
    moveNoButton();

});


// ========================================
// 5. RISPOSTA SÌ
// ========================================

yesButton.addEventListener("click", function () {

    quizHint.textContent = "Lo sapevo. ♥";

    yesButton.textContent = "LO SAPEVO ♥";
    yesButton.disabled = true;

    window.setTimeout(function () {

        showScreen(storyScreen);

        yesButton.textContent = "SÌ ♡";
        yesButton.disabled = false;

    }, 700);

});


// ========================================
// 6. PASSAGGIO AL CAPITOLO II
// ========================================

continueStoryButton.addEventListener("click", function () {

    showScreen(memoryScreen);

});


// ========================================
// 7. PASSAGGIO AL CAPITOLO III
// ========================================

continueMemoryButton.addEventListener("click", function () {

    showScreen(seaScreen);

});


// ========================================
// 8. PASSAGGIO AL CAPITOLO IV
// ========================================

continueSeaButton.addEventListener("click", function () {

    showScreen(fourthScreen);

});


// ========================================
// 9. PASSAGGIO AL CAPITOLO V
// ========================================

continueFourthButton.addEventListener("click", function () {

    showScreen(fifthScreen);

});


// ========================================
// 10. PASSAGGIO AL CAPITOLO VI
// ========================================

continueFifthButton.addEventListener("click", function () {

    showScreen(futureScreen);

});

// ========================================
// 11. APERTURA DEL RULLINO
// ========================================

openGalleryButton.addEventListener("click", function () {

    showScreen(galleryScreen);

});


// ========================================
// 12. RITORNO ALLA STORIA
// ========================================

galleryBackButton.addEventListener("click", function () {

    showScreen(futureScreen);

});


// ========================================
// 13. APERTURA DELLE FOTOGRAFIE
// ========================================

filmFrames.forEach(function (frame) {

    frame.addEventListener("click", function () {

        const title = frame.dataset.title;
        const description = frame.dataset.description;

        memoryDialogTitle.textContent = title;
        memoryDialogDescription.textContent = description;

        memoryDialog.showModal();

    });

});


// ========================================
// 14. CHIUSURA DELLA FOTOGRAFIA
// ========================================

closeMemoryDialogButton.addEventListener("click", function () {

    memoryDialog.close();

});


// Chiude la finestra cliccando sullo sfondo.

memoryDialog.addEventListener("click", function (event) {

    if (event.target === memoryDialog) {
        memoryDialog.close();
    }

});


// ========================================
// 15. SORPRESA HELLO KITTY
// ========================================

kittySurpriseButton.addEventListener("click", function () {

    memoryDialogTitle.textContent = "Una cosa che voglio dirti...";

    memoryDialogDescription.textContent =
        "Tra tutti i ricordi che potrei conservare, " +
        "il mio preferito è sapere che ne abbiamo ancora " +
        "tantissimi da vivere insieme. Ti amo, stellina. ♡";

    memoryDialog.classList.add("kitty-secret-dialog");

    memoryDialog.showModal();

});


// Ripristina il contenuto e lo stile quando la finestra si chiude.

memoryDialog.addEventListener("close", function () {

    memoryDialog.classList.remove("kitty-secret-dialog");

});
