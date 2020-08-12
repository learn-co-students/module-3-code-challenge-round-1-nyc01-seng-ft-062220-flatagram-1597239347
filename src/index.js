// document.addEventListener("DOMEventLoaded", init)

const BASE_URL = "http://localhost:3000/",
      IMAGES_URL = "images/",
      COMMENTS_URL = "comments/";

const FULL_HEART = "♥",
      EMPTY_HEART = "♡";

document.addEventListener("DOMContentLoaded", () => {

    // selecting the only 'image-card' on page to incorporate server-side data


    const getPost = async () => {
        url = BASE_URL + IMAGES_URL + 1
    
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            let data = await response.json();
            renderPost(data);
        }
    }

    const updatePost = async (postObj, currentCard) => {
        url = BASE_URL + IMAGES_URL + 1;

        const options = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(postObj)
        }

        let response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            let data = await response.json();
            renderPost(data);
        }
    }

    const parseComments = (postComments, currentCommentSection) => {
        // currentCommentSection.innerHTML = "";
        for (const comment of postComments) {
            const li = document.createElement("li");
            li.textContent = comment.content;
            currentCommentSection.appendChild(li);
        }
    }

    const renderPost = (postObj) => {
        const divCard = document.querySelector("div.image-card");

        // image properities
        const imgOnCard = divCard.children[1];
        imgOnCard.src = postObj.image;

        // like properties
        const divForLikesOnCard = divCard.children[2],
                likesOnCard = divForLikesOnCard.children[0],
                likesBtn = divForLikesOnCard.children[1];
        likesOnCard.textContent = `${postObj.likes} likes`;

        // comment properties
        const commentSection = divCard.children[3];
        if (postObj.comments) {
            parseComments(postObj.comments, commentSection);
        }
    };

    const clickHandler = () => {

        document.addEventListener("submit", e => {
            e.preventDefault();
            console.log("You pressed Submit")
        });


        document.addEventListener("click", e => {
            if (e.target.textContent === FULL_HEART) {
                const divLikes = e.target.closest(".likes-section"),
                      likesOnCard = divLikes.querySelector("span");
                let currentLikesCount = parseInt(likesOnCard.textContent.split(" ")[0]);
                currentLikesCount++
                likesObj = {
                    likes: currentLikesCount
                };
                updatePost(likesObj)
            }
        });

    };
   
    getPost();
    clickHandler();
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