// See the image received from the server, including its title, likes and comments when the page loads
// -event DOMloaded
// -fetch image
// -render image
//      -grab tags
//      -bind data to tags  
// Click on the heart icon to increase image likes, and still see them when I reload the page
// - add eventlistener for click matching heart
// - on click send fetch post request to id and update likes
// - then rerender likes
// Add a comment (no persistance needed)

const baseUrl = `http://localhost:3000`

document.addEventListener(`DOMContentLoaded`, e => {
    const commentUl = document.querySelector(`.comments`)
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
        
    }
    const renderComment = comment => {
        const commentUl = document.querySelector(`.comments`)
        const commentLi = document.createElement(`li`)
        commentLi.innerText = comment.content
        commentUl.append(commentLi)
        
    }
    
    commentUl.innerHTML = ``

    fetch(baseUrl + `/images/1`)
    .then(r => r.json())
    .then(imageData => renderImageData(imageData))

    document.addEventListener(`click`, e => {
        if (e.target.matches(`.like-button`)) {
            const imageContainer = e.target.parentNode.parentNode.parentNode
            const id = imageContainer.dataset.id
            const likes = 0

            // fetch(baseUrl + `/images/1`, {
            //     method: `POST`,
            //     headers: {

            //     },
            //     body: JSON.stringify({likes: likes})
            // })
            console.log(id)
        }
        
    })
})
