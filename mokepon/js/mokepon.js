let playerAttack;
let enemyAttack;
let playerLives = 3;
let enemyLives = 3;

function beginGame() {
    let selectAttackSection = document.getElementById('seleccionar-ataque');
    selectAttackSection.style.display = 'none';

    let resetSection = document.getElementById('reiniciar');
    resetSection.style.display = 'none';

    let playerMascotButton = document.getElementById('boton-mascota');
    playerMascotButton.addEventListener('click', selectPlayerPet);

    // Attack buttons
    let fireButton = document.getElementById('boton-fuego');
    fireButton.addEventListener('click', fireAttack);
    let waterButton = document.getElementById('boton-agua');
    waterButton.addEventListener('click', waterAttack);
    let groundButton = document.getElementById('boton-tierra');
    groundButton.addEventListener('click', groundAttack);

    let resetGameButton = document.getElementById('boton-reset');
    resetGameButton.addEventListener('click', resetGame);
}

function selectPlayerPet() {
    let selectPetSection = document.getElementById('seleccionar-mascota');
    selectPetSection.style.display = 'none';
    let selectAttackSection = document.getElementById('seleccionar-ataque');

    let inputHipodoge = document.getElementById('hipodoge');
    let inputCapipepo = document.getElementById('capipepo');
    let inputRatigueya = document.getElementById('ratigueya');
    let spanPlayerPet = document.getElementById('mascota-jugador');

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
    let spanEnemyPet = document.getElementById('mascota-enemiga');

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
    let spanPlayerLives = document.getElementById('vidas-mascota-jugador');
    let spanEnemyLives = document.getElementById('vidas-mascota-enemiga');

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
    let messagesSection = document.getElementById('resultado');
    let playerAttackMessage = document.getElementById('ataques-del-jugador');
    let enemyAttackMessage = document.getElementById('ataques-del-enemigo');

    let newPlayerAttack = document.createElement('p');
    let newEnemyAttack = document.createElement('p');

    messagesSection.innerHTML = combatResult;
    newPlayerAttack.innerHTML = playerAttack;
    newEnemyAttack.innerHTML = enemyAttack;

    playerAttackMessage.appendChild(newPlayerAttack);
    enemyAttackMessage.appendChild(newEnemyAttack);
}

function createFinalMessage(finalResult) {
    let resetSection = document.getElementById('reiniciar');
    resetSection.style.display = 'block';

    let messagesSection = document.getElementById('resultado');

    messagesSection.innerHTML = finalResult;

    let fireButton = document.getElementById('boton-fuego');
    fireButton.disabled = true;
    let waterButton = document.getElementById('boton-agua');
    waterButton.disabled = true;
    let groundButton = document.getElementById('boton-tierra');
    groundButton.disabled = true;
}

function resetGame() {
    location.reload();
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', beginGame);
