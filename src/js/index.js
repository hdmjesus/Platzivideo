(async function load() {

    // action
    //terror
    //animation


    async function getData(url) {

        const response = await fetch(url)

        const data = await response.json() //cada await es una promesa

        if (data.data.movie_count > 0) {
            //Aqui se acaba
            return data;
        }
        //Si no hay peliculas, aqui continua
        throw new Error('No se encontro ningun resultado')

    }

    async function getUsers(url) {
        const request = await fetch(url)
        const user = await request.json()


        return user
    }

    // FORMULARIO _____________________________________________________________ 
    const $form = document.getElementById("form")
    const $home = document.getElementById("home")

    function setAtributes($element, atributes) {
        for (const atribute in atributes) {

            $element.setAttribute(atribute, atributes[atribute]) // (Atributo, valor)


        }
    }

    function featuringTemplate(peli) {
        return (
            ` <div class="featuring">
                <div class="featuring-image">
                    <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
                </div>
                <div class="featuring-content">
                    <p class="featuring-title">Pelicula encontrada</p>
                    <p class="featuring-album">${peli.title}</p>
                </div>
            </div>
            `
        )
    }

    function templateUsers(users) {
        return (
            `<li class="playlistFriends-item">
             <a href="#">
                <img src="${users.avatar_url}" />
                    <span>
                     ${users.login}
                    </span>
             </a>
            </li>`
        )
    }

    const BASE_API = 'https://yts.mx/api/v2/'
    const BASE_USERS_API = 'https://api.github.com/'

    $form.addEventListener("submit", async(event) => {
        event.preventDefault() //Hace que el formulario no recargue la pagina

        $home.classList.add("search-active")
        const $loader = document.createElement("img")
        const $featuringContainer = document.getElementById("featuring")
        $featuringContainer.classList.add("dnone")

        setAtributes($loader, {

            src: "src/images/loader.gif",
            hight: 50,
            width: 50,
        })

        $featuringContainer.append($loader)

        const data = new FormData($form) //obtenemos los datos del formulario

        try {
            const {
                data: {
                    movies: pelis //Destructurando el objeto que llega de la API
                }
            } = await getData(`${BASE_API}list_movies.json?limit=1&query_term=${data.get('name')}`)
            const HTMLString = featuringTemplate(pelis[0])
            $featuringContainer.innerHTML = HTMLString;

        } catch (culo) {
            alert(culo.message)
            $loader.remove()
            $home.classList.remove('search-active')
        }

        //La constante peli, lo que hace es traer una pelicula por el nombre de la misma
        // que obtuvimos del formulario, y que solo me traiga un resultado.

    })


    // FORMULARIO _____________________________________________________________ 




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
    const $listaUsuario = document.getElementById('playlistFriends')

    const $modal = document.getElementById("modal")
    const $overlay = document.getElementById("overlay")
    const $hideModal = document.getElementById("hide-modal")


    const $modalTitle = $modal.querySelector("h1")
    const $modalImage = $modal.querySelector("img")
    const $modalDescription = $modal.querySelector("p")


    // SELECTORES _____________________________________________________________ 


    // FUNCIONES _____________________________________________________________ 


    // ESTA FUNCION CREA EL HTML
    function videoItemTemplate(movies, category) {
        return (
            `<div class="primaryPlaylistItem" data-id="${movies.id}" data-category="${category}">
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

    function renderMovieList(list, $container, category) {
        $container.children[0].remove()
            //actionList.data.movies
        list.forEach(movies => { // Con cada uno de los elementos del objetos hacemos :

            const htmlSting = videoItemTemplate(movies, category) // Seccion en STRING
            const movieElement = createTemplate(htmlSting)
            $container.append(movieElement)

            const image = movieElement.querySelector('img')

            image.addEventListener("load", (event) => {

                event.target.classList.add('fadeIn')
            })

            addEventClick(movieElement)


        })

    }

    function renderUserList(list, $container) {

        list.forEach(users => { // Con cada uno de los elementos del objetos hacemos :

            const htmlSting = templateUsers(users) // Seccion en STRING
            const movieElement = createTemplate(htmlSting)
            $container.append(movieElement)


            addEventClick(movieElement)


        })

    }

    function findById(list, id) {
        return list.find(movie => movie.id === parseInt(id, 10))
    }

    function findMovie(id, category) {

        switch (category) {
            case "Action":
                {
                    return findById(actionList, id)
                }

                break;

            case "Drama":
                {
                    return findById(dramaList, id)
                }

                break;


            default:
                {
                    return findById(animationList, id)
                }
                break;
        }

    }

    function showModal($element) {

        $overlay.classList.add("active")
        $modal.style.animation = 'modalIn .8s forwards'
        const id = $element.dataset.id //Extraemos el id de cada una de las peliculas traida por la API
        const category = $element.dataset.category

        const data = findMovie(id, category) //busca por el id de la pelicula seleciconada y la trae

        $modalTitle.textContent = data.title
        $modalImage.setAttribute("src", data.medium_cover_image)
        $modalDescription.textContent = data.description_full
    }

    $hideModal.addEventListener("click", hideModal)


    function hideModal() {
        $overlay.classList.remove("active")
        $modal.style.animation = 'modalOut .5s forwards'
    }


    // FUNCIONES _____________________________________________________________ 



    // CALL _____________________________________________________________ 
    const userList = await getUsers(`${BASE_USERS_API}users`)

    renderUserList(userList, $listaUsuario)

    const { data: { movies: actionList } } = await getData(`${BASE_API}list_movies.json?genre=action`)
    localStorage.setItem('actionList', JSON.stringify(actionList))
    renderMovieList(actionList, $actionContainer, "Action")

    const { data: { movies: dramaList } } = await getData(`${BASE_API}list_movies.json?genre=drama`)
    localStorage.setItem('dramaList', JSON.stringify(dramaList))
    renderMovieList(dramaList, $dramaContainer, "Drama")

    const { data: { movies: animationList } } = await getData(`${BASE_API}list_movies.json?genre=animation`)
    localStorage.setItem('animationList', JSON.stringify(animationList))
    renderMovieList(animationList, $animationContainer, "Animation")






    // CALL _____________________________________________________________ 

    // EVENTOS EN LAS FUNCIONES _____________________________________________________________ 

    function addEventClick($element) {
        $element.addEventListener("click", () => {

            showModal($element)

        })
    }


    // EVENTOS _____________________________________________________________ 










})()