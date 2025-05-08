document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias a los elementos del DOM
    const valorCompraInput = document.getElementById('valorCompra');
    const calcularBtn = document.getElementById('calcular');
    
    // Elementos de resultados principales
    const compraTotal = document.getElementById('compraTotal');
    const porcentajeDescuento = document.getElementById('porcentajeDescuento');
    const valorDescuento = document.getElementById('valorDescuento');
    const totalPagar = document.getElementById('totalPagar');
    
    // Elementos de la factura
    const receipt = document.getElementById('receipt');
    const fechaCompra = document.getElementById('fechaCompra');
    const receiptSubtotal = document.getElementById('receiptSubtotal');
    const receiptPorcentaje = document.getElementById('receiptPorcentaje');
    const receiptDescuento = document.getElementById('receiptDescuento');
    const receiptTotal = document.getElementById('receiptTotal');
    
    // Función para formatear valores monetarios en pesos colombianos
    function formatearMoneda(valor) {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            maximumFractionDigits: 0
        }).format(valor);
    }
    
    // Función para obtener la fecha actual formateada
    function obtenerFechaActual() {
        const fecha = new Date();
        const opciones = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return fecha.toLocaleDateString('es-CO', opciones);
    }
    
    // Función principal de cálculo
    function calcular() {
        // Obtener el valor de la compra
        const valorCompra = parseFloat(valorCompraInput.value);
        
        // Validar que se haya ingresado un valor válido
        if (isNaN(valorCompra) || valorCompra <= 0) {
            alert('Por favor, ingrese un valor de compra válido mayor que cero.');
            return;
        }
        
        // Determinar el porcentaje de descuento según el valor de la compra
        let descuentoPorcentaje;
        if (valorCompra > 200000) {
            descuentoPorcentaje = 17; // 17% de descuento para compras superiores a $200.000
        } else {
            descuentoPorcentaje = 5; // 5% de descuento para compras iguales o inferiores a $200.000
        }
        
        // Calcular el valor del descuento
        const descuentoValor = (valorCompra * descuentoPorcentaje) / 100;
        
        // Calcular el total a pagar
        const totalAPagar = valorCompra - descuentoValor;
        
        // Mostrar los resultados en el panel principal
        compraTotal.textContent = formatearMoneda(valorCompra);
        porcentajeDescuento.textContent = `${descuentoPorcentaje}%`;
        valorDescuento.textContent = formatearMoneda(descuentoValor);
        totalPagar.textContent = formatearMoneda(totalAPagar);
        
        // Actualizar y mostrar la factura
        fechaCompra.textContent = `Fecha: ${obtenerFechaActual()}`;
        receiptSubtotal.textContent = formatearMoneda(valorCompra);
        receiptPorcentaje.textContent = `${descuentoPorcentaje}%`;
        receiptDescuento.textContent = formatearMoneda(descuentoValor);
        receiptTotal.textContent = formatearMoneda(totalAPagar);
        
        // Mostrar la factura con una animación suave
        receipt.style.display = 'block';
        
        // Resaltar los resultados con una animación
        destacarResultados();
    }
    
    // Función para resaltar visualmente los resultados
    function destacarResultados() {
        const resultItems = document.querySelectorAll('.result-item');
        
        resultItems.forEach(item => {
            item.style.transition = 'background-color 0.5s';
            item.style.backgroundColor = '#e6fffa';
            
            setTimeout(() => {
                if (!item.classList.contains('highlight')) {
                    item.style.backgroundColor = 'transparent';
                }
            }, 800);
        });
    }
    
    // Asignar evento al botón de calcular
    calcularBtn.addEventListener('click', calcular);
    
    // Permitir calcular al presionar Enter en el campo de entrada
    valorCompraInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calcular();
    });
    
    // Enfocar el campo de entrada al cargar la página
    valorCompraInput.focus();
});