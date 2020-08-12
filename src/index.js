

// WARRNING THE CODE YOU ARE ABOUT TO READ IS NOT DRY. YOU WONT NEED ANY WATER READING THIS.
// Time permiting, I'd love to refactor :)


// CORE Deliverables

// See the image received from the server, including its title, likes and comments when the page loads

    // √1. build url for images with embedded likes
    // √2. fetch images
    // √3. render the images

// Click on the heart icon to increase image likes, and still see them when I reload the page

    // √1. find the heart icon
    // √2. add to the heart icont total count

// Add a comment (no persistance needed)

    // 1. √find the form content
    // 2. √read the form content and update html


const COMMENT_URL = "http://localhost:3000/comments"
const IMG_URL = "http://localhost:3000/images/"
const IMG_W_CMMNTS = "http://localhost:3000/images/1?_embed=comments"
let currentLikes = 0;

document.addEventListener("DOMContentLoaded", () => {
    console.log("LOADED")

    getImage=() => {
        fetch(IMG_W_CMMNTS)
            .then(response => response.json())
            .then(image => {renderImage(image)})
    }

    renderImage=(image)=>{
        let imgDivCard = document.querySelector('.image-card'),
            imgDivCont = document.querySelector('.image-container');
     

              imgDivCard.innerHTML = ''  
              imgDivCard.dataset.imgId = image.id

        imgDivCard.innerHTML = `
            <h2 class="title">${image.title}</h2>
            <img class='image-container' src="${image.image}" />
                <div class="likes-section">
                    <span class="likes">${currentLikes} likes</span>
                    <button class="like-button">♥</button>
                </div>
            <ul class="comments">
            </ul>
            <form class="comment-form">
            <input
              class="comment-input"
              type="text"
              name="comment"
              placeholder="Add a comment..."
            />
            <button class="comment-button" type="submit">Post</button>
          </form>`

        imgDivCont.appendChild(imgDivCard);

        let imgComments = document.querySelector('.comments')

        for (const comment of image.comments) {
            let commentLi = document.createElement('li');

                commentLi.textContent = comment.content

                imgComments.appendChild(commentLi)

                // in a larger image set would have to have conditional to check imgID on the comment against the pictureID to distribute the comments dynamically
        }

    }


    likesHandler=()=>{
        document.addEventListener('click', e => {
            let likeBtn = document.querySelector(".like-button")
            if (e.target.className === "like-button") {
            
                let likesTargetId = likeBtn.parentNode.parentNode.dataset.imgId
                    likesNum = likeBtn.parentElement.querySelector(".likes").textContent.split(' ')[0]

                let updatedLikes = currentLikes++
                    likesNum = currentLikes

                const options = {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify({
                        likes: `${currentLikes}`
                    })

                }
                fetch(IMG_URL+likesTargetId, options)
                    .then(response => response.json())
                    getImage()
            }
        })
    }

    
    commentHandler=()=> {
        document.addEventListener("submit", e => {
            e.preventDefault()

            let imgComments = document.querySelector('.comments'),
                commentText = document.querySelector('.comment-input').value,
                commentLi = document.createElement('li'),
                ImgId = imgComments.parentNode.dataset.imgId;

            commentLi.textContent = commentText

            imgComments.appendChild(commentLi)

            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    imageId: Number.imgId,
                    content: commentText,
                    id
                })
            }
            fetch(COMMENT_URL, options)
                .then(response => response.json())
                getImage()
        })
    }




    getImage();
    likesHandler();
    commentHandler();
})