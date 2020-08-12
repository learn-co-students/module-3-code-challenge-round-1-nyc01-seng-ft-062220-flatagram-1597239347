// write your code here
// As a user, I can:

// See the image received from the server, including its title, likes and comments when the page loads
// Click on the heart icon to increase image likes, and still see them when I reload the page
// Add a comment (no persistance needed)

document.addEventListener("DOMContentLoaded", function(e) {
    const postURL = "http://localhost:3000/images/1"
    // const postContainer = document.querySelector(".image-card")

    const fetchImage = () => {
        fetch(postURL)
        .then(response => response.json())
        .then(imageObj => renderImage(imageObj))
    }

    const renderImage = (imageObj) => {
            const title = document.querySelector(".title")
            const image = document.querySelector(".image")
            const likes = document.querySelector(".likes")
            const comments = document.querySelector(".comments")
            title.textContent = imageObj.title
            image.src = imageObj.image
            likes.textContent = imageObj.likes + ' Likes'
            comments.innerHTML = ''
            //console.log(imageObj.comments[1])
            for (let i = 0; i < imageObj.comments.length; i++) {
                const element = imageObj.comments[i];
                const li = document.createElement('li')
                li.textContent = element.content
                comments.append(li)  
            }
        }

        const clickHandler = () => {

        }

    clickHandler()
    fetchImage()
})