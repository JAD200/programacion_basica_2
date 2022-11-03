let playerAttack;
let enemyAttack;
let playerLives = 3
let enemyLives = 3
let allowCombat = false;

function beginGame() {
    let playerMascotButton = document.getElementById('boton-mascota');
    playerMascotButton.addEventListener('click', selectPlayerPet);

    let fireButton = document.getElementById('boton-fuego');
    fireButton.addEventListener('click', fireAttack);
    let waterButton = document.getElementById('boton-agua');
    waterButton.addEventListener('click', waterAttack);
    let groundButton = document.getElementById('boton-tierra');
    groundButton.addEventListener('click', groundAttack);
}

function selectPlayerPet() {
    let inputHipodoge = document.getElementById('hipodoge');
    let inputCapipepo = document.getElementById('capipepo');
    let inputRatigueya = document.getElementById('ratigueya');
    let spanPlayerPet = document.getElementById('mascota-jugador');

    if (inputHipodoge.checked) {
        spanPlayerPet.innerHTML = 'Hipodoge';
        allowCombat = true;
    } else if (inputCapipepo.checked) {
        spanPlayerPet.innerHTML = 'Capipepo';
        allowCombat = true;
    } else if (inputRatigueya.checked) {
        spanPlayerPet.innerHTML = 'Ratigueya';
        allowCombat = true;
    } else {
        alert('Selecciona una mascota, por favor');
    }
    if (allowCombat === true) {
        selectEnemyPet();
    }
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
    let spanPlayerLives = document.getElementById('vidas-mascota-jugador')
    let spanEnemyLives = document.getElementById('vidas-mascota-enemiga')

    //* No pet has been selected
    if (allowCombat == false) {
        alert('Selecciona una mascota, por favor');
        return null;
    }
    // A pet has been selected
    if (enemyAttack == playerAttack) {
        createMessage('EMPATE');
    } else if (playerAttack == 'FUEGO' && enemyAttack == 'TIERRA') {
        createMessage('🎉GANASTE🎉');
        enemyLives--
        spanEnemyLives.innerHTML = enemyLives
    } else if (playerAttack == 'AGUA' && enemyAttack == 'FUEGO') {
        createMessage('🎉GANASTE🎉');
        enemyLives--
        spanEnemyLives.innerHTML = enemyLives
    } else if (playerAttack == 'TIERRA' && enemyAttack == 'AGUA') {
        createMessage('🎉GANASTE🎉');
        enemyLives--
        spanEnemyLives.innerHTML = enemyLives
    } else {
        createMessage('😢PERDISTE😢');
        playerLives--
        spanPlayerLives.innerHTML = playerLives
    }
}

function createMessage(combatResult) {
    let sectionMessages = document.getElementById('mensajes');

    let battleParagraph = document.createElement('p');
    battleParagraph.innerHTML =
        'Tu mascota ataco con ' +
        playerAttack +
        ', la mascota del enemigo ataco con ' +
        enemyAttack +
        ' - ' +
        combatResult;

    sectionMessages.appendChild(battleParagraph);
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', beginGame);
