
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
	
const memoryDialogImage =
    document.getElementById("memory-dialog-image");

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
	updateNavMenuVisibility();

}


/* ========================================
   MENU DI NAVIGAZIONE CON CUORE
======================================== */

const navHeart = document.getElementById("navHeart");
const navPanel = document.getElementById("navPanel");
const navMenu = document.getElementById("navMenu");
const loveQuiz = document.getElementById("loveQuiz");

function updateNavMenuVisibility() {
    const currentScreen = document.querySelector(".screen.active");

    const isWelcome =
        currentScreen === welcomeScreen ||
        currentScreen === quizScreen;

    const isLoveQuizOpen =
        loveQuiz && loveQuiz.classList.contains("open");

    navMenu.hidden = isWelcome || isLoveQuizOpen;

    if (navMenu.hidden) {
        closeNavMenu();
    }
}

function closeNavMenu() {
    navPanel.hidden = true;
    navHeart.setAttribute("aria-expanded", "false");
}

navHeart.addEventListener("click", function () {
    const isOpening = navPanel.hidden;

    navPanel.hidden = !isOpening;
    navHeart.setAttribute("aria-expanded", String(isOpening));
});

document.addEventListener("click", function (event) {
    if (!navMenu.contains(event.target)) {
        closeNavMenu();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeNavMenu();
    }
});

document.querySelectorAll(".nav-link[data-screen]").forEach(function (link) {
    link.addEventListener("click", function () {
        const targetScreen = document.getElementById(
            link.dataset.screen
        );

        if (targetScreen) {
            showScreen(targetScreen);
        }

        closeNavMenu();
    });
});


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

if (galleryBackButton) {
    galleryBackButton.addEventListener("click", function () {
        showScreen(futureScreen);
    });
}


// ========================================
// 13. APERTURA DELLE FOTOGRAFIE
// ========================================

