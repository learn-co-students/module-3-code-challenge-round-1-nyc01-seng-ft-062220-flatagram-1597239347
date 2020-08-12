const baseUrl = `http://localhost:3000`

document.addEventListener(`DOMContentLoaded`, e => {
    const renderComment = comment => {
        
    }
    const renderImageData = imageData => {
        const imageContainer = document.querySelector(`.image-container`)
        const title = imageContainer.querySelector(`.title`)
        const image = imageContainer.querySelector(`img`)
        const likes = imageContainer.querySelector(`span`)

        imageContainer.dataset.id = imageData.id
        title.innerText = imageData.title
        image.src = imageData.image
        likes.innerText = `${imageData.likes} likes`
        imageData.comments.forEach(comment => renderComment(comment))
        console.log(imageData.comments)
    }

    fetch(baseUrl + `/images/1`)
    .then(r => r.json())
    .then(imageData => renderImageData(imageData))
})
