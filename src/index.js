document.addEventListener('DOMContentLoaded', function() {

     const image = document.querySelector(".image")
     const span = document.querySelector(".likes")
     //const comm = document.querySelector(".comments")
     //const listUl = document.getElementsByTagName( "li")
     const heart = document.querySelector(".like-button")


         fetch( "http://localhost:3000/images/1")
         .then(resp => resp.json())
         .then(obj => { renderImg(obj)
          })

         function renderImg(obj){
             image.src = obj.image 
             span.innerHTML = `${obj.likes} likes`
             
         }

         heart.addEventListener("click", function(e) { 
                let options = {
                    method: "PATCH",
                    headers: {
                      "Content-Type": "application/json",
                      "Accept": "application/json"
                    },
                    body: JSON.stringify({                  
                    })
                }
            
              fetch ( "http://localhost:3000/images/1" + options)
              .then(res => {res.json()})
              .then(resp=> {console.log(resp)})
        })

         


        
        

})

