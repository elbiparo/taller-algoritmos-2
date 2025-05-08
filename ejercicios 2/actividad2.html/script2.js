// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias a los elementos del DOM
    const cantidadInput = document.getElementById('cantidad');
    const precioInput = document.getElementById('precio');
    const calcularButton = document.getElementById('calcular');
    const resultadoContenido = document.getElementById('resultadoContenido');
    const historialBody = document.getElementById('historialBody');
    
    // Agregar evento click al botón de calcular
    calcularButton.addEventListener('click', function() {
        // Obtener los valores de los campos
        const cantidad = parseInt(cantidadInput.value);
        const precioUnitario = parseFloat(precioInput.value);
        
        // Validar los datos ingresados
        if (isNaN(cantidad) || cantidad <= 0) {
            mostrarError('Por favor, ingrese una cantidad válida de camisas (mayor a cero).');
            return;
        }
        
        if (isNaN(precioUnitario) || precioUnitario <= 0) {
            mostrarError('Por favor, ingrese un precio válido por camisa (mayor a cero).');
            return;
        }
        
        // Calcular el subtotal
        const subtotal = cantidad * precioUnitario;
        
        // Determinar el porcentaje de descuento según la cantidad de camisas
        let porcentajeDescuento;
        if (cantidad >= 3) {
            porcentajeDescuento = 20; // 20% de descuento para 3 o más camisas
        } else {
            porcentajeDescuento = 10; // 10% de descuento para menos de 3 camisas
        }
        
        // Calcular el descuento y el total a pagar
        const descuento = subtotal * (porcentajeDescuento / 100);
        const totalPagar = subtotal - descuento;
        
        // Mostrar el resultado
        mostrarResultado(cantidad, precioUnitario, subtotal, porcentajeDescuento, descuento, totalPagar);
        
        // Agregar al historial
        agregarAlHistorial(cantidad, precioUnitario, subtotal, descuento, totalPagar);
    });
    
    // Función para mostrar un mensaje de error
    function mostrarError(mensaje) {
        resultadoContenido.innerHTML = `<p class="error">${mensaje}</p>`;
        resultadoContenido.style.color = 'red';
    }
    
    // Función para mostrar el resultado del cálculo
    function mostrarResultado(cantidad, precioUnitario, subtotal, porcentajeDescuento, descuento, totalPagar) {
        resultadoContenido.innerHTML = `
            <p><strong>Cantidad de Camisas:</strong> ${cantidad}</p>
            <p><strong>Precio por Camisa:</strong> $${precioUnitario.toFixed(2)}</p>
            <p><strong>Subtotal:</strong> $${subtotal.toFixed(2)}</p>
            <p><strong>Porcentaje de Descuento Aplicado:</strong> ${porcentajeDescuento}%</p>
            <p><strong>Monto de Descuento:</strong> $${descuento.toFixed(2)}</p>
            <p class="resaltado"><strong>Total a Pagar:</strong> $${totalPagar.toFixed(2)}</p>
        `;
        resultadoContenido.style.color = 'black';
    }
    
    // Función para agregar la compra al historial
    function agregarAlHistorial(cantidad, precioUnitario, subtotal, descuento, totalPagar) {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${cantidad}</td>
            <td>$${precioUnitario.toFixed(2)}</td>
            <td>$${subtotal.toFixed(2)}</td>
            <td>$${descuento.toFixed(2)} (${cantidad >= 3 ? '20%' : '10%'})</td>
            <td>$${totalPagar.toFixed(2)}</td>
        `;
        historialBody.appendChild(fila);
    }
    
    // Establecer valores predeterminados en los campos
    cantidadInput.addEventListener('input', function() {
        if (this.value < 1) {
            this.value = 1;
        }
    });
    
    precioInput.addEventListener('input', function() {
        if (this.value < 0.01) {
            this.value = 0.01;
        }
    });
});