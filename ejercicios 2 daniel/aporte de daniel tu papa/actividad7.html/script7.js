document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const numeroInput = document.getElementById('numero');
    const verificarBtn = document.getElementById('verificar');
    const resultadoDiv = document.getElementById('resultado');
    
    // Función para verificar si es par o impar
    function verificarParImpar() {
        // Obtener el valor ingresado y convertirlo a número entero
        const numero = parseInt(numeroInput.value);
        
        // Validar que sea un número válido
        if (isNaN(numero)) {
            resultadoDiv.innerHTML = `<p>Por favor, ingrese un número válido.</p>`;
            resultadoDiv.className = 'result';
            return;
        }
        
        // Verificar si es par o impar
        // Un número es par si al dividirlo por 2 el residuo es 0
        if (numero % 2 === 0) {
            resultadoDiv.innerHTML = `
                <p><strong>${numero}</strong> es un número <strong>PAR</strong></p>
                <p>Porque ${numero} ÷ 2 = ${numero/2} (sin residuo)</p>
            `;
            resultadoDiv.className = 'result par';
        } else {
            resultadoDiv.innerHTML = `
                <p><strong>${numero}</strong> es un número <strong>IMPAR</strong></p>
                <p>Porque ${numero} ÷ 2 = ${Math.floor(numero/2)} con residuo 1</p>
            `;
            resultadoDiv.className = 'result impar';
        }
    }
    
    // Evento click del botón
    verificarBtn.addEventListener('click', verificarParImpar);
    
    // También permitir verificar con Enter en el input
    numeroInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            verificarParImpar();
        }
    });
    
    // Enfocar el input al cargar la página
    numeroInput.focus();
});