function calcularRecuento() {
    var opciones = document.querySelectorAll('input[type="radio"]:checked');
    var recuento = {};
  
    opciones.forEach(function(opcion) {
      var valor = opcion.value;
      var etiqueta = opcion.parentNode.innerText.trim();
      recuento[etiqueta] = (recuento[etiqueta] || 0) + 1;
    });
  
    var recuentoRespuestas = document.getElementById('recuentoRespuestas');
    recuentoRespuestas.innerHTML = '';
  
    for (var respuesta in recuento) {
      recuentoRespuestas.innerHTML += respuesta + ': ' + recuento[respuesta] + ' respuestas<br>';
    }
  }