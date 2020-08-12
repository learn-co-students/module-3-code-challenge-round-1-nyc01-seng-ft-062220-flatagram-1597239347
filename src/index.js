document.addEventListener("DOMContentLoaded", init)
const BASE_URL = "http://localhost:3000/images/1"
const COMMENT_URL = "http://localhost:3000/comments/"


function init() {
    getFlataGram();
};

const renderFlataGram = (gram) => {
    const imageCard = document.querySelector(".image-card")
    imageCard.dataset.imageId = `${gram.id}`
    const gramTitle = document.querySelector("h2.title")
    const gramImage = document.querySelector("img.image")
    const gramLikes = document.querySelector("span.likes")
    gramTitle.innerHTML = `${gram.title}`
    gramImage.src = `${gram.image}`
    gramLikes.innerHTML = `${gram.likes} likes`
    clickHandler(gram)

    const comments = gram.comments
    const ul = document.querySelector("ul.comments")
    gramCommentHandler(ul, comments)
};

const clickHandler = (gram) => {
    document.addEventListener("click", e => {
        if (e.target.matches(".like-button")){
            gram.likes += 1
            newGram = {
                "title": gram.title,
                "likes": gram.likes,
                "image": gram.images
            }
            patchFlataGram(newGram)
            .then(resp => {
                getFlataGram()
            })
        // } else if (e.target.matches(".delete_button")){
        //     commentId = Working on Delete
            
        }   
    })
};

const gramCommentHandler = (ul, comments) => {
    ul.innerHTML = ""
    for (let comment of comments){
        const commentLi = document.createElement("li")
        commentLi.innerText = `${comment.content}`
        commentLi.dataset.commentId = comment.id
        // const deleteButton = document.createElement("button")
        // deleteButton.innerHTML = "Delete"
        // deleteButton.className = "delete_button"
        ul.append(commentLi)
    };
};

const submitHandler = () => {
    document.addEventListener("submit", e => {
        const imageCard = document.querySelector(".image-card")
        const imageId = parseInt(imageCard.dataset.imageId)
        e.preventDefault()
        const form = e.target
        const content = form.comment.value
        contentObj = {
            "content": content,
            "imageId": imageId
        }
        postComment(contentObj)
        .then(resp => {
            form.reset()
            getFlataGram()
        })
    });
};
submitHandler();

//fetch functions

const getFlataGram = (contentObj) => {
    fetch(BASE_URL)
    .then(resp => resp.json())
    .then(renderFlataGram)
};

const patchFlataGram = (newGram) => {
    const options = {
        method: "PATCH",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(newGram)
    };

    return fetch(BASE_URL, options)
}

const postComment = (contentObj) => {
    const options = {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(contentObj)
    };
    return fetch(COMMENT_URL, options)
}
