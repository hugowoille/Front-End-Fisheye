

async function getPhotographerMedias(photographerId) {
    try {
        const apiReponse = await fetch("./data/photographers.json")
        const { media } = await apiReponse.json()
        let photographerMedias = [];
        for (let element of media) {
            if (element.photographerId === photographerId) {
                photographerMedias.push(element)
            }
        }
        return photographerMedias
    } catch (error) {
        console.log(error)
    }
}


function photographerMediasfactory(mediaData, folderName) {
    const folderPath = `assets/medias/${folderName}/`;
    const linkmedias = folderPath + mediaData.image;
    const linkvideos = folderPath + mediaData.video;

    function createHTML() {
        const container = document.createElement("div");
        container.setAttribute("class", "media-container")
        const mediaTextContainer = document.createElement("div")
        mediaTextContainer.setAttribute("class", "media-text-container")
        const titleContainer = document.createElement("h2");
        titleContainer.innerHTML = mediaData.title;
        const numberOfLikes = document.createElement("p");
        numberOfLikes.innerHTML = mediaData.likes + " ♥ ";

        if (mediaData.image) {
            const imgContainer = document.createElement("img");
            imgContainer.setAttribute("src", linkmedias);
            imgContainer.addEventListener('click', function () { displayLightbox() })
            imgContainer.classList.add("img-media");
            container.appendChild(imgContainer);
        }
        if (mediaData.video) {
            const videoContainer = document.createElement("video");
            videoContainer.setAttribute("src", linkvideos);
            videoContainer.setAttribute("controls", linkvideos);
            videoContainer.classList.add("video-media");
            container.appendChild(videoContainer);
        }
        container.appendChild(mediaTextContainer)
        mediaTextContainer.appendChild(titleContainer);
        mediaTextContainer.appendChild(numberOfLikes)


        /* displayphotographerMediaImg.src = `assets/sample_photos/tracy/${mediaData.image}` */
        return container
    }

    function createLightBoxHTML() {
        const container = document.createElement("div");

    }
    return { createhtml: createHTML, imageUrl: linkmedias, videoUrl: linkvideos, createLightBoxHTML }

}

async function displayPhotographerMedias(photographerID) {

    const mediasData = await getPhotographerMedias(photographerID)
    const containerMedias = document.getElementById("photographer-medias")

    const photographerData = await getPhotographer(photographerID);
    console.log("photographerData = ", photographerData)

    mediasData.forEach((media) => {

        const mediaModel = photographerMediasfactory(media, photographerID)
        const htmlMedia = mediaModel.createhtml()
        containerMedias.appendChild(htmlMedia)

    });
    function displayMediaLightBox() {

        const container = document.createElement("div");
        container.innerHTML = "lightboxcontent"
        /* boucle sur tout les médias et ajouter les médias dans le container*/
        mediasData.forEach((media) => {

            const mediaModel = photographerMediasfactory(media, photographerID);
            const htmlMedia = mediaModel.createLightBoxHTML();
            container.appendChild(htmlMedia);

        });

        return container
    }

    const lightBoxContent = displayMediaLightBox();
    const lightBoxContentContainer = document.getElementById('lightbox-content')
    lightBoxContentContainer.appendChild(lightBoxContent);

}




