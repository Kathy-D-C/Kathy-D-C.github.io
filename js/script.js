/*function calcularPuntaje() {
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
  }*/


  
  
  var respuestas = []; // Array para almacenar las respuestas

  function calcularPuntaje() {
    // Obtiene todas las preguntas y el puntaje total
    var preguntas = document.getElementsByClassName('pregunta');
    var puntajeTotal = 0;
  
    // Recorre las preguntas y obtiene el nombre de la opción seleccionada
    for (var i = 0; i < preguntas.length; i++) {
      var pregunta = preguntas[i];
      var opciones = pregunta.getElementsByTagName('input');
  
      for (var j = 0; j < opciones.length; j++) {
        var opcion = opciones[j];
  
        if (opcion.checked) {
          var respuesta = {
            pregunta: pregunta.id,
            opcion: opcion.value,
            puntaje: parseInt(opcion.getAttribute('data-puntaje')),
            fecha: new Date().toLocaleDateString() // Fecha actual
          };
  
          respuestas.push(respuesta);
          puntajeTotal += respuesta.puntaje;
          break;
        }
      }
    }
  
    // Muestra el resultado y el porcentaje de cumplimiento
    var resultado = document.getElementById('resultado');
    resultado.innerHTML = 'Puntaje final: ' + puntajeTotal;
  
  /* Calcula el porcentaje de cumplimiento
    var porcentajeCumplimiento = (puntajeTotal / (preguntas.length * 5)) * 100;
      
    // Muestra el porcentaje de cumplimiento
    var recomendacion = document.getElementById('recomendacion');
    recomendacion.innerHTML = 'Porcentaje de cumplimiento: ' + porcentajeCumplimiento.toFixed(2) + '%';  */
  }
  
  function generarInforme() {
    // Crea una variable para almacenar el informe final
    var informe = '';
  
    // Recorre el array de respuestas y genera el informe
    for (var i = 0; i < respuestas.length; i++) {
      var respuesta = respuestas[i];
      informe += 'Respuesta ' + (i + 1) + ': Pregunta ' + respuesta.pregunta + ', Opción ' + respuesta.opcion + ', Puntaje ' + respuesta.puntaje + ', Fecha ' + respuesta.fecha + '\n';
    }
  
    // Muestra el informe final
    var informeFinal = document.getElementById('informeFinal');
    informeFinal.innerHTML = informe;
  }

  /*function guardarRespuestas() {
    var respuestas = [];
  
    var opciones = document.querySelectorAll('input[type="radio"]:checked');
    opciones.forEach(function(opcion) {
      respuestas.push({
        pregunta: opcion.name,
        respuesta: opcion.value,
        puntaje: parseInt(opcion.dataset.puntaje)
      });
  */