// Datos de calorías por actividad (calorías por minuto)
const CALORIAS = {
    dormir: 1.08,
    sentado: 1.66
};

// Función para calcular las calorías consumidas
function calcularCalorias() {
    // Obtener los valores del formulario
    const actividad = document.getElementById('actividad').value;
    const tiempo = parseInt(document.getElementById('tiempo').value);
    
    // Validar que el tiempo sea un número positivo
    if (isNaN(tiempo) || tiempo <= 0) {
        alert('Por favor, introduce un tiempo válido mayor que cero.');
        return;
    }
    
    // Calcular las calorías
    const caloriasPorMinuto = CALORIAS[actividad];
    const caloriasConsumidas = caloriasPorMinuto * tiempo;
    
    // Mostrar el resultado redondeado a 2 decimales
    document.getElementById('resultado').textContent = 
        `${caloriasConsumidas.toFixed(2)} calorías`;
    
    // Añadir al historial
    agregarAlHistorial(actividad, tiempo, caloriasConsumidas);
}

// Función para añadir el cálculo al historial
function agregarAlHistorial(actividad, tiempo, calorias) {
    const historial = document.getElementById('historial');
    const fecha = new Date();
    const horaActual = fecha.toLocaleTimeString();
    
    // Crear un nuevo elemento para el historial
    const item = document.createElement('li');
    
    // Determinar el nombre de la actividad para mostrar
    const nombreActividad = actividad === 'dormir' ? 'Dormir' : 'Sentado en reposo';
    
    // Formatear el texto del item
    item.textContent = `[${horaActual}] ${nombreActividad} durante ${tiempo} minutos: ${calorias.toFixed(2)} calorías`;
    
    // Añadir el nuevo elemento al principio del historial
    historial.insertBefore(item, historial.firstChild);
    
    // Limitar el historial a 10 elementos
    if (historial.children.length > 10) {
        historial.removeChild(historial.lastChild);
    }
}

// Función para establecer tiempos predefinidos
function presetTime(minutos) {
    document.getElementById('tiempo').value = minutos;
}

// Inicializar la calculadora
document.addEventListener('DOMContentLoaded', function() {
    // Permitir presionar Enter en el campo de tiempo para calcular
    document.getElementById('tiempo').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calcularCalorias();
        }
    });
});