// --- JAVASCRIPT LOGIC BASED ON YOUR FIGMA DESIGN & PROMPTS (REVISED) ---

// Game Data
const gameData = [
    { question: "Post-apocalyptic RPG series by Bethesda", answer: "FALLOUT" },
    { question: "Princess in the land of Hyrule?", answer: "ZELDA" },
    { question: "Cowboy-themed open-world game by Rockstar", answer: "REDDEADREDEMPTION" },
    { question: "Main character of the 'Halo' series", answer: "MASTERCHIEF" },
    { question: "Developer of 'The Witcher 3'", answer: "CDPROJEKT" },
    { question: "Game with 'Creepers' and building blocks", answer: "MINECRAFT" },
    { question: "Italian plumber who saves a princess", answer: "MARIO" },
    { question: "Battle Royale game with building mechanics", answer: "FORTNITE" },
    { question: "Main city in Grand Theft Auto V", answer: "LOSSANTOS" },
    { question: "Fast, blue hedgehog from SEGA", answer: "SONIC" },
    { question: "Currency used in Fortnite", answer: "VBUCKS" },
    { question: "Famous ghost-eating arcade game", answer: "PACMAN" },
    { question: "Valve's FPS with a 'Bomb Defusal' mode", answer: "COUNTERSTRIKE" },
    { question: "The phrase 'Winner Winner Chicken Dinner' comes from...", answer: "PUBG" },
    { question: "Father figure to Ellie in The Last of Us", answer: "JOEL" },
    { question: "Iconic Nissan car in the Need For Speed series", answer: "SKYLINE" },
    { question: "Street racing game series from Electronic Arts", answer: "NEEDFORSPEED" },
    { question: "Fighting game title with a 'Fatality' finisher", answer: "MORTALKOMBAT" },
    { question: "Evil pharmaceutical company in Resident Evil", answer: "UMBRELLA" },
    { question: "Popular life simulation game from Maxis and EA", answer: "THESIMS" },
];
let availableQuestions = [...gameData];

// DOM Elements
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const scoreScreen = document.getElementById('score-screen');
const startButton = document.getElementById('start-button');
const scoreEl = document.getElementById('score');
const livesContainer = document.getElementById('lives-container');
const timeEl = document.getElementById('time');
const questionTextEl = document.getElementById('question-text');
const scrambledLettersContainer = document.getElementById('scrambled-letters-container');
const playerAnswerContainer = document.getElementById('player-answer-container');
const typeAnswerContainer = document.getElementById('type-answer-container');
const clickAnswerContainer = document.getElementById('click-answer-container');
const yourAnswerLabel = document.getElementById('your-answer-label');
const typeAnswerInput = document.getElementById('type-answer-input');
const typeModeBtn = document.getElementById('type-mode-btn');
const clickModeBtn = document.getElementById('click-mode-btn');
const finalScoreEl = document.getElementById('final-score');
const scoreTitleEl = document.getElementById('score-title');
const playAgainButton = document.getElementById('play-again-button');
const countdownTextEl = document.getElementById('countdown-text');
const toast = document.getElementById('toast-notification');
const trophyContainer = document.getElementById('trophy-container');

// Game State
let score = 0;
let lives = 3;
let timer;
let scoreScreenTimer;
let timeLeft = 30;
let currentCorrectAnswer = '';
let answerState = []; 
let isTypeMode = false;
let isTransitioning = false;
// NEW: State to track used tiles in typing mode
let typedAnswerTiles = [];

// --- Screen Management ---
function showScreen(screenToShow) {
    [startScreen, gameScreen, scoreScreen].forEach(screen => {
        if (!screen.classList.contains('hidden')) {
            screen.classList.add('hidden');
        }
    });
    screenToShow.classList.remove('hidden');
}


// --- Game Logic Functions ---
function initGame() {
    clearInterval(scoreScreenTimer);
    showScreen(startScreen);
}

function startGame() {
    score = 0;
    lives = 3;
    availableQuestions = [...gameData];
    updateScore();
    updateLives();
    showScreen(gameScreen);
    loadNextQuestion();
}

