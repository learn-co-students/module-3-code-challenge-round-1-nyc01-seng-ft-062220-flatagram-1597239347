// write your code here
//fetch image and title
//render image
//render title
//render likes and comments
//build heart like like function
//add comment.
const urlImages = "http://localhost:3000/images/"

document.addEventListener("DOMContentLoaded", e=> {

  const fetchImage = () => {
    fetch(urlImages)
      .then(res => res.json())
      .then(data => data.forEach(object => renderImage(object)))
  }

  const renderImage = (object) => {
    const containerDiv = document.getElementById("image-container")
    const objectDiv = document.createElement("div")

    objectDiv.dataset.id = object.id

    objectDiv.innerHTML = `
        <h2 class="title">${object.title}</h2>
        <img src="${object.image}" class="image" />
        <div class="likes-section">
        <span class="likes">0 likes</span>    
        <button class="like-button">♥</button>
    `
    console.log(containerDiv)





  }

  fetchImage()


})
