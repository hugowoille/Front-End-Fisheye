

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
        let numberOfLikes = document.createElement("p");
        numberOfLikes.classList.add('likes')
        numberOfLikes.innerHTML = mediaData.likes;
        let heartLike = document.createElement("p");
        heartLike.innerHTML = " ♡ ";
        heartLike.classList.add("heart-like")
        heartLike.style.cursor = "pointer"
        let liked = false;
        function likeClick() {
            if (!liked) {
                numberOfLikes.innerHTML++;
                liked = true;
                heartLike.innerHTML = " ♥ ";

            } else if (liked) {
                numberOfLikes.innerHTML--;
                liked = false;
                heartLike.innerHTML = " ♡ ";

            }
        }

        heartLike.addEventListener('click', likeClick);



        if (mediaData.image) {
            const imgContainer = document.createElement("img");
            imgContainer.setAttribute("src", linkmedias);
            imgContainer.addEventListener('click', function () { displayLightbox(mediaData.id) })
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
        container.appendChild(mediaTextContainer)
        mediaTextContainer.appendChild(titleContainer);
        mediaTextContainer.appendChild(numberOfLikes);
        mediaTextContainer.appendChild(heartLike);

        return container
    }

    function createLightBoxHTML() {
        const container = document.createElement("div");

        if (mediaData.image) {
            const imgContainer = document.createElement("img");
            imgContainer.setAttribute("src", linkmedias);
            imgContainer.setAttribute("data-id", mediaData.id)
            imgContainer.classList.add("img-media");
            imgContainer.classList.add("media-lightbox")
            container.appendChild(imgContainer);
        }
        else if (mediaData.video) {
            const videoContainer = document.createElement("video");
            videoContainer.setAttribute("src", linkvideos);
            videoContainer.setAttribute("controls", linkvideos);
            videoContainer.setAttribute("data-id", mediaData.id)
            videoContainer.classList.add("video-media");
            videoContainer.classList.add("media-lightbox")
            videoContainer.style.cursor = "pointer";
            container.appendChild(videoContainer);
        }
        const titleContainer = document.createElement("h2");
        titleContainer.classList.add("title-media");
        titleContainer.setAttribute("data-id", mediaData.id)
        titleContainer.innerHTML = mediaData.title;
        container.appendChild(titleContainer)

        return container

    }
    return { createhtml: createHTML, imageUrl: linkmedias, videoUrl: linkvideos, createLightBoxHTML }

}

async function displayPhotographerMedias(photographerID, sort = "popularity") {

    let mediasData = await getPhotographerMedias(photographerID)
    /* fonction sort sur mediasData */
    console.log("sort", sort)



    if (sort === "popularity") {
        const sortByPopularity = Array.from(mediasData)
        sortByPopularity.sort(function (a, b) {
            return b.likes - a.likes
        })
        mediasData = sortByPopularity;

    } else if (sort === "date") {
        const sortByDate = Array.from(mediasData)
        sortByDate.sort(function (a, b) {
            dateNew = new Date(a.date)
            console.log("dateNew", dateNew)
            return new Date(b.date) - new Date(a.date)
        })
        mediasData = sortByDate;
    } else if (sort === "title") {
        const sortByTitle = Array.from(mediasData)
        sortByTitle.sort(function (a, b) {
            if (a.title < b.title) //sort string ascending
                return -1;
            if (a.title > b.title)
                return 1;
        })
        mediasData = sortByTitle;

    }

    const containerMedias = document.getElementById("photographer-medias")
    containerMedias.innerHTML = '';


    mediasData.forEach((media) => {
        const mediaModel = photographerMediasfactory(media, photographerID)
        const htmlMedia = mediaModel.createhtml()
        containerMedias.appendChild(htmlMedia)
    });

    function displayMediaLightBox() {
        const container = document.getElementById('img-container')

        /* boucle sur tout les médias et ajoute les médias dans le container*/

        mediasData.forEach((media) => {

            const mediaModel = photographerMediasfactory(media, photographerID)
            const htmlMedia = mediaModel.createLightBoxHTML()
            container.appendChild(htmlMedia)
        });
        return container
    }

    const lightBoxContent = displayMediaLightBox();
    const lightBoxContentContainer = document.getElementById('lightbox-content')
    lightBoxContentContainer.appendChild(lightBoxContent);



}




