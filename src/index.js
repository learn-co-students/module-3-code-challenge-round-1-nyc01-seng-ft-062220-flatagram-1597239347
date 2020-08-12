// write your code here
/*

images hasm any comments
comment belongs to an image

PLAN
DONE- Domcontentloaded listener
DONE- Get  image (title, likes, image)
    DONE- Render to the DOM

DONE- Get comments (imageId, content)
    DONE- render to dom under image


DONE- Add event listener to heart icon (like button)
    - Patch request to change image likes in DB
    - render pessamistically to DOM

- Event listener on submit button that adds comment
    - DOES NOT NEED TO PERSIST IN DB

*/

document.addEventListener("DOMContentLoaded",function(){
    console.log("dom loaded!")
    const imageURL = "http://localhost:3000/images/1"

    const imgTag = document.querySelector(".image")
    const titleHeader = document.querySelector(".title")
    const likesSpan = document.querySelector(".likes")
    const commentsUl = document.querySelector(".comments")
    const likeButton = document.querySelector(".like-button")

    //I know that I could've gotten commetns out of image obj

    function getImage() {
        fetch(imageURL)
        .then(response => response.json())
        .then(imageObj => {
            renderImage(imageObj)
            const imageComments = imageObj.comments
            renderComments(imageComments)
        })
    }

    function renderImage(imageObj) {
        const imageURL = imageObj.image
        const imageTitle = imageObj.title
        const imageLikes = imageObj.likes

        imgTag.src = imageURL
        titleHeader.textContent = imageTitle
        likesSpan.textContent = `${imageLikes} Likes`

    }

    function renderComments (commentsArray) {
        commentsUl.innerHTML = ""
        commentsArray.forEach(function(comment){
            const commentContent = comment.content
            const commLi = document.createElement("li")
            commLi.innerHTML = commentContent
            commentsUl.append(commLi)
        })
    }


    document.addEventListener("click", function(e){
        if(e.target.matches(".like-button")){
            const currentLikes = 
        }
        


    })


    getImage()
})