
/* 
- √ See the image received from the server, including its title, likes and comments when the page loads
- √ Click on the heart icon to increase image likes, and still see them when I reload the page
- √ Add a comment (no persistance needed)
- √ Downvote an image
- √ Still see the comments written after reloading the page
        > For this one, you want to make a POST request to the `/comments` endpoint.
        > Your comment object must have an `imageId` key with a value of `1` for it to work.
- √ Delete a comment
        > To persist this, you will have to make a DELETE request to the `/comments/:id` endpoint.
        */
       
document.addEventListener("DOMContentLoaded", e=>{
    
    const page_link = "http://localhost:3000/images/1"
    const comment_link = "http://localhost:3000/comments/"
    const ul = document.querySelector(".comments")
    const button = document.querySelector(".like-button")
    const form = document.querySelector(".comment-form") 

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
                li.dataset.id = comment.id
                li.innerText = comment.content
                ul.appendChild(li)
            })
        }//renderCom
        renderComments()
    }//renderPage

   function upVoteImage(){
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
        })
    }//f upVoteImage
 
    function addComment(){
        form.addEventListener("submit", e=>{
            
            e.preventDefault()
            let newComment = e.target.comment.value
            let li = document.createElement('li')
            li.innerText = newComment
            ul.appendChild(li)
            form.reset()
        
            let body = {imageId:1, content: newComment}
        
            let options = {
                 method: "POST",
                 headers: {
                     "content-type": "application/json",
                     "accept": "application/json"
                    },
                    body: JSON.stringify(body)
                }
            fetch(comment_link, options)        
        })
    }//f addComment
        
    function downVoteImage(){
            
        let downVoteButton = document.createElement('button')
        downVoteButton.innerHTML = `♡`
        downVoteButton.className ="unlike"
        
        let likeSectionDiv = document.querySelector(".likes-section")
        likeSectionDiv.insertBefore(downVoteButton, button)
        
        let downVote = document.querySelector(".unlike")

        downVote.addEventListener("click", e=>{
            
            let span = document.querySelector(".likes")
            let likesNumber = parseInt(span.innerText.split(" ")[0])
            let newLikes = likesNumber-1
            span.innerText = `${newLikes} likes`
        })
    }//f downVoteLikes
        
        //when click on comment - it's been deleted
    function deleteComment(){
            
        ul.addEventListener("click", e=>{
            let commentId = parseInt(e.target.dataset.id)
            let li = document.querySelector(`[data-id="${commentId}"]`)
             let options = {
                 method: "DELETE"
             }
             fetch(comment_link+commentId, options)
             .then(resp=>[
                 li.remove()
             ])  
         })
    } //f deleteComment
        
        upVoteImage()
        addComment()
        downVoteImage()
        deleteComment()
        
})//DOMContentLoaded