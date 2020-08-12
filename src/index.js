// write your code here
document.addEventListener("DOMContentLoaded", () => {
    //global variables
    const imageURL = "http://localhost:3000/images"
    const CommentURL = "http://localhost:3000/comments"
    //const imageCard = document.getElementsByClassName("image-card")
    let allImages = []

    //fetch image
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

    //patch image
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

    //render images using data for image API
    const renderImage = (imageObj) => {
        const title = document.querySelector(".title")
        const image = document.querySelector(".image")
        const likes = document.querySelector(".likes")
        const comments = document.querySelector(".comments")
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
        document.addEventListener('submit', e => {
            
        })

    }

fetchImage()
clickHandler()

})