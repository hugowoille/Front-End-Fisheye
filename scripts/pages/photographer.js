//Mettre le code JavaScript lié à la page photographer.html


async function init() {
    // étape 1 récupérer l'id dans l'url
    const photographerId = getUrlId();
    // étape 2 Fetch le fichier jSon et return le photographe qui a l'ID en question
    const photographerData = await getPhotographer(photographerId);
    console.log("photographer Data", photographerData)
    // étape 3 créer le photographe par la factorie

    // étape 4 display le photographe
    displayPhotographerItems(photographerData);
}

function displayPhotographerItems(photographer) {
    document.getElementById("photographer-name").innerHTML = photographer.name
    document.getElementById("photographer-location").innerHTML = photographer.city
    document.getElementById("photographer-tagline").innerHTML = photographer.tagline
    document.getElementById("photographer-picture").src = "assets/photographers/" + photographer.portrait


}

async function getPhotographer(id) {

    try {
        const apiReponse = await fetch("./data/photographers.json");
        const data = await apiReponse.json();
        let photographer;
        photographer = data.photographers.find((element) => id === element.id)
        console.log('id : ', photographer);
        return photographer
    } catch (error) {
        console.log(error);
    }
}

// récupère l'id dans l'url

function getUrlId() {

    const searchParams = window.location.search;
    const UrlSearchParams = new URLSearchParams(searchParams);
    const photographerId = UrlSearchParams.get("id");

    return Number(photographerId);

}

function photographerFactory(data) {
    const { name, portrait, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const container = document.createElement("a");
        container.setAttribute("href", "photographer.html?id=" + id);
        const article = document.createElement("article");
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        const h2 = document.createElement("h2");
        const button = document.createElement("button");
        h2.textContent = name;
        container.appendChild(article);
        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(button);


        return (container);
    }
    return { name, picture, getUserCardDOM };
}



init();

