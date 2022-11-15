// HTML elements
const selectAttackSection = document.getElementById('seleccionar-ataque');

const resetSection = document.getElementById('reiniciar');

const playerMascotButton = document.getElementById('boton-mascota');
const fireButton = document.getElementById('boton-fuego');
const waterButton = document.getElementById('boton-agua');
const groundButton = document.getElementById('boton-tierra');
const resetGameButton = document.getElementById('boton-reset');

const selectPetSection = document.getElementById('seleccionar-mascota');
const spanPlayerPet = document.getElementById('mascota-jugador');

const spanEnemyPet = document.getElementById('mascota-enemiga');

const spanPlayerLives = document.getElementById('vidas-mascota-jugador');
const spanEnemyLives = document.getElementById('vidas-mascota-enemiga');

const messagesSection = document.getElementById('resultado');
const playerAttackMessage = document.getElementById('ataques-del-jugador');
const enemyAttackMessage = document.getElementById('ataques-del-enemigo');
const cardsContainer = document.getElementById('contenedor-tarjetas');

let mokepons = [];
let playerAttack;
let enemyAttack;
let mokeponsOption
let inputHipodoge
let inputCapipepo
let inputRatigueya
let playerLives = 3;
let enemyLives = 3;

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
        mokeponsOption =  `
        <input type="radio" name="mascota" id=${mokepon.name} />
        <label class="tarjeta-de-mokepon" for=${mokepon.name}>
            <p>${mokepon.name}</p>
            <img
                src=${mokepon.picture}
                alt="mokepon-${mokepon.name}"
            />
        </label>
        `
    cardsContainer.innerHTML += mokeponsOption

    inputHipodoge = document.getElementById('Hipodoge');
    inputCapipepo = document.getElementById('Capipepo');
    inputRatigueya = document.getElementById('Ratigueya');
    })

    playerMascotButton.addEventListener('click', selectPlayerPet);

    // Attack buttons
    fireButton.addEventListener('click', fireAttack);
    waterButton.addEventListener('click', waterAttack);
    groundButton.addEventListener('click', groundAttack);

    resetGameButton.addEventListener('click', resetGame);
}

function selectPlayerPet() {
    selectPetSection.style.display = 'none';

    if (inputHipodoge.checked) {
        spanPlayerPet.innerHTML = inputHipodoge.id;
    } else if (inputCapipepo.checked) {
        spanPlayerPet.innerHTML = inputCapipepo.id;
    } else if (inputRatigueya.checked) {
        spanPlayerPet.innerHTML = inputRatigueya.id;
    } else {
        alert('Selecciona una mascota, por favor');
        return (selectPetSection.style.display = 'flex');
    }

    selectAttackSection.style.display = 'flex';
    selectEnemyPet();
}

function selectEnemyPet() {
    let randomPet = random(0, mokepons.length -1);

    spanEnemyPet.innerHTML = mokepons[randomPet].name
}

function fireAttack() {
    playerAttack = 'FUEGO';
    selectEnemyAttack();
}

function waterAttack() {
    playerAttack = 'AGUA';
    selectEnemyAttack();
}

function groundAttack() {
    playerAttack = 'TIERRA';
    selectEnemyAttack();
}

function selectEnemyAttack() {
    let randomAttackType = random(1, 3);

    if (randomAttackType == 1) {
        enemyAttack = 'FUEGO';
    } else if (randomAttackType == 2) {
        enemyAttack = 'AGUA';
    } else {
        enemyAttack = 'TIERRA';
    }

    combat();
}

function combat() {
    if (enemyAttack == playerAttack) {
        createMessage('EMPATE');
    } else if (playerAttack == 'FUEGO' && enemyAttack == 'TIERRA') {
        createMessage('🎉GANASTE🎉');
        enemyLives--;
        spanEnemyLives.innerHTML = enemyLives;
    } else if (playerAttack == 'AGUA' && enemyAttack == 'FUEGO') {
        createMessage('🎉GANASTE🎉');
        enemyLives--;
        spanEnemyLives.innerHTML = enemyLives;
    } else if (playerAttack == 'TIERRA' && enemyAttack == 'AGUA') {
        createMessage('🎉GANASTE🎉');
        enemyLives--;
        spanEnemyLives.innerHTML = enemyLives;
    } else {
        createMessage('😢PERDISTE😢');
        playerLives--;
        spanPlayerLives.innerHTML = playerLives;
    }

    checkLives();
}

function checkLives() {
    if (enemyLives == 0) {
        createFinalMessage('FELICITACIONES, GANASTE 🥳');
    } else if (playerLives == 0) {
        createFinalMessage('Lo siento, perdiste 😔');
    }
}

function createMessage(combatResult) {
    let newPlayerAttack = document.createElement('p');
    let newEnemyAttack = document.createElement('p');

    messagesSection.innerHTML = combatResult;
    newPlayerAttack.innerHTML = playerAttack;
    newEnemyAttack.innerHTML = enemyAttack;

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
