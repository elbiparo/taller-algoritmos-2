document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const edadInput = document.getElementById('edad');
    const femeninoRadio = document.getElementById('femenino');
    const masculinoRadio = document.getElementById('masculino');
    const calcularBtn = document.getElementById('calcular');
    const resultado = document.getElementById('resultado');
    const formulaDisplay = document.getElementById('formula-display');
    
    // Constantes para las fórmulas
    const BASE_FEMENINO = 220;
    const BASE_MASCULINO = 210;
    const DIVISOR = 10;
    
    // Función para actualizar la fórmula mostrada según el sexo seleccionado
    function actualizarFormula() {
        if (femeninoRadio.checked) {
            formulaDisplay.textContent = `Para sexo femenino: (${BASE_FEMENINO} - edad) / ${DIVISOR}`;
        } else {
            formulaDisplay.textContent = `Para sexo masculino: (${BASE_MASCULINO} - edad) / ${DIVISOR}`;
        }
    }
    
    // Eventos para cambiar la fórmula cuando se cambia el sexo
    femeninoRadio.addEventListener('change', actualizarFormula);
    masculinoRadio.addEventListener('change', actualizarFormula);
    
    // Función para calcular las pulsaciones
    function calcularPulsaciones() {
        // Obtener la edad
        const edad = parseInt(edadInput.value);
        
        // Validar que la edad sea un número válido
        if (isNaN(edad) || edad <= 0 || edad > 120) {
            resultado.innerHTML = '<p class="error">Por favor, ingrese una edad válida (entre 1 y 120 años).</p>';
            return;
        }
        
        // Determinar el sexo seleccionado
        const esFemenino = femeninoRadio.checked;
        
        // Calcular pulsaciones según la fórmula correspondiente
        let pulsaciones;
        let baseUsada;
        
        if (esFemenino) {
            baseUsada = BASE_FEMENINO;
            pulsaciones = (BASE_FEMENINO - edad) / DIVISOR;
        } else {
            baseUsada = BASE_MASCULINO;
            pulsaciones = (BASE_MASCULINO - edad) / DIVISOR;
        }
        
        // Redondear a 1 decimal
        pulsaciones = Math.round(pulsaciones * 10) / 10;
        
        // Mostrar resultado
        resultado.innerHTML = `
            <p>Para una persona de <strong>${edad} años</strong> de sexo 
            <strong>${esFemenino ? 'femenino' : 'masculino'}</strong>:</p>
            <div class="calculo">
                <p>(${baseUsada} - ${edad}) / ${DIVISOR} = <strong>${pulsaciones}</strong></p>
            </div>
            <p class="recomendacion">
                Recomendación: <strong>${pulsaciones} pulsaciones</strong> cada 10 segundos
                durante ejercicio aeróbico.
            </p>
        `;
        
        // Aplicar estilo al resultado
        resultado.classList.add('mostrar');
    }
    
    // Evento click del botón
    calcularBtn.addEventListener('click', calcularPulsaciones);
    
    // También permitir calcular con Enter en el input de edad
    edadInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calcularPulsaciones();
        }
    });
    
    // Inicializar la fórmula mostrada
    actualizarFormula();
});