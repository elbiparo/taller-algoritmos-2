document.addEventListener('DOMContentLoaded', function() {
    // Constantes
    const TARIFA_NORMAL = 10000;
    const TARIFA_EXTRA = 15000;
    const HORAS_NORMAL = 40;
    
    // Elementos del DOM
    const horasInput = document.getElementById('horas');
    const calcularBtn = document.getElementById('calcular');
    const calculoDetalle = document.getElementById('calculo-detalle');
    const salarioTotal = document.getElementById('salario-total');
    
    // Función para formatear números como moneda
    function formatoMoneda(valor) {
        return '$' + valor.toLocaleString('es-CO');
    }
    
    // Función para calcular el salario
    function calcularSalario() {
        // Obtener las horas trabajadas
        const horasTrabajadas = parseFloat(horasInput.value);
        
        // Validar que sea un número válido y no negativo
        if (isNaN(horasTrabajadas) || horasTrabajadas < 0) {
            calculoDetalle.innerHTML = '<p class="error">Por favor, ingrese un número válido de horas trabajadas.</p>';
            salarioTotal.innerHTML = '<p>$0</p>';
            return;
        }
        
        // Calcular el salario según las condiciones
        let salarioNormal = 0;
        let salarioExtra = 0;
        let horasExtras = 0;
        
        if (horasTrabajadas <= HORAS_NORMAL) {
            // Caso 1: Trabaja 40 horas o menos
            salarioNormal = horasTrabajadas * TARIFA_NORMAL;
            
            // Detalles del cálculo
            calculoDetalle.innerHTML = `
                <p><strong>${horasTrabajadas} horas</strong> a tarifa normal (${formatoMoneda(TARIFA_NORMAL)}/hora)</p>
                <p>Cálculo: ${horasTrabajadas} × ${formatoMoneda(TARIFA_NORMAL)} = ${formatoMoneda(salarioNormal)}</p>
                <p>No hay horas extras.</p>
            `;
        } else {
            // Caso 2: Trabaja más de 40 horas
            salarioNormal = HORAS_NORMAL * TARIFA_NORMAL;
            horasExtras = horasTrabajadas - HORAS_NORMAL;
            salarioExtra = horasExtras * TARIFA_EXTRA;
            
            // Detalles del cálculo
            calculoDetalle.innerHTML = `
                <p><strong>Horas normales:</strong> ${HORAS_NORMAL} horas a ${formatoMoneda(TARIFA_NORMAL)}/hora = ${formatoMoneda(salarioNormal)}</p>
                <p><strong>Horas extras:</strong> ${horasExtras} horas a ${formatoMoneda(TARIFA_EXTRA)}/hora = ${formatoMoneda(salarioExtra)}</p>
                <p><strong>Total horas trabajadas:</strong> ${horasTrabajadas} horas</p>
            `;
        }
        
        // Calcular el salario total
        const total = salarioNormal + salarioExtra;
        
        // Mostrar el total
        salarioTotal.innerHTML = `<p>${formatoMoneda(total)}</p>`;
        
        // Añadir efectos visuales
        salarioTotal.classList.add('destacado');
        setTimeout(() => {
            salarioTotal.classList.remove('destacado');
        }, 500);
    }
    
    // Evento click del botón
    calcularBtn.addEventListener('click', calcularSalario);
    
    // También permitir calcular con Enter en el input
    horasInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calcularSalario();
        }
    });
    
    // Enfocar el input al cargar la página
    horasInput.focus();
});