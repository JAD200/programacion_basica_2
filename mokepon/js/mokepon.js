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

const seeMapSection = document.getElementById('ver-mapa');
const map = document.getElementById('mapa');
const maxMapWidth = 350;

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
let playerPetObject;
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
let painting = map.getContext('2d');
let interval;
let mapBackground = new Image();
mapBackground.src = './assets/mokemapa.png';
let searchedHeight;
let mapWidth = window.innerWidth - 20;
if (mapWidth > maxMapWidth) {
    mapWidth == maxMapWidth - 20;
}

searchedHeight = (mapWidth * 600) / 800;

map.width = mapWidth;
map.height = searchedHeight;

// Mokepons
class Mokepon {
    constructor(name, picture, life, mapPicture) {
        this.name = name;
        this.picture = picture;
        this.life = life;
        this.attacks = [];
        this.width = 40;
        this.height = 40;
        this.x = random(0, map.width - this.width);
        this.y = random(0, map.height - this.height);
        this.pictureMap = new Image();
        this.pictureMap.src = mapPicture;
        this.xVelocity = 0;
        this.yVelocity = 0;
    }

    drawMokepon() {
        painting.drawImage(
            this.pictureMap,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

let hipodoge = new Mokepon(
    'Hipodoge',
    './assets/mokepon-hipodoge.png',
    5,
    './assets/cabeza-hipodoge.png'
);

let capipepo = new Mokepon(
    'Capipepo',
    './assets/mokepon-capipepo.png',
    5,
    './assets/cabeza-capipepo.png'
);

let ratigueya = new Mokepon(
    'Ratigueya',
    './assets/mokepon-ratigueya.png',
    4,
    './assets/cabeza-ratigueya.png'
);

let langostelvis = new Mokepon(
    'Langostelvis',
    './assets/mokepon-langostelvis.png',
    5,
    './assets/cabeza-langostelvis.png'
);

let pydos = new Mokepon(
    'Pydos',
    './assets/mokepon-pydos.png',
    5,
    './assets/cabeza-pydos.png'
);

let tucapalma = new Mokepon(
    'Tucapalma',
    './assets/mokepon-tucapalma.png',
    4,
    './assets/cabeza-tucapalma.png'
);

//* Enemies
let enemyHipodoge = new Mokepon(
    'Hipodoge',
    './assets/mokepon-hipodoge.png',
    5,
    './assets/cabeza-hipodoge.png'
);

let enemyCapipepo = new Mokepon(
    'Capipepo',
    './assets/mokepon-capipepo.png',
    5,
    './assets/cabeza-capipepo.png'
);

let enemyRatigueya = new Mokepon(
    'Ratigueya',
    './assets/mokepon-ratigueya.png',
    4,
    './assets/cabeza-ratigueya.png'
);

let enemyLangostelvis = new Mokepon(
    'Langostelvis',
    './assets/mokepon-langostelvis.png',
    5,
    './assets/cabeza-langostelvis.png'
);

let enemyPydos = new Mokepon(
    'Pydos',
    './assets/mokepon-pydos.png',
    5,
    './assets/cabeza-pydos.png'
);

let enemyTucapalma = new Mokepon(
    'Tucapalma',
    './assets/mokepon-tucapalma.png',
    4,
    './assets/cabeza-tucapalma.png'
);

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

// Enemy attacks

enemyHipodoge.attacks.push(
    { attackName: '💧', pushName: 'AGUA', id: 'boton-agua' },
    { attackName: '💧', pushName: 'AGUA', id: 'boton-agua' },
    { attackName: '💧', pushName: 'AGUA', id: 'boton-agua' },
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' },
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' }
);

enemyCapipepo.attacks.push(
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' },
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' },
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' },
    { attackName: '💧', pushName: 'AGUA', id: 'boton-agua' },
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' }
);

enemyRatigueya.attacks.push(
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' },
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' },
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' },
    { attackName: '💧', pushName: 'AGUA', id: 'boton-agua' },
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' }
);

enemyLangostelvis.attacks.push(
    { attackName: '💧', pushName: 'AGUA', id: 'boton-agua' },
    { attackName: '💧', pushName: 'AGUA', id: 'boton-agua' },
    { attackName: '💧', pushName: 'AGUA', id: 'boton-agua' },
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' },
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' }
);

enemyPydos.attacks.push(
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' },
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' },
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' },
    { attackName: '💧', pushName: 'AGUA', id: 'boton-agua' },
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' }
);

enemyTucapalma.attacks.push(
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' },
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' },
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' },
    { attackName: '💧', pushName: 'AGUA', id: 'boton-agua' },
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' }
);

mokepons.push(hipodoge, capipepo, ratigueya, langostelvis, pydos, tucapalma);

function beginGame() {
    selectAttackSection.style.display = 'none';
    seeMapSection.style.display = 'none';
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
    seeMapSection.style.display = 'flex';
    initiateMap();
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

function selectEnemyPet(enemy) {
    spanEnemyPet.innerHTML = enemy.name;
    enemyMokeponAttacks = enemy.attacks;
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

function obtainPetObject() {
    for (let i = 0; i < mokepons.length; i++) {
        if (playerPet === mokepons[i].name) {
            return mokepons[i];
        }
    }
}

function initiateMap() {
    playerPetObject = obtainPetObject();
    console.table(playerPetObject, playerPet);
    interval = setInterval(drawCanvas, 50);

    window.addEventListener('keydown', aKeyWasPressed);

    window.addEventListener('keyup', stopMovement);
}

function checkCollision(enemy) {
    const upEnemy = enemy.y;
    const downEnemy = enemy.y + enemy.height;
    const rightEnemy = enemy.x + enemy.width;
    const leftEnemy = enemy.x;

    const upPet = playerPetObject.y + 10;
    const downPet = playerPetObject.y + playerPetObject.height - 10;
    const rightPet = playerPetObject.x + playerPetObject.width - 10;
    const leftPet = playerPetObject.x + 10;

    if (
        downPet < upEnemy ||
        upPet > downEnemy ||
        rightPet < leftEnemy ||
        leftPet > rightEnemy
    ) {
        return;
    }

    stopMovement();
    clearInterval(interval);
    selectAttackSection.style.display = 'flex';
    seeMapSection.style.display = 'none';
    selectEnemyPet(enemy);
}

function drawCanvas() {
    playerPetObject.x += playerPetObject.xVelocity;
    playerPetObject.y += playerPetObject.yVelocity;
    painting.clearRect(0, 0, map.width, map.height);
    painting.drawImage(mapBackground, 0, 0, map.width, map.height);

    playerPetObject.drawMokepon();
    enemyHipodoge.drawMokepon();
    enemyCapipepo.drawMokepon();
    enemyRatigueya.drawMokepon();
    enemyLangostelvis.drawMokepon();
    enemyPydos.drawMokepon();
    enemyTucapalma.drawMokepon();
    if (playerPetObject.xVelocity !== 0 || playerPetObject.yVelocity !== 0) {
        checkCollision(enemyHipodoge);
        checkCollision(enemyCapipepo);
        checkCollision(enemyRatigueya);
        checkCollision(enemyLangostelvis);
        checkCollision(enemyPydos);
        checkCollision(enemyTucapalma);
    }
}

function moveUp() {
    playerPetObject.yVelocity = -5;
}
function moveLeft() {
    playerPetObject.xVelocity = -5;
}
function moveDown() {
    playerPetObject.yVelocity = 5;
}
function moveRight() {
    playerPetObject.xVelocity = 5;
}

function stopMovement() {
    playerPetObject.xVelocity = 0;
    playerPetObject.yVelocity = 0;
}

function aKeyWasPressed(event) {
    switch (event.key) {
        case 'ArrowUp':
            moveUp();
            break;
        case 'ArrowLeft':
            moveLeft();
            break;
        case 'ArrowDown':
            moveDown();
            break;
        case 'ArrowRight':
            moveRight();
            break;
        default:
            stopMovement();
            break;
    }
}

window.addEventListener('load', beginGame);
