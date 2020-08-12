// write your code here
const base = "http://localhost:3000"
const commentURL = "http://localhost:3000/comments"
const imagesURL = "http://localhost:3000/images/1"

document.addEventListener("DOMContentLoaded", () => {
    const imageCard = document.querySelector('.image-card')
    const commentForm = document.querySelector('.comment-form')
    const commentContainer = document.querySelector('.comments')

    //render 
    const getImage = () => {
        fetch(imagesURL)
        .then(resp => resp.json())
        .then(image => renderImage(image))
    }
    
    function renderImage(image){
        imageCard.dataset.id = image.id

        const title = document.querySelector('.title')
        title.innerHTML = image.title

        const pic = document.querySelector('.image')
        pic.src = image.image

        const likes = document.querySelector('.likes')
        likes.innerHTML = image.likes
        
        const comments = image.comments 

        commentForm.dataset.id = image.id
        commentContainer.innerHTML = ""
        for(const comment of comments){
            let commentLi = document.createElement('li')
            commentLi.dataset.id = comment.id 
            commentLi.innerHTML = comment.content
            let deleteBtn = document.createElement('button')
            deleteBtn.innerHTML = "delete"
            commentLi.append(deleteBtn)
            commentContainer.append(commentLi)
        }  

        const likeBtn = document.querySelector('.like-button')
        likeBtn.dataset.id = image.id
    }
    
    const likeHandler = () => {
        document.addEventListener('click', e => {
            if(e.target.matches('.like-button')){
                let likeBtn = e.target
                const likes = likeBtn.previousElementSibling
                likes.innerHTML = parseInt(likes.innerHTML) + 1
                let newLikes = likes.innerHTML            
            
                fetch(imagesURL, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json',
                        accepts: 'application/json'
                    },
                    body:JSON.stringify({likes: newLikes})
                })
                .then(resp => resp.json())
                .then(data => console.log(data))
            }
        })
    }

    const formHandler = () => {
        commentForm.addEventListener('submit', e => {
                e.preventDefault()
                let input = commentForm.querySelector('.comment-input')
                
                    fetch(commentURL, {
                        method: 'POST', 
                        headers: {
                            "content-type": "application/json", 
                            "accepts": "application/json"
                        },
                        body: JSON.stringify({
                            imageId: 1,
                            content: input.value
                        })
                    })
                    .then(resp => resp.json())
                    .then(data => {
                        getImage(data)
                        input.value = ""
                    })
        })
    }

    const deleteHandler = () => {
        commentContainer.addEventListener('click', e => {
            if(e.target.innerHTML === "delete") {
                let deleteBtn = e.target 
                let comment = deleteBtn.parentElement
                let id = comment.dataset.id

                fetch(commentURL`/${id}`, {
                    method: "Delete"
                }).then(resp => resp.json())
                .then(data => {
                    getImage(data)
                })
                
            }
        })
    }
    
    deleteHandler()
    formHandler()
    likeHandler()
    getImage()
    
})


/* 

 Downvote an image
- Still see the comments written after reloading the page
  > For this one, you want to make a POST request to the `/comments` endpoint.
  > Your comment object must have an `imageId` key with a value of `1` for it to work.
- Delete a comment
  > To persist this, you will have to make a DELETE request to the `/comments/:id` endpoint.

√1. See the image received from the server, including its title, likes and comments when the page loads

√2. Click on the heart icon to increase image likes, and still see them when I reload the page


√3. Add a comment (no persistance needed)

*/


// - GET `/images/1`
// - PATCH `/images/1`
// - POST `/comments`
// - DELETE `/comments/:id`

