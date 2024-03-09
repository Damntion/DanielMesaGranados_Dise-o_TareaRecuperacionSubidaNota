let nivel = 1; //variable que guarda el nivel del juego a nivel gloval
let secuenciaActual = []; //variable que guarda la secuencia actual del juego
let secuenciaUsuario = []; //variable que guarda la secuencia del usuario


function generarSecuenciaAleatoria(nivel) {
    let secuencia = [];
    for (let i = 0; i < nivel; i++) {
        secuencia.push(Math.floor(Math.random() * 9));
    }
    return secuencia;
}

//funcion que muestra las celdas del juego
function mostrarCeldas() {
    const juego = document.getElementById("juego");
    juego.innerHTML = `<div id="niv">Nivel: ${nivel}</div><br><div id="grid"></div>`;
    const grid = document.getElementById("grid");
    
    for (let i = 0; i < 9; i++) {
        let button = document.createElement("button");
        button.className = "cell";
        button.dataset.cellIndex = i;
        grid.appendChild(button);
    }
    
    secuenciaActual = generarSecuenciaAleatoria(nivel);
    let index = 0;
    
    let interval = setInterval(() => {
        if (index < secuenciaActual.length) {
            let cellIndex = secuenciaActual[index];
            let cell = document.querySelector(`[data-cell-index="${cellIndex}"]`);
            cell.classList.add('active');
            
            setTimeout(() => {
                cell.classList.remove('active');
                index++;
            }, 500);
        } else {
            clearInterval(interval);
            iniciarCapturaUsuario();
        }
    }, 1000);
}

//funcion que guarda la secuencia del usuario
function iniciarCapturaUsuario() {
    secuenciaUsuario = [];
    document.querySelectorAll(".cell").forEach(cell => {
        cell.addEventListener("click", function() {
            let index = this.dataset.cellIndex;
            secuenciaUsuario.push(Number(index));
            this.classList.add('active');
            setTimeout(() => this.classList.remove('active'),100);

            if (secuenciaUsuario.length === secuenciaActual.length) {
                verificarSecuencia();
            }
        });
    });
}
//funcion que verifica las dos secuencias
function verificarSecuencia() {
    let correcto = secuenciaUsuario.every((val, index) => val === secuenciaActual[index]);

    if (correcto) {
        nivel++;
        setTimeout(mostrarCeldas, 100);
    } else {
        const juego = document.getElementById("juego");
        juego.innerHTML = `<p>Nivel: ${nivel}.</p><button id="reiniciar">Intentar otra vez</button>`;
        document.getElementById("reiniciar").addEventListener("click", function() {
            nivel = 1;
            iniciarJuego();
        });
    }
}
//funcion que muestra el inicio del juego con el boton para iniciarlo 
function iniciarJuego() {
    const juego = document.getElementById("juego");
    juego.innerHTML = `<h1>Memoria de secuencias</h1>
                        <p>Memoriza el patron</p>
                        <button id="boton">Comenzar</button>
                        <div id="niv"></div>
                        <div id="grid"></div>`;
    document.getElementById("boton").addEventListener("click", mostrarCeldas);
}
//funcion que muestra las celdas del juego cuando se carga la pagina
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("boton").addEventListener("click", mostrarCeldas);
});
