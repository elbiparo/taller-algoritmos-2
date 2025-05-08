document.getElementById("ejecutar").addEventListener("click", function () {
    const ejercicio = document.getElementById("ejercicio").value;
    ejecutarEjercicioParte4(ejercicio);
});

function ejecutarEjercicioParte4(opcion) {
    const entradaDiv = document.getElementById("entrada");
    entradaDiv.innerHTML = "";

    switch (opcion) {
        case "1":
            entradaDiv.innerHTML = `<input type="number" id="n" placeholder="Ingrese un número">`;
            break;
        case "2":
            entradaDiv.innerHTML = `<input type="number" id="cantidad" placeholder="Cantidad de sueldos">`;
            break;
        case "3":
            entradaDiv.innerHTML = `<input type="number" id="numero" placeholder="Número (0-99)">`;
            break;
        case "4":
            entradaDiv.innerHTML = `<input type="text" id="letra" maxlength="1" placeholder="Ingrese una letra">`;
            break;
    }

    const boton = document.createElement("button");
    boton.textContent = "Calcular";
    boton.addEventListener("click", function () {
        const resultado = document.getElementById("resultado");
        resultado.innerText = "";

        switch (opcion) {
            case "1":
                let n = parseInt(document.getElementById("n").value);
                let contador = 0;
                for (let i = 1; i <= n; i++) {
                    let esPrimo = true;
                    if (i < 2) esPrimo = false;
                    for (let j = 2; j <= Math.sqrt(i); j++) {
                        if (i % j === 0) {
                            esPrimo = false;
                            break;
                        }
                    }
                    if (esPrimo) contador++;
                }
                resultado.innerText = `Hay ${contador} números primos entre 1 y ${n}.`;
                break;

            case "2":
                let cantidad = parseInt(document.getElementById("cantidad").value);
                let maximo = 0;
                for (let i = 0; i < cantidad; i++) {
                    let sueldo = parseFloat(prompt(`Ingrese el sueldo ${i + 1}:`));
                    if (i === 0 || sueldo > maximo) {
                        maximo = sueldo;
                    }
                }
                resultado.innerText = `El sueldo máximo ingresado es: $${maximo.toFixed(2)}.`;
                break;

            case "3":
                let num = parseInt(document.getElementById("numero").value);
                let texto = "";
                let unidades = ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve"];
                let decenas = ["", "", "veinte", "treinta", "cuarenta", "cincuenta", "sesenta", "setenta", "ochenta", "noventa"];
                let especiales = ["diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve"];

                if (num < 10) {
                    texto = unidades[num];
                } else if (num < 20) {
                    texto = especiales[num - 10];
                } else {
                    let d = Math.floor(num / 10);
                    let u = num % 10;
                    if (u === 0) {
                        texto = decenas[d];
                    } else {
                        texto = `${decenas[d]} y ${unidades[u]}`;
                    }
                }
                resultado.innerText = `Número en texto: ${texto}`;
                break;

            case "4":
                let letra = document.getElementById("letra").value.toLowerCase();
                if (letra >= 'a' && letra <= 'z') {
                    let esVocal = false;
                    for (let i = 0; i < 5; i++) {
                        if (letra === "aeiou"[i]) {
                            esVocal = true;
                            break;
                        }
                    }
                    resultado.innerText = `La letra "${letra}" es una ${esVocal ? "vocal" : "consonante"}.`;
                } else {
                    resultado.innerText = "Por favor, ingresa una letra válida.";
                }
                break;
        }
    });

    entradaDiv.appendChild(boton);
}
