document.getElementById("ejecutar").addEventListener("click", function() {
    const ejercicio = document.getElementById("ejercicio").value;
    ejecutarEjercicio(ejercicio);
});

function ejecutarEjercicio(opcion) {
    const entradaDiv = document.getElementById("entrada");
    entradaDiv.innerHTML = ""; 

    switch(opcion) {
        case "1": 
            entradaDiv.innerHTML = `<input type="number" id="numPrimos" placeholder="Ingrese un número">`;
            break;
        case "2": 
            entradaDiv.innerHTML = `<input type="number" id="numSueldos" placeholder="Cantidad de sueldos">`;
            break;
        case "3": 
            entradaDiv.innerHTML = `<input type="number" id="numTexto" placeholder="Número (0-99)">`;
            break;
        case "4": 
            entradaDiv.innerHTML = `<input type="text" id="letra" maxlength="1" placeholder="Ingrese una letra">`;
            break;
    }

    const ejecutar = document.createElement("button");
    ejecutar.innerText = "Calcular";
    ejecutar.addEventListener("click", () => ejecutarMetodo(opcion));
    entradaDiv.appendChild(ejecutar);
}

function ejecutarMetodo(opcion) {
    let resultadoTexto = "";
    
    switch(opcion) {
        case "1": 
            const n = parseInt(document.getElementById("numPrimos").value);
            resultadoTexto = `Hay ${contarPrimos(n)} números primos entre 1 y ${n}.`;
            break;

        case "2": 
            const cantidad = parseInt(document.getElementById("numSueldos").value);
            resultadoTexto = `El sueldo máximo ingresado es: $${sueldoMaximo(cantidad)}`;
            break;

        case "3": 
            const num = parseInt(document.getElementById("numTexto").value);
            resultadoTexto = `Número en texto: ${numeroATexto(num)}`;
            break;

        case "4": 
            const letra = document.getElementById("letra").value.toLowerCase();
            resultadoTexto = `La letra ${letra} es una ${esVocal(letra) ? "vocal" : "consonante"}.`;
            break;
    }

    document.getElementById("resultado").innerText = resultadoTexto;
}



function contarPrimos(n) {
    let contador = 0;
    for (let i = 1; i <= n; i++) {
        if (esPrimo(i)) contador++;
    }
    return contador;
}

function esPrimo(num) {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

function sueldoMaximo(cantidad) {
    let maximo = 0;
    for (let i = 0; i < cantidad; i++) {
        let sueldo = parseFloat(prompt(`Ingrese el sueldo ${i + 1}:`));
        if (sueldo > maximo) maximo = sueldo;
    }
    return maximo.toFixed(2);
}

function numeroATexto(num) {
    const unidades = ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
    const decenas = ["", "", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
    const especiales = ["diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"];
    
    if (num < 10) return unidades[num];
    else if (num < 20) return especiales[num - 10];
    else {
        let d = Math.floor(num / 10), u = num % 10;
        return (u === 0) ? decenas[d] : `${decenas[d]} y ${unidades[u]}`;
    }
}

function esVocal(letra) {
    return ["a", "e", "i", "o", "u"].includes(letra);
}