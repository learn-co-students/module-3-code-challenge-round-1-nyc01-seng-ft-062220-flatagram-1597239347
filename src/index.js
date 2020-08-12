document.addEventListener("DOMContentLoaded", init)
const BASE_URL = "http://localhost:3000/images/1"
const COMMENT_URL = "http://localhost:3000/comments"


function init() {
    getFlataGram();
};

const renderFlataGram = (gram) => {
    const gramTitle = document.querySelector("h2.title")
    const gramImage = document.querySelector("img.image")
    const gramLikes = document.querySelector("span.likes")
    gramTitle.innerHTML = `${gram.title}`
    gramImage.src = `${gram.image}`
    gramLikes.innerHTML = `${gram.likes} likes`

    const commnentsUl = document.querySelector("ul.comments")

    gramCommentHandler(commnentsUl, gram.comments);
    submitHandler(gram.id);
    likeHandler(gram)
};

const gramCommentHandler = (ul, comments) => {
    ul.innerHTML = ""
    for (let comment of comments){
        const commentLi = document.createElement("li")
        commentLi.innerText = `${comment.content}`
        ul.append(commentLi)
    };
};

const submitHandler = (imageId) => {
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
            getFlataGram()
        })

    });
};

const likeHandler = (gram) => {
    document.addEventListener("click", e => {
        if (e.target.matches(".like-button")){
            console.log(gram)
        }
    })
};











//fetch functions

const getFlataGram = (contentObj) => {
    fetch(BASE_URL)
    .then(resp => resp.json())
    .then(renderFlataGram)
};

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