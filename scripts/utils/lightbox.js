

let selectedImg;
let rightClickListener;
let lightBoxRight;
let leftClickListener;
let lightBoxLeft;

function displayLightbox(id) {

    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "block";

    /* masque les images de la lightbox */

    const mediaLightBox = document.querySelectorAll('.media-lightbox')
    mediaLightBox.forEach((media) => {
        media.style.display = "none"
    })

    /* masque les titres des images de la lightbox */

    const titleLightBox = document.querySelectorAll('.title-media')
    titleLightBox.forEach((title) => {
        title.style.display = "none"
    })

    selectedImg = document.querySelector(`[data-id='${id}'].img-media`);
    selectedImg.style.display = "block";

    selectedTitle = document.querySelector(`[data-id='${id}'].title-media`);
    selectedTitle.style.display = "block";

    // right button

    lightBoxRight = document.getElementById("right-lightbox-btn")
    rightClickListener = function () {

        const imgContent = document.querySelectorAll('#img-container img, #img-container video');
        const titleContent = document.querySelectorAll('.title-media');


        selectedImg.style.display = "none";
        selectedTitle.style.display = "none";


        console.group()
        console.log("id", id, "selected img", selectedImg);

        if (selectedImg.parentElement.nextSibling === null) {
            selectedImg = imgContent[0];
            selectedTitle = titleContent[0];
            console.log("end of list")

        } else {
            const nextImg = selectedImg.parentElement.nextSibling.childNodes[0];
            const nextTitle = selectedImg.parentElement.nextSibling.childNodes[1];
            console.log("parent element", selectedImg.parentElement, "next sibling", selectedImg.parentElement.nextSibling)
            selectedTitle = nextTitle;
            selectedImg = nextImg;
        }
        selectedImg.style.display = "block";
        selectedTitle.style.display = "block";
    }
    lightBoxRight.addEventListener('click', rightClickListener)

    // left button

    lightBoxLeft = document.getElementById("left-lightbox-btn")
    leftClickListener = function () {

        const imgContent = document.querySelectorAll('#img-container img, #img-container video');
        const titleContent = document.querySelectorAll('.title-media');
        selectedImg.style.display = "none";
        selectedTitle.style.display = "none";

        if (selectedImg.parentElement.previousSibling === null || selectedTitle === undefined) {
            selectedImg = imgContent[imgContent.length - 1];
            selectedTitle = titleContent[titleContent.length - 1];

        } else {
            const previousImg = selectedImg.parentElement.previousSibling.childNodes[0];
            const previousTitle = selectedTitle.parentElement.previousSibling.childNodes[1];

            selectedImg = previousImg;
            selectedTitle = previousTitle;
        }
        selectedImg.style.display = "block";
        selectedTitle.style.display = "block";
    }

    lightBoxLeft.addEventListener('click', leftClickListener)

}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none";
    selectedImg = undefined;
    lightBoxRight.removeEventListener('click', rightClickListener)
    lightBoxLeft.removeEventListener('click', leftClickListener)

}




