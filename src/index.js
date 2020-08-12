document.addEventListener("DOMContentLoaded", init)
const BASE_URL = "http://localhost:3000/images/1"
const COMMENT_URL = "http://localhost:3000/comments"


function init() {
    getFlataGram();
    getComments();
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
    
    likeHandler(gram)
};

const likeHandler = (gram) => {
    document.addEventListener("click", e => {
        if (e.target.matches(".like-button")){
            gram.likes += 1
           
            patchFlataGram(gram)
            .then(resp => {
                getFlataGram()
            })
        }
    })
};

const gramCommentHandler = (comments) => {
    const commnentsUl = document.querySelector("ul.comments")
    commnentsUl.innerHTML = ""
    for (let comment of comments){
        const commentLi = document.createElement("li")
        commentLi.innerText = `${comment.content}`
        commnentsUl.append(commentLi)
    };
};

const submitHandler = () => {
    const imageCard = document.querySelector(".image-card")
    imageId = imageCard.dataset.imageId
    document.addEventListener("submit", e => {
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
            getComments()
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

const getComments = () => {
    fetch(COMMENT_URL)
    .then(resp => resp.json())
    .then(gramCommentHandler)
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