function loadNextQuestion() {
    isTransitioning = true;

    if (availableQuestions.length === 0) {
        endGame(true);
        return;
    }

    resetForNewWord();
    
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    const currentQuestion = availableQuestions.splice(questionIndex, 1)[0];
    
    currentCorrectAnswer = currentQuestion.answer.toUpperCase();
    questionTextEl.innerText = currentQuestion.question;
    
    typeAnswerInput.maxLength = currentCorrectAnswer.length;

    answerState = new Array(currentCorrectAnswer.length).fill(null);
    for (let i = 0; i < currentCorrectAnswer.length; i++) {
        const box = document.createElement('div');
        box.classList.add('answer-box');
        box.dataset.index = i;
        box.addEventListener('click', onAnswerBoxClick);
        playerAnswerContainer.appendChild(box);
    }

    let scrambled = currentCorrectAnswer.split('').sort(() => 0.5 - Math.random()).join('');
    while (scrambled === currentCorrectAnswer && currentCorrectAnswer.length > 1) {
        scrambled = currentCorrectAnswer.split('').sort(() => 0.5 - Math.random()).join('');
    }
    
    scrambled.split('').forEach(letter => {
        const tile = document.createElement('div');
        tile.classList.add('letter-tile');
        tile.textContent = letter;
        tile.addEventListener('click', onScrambledLetterClick);
        scrambledLettersContainer.appendChild(tile);
    });

    startTimer();
    setTimeout(() => { isTransitioning = false; }, 500);
}

function startTimer() {
    timeLeft = 30;
    timeEl.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;
        if (timeLeft <= 0) {
            handleTimeUp();
        }
    }, 1000);
}

function handleTimeUp() {
    if (isTransitioning) return;
    clearInterval(timer);
    isTransitioning = true;
    lives--;
    updateLives();
    showToast(`Out of Time! The Answer is: ${currentCorrectAnswer}`, "wrong");
    
    if (lives <= 0) {
        endGame(false);
        return;
    }
    
    setTimeout(loadNextQuestion, 2000);
}

function resetForNewWord() {
    clearInterval(timer);
    answerState = [];
    typedAnswerTiles = []; // NEW: Reset typed tiles state
    scrambledLettersContainer.innerHTML = '';
    playerAnswerContainer.innerHTML = '';
    typeAnswerInput.value = '';
    typeAnswerInput.disabled = false;
}

function onScrambledLetterClick(e) {
    if (isTypeMode || isTransitioning) return;
    const clickedTile = e.target;
    if (clickedTile.classList.contains('disabled')) return;

    const emptyBoxIndex = answerState.findIndex(slot => slot === null);
    if (emptyBoxIndex === -1) return;

    clickedTile.classList.add('disabled');
    const letter = clickedTile.textContent;
    
    answerState[emptyBoxIndex] = { letter, sourceTile: clickedTile };
    
    const targetBox = playerAnswerContainer.children[emptyBoxIndex];
    const answerTile = document.createElement('div');
    answerTile.classList.add('letter-tile');
    answerTile.textContent = letter;
    targetBox.appendChild(answerTile);
    targetBox.classList.add('filled');

    if (!answerState.includes(null)) {
        setTimeout(verifyAnswer, 200);
    }
}

function onAnswerBoxClick(e) {
    if (isTransitioning) return;
    const clickedBox = e.currentTarget;
    const boxIndex = parseInt(clickedBox.dataset.index);

    const stateData = answerState[boxIndex];
    if (stateData) {
        stateData.sourceTile.classList.remove('disabled');
        answerState[boxIndex] = null;
        clickedBox.innerHTML = '';
        clickedBox.classList.remove('filled');
    }
}

function verifyAnswer() {
    if (isTransitioning) return;

    const finalAnswer = isTypeMode 
        ? typeAnswerInput.value.toUpperCase().trim()
        : answerState.map(item => item ? item.letter : '').join('');

    if (finalAnswer.length === 0) {
        return;
    }

    clearInterval(timer);
    isTransitioning = true;
    if (isTypeMode) {
        typeAnswerInput.disabled = true;
    }

    if (finalAnswer === currentCorrectAnswer) {
        score += 20;
        showToast("Correct! +20 poin", "correct");
        updateScore();
        setTimeout(loadNextQuestion, 1500);
    } else {
        lives--;
        updateLives();
        showToast(`Wrong! The Answer is: ${currentCorrectAnswer}`, "wrong");
        
        if (lives <= 0) {
            endGame(false);
            return;
        }
        
        setTimeout(loadNextQuestion, 2000);
    }
}

