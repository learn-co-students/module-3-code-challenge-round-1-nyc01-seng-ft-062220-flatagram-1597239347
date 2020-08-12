
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

        let ul = document.querySelector(".comments")
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

        
    })


})//DOMContentLoaded