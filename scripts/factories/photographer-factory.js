// eslint-disable-next-line no-unused-vars
function photographerFactory(data) {
    const { name, portrait, id, city, tagline, price } = data;
    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const container = document.createElement("a");
        container.setAttribute("class", "card-DOM")

        container.setAttribute("href", "photographer.html?id=" + id);
        const article = document.createElement("article");
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", name)

        const cardDOMTextContent = document.createElement('div')
        cardDOMTextContent.setAttribute("class", "card-text-content")

        const h2 = document.createElement("h2");
        h2.setAttribute("class", "card-h2")
        h2.textContent = name;

        const location = document.createElement("p")
        location.setAttribute("class", "card-location")
        location.textContent = city;

        const taglineContent = document.createElement("p")
        taglineContent.setAttribute("class", "card-tagline")
        taglineContent.textContent = tagline;

        const priceContent = document.createElement("p")
        priceContent.setAttribute("class", "card-price")
        priceContent.textContent = price + "€/jour";

        container.appendChild(article);
        article.appendChild(img);
        article.appendChild(cardDOMTextContent)
        cardDOMTextContent.appendChild(h2);
        cardDOMTextContent.appendChild(location);
        cardDOMTextContent.appendChild(taglineContent);
        cardDOMTextContent.appendChild(priceContent);

        return (container);
    }
    function getPhotographerDOM(containerID) {
        const container = document.getElementById(containerID)

        container.querySelector(".photographer-name").innerHTML = name;
        container.querySelector(".photographer-location").innerHTML = city;
        container.querySelector(".photographer-tagline").innerHTML = tagline;
        container.querySelector(".photographer-picture").src = picture;
        container.querySelector(".photographer-price").innerText = price + "€ / jour";

    }



    return { name, picture, getUserCardDOM, getPhotographerDOM };

}
async function getPhotographers() {
    try {
        const apiReponse = await fetch("./data/photographers.json");
        const data = await apiReponse.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

async function getPhotographer(id) {
    try {
        const apiReponse = await fetch("./data/photographers.json");
        const data = await apiReponse.json();
        let photographer;
        photographer = data.photographers.find((element) => id === element.id)
        return photographer
    } catch (error) {
        console.log(error);
    }
}
// creer une fonction likes
/* likes.addEventListener('click', function () {
    console.log("hello")
}) */
// appeler cette fonction like au clique sur le bouton
// incrémenter le nombres de like au nombre de like sur le photographe
// vérifier que l'utilisateur (garder un tableau de toute les images qui ont été liké)