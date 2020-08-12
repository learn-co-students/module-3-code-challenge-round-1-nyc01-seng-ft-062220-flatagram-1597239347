// write your code here

BASE_URL = "http://localhost:3000/images/1"

document.addEventListener("DOMContentLoaded", () => {

    const getPost = () => {
        fetch(BASE_URL)
        .then(response => response.json())
        .then(post1 => renderPost(post1))
    }

    const returnPost = (post) => {
        return post
    }

    const renderPost = (post) => {
        document.querySelector("div.image-card").dataset.postId = post.id
        document.querySelector("h2.title").innerText = post.title
        document.querySelector("img.image").src = post.image
        document.querySelector("span.likes").innerText = post.likes
        document.querySelector("span.likes").dataset.likeCount = post.likes
        for (let i = 0; i < post.comments.length; i++) {
            document.querySelectorAll("ul.comments > li")[i].innerText = post.comments[i].content
        }
    }

    const renderLike = (likeSpan) => {

        likeSpan.dataset.likeCount++

        configObj = {
            method: "PATCH", 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({a: 1, b: 2})
        }
    }

    const clickHandler = () => {
        document.addEventListener("click", (e) => {
            button = e.target
            if(button.matches("button.like-button")) {
                renderLike(button.parentNode.querySelector("span.likes"))
            }
        })
    }

    // const newPost = returnPost(getPost())
    getPost()
    clickHandler()
})