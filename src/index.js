// write your code here
document.addEventListener("DOMContentLoaded", function() {


const getImage = (image) => {
    fetch("http://localhost:3000/images/1")
    .then(response => response.json())
    .then(image => parseImageToHtml(image))
}


const parseImageToHtml = (image) => {
    // const ul = document.querySelector(".comments")


    // update comments 
    const comment1 = image.comments[0].content
    const comment2= image.comments[1].content
    const comment3 = image.comments[2].content

    const allLi = document.querySelectorAll("li")
    allLi[0].textContent = comment1
    allLi[1].textContent = comment2
    allLi[2].textContent = comment3

    // update image
    const showImage = image.image
    const findImage = document.querySelector(".image")
    findImage.src = showImage

    // update title
    const newTitle = image.title
    const title = document.querySelector(".title")
    title.innerText = newTitle

    debugger
}

getImage()

})






/*
See the image received from the server, including its title, likes and comments when the page loads
    -dom content loaded done
    -getImage fetch request - get single photo and all of its comments - done
    -HTML to show the title, likes, comments - done
Click on the heart icon to increase image likes, and still see them when I reload the page
    -event listener on heart, incrementing by 1 per click   
Add a comment (no persistance needed)
    -event listener on submit button
    -post request



*/