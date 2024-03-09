// Definir nivel globalmente
var nivel = 1;

// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Inicializar el juego, escuchando el evonto click y ejecutando la funcion iniciarJuego
    document.querySelector("#boton").addEventListener('click', iniciarJuego);
});

//funcion que genera el numero aleatorio con la funcion math.random() 
function generarNumeroAleatorio() {
    var max = Math.pow(10, nivel) - 1;
    var min = Math.pow(10, nivel - 1);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//funcion que inicia el juego creando el contenido html correspondiente en el main 
function iniciarJuego() {
    var juego = document.querySelector("#juego");
    juego.innerHTML = `
        <h1>Memoria numérica</h1>
        <p>Una persona promedio puede recordar 7 números a la vez. ¿Puedes hacer más?</p>
        <button id="boton">Comenzar</button>
    `;
    // Vuelve a vincular el evento click al nuevo botón #boton generado dinámicamente
    document.querySelector("#boton").addEventListener('click', mostrarNumeroYBarra);
}

//funcion que muestra el número aleatorio y la barra de progreso
function mostrarNumeroYBarra() {
    let randomNumber = generarNumeroAleatorio();
    var juego = document.querySelector("#juego");
    juego.innerHTML = `
        <div id="num">${randomNumber}</div>
        <div id="barra"><progress id="progressBar" max="100" value="0"></progress></div>
    `;

    let value = 0;
    let progressBar = document.querySelector("#progressBar");
    let interval = setInterval(function() {
        value++;
        progressBar.value = value;
        if (value >= 100) {
            clearInterval(interval);
            pedirNumeroAlUsuario(randomNumber);
        }
    }, 30);
}

//funcion para pedir el numeor al usuario y comprobar se ha hacertado
function pedirNumeroAlUsuario(randomNumber) {
    var juego = document.querySelector("#juego");
    juego.innerHTML = `
        <h2>¿Cuál era el número?</h2>
        <input type="text" id="NumeroUsuario" /><br>
        <button id="BotonComprobar">COMPROBAR</button>
    `;

    document.querySelector("#BotonComprobar").addEventListener('click', function() {
        let NumeroUsuario = document.querySelector("#NumeroUsuario").value;
        if (parseInt(NumeroUsuario) === randomNumber) {
            nivel++;
            juego.innerHTML = `
            <p>Numero</p> <h2>${randomNumber}</h2> <p>tu número fue</p> <h2>${NumeroUsuario}</h2>
                <p>Nivel ${nivel-1}</p>
            `;
        } else {
            nivel = 1;
            juego.innerHTML = `
            <p>Numero</p> <h2>${randomNumber}</h2> <p>Tu número fue</p> <h2 id="error">${NumeroUsuario}</h2>
            `;
            juego.style.backgroundColor = "red";

            setTimeout(function() {
                juego.style.backgroundColor = "rgb(63, 175, 235)";
            }, 1000);
        }
        juego.innerHTML += '<button id="botonSiguiente">SIGUIENTE</button>';
        document.querySelector("#botonSiguiente").addEventListener('click', iniciarJuego);
    });
}
