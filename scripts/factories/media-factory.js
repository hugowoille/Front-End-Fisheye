// eslint-disable-next-line no-unused-vars
function photographerMediasfactory(mediaData, folderName) {
	const folderPath = `assets/medias/${folderName}/`;
	const linkmedias = folderPath + mediaData.image;
	const linkvideos = folderPath + mediaData.video;

	function createHTML() {
		const container = document.createElement("div");
		container.setAttribute("class", "media-container");
		const mediaTextContainer = document.createElement("div");
		mediaTextContainer.setAttribute("class", "media-text-container");
		const titleContainer = document.createElement("h2");
		titleContainer.innerHTML = mediaData.title;
		let numberOfLikes = document.createElement("p");
		numberOfLikes.classList.add("likes");
		numberOfLikes.innerHTML = mediaData.likes;
		let heartLike = document.createElement("img");
		heartLike.src = "../../assets/icons/heart-regular.svg";
		heartLike.classList.add("heart-like");
		heartLike.style.cursor = "pointer";
		heartLike.setAttribute("alt", "ajoute un like");
		let liked = false;
		function likeClick() {
			if (!liked) {
				numberOfLikes.innerHTML++;
				liked = true;
				heartLike.src = "../../assets/icons/heart-solid.svg";
			} else if (liked) {
				numberOfLikes.innerHTML--;
				liked = false;
				heartLike.src = "../../assets/icons/heart-regular.svg";
			}
		}

		heartLike.addEventListener("click", likeClick);

		if (mediaData.image) {
			const imgContainer = document.createElement("img");
			imgContainer.setAttribute("src", linkmedias);
			imgContainer.setAttribute("alt", mediaData.image);
			imgContainer.addEventListener("click", function () {
				// eslint-disable-next-line no-undef
				displayLightbox(mediaData.id);
			});
			imgContainer.classList.add("img-media");
			imgContainer.style.cursor = "pointer";
			container.appendChild(imgContainer);
		}
		if (mediaData.video) {
			const videoContainer = document.createElement("video");
			videoContainer.setAttribute("src", linkvideos);
			videoContainer.setAttribute("controls", linkvideos);
			videoContainer.classList.add("video-media");
			videoContainer.style.cursor = "pointer";
			container.appendChild(videoContainer);
		}
		container.appendChild(mediaTextContainer);
		mediaTextContainer.appendChild(titleContainer);
		mediaTextContainer.appendChild(numberOfLikes);
		mediaTextContainer.appendChild(heartLike);

		return container;
	}

	function createLightBoxHTML() {
		const container = document.createElement("div");
		if (mediaData.image) {
			const imgContainer = document.createElement("img");
			imgContainer.setAttribute("src", linkmedias);
			imgContainer.setAttribute("data-id", mediaData.id);
			imgContainer.classList.add("img-media");
			imgContainer.classList.add("media-lightbox");
			container.appendChild(imgContainer);
		} else if (mediaData.video) {
			const videoContainer = document.createElement("video");
			videoContainer.setAttribute("src", linkvideos);
			videoContainer.setAttribute("controls", linkvideos);
			videoContainer.setAttribute("data-id", mediaData.id);
			videoContainer.classList.add("video-media");
			videoContainer.classList.add("media-lightbox");
			videoContainer.style.cursor = "pointer";
			container.appendChild(videoContainer);
		}
		const titleContainer = document.createElement("h2");
		titleContainer.classList.add("title-media");
		titleContainer.setAttribute("data-id", mediaData.id);
		titleContainer.innerHTML = mediaData.title;
		container.appendChild(titleContainer);

		return container;
	}
	return {
		createhtml: createHTML,
		imageUrl: linkmedias,
		videoUrl: linkvideos,
		createLightBoxHTML,
	};
}
