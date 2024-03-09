var nivel = 1; 

$(document).ready(function() {
    $("#boton").click(function() {
        iniciarJuego();
    });
});

function generarNumeroAleatorio() {
    var max = Math.pow(10, nivel) - 1;
    var min = Math.pow(10, nivel - 1); 
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function iniciarJuego() {
    $("#juego").html(`
        <h1>Memoria numérica</h1>
        <p>Una persona promedio puede recordar 7 números a la vez. ¿Puedes hacer más?</p>
        <button id="boton">Comenzar</button>
    `);
    $("#boton").click(function() {
        mostrarNumeroYBarra();
    });
}

function mostrarNumeroYBarra() {
    let randomNumber = generarNumeroAleatorio(); 
    $("#juego").html(`
        <div id="num">${randomNumber}</div>
        <div id="barra"><progress id="progressBar" max="100" value="0"></progress></div>
    `);

    let value = 0;
    let interval = setInterval(function() {
        value++;
        $("#progressBar").val(value);
        if (value >= 100) {
            clearInterval(interval);
            pedirNumeroAlUsuario(randomNumber);
        }
    }, 30);
}

function pedirNumeroAlUsuario(randomNumber) {
    $("#juego").html(`
        <h2>¿Cuál era el número?</h2>
        <input type="text" id="NumeroUsuario" /><br>
        <button id="BotonComprobar">COMPROBAR</button>
    `);

    $("#BotonComprobar").click(function() {
        let NumeroUsuario = $("#NumeroUsuario").val();
        if (parseInt(NumeroUsuario) === randomNumber) {
            nivel++; 
            $("#juego").html(`
            <p>Numero</p> <h2>${randomNumber}</h2> <p>tu número fue</p> <h2>${NumeroUsuario}</h2>
            <p>Nivel ${nivel-1}</p>
            `);
        } else {
            nivel = 1; 
            $("#juego").html(`
                <p>Numero</p> <h2>${randomNumber}</h2> <p>Tu número fue</p> <h2 id="error">${NumeroUsuario}</h2>
                `);
                $("#juego").css("background-color", "red"); 

            setTimeout(function() {
                $("#juego").css("background-color", "rgb(63, 175, 235)"); 
            }, 1000);
        }
        $("#juego").append('<button id="botonSiguiente">SIGUIENTE</button>');

        $("#botonSiguiente").click(function() {
            iniciarJuego(); 
            
        });
    });
}
