(async function load() {

    // action
    //terror
    //animation


    async function getData(url) {
        try {
            const response = await fetch(url)

            const data = await response.json() //cada await es una promesa

            return data;
        } catch (error) {
            console.log(error)
        }

    }

    // FORMULARIO _____________________________________________________________ 
    const $form = document.getElementById("form")
    const $home = document.getElementById("home")

    function setAtributes($element, atributes) {
        for (const atribute in atributes) {

            $element.setAttribute(atribute, atributes[atribute])


        }
    }

    $form.addEventListener("submit", (event) => {
        event.preventDefault()

        $home.classList.add("search-active")
        const $loader = document.createElement("img")
        const $featuringContainer = document.getElementById("featuring")
        $featuringContainer.classList.add("dnone")
        setAtributes($loader, {

            src: "src/images/loader.gif",
            hight: 50,
            width: 50,
        })

    })


    // FORMULARIO _____________________________________________________________ 

    // PETICIONES _____________________________________________________________ 


    // Manera 1 de hacelo: 
    const actionList = await getData('https://yts.mx/api/v2/list_movies.json?genre=action')
    const dramaList = await getData('https://yts.mx/api/v2/list_movies.json?genre=drama')
    const animationList = await getData('https://yts.mx/api/v2/list_movies.json?genre=animation')



    // Manera 2 de hacelo: 
    // var dramaList;
    // getData('https://yts.mx/api/v2/list_movies.json?genre=drama')
    //     .then(function(data) {

    //         console.log("dramaList", data)

    //         dramaList = data

    //     })


    // PETICIONES _____________________________________________________________ 

    // SELECTORES _____________________________________________________________ 

    // SELECTORES CON JQUERYS

    // const $home = $(".home")


    const $actionContainer = document.querySelector("#action") //Selector
    const $dramaContainer = document.getElementById("drama")
    const $animationContainer = document.getElementById("animation")






    const $modal = document.getElementById("modal")
    const $overlay = document.getElementById("overlay")
    const $hideModal = document.getElementById("hide-modal")


    const $modalTitle = $modal.querySelector("h1")
    const $modalImage = $modal.querySelector("img")
    const $modalDescription = $modal.querySelector("p")


    // SELECTORES _____________________________________________________________ 


    // FUNCIONES _____________________________________________________________ 


    // ESTA FUNCION CREA EL HTML
    function videoItemTemplate(movies) {
        return (
            `<div class="primaryPlaylistItem">
                   <div class="primaryPlaylist-listItem-image">
                      <img src="${movies.medium_cover_image}">
                  </div>
                <h4 class="primaryPlaylistItem-title">
                ${movies.title}
                <h4>
              </div>   `

        )
    }
    // ESTA FUNCION PASA DE STRING A HTML
    function createTemplate(htmlSting) {

        const $html = document.implementation.createHTMLDocument(); //crea una estructura html
        $html.body.innerHTML = htmlSting; //Seccion en codigo HTML
        return $html.body.children[0]
    }
    // RENDER TEMPLATES

    function renderMovieList(list, $container) {
        $container.children[0].remove()
            //actionList.data.movies
        list.forEach(movies => { // Con cada uno de los elementos del objetos hacemos :

            const htmlSting = videoItemTemplate(movies) // Seccion en STRING
            const movieElement = createTemplate(htmlSting)
            $container.append(movieElement)

            addEventClick(movieElement)
        })

    }

    function showModal() {

        $overlay.classList.add("active")
        $modal.style.animation = 'modalIn .8s forwards'

    }

    $hideModal.addEventListener("click", hideModal)


    function hideModal() {
        $overlay.classList.remove("active")
        $modal.style.animation = 'modalOut .5s forwards'
    }


    // FUNCIONES _____________________________________________________________ 

    // CALL _____________________________________________________________ 

    renderMovieList(actionList.data.movies, $actionContainer)

    renderMovieList(dramaList.data.movies, $dramaContainer)

    renderMovieList(animationList.data.movies, $animationContainer)


    // CALL _____________________________________________________________ 

    // EVENTOS EN LAS FUNCIONES _____________________________________________________________ 

    function addEventClick($element) {
        $element.addEventListener("click", () => {
            showModal()

        })
    }


    // EVENTOS _____________________________________________________________ 










})()