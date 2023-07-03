const main = (function (){
    //Variables
    var currentPageIndex = 0; 
    
    // DomCache
    const nextButton = document.getElementById("nextButton"); // Botón Siguiente
    const prevButton = document.getElementById("prevButton"); // Botón Siguiente
    const generate = document.getElementById("generate"); // Botón Siguiente
    
    // Init
    function init() {

    }

    //Event Listeners
    nextButton.addEventListener("click", goToNextPage)
    prevButton.addEventListener("click", goToPreviousPage)
    generate.addEventListener("click", goToNextPage)

    //Functions
    function goToNextPage(e) {
        e.preventDefault();
        const pages = Array.from(document.querySelectorAll(".page"))

        if(currentPageIndex == pages.length - 1) return
        
        pages[currentPageIndex].style.display = "none"
        currentPageIndex++
        pages[currentPageIndex].style.display = "block"
        if(currentPageIndex >= pages.length - 2){
            prevButton.style.display = "block"
        }
        if(currentPageIndex == pages.length - 1){
            generate.style.display = "block"
            this.style.display = "none"        
        }  
        
        scrollToTop()
    }

    function goToPreviousPage(e) {
        e.preventDefault();
        const pages = Array.from(document.querySelectorAll(".page"))

        if(currentPageIndex == 0) return
        
        pages[currentPageIndex].style.display = "none"
        currentPageIndex--
        pages[currentPageIndex].style.display = "block"
        if(currentPageIndex <= pages.length - 2){
            nextButton.style.display = "block"
            generate.style.display = "none"
        }
        if(currentPageIndex == 0){
            this.style.display = "none"        
        }   
        pages[currentPageIndex].style.display = "block"
    }

    function scrollToTop() {
        window.scrollTo({
        top: 370,
        behavior: 'smooth'
        });
    }

    return init()
})()
