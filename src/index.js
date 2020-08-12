// write your code here
//DONE - fetch image and title
//DONE - render image
//render title
//render likes and comments
//build heart like like function
//add comment.
const urlImages = "http://localhost:3000/images/"
const urlLikes = "http://localhost:3000/likes/"

document.addEventListener("DOMContentLoaded", e=> {

  const fetchImage = () => {
    fetch(urlImages)
      .then(res => res.json())
      .then(data => data.forEach(object => renderImage(object)))
  }

  const renderImage = (object) => {
    const containerDiv = document.getElementById("image-container") //fix selector if time
    const objectDiv = document.createElement("div")
    objectDiv.dataset.id = object.id
    objectDiv.innerHTML = `
        <h2 class="title">${object.title}</h2>
        <img src="${object.image}" class="image" />
        <div class="likes-section">
        <span class="likes">${object.likes} Likes</span>    
        <button class="like-button">♥</button>
    `

    //render heart button here and append to object div
    containerDiv.innerHTML = ""
    containerDiv.append(objectDiv)

  }


  const clickHandler = () => {
    document.addEventListener("click", e => {
      if (e.target.matches("button.like-button")) {
        const button = e.target
        addLike(button)
      }
    })
  }

  const addLike = (button) => {
    //get id of object
    //get current like number
    //add 1
    //patch server with like number

    const objectId = button.parentElement.parentElement.dataset.id
    const likesDiv = button.parentElement
    const likesSpan = likesDiv.querySelector("span")
    const likesValue = likesSpan.textContent
    let likesNumber = parseInt(likesValue)

    const data = {likes: likesNumber += 1}
    const packet = {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        "accept" : "application/json"
      },
      body: JSON.stringify(data)
    }

    fetch(urlImages + objectId, packet)
      .then(res => res.json())
      .then(fetchImage())

  }



  fetchImage()
  clickHandler()


})
