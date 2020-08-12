// write your code here


document.addEventListener("DOMContentLoaded",function(){
    const commentUL = document.querySelector("ul.comments"),
    likes = document.querySelector("span.likes"),
    image = document.querySelector("img.image"),
    card = document.querySelector("div.image-card"),
    imagesURL = "http://localhost:3000/images/",
    commentsURL = "http://localhost:3000/comments/";

    

    pageLoad()

    card.addEventListener("click",function(e){
        

        if(e.target.className === "like-button" ){
            const imageID = e.target.parentNode.parentNode.dataset.id,
            likeNumber = parseInt(likes.textContent.split(" ")[0]) +1;
            patchPage(imageID,likeNumber)
            
        }
        //end of the card-container click AddEventListener
    })

    card.addEventListener("submit",function(e){

        e.preventDefault()
        const comment = e.target
        const imageID = parseInt(e.target.parentNode.dataset.id)

        postComment(comment.comment.value,imageID)
        // e.target.reset()


    // the end of the submit addeventlistener to the card
    })





    function pageLoad(){
        commentUL.innerHTML = ""
        image.src = ""
        loadImage()
        loadComments()

        function loadImage(){
            fetch(imagesURL)
            .then(function(response){return response.json()})
            .then(function(images){
                const title = card.querySelector("h2.title")
               image.src = images[0].image
               likes.textContent = `${images[0].likes} likes`
               card.dataset.id = images[0].id
               title.textContent = images[0].title
            })
        }

        function loadComments(){
            fetch(commentsURL)
            .then(function(response){return response.json()})
            .then(function(comments){
                comments.forEach(comment =>{
                    const li = document.createElement("LI")
                    li.textContent = comment.content
                    commentUL.appendChild(li)

                })
            })
        }

    }
    
    function patchPage(id, likeNumber){
        const body = {id: id, likes: likeNumber},
        options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(body)

        }
        fetch(imagesURL+id,options)
        .then(function(response){return response.json()})
        .then(function(image){
            likes.textContent = `${image.likes} likes`
        })
        

    }
    
    function postComment(text,imageID){
        const body = {imageId: imageID, content: text},
        options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(body)

        }
        fetch(commentsURL,options)
        .then(function(response){return response.json()})
        .then(function(comment){
            const li = document.createElement("LI")
            const commentUL = document.querySelector(`div[data-id = "${imageID}"] > ul.comments`)
            li.textContent = comment.content
            li.dataset.id = comment.id
            commentUL.appendChild(li)
            


        })



    }






    //this is the end of the DOMContentLoaded add event listener
})
