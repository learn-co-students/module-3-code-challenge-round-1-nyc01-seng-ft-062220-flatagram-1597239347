document.addEventListener("DOMContentLoaded", function(e) {
const imgCard = document.querySelector(".image-card")
const likesSectionDiv = document.querySelector(".likes-section")
const commentForm = document.querySelector(".comment-form")
const numLikesSpan = likesSectionDiv.children[0]
const imgCardChildren = imgCard.children
const title = document.querySelector(".title")
const commentsUl = document.querySelector(".comments")
const imgTag = imgCardChildren[1]
let imgData = {}


    const getImage = () => { 
        fetch("http://localhost:3000/images/1")
        .then(resp => resp.json())
        .then(image => {
            renderImg(image)
            imgData = image     
        })
    }

    const renderImg = (imgObj) => {
        title.innerText = imgObj.title 
        imgTag.src = imgObj.image
        likesSectionDiv.children[0].innerText = imgObj.likes + " Likes"
        const imgComments = imgObj.comments
        let commentsArray = []
        imgComments.forEach(comment => commentsArray.push(comment.content))
        commentsArray.forEach(renderComment)

        likesSectionDiv.addEventListener("click", changeLikes)
        commentForm.addEventListener("submit", submitComment)
    }

    const renderComment = (comment) => { 
            const newComment = document.createElement("li")
            newComment.innerText = comment
            commentsUl.append(newComment)

            const deleteButton = document.createElement("button")
            deleteButton.innerText = `Delete`
            newComment.append(deleteButton)
            deleteButton.addEventListener("click", deleteComment)
        }

    const deleteComment = (e) => { 
        fetch("http://localhost:3000/comments/1", {method: "DELETE"})
        // successfully updates database but still have to update DOM
    }
    
    const submitComment = (e) => { 
        e.preventDefault()
        const commentText = e.target.children[0].value
        renderComment(commentText) //comment text to be rendered to the page

        let newComment = {
            id: 1, 
            imageId: 1, 
            content: commentText
        }

        const option = {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify(newComment)
        }

        fetch("http://localhost:3000/comments", option)
        .then(resp => resp.json())
        .then(console.log)

        imgData.comments.push(newComment) //updating the imgData object I created on line 10
        commentForm.reset()
    }

    const changeLikes = (e) => {
        if(e.target.classList.contains("like-button")){
            imgData.likes += 1
        }else if(e.target.classList.contains("downvote-button")){
            imgData.likes -= 1
        }
        const numLikes = imgData.likes
        const option = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({
                likes: numLikes
            })
        };
        fetch("http://localhost:3000/images/1", option)
        .then(resp => resp.json())
        .then(numLikesSpan.innerText = numLikes + " Likes")
        
    };






    getImage()
})
