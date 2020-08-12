// write your code here
document.addEventListener("DOMContentLoaded", ()=> {
    //  ** See the image received from the server, including its title, 
    // ** likes and comments when the page loads.

    //  Click on the heart icon to increase image likes, 
    // and still see them when I reload the page

    //  Add a comment (no persistance needed)

    const url = 'http://localhost:3000/images/1'
    let dogLikes = document.querySelector('.likes')
    const likeButton = document.querySelector('.like-button')
    const leaveDoggoLove = document.querySelector('.comments-form')
    

    function getDoggo(){
        fetch(url)
        .then(resp => resp.json())
        .then(doggo => renderDoggo(doggo))
    }

    function renderDoggo(doggo){
        const dogTitle = document.querySelector('.title')
        const dogImage = document.querySelector('.image')
        // let dogLikes = document.querySelector('.likes')
        // put comments in array to filter
        let allComments = doggo.comments
        // console.log(allComments)
        dogTitle.innerText = doggo.title
        dogImage.src = doggo.image
        dogLikes.innerText = doggo.likes + ' Likes'
        let dogComments = document.querySelector('.comments')
        dogComments.innerText = ""

        allComments.forEach(comment => {
            const commentsLi = document.createElement('li')
            const commentsContent = comment.content
            commentsLi.innerText = commentsContent
            dogComments.append(commentsLi)
        })
    }
    
    likeButton.addEventListener('click', function(e){
        let newLikes = dogLikes.innerText = parseInt(dogLikes.innerText) + 1 + ' Likes'

        fetch(url, {
            method: 'PATCH',
            headers: {'Content-Type': 'application/json',
            'Accepts': 'application/json'},
            body: JSON.stringify({ likes: newLikes })
        })

    })
    
    
    leaveDoggoLove.addEventListener('submit', function(e){
        e.preventDefault()
        let givingDoggoLove = document.querySelector('.comment-input')
        
        let newLoveLi = document.createElement('li')
        newLoveLi.innerText = givingDoggoLove.value
        dogComments.append(newLoveLi)

    })


    getDoggo()














})