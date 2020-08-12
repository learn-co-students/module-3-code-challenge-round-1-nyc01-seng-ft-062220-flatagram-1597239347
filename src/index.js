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
    // const downVote = document.createElement(`button`)
    // const likesSection = imageContainer.querySelector(`.likes-section`)
    const renderImageData = imageData => {
        const imageContainer = document.querySelector(`.image-container`)
        const title = imageContainer.querySelector(`.title`)
        const image = imageContainer.querySelector(`img`)
        const likes = imageContainer.querySelector(`span`)
        const likesSection = imageContainer.querySelector(`.likes-section`)

        if (!imageContainer.querySelector(`#down-vote`)) {
            const downVote = document.createElement(`button`)

            downVote.id = `down-vote`
            downVote.innerText = `down vote`
            likesSection.append(downVote)
        }
        
        imageContainer.dataset.id = imageData.id
        imageContainer.dataset.likes = imageData.likes
        
        title.innerText = imageData.title
        image.src = imageData.image
        likes.innerText = `${imageData.likes} likes`
        console.log(imageData.comments)
        if (imageData.comments) imageData.comments.forEach(comment => renderComment(comment.content))
    }
    const renderComment = comment => {
        const commentUl = document.querySelector(`.comments`)
        const commentLi = document.createElement(`li`)
        
        commentLi.innerText = comment
        commentUl.append(commentLi)
    }

    // downVote.id = `down-vote`
    // downVote.innerText = `down vote`
    // likesSection.append(downVote)
    
    commentUl.innerHTML = ``

    fetch(baseUrl + `/images/1`)
    .then(r => r.json())
    .then(imageData => renderImageData(imageData))

    document.addEventListener(`click`, e => {
        if (e.target.matches(`.like-button`)) {
            const imageContainer = e.target.parentNode.parentNode.parentNode
            const id = imageContainer.dataset.id
            const likes = parseInt(imageContainer.dataset.likes) + 1

            fetch(baseUrl + `/images/${id}`, {
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

        if (e.target.matches(`#down-vote`)) {
            const imageContainer = e.target.parentNode.parentNode.parentNode
            const id = imageContainer.dataset.id
            const likes = parseInt(imageContainer.dataset.likes) - 1

            fetch(baseUrl + `/images/${id}`, {
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
            const imageId = parseInt(form.parentNode.parentNode.dataset.id)

            fetch(baseUrl + `/comments`, {
                method: `POST`,
                headers: {
                    "content-type": `application/json`,
                    accept: `application/json`
                },
                body: JSON.stringify({
                    imageId: imageId,
                    content: comment
                })
            })
            .then(r => r.json())
            .then(commentObject => {
                renderComment(commentObject.content)
                form.reset()
            }) 
        }
    })
})
