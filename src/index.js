document.addEventListener("DOMContentLoaded", e => {
const baseUrl = "http://localhost:3000/images/"

function renderImage(image) {
const title = document.querySelector("body > div > div > h2")
title.innerText = `${image.title}`
const photo = document.querySelector("body > div > div > img")
photo.src = `${image.image}`
const likes = document.querySelector("body > div > div > div > span")
likes.innerText = `${image.likes} likes`
const likeBtn = document.querySelector("body > div > div > div > button")
const commentsUl = document.querySelector("body > div > div > ul") //append comments in li

}

function getImages(){
    fetch(baseUrl)
    .then(response => response.json())
    .then(images => images.forEach(image => renderImage(image)))
  }

  //submit listener---------------------------------------------------------------------------------

  document.addEventListener("submit", e => {
  e.preventDefault()
  const form = document.querySelector(".form")
  form = e.target
  const postBtn = document.querySelector("body > div > div > form > button")
  const commentLine = document.querySelector("body > div > div > form > input")

  

  

  })

  //click listener---------------------------------------------------------------------------------
  document.addEventListener("click", e => {
  
  })





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