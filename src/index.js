// write your code here
const imageURL = 'http://localhost:3000/images/1'
const commentURL = 'http://localhost:3000/comments/1'
document.addEventListener("DOMContentLoaded", () => {
    
    fetch(imageURL)
    .then(response => response.json())
    .then(image => renderImage(image))

    fetch(commentURL)
    .then(response => response.json())
    .then(comments => renderPost(comments))
    

    //fetch the comments and images they're on seperate URLs and render them to the post 

    const renderPost = (comments) => { 

            const commentUl = document.getElementsByClassName('comments')
            const commentLi = document.createElement('li')
            commentLi.innerText = comments.content
            // commentLi.innerText = comments.content
    }

    const renderImage = (image) => {
        const imagePost = document.getElementsByClassName("image")
        const title = document.querySelector("body > div > div > h2")
        const likes = document.querySelector("body > div > div > div > span")
        imagePost.innerHTML = `
        <img src=${image.image} class="image" />
        `

        title.innerText = image.title
        likes.innerText = image.likes
    }









    
   
    //     As a user, I can:
// See the image received from the server, including its title, likes and comments when the page loads
// Click on the heart icon to increase image likes, and still see them when I reload the page
// Add a comment (no persistance needed)
})