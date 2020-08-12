// write your code here
document.addEventListener("DOMContentLoaded", ()=> {
    //  See the image received from the server, including its title, 
    // likes and comments when the page loads.

    //  Click on the heart icon to increase image likes, 
    // and still see them when I reload the page

    //  Add a comment (no persistance needed)

    const url = 'http://localhost:3000/images/1'

    function getDoggo(){
        fetch(url)
        .then(resp => resp.json())
        .then(doggo => renderDoggo(doggo))
    }

    function renderDoggo(doggo){
        const dogTitle = document.querySelector('.title')
        const dogImage = document.querySelector('.image')
        console.log(dogTitle)
    }

    getDoggo()














})