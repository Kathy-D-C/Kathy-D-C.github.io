let puntajeTotal = 0;
let opcionesElegidas = {};

function guardarRespuestaYAvanzar(siguientePagina) {
  const radios = document.querySelectorAll('input[type="radio"]:checked');
  if (radios.length > 0) {
    // Obtener puntaje y opción elegida
    const puntaje = parseInt(radios[0].getAttribute('data-puntaje'));
    const opcionElegida = radios[0].value;

    // Actualizar puntaje total y recuento de opciones elegidas
    puntajeTotal += puntaje;
    if (opcionesElegidas[opcionElegida]) {
      opcionesElegidas[opcionElegida]++;
    } else {
      opcionesElegidas[opcionElegida] = 1;
    }

    // Guardar resultados en el almacenamiento del navegador (LocalStorage)
    localStorage.setItem('puntajeTotal', puntajeTotal);
    localStorage.setItem('opcionesElegidas', JSON.stringify(opcionesElegidas));

    // Navegar a la siguiente página
    window.location.href = siguientePagina;
  } else {
    alert('Selecciona una opción antes de continuar');
  }
}

function calcularPuntaje() {
  // Recuperar los resultados almacenados en el almacenamiento del navegador (LocalStorage)
  puntajeTotal = parseInt(localStorage.getItem('puntajeTotal')) || 0;
  opcionesElegidas = JSON.parse(localStorage.getItem('opcionesElegidas')) || {};

  // Mostrar resultados en la página 3
  const resultadosDiv = document.createElement('div');
  resultadosDiv.innerHTML = `
    <h2>Puntaje Total: ${puntajeTotal}</h2>
    <h3>Recuento de Opciones Elegidas:</h3>
    <ul>
      ${Object.entries(opcionesElegidas).map(([opcion, contador]) => `<li>${opcion}: ${contador}</li>`).join("")}
    </ul>
  `;

  document.body.appendChild(resultadosDiv);

  // Limpiar resultados almacenados en el almacenamiento del navegador (LocalStorage)
  localStorage.removeItem('puntajeTotal');
  localStorage.removeItem('opcionesElegidas');
}