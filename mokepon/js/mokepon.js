// HTML elements
const selectAttackSection = document.getElementById('seleccionar-ataque');

const resetSection = document.getElementById('reiniciar');

const playerMascotButton = document.getElementById('boton-mascota');
const resetGameButton = document.getElementById('boton-reset');

const selectPetSection = document.getElementById('seleccionar-mascota');
const spanPlayerPet = document.getElementById('mascota-jugador');
const spanEnemyPet = document.getElementById('mascota-enemiga');

const spanPlayerLives = document.getElementById('vidas-jugador');
const spanEnemyLives = document.getElementById('vidas-enemigo');

const messagesSection = document.getElementById('resultado');
const playerAttackMessage = document.getElementById('ataques-del-jugador');
const enemyAttackMessage = document.getElementById('ataques-del-enemigo');
const cardsContainer = document.getElementById('contenedor-tarjetas');
const attacksContainer = document.getElementById('contenedor-ataques');

const cardPlayerPetImage = document.getElementById('imagen-mascota-jugador');
const cardEnemyPetImage = document.getElementById('imagen-mascota-enemigo');

const sectionSeeMap = document.getElementById('ver-mapa');
const map = document.getElementById('mapa');

let mokepons = [];
// Attacks
let playerAttack = [];
let enemyAttack = [];
// Inputs
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
let inputLangostelvis;
let inputPydos;
let inputTucapalma;
// Options
let mokeponsOption;
let playerMokeponAttacks;
let enemyMokeponAttacks;

let playerPet;
let playerPetImage;
let enemyPetImage;
// Buttons
let fireButton;
let waterButton;
let groundButton;
let buttons = [];
// Combat
let indexPlayerAttack;
let indexEnemyAttack;
let playerVictories = 0;
let enemyVictories = 0;

// Canvas
let canvas = map.getContext('2d');
let interval

