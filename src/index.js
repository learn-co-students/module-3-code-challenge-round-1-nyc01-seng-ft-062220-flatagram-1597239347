// write your code here
document.addEventListener("DOMContentLoaded", () => {



    
    const imageUrl = "http://localhost:3000/images/1"
    const imageComments = document.querySelector(".comments")
    const imageLikes = document.querySelector(".likes")
    
    function getImage(){
        fetch(imageUrl)
        .then(response => response.json())
        .then(image => renderImage(image))
    }
    getImage()

    function renderImage(image){
        const imageTitle = document.querySelector(".title")
        imageTitle.innerHTML = image.title
        const pic = document.querySelector(".image")
        pic.src = image.image
        imageLikes.innerHTML = image.likes + " Likes"
        imageComments.innerHTML = ""

        let comments = image.comments

        comments.forEach(comment =>{
            let content = comment.content
            let li = document.createElement("li")
            li.innerHTML = content
            imageComments.append(li)
        })
    }

    const button = document.querySelector(".like-button")
    button.addEventListener("click",function(e){
        let newLikes = imageLikes.innerHTML = parseInt(imageLikes.innerHTML) + 1 + " Likes"

        fetch(imageUrl,{
            method: "PATCH",
            headers:{
                "Content-Type": "application/json",
                "Accepts": "application/json"},
            body: JSON.stringify({likes: newLikes})
        })
    





    })





})
    




















//  See the image received from the server, 
//  including its title, 
//  likes and 
//  comments when the page loads


