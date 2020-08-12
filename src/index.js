// write your code here
document.addEventListener("DOMContentLoaded", () => {
    //global variables
    const imageURL = "http://localhost:3000/images"
    const CommentURL = "http://localhost:3000/comments"
    //const imageCard = document.getElementsByClassName("image-card")
    const comments = document.querySelector(".comments")
    comments.innerHTML = "" //remove the default comments

    let allImages = []
    let allComments = []

    //fetch image (GET)
    const fetchImage = async () => {
        const res = await fetch(imageURL)
        const data = await res.json()
        data.forEach(imageObj => {
            //add to the collection of images
            allImages.push(imageObj)
            //display the images on the page
            renderImage(imageObj)
        })
    }

    //fetch comments (GET)
    const fetchComments = async () => {
        const res = await fetch(CommentURL)
        const data = await res.json()
        data.forEach(commentObj => {
            //add to the collection of images
            allComments.push(commentObj)
        })
    }

    // update Likes images (PATCH)
    const patchImage = async (imageid, likeCount) => {
        const settings = {
            method: 'PATCH',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "likes" : likeCount 
            })
        }
        const res = await fetch(`${imageURL}/${imageid}`, settings)
    }

    //add comments (POST)
    const addComment = async(imageId, commentText) => {
        const settings = {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "imageId": imageId,
                "content": commentText
            })
        }
        const res = await fetch(CommentURL, settings)
    }

    //helper method
    const createList = (comment) => {
        const li = document.createElement("li")
        li.dataset.image = comment.id
        li.innerText = comment.content
        comments.append(li)
    }

    //render images using data for image API
    const renderImage = (imageObj) => {
        const title = document.querySelector(".title")
        const image = document.querySelector(".image")
        const likes = document.querySelector(".likes")

        //add the list of comments
        allComments.forEach(comment => createList(comment)) 

        title.innerText = imageObj.title
        title.id = imageObj.id
        image.src = imageObj.image
        likes.innerText = imageObj.likes
    }

    //click event listener for the like button
    const clickHandler = () => {
        document.addEventListener("click", e => {
            const imageId = e.target.parentElement.parentElement.children[0].id
            const likeCount = e.target.parentElement.children[0].innerText
            if (e.target.matches(".like-button")){
                likeUpVote = parseInt(likeCount) + 1
                patchImage(imageId, likeUpVote) 
            }
        })

    }
    
    //forms for comments
    const formHandler = () => {
        document.addEventListener("submit", e => { 
            e.preventDefault()
            const commentText = document.querySelector(".comment-input").value
            const imageId = document.querySelector(".image-card").children[0].id
            addComment(parseInt(imageId), commentText)
        })

    }

fetchComments()
fetchImage()
clickHandler()
formHandler()
})