// Mokepons
class Mokepon {
    constructor(name, picture, life) {
        this.name = name;
        this.picture = picture;
        this.life = life;
        this.attacks = [];
        this.x = 20;
        this.y = 30;
        this.width = 80;
        this.height = 80;
        this.pictureMap = new Image();
        this.pictureMap.src = picture;
        this.xVelocity = 0;
        this.yVelocity = 0;
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepon-hipodoge.png', 5);

let capipepo = new Mokepon('Capipepo', './assets/mokepon-capipepo.png', 5);

let ratigueya = new Mokepon('Ratigueya', './assets/mokepon-ratigueya.png', 4);

let langostelvis = new Mokepon('Langostelvis', './assets/mokepon-langostelvis.png', 5);

let pydos = new Mokepon('Pydos', './assets/mokepon-pydos.png', 5);

let tucapalma = new Mokepon('Tucapalma', './assets/mokepon-tucapalma.png', 4);

hipodoge.attacks.push(
    { attackName: '💧', pushName: 'AGUA', id: 'boton-agua' },
    { attackName: '💧', pushName: 'AGUA', id: 'boton-agua' },
    { attackName: '💧', pushName: 'AGUA', id: 'boton-agua' },
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' },
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' }
);

capipepo.attacks.push(
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' },
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' },
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' },
    { attackName: '💧', pushName: 'AGUA', id: 'boton-agua' },
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' }
);

ratigueya.attacks.push(
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' },
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' },
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' },
    { attackName: '💧', pushName: 'AGUA', id: 'boton-agua' },
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' }
);

langostelvis.attacks.push(
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' },
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' },
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' },
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' },
    { attackName: '💧', pushName: 'AGUA', id: 'boton-agua' }
);

pydos.attacks.push(
    { attackName: '💧', pushName: 'AGUA', id: 'boton-agua' },
    { attackName: '💧', pushName: 'AGUA', id: 'boton-agua' },
    { attackName: '💧', pushName: 'AGUA', id: 'boton-agua' },
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' },
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' }
);

tucapalma.attacks.push(
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' },
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' },
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' },
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' },
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' }
);

mokepons.push(hipodoge, capipepo, ratigueya, langostelvis, pydos, tucapalma);

function beginGame() {
    selectAttackSection.style.display = 'none';
    sectionSeeMap.style.display = 'none';
    resetSection.style.display = 'none';

    mokepons.forEach((mokepon) => {
        mokeponsOption = `
        <input type="radio" name="mascota" id=${mokepon.name} />
        <label class="tarjeta-de-mokepon" for=${mokepon.name}>
            <p>${mokepon.name}</p>
            <img
                src=${mokepon.picture}
                alt="mokepon-${mokepon.name}"
            />
        </label>
        `;
        cardsContainer.innerHTML += mokeponsOption;

        inputHipodoge = document.getElementById('Hipodoge');
        inputCapipepo = document.getElementById('Capipepo');
        inputRatigueya = document.getElementById('Ratigueya');
        inputLangostelvis = document.getElementById('Langostelvis');
        inputPydos = document.getElementById('Pydos');
        inputTucapalma = document.getElementById('Tucapalma');
    });

    playerMascotButton.addEventListener('click', selectPlayerPet);

    resetGameButton.addEventListener('click', resetGame);
}

function selectPlayerPet() {
    selectPetSection.style.display = 'none';

    if (inputHipodoge.checked) {
        spanPlayerPet.innerHTML = inputHipodoge.id;
        playerPet = inputHipodoge.id;
    } else if (inputCapipepo.checked) {
        spanPlayerPet.innerHTML = inputCapipepo.id;
        playerPet = inputCapipepo.id;
    } else if (inputRatigueya.checked) {
        spanPlayerPet.innerHTML = inputRatigueya.id;
        playerPet = inputRatigueya.id;
    } else if (inputLangostelvis.checked) {
        spanPlayerPet.innerHTML = inputLangostelvis.id;
        playerPet = inputLangostelvis.id;
    } else if (inputPydos.checked) {
        spanPlayerPet.innerHTML = inputPydos.id;
        playerPet = inputPydos.id;
    } else if (inputTucapalma.checked) {
        spanPlayerPet.innerHTML = inputTucapalma.id;
        playerPet = inputTucapalma.id;
    } else {
        alert('Selecciona una mascota, por favor');
        return (selectPetSection.style.display = 'flex');
    }

    extractAttacks(playerPet);
    selectEnemyPet();
    // selectAttackSection.style.display = 'flex';
    sectionSeeMap.style.display = 'flex';
    interval = setInterval(drawMokepon, 50)
}

function extractAttacks(playerPet) {
    let attacks;
    for (let i = 0; i < mokepons.length; i++) {
        if (playerPet === mokepons[i].name) {
            attacks = mokepons[i].attacks;
        }
    }
    showAttacks(attacks);
}

function showAttacks(attacks) {
    attacks.forEach((attack) => {
        playerMokeponAttacks = `
        <button id=${attack.id} class="boton-ataque BAtaque">${attack.attackName}</button>
        `;
        attacksContainer.innerHTML += playerMokeponAttacks;
    });

    fireButton = document.getElementById('boton-fuego');
    waterButton = document.getElementById('boton-agua');
    groundButton = document.getElementById('boton-tierra');
    buttons = document.querySelectorAll('.BAtaque');
}

function attackSequence() {
    buttons.forEach((button) => {
        button.addEventListener('click', (e) => {
            if (e.target.textContent === '🔥') {
                playerAttack.push('FUEGO');
                console.log(playerAttack);
                button.style.background = '#5717cf';
                button.disabled = true;
            } else if (e.target.textContent === '💧') {
                playerAttack.push('AGUA');
                console.log(playerAttack);
                button.style.background = '#5717cf';
                button.disabled = true;
            } else {
                playerAttack.push('TIERRA');
                console.log(playerAttack);
                button.style.background = '#5717cf';
                button.disabled = true;
            }
            selectEnemyAttack();
        });
    });
}

function showMokeponsImage(playerPet, enemyPet) {
    playerPetImage = `
            <img
                src='./assets/mokepon-${playerPet}.png'
                alt="mokepon-${playerPet}"
            />
        `;
    cardPlayerPetImage.innerHTML += playerPetImage;

    enemyPetImage = `
            <img
                src='./assets/mokepon-${enemyPet}.png'
                alt="mokepon-${enemyPet}"
            />
        `;
    cardEnemyPetImage.innerHTML += enemyPetImage;
}

function selectEnemyPet() {
    let randomPet = random(0, mokepons.length - 1);

    spanEnemyPet.innerHTML = mokepons[randomPet].name;
    enemyMokeponAttacks = mokepons[randomPet].attacks;
    showMokeponsImage(playerPet, spanEnemyPet.textContent);
    attackSequence();
}

function selectEnemyAttack() {
    let randomAttack = random(0, enemyMokeponAttacks.length - 1);
    enemyAttack.push(enemyMokeponAttacks[randomAttack].pushName);

    enemyMokeponAttacks.splice(randomAttack, 1);
    console.log(enemyAttack);
    beginFight();
}

function beginFight() {
    if (playerAttack.length === 5) {
        combat();
    }
}

function indexBothOpponents(player, enemy) {
    indexPlayerAttack = playerAttack[player];
    indexEnemyAttack = enemyAttack[enemy];
}

function combat() {
    for (let i = 0; i < playerAttack.length; i++) {
        if (playerAttack[i] === enemyAttack[i]) {
            indexBothOpponents(i, i);
            createMessage('EMPATE');
        } else if (playerAttack[i] == 'FUEGO' && enemyAttack[i] == 'TIERRA') {
            indexBothOpponents(i, i);
            createMessage('🎉GANASTE🎉');
            playerVictories++;
            spanPlayerLives.innerHTML = playerVictories;
        } else if (playerAttack[i] == 'AGUA' && enemyAttack[i] == 'FUEGO') {
            indexBothOpponents(i, i);
            createMessage('🎉GANASTE🎉');
            playerVictories++;
            spanPlayerLives.innerHTML = playerVictories;
        } else if (playerAttack[i] == 'TIERRA' && enemyAttack[i] == 'AGUA') {
            indexBothOpponents(i, i);
            createMessage('🎉GANASTE🎉');
            playerVictories++;
            spanPlayerLives.innerHTML = playerVictories;
        } else {
            indexBothOpponents(i, i);
            createMessage('😢PERDISTE😢');
            enemyVictories++;
            spanEnemyLives.innerHTML = enemyVictories;
        }
    }

    checkLives();
}

function checkLives() {
    if (playerVictories === enemyVictories) {
        createFinalMessage('Esto fue un empate !!');
    } else if (playerVictories > enemyVictories) {
        createFinalMessage('FELICITACIONES, GANASTE 🥳');
    } else {
        createFinalMessage('Lo siento, perdiste 😔');
    }
}

function createMessage(combatResult) {
    let newPlayerAttack = document.createElement('p');
    let newEnemyAttack = document.createElement('p');

    messagesSection.innerHTML = combatResult;
    newPlayerAttack.innerHTML = indexPlayerAttack;
    newEnemyAttack.innerHTML = indexEnemyAttack;

    playerAttackMessage.appendChild(newPlayerAttack);
    enemyAttackMessage.appendChild(newEnemyAttack);
}

function createFinalMessage(finalResult) {
    messagesSection.innerHTML = finalResult;

    resetSection.style.display = 'block';
}

function resetGame() {
    location.reload();
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function drawMokepon() {
    capipepo.x += capipepo.xVelocity;
    capipepo.y += capipepo.yVelocity;
    canvas.clearRect(0, 0, map.width, map.height)
    canvas.drawImage(
        capipepo.pictureMap, 
        capipepo.x,
        capipepo.y,
        capipepo.width,
        capipepo.height
    );
}

function moveArriba() {
    capipepo.yVelocity =- 5;
}
function moveIzquierda() {
    capipepo.xVelocity =- 5;
}
function moveAbajo() {
    capipepo.yVelocity = 5;
}
function moveDerecha() {
    capipepo.xVelocity = 5;
}

function stopMovement() {
    capipepo.xVelocity = 0
    capipepo.yVelocity = 0
}

window.addEventListener('load', beginGame);
