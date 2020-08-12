document.addEventListener("DOMContentLoaded", () => {

  const getImage = () => {
    fetch('http://localhost:3000/images')
      .then(response => response.json())
      .then(imgObj => imgParse(imgObj))
  }

  const imgParse = (img) => {
    img.forEach(img => console.log(img))











  }











  getImage()
})

// let title = document.querySelector('.title')

// img.forEach(img => console.log(img))





/*

As a user, I can:


1.See the image received from the server, including its title, likes and comments when the page loads
  -add a DOMContentLoaded√
  -make a fetch request to URL√
  -render attributes√
  -append attributes to DOM

2.Click on the heart icon to increase image likes, and still see them when I reload the page
  -add an event listener
  -add an incrementor

3.Add a comment (no persistance needed)
-make a Post request

*/ //READ ME!!
