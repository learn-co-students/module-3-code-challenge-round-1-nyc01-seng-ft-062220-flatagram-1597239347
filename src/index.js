document.addEventListener("DOMContentLoaded", () => {


  const clickHandler = (likes) => {
    document.addEventListener("click", (e) => {
      const likeBttn = document.querySelector('.like-button').innerHTML
      if (e.target.textContent === '♥') {
        likes = parseInt(document.querySelector(".likes").textContent)


        likes++

        document.querySelector(".likes").textContent = likes


        // debugger


      }
    })
  }

  const getImage = () => {
    fetch('http://localhost:3000/images/1')
      .then(response => response.json())
      .then(imgObj => renderToHtml(imgObj))
  }
  const renderToHtml = (imageObj) => {
    const title = document.querySelector('.title')
    const imgTitle = imageObj.title
    title.append(imgTitle)

    const imgUrl = imageObj.image
    const image = document.querySelector(".image").src = imgUrl


    const likes = parseInt(document.querySelector(".likes").textContent)

    imageObj.comments.forEach(comment => {
      const comments = document.querySelector("body > div > div > ul")
      const listComments = document.createElement("li")
      listComments.innerText = comment.content
      comments.append(listComments)
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
