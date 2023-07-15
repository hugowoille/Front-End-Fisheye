//Mettre le code JavaScript lié à la page photographer.html


async function init() {
    // étape 1 récupérer l'id dans l'url
    const photographerId = getUrlId();
    // étape 2 Fetch le fichier jSon et return le photographe qui a l'ID en question
    const photographerData = await getPhotographer(photographerId);
    // étape 3 display le photographe
    displayPhotographerItems(photographerData);
    displayPhotographerMedias(photographerId);
    // filters

    let selectedFilter = document.getElementById('selected-filter')
    const titleFilter = document.getElementById('title-filter')
    const dateFilter = document.getElementById('date-filter')
    const popularityFilter = document.getElementById('popularity-filter')


    popularityFilter.addEventListener('click', () => displayPhotographerMedias(photographerId, "popularity"))
    popularityFilter.addEventListener('click', popularityIsSelected)


    dateFilter.addEventListener('click', () => displayPhotographerMedias(photographerId, "date"))
    dateFilter.addEventListener('click', dateIsSelected)

    titleFilter.addEventListener('click', () => {
        displayPhotographerMedias(photographerId, "title");
        titleIsSelected();
    });
   


    selectedFilter.textContent = popularityFilter.textContent
    popularityFilter.style.display = "none"

    separate = document.querySelector(".separate")

    function popularityIsSelected() {
        selectedFilter.textContent = popularityFilter.textContent
        popularityFilter.style.display = "none"
        dateFilter.style.display = "block"
        titleFilter.style.display = "block"
        dropDownMenu.style.opacity = "0"
        dropDownClicked = false;
        titleFilter.style.order = "0"
        separate.style.order = "1"
        dateFilter.style.order = " 2"

    }

    function dateIsSelected() {
        selectedFilter.textContent = dateFilter.textContent
        popularityFilter.style.display = "block"
        titleFilter.style.display = "block"
        dateFilter.style.display = "none"
        dropDownMenu.style.opacity = "0"
        dropDownClicked = false;
        separate.style.order = "1"
        popularityFilter.style.order = "0"
        titleFilter.style.order = "2"

    }

    function titleIsSelected() {
        selectedFilter.textContent = titleFilter.textContent
        popularityFilter.style.display = "block"
        dateFilter.style.display = "block"
        dateFilter.style.order = " 1"
        titleFilter.style.display = "none"
        dropDownMenu.style.opacity = "0"
        dropDownClicked = false;
        separate.style.order = "0"
    }

    function functionUpdateSortFilters(filterName) {

    }

}

function displayPhotographerItems(photographerData) {
    const photographer = photographerFactory(photographerData)
    photographer.getPhotographerDOM("photographer-container");
}


// récupère l'id dans l'url

function getUrlId() {
    const searchParams = window.location.search;
    const UrlSearchParams = new URLSearchParams(searchParams);
    const photographerId = UrlSearchParams.get("id");
    return Number(photographerId);
}



init();

