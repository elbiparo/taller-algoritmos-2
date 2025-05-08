// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias a los elementos del DOM
    const numeroInput = document.getElementById('numero');
    const calcularButton = document.getElementById('calcular');
    const resultadoContenido = document.getElementById('resultadoContenido');
    const historialBody = document.getElementById('historialBody');
    
    // Agregar evento click al botón de calcular
    calcularButton.addEventListener('click', function() {
        // Obtener el valor del número ingresado
        const numeroOriginal = parseFloat(numeroInput.value);
        
        // Validar que se ingresó un número válido
        if (isNaN(numeroOriginal)) {
            mostrarError('Por favor, ingrese un número válido.');
            return;
        }
        
        // Aplicar la lógica del algoritmo
        let resultado, condicion, operacion;
        
        if (numeroOriginal >= 10) {
            // Si es mayor o igual a 10, devolver el triple
            resultado = numeroOriginal * 3;
            condicion = "Mayor o igual a 10";
            operacion = "Triple";
        } else {
            // Si es menor a 10, devolver la cuarta parte
            resultado = numeroOriginal / 4;
            condicion = "Menor que 10";
            operacion = "Cuarta parte";
        }
        
        // Mostrar el resultado
        mostrarResultado(numeroOriginal, condicion, operacion, resultado);
        
        // Agregar al historial
        agregarAlHistorial(numeroOriginal, condicion, operacion, resultado);
        
        // Limpiar el input y poner el foco para facilitar nuevos cálculos
        numeroInput.value = '';
        numeroInput.focus();
    });
    
    // Función para mostrar un mensaje de error
    function mostrarError(mensaje) {
        resultadoContenido.innerHTML = `<p class="error">${mensaje}</p>`;
        resultadoContenido.style.color = 'red';
    }
    
    // Función para mostrar el resultado del cálculo
    function mostrarResultado(numeroOriginal, condicion, operacion, resultado) {
        // Determinar la clase CSS para el estilo según la condición
        const claseCondicion = condicion === "Mayor o igual a 10" ? "mayor-igual" : "menor";
        
        resultadoContenido.innerHTML = `
            <p><strong>Número ingresado:</strong> ${numeroOriginal}</p>
            <p><strong>Condición:</strong> <span class="${claseCondicion}">${condicion}</span></p>
            <p><strong>Operación aplicada:</strong> ${operacion}</p>
            <p class="resaltado"><strong>Resultado:</strong> ${resultado.toFixed(2)}</p>
            <p><strong>Explicación:</strong> Como el número ${numeroOriginal} es ${condicion.toLowerCase()}, 
            se aplica ${operacion.toLowerCase()}: ${explicacionOperacion(numeroOriginal, operacion)}</p>
        `;
        resultadoContenido.style.color = 'black';
    }
    
    // Función para generar la explicación de la operación
    function explicacionOperacion(numero, operacion) {
        if (operacion === "Triple") {
            return `${numero} × 3 = ${(numero * 3).toFixed(2)}`;
        } else {
            return `${numero} ÷ 4 = ${(numero / 4).toFixed(2)}`;
        }
    }
    
    // Función para agregar el cálculo al historial
    function agregarAlHistorial(numeroOriginal, condicion, operacion, resultado) {
        const fila = document.createElement('tr');
        
        // Determinar la clase CSS para el estilo según la condición
        const claseCondicion = condicion === "Mayor o igual a 10" ? "mayor-igual" : "menor";
        
        fila.innerHTML = `
            <td>${numeroOriginal}</td>
            <td class="${claseCondicion}">${condicion}</td>
            <td>${operacion}</td>
            <td>${resultado.toFixed(2)}</td>
        `;
        historialBody.appendChild(fila);
    }
    
    // Permitir presionar Enter para calcular
    numeroInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calcularButton.click();
        }
    });
});