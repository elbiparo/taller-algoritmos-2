document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias a los elementos del DOM
    const valorViviendaInput = document.getElementById('valorVivienda');
    const ingresosMensualesInput = document.getElementById('ingresosMensuales');
    const calcularBtn = document.getElementById('calcular');
    
    const planAplicado = document.getElementById('planAplicado');
    const porcentajeInicial = document.getElementById('porcentajeInicial');
    const cuotaInicial = document.getElementById('cuotaInicial');
    const montoFinanciar = document.getElementById('montoFinanciar');
    const tasaInteres = document.getElementById('tasaInteres');
    const plazoMeses = document.getElementById('plazoMeses');
    const cuotaMensual = document.getElementById('cuotaMensual');
    const costoTotal = document.getElementById('costoTotal');
    
    // Función para formatear valores monetarios
    function formatearMoneda(valor) {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            maximumFractionDigits: 0
        }).format(valor);
    }
    
    // Función para calcular la cuota mensual con interés compuesto
    function calcularCuotaMensual(montoFinanciar, tasaMensual, plazo) {
        // Fórmula de cuota fija con interés compuesto: M = P * r * (1+r)^n / ((1+r)^n - 1)
        const factor = Math.pow(1 + tasaMensual, plazo);
        return montoFinanciar * tasaMensual * factor / (factor - 1);
    }
    
    // Función principal de cálculo
    function calcular() {
        // Obtener valores de entrada
        const valorVivienda = parseFloat(valorViviendaInput.value);
        const ingresosMensuales = parseFloat(ingresosMensualesInput.value);
        
        // Validar entradas
        if (isNaN(valorVivienda) || valorVivienda <= 0) {
            alert('Por favor, ingrese un valor válido para la vivienda.');
            return;
        }
        
        if (isNaN(ingresosMensuales) || ingresosMensuales <= 0) {
            alert('Por favor, ingrese un valor válido para los ingresos mensuales.');
            return;
        }
        
        // Determinar el plan según los ingresos
        let porcentajeCuotaInicial, numeroCuotas, tasaInteresMensual;
        
        if (ingresosMensuales >= 1200000) {
            // Plan para ingresos iguales o superiores a $1.200.000
            porcentajeCuotaInicial = 0.15; // 15%
            numeroCuotas = 120; // 120 cuotas
            tasaInteresMensual = 0.02; // 2% mensual
            planAplicado.textContent = 'Plan para ingresos ≥ $1.200.000';
        } else {
            // Plan para ingresos inferiores a $1.200.000
            porcentajeCuotaInicial = 0.30; // 30%
            numeroCuotas = 84; // 84 cuotas
            tasaInteresMensual = 0.01; // 1% mensual
            planAplicado.textContent = 'Plan para ingresos < $1.200.000';
        }
        
        // Calcular cuota inicial
        const valorCuotaInicial = valorVivienda * porcentajeCuotaInicial;
        
        // Calcular monto a financiar
        const valorFinanciar = valorVivienda - valorCuotaInicial;
        
        // Calcular cuota mensual
        const valorCuotaMensual = calcularCuotaMensual(valorFinanciar, tasaInteresMensual, numeroCuotas);
        
        // Calcular costo total
        const costoTotalVivienda = valorCuotaInicial + (valorCuotaMensual * numeroCuotas);
        
        // Mostrar resultados
        porcentajeInicial.textContent = `${porcentajeCuotaInicial * 100}%`;
        cuotaInicial.textContent = formatearMoneda(valorCuotaInicial);
        montoFinanciar.textContent = formatearMoneda(valorFinanciar);
        tasaInteres.textContent = `${tasaInteresMensual * 100}% mensual`;
        plazoMeses.textContent = numeroCuotas;
        cuotaMensual.textContent = formatearMoneda(valorCuotaMensual);
        costoTotal.textContent = formatearMoneda(costoTotalVivienda);
    }
    
    // Asignar evento al botón de calcular
    calcularBtn.addEventListener('click', calcular);
    
    // Permitir calcular al presionar Enter en los campos de entrada
    valorViviendaInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calcular();
    });
    
    ingresosMensualesInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calcular();
    });
});