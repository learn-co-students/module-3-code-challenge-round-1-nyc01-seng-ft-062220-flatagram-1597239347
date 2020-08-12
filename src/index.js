// write your code here


document.addEventListener("DOMContentLoaded",function(){
    const commentUL = document.querySelector("ul.comments")
    const image = document.querySelector("img.image")
    const likes = document.querySelector("span.likes")
    const imagesURL = "http://localhost:3000/images/"
    const commentsURL = "http://localhost:3000/comments/"
    

    pageLoad()




    function pageLoad(e){
        commentUL.innerHTML = ""
        image.src = ""
        console.log("i'm inside the pageLoad function")
        loadImage()
        loadComments()

        function loadImage(){
            fetch(imagesURL)
            .then(function(response){return response.json()})
            .then(function(images){
               image.src = images[0].image
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
                console.log('i just loaded the comments')
            })
        }

    }
    
    






    //this is the end of the DOMContentLoaded add event listener
})
