// write your code here
document.addEventListener("DOMContentLoaded", function() {


const getImage = (image) => {
    fetch("http://localhost:3000/images/1")
    .then(response => response.json())
    .then(image => parseImageToHtml(image))
}


const parseImageToHtml = (dogImage) => {

    // update comments 
    const comment1 = dogImage.comments[0].content
    const comment2= dogImage.comments[1].content
    const comment3 = dogImage.comments[2].content

    const allLi = document.querySelectorAll("li")
    allLi[0].textContent = comment1
    allLi[1].textContent = comment2
    allLi[2].textContent = comment3

    // update image
    const newImage = dogImage.image
    let placeHolderImage = document.querySelector(".image").src="./assets/image-placeholder.jpg"
    placeHolderImage = newImage
    //not sure why the image won't reassign in the DOM!

    // update title
    const newTitle = dogImage.title
    const title = document.querySelector(".title")
    title.innerText = newTitle

}


const clickHandler = () => {
    document.addEventListener("click", function(e){
        const heartButton = document.querySelector(".like-button")
        const likes = document.querySelector(".likes").innerText
        let counter = 0
        if (e.target === heartButton) {
            debugger
        }
    })
}

getImage()
clickHandler()

})






/*
See the image received from the server, including its title, likes and comments when the page loads
    -dom content loaded done
    -getImage fetch request - get single photo and all of its comments - done
    -HTML to show the title, likes, comments - done, wll come back to image
Click on the heart icon to increase image likes, and still see them when I reload the page
    -event listener on heart, incrementing by 1 per click   
Add a comment (no persistance needed)
    -event listener on submit button
    -post request



*/