// Constantes para los cálculos
const LIMITE_COMPRA = 5000000;
const TASA_INTERES = 0.15; // 15% de interés

// Porcentajes para montos >= 5,000,000
const RECURSOS_PROPIOS_ALTO = 0.55; // 55%
const PRESTAMO_BANCO_ALTO = 0.30;   // 30%
const CREDITO_FABRICANTE_ALTO = 0.15; // 15% (restante)

// Porcentajes para montos < 5,000,000
const RECURSOS_PROPIOS_BAJO = 0.70; // 70%
const CREDITO_FABRICANTE_BAJO = 0.30; // 30%

// Función para formatear montos como pesos colombianos
function formatMoney(amount) {
    return '$' + amount.toLocaleString('es-CO');
}

// Función para establecer montos predefinidos
function presetMonto(valor) {
    document.getElementById('monto').value = valor;
}

// Función principal para calcular las formas de pago
function calcularPago() {
    // Obtener el monto total de la compra
    const montoTotal = parseFloat(document.getElementById('monto').value);
    
    // Validar que el monto sea un número positivo
    if (isNaN(montoTotal) || montoTotal <= 0) {
        alert('Por favor, introduce un valor de compra válido mayor que cero.');
        return;
    }
    
    let recursosPropios, prestamoBanco, creditoFabricante, interesFabricante, totalPagar;
    
    // Determinar las formas de pago según el monto total
    if (montoTotal >= LIMITE_COMPRA) {
        // Para montos >= 5,000,000
        recursosPropios = montoTotal * RECURSOS_PROPIOS_ALTO;
        prestamoBanco = montoTotal * PRESTAMO_BANCO_ALTO;
        creditoFabricante = montoTotal * CREDITO_FABRICANTE_ALTO;
    } else {
        // Para montos < 5,000,000
        recursosPropios = montoTotal * RECURSOS_PROPIOS_BAJO;
        prestamoBanco = 0; // No hay préstamo bancario
        creditoFabricante = montoTotal * CREDITO_FABRICANTE_BAJO;
    }
    
    // Calcular el interés sobre el crédito del fabricante
    interesFabricante = creditoFabricante * TASA_INTERES;
    
    // Calcular el monto total a pagar (incluye el interés)
    totalPagar = montoTotal + interesFabricante;
    
    // Actualizar los resultados en el HTML
    document.getElementById('recursos-propios').textContent = formatMoney(recursosPropios);
    document.getElementById('prestamo-banco').textContent = formatMoney(prestamoBanco);
    document.getElementById('credito-fabricante').textContent = formatMoney(creditoFabricante);
    document.getElementById('interes').textContent = formatMoney(interesFabricante);
    document.getElementById('total-pagar').textContent = formatMoney(totalPagar);
    
    // Actualizar el gráfico de barras
    actualizarGrafico(recursosPropios, prestamoBanco, creditoFabricante, interesFabricante, totalPagar);
    
    // Añadir al historial
    agregarAlHistorial(montoTotal, recursosPropios, prestamoBanco, creditoFabricante, interesFabricante, totalPagar);
}

// Función para actualizar el gráfico de barras
function actualizarGrafico(recursosPropios, prestamoBanco, creditoFabricante, interesFabricante, totalPagar) {
    // Limpiar el gráfico existente
    const chartElement = document.getElementById('chart');
    chartElement.innerHTML = '';
    
    // Calcular el valor máximo para la escala
    const maxValue = totalPagar;
    
    // Crear y añadir las barras al gráfico
    const barras = [
        { valor: recursosPropios, clase: 'recursos', etiqueta: 'Recursos Propios' },
        { valor: prestamoBanco, clase: 'banco', etiqueta: 'Préstamo Bancario' },
        { valor: creditoFabricante, clase: 'fabricante', etiqueta: 'Crédito Fabricante' },
        { valor: interesFabricante, clase: 'interes', etiqueta: 'Interés' }
    ];
    
    barras.forEach(barra => {
        if (barra.valor > 0) {
            // Calcular la altura relativa (200px es la altura máxima)
            const altura = (barra.valor / maxValue) * 200;
            
            // Crear el elemento de la barra
            const barraElement = document.createElement('div');
            barraElement.className = `bar ${barra.clase}`;
            barraElement.style.height = `${altura}px`;
            
            // Añadir la etiqueta de valor
            const valorElement = document.createElement('div');
            valorElement.className = 'bar-value';
            valorElement.textContent = formatMoney(barra.valor);
            barraElement.appendChild(valorElement);
            
            // Añadir la etiqueta de la barra
            const etiquetaElement = document.createElement('div');
            etiquetaElement.className = 'bar-label';
            etiquetaElement.textContent = barra.etiqueta.split(' ')[0];
            barraElement.appendChild(etiquetaElement);
            
            // Añadir la barra al gráfico
            chartElement.appendChild(barraElement);
        }
    });
}

// Función para añadir el cálculo al historial
function agregarAlHistorial(montoTotal, recursosPropios, prestamoBanco, creditoFabricante, interesFabricante, totalPagar) {
    const tbody = document.querySelector('#historial tbody');
    
    // Crear una nueva fila para la tabla
    const row = document.createElement('tr');
    
    // Añadir celdas con los valores
    row.innerHTML = `
        <td>${formatMoney(montoTotal)}</td>
        <td>${formatMoney(recursosPropios)}</td>
        <td>${formatMoney(prestamoBanco)}</td>
        <td>${formatMoney(creditoFabricante)}</td>
        <td>${formatMoney(interesFabricante)}</td>
        <td>${formatMoney(totalPagar)}</td>
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
    // Permitir presionar Enter en el campo de monto para calcular
    document.getElementById('monto').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calcularPago();
        }
    });
    
    // Calcular con el valor inicial
    calcularPago();
});