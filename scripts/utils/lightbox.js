/* eslint-disable indent */
let selectedImg;
let selectedVideo;
let rightClickListener;
let lightBoxRight;
let leftClickListener;
let lightBoxLeft;

// eslint-disable-next-line no-unused-vars
function displayLightbox(id) {
	console.log(id);
	const lightbox = document.getElementById("lightbox");
	lightbox.style.display = "block";

	// hides images from lightbox
	const mediaLightBox = document.querySelectorAll(".media-lightbox");
	mediaLightBox.forEach((media) => {
		media.style.display = "none";
	});

	// hide title of images from lightbox
	const titleLightBox = document.querySelectorAll(".title-media");
	titleLightBox.forEach((title) => {
		title.style.display = "none";
	});

	selectedImg = document.querySelector(`[data-id='${id}'].img-media`);
	console.log("selectedImg:", selectedImg);
	selectedImg.style.display = "block";
	let selectedTitle = document.querySelector(`[data-id='${id}'].title-media`);
	selectedTitle.style.display = "block";

	// lightbox right button
	lightBoxRight = document.getElementById("right-lightbox-btn");
	rightClickListener = function () {
		const imgContent = document.querySelectorAll(
			"#img-container img, #img-container video"
		);
		const titleContent = document.querySelectorAll(".title-media");

		selectedImg.style.display = "none";
		selectedTitle.style.display = "none";

		if (selectedImg.parentElement.nextSibling === null) {
			selectedImg = imgContent[0];
			selectedTitle = titleContent[0];
		} else {
			const nextImg = selectedImg.parentElement.nextSibling.childNodes[0];
			const nextTitle =
				selectedImg.parentElement.nextSibling.childNodes[1];

			selectedTitle = nextTitle;
			selectedImg = nextImg;
		}
		selectedImg.style.display = "block";
		selectedTitle.style.display = "block";
	};
	lightBoxRight.addEventListener("click", rightClickListener);

	// lighbox left button
	lightBoxLeft = document.getElementById("left-lightbox-btn");
	leftClickListener = function () {
		const imgContent = document.querySelectorAll(
			"#img-container img, #img-container video"
		);
		const titleContent = document.querySelectorAll(".title-media");
		selectedImg.style.display = "none";
		selectedTitle.style.display = "none";

		if (
			selectedImg.parentElement.previousSibling === null ||
			selectedTitle === undefined
		) {
			selectedImg = imgContent[imgContent.length - 1];
			selectedTitle = titleContent[titleContent.length - 1];
		} else {
			const previousImg =
				selectedImg.parentElement.previousSibling.childNodes[0];
			const previousTitle =
				selectedTitle.parentElement.previousSibling.childNodes[1];

			selectedImg = previousImg;
			selectedTitle = previousTitle;
		}
		selectedImg.style.display = "block";
		selectedTitle.style.display = "block";
	};

	lightBoxLeft.addEventListener("click", leftClickListener);
}

// eslint-disable-next-line no-unused-vars
function displayLightboxVideo(id) {
	const lightbox = document.getElementById("lightbox");
	lightbox.style.display = "block";

	// hides images from lightbox
	const mediaLightBox = document.querySelectorAll(".media-lightbox");
	mediaLightBox.forEach((media) => {
		media.style.display = "none";
	});

	// hide title of images from lightbox
	const titleLightBox = document.querySelectorAll(".title-media");
	titleLightBox.forEach((title) => {
		title.style.display = "none";
	});

	selectedVideo = document.querySelector(`[data-id='${id}'].video-media`);

	selectedVideo.style.display = "block";

	let selectedTitle = document.querySelector(`[data-id='${id}'].title-media`);
	selectedTitle.style.display = "block";

	// lightbox right button
	lightBoxRight = document.getElementById("right-lightbox-btn");
	rightClickListener = function () {
		const imgContent = document.querySelectorAll(
			"#img-container img, #img-container video"
		);
		const titleContent = document.querySelectorAll(".title-media");

		selectedVideo.style.display = "none";
		selectedTitle.style.display = "none";

		if (selectedVideo.parentElement.nextSibling === null) {
			selectedVideo = imgContent[0];
			selectedTitle = titleContent[0];
		} else {
			const nextImg =
				selectedVideo.parentElement.nextSibling.childNodes[0];
			const nextTitle =
				selectedVideo.parentElement.nextSibling.childNodes[1];

			selectedTitle = nextTitle;
			selectedVideo = nextImg;
		}
		selectedVideo.style.display = "block";
		selectedTitle.style.display = "block";
	};
	lightBoxRight.addEventListener("click", rightClickListener);

	// lighbox left button
	lightBoxLeft = document.getElementById("left-lightbox-btn");
	leftClickListener = function () {
		const imgContent = document.querySelectorAll(
			"#img-container img, #img-container video"
		);
		const titleContent = document.querySelectorAll(".title-media");
		selectedVideo.style.display = "none";
		selectedTitle.style.display = "none";

		if (
			selectedVideo.parentElement.previousSibling === null ||
			selectedTitle === undefined
		) {
			selectedVideo = imgContent[imgContent.length - 1];
			selectedTitle = titleContent[titleContent.length - 1];
		} else {
			const previousImg =
				selectedVideo.parentElement.previousSibling.childNodes[0];
			const previousTitle =
				selectedTitle.parentElement.previousSibling.childNodes[1];

			selectedVideo = previousImg;
			selectedTitle = previousTitle;
		}
		selectedVideo.style.display = "block";
		selectedTitle.style.display = "block";
	};

	lightBoxLeft.addEventListener("click", leftClickListener);
}

function closeLightbox() {
	const lightbox = document.getElementById("lightbox");
	lightbox.style.display = "none";
	selectedImg = undefined;
	lightBoxRight.removeEventListener("click", rightClickListener);
	lightBoxLeft.removeEventListener("click", leftClickListener);
}

// using keyboard arrow to navigate in lightbox
document.addEventListener("keydown", (event) => {
	const lightbox = document.getElementById("lightbox");

	if (lightbox.style.display !== "block") {
		return;
	}
	switch (event.code) {
		case "ArrowRight": {
			rightClickListener();
			break;
		}
		case "ArrowLeft": {
			leftClickListener();
			break;
		}
		case "Escape": {
			closeLightbox();
			break;
		}
		default:
			break;
	}
});
