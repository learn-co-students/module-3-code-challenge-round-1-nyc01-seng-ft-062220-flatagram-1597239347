// write your code here
/*


PLAN
DONE- Domcontentloaded listener
DONE- Get  image (title, likes, image)
    DONE- Render to the DOM

DONE- Get comments (imageId, content)
    DONE- render to dom under image


DONE- Add event listener to heart icon (like button)
    DOM- Patch request to change image likes in DB
    DOM - render pessamistically to DOM

DONE- Event listener on submit button that adds comment
    DONE- DOES NOT NEED TO PERSIST IN DB
    DONE - clear form value when submited

Advanced Deliverables
- Downvote image
    - Add downvote button
    - add an if else statement in click lisenter
        - add logic that does reverse of like button (decreases like count and renders pessamistically)
- Make new comments persist
    - fetch post to db in submit event listener - render pessamistically
    - 
- Delete a comment

*/

document.addEventListener("DOMContentLoaded",function(){
    
    const imageUrl = "http://localhost:3000/images/1"

    const imgTag = document.querySelector(".image")
    const titleHeader = document.querySelector(".title")
    const likesSpan = document.querySelector(".likes")
    const commentsUl = document.querySelector(".comments")
    
    const likeButton = document.querySelector(".like-button")
    const likeSpan = document.querySelector(".likes")


    function getImage() {
        fetch(imageUrl)
        .then(response => response.json())
        .then(imageObj => {
            renderImage(imageObj)
            const imageComments = imageObj.comments
            renderComments(imageComments)
        })
    }

    function renderImage(imageObj) {
        const imageUrlAttr = imageObj.image
        const imageTitle = imageObj.title
        const imageLikes = imageObj.likes

        imgTag.src = imageUrlAttr
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

    function clickHandler(){
        document.addEventListener("click", function(e){
            if(e.target.matches(".like-button")){
                let currentLikes = parseInt(likesSpan.textContent.split(" ")[0])
                newLikeCount = currentLikes + 1
                
                configObj = {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({likes: newLikeCount})
                }
                
                fetch(imageUrl, configObj)
                .then(response => response.json())
                .then(updatedObj => { 
                    updatedLikeCount = updatedObj.likes
                    likesSpan.textContent = `${updatedLikeCount} Likes` })

            }
        })
    }

    function submitHandler(){
        document.addEventListener("submit", function(e){
            e.preventDefault()

            let commToAdd = e.target.comment.value
            newCommentLi = document.createElement("li")
            newCommentLi.textContent = commToAdd

            commentsUl.append(newCommentLi)
            e.target.reset()
        })
    }


    getImage()
    clickHandler()
    submitHandler()
})