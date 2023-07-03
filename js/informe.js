const main = (function(){
    //Variables
    const forms = {
        "1": "Derechos del titular de datos personales",
        "2": "Consentimiento del titular, de las obligaciones y deberes del responsable y del tratamiento de datos en general",
        "3": "Datos Personales de Obligaciones Económicas",
        "4": "Cumplimiento de normas de tratamiento de datos personales por órganos públicos",
        "5": "Protección de Datos sobre la transferencia internacional de datos personales",
    }

    //DOM Cache
    const div_recounts = document.getElementById('recount')
    const div_score = document.getElementById('score')
    const form_divs = document.querySelectorAll('div.form')

    // Init
    function init() {
        const recounts = JSON.parse(localStorage.getItem("recounts"))
        const score = Number(localStorage.getItem("score"))
        const form_title = localStorage.getItem("form_title")
        const question_numbers = JSON.parse(localStorage.getItem("question_numbers"))
        RenderRecount(recounts)
        RenderScore(score)
        RenderFormSugestions(form_title, question_numbers)
    }

    // Functions
    function GetForm(form_title){
        return Object.keys(forms).find(title => forms[title] === form_title)
    }
    // Rendering
    function RenderFormSugestions(form_title, question_numbers){
        const display_form = GetForm(form_title)
        form_divs.forEach(form => {
            if (form.classList.contains(display_form)){
                form.classList.remove("oculto")
                RenderQuestions(form, question_numbers)
            }
            else{
                form.classList.add("oculto")
            }
        }) 
    }

    function RenderQuestions(form, question_numbers){
        const div_questions = Array.from(form.getElementsByTagName("div"))
        console.log(div_questions);
        div_questions.forEach(question => {
            if(question_numbers.includes(question.classList[1])){
                question.classList.remove("oculto")
            }
            else{
                question.classList.add("oculto")
            }
        })
    }

    function RenderRecount(recounts) {
        let recount_list = "<ul>"
        const recount_entries = Object.entries(recounts)

        recount_entries.forEach(entry =>{
            recount_list +=`<li>${entry[0]}: ${entry[1]}</li>`
        })
        recount_list +=`</ul>`
        div_recounts.innerHTML = recount_list
    }

    function RenderScore(score) {
        if(score > 50)
        div_score.innerHTML = `<h2 class="subtitle">Su empresa cumple en un ${score}% </h2>`
        else
        div_score.innerHTML = `<h2 class="subtitle">Su empresa cumple en un ${score}% </h2>`
    }

    return init();
})()