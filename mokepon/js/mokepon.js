function beginGame() {
    let buttonPlayerMascot = document.getElementById('boton-mascota');
    buttonPlayerMascot.addEventListener('click', selectPlayerMascot);
}

function selectPlayerMascot() {
    let inputHipodoge = document.getElementById('hipodoge');
    let inputCapipepo = document.getElementById('capipepo');
    let inputRatigueya = document.getElementById('ratigueya');

    function selectionMessage(mokepon) {
        alert('Seleccionaste a ' + mokepon);
    }

    if (inputHipodoge.checked) {
        selectionMessage('Hipodoge');
    } else if (inputCapipepo.checked) {
        selectionMessage('Capipepo');
    } else if (inputRatigueya.checked) {
        selectionMessage('Ratigueya');
    } else {
        alert('Selecciona una mascota, por favor')
    }
}

window.addEventListener('load', beginGame);
