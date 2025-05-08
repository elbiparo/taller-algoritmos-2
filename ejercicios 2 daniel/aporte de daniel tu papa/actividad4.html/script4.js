// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias a los elementos del DOM
    const numero1Input = document.getElementById('numero1');
    const numero2Input = document.getElementById('numero2');
    const ordenarButton = document.getElementById('ordenar');
    const resultadoContenido = document.getElementById('resultadoContenido');
    const historialBody = document.getElementById('historialBody');
    
    // Agregar evento click al botón de ordenar
    ordenarButton.addEventListener('click', function() {
        // Obtener los valores de los números ingresados
        const num1 = parseFloat(numero1Input.value);
        const num2 = parseFloat(numero2Input.value);
        
        // Validar que se ingresaron números válidos
        if (isNaN(num1) || isNaN(num2)) {
            mostrarError('Por favor, ingrese dos números válidos.');
            return;
        }
        
        // Ordenar los números en orden ascendente
        let numeroMenor, numeroMayor;
        
        if (num1 <= num2) {
            numeroMenor = num1;
            numeroMayor = num2;
        } else {
            numeroMenor = num2;
            numeroMayor = num1;
        }
        
        // Crear representación en texto de los números ordenados
        const numerosOrdenados = `${numeroMenor}, ${numeroMayor}`;
        
        // Mostrar el resultado
        mostrarResultado(num1, num2, numeroMenor, numeroMayor);
        
        // Agregar al historial
        agregarAlHistorial(num1, num2, numerosOrdenados);
        
        // Aplicar efecto de destacar al resultado
        const resultado = document.getElementById('resultado');
        resultado.classList.add('destacar');
        
        // Quitar la clase después de la animación
        setTimeout(() => {
            resultado.classList.remove('destacar');
        }, 1000);
    });
    
    // Función para mostrar un mensaje de error
    function mostrarError(mensaje) {
        resultadoContenido.innerHTML = `<p class="error">${mensaje}</p>`;
        resultadoContenido.style.color = 'red';
    }
    
    // Función para mostrar el resultado del ordenamiento
    function mostrarResultado(num1, num2, menor, mayor) {
        resultadoContenido.innerHTML = `
            <p><strong>Números ingresados:</strong> ${num1} y ${num2}</p>
            <p><strong>Números ordenados en orden ascendente:</strong></p>
            <span class="ordenado">
                <span class="numero-destacado">${menor}</span>
                <span class="flecha">→</span>
                <span class="numero-destacado">${mayor}</span>
            </span>
        `;
        resultadoContenido.style.color = 'black';
    }
    
    // Función para agregar el ordenamiento al historial
    function agregarAlHistorial(num1, num2, ordenados) {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${num1}</td>
            <td>${num2}</td>
            <td>${ordenados}</td>
        `;
        historialBody.appendChild(fila);
    }
    
    // Permitir presionar Enter en cualquier campo para ordenar
    numero1Input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            if (numero2Input.value.trim() === '') {
                numero2Input.focus();
            } else {
                ordenarButton.click();
            }
        }
    });
    
    numero2Input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            ordenarButton.click();
        }
    });
    
    // Enfocar el primer campo al cargar la página
    numero1Input.focus();
});