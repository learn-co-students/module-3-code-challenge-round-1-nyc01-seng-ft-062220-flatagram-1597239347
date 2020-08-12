// write your code here

BASE_URL = "http://localhost:3000/images/1"
COMMENT_URL = "http://localhost:3000/comments"

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
        document.querySelector("span.likes").innerText = `${post.likes} likes`
        document.querySelector("span.likes").dataset.likeCount = post.likes
        document.querySelectorAll("ul.comments > li").forEach(li => li.remove())
        for (let i = 0; i < post.comments.length; i++) {
            const newLi = document.createElement("li")
            newLi.innerText = post.comments[i].content
            document.querySelector("ul.comments").append(newLi)
        }
    }

    const renderLike = (likeSpan) => {

        currentLikeCount = parseInt(likeSpan.dataset.likeCount, 10)
        currentLikeCount++
        likeSpan.dataset.likeCount = currentLikeCount
        likeSpan.innerText = `${currentLikeCount} likes`

        configObj = {
            method: "PATCH", 
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({likes: currentLikeCount})
        }

        fetch(BASE_URL, configObj)
    }

    const renderComment = (commentForm) => {
        const newLi = document.createElement("li")
        newLi.innerText = commentForm.querySelector("input.comment-input").value
        document.querySelector("ul.comments").append(newLi)

        commentObj = {
            "id": document.querySelectorAll("ul.comments > li").length,
            "imageId": parseInt(document.querySelector("div.image-card").dataset.postId),
            "content": commentForm.querySelector("input.comment-input").value
        }

        configObj = {
            method: "POST",

            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(commentObj)
        }

        fetch(COMMENT_URL, configObj)
    }

    const clickHandler = () => {
        document.addEventListener("click", (e) => {
            button = e.target
            if(button.matches("button.like-button")) {
                renderLike(button.parentNode.querySelector("span.likes"))
            } else if (button.matches("button.comment-button")) {
                e.preventDefault()
                renderComment(button.parentNode)
                button.parentNode.querySelector("input.comment-input").value = ""
            }
        })
    }

    // const submitHandler = () => {
    //     document.addEventListener("submit", (e) => {
    //         form = e.target
    //         if(form.matches("button.comment-button")) {
    //             e.preventDefault
    //             console.log("form")
    //         }
    //     })
    // }

    // const newPost = returnPost(getPost())
    getPost()
    clickHandler()
    // submitHandler()
})