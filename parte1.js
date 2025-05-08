document.getElementById("btn1").addEventListener("click", function() {
    const n = parseInt(document.getElementById("num1").value);
    document.getElementById("res1").innerText = (n % 2 === 0) ? "Es par" : "No es par";
});

document.getElementById("btn2").addEventListener("click", function() {
    const n = parseFloat(document.getElementById("num2").value);
    document.getElementById("res2").innerText = (n >= 10) ? `Triple: ${n * 3}` : "No cumple la condición";
});

document.getElementById("btn3").addEventListener("click", function() {
    let precio = parseFloat(document.getElementById("precio3").value);
    if (precio >= 1000000) precio *= 0.9;
    const total = precio * 1.19;
    document.getElementById("res3").innerText = `Total con IVA: $${total.toFixed(2)}`;
});

document.getElementById("btn4").addEventListener("click", function() {
    const n1 = parseFloat(document.getElementById("num4a").value);
    const n2 = parseFloat(document.getElementById("num4b").value);
    document.getElementById("res4").innerText = (n1 > n2) ? `Suma: ${n1 + n2}` : "No se cumple la condición";
});

document.getElementById("btn5").addEventListener("click", function() {
    let compra = parseFloat(document.getElementById("compra5").value);
    if (compra > 100000) compra *= 0.8;
    document.getElementById("res5").innerText = `Total a pagar: $${compra.toFixed(2)}`;
});

document.getElementById("btn6").addEventListener("click", function() {
    let salario = parseFloat(document.getElementById("salario6").value);
    if (salario > 2000000) salario *= 0.9;
    document.getElementById("res6").innerText = `Salario neto: $${salario.toFixed(2)}`;
});

document.getElementById("btn7").addEventListener("click", function() {
    const n = parseFloat(document.getElementById("num7").value);
    document.getElementById("res7").innerText = (n < 0) ? "Es negativo" : "No es negativo";
});

document.getElementById("btn8").addEventListener("click", function() {
    const inversion = parseFloat(document.getElementById("inversion8").value);
    const interes = inversion * 0.05;
    const total = (interes <= 7000) ? inversion + interes : inversion;
    document.getElementById("res8").innerText = `Total en cuenta: $${total.toFixed(2)}`;
});

document.getElementById("btn9").addEventListener("click", function() {
    const n = parseInt(document.getElementById("num9").value);
    document.getElementById("res9").innerText = (n % 5 === 0) ? "Es múltiplo de 5" : "No es múltiplo de 5";
});

document.getElementById("btn10").addEventListener("click", function() {
    const edad = parseInt(document.getElementById("edad10").value);
    document.getElementById("res10").innerText = (edad >= 18) ? "Es mayor de edad" : "Es menor de edad";
});

document.getElementById("btn11").addEventListener("click", function() {
    const notas = [
      parseFloat(document.getElementById("nota11a").value),
      parseFloat(document.getElementById("nota11b").value),
      parseFloat(document.getElementById("nota11c").value),
      parseFloat(document.getElementById("nota11d").value)
    ];
    const promedio = notas.reduce((a, b) => a + b, 0) / notas.length;
    document.getElementById("res11").innerText = (promedio < 3.5) ? `Reprobado con ${promedio.toFixed(2)}` : `Aprobado con ${promedio.toFixed(2)}`;
});

document.getElementById("btn12").addEventListener("click", function() {
    const estatura = parseFloat(document.getElementById("estatura12").value);
    document.getElementById("res12").innerText = (estatura > 1.7) ? "Es alto" : "No es alto";
});

document.getElementById("btn13").addEventListener("click", function() {
    let precio = parseFloat(document.getElementById("precio13").value);
    if (precio >= 1000000) precio *= 0.9;
    const total = precio * 1.19;
    document.getElementById("res13").innerText = `Total a pagar: $${total.toFixed(2)}`;
});

document.getElementById("btn14").addEventListener("click", function() {
    const n1 = parseFloat(document.getElementById("num14a").value);
    const n2 = parseFloat(document.getElementById("num14b").value);
    document.getElementById("res14").innerText = (n1 > n2) ? `Suma: ${n1 + n2}` : "No se cumple la condición";
});

document.getElementById("btn15").addEventListener("click", function() {
    const n = parseFloat(document.getElementById("num15").value);
    document.getElementById("res15").innerText = (n >= 10) ? `Cubo: ${n ** 3}` : "No cumple la condición";
});