document.addEventListener("DOMContentLoaded", e => {
const baseUrl = "http://localhost:3000/images/"

function renderImage(image) {
const title = document.querySelector("body > div > div > h2")
title.innerText = `${image.title}`
const photo = document.querySelector("body > div > div > img")
photo.src = `${image.image}`
const likes = document.querySelector("body > div > div > div > span")
likes.innerText = `${image.likes} likes`

}

function getImages(){
    fetch(baseUrl)
    .then(response => response.json())
    .then(images => images.forEach(image => renderImage(image)))
  }

  //submit listener---------------------------------------------------------------------------------

  document.addEventListener("submit", e => {
  e.preventDefault()
  let form = document.querySelector(".form")
  form = e.target

  const commentsUl = document.querySelector("body > div > div > ul") //append comments in li
  const postBtn = document.querySelector("body > div > div > form > button")
  const commentLine = document.querySelector("body > div > div > form > input")
  
  
  })

  //click listener---------------------------------------------------------------------------------
  document.addEventListener("click", e => {
   const likeBtn = document.querySelector("body > div > div > div > button")

   function addLikes(button) {
     
   }
  
  if (e.target.matches(likeBtn))(
      addLikes()
  )

  //post to db

  function imageForm() {
    `likes: ${likes.innerText}`
  }

//   function imageConfig() {
//             method: "POST",
//             headers: {
//               "content-type": "application/json",
//               "accept": "application/json"
//             },
//             body: JSON.stringify(imageForm)
        
//   }
//   function postLikes(){
//     fetch("http://localhost:3000/images/1", imageConfig)
//     .then(response => response.json())
//     .then(likes => )
//   }


  })





//invoke function
getImages()
addComment()
postLikes()

})

/* 
1) user can see the image/photo, title, likes, comments when page loads

2) when user click on heart icon, image likes increases
2a) likes needs to persis to db

3) when user enters on commentline, comment appears above




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