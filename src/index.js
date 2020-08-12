// write your code here
//DONE - fetch image and title
//DONE - render image
//DONE - render title
//DONE - render likes
// render comments
//DONE - build heart like like function
//add comment.
const urlImages = "http://localhost:3000/images/"
const urlComments = "http://localhost:3000/comments/"

document.addEventListener("DOMContentLoaded", e=> {

  const fetchImage = () => {
    fetch(urlImages)
      .then(res => res.json())
      .then(data => data.forEach(object => renderImage(object)))
  }

  const renderImage = (object) => {
    const containerDiv = document.getElementById("image-container") //fix selector if time
    const objectDiv = document.createElement("div")

    while(containerDiv.firstChild){
      containerDiv.removeChild(containerDiv.lastChild)
    }

    objectDiv.dataset.id = object.id
    objectDiv.innerHTML = `
        <h2 class="title">${object.title}</h2>
        <img src="${object.image}" class="image" />
        <div class="likes-section">
        <span class="likes">${object.likes} Likes</span>    
        <button class="like-button">♥</button>
        <button class="dislike-button"> :( dislike </button>
        </div>
        <ul class="comments"></ul>
        <form class="comment-form">
          <input
            class="comment-input"
            type="text"
            name="comment"
            placeholder="Add a comment..."
          />
          <button class="comment-button" type="submit">Post</button>
        </form>
      </div>
    `

    //render heart button here and append to object div
    containerDiv.append(objectDiv)
    fetchComments()
  }

  const fetchComments = () => {
    fetch(urlComments)
      .then(res => res.json())
      .then(data => data.forEach(comment => renderComments(comment)))
  }

  const renderComments = (comment) => {
    const containerUl = document.querySelector(".comments")
    const commentLi = document.createElement("li")
    const deleteButton = document.createElement("button")

    deleteButton.classList.add("delete")
    commentLi.dataset.id = comment.id
    deleteButton.textContent = "Delete"
    commentLi.textContent = comment.content
    commentLi.append(deleteButton)
    containerUl.append(commentLi)
  }

  const submitHandler = () => {
    document.addEventListener("submit", e=> {
      e.preventDefault()
      const button = e.target
      createComment(button)
    })
  }

  const clickHandler = () => {
    document.addEventListener("click", e => {
      if (e.target.matches("button.like-button")) {
        const button = e.target
        addLike(button)
      } else if (e.target.matches("button.delete")) {
        const button = e.target
        deleteComment(button)
      } else if (e.target.matches("button.dislike-button")){
        const button = e.target
        removeLike(button)
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

  const removeLike = (button) => {
    //get id of object
    //get current like number
    //add 1
    //patch server with like number

    const objectId = button.parentElement.parentElement.dataset.id
    const likesDiv = button.parentElement
    const likesSpan = likesDiv.querySelector("span")
    const likesValue = likesSpan.textContent
    let likesNumber = parseInt(likesValue)

    const data = {likes: likesNumber -= 1}
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

  const createComment = (button) => {
    const form = button
    const commentText = form.comment.value

    const data = {
      imageId: 1,
      content: commentText
    }

    const packet = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "accept": "application/json"
      },
      body: JSON.stringify(data)
    }

    fetch(urlComments, packet)
      .then(res => res.json())
      .then(fetchImage())
  }

  const deleteComment = (button) => {
    const commentId = button.parentElement.dataset.id

    const packet = {
      method: "DELETE"
    }

    fetch(urlComments + commentId, packet)
      .then(res => res.json)
      .then(fetchImage())
  }


  fetchImage()
  submitHandler()
  clickHandler()

})
