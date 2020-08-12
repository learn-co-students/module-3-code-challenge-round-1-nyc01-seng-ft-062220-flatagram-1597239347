// write your code here

document.addEventListener("DOMContentLoaded", function() {

    function getImageData() {
        fetch(`http://localhost:3000/images/1`)
        .then(response => response.json())
        .then(picData => {
            renderImageData(picData)
        })
    }

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







    getImageData()

})