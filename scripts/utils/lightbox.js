

let selectedImg;

function displayLightbox(id) {

    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "block";

    /* masque les images de la lightbox */
    const mediaLightBox = document.querySelectorAll('.media-lightbox')
    mediaLightBox.forEach((media) => {
        media.style.display = "none"
    })
    /* masque les titre des images de la lightbox */
    const titleLightBox = document.querySelectorAll('.title-lightbox')
    titleLightBox.forEach((title) => {
        title.style.display = "none"
    })

    selectedImg = document.querySelector(`[data-id='${id}']`);
    selectedImg.style.display = "block";

    const lightBoxRight = document.getElementById("right-lightbox-btn")
    lightBoxRight.addEventListener('click', function () {

        const imgContent = document.querySelectorAll('#img-container img, #img-container video');
        selectedImg.style.display = "none";

        if (selectedImg.parentElement.nextSibling === null) {
            selectedImg = imgContent[0];
        } else {
            const nextImg = selectedImg.parentElement.nextSibling.childNodes[0];
            selectedImg = nextImg;
        }
        selectedImg.style.display = "block";
    })

    const lightBoxLeft = document.getElementById("left-lightbox-btn")
    lightBoxLeft.addEventListener('click', function () {

        const imgContent = document.querySelectorAll('#img-container img, #img-container video');
        selectedImg.style.display = "none";

        if (selectedImg.parentElement.previousSibling === null) {
            selectedImg = imgContent[imgContent.length - 1];
        } else {
            const previousImg = selectedImg.parentElement.previousSibling.childNodes[0];
            selectedImg = previousImg;
        }
        selectedImg.style.display = "block";
    })

    // sauvergarder l'id en cours pour afficher le suivant
    // arrivé au dernier média retourner au premier (if undefined retourner au premier)


}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none";
    selectedImg = undefined;

}




