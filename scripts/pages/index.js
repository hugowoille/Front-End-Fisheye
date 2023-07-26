async function getPhotographers() {
	try {
		const apiReponse = await fetch("./data/photographers.json");
		const data = await apiReponse.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

async function displayData(photographers) {
	const photographersSection = document.querySelector(
		".photographer_section-index"
	);

	photographers.forEach((photographer) => {
		// eslint-disable-next-line no-undef
		const photographerModel = photographerFactory(photographer);
		const userCardDOM = photographerModel.getUserCardDOM();
		photographersSection.appendChild(userCardDOM);
	});
}

async function init() {
	// Récupère les datas des photographes
	const { photographers } = await getPhotographers();
	displayData(photographers);
}

init();
