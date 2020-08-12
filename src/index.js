document.addEventListener("DOMContentLoaded", e => {
const baseUrl = "http://localhost:3000/images/1"

function renderImage(image) {
const title = document.querySelector("body > div > div > h2")
title.innerText = `${image.title}`
console.log(title);
const photo = document.querySelector("body > div > div > img")
const likes = document.querySelector("body > div > div > div > span")
const likeBtn = document.querySelector("body > div > div > div > button")
const commentsUl = document.querySelector("body > div > div > ul") //append comments in li


}

function getImages(){
    fetch("baseUrl")
    .then(response => response.json())
    .then(images => images.forEach(image => renderImage(image)))
  }






//invoke function
getImages()

})

/* 
1) user can see the image/photo, title, likes, comments when page loads

2) 




db.json
[
  {
    "id": 1,
    "title": "Woofing those bugs away",
    "likes": 0,
    "image": "./assets/coder-dog.png"
  }
]

*/