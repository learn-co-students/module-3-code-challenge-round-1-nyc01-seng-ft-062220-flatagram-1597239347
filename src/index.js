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







    getImageData()
    clickHandler()
})