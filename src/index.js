// document.addEventListener("DOMEventLoaded", init)

const BASE_URL = "http://localhost:3000/",
      IMAGES_URL = "images/",
      COMMENTS_URL = "comments/";

const FULL_HEART = "♥",
      EMPTY_HEART = "♡";

document.addEventListener("DOMContentLoaded", () => {

    const getPost = async () => {
        url = BASE_URL + IMAGES_URL + 1;
    
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
        };

        let response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            let data = await response.json();
            renderPost(data);
        };
    };

    const parseComments = (postComments, currentCommentSection) => {
        // currentCommentSection.innerHTML = "";
        for (const comment of postComments) {
            const li = document.createElement("li");
            li.textContent = comment.content;
            currentCommentSection.appendChild(li);
        };
    };

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
        };
    };

    const addCommentToPost = (comment, currentCommentSection) => {
        const li = document.createElement("li");
        li.textContent = comment;
        currentCommentSection.appendChild(li);
    };

    const clickHandler = () => {

        document.addEventListener("submit", e => {
            e.preventDefault();
            const commentForm = e.target,
                  commentField = commentForm.comment;

            addCommentToPost(commentField.value, commentForm.parentElement.querySelector(".comments"));
            commentForm.reset()

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
