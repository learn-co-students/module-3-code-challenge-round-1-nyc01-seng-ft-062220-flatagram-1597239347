// write your code here

document.addEventListener("DOMContentLoaded", function() {

    //#1
    function getImageData() {
        fetch(`http://localhost:3000/images/1`)
        .then(response => response.json())
        .then(picData => {
            renderImageData(picData)
        })
    }

    //#2
    const imgTag = document.querySelector('.image')
    const picDataDiv = document.querySelector('.image-card')
    function renderImageData(data) {
        imgTag.src = data.image 
        imgTag.dataset.id = data.id
        picDataDiv.children[0].innerText = data.title
        picDataDiv.children[2].children[0].innerText = data.likes+' likes'
        picDataDiv.children[3].children[0].innerText = data.comments[0].content
        picDataDiv.children[3].children[1].innerText = data.comments[1].content
        picDataDiv.children[3].children[2].innerText = data.comments[2].content
    }


    //#3 
    function clickHandler() {
        document.addEventListener('click', e => {
            if (e.target.className === "like-button") {

                const obj = {
                    method: "PATCH",
                    headers: {
                        "Content-type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        likes: parseInt(picDataDiv.children[2].children[0].innerText) + 1
                    })
                }

                fetch(`http://localhost:3000/images/1`, obj)
                .then(response => response.json())
                .then(someData => {
                    picDataDiv.children[2].children[0].innerText = someData.likes + ' likes'
                })
            }
        })
    }

    //#4
    const form = document.querySelector('form')
    const commentsList = document.querySelector('.comments')
    function addComment() {
        document.addEventListener("click", e => {             //it doesn't work with "submit"!!!
            e.preventDefault()
            if (e.target.className === "comment-button") {

                obj = {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        imageId: parseInt(imgTag.dataset.id),
                        content: form.children[0].value 
                    })
                }

                fetch(`http://localhost:3000/comments`, obj)
                .then(response => response.json())
                .then(postedData => {
                    const newComment = document.createElement('li')
                    newComment.innerText = postedData.content
                    commentsList.append(newComment)
                })
                form.children[0].value = ''
            }
        })
    }
    /////////////CORE DELIVERABLES ^^

    //#5
    const likeSection = document.querySelector(".likes-section")
    function downvote() {
        const dislike = document.createElement('button')
        dislike.className = "dislike-button"
        dislike.innerText = "♡"
        likeSection.append(dislike) 

        document.addEventListener('click', e => {
            if (e.target.className === "dislike-button") {

                obj = {
                    method: "PATCH",
                    headers: {
                        "Content-type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        likes: parseInt(picDataDiv.children[2].children[0].innerText) - 1
                    })
                }

                fetch(`http://localhost:3000/images/1`, obj)
                .then(response => response.json())
                .then(updData => {
                    picDataDiv.children[2].children[0].innerText = updData.likes + ' likes'
                })
            }
        })
    }







    getImageData()
    clickHandler()
    addComment()
    downvote()
})




    // //#4 ADDING COMMENT WITHOUT PERSISTING
    // const form = document.querySelector('form')
    // const commentsList = document.querySelector('.comments')
    // function addComment() {
    //     document.addEventListener("click", e => {             //it doesn't work with "submit"!!!
    //         e.preventDefault()
    //         if (e.target.className === "comment-button") {
    //             const newComment = document.createElement('li')
    //             newComment.innerText = form.children[0].value
    //             commentsList.append(newComment)
    //             form.children[0].value = '' //afted adding a comment the comment field should be reset 
    //         }
    //     })
    // }