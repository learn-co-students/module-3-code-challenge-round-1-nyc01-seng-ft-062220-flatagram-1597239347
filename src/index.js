// document.addEventListener("DOMEventLoaded", init)

const BASE_URL = "http://localhost:3000/",
      IMAGES_URL = "images/",
      COMMENTS_URL = "comments/";

document.addEventListener("DOMContentLoaded", () => {

    // selecting the only 'image-card' on page to incorporate server-side data


    const getImages = async () => {
        url = BASE_URL + IMAGES_URL
    
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            let data = await response.json();
            renderImage(data[0]);
        }
    }

    const renderImage = (imageObj) => {
        const divCard = document.querySelector("div.image-card");
        const imgOnCard = divCard.children[1];
        imgOnCard.src = imageObj.image;

    }
    getImages()
});



/* 

Core Deliverables
- As a user, I can:

See the image received from the server, including its title, likes and comments when the page load
  -- grab image card
  -- render data to car

Click on the heart icon to increase image likes, and still see them when I reload the page
Add a comment (no persistance needed)

    -- toggle the heart button with listeners
    -- persist this stat to DB via patch








*/