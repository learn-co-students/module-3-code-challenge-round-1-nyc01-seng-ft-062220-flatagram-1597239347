document.addEventListener("DOMContentLoaded", function(e) {
const imgCard = document.querySelector(".image-card")
const imgCardChildren = imgCard.children
const title = imgCardChildren[0]
const imgTag = imgCardChildren[1]
const likesSection = imgCardChildren[2]
const commentsUl = imgCardChildren[3]
const commentsForm = imgCardChildren[4]
const button = document.querySelector(".like-button")
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
        imgComments.forEach(comment => {
            const newComment = document.createElement("li")
            newComment.innerText = comment.content
            commentsUl.append(newComment)
        })


        button.dataset.imgId = imgObj.id
        button.addEventListener("click", incLikes)
        
        

    }

    incLikes = (e) => {
        // const imgId = e.target.dataset.imgId
        const numLikes = parseInt(imgData.likes) + 1
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
