// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias a los elementos del DOM
    const nombreInput = document.getElementById('nombre');
    const claveSelect = document.getElementById('clave');
    const precioInput = document.getElementById('precio');
    const calcularButton = document.getElementById('calcular');
    const resultadoContenido = document.getElementById('resultadoContenido');
    const historialBody = document.getElementById('historialBody');
    
    // Agregar evento click al botón de calcular
    calcularButton.addEventListener('click', function() {
        // Obtener los valores de los campos
        const nombre = nombreInput.value.trim();
        const clave = claveSelect.value;
        const precioOriginal = parseFloat(precioInput.value);
        
        // Validar los datos ingresados
        if (nombre === '') {
            mostrarError('Por favor, ingrese el nombre del artículo.');
            return;
        }
        
        if (clave === '') {
            mostrarError('Por favor, seleccione una clave de descuento.');
            return;
        }
        
        if (isNaN(precioOriginal) || precioOriginal <= 0) {
            mostrarError('Por favor, ingrese un precio válido mayor a cero.');
            return;
        }
        
        // Calcular el descuento según la clave
        let porcentajeDescuento = 0;
        if (clave === '01') {
            porcentajeDescuento = 10;
        } else if (clave === '02') {
            porcentajeDescuento = 20;
        }
        
        const descuento = precioOriginal * (porcentajeDescuento / 100);
        const precioConDescuento = precioOriginal - descuento;
        
        // Mostrar el resultado
        mostrarResultado(nombre, clave, precioOriginal, precioConDescuento, porcentajeDescuento);
        
        // Agregar al historial
        agregarAlHistorial(nombre, clave, precioOriginal, precioConDescuento);
        
        // Limpiar el formulario
        limpiarFormulario();
    });
    
    // Función para mostrar un mensaje de error
    function mostrarError(mensaje) {
        resultadoContenido.innerHTML = `<p class="error">${mensaje}</p>`;
        resultadoContenido.style.color = 'red';
    }
    
    // Función para mostrar el resultado del cálculo
    function mostrarResultado(nombre, clave, precioOriginal, precioConDescuento, porcentajeDescuento) {
        resultadoContenido.innerHTML = `
            <p><strong>Nombre del Artículo:</strong> ${nombre}</p>
            <p><strong>Clave de Descuento:</strong> ${clave}</p>
            <p><strong>Precio Original:</strong> $${precioOriginal.toFixed(2)}</p>
            <p><strong>Porcentaje de Descuento:</strong> ${porcentajeDescuento}%</p>
            <p><strong>Precio con Descuento:</strong> $${precioConDescuento.toFixed(2)}</p>
        `;
        resultadoContenido.style.color = 'black';
    }
    
    // Función para agregar el artículo al historial
    function agregarAlHistorial(nombre, clave, precioOriginal, precioConDescuento) {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${nombre}</td>
            <td>${clave}</td>
            <td>$${precioOriginal.toFixed(2)}</td>
            <td>$${precioConDescuento.toFixed(2)}</td>
        `;
        historialBody.appendChild(fila);
    }
    
    // Función para limpiar el formulario
    function limpiarFormulario() {
        nombreInput.value = '';
        claveSelect.value = '';
        precioInput.value = '';
        nombreInput.focus();
    }
});