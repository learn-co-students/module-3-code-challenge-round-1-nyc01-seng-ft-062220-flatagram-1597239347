// write your code here
// As a user, I can:

// 1) XXXXSee the image received from the server, including its title, likes and comments when the page loads
// 2) XXX Click on the heart icon to increase image likes, and still see them when I reload the page
// 3) XXXAdd a comment (no persistance needed)

document.addEventListener("DOMContentLoaded", function(e) {
    const postURL = "http://localhost:3000/images/1"
    const postContainer = document.querySelector(".image-card")

    const fetchImage = () => {
        fetch(postURL)
        .then(response => response.json())
        .then(imageObj => renderImage(imageObj))
    }

    const renderImage = (imageObj) => {
            const title = document.querySelector(".title")
            const image = document.querySelector(".image")
            const likes = document.querySelector(".likes")
            const comments = document.querySelector(".comments")
            const downVote = document.querySelector(".dislike")  
            title.textContent = imageObj.title
            image.src = imageObj.image
            likes.textContent = imageObj.likes + ' Likes'
            postContainer.id = imageObj.id
            comments.innerHTML = ''
            //console.log(imageObj.comments[1])
            for (let i = 0; i < imageObj.comments.length; i++) {
                const element = imageObj.comments[i];
                const li = document.createElement('li')
                li.textContent = element.content
                comments.append(li)  
            }
        }

        //Click on the heart icon to increase image likes, and still see them when I reload the page


        const clickHandler = () => {
            document.addEventListener('click', function(e) {
                if(e.target.className === 'like-button'){
                    //console.log(e.target)
                    //let id = event.target.parentNode.id
                    const likeButton = e.target
                    const likedNumber = likeButton.parentElement//.children[0]//.innerText
                    const likeSpan = likedNumber.querySelector("span")
                    //console.log(likeSpan.textContent)
                    const newLikes = parseInt(likeSpan.textContent) + 1 
                    //console.log(newLikes)
                    
                    fetch(postURL, {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                            "Accepts": "application/json"
                        },
                        body: JSON.stringify({
                            'likes': newLikes
                        })
                    })
                    .then(response => response.json())
                    .then(imageObj => likeSpan.textContent = imageObj.likes + ' Likes')
                  
                }else if (e.target.className === 'dislike'){
                    const dislikeButton = e.target
                    dislikeButton.innerText = "X" //button changes to a X when clicked on Downvote
                }
            })
        }












        const submitForm = () => {
            document.addEventListener('submit', function(e) {
                e.preventDefault()
                const commentForm = document.querySelector(".comment-input").value 
                const comments = document.querySelector(".comments")
                const newCommentLi = document.createElement('li')
                newCommentLi.append(commentForm)
                comments.append(newCommentLi)

            })
        }

    submitForm()
    clickHandler()
    fetchImage()
})