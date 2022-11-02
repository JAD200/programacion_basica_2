let playerAttack;

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
    let randomAttack = random(1, 3);
    let spanEnemyPet = document.getElementById('mascota-enemiga');

    if (randomAttack == 1) {
        spanEnemyPet.innerHTML = 'Hipodoge';
    } else if (randomAttack == 2) {
        spanEnemyPet.innerHTML = 'Capipepo';
    } else {
        spanEnemyPet.innerHTML = 'Ratigueya';
    }
}

function fireAttack() {
    playerAttack = 'FUEGO'
    alert(playerAttack)
}

function waterAttack() {
    playerAttack = 'AGUA'
    alert(playerAttack)
}

function groundAttack() {
    playerAttack = 'TIERRA'
    alert(playerAttack)
}

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener('load', beginGame);
