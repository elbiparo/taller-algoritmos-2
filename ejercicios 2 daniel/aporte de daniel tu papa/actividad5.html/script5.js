document.addEventListener('DOMContentLoaded', function() {
    // Constantes
    const PRECIO_POR_KM = 150;
    const DESCUENTO_PORCENTAJE = 30;
    const LIMITE_DESCUENTO = 1000;
    
    // Elementos del DOM
    const distanciaInput = document.getElementById('distancia');
    const calcularBtn = document.getElementById('calcular');
    const distanciaResultado = document.getElementById('distancia-resultado');
    const precioBase = document.getElementById('precio-base');
    const descuento = document.getElementById('descuento');
    const precioFinal = document.getElementById('precio-final');
    const descuentoContainer = document.getElementById('descuento-container');
    
    // Función para calcular el precio
    function calcularPrecio() {
        // Obtener el valor de la distancia
        const distancia = parseFloat(distanciaInput.value);
        
        // Validar que sea un número positivo
        if (isNaN(distancia) || distancia <= 0) {
            alert('Por favor, ingrese una distancia válida.');
            return;
        }
        
        // Cálculos
        // Precio de ida y vuelta (multiplicamos por 2)
        const precioIdaVuelta = distancia * PRECIO_POR_KM * 2;
        
        // Determinar si aplica descuento
        let descuentoAplicado = 0;
        let precioConDescuento = precioIdaVuelta;
        
        if (distancia > LIMITE_DESCUENTO) {
            descuentoAplicado = precioIdaVuelta * (DESCUENTO_PORCENTAJE / 100);
            precioConDescuento = precioIdaVuelta - descuentoAplicado;
            descuentoContainer.style.display = 'flex';
        } else {
            descuentoContainer.style.display = 'none';
        }
        
        // Mostrar resultados
        distanciaResultado.textContent = `${distancia} km`;
        precioBase.textContent = `$${precioIdaVuelta.toLocaleString()}`;
        descuento.textContent = `$${descuentoAplicado.toLocaleString()}`;
        precioFinal.textContent = `$${precioConDescuento.toLocaleString()}`;
    }
    
    // Evento click del botón
    calcularBtn.addEventListener('click', calcularPrecio);
    
    // También permitir enviar con Enter en el input
    distanciaInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calcularPrecio();
        }
    });
});