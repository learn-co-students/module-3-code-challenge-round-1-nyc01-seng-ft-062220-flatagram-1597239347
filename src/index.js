// write your code here

document.addEventListener("DOMContentLoaded", function(e) {

    //global variables
    const GET_URL = "http://localhost:3000/images/"
    const IMAGE = 1

    function getImage() {
        const imageBlock = document.querySelector(".image-card")
        imageBlock.innerHTML = ""
        fetch(GET_URL + IMAGE)
        .then(res => res.json())
        .then(image => renderImage(image, imageBlock))
    }



    function renderImage(image, imageBlock) {
        
        imageBlock.dataset.id = image.id
        

        imageBlock.innerHTML = `
        <h2 class="title">${image.title}</h2>
        <img src="${image.image}" class="image" />
        <div class="likes-section">
          <span class="likes">${image.likes} likes</span>
          <button class="like-button">♥</button>
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
            li.dataset.id = comment.id
            li.textContent = `${comment.content}`

            ul.append(li)
        })
    }


    function clickHandler() {
        document.addEventListener("click", function(event) {
            if (event.target.matches(".like-button")) {
                const likeButton = event.target
                const imageCard = likeButton.closest("div").parentElement
                
                patchLikes(imageCard)
            }
        })
    }


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
        

    }

















    clickHandler()
    getImage()
})