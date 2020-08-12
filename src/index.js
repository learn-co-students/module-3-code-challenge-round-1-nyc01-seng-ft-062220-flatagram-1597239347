document.addEventListener('DOMContentLoaded', function() {

     const image = document.querySelector(".image")
     const span = document.querySelector(".likes")
     const comm = document.querySelector(".comments")

     
         fetch( "http://localhost:3000/images/1")
         .then(resp => resp.json())
         .then(obj => { renderImg(obj)
          })

         function renderImg(obj){
             image.src = obj.image 
             span.innerHTML = obj.likes
             

         }
        

})

