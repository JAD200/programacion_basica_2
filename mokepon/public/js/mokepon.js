// HTML elements
const selectAttackSection = document.getElementById('seleccionar-ataque');
// Reset
const resetSection = document.getElementById('reiniciar');
// Buttons
const playerMascotButton = document.getElementById('boton-mascota');
const resetGameButton = document.getElementById('boton-reset');
// Pet selection and span
const selectPetSection = document.getElementById('seleccionar-mascota');
const spanPlayerPet = document.getElementById('mascota-jugador');
const spanEnemyPet = document.getElementById('mascota-enemiga');
// Combat lives
const spanPlayerLives = document.getElementById('vidas-jugador');
const spanEnemyLives = document.getElementById('vidas-enemigo');
// Combat
const messagesSection = document.getElementById('resultado');
const playerAttackMessage = document.getElementById('ataques-del-jugador');
const enemyAttackMessage = document.getElementById('ataques-del-enemigo');
const cardsContainer = document.getElementById('contenedor-tarjetas');
const attacksContainer = document.getElementById('contenedor-ataques');
// Images
const cardPlayerPetImage = document.getElementById('imagen-mascota-jugador');
const cardEnemyPetImage = document.getElementById('imagen-mascota-enemigo');
// Canvas
const seeMapSection = document.getElementById('ver-mapa');
const map = document.getElementById('mapa');
const maxMapWidth = 400;

// Backend
const gamePort = '192.168.0.107';
let playerId = null;
let enemyId = null;
let enemiesMokepons = [];

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
    mapWidth = maxMapWidth - 20;
}
// searched height ==  inner width * height / width
searchedHeight = (mapWidth * 600) / 800;

map.width = mapWidth;
map.height = searchedHeight;

// Mokepons
class Mokepon {
    constructor(name, picture, life, mapPicture, id = null) {
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
        this.id = id;
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

//* Attacks lists

const HIPODOGE_ATTACKS = [
    { attackName: '💧', pushName: 'AGUA', id: 'boton-agua' },
    { attackName: '💧', pushName: 'AGUA', id: 'boton-agua' },
    { attackName: '💧', pushName: 'AGUA', id: 'boton-agua' },
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' },
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' },
];

const CAPIPEPO_ATTACKS = [
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' },
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' },
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' },
    { attackName: '💧', pushName: 'AGUA', id: 'boton-agua' },
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' },
];

const RATIGUEYA_ATTACKS = [
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' },
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' },
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' },
    { attackName: '💧', pushName: 'AGUA', id: 'boton-agua' },
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' },
];

const LANGOSTELVIS_ATTACKS = [
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' },
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' },
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' },
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' },
    { attackName: '💧', pushName: 'AGUA', id: 'boton-agua' },
];

const PYDOS_ATTACKS = [
    { attackName: '💧', pushName: 'AGUA', id: 'boton-agua' },
    { attackName: '💧', pushName: 'AGUA', id: 'boton-agua' },
    { attackName: '💧', pushName: 'AGUA', id: 'boton-agua' },
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' },
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' },
];

const TUCAPALMA_ATTACKS = [
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' },
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' },
    { attackName: '🌱', pushName: 'TIERRA', id: 'boton-tierra' },
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' },
    { attackName: '🔥', pushName: 'FUEGO', id: 'boton-fuego' },
];

// Player attacks

hipodoge.attacks.push(...HIPODOGE_ATTACKS);

capipepo.attacks.push(...CAPIPEPO_ATTACKS);

ratigueya.attacks.push(...RATIGUEYA_ATTACKS);

langostelvis.attacks.push(...LANGOSTELVIS_ATTACKS);

pydos.attacks.push(...PYDOS_ATTACKS);

tucapalma.attacks.push(...TUCAPALMA_ATTACKS);

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

    joinTheGame();
}

function joinTheGame() {
    fetch(`http://${gamePort}:8080/unirse`).then((res) => {
        if (res.ok) {
            res.text().then((response) => {
                playerId = response;
            });
        }
    });
}

function selectMokepon(playerPet) {
    /* "fetch" with "post". The URL is called when the service "index.js" /mokepon/ playerId is inserted. To created it we use the syntax "template string". 
    This syntax begins with `` inverted quote, using "$" along with "{}" we can use a variable. 
    With this the URL has been unified with the playerID 
    //* A second parameter is added to the function, in which a configuration JSON is added with the method "method"*/
    fetch(`http://${gamePort}:8080/mokepon/${playerId}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            mokepon: playerPet,
        }),
    });
}

function selectPlayerPet() {
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
        return
    }

    selectPetSection.style.display = 'none';

    selectMokepon(playerPet);

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
            if (playerAttack.length === 5) {
                sendAttacks();
            }
        });
    });
}

function sendAttacks() {
    fetch(`http://${gamePort}:8080/mokepon/${playerId}/attacks`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            attacks: playerAttack,
        }),
    });
    interval = setInterval(obtainAttacks, 50);
}

