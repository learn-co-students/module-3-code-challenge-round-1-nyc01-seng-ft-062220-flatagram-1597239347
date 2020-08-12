// write your code here

BASE_URL = "http://localhost:3000/images/1"
COMMENT_URL = "http://localhost:3000/comments/"
let commentIdCounter = 0

document.addEventListener("DOMContentLoaded", () => {

    const addDownVote = () => {
        const newButton = document.createElement("button")
        newButton.className = "downvote-button"
        newButton.innerText = "Downvote"
        document.querySelector("div.likes-section").append(newButton)
    }

    const setCommentIdCounter = () => {
        const comments = document.querySelectorAll("ul.comments > li")
        let tempId = 0
        for (const comment of comments) {
            if(parseInt(comment.dataset.commentId) > tempId) {
                tempId = parseInt(comment.dataset.commentId)
            }
        }
        commentIdCounter = tempId
    }

    const incrementCommentIdCounter = () => {
        commentIdCounter++
        return commentIdCounter
    }

    const getPost = () => {
        fetch(BASE_URL)
        .then(response => response.json())
        .then(post1 => renderPost(post1))
    }

    // const returnPost = (post) => {
    //     return post
    // }

    const renderPost = (post) => {
        document.querySelector("div.image-card").dataset.postId = post.id
        document.querySelector("h2.title").innerText = post.title
        document.querySelector("img.image").src = post.image
        document.querySelector("span.likes").innerText = `${post.likes} likes`
        document.querySelector("span.likes").dataset.likeCount = post.likes
        document.querySelectorAll("ul.comments > li").forEach(li => li.remove())
        for (let i = 0; i < post.comments.length; i++) {
            const newLi = document.createElement("li")
            newLi.dataset.commentId = post.comments[i].id
            newLi.innerText = post.comments[i].content
            addDeleteButton(newLi)
            document.querySelector("ul.comments").append(newLi)
        }
        setCommentIdCounter()
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

    const decrementLike = (likeSpan) => {

        currentLikeCount = parseInt(likeSpan.dataset.likeCount, 10)
        if (currentLikeCount > 0) {
            currentLikeCount--
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
    }

    const addDeleteButton = (commentLi) => {
        const newDelete = document.createElement("button")
        newDelete.className = "delete-button"
        newDelete.innerText = "Delete"
        commentLi.append(newDelete)
    }

    const renderComment = (commentForm) => {
        const newLi = document.createElement("li")
        newLi.dataset.commentId = incrementCommentIdCounter
        newLi.innerText = commentForm.querySelector("input.comment-input").value
        addDeleteButton(newLi)
        document.querySelector("ul.comments").append(newLi)

        commentObj = {
            "id": parseInt(newLi.dataset.commentId),
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

    const deleteComment = (comment,storedCommentId) => {

        configObj = {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        
        fetch(COMMENT_URL + storedCommentId, configObj)
        .then(response => response.json())
        .then(comment.remove())

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
            } else if (button.matches("button.delete-button")) {
                deleteComment(button.parentNode, button.parentNode.dataset.commentId)
            } else if (button.matches("button.downvote-button")) {
                decrementLike(button.parentNode.querySelector("span.likes"))
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
    addDownVote()
    // setCommentIdCounter()
    // submitHandler()
})