// Constantes para los precios
const PRECIO_NORMAL = 2500;     // Precio por cuaderno si lleva menos de 5
const PRECIO_DESCUENTO = 2000;  // Precio por cuaderno si lleva 5 o más
const CANTIDAD_MINIMA_DESCUENTO = 5;  // Cantidad mínima para aplicar descuento

// Función para formatear números como moneda en pesos colombianos
function formatMoney(amount) {
    return '$' + amount.toLocaleString('es-CO');
}

// Funciones para incrementar y decrementar la cantidad
function incrementarCantidad() {
    const inputCantidad = document.getElementById('cantidad');
    inputCantidad.value = parseInt(inputCantidad.value) + 1;
    actualizarVisualizacion();
}

function decrementarCantidad() {
    const inputCantidad = document.getElementById('cantidad');
    const cantidad = parseInt(inputCantidad.value);
    if (cantidad > 1) {
        inputCantidad.value = cantidad - 1;
        actualizarVisualizacion();
    }
}

// Función para seleccionar una cantidad específica
function seleccionarCantidad(cantidad) {
    document.getElementById('cantidad').value = cantidad;
    actualizarVisualizacion();
}

// Función principal para calcular el total a pagar
function calcularTotal() {
    // Obtener la cantidad de cuadernos
    const cantidad = parseInt(document.getElementById('cantidad').value);
    
    // Validar que la cantidad sea un número positivo
    if (isNaN(cantidad) || cantidad <= 0) {
        alert('Por favor, introduce una cantidad válida mayor que cero.');
        return;
    }
    
    // Determinar el precio por cuaderno según la cantidad
    const precioUnitario = (cantidad >= CANTIDAD_MINIMA_DESCUENTO) ? PRECIO_DESCUENTO : PRECIO_NORMAL;
    
    // Calcular el subtotal (sin descuento aplicado)
    const subtotalSinDescuento = cantidad * PRECIO_NORMAL;
    
    // Calcular el total a pagar con el precio correspondiente
    const totalPagar = cantidad * precioUnitario;
    
    // Calcular el descuento (si aplica)
    const descuento = subtotalSinDescuento - totalPagar;
    
    // Actualizar los resultados en el HTML
    document.getElementById('resultado-cantidad').textContent = `${cantidad} cuaderno(s)`;
    document.getElementById('resultado-precio').textContent = formatMoney(precioUnitario);
    document.getElementById('resultado-subtotal').textContent = formatMoney(subtotalSinDescuento);
    document.getElementById('resultado-descuento').textContent = formatMoney(descuento);
    document.getElementById('resultado-total').textContent = formatMoney(totalPagar);
    
    // Actualizar la visualización de cuadernos
    actualizarVisualizacion();
    
    // Añadir al historial
    agregarAlHistorial(cantidad, precioUnitario, subtotalSinDescuento, descuento, totalPagar);
}

// Función para actualizar la visualización de cuadernos
function actualizarVisualizacion() {
    const cantidad = parseInt(document.getElementById('cantidad').value);
    const contenedorCuadernos = document.getElementById('notebooks-visual');
    
    // Validar la cantidad
    if (isNaN(cantidad) || cantidad <= 0) {
        return;
    }
    
    // Limpiar la visualización actual
    contenedorCuadernos.innerHTML = '';
    
    // Determinar si aplica descuento
    const aplicaDescuento = cantidad >= CANTIDAD_MINIMA_DESCUENTO;
    
    // Añadir los cuadernos a la visualización (máximo 20 para no sobrecargar)
    const cantidadMostrar = Math.min(cantidad, 20);
    
    for (let i = 0; i < cantidadMostrar; i++) {
        const cuadernoElement = document.createElement('div');
        cuadernoElement.className = `notebook ${aplicaDescuento ? 'discount' : ''}`;
        contenedorCuadernos.appendChild(cuadernoElement);
    }
    
    // Si hay más de 20, mostrar un indicador
    if (cantidad > 20) {
        const indicadorElement = document.createElement('div');
        indicadorElement.className = 'notebook-indicator';
        indicadorElement.textContent = `+${cantidad - 20}`;
        indicadorElement.style.display = 'flex';
        indicadorElement.style.alignItems = 'center';
        indicadorElement.style.justifyContent = 'center';
        indicadorElement.style.fontWeight = 'bold';
        indicadorElement.style.fontSize = '18px';
        indicadorElement.style.color = 'var(--primary-color)';
        contenedorCuadernos.appendChild(indicadorElement);
    }
}

// Función para añadir el cálculo al historial
function agregarAlHistorial(cantidad, precioUnitario, subtotal, descuento, total) {
    const tbody = document.querySelector('#historial tbody');
    
    // Crear una nueva fila para la tabla
    const row = document.createElement('tr');
    
    // Añadir celdas con los valores
    row.innerHTML = `
        <td>${cantidad} cuaderno(s)</td>
        <td>${formatMoney(precioUnitario)}</td>
        <td>${formatMoney(subtotal)}</td>
        <td>${formatMoney(descuento)}</td>
        <td>${formatMoney(total)}</td>
    `;
    
    // Añadir la fila al principio de la tabla
    if (tbody.firstChild) {
        tbody.insertBefore(row, tbody.firstChild);
    } else {
        tbody.appendChild(row);
    }
    
    // Limitar el historial a 5 filas
    if (tbody.children.length > 5) {
        tbody.removeChild(tbody.lastChild);
    }
}

// Inicializar la calculadora cuando se cargue la página
document.addEventListener('DOMContentLoaded', function() {
    // Actualizar visualización inicial
    actualizarVisualizacion();
    
    // Añadir evento para actualizar la visualización cuando cambie la cantidad
    document.getElementById('cantidad').addEventListener('input', function() {
        actualizarVisualizacion();
    });
    
    // Permitir presionar Enter en el campo de cantidad para calcular
    document.getElementById('cantidad').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calcularTotal();
        }
    });
    
    // Calcular con el valor inicial
    calcularTotal();
});