filmFrames.forEach(function (frame) {
    frame.addEventListener("click", function () {
        const title = frame.dataset.title;
        const description = frame.dataset.description;
        const image = frame.querySelector(".frame-photo img");

        memoryDialogTitle.textContent = title;
        memoryDialogDescription.textContent = description;

        if (image) {
            memoryDialogImage.src = image.src;
            memoryDialogImage.alt = title;
            memoryDialogImage.style.display = "block";
        } else {
            memoryDialogImage.removeAttribute("src");
            memoryDialogImage.style.display = "none";
        }

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

    memoryDialogImage.src = "pulsante.jpeg";
    memoryDialogImage.alt = "Una sorpresa speciale per te";

    memoryDialog.classList.add("kitty-secret-dialog");

    memoryDialog.showModal();

});




// Ripristina il contenuto e lo stile quando la finestra si chiude.

memoryDialog.addEventListener("close", function () {

    memoryDialog.classList.remove("kitty-secret-dialog");

});


/* ===== QUIZ D'AMORE ===== */
(() => {
  const questions = [
    {
      q: "Dove ci siamo visti per la prima volta?",
      a: [
        "In autobus",
        "In fila alla motorizzazione",
        "Nella sala d’attesa",
        "Alla fermata dell’autobus"
      ],
      correct: "In fila alla motorizzazione"
    },
    {
      q: "Qual è la cosa di te che mi piace di più?",
      a: ["Il tuo carattere", "I tuoi occhi", "Il tuo culo", "Tutto di te"],
      correct: "Tutto di te"
    },
    {
      q: "A quale di queste cose faccio più fatica a resistere quando si tratta di te?",
      a: [
        "Al tuo sorriso",
        "Al tuo sguardo",
        "Alla voglia di abbracciarti",
        "A tutte queste cose"
      ],
      correct: "A tutte queste cose"
    },
    {
      q: "Dove ti ho chiesto il numero di telefono?",
      a: ["A Raffa", "Su Instagram", "A Salò", "A Villanuova"],
      correct: "A Raffa"
    },
    {
      q: "Dove abbiamo fatto la nostra prima foto insieme?",
      a: ["A Salò", "A casa di Duro", "A casa tua", "Al McDonald's"],
      correct: "A casa di Duro"
    },
    {
      q: "Qual è il mio artista preferito?",
      a: ["Tony Boy", "Shiva", "Khodì", "Massimo Pericolo"],
      correct: "Shiva"
    },
    {
      q: "Qual è il mio cartone animato preferito?",
      a: [
        "Teen Titans Go!",
        "Clarence",
        "Lo straordinario mondo di Gumball",
        "Dragon Ball"
      ],
      correct: "Lo straordinario mondo di Gumball"
    },
    {
      q: "Quanto ami Simon?",
      a: [
        "Non lo amo ",
        "Abbastanza",
        "è l'amore della mia vita",
        "Non so quantificarlo"
      ],
      correct: "è l'amore della mia vita"
    },
    {
      q: "Quanto è in debito Nefe con Simon?",
      a: ["50 €", "90 €", "53.50 €", "Infiniti bacetti"],
      correct: "Infiniti bacetti"
    },
    {
      q: "A che ora ti ho scritto per la prima volta su Instagram?",
      a: ["20:15", "21:05", "20:30", "19:45"],
      correct: "20:30"
    }
  ];

  const reasons = [
    "Ti amo perché quando ti guardo negli occhi non vedo soltanto la mia fidanzata: vedo la mia compagna di vita, la persona con cui vorrei condividere il presente e tutti i domani che verranno.",
    "Ti amo perché anche i momenti più semplici, quando ci sei tu, riescono a trasformarsi in ricordi che vorrei rivivere ancora.",
    "Ti amo perché il tuo sorriso ha il potere di cambiarmi la giornata, anche quando tutto il resto sembra andare storto.",
    "Ti amo perché con te posso essere davvero me stesso, senza dover fingere di essere qualcuno di diverso.",
    "Ti amo perché, anche se potessi scegliere chiunque al mondo, dopo aver guardato tutti sceglierei comunque te.",
    "Ti amo perché adoro averti accanto, anche quando non facciamo niente di speciale: a volte mi basta semplicemente esserci insieme.",
    "Ti amo perché ripensando a come ci siamo incontrati mi rendo conto di quanto sono fortunato che le nostre strade si siano incrociate.",
    "Ti amo perché con te non sento il bisogno di niente e di nessun altro: quando sono con te, sento di essere esattamente dove voglio stare.",
    "Ti amo perché anche quando discutiamo, alla fine resti la mia persona preferita. Posso arrabbiarmi per un momento, ma non cambia quello che sei per me né quanto ti amo.",
    "Ti amo per come sei. Non devi cambiare per me e nemmeno per nessun altro al mondo: ai miei occhi sei perfetta proprio perché sei tu."
  ];

  const $ = id => document.getElementById(id);

  let questionOrder = [];
  let current = 0;
  let score = 0;
  let selected = null;

  function shuffle(array) {
    const result = [...array];

    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }

    return result;
  }

  function openQuiz() {
    current = 0;
    score = 0;
    selected = null;
    questionOrder = shuffle(questions.map((_, i) => i));

    $("lqQuizCard").classList.remove("lq-hidden");
    $("lqResultCard").classList.add("lq-hidden");
    $("lqLoveCard").classList.add("lq-hidden");
	$("loveQuiz").classList.add("open");
	updateNavMenuVisibility();

	renderQuestion();
	window.scrollTo({ top: 0, behavior: "smooth" });
  }

function closeQuiz() {
    $("loveQuiz").classList.remove("open");
    updateNavMenuVisibility();
}

  function renderQuestion() {
    selected = null;

    const question = questions[questionOrder[current]];

    $("lqCounter").textContent =
      `Domanda ${current + 1} di ${questions.length}`;

    $("lqProgressText").textContent = `${current} risposte date`;
    $("lqProgress").style.width =
      `${(current / questions.length) * 100}%`;

    $("lqQuestion").textContent = question.q;
    $("lqAnswers").replaceChildren();

    shuffle(question.a).forEach(answer => {
      const button = document.createElement("button");

      button.type = "button";
      button.className = "lq-answer";
      button.textContent = answer;

      button.addEventListener("click", () => {
        selected = answer;

        $("lqAnswers")
          .querySelectorAll(".lq-answer")
          .forEach(option => option.classList.remove("selected"));

        button.classList.add("selected");
        $("lqNext").disabled = false;
      });

      $("lqAnswers").appendChild(button);
    });

    $("lqNext").disabled = true;
    $("lqNext").textContent =
      current === questions.length - 1
        ? "Scopri il risultato ♡"
        : "Prossima domanda ♡";
  }

  function nextQuestion() {
    if (selected === null) return;

    const question = questions[questionOrder[current]];

    if (selected === question.correct) {
      score++;
    }

    current++;

    if (current < questions.length) {
      renderQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    $("lqQuizCard").classList.add("lq-hidden");
    $("lqResultCard").classList.remove("lq-hidden");
    $("lqProgress").style.width = "100%";
    $("lqScore").textContent = `${score} / 10`;

    if (score === 10) {
      $("lqResultTitle").textContent = "Ma allora mi conosci davvero!";
      $("lqResultMessage").textContent =
        "Dieci su dieci… non potevi fare meglio. Ho preparato qualcosa in più proprio per te.";
      $("lqReveal").textContent = "Sblocca la sorpresa speciale ♡";
    } else if (score >= 7) {
      $("lqResultTitle").textContent = "Brava, amore mio!";
      $("lqResultMessage").textContent =
        "Mi conosci proprio bene. Ma ci sono ancora tante cose che voglio vivere con te.";
      $("lqReveal").textContent = "Apri i tuoi messaggi ♡";
    } else if (score >= 4) {
      $("lqResultTitle").textContent = "Non male, piccola!";
      $("lqResultMessage").textContent =
        "Qualche ricordo ti è sfuggito… per fortuna ti amo anche quando sbagli.";
      $("lqReveal").textContent = "Scopri i tuoi messaggi ♡";
    } else {
      $("lqResultTitle").textContent = "Amore, dobbiamo ripassare!";
      $("lqResultMessage").textContent =
        "Mi aspettavo qualcosa in più, ma non preoccuparti: le cose più importanti non sono un quiz.";
      $("lqReveal").textContent = "Ti perdono, apri qui ♡";
    }

    $("lqResultCard").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function revealReasons() {
    $("lqResultCard").classList.add("lq-hidden");
    $("lqLoveCard").classList.remove("lq-hidden");
    $("lqReasons").replaceChildren();
    $("lqBonus").classList.add("lq-hidden");

    // Prende tante frasi quanti sono i punti, senza ripetizioni.
    const chosenReasons = shuffle(reasons).slice(0, score);

    chosenReasons.forEach((reason, index) => {
      const card = document.createElement("article");
      card.className = "lq-reason";
      card.style.animationDelay = `${index * 0.13}s`;

      const label = document.createElement("small");
      label.textContent = `Un motivo per cui ti amo · ${index + 1}`;

      const paragraph = document.createElement("p");
      paragraph.textContent = reason;

      card.append(label, paragraph);
      $("lqReasons").appendChild(card);
    });

    if (score === 10) {
      $("lqBonus").classList.remove("lq-hidden");
    }

    $("lqLoveCard").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  // Collega i pulsanti del quiz.
  $("lqClose").addEventListener("click", closeQuiz);
  $("lqNext").addEventListener("click", nextQuestion);
  $("lqReveal").addEventListener("click", revealReasons);
  $("lqBack").addEventListener("click", closeQuiz);

  // Collega il pulsante di avvio già presente nel sito.
  // Aggiungi id="startQuizButton" al tuo pulsante esistente.
  const startButton = $("startQuizButton");

  if (startButton) {
    startButton.addEventListener("click", openQuiz);
  } else {
    console.warn(
      'Quiz: aggiungi id="startQuizButton" al pulsante che avvia il quiz.'
    );
  }
})();


const revealInstagramMemory = document.getElementById("reveal-instagram-memory");
const instagramMemory = document.getElementById("instagram-memory");
const closeInstagramMemory = document.getElementById("close-instagram-memory");

if (revealInstagramMemory && instagramMemory && closeInstagramMemory) {
  const modalContent = instagramMemory.querySelector(".memory-modal-content");

  function closeMemory() {
    instagramMemory.hidden = true;
    revealInstagramMemory.setAttribute("aria-expanded", "false");
    revealInstagramMemory.focus();
  }

  revealInstagramMemory.addEventListener("click", () => {
    instagramMemory.hidden = false;
    revealInstagramMemory.setAttribute("aria-expanded", "true");
    closeInstagramMemory.focus();
  });

  closeInstagramMemory.addEventListener("click", closeMemory);

  instagramMemory.addEventListener("click", (event) => {
    if (event.target === instagramMemory) {
      closeMemory();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !instagramMemory.hidden) {
      closeMemory();
    }
  });
}


const letterEnvelope = document.getElementById("open-love-letter");
const loveLetter = document.getElementById("love-letter");
const closeLoveLetter = document.getElementById("close-love-letter");
const letterHint = document.getElementById("letter-hint");

if (letterEnvelope && loveLetter && closeLoveLetter && letterHint) {
  function openLetter() {
    if (!loveLetter.hidden) return;

    letterEnvelope.classList.add("is-open");
    letterEnvelope.setAttribute("aria-expanded", "true");
    letterHint.hidden = true;

    window.setTimeout(() => {
      loveLetter.hidden = false;
      loveLetter.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
        block: "start"
      });
    }, 350);
  }

  function closeLetter() {
    loveLetter.hidden = true;
    letterEnvelope.classList.remove("is-open");
    letterEnvelope.setAttribute("aria-expanded", "false");
    letterHint.hidden = false;
    letterEnvelope.focus();
  }

  letterEnvelope.addEventListener("click", openLetter);
  closeLoveLetter.addEventListener("click", closeLetter);
}


/* CAPITOLO IV — RIVELA LA FOTO AL CHIARO DI LUNA */

const moonPhotoButton = document.getElementById("moon-photo-button");
const moonPhotoReveal = document.getElementById("moon-photo-reveal");

if (moonPhotoButton && moonPhotoReveal) {
    moonPhotoButton.addEventListener("click", () => {
        const isRevealed = moonPhotoButton.classList.toggle("is-revealed");

        moonPhotoReveal.hidden = !isRevealed;
        moonPhotoButton.setAttribute("aria-expanded", String(isRevealed));

        if (isRevealed) {
            moonPhotoReveal.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                    ? "auto"
                    : "smooth",
                block: "nearest"
            });
        }
    });
}


