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


    const popularityFilter = document.getElementById('popularity-filter')
    popularityFilter.addEventListener('click', () => displayPhotographerMedias(photographerId, "popularity"))
    const dateFilter = document.getElementById('date-filter')
    dateFilter.addEventListener('click', () => displayPhotographerMedias(photographerId, "date"))
    const titleFilter = document.getElementById('title-filter')
    titleFilter.addEventListener('click', () => displayPhotographerMedias(photographerId, "title"))

    const selectedFilter = document.getElementById('selected-filter')
    selectedFilter.textContent = popularityFilter.textContent
    if (selectedFilter.textContent === popularityFilter.textContent) {
        popularityFilter.style.display = "none"
        dateFilter.style.display = "block"
        titleFilter.style.display = "block"
    } else if (selectedFilter.textContent === dateFilter.textContent) {
        popularityFilter.style.display = "block"
        dateFilter.style.display = "none"
        titleFilter.style.display = "block"
    } else if (selectedFilter.textContent === titleFilter.textContent) {
        popularityFilter.style.display = "block"
        dateFilter.style.display = "block"
        titleFilter.style.display = "none"
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

