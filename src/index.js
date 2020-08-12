// write your code here
document.addEventListener("DOMContentLoaded", function() {


const getImage = (image) => {
    fetch("http://localhost:3000/images/1")
    .then(response => response.json())
    .then(image => parseImageToHtml(image))
}


const parseImageToHtml = (image) => {
    debugger
}

getImage()

})






/*
See the image received from the server, including its title, likes and comments when the page loads
    -dom content loaded done
    -getImage fetch request - get single photo and all of its comments
    -HTML to show the title, likes, comments
Click on the heart icon to increase image likes, and still see them when I reload the page
    -event listener on heart, incrementing by 1 per click   
Add a comment (no persistance needed)
    -event listener on submit button
    -post request



*/