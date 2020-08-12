// write your code here
const imageURL = 'http://localhost:3000/images'
const commentURL = 'http://localhost:3000/comments'
document.addEventListener("DOMContentLoaded", () => {
    
    fetch(imageURL)
    .then(response => response.json())
    .then(image => {
            image.forEach(image => renderPost(image))
            console.log(image)
        })

    fetch(commentURL)
    .then(response => response.json())
    .then(comments => {
        comments.forEach(renderPost)
    })

    //fetch the comments and images they're on seperate URLs and render them to the post 

    const renderPost = (image, comments) => {
        image.forEach(imageArray => )
       const imagePost = document.getElementsByClassName("image").src
       const title = document.querySelector("body > div > div > h2")
       const likes = document.querySelector("body > div > div > div > span")
       const commentUl = document.getElementById('comments')
       const commentLi = document.createElement('li')
       commentLi.innerText = comments.content
       imagePost.src = images.image
       console.log(image)



    }









    
   
   
    //     As a user, I can:
// See the image received from the server, including its title, likes and comments when the page loads
// Click on the heart icon to increase image likes, and still see them when I reload the page
// Add a comment (no persistance needed)
})