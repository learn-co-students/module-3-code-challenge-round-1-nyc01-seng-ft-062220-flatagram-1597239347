// Fun Challenge, I have one error in the DB, didn't parseINT the imageId for one comment :)

document.addEventListener("DOMContentLoaded", function(e) {

    //global variables
    const GET_URL = "http://localhost:3000/images/"
    const COMMENT_URL = "http://localhost:3000/comments/"
    const IMAGE = 1


    //Clear data and get Image from db.json
    function getImage() {
        const imageBlock = document.querySelector(".image-card")
        imageBlock.innerHTML = ""
        fetch(GET_URL + IMAGE)
        .then(res => res.json())
        .then(image => renderImage(image, imageBlock))
    }

    //Render Image on the page
    function renderImage(image, imageBlock) {
        
        imageBlock.dataset.id = image.id
        

        imageBlock.innerHTML = `
        <h2 class="title">${image.title}</h2>
        <img src="${image.image}" class="image" />
        <div class="likes-section">
          <span class="likes">${image.likes} likes</span>
          <button class="like-button">♥</button>
          <button class="downvote-button">&#8595;</button>
        </div>
        <ul class="comments">
        </ul>
        <form class="comment-form">
          <input
            class="comment-input"
            type="text"
            name="comment"
            placeholder="Add a comment..."
          />
          <button class="comment-button" type="submit">Post</button>
        </form>
        `

        const ul = document.querySelector("ul")
        image.comments.forEach(comment => {
            const li = document.createElement("li")
            const del = document.create
            li.dataset.id = comment.id
            li.textContent = `${comment.content}`

            ul.append(li)
        })
    }


    //Click Handler
    function clickHandler() {
        document.addEventListener("click", function(event) {

            //This options adds likes --see line 108
            if (event.target.matches(".like-button")) {
                const likeButton = event.target
                const imageCard = likeButton.closest("div").parentElement
                
                patchLikes(imageCard)

            //This options add comments --see line 163   
            } else if (event.target.matches(".comment-button")) {
                event.preventDefault()
                let commentButton = event.target
                let form = event.target.closest("form")
                

                addComment(form)

            //This option renders or removes delete button --see line 188   
            } else if (event.target.matches("li")) {
                const comment = event.target
                
                if (comment.childNodes.length > 1) {
                    let del = comment.querySelector("button")
                    del.remove()
                } else {
                    renderDelete(comment)
                }
             
            //This option deletes comments --see line 198   
            } else if (event.target.innerText === "Delete?") {
                const del = event.target
                const comment = del.parentElement
               
                deleteComment(comment)

            //This options allows you to downvote --see line 136    
            } else if (event.target.matches(".downvote-button")) {
                const downVote = event.target
                const imageCard = downVote.closest("div").parentElement

                patchDownVote(imageCard)
            }
        })
    }


    //Function to increase likes
    function patchLikes(imageCard) {
        let likeSpan = imageCard.querySelector("span").textContent

        let arr = likeSpan.split(" ")
        let likes = parseInt(arr[0])
        likes += 1
        arr[0] = likes
        let newLikes = arr.join(" ")

        const options = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
               likes: likes 
            })
        }

        fetch(GET_URL + IMAGE, options)
        .then(res => {
            getImage()
        })  
    }


    //Function to downvote
    function patchDownVote(imageCard) {
        let likeSpan = imageCard.querySelector("span").textContent

        let arr = likeSpan.split(" ")
        let likes = parseInt(arr[0])
        likes -= 1
        

        const options = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
               likes: likes 
            })
        }

        fetch(GET_URL + IMAGE, options)
        .then(res => {
            getImage()
        })  
    }


    //Function to add comment
    function addComment(form) {
        const newComment = form.querySelector("input").value
        const postId = form.parentElement.dataset.id
        
        const options = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                imageId: parseInt(postId),
                content: newComment
            })
        }
        
        fetch(COMMENT_URL, options)
        .then(res => {
            form.reset()
            getImage()
        })

    }


    //function to render delete button
    function renderDelete(comment) {
        const del = document.createElement("button")
        del.innerText = "Delete?"
        comment.append(del)
    }


    //function to delete comments
    function deleteComment(comment) {
        const commentId = comment.dataset.id
        
        const options = {
            method: "DELETE"
        }

        fetch(COMMENT_URL + commentId, options)
        .then(res => {
            getImage()
        })
    }











    //Invoked functions
    clickHandler()
    getImage()
})