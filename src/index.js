// write your code here
// As a user, I can:

// See the image received from the server, including its title, likes and comments when the page loads
// Click on the heart icon to increase image likes, and still see them when I reload the page
// Add a comment (no persistance needed)

document.addEventListener("DOMContentLoaded", function(e) {
    const postURL = "http://localhost:3000/images"
    // const postContainer = document.querySelector(".image-card")

    const fetchPost = () => {
        fetch(postURL)
        .then(response => response.json())
        .then(post => renderPost(post))
    }

    function renderPost(post) {
        const title = document.querySelector(".title")
        console.log(postTitle)
        const image = document.querySelector(".img")
        const likes = document.querySelector(".likes")
        const comments = document.querySelector(".comments")
        title.textContent = post.title
        image.src = post.image 
        likes.textContent = post.likes + ' likes'
        postComments.innerHTML = ''

    }

    fetchPost()
})