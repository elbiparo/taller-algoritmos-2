document.addEventListener('DOMContentLoaded', function() {
    // Constantes
    const LIMITE_RETENCION = 2000000;
    const RETENCION_ALTA = 0.10; // 10%
    const RETENCION_BAJA = 0.03; // 3%
    
    // Elementos del DOM
    const salarioBrutoInput = document.getElementById('salarioBruto');
    const calcularBtn = document.getElementById('calcular');
    const salarioBrutoResultado = document.getElementById('salario-bruto-resultado');
    const porcentajeRetencion = document.getElementById('porcentaje-retencion');
    const valorRetencion = document.getElementById('valor-retencion');
    const salarioNeto = document.getElementById('salario-neto');
    
    // Función para calcular el salario
    function calcularSalario() {
        // Obtener el valor del salario bruto
        const salarioBruto = parseFloat(salarioBrutoInput.value);
        
        // Validar que sea un número positivo
        if (isNaN(salarioBruto) || salarioBruto <= 0) {
            alert('Por favor, ingrese un salario válido.');
            return;
        }
        
        // Determinar el porcentaje de retención
        let porcentaje;
        if (salarioBruto >= LIMITE_RETENCION) {
            porcentaje = RETENCION_ALTA;
        } else {
            porcentaje = RETENCION_BAJA;
        }
        
        // Calcular el valor de la retención
        const retencion = salarioBruto * porcentaje;
        
        // Calcular el salario neto
        const neto = salarioBruto - retencion;
        
        // Mostrar resultados
        salarioBrutoResultado.textContent = `$${salarioBruto.toLocaleString()}`;
        porcentajeRetencion.textContent = `${(porcentaje * 100)}%`;
        valorRetencion.textContent = `$${retencion.toLocaleString()}`;
        salarioNeto.textContent = `$${neto.toLocaleString()}`;
    }
    
    // Evento click del botón
    calcularBtn.addEventListener('click', calcularSalario);
    
    // También permitir enviar con Enter en el input
    salarioBrutoInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calcularSalario();
        }
    });
});