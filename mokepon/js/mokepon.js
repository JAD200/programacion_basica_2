// HTML elements
const selectAttackSection = document.getElementById('seleccionar-ataque');

const resetSection = document.getElementById('reiniciar');

const playerMascotButton = document.getElementById('boton-mascota');
const fireButton = document.getElementById('boton-fuego');
const waterButton = document.getElementById('boton-agua');
const groundButton = document.getElementById('boton-tierra');
const resetGameButton = document.getElementById('boton-reset');

const selectPetSection = document.getElementById('seleccionar-mascota');
const inputHipodoge = document.getElementById('hipodoge');
const inputCapipepo = document.getElementById('capipepo');
const inputRatigueya = document.getElementById('ratigueya');
const spanPlayerPet = document.getElementById('mascota-jugador');

const spanEnemyPet = document.getElementById('mascota-enemiga');

const spanPlayerLives = document.getElementById('vidas-mascota-jugador');
const spanEnemyLives = document.getElementById('vidas-mascota-enemiga');

const messagesSection = document.getElementById('resultado');
const playerAttackMessage = document.getElementById('ataques-del-jugador');
const enemyAttackMessage = document.getElementById('ataques-del-enemigo');

let playerAttack;
let enemyAttack;
let playerLives = 3;
let enemyLives = 3;

function beginGame() {
    selectAttackSection.style.display = 'none';
    resetSection.style.display = 'none';
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
        spanPlayerPet.innerHTML = 'Hipodoge';
    } else if (inputCapipepo.checked) {
        spanPlayerPet.innerHTML = 'Capipepo';
    } else if (inputRatigueya.checked) {
        spanPlayerPet.innerHTML = 'Ratigueya';
    } else {
        alert('Selecciona una mascota, por favor');
        return selectPetSection.style.display = 'flex'
    }

    selectAttackSection.style.display = 'flex';
    selectEnemyPet();
}

function selectEnemyPet() {
    let randomPet = random(1, 3);

    if (randomPet == 1) {
        spanEnemyPet.innerHTML = 'Hipodoge';
    } else if (randomPet == 2) {
        spanEnemyPet.innerHTML = 'Capipepo';
    } else {
        spanEnemyPet.innerHTML = 'Ratigueya';
    }
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
