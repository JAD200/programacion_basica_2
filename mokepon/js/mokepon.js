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

let mokepons = [];
// Attacks
let playerAttack = [];
let enemyAttack = [];
// Inputs
let inputHipodoge;
let inputCapipepo;
let inputRatigueya;
// Options
let mokeponsOption;
let playerMokeponAttacks;
let enemyMokeponAttacks;

let playerPet;
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

// Mokepons
class Mokepon {
    constructor(name, picture, life) {
        this.name = name;
        this.picture = picture;
        this.life = life;
        this.attacks = [];
    }
}

let hipodoge = new Mokepon('Hipodoge', './assets/mokepon-hipodoge.png', 5);

let capipepo = new Mokepon('Capipepo', './assets/mokepon-capipepo.png', 5);

let ratigueya = new Mokepon('Ratigueya', './assets/mokepon-ratigueya.png', 4);

hipodoge.attacks.push(
    { attackName: '💧', id: 'boton-agua' },
    { attackName: '💧', id: 'boton-agua' },
    { attackName: '💧', id: 'boton-agua' },
    { attackName: '🔥', id: 'boton-fuego' },
    { attackName: '🌱', id: 'boton-tierra' }
);

capipepo.attacks.push(
    { attackName: '🌱', id: 'boton-tierra' },
    { attackName: '🌱', id: 'boton-tierra' },
    { attackName: '🌱', id: 'boton-tierra' },
    { attackName: '💧', id: 'boton-agua' },
    { attackName: '🔥', id: 'boton-fuego' }
);

ratigueya.attacks.push(
    { attackName: '🔥', id: 'boton-fuego' },
    { attackName: '🔥', id: 'boton-fuego' },
    { attackName: '🔥', id: 'boton-fuego' },
    { attackName: '💧', id: 'boton-agua' },
    { attackName: '🌱', id: 'boton-tierra' }
);

mokepons.push(hipodoge, capipepo, ratigueya);

function beginGame() {
    selectAttackSection.style.display = 'none';
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
    } else {
        alert('Selecciona una mascota, por favor');
        return (selectPetSection.style.display = 'flex');
    }

    extractAttacks(playerPet);
    selectEnemyPet();
    selectAttackSection.style.display = 'flex';
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
                button.style.background = '#FFE9B1';
            } else if (e.target.textContent === '💧') {
                playerAttack.push('AGUA');
                console.log(playerAttack);
                button.style.background = '#FFE9B1';
            } else {
                playerAttack.push('TIERRA');
                console.log(playerAttack);
                button.style.background = '#FFE9B1';
            }
            selectEnemyAttack();
        });
    });
}

function selectEnemyPet() {
    let randomPet = random(0, mokepons.length - 1);

    spanEnemyPet.innerHTML = mokepons[randomPet].name;
    enemyMokeponAttacks = mokepons[randomPet].attacks;
    attackSequence();
}

function selectEnemyAttack() {
    let randomAttack = random(0, enemyMokeponAttacks.length - 1);

    if (randomAttack === 0 || randomAttack === 1) {
        enemyAttack.push('FUEGO');
    } else if (randomAttack === 3 || randomAttack == 4) {
        enemyAttack.push('AGUA');
    } else {
        enemyAttack.push('TIERRA');
    }
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
    resetSection.style.display = 'block';

    messagesSection.innerHTML = finalResult;

    fireButton.disabled = true;
    waterButton.disabled = true;
    groundButton.disabled = true;
}

function resetGame() {
    location.reload();
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', beginGame);