/* CAPITOLO V — BIGLIETTI SEGRETI */

document.querySelectorAll("#fifth-screen .fifth-note-button")
    .forEach((button) => {
        button.addEventListener("click", () => {
            const messageId = button.getAttribute("aria-controls");
            const message = document.getElementById(messageId);

            if (!message) return;

            const willOpen = message.hidden;

            message.hidden = !willOpen;
            button.setAttribute("aria-expanded", String(willOpen));

            const action = button.querySelector(".fifth-note-action");

            if (action) {
                action.textContent = willOpen
                    ? "Biglietto aperto ♡"
                    : "Apri il biglietto ↗";
            }
        });
    });


/* ========================================
   FINALE STELLARE — LA MIA STELLINA
   ======================================== */

const stellinaFinalScreen =
    document.getElementById("stellina-finale-screen");

const stellinaRevealButton =
    document.getElementById("stellina-reveal-button");

const stellinaMemory =
    document.getElementById("stellina-memory");

const openStellinaFinale = () => {
    if (!stellinaFinalScreen) return;

    // Nasconde le altre schermate del sito.
    document.querySelectorAll(".screen").forEach((screen) => {
        screen.classList.remove("active");
    });

    // Mostra il finale.
    stellinaFinalScreen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
};

if (stellinaRevealButton && stellinaMemory) {
    stellinaRevealButton.addEventListener("click", () => {
        stellinaRevealButton.hidden = true;
        stellinaMemory.hidden = false;

        const intro = document.getElementById("stellina-intro");

        if (intro) {
            intro.textContent =
                "E questa è una delle piccole cose che " +
                "vorrei conservare di noi. ♡";
        }

        // Porta dolcemente la sorpresa in vista.
        window.setTimeout(() => {
            stellinaMemory.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 100);
    });
}

// Rende disponibile la funzione per collegarla
// al pulsante che conclude la schermata precedente.
window.openStellinaFinale = openStellinaFinale;
