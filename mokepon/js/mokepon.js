let playerAttack;
let enemyAttack;

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
    beginEnemySelection = true;

    if (inputHipodoge.checked) {
        spanPlayerPet.innerHTML = 'Hipodoge';
    } else if (inputCapipepo.checked) {
        spanPlayerPet.innerHTML = 'Capipepo';
    } else if (inputRatigueya.checked) {
        spanPlayerPet.innerHTML = 'Ratigueya';
    } else {
        alert('Selecciona una mascota, por favor');
        beginEnemySelection = false;
    }
    if (beginEnemySelection == true) {
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
    if (enemyAttack == playerAttack) {
        createMessage('EMPATE');
    } else if (playerAttack == 'FUEGO' && enemyAttack == 'TIERRA') {
        createMessage('🎉GANASTE🎉');
    } else if (playerAttack == 'AGUA' && enemyAttack == 'FUEGO') {
        createMessage('🎉GANASTE🎉');
    } else if (playerAttack == 'TIERRA' && enemyAttack == 'AGUA') {
        createMessage('🎉GANASTE🎉');
    } else {
        createMessage('😢PERDISTE😢');
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
