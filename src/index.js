// write your code here
document.addEventListener("DOMContentLoaded", () => {




    const imageUrl = "http://localhost:3000/images/1"
    
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
        const imageLikes = document.querySelector(".comments")

        
        
        // console.log(pic)
    }





})
    




















//  See the image received from the server, 
//  including its title, 
//  likes and 
//  comments when the page loads


