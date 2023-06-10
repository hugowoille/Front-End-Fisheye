

let selectedImg;

function displayLightbox(id) {

    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "block";
    const mediaLightBox = document.querySelectorAll('.media-lightbox')
    mediaLightBox.forEach((media) => {
        media.style.display = "none"
    })
    selectedImg = document.querySelector(`[data-id='${id}']`);
    selectedImg.style.display = "block";


    /* const imgmedia = document.querySelectorAll('.img-media') */


    // au clique de la fleche > affiche le média suivant

    const lightBoxRight = document.getElementById("right-lightbox-btn")
    lightBoxRight.addEventListener('click', function () {
        /* mediaLightBox.nextElementSibling.style.display = "block" */
        console.log("selected img next sibling child", selectedImg.parentElement.nextSibling.childNodes[0])
        console.log("selected img parent first child", selectedImg.parentElement.parentElement.childNodes[6].childNodes[0])

        selectedImg.style.display = "none"
        const nextImg = selectedImg.parentElement.nextSibling.childNodes[0];
        nextImg.style.display = "block";
        selectedImg = selectedImg.parentElement.nextSibling.childNodes[0];

        if (selectedImg.parentElement.nextSibling === null) {
            selectedImg.style.display = "none";
            selectedImg = selectedImg.parentElement.parentElement.childNodes[5].childNodes[0];
        }
        /*  selectedImg = mediaLightBox[0];
         selectedImg.style.display = "none"
         console.log(mediaLightBox[0]) */

    })

    const lightBoxLeft = document.getElementById("left-lightbox-btn")
    lightBoxLeft.addEventListener('click', function () {
        /* mediaLightBox.previousElementSibling.style.display = "block" */


        console.log("selected img previous sibling child", selectedImg.parentElement.previousSibling.childNodes[0])
        console.log("selected img parent first child", selectedImg.parentElement.parentElement.childNodes[6].childNodes[0])

        selectedImg.style.display = "none"
        const previousImg = selectedImg.parentElement.previousSibling.childNodes[0];
        previousImg.style.display = "block";
        selectedImg = selectedImg.parentElement.previousSibling.childNodes[0];

        if (selectedImg.parentElement.previousSibling === undefined) {
            selectedImg.style.display = "none";
            selectedImg = selectedImg.parentElement.parentElement.childNodes[10].childNodes[0];
        }




        /*  selectedImg = mediaLightBox[0];
         selectedImg.style.display = "none"
         console.log(mediaLightBox[0]) */

    })

    // sauvergarder l'id en cours pour afficher le suivant
    // arrivé au dernier média retourner au premier (if undefined retourner au premier)


}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none";
    selectedImg = undefined;

}
/* function SwitchToLeftLightBox() {

} */




