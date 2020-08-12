document.addEventListener("DOMContentLoaded", () => {

  const getImage = () => {
    fetch('http://localhost:3000/images')
      .then(response => response.json())
      .then(imgObj => imgParse(imgObj))
  }








  const imgParse = (img) => {
    img.forEach(img => renderToHtml(img))
  }

  const renderToHtml = (img) => {
    let title = document.querySelector('.title')
    let imgTitle = img.title
    title.append(imgTitle)

    let imgUrl = img.image
    let image = document.querySelector(".image").src = imgUrl
  }

  const clickHandler = () => {
    document.addEventListener('click', function(e) {
      const likeBttn = document.querySelector('.like-button').innerHTML
      if (e.target.textContent === '♥'){

        var x = 0;
        var span = (document.querySelector('span'));
        span.textContent = x++;
        console.log(span)
      }else if (e.target.type === 'submit'){
        e.preventDefault()



      }




    })



  }









  clickHandler()
  getImage()
})

// let title = document.querySelector('.title')

// img.forEach(img => console.log(img))

// var value = parseInt(document.querySelector('.likes').innerText);
// value = isNaN(value) ? 0 : value;
// value++;
// document.querySelector('.likes').innerText.value = value;





/*

As a user, I can:


1.See the image received from the server, including its title, likes and comments when the page loads
  -add a DOMContentLoaded√
  -make a fetch request to URL√
  -render attributes√
  -append attributes to DOM√

2.Click on the heart icon to increase image likes, and still see them when I reload the page
  -add an event listener√
  -add an incrementor

3.Add a comment (no persistance needed)
-make a Post request

*/ //READ ME!!
