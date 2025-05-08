document.addEventListener('DOMContentLoaded', function() {
    // Obtener referencias a los elementos del DOM
    const numeroInput = document.getElementById('numero');
    const calcularBtn = document.getElementById('calcular');
    
    const numeroIngresado = document.getElementById('numeroIngresado');
    const tipoNumero = document.getElementById('tipoNumero');
    const operacion = document.getElementById('operacion');
    const resultado = document.getElementById('resultado');
    
    // Función principal de cálculo
    function calcular() {
        // Obtener el valor ingresado
        let numero = parseFloat(numeroInput.value);
        
        // Validar que se haya ingresado un número válido
        if (isNaN(numero)) {
            alert('Por favor, ingrese un número válido.');
            return;
        }
        
        // Mostrar el número ingresado
        numeroIngresado.textContent = formatearNumero(numero);
        
        // Determinar si es par o impar
        let esPar = numero % 2 === 0;
        
        // Mostrar el tipo de número
        tipoNumero.textContent = esPar ? 'Par' : 'Impar';
        
        // Realizar la operación según el tipo de número
        let resultadoCalculado;
        let operacionRealizada;
        
        if (esPar) {
            // Si es par, calcular el cubo (n³)
            resultadoCalculado = Math.pow(numero, 3);
            operacionRealizada = `Cubo (${numero}³)`;
        } else {
            // Si es impar, calcular el triple (3n)
            resultadoCalculado = numero * 3;
            operacionRealizada = `Triple (3 × ${numero})`;
        }
        
        // Mostrar la operación realizada y el resultado
        operacion.textContent = operacionRealizada;
        resultado.textContent = formatearNumero(resultadoCalculado);
        
        // Resaltar los resultados con animación
        destacarResultados();
    }
    
    // Función para formatear números con separadores de miles
    function formatearNumero(valor) {
        return new Intl.NumberFormat('es-ES').format(valor);
    }
    
    // Función para resaltar visualmente los resultados
    function destacarResultados() {
        const resultItems = document.querySelectorAll('.result-item');
        
        resultItems.forEach(item => {
            item.style.transition = 'background-color 0.5s';
            item.style.backgroundColor = '#e8f0fe';
            
            setTimeout(() => {
                item.style.backgroundColor = 'transparent';
            }, 800);
        });
    }
    
    // Asignar evento al botón de calcular
    calcularBtn.addEventListener('click', calcular);
    
    // Permitir calcular al presionar Enter en el campo de entrada
    numeroInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calcular();
    });
    
    // Enfocar el campo de entrada al cargar la página
    numeroInput.focus();
});