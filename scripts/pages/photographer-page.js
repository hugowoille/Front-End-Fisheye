/* eslint-disable no-undef */
async function getPhotographer(id) {
	try {
		const apiReponse = await fetch("./data/photographers.json");
		const data = await apiReponse.json();
		let photographer;
		photographer = data.photographers.find((element) => id === element.id);
		return photographer;
	} catch (error) {
		console.log(error);
	}
}

/**
 * get photographer medias
 * @param {number} photographerId ID of the photographer
 * @returns return photographer media
 */

async function getPhotographerMedias(photographerId) {
	try {
		const apiReponse = await fetch("./data/photographers.json");
		const { media } = await apiReponse.json();
		let photographerMedias = [];
		for (let element of media) {
			if (element.photographerId === photographerId) {
				photographerMedias.push(element);
			}
		}
		return photographerMedias;
	} catch (error) {
		console.log(error);
	}
}
async function displayTotalLikes(photographerId) {
	let mediasData = await getPhotographerMedias(photographerId);
	let totalLikes = 0;
	mediasData.forEach((media) => {
		totalLikes += media.likes;
	});
	return totalLikes;
}

//Mettre le code JavaScript lié à la page photographer.html
async function init() {
	const photographerId = getUrlId();
	const photographerData = await getPhotographer(photographerId);

	displayPhotographerItems(photographerData);
	displayPhotographerMedias(photographerId);
	displayTotalLikes(photographerId);

	let selectedFilter = document.getElementById("selected-filter");
	const titleFilter = document.getElementById("title-filter");
	const dateFilter = document.getElementById("date-filter");
	const popularityFilter = document.getElementById("popularity-filter");

	// listen to click event on filters
	popularityFilter.addEventListener("click", () =>
		displayPhotographerMedias(photographerId, "popularity")
	);
	popularityFilter.addEventListener("click", popularityIsSelected);

	dateFilter.addEventListener("click", () =>
		displayPhotographerMedias(photographerId, "date")
	);
	dateFilter.addEventListener("click", dateIsSelected);

	titleFilter.addEventListener("click", () => {
		displayPhotographerMedias(photographerId, "title");
		titleIsSelected();
	});

	const dropDownBtn = document.getElementById("drop-down-btn");
	const dropDownMenu = document.querySelector(".filters");
	let dropDownClicked = false;

	function dropDown() {
		if (!dropDownClicked) {
			dropDownClicked = true;
			dropDownMenu.style.opacity = "1";
			dropDownBtn.style.transform = "rotateX(180deg)";
			dropDownBtn.style.top = "27px";
		} else if (dropDownClicked) {
			dropDownClicked = false;
			dropDownMenu.style.opacity = "0";
			dropDownBtn.style.transform = "rotateX(0deg)";
			dropDownBtn.style.top = "25px";
		}
	}
	dropDownBtn.addEventListener("click", dropDown);

	selectedFilter.textContent = popularityFilter.textContent;
	popularityFilter.style.display = "none";

	separate = document.querySelector(".separate");

	function popularityIsSelected() {
		selectedFilter.textContent = popularityFilter.textContent;
		popularityFilter.style.display = "none";
		dateFilter.style.display = "block";
		titleFilter.style.display = "block";
		dropDownMenu.style.opacity = "0";
		dropDownClicked = false;
		titleFilter.style.order = "0";
		separate.style.order = "1";
		dateFilter.style.order = " 2";
	}

	function dateIsSelected() {
		selectedFilter.textContent = dateFilter.textContent;
		popularityFilter.style.display = "block";
		titleFilter.style.display = "block";
		dateFilter.style.display = "none";
		dropDownMenu.style.opacity = "0";
		dropDownClicked = false;
		separate.style.order = "1";
		popularityFilter.style.order = "0";
		titleFilter.style.order = "2";
	}

	function titleIsSelected() {
		selectedFilter.textContent = titleFilter.textContent;
		popularityFilter.style.display = "block";
		dateFilter.style.display = "block";
		dateFilter.style.order = " 1";
		titleFilter.style.display = "none";
		dropDownMenu.style.opacity = "0";
		dropDownClicked = false;
		separate.style.order = "0";
	}
}

function displayPhotographerItems(photographerData) {
	const photographer = photographerFactory(photographerData);
	photographer.getPhotographerDOM("photographer-container");
}

// récupère l'id dans l'url
function getUrlId() {
	const searchParams = window.location.search;
	const UrlSearchParams = new URLSearchParams(searchParams);
	const photographerId = UrlSearchParams.get("id");
	return Number(photographerId);
}

async function displayPhotographerMedias(photographerID, sort = "popularity") {
	let mediasData = await getPhotographerMedias(photographerID);

	/* fonction sort sur mediasData */

	if (sort === "popularity") {
		const sortByPopularity = Array.from(mediasData);
		sortByPopularity.sort(function (a, b) {
			return b.likes - a.likes;
		});
		mediasData = sortByPopularity;
	} else if (sort === "date") {
		const sortByDate = Array.from(mediasData);
		sortByDate.sort(function (a, b) {
			dateNew = new Date(a.date);
			return new Date(b.date) - new Date(a.date);
		});
		mediasData = sortByDate;
	} else if (sort === "title") {
		const sortByTitle = Array.from(mediasData);
		sortByTitle.sort(function (a, b) {
			if (a.title < b.title)
				//sort string ascending
				return -1;
			if (a.title > b.title) return 1;
		});
		mediasData = sortByTitle;
	}

	const containerMedias = document.getElementById("photographer-medias");
	containerMedias.innerHTML = "";

	mediasData.forEach((media) => {
		const mediaModel = photographerMediasfactory(media, photographerID);
		const htmlMedia = mediaModel.createhtml();
		containerMedias.appendChild(htmlMedia);
	});

	function displayMediaLightBox() {
		const container = document.getElementById("img-container");

		/* boucle sur tout les médias et ajoute les médias dans le container*/
		mediasData.forEach((media) => {
			const mediaModel = photographerMediasfactory(media, photographerID);
			const htmlMedia = mediaModel.createLightBoxHTML();
			container.appendChild(htmlMedia);
		});
		return container;
	}

	const lightBoxContent = displayMediaLightBox();
	const lightBoxContentContainer =
		document.getElementById("lightbox-content");
	lightBoxContentContainer.appendChild(lightBoxContent);
}

init();
