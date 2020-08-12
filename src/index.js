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
// - listen for submit event
// - grab form tag
// - grab comment value from form
// - create li and add value to inner text
// - append li to comment list

const baseUrl = `http://localhost:3000`

document.addEventListener(`DOMContentLoaded`, e => {
    const commentUl = document.querySelector(`.comments`)
    const renderImageData = imageData => {
        const imageContainer = document.querySelector(`.image-container`)
        const title = imageContainer.querySelector(`.title`)
        const image = imageContainer.querySelector(`img`)
        const likes = imageContainer.querySelector(`span`)
        
        imageContainer.dataset.id = imageData.id
        imageContainer.dataset.likes = imageData.likes
        
        title.innerText = imageData.title
        image.src = imageData.image
        likes.innerText = `${imageData.likes} likes`
        if (imageData.comments) imageData.comments.forEach(comment => renderComment(comment))
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
            const likes = parseInt(imageContainer.dataset.likes) + 1

            fetch(baseUrl + `/images/1`, {
                method: `PATCH`,
                headers: {
                    "content-type": `application/json`,
                    accept: `application/json`
                },
                body: JSON.stringify({likes: likes})
            })
            .then(r => r.json())
            .then(imageData => renderImageData(imageData))  
        }
        
    })

    document.addEventListener(`submit`, e => {
        e.preventDefault()
        if (e.target.matches(`.comment-form`)) {
            const form = e.target
            const comment = form.comment.value
            console.log(form.comment.value)
        }
    })
})
