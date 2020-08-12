document.addEventListener("DOMContentLoaded", e =>{
const GETPATCHURL= "http://localhost:3000/images/1"
const COMMENTS = "http://localhost:3000/comments/"


    function clickHandler(){
        document.addEventListener("click", e =>{
            if(e.target.matches(".like-button")){
               likeThisGram(e.target)           
            }else if(e.target.matches("body > div > div > ul > li > button")){
                deleteComment(e.target)
            }
        })
        document.addEventListener("submit", e =>{
            e.preventDefault()
            submitComment(e.target)
        })
    }
   
    function deleteComment(deletebtn){
       const commmentID = deletebtn.dataset.id
       
       let config = {
           method: 'DELETE',
           headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
           }
       }
       fetch(COMMENTS+commmentID, config)
       .then(response => {
           if(response.ok){
               alert("You have successfully deleted your comment, refresh the page to ensure it is gone :)")
           }
       })
    }

    function getImages(){
        fetch(GETPATCHURL)
        .then(res => res.json())
        .then(image => {
            renderImage(image)
        })
    }

    function renderImage(image){
        const imgDiv = document.querySelector("body > div > div > img")
        const likes = document.querySelector(".likes")
        const title = document.querySelector("body > div > div > h2 ")
        
        title.innerText = image.title
        imgDiv.src = image.image
        
        image.comments.forEach(comment => {
            const comments = document.querySelector("body > div > div > ul")
            const commentsLi = document.createElement("li")
            commentsLi.innerText = comment.content 
             const button = document.createElement("button")
             button.innerHTML = "x"
             button.dataset.id = comment.id
             commentsLi.appendChild(button)
            comments.append(commentsLi)
            
        })


        if(image.likes === 1){
        likes.innerText = `${image.likes} like`
        } else {
        likes.innerText = `${image.likes} likes`
        }
    }

    function likeThisGram(likeBtn){
       const likeCount = parseInt(likeBtn.previousElementSibling.innerText[0])
       const addLike = likeCount + 1
       const likes = document.querySelector("body > div > div > div > span")
        let config = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                likes: addLike
            })
        }
        fetch(GETPATCHURL, config)
        .then(response => {
            if (response.ok){
                likes.innerText = `${parseInt(likeCount + 1)} likes`
            }
        })
    }

    function submitComment(comment){
        const comments = comment[0].value
        
        let config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                imageId: 1,
                content: comments
            })
        }
        fetch(COMMENTS, config)
        .then(response => {
            if (response.ok){
            const commentUL = document.querySelector("body > div > div > ul")
            const commentLI = document.createElement("li")
              commentLI.innerText = comments
              commentUL.append(comments)
            }
        })
        // .then(res => res.json())
        // // .then(res =>{
        // //     res.
        // // })
    }



    


    clickHandler()
    getImages()

})//DOMContentLoaded

/*
Deliverable 1
√1. Create function to Fetch images, title, likes, from the server, and pass to a render function
√2. Create render function to render to the DOM
√3. Loop through the comments and load the comments
√4. Conditionally load like vs likes for 1 comment

Deliverable 2
√1. Create an event delegation for click handler(for next deliverable) and listener to register heart icon click 
√2. Create function for like patch. Load updated likes without page refresh (load on patch request condition like status or response that like button is increasing from prior click)
√3. See updated likes on page load(already covered in last deliverable)
Weird functionality to look at where after 10 likes it restarts at 2 likes ¯\_(ツ)_/¯

Deliverabler 3
√1. Event listener for the form submit
√2. Add function for post call to add a new comment no persistance? confused. I will persist, people need to know about comments history unless user deletes

Advanced deliverables

√1. Persisting data of comments
√2. Adding buttons and delete functionality
*/