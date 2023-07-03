const main = (function () {
  // Variables
  const respuestas = [] // Array para almacenar las respuestas
  const regex_url = /\/([^\/]+)\.html/
  const regex_title = /"(.*?)"/
  const regex_question = /^([^\.]+)/
  const question_numbers = []
  // DomCache
  const generate = document.getElementById("generate");
  const form_title = document.querySelector("section h2.subtitle")
  const preguntas = document.getElementsByClassName('pregunta');
  // Init
  function init(){
    ClearLocalStorage()
    ClearInputs()
  }

  // EventListeners
  generate.addEventListener("click", GenerateReport)

  // Functions
  function GenerateReport(e) {
    e.preventDefault();
    const valid = ValidateFormCompleted()
    if (valid) {
      //HideError()
      ExtractFormName()
      CalcularPuntaje()
      CalcularRecuento()
      SendQuestionNumbers()
      RedirectToReport()
    }
    else{
      RenderError()
    }
  }

  function CalcularPuntaje() {
    // Obtiene todas las preguntas y el puntaje total
    let puntajeTotal = 0;
    
    // Recorre las preguntas y obtiene el nombre de la opción seleccionada
    for (let i = 0; i < preguntas.length; i++) {
      const pregunta = preguntas[i];
      const opciones = pregunta.getElementsByTagName('input');
    
      // Recorre las opciones de la pregunta
      for (let j = 0; j < opciones.length; j++) {
        const opcion = opciones[j];
        
        if (opcion.checked) {
          if(opcion.value == "Opcion1" || opcion.value == "Opcion2"){
            const question = pregunta.querySelectorAll("h2:not(.section)")
            const question_number = regex_question.exec(question[0].innerText)
            question_numbers.push((question_number[0]))
          }
          const respuesta = {
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
    localStorage.setItem("score", (puntajeTotal/(preguntas.length*2)*100).toFixed(2))
  }  
    
  function CalcularRecuento() {
      const opciones = document.querySelectorAll('input[type="radio"]:checked');
      const recuento = {
        "Aún no implementado": 0,
        "Parcialmente implementado": 0,
        "Implementado con exito": 0,
        "No aplica": 0
      };
    
      opciones.forEach(function(opcion) {
        const valor = opcion.value;
        const etiqueta = opcion.parentNode.innerText.trim();
        recuento[etiqueta] = (recuento[etiqueta] || 0) + 1;
      });
    
      localStorage.setItem('recounts', JSON.stringify(recuento))
  }

  function RedirectToReport(){
    const current_url = window.location.href
    const redirection_url = current_url.replace(regex_url, `/Recomendaciones.html`)
    console.log(redirection_url);
    window.location.href = redirection_url
  }

  function ClearLocalStorage() {
    localStorage.removeItem("recounts")
    localStorage.removeItem("score")
    localStorage.removeItem("question_numbers")
    localStorage.removeItem("form_title")
  }

  function ClearInputs(){
    const inputs = Array.from(document.querySelectorAll("input"))
    inputs.forEach(input => {
      input.checked = false
    })
  }

  function ExtractFormName(){
    const title = regex_title.exec(form_title.innerText)
    localStorage.setItem('form_title', title[1])
  }

  function SendQuestionNumbers(){
    localStorage.setItem('question_numbers', JSON.stringify(question_numbers))
  }

  function ValidateFormCompleted(){
    const questions_array = Array.from(preguntas)
    let checked_count = 0
    questions_array.forEach(question => {
      const answers = Array.from(question.getElementsByTagName('input'))
      answers.forEach(answer =>{
        if(answer.checked){
          checked_count++
        }
      })
    })
    if(checked_count != questions_array.length) {
      return false
    }
    return true
  }

  // Render
  function RenderError(){
    const lower_section = document.querySelector("#report")
    const error_sections = lower_section.querySelectorAll(".page_selector")
    error_sections.forEach(section =>{
      if(section.id =="validation_error") section.style.display = "flex"
      lower_section.style["background-color"] = "#f0484271"
    })
    console.log(lower_section);
  }


  return init()
})()


// Funciones V1 Respaldadas 

/* function calcularPuntaje() {
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
} 


function calcularRecuento() {
  const opciones = document.querySelectorAll('input[type="radio"]:checked');
  const recuento = {};

  opciones.forEach(function(opcion) {
    const valor = opcion.value;
    const etiqueta = opcion.parentNode.innerText.trim();
    console.log(etiqueta, valor);
    recuento[etiqueta] = (recuento[etiqueta] || 0) + 1;
  });

  const recuentoRespuestas = document.getElementById('recuentoRespuestas');
  recuentoRespuestas.innerHTML = '';

  for (let respuesta in recuento) {
    recuentoRespuestas.innerHTML += respuesta + ': ' + recuento[respuesta] + ' respuestas<br>';
  }
} */