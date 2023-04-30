// eslint-disable-next-line no-unused-vars
function photographerFactory(data) {
    const { name, portrait, id, city, tagline, price } = data;

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
    function getPhotographerDOM(containerID) {
        const container = document.getElementById(containerID)

        container.querySelector(".photographer-name").innerHTML = name;
        container.querySelector(".photographer-location").innerHTML = city;
        container.querySelector(".photographer-tagline").innerHTML = tagline;
        container.querySelector(".photographer-picture").src = picture;
        container.querySelector(".photographer-price").innerText = price;

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
        console.log('id : ', photographer);
        return photographer
    } catch (error) {
        console.log(error);
    }
}