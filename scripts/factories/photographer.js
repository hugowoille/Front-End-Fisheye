// eslint-disable-next-line no-unused-vars
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