// eslint-disable-next-line no-unused-vars
function photographerFactory(data, initialTotalLike) {
	const { name, portrait, id, city, tagline, price } = data;
	const picture = `assets/photographers/${portrait}`;
	let totalLike = initialTotalLike;
	let likedMedias = [];
	function likeMedia(mediaId) {
		if (likedMedias.includes(mediaId)) {
			totalLike -= 1;
			likedMedias = likedMedias.filter(
				(likedMediaId) => likedMediaId !== mediaId
			);
		} else {
			totalLike += 1;
			likedMedias.push(mediaId);
		}

		// Mettre à jour l'affichage du nombre total de likes
		const totalLikesElement = document.querySelector(
			".photographer-price p"
		);
		totalLikesElement.innerHTML = `  ${totalLike} <img src="../../assets/icons/heart-solid.svg"> - ${price} € / jour  `;
	}
	function getUserCardDOM() {
		const container = document.createElement("a");
		container.setAttribute("class", "card-DOM");

		container.setAttribute("href", "photographer.html?id=" + id);
		const article = document.createElement("article");
		const img = document.createElement("img");
		img.setAttribute("src", picture);
		img.setAttribute("alt", name);

		const cardDOMTextContent = document.createElement("div");
		cardDOMTextContent.setAttribute("class", "card-text-content");

		const h2 = document.createElement("h2");
		h2.setAttribute("class", "card-h2");
		h2.textContent = name;

		const location = document.createElement("p");
		location.setAttribute("class", "card-location");
		location.textContent = city;

		const taglineContent = document.createElement("p");
		taglineContent.setAttribute("class", "card-tagline");
		taglineContent.textContent = tagline;

		const priceContent = document.createElement("p");
		priceContent.setAttribute("class", "card-price");
		priceContent.textContent = price + "€/jour";

		container.appendChild(article);
		article.appendChild(img);
		article.appendChild(cardDOMTextContent);
		cardDOMTextContent.appendChild(h2);
		cardDOMTextContent.appendChild(location);
		cardDOMTextContent.appendChild(taglineContent);
		cardDOMTextContent.appendChild(priceContent);

		return container;
	}
	async function getPhotographerDOM(containerID) {
		const container = document.getElementById(containerID);
		// eslint-disable-next-line no-undef
		const totalLikes = await getTotalLikes(id);
		container.querySelector(".photographer-name").innerHTML = name;
		container.querySelector(".photographer-location").innerHTML = city;
		container.querySelector(".photographer-tagline").innerHTML = tagline;
		const photographerPicture = document.querySelector(
			".photographer-picture"
		);
		photographerPicture.src = picture;
		photographerPicture.setAttribute("alt", name);
		container.querySelector(
			".photographer-price"
		).innerHTML = ` <p>  ${totalLikes} <img src="../../assets/icons/heart-solid.svg"> - ${price} € / jour </p>`;
	}
	return {
		name,
		picture,
		getUserCardDOM,
		getPhotographerDOM,
		totalLike,
		likeMedia,
	};
}
