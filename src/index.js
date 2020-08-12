document.addEventListener("DOMContentLoaded", function(e) {
const imgCard = document.querySelector(".image-card")
const imgCardChildren = imgCard.children
const title = imgCardChildren[0]
const imgTag = imgCardChildren[1]
const likesSection = imgCardChildren[2]
const commentsUl = imgCardChildren[3]
const commentsForm = imgCardChildren[4]
const likeButton = document.querySelector(".like-button")
const commentForm = document.querySelector(".comment-form")
let imgData = {}


    const getImages = () => {
        fetch("http://localhost:3000/images/1")
        .then(resp => resp.json())
        .then(resp => {
            renderImg(resp)
            imgData = resp     
        })
    }


    const renderImg = (imgObj) => {
        title.innerText = imgObj.title 
        imgTag.src = imgObj.image
        likesSection.children[0].innerText = imgObj.likes + " Likes"
        const imgComments = imgObj.comments
        let commentsArray = []
        imgComments.forEach(comment => commentsArray.push(comment.content))
        commentsArray.forEach(renderComment)

        likeButton.dataset.imgId = imgObj.id
        likeButton.addEventListener("click", incLikes)

        commentForm.addEventListener("submit", submitComment)
    }

    const renderComment = (comment) => {
            const newComment = document.createElement("li")
            newComment.innerText = comment
            commentsUl.append(newComment)
        }
    
    const submitComment = (e) => {
        e.preventDefault()
        const commentText = e.target.children[0].value
        renderComment(commentText)
        commentForm.reset()
    }

    const incLikes = (e) => {
        // const imgId = e.target.dataset.imgId // not using this
        imgData.likes += 1
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
        .then(likesSection.children[0].innerText = numLikes + " Likes")
        
    };






    getImages()
})
