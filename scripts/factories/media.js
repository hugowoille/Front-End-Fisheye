

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


function photographerMediasfactory(mediaData) {
    const linkmedias = `assets/sample_photos/tracy/`
    function createHTML() {
        const container = document.createElement("div");
        const titleContainer = document.createElement("h2");
        titleContainer.innerHTML = mediaData.title;


        container.appendChild(titleContainer);
        /* displayphotographerMediaImg.src = `assets/sample_photos/tracy/${mediaData.image}` */
        return container
    }
    return { createhtml: createHTML, imageUrl: linkmedias }
}

async function displayPhotographerMedias(photographerID) {

    const mediasData = await getPhotographerMedias(photographerID)
    const containerMedias = document.getElementById("photographer-medias")

    mediasData.forEach((media) => {
        const mediaModel = photographerMediasfactory(media)
        const htmlMedia = mediaModel.createhtml()
        containerMedias.appendChild(htmlMedia)
    });

}






/* 
function mediaFactory(data) {
    const { media } = data
    console.log(media)
}
 */