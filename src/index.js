// write your code here
/*

images hasm any comments
comment belongs to an image

PLAN
DONE- Domcontentloaded listener
- Get  image (title, likes, image)
    - Render to the DOM

- Get comments (imageId, content)
    - render to dom under image


- Add event listener to heart icon (like button)
    - Patch request to change image likes in DB
    - render pessamistically to DOM

- Event listener on submit button that adds comment
    - DOES NOT NEED TO PERSIST IN DB

*/

document.addEventListener("DOMContentLoaded",function(){
    console.log("dom loaded!")
    const imageURL = "http://localhost:3000/images/1"

    const imgTag = document.querySelector(".image")
    const commentsUl = document.querySelector(".comments")

    const likeButton = document.querySelector(".like-button")

    //I know that I could've gotten commetns out of image obj

    function getImage() {
        fetch(imageURL)
        .then(response => response.json())
        .then(imageObj => {
            renderImage(imageObj)
        
        })
    }

    function renderImage(imageObj) {
        const imageURL = imageObj.image
        imgTag.src = imageURL
    }

    function renderComments () {

    }

    renderComments()
    getImage()
})