function endGame(isWin) {
    isTransitioning = true;
    clearInterval(timer);
    
    trophyContainer.classList.remove('hidden');

    if (isWin) {
        scoreTitleEl.textContent = "Congrats, You Answered All Questions!";
    } else {
        scoreTitleEl.textContent = "Game Over!";
    }

    finalScoreEl.textContent = score;
    showScreen(scoreScreen);

    let countdown = 10;
    countdownTextEl.textContent = `Back to Start in ${countdown} seconds...`;
    scoreScreenTimer = setInterval(() => {
        countdown--;
        countdownTextEl.textContent = `Back to Start in ${countdown} seconds...`;
        if (countdown <= 0) {
            initGame();
        }
    }, 1000);
}

// --- UI Update Functions ---
function updateScore() {
    scoreEl.textContent = score;
}

function updateLives() {
    const hearts = livesContainer.querySelectorAll('#lives-icons i');
    hearts.forEach((heart, index) => {
        if (index < lives) {
            heart.style.color = '#e74c3c';
            heart.classList.remove('lost');
        } else {
            heart.style.color = 'rgba(255, 255, 255, 0.3)';
            heart.classList.add('lost');
        }
    });
}

// NEW: Helper function to reset the state of typed answer
function resetTypeAnswer() {
    typeAnswerInput.value = '';
    typedAnswerTiles.forEach(tile => tile.classList.remove('disabled'));
    typedAnswerTiles = [];
}


function resetClickAnswer() {
    answerState.forEach(state => {
        if (state && state.sourceTile) {
            state.sourceTile.classList.remove('disabled');
        }
    });
    answerState = new Array(currentCorrectAnswer.length).fill(null);
    playerAnswerContainer.innerHTML = '';

    for (let i = 0; i < currentCorrectAnswer.length; i++) {
        const box = document.createElement('div');
        box.classList.add('answer-box');
        box.dataset.index = i;
        box.addEventListener('click', onAnswerBoxClick);
        playerAnswerContainer.appendChild(box);
    }
}

function toggleInputMode(mode) {
    isTypeMode = mode === 'type';
    
    // Reset progress of the other mode when switching
    if (isTypeMode) {
        if (answerState.some(s => s !== null)) {
             resetClickAnswer();
        }
    } else {
        if (typeAnswerInput.value.length > 0) {
            resetTypeAnswer();
        }
    }

    typeModeBtn.classList.toggle('active', isTypeMode);
    clickModeBtn.classList.toggle('active', !isTypeMode);
    typeAnswerContainer.classList.toggle('hidden', !isTypeMode);
    clickAnswerContainer.classList.toggle('hidden', isTypeMode);
    yourAnswerLabel.classList.toggle('hidden', isTypeMode);
}


function showToast(message, type) {
    toast.textContent = message;
    toast.className = 'toast show';
    toast.classList.add(type);
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// --- Event Listeners ---
startButton.addEventListener('click', startGame);
playAgainButton.addEventListener('click', initGame);

typeModeBtn.addEventListener('click', () => toggleInputMode('type'));
clickModeBtn.addEventListener('click', () => toggleInputMode('click'));

// DELETED: Old 'input' event listener is removed.

// NEW: Advanced 'keydown' listener for typing mode
typeAnswerInput.addEventListener('keydown', (e) => {
    if (!isTypeMode || isTransitioning) return;

    // Prevent default for all handled keys to take manual control
    e.preventDefault();

    const key = e.key.toUpperCase();

    // Handle Backspace
    if (e.key === 'Backspace') {
        if (typedAnswerTiles.length > 0) {
            const lastTile = typedAnswerTiles.pop();
            lastTile.classList.remove('disabled');
            typeAnswerInput.value = typeAnswerInput.value.slice(0, -1);
        }
        return;
    }

    // Handle letter input (only single uppercase characters A-Z)
    if (key.length === 1 && key >= 'A' && key <= 'Z') {
        // Prevent typing more than the required length
        if (typeAnswerInput.value.length >= currentCorrectAnswer.length) {
            return;
        }

        // Find an available (not disabled) tile for the typed letter
        const availableTile = Array.from(scrambledLettersContainer.children)
            .find(tile => tile.textContent === key && !tile.classList.contains('disabled'));

        if (availableTile) {
            availableTile.classList.add('disabled');
            typedAnswerTiles.push(availableTile); // Track the used tile
            typeAnswerInput.value += key;

            // Auto-verify if the answer is complete
            if (typeAnswerInput.value.length === currentCorrectAnswer.length) {
                verifyAnswer();
            }
        }
    }
    // Other keys (like Shift, Ctrl, etc.) will be ignored because of preventDefault()
});


// Initialize
initGame();

