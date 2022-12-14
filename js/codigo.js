function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function choice(choice) {
    let result = '';
    if (choice == 1) {
        result = 'Piedra 🥌';
    } else if (choice == 2) {
        result = 'Papel 📰';
    } else if (choice == 3) {
        result = 'Tijeras ✂';
    } else {
        result = 'MAL ELEGIDO';
        choice == 0;
    }
    return result;
}

function combat() {
    if (pc == jugador) {
        alert('EMPATE');
    } else if (jugador == 0) {
        loses++
        alert('PERDISTE');
    } else if (jugador - pc == 1 || jugador - pc == -2) {
        triumphs++
        alert('GANASTE');
    } else {
        loses++
        alert('PERDISTE');
    }
}

// 1 = piedra, 2 = papel, 3 = tijera
let jugador = 0;
let pc = 0;
let triumphs = 0;
let loses = 0;

while (triumphs < 3 && loses < 3) {
    pc = random(1, 3);
    jugador = prompt(
        'Elige: 1 para piedra, 2 para papel y 3 para tijera'
    );

    alert('PC elige: ' + choice(pc));
    alert('Tu eliges: ' + choice(jugador));

    // COMBAT
    combat()
}

alert("Ganaste " + triumphs + " veces. Perdiste " + loses + " veces");