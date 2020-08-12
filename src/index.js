// write your code here

//  √ See the image received from the server, 
//  √ including its title, likes and comments when the page load

// √fetch all info from API , ****images/1*****
// √grab all elements from DOM 
// √populate innerHTML with info from DOM (.notation)
// √itterate thru comments object, append to ***new comment li****



// √ Click on the heart icon to increase image likes, 
// √ and still see them when I reload the page

// √grab heart button 
// √add CLICK LISTENER TO BUTTON
// √PARSE INT likes from string to number also increasing number of likes



// √ Add a comment (no persistance needed)

// √grab FORM **** PREVENT DEFAULT***
// √grab FORM INPUT and its value
// √create new comment LI and append FORM INPUTS to new li and append to comment UL












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
        imageLikes.innerHTML = image.likes 
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

    const form = document.querySelector(".comment-form")

    form.addEventListener("submit", function(e){
        e.preventDefault()
        let input = document.querySelector(".comment-input")
        let addedLi = document.createElement("li")
        addedLi.innerHTML = input.value
        imageComments.append(addedLi) 
        form.reset()
    })
   



})
    






















