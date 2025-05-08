document.addEventListener('DOMContentLoaded', function() {
    
    const PRECIO_POR_KM = 150;
    const DESCUENTO_PORCENTAJE = 30;
    const LIMITE_DESCUENTO = 1000;
    
    
    const distanciaInput = document.getElementById('distancia');
    const calcularBtn = document.getElementById('calcular');
    const distanciaResultado = document.getElementById('distancia-resultado');
    const precioBase = document.getElementById('precio-base');
    const descuento = document.getElementById('descuento');
    const precioFinal = document.getElementById('precio-final');
    const descuentoContainer = document.getElementById('descuento-container');
    
    
    function calcularPrecio() {
        
        const distancia = parseFloat(distanciaInput.value);
        
        
        if (isNaN(distancia) || distancia <= 0) {
            alert('Por favor, ingrese una distancia válida.');
            return;
        }
        
       
        const precioIdaVuelta = distancia * PRECIO_POR_KM * 2;
        
       
        let descuentoAplicado = 0;
        let precioConDescuento = precioIdaVuelta;
        
        if (distancia > LIMITE_DESCUENTO) {
            descuentoAplicado = precioIdaVuelta * (DESCUENTO_PORCENTAJE / 100);
            precioConDescuento = precioIdaVuelta - descuentoAplicado;
            descuentoContainer.style.display = 'flex';
        } else {
            descuentoContainer.style.display = 'none';
        }
        
        
        distanciaResultado.textContent = `${distancia} km`;
        precioBase.textContent = `$${precioIdaVuelta.toLocaleString()}`;
        descuento.textContent = `$${descuentoAplicado.toLocaleString()}`;
        precioFinal.textContent = `$${precioConDescuento.toLocaleString()}`;
    }
    
    
    calcularBtn.addEventListener('click', calcularPrecio);
    
    
    distanciaInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calcularPrecio();
        }
    });
});