function obtainAttacks() {
    fetch(`http://${gamePort}:8080/mokepon/${enemyId}/attacks`).then(function (
        res
    ) {
        if (res.ok) {
            res.json().then(function ({ attacks }) {
                console.log('Ataque enviado: ', attacks);
                if (attacks.length === 5) {
                    enemyAttack = attacks;
                    combat();
                }
            });
        }
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
    clearInterval(interval);

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

    enemyId = enemy.id;
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

    sendPosition(playerPetObject.x, playerPetObject.y);

    enemiesMokepons.forEach(function (listItem) {
        if (listItem != undefined) {
            listItem.drawMokepon();
            checkCollision(listItem);
        }
    });
}

function sendPosition(x, y) {
    fetch(`http://${gamePort}:8080/mokepon/${playerId}/position`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            x,
            y,
        }),
    }).then(function (res) {
        if (res.ok) {
            res.json().then(function ({ enemies }) {
                //* Enemies
                console.log(enemies);
                /*To remove the flicker of the images of the characters (other players), which is caused by the response time of the server, 
                an auxiliary variable is used which will have the coordinates, 
                thus drawing what is on the frontend and not being necessary to wait for a backend response.

                //* The 'enemies' list will no longer be used directly, but the auxiliary one 'enemiesMokepons'. The last one must be created globally.

                //* 'Map' will replace 'ForEach' since is very similar but returns a value generating a new list with the same number of elements as the original */
                enemiesMokepons = enemies.map(function (enemy) {
                    if (enemy.mokepon != undefined) {
                        let enemyMokepon = null;
                        const mokeponName = enemy.mokepon.name || '';
                        if (mokeponName === 'Hipodoge') {
                            enemyMokepon = new Mokepon(
                                'Hipodoge',
                                './assets/mokepon-hipodoge.png',
                                5,
                                './assets/cabeza-hipodoge-enemigo.png',
                                enemy.id
                            );
                        } else if (mokeponName === 'Capipepo') {
                            enemyMokepon = new Mokepon(
                                'Capipepo',
                                './assets/mokepon-capipepo.png',
                                5,
                                './assets/cabeza-capipepo-enemigo.png',
                                enemy.id
                            );
                        } else if (mokeponName === 'Ratigueya') {
                            enemyMokepon = new Mokepon(
                                'Ratigueya',
                                './assets/mokepon-ratigueya.png',
                                4,
                                './assets/cabeza-ratigueya-enemigo.png',
                                enemy.id
                            );
                        } else if (mokeponName === 'Langostelvis') {
                            enemyMokepon = new Mokepon(
                                'Langostelvis',
                                './assets/mokepon-langostelvis.png',
                                5,
                                './assets/cabeza-langostelvis-enemigo.png',
                                enemy.id
                            );
                        } else if (mokeponName === 'Pydos') {
                            enemyMokepon = new Mokepon(
                                'Pydos',
                                './assets/mokepon-pydos.png',
                                5,
                                './assets/cabeza-pydos-enemigo.png',
                                enemy.id
                            );
                        } else if (mokeponName === 'Tucapalma') {
                            enemyMokepon = new Mokepon(
                                'Tucapalma',
                                './assets/mokepon-tucapalma.png',
                                4,
                                './assets/cabeza-tucapalma-enemigo.png',
                                enemy.id
                            );
                        }
                        enemyMokepon.x = enemy.x || 0;
                        enemyMokepon.y = enemy.y || 0;

                        return enemyMokepon;
                    }
                });
            });
        }
    });
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
