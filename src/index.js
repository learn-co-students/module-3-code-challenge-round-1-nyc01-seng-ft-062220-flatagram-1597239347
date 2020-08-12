
/* 
- See the image received from the server, including its title, likes and comments when the page loads
- Click on the heart icon to increase image likes, and still see them when I reload the page
- Add a comment (no persistance needed)
*/

/*
- GET `/images/1`
- PATCH `/images/1`
- POST `/comments`
- DELETE `/comments/:id`
*/

document.addEventListener("DOMContentLoaded", e=>{

    let page_link = "http://localhost:3000/images/1"
    let ul = document.querySelector(".comments")

    fetch(page_link)
    .then(resp =>resp.json())
    .then(page => renderPage(page))

    function renderPage(page){

        let title = document.querySelector(".title")
        title.innerText = page.title

        let image = document.querySelector(".image")
        image.src = page.image

        let likes = document.querySelector(".likes")
        likes.innerText = `${page.likes} likes`

        ul.innerHTML = ""

        function renderComments(){
            page.comments.forEach (comment=>{

                let li = document.createElement('li')
                li.innerText = comment.content
                ul.appendChild(li)
            })
        }//renderCom
        renderComments()
    }//renderPage

    let button = document.querySelector(".like-button")
    button.addEventListener("click", e=>{

        let span = document.querySelector(".likes")
        let likesNumber = parseInt(span.innerText.split(" ")[0])
        let newLikes = likesNumber+1
        
        let options = {
            method: "PATCH",
            headers: {
                "content-type": "application/json",
                "accept": "application/json"
            },
            body: JSON.stringify({likes: newLikes})
        }
        fetch(page_link, options)
        .then(resp =>{
            span.innerText = `${newLikes} likes`
        })

    })//button EventListener

    let form = document.querySelector(".comment-form") 
    form.addEventListener("submit", e=>{

        e.preventDefault()

        let newComment = e.target.comment.value
        let li = document.createElement('li')
        li.innerText = newComment
        ul.appendChild(li)
        form.reset()

    })


})//DOMContentLoaded