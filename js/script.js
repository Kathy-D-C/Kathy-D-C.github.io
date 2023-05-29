function calcularPuntaje() {
    // Obtiene todas las preguntas
    var preguntas = document.getElementsByTagName('input');
    var puntajeTotal = 0;
  
    // Recorre las preguntas y suma los puntajes seleccionados
    for (var i = 0; i < preguntas.length; i++) {
      if (preguntas[i].checked) {
        puntajeTotal += parseInt(preguntas[i].value);
      }
    }
  
    // Muestra el resultado
    var resultado = document.getElementById('resultado');
    resultado.innerHTML = 'Puntaje final: ' + puntajeTotal;
  }