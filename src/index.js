import './style.css';
import getData from './modules/getData.js';
import getLikes from './modules/getlikes.js';
import likesShow from './modules/likeShow.js';
import createAppId from './modules/createAppId.js';
import postLikes from './modules/postLikes.js';
import showReservation from './modules/showReservation.js';
import createReservation from './modules/createReservation.js';
import showComments from './modules/showComments.js';

const mainItemsContainer = document.querySelector('.main_items_container');
let comments;
let reservation;
const backdrop = document.querySelector('.backdrop');
const projectID = 'jz9Xjlf6GBUQcvBtrKpI';
const dateTime = new Date();
const navContainer = document.querySelector('.nav_container');

const closePopup = () => {
  backdrop.innerHTML = '';
  backdrop.classList.add('hidden');
};

let commentHtml = '';
let commentsCounter = 0;
let reservationCounter = 0;

const commentsShow = (data) => {
  commentHtml = '';
  commentsCounter = 0;
  if (!data) return;
  data.forEach((d) => {
    commentHtml += `<p>${d.creation_date} ${d.username}: ${d.comment}</p>`;
    commentsCounter += 1;
  });
};

const reservationShow = (data) => {
  commentHtml = '';
  reservationCounter = 0;
  if (!data) return;
  data.forEach((d) => {
    commentHtml += `<p>${d.date_start} - ${d.date_end} by ${d.username}</p>`;
    reservationCounter += 1;
  });
};

const createPopupWindow = async (filteredObj, i) => {
  const data = await showComments(i, projectID);
  commentsShow(data);
  const html = `
    <div class="popup_container" id ="${filteredObj.idCategory}">

                <div class="popup_main">
                <div class = "img_btn_popup_container">
                    <img src="${filteredObj.strCategoryThumb}" alt="">
                    <i class="fas fa-times"></i>
                </div>
                    <div class="name_container">
                        ${filteredObj.strCategory}
                    </div>

                    <div class="specifications">
                        <p>${filteredObj.strCategoryDescription}</p>
                        
                    </div>

                    <div class="comments_conatiner">

                        <div class="comments_text">Comments (${commentsCounter})</div>
                        ${commentHtml || ''}

                    </div>

                    <div class="add_comment">
                        Add a comment
                    </div>

                    <form>
                        <input type="text" placeholder="Your name" class= "input_name">
                        <textarea name="" id="" cols="30" rows="10" placeholder="Your insights"></textarea>
                        <button class="form_submit_btn">Comment</button>
                    </form>

                </div>
                
            </div>
    
    `;
  backdrop.classList.remove('hidden');
  backdrop.insertAdjacentHTML('afterbegin', html);

  const closeBtn = document.querySelector('.fa-times');
  closeBtn.addEventListener('click', closePopup);

  let commentsCounterState = commentsCounter;
  const commentsTextContainer = document.querySelector('.comments_text');

  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const input = e.target.closest('form').children[0];
      const textarea = e.target.closest('form').children[1];

      const commentsContainer = e.target.closest('.popup_main').children[3];

      let html = '';

      html += `<p>2023-0${dateTime.getMonth()}-${dateTime.getDate()} ${
        input.value
      }: ${textarea.value}</p>`;

      commentsContainer.insertAdjacentHTML('beforeend', html);

      commentsCounterState += 1;
      commentsTextContainer.innerHTML = `Comments (${commentsCounterState})`;

      const { id } = e.target.closest('.popup_container');

      const response = await fetch(
        `https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/${projectID}/comments`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            item_id: id,
            username: input.value,
            comment: textarea.value,
          }),
        },
      );
    });
  });
};

const createPopupWindowReservation = async (filteredObj, i) => {
  const data = await showReservation(i, projectID);
  reservationShow(data);
  const html = `
    <div class="popup_container" id ="${filteredObj.idCategory}">

                <div class="popup_main">
                <div class = "img_btn_popup_container">
                    <img src="${filteredObj.strCategoryThumb}" alt="">
                    <i class="fas fa-times"></i>
                </div>
                    <div class="name_container">
                        ${filteredObj.strCategory}
                    </div>

                    <div class="specifications">
                        <p>${filteredObj.strCategoryDescription}</p>
                        
                    </div>

                    <div class="comments_conatiner">

                        <div class="comments_text">Reservation (${reservationCounter})</div>
                        ${commentHtml || ''}

                    </div>

                    <div class="add_comment">
                        Add a reservation
                    </div>

                    <form>
                        <input type="text" placeholder="Your name" class= "input_name">
                        <input type="text" placeholder="Start date" class= "input_name">
                        <input type="text" placeholder="End date" class= "input_name">
                        
                        <button class="form_submit_btn">Reserve</button>
                    </form>

                </div>
                
            </div>
    
    `;
  backdrop.classList.remove('hidden');
  backdrop.insertAdjacentHTML('afterbegin', html);

  const closeBtn = document.querySelector('.fa-times');
  closeBtn.addEventListener('click', closePopup);

  let reservationCounterState = reservationCounter;
  const reservationTextContainer = document.querySelector('.comments_text');

  const forms = document.querySelectorAll('form');
  forms.forEach((form) => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const inputName = e.target.closest('form').children[0];
      const inputStartDate = e.target.closest('form').children[1];
      const inputEndDate = e.target.closest('form').children[1];

      const commentsContainer = e.target.closest('.popup_main').children[3];

      let html = '';

      html += `<p> ${inputStartDate.value} - ${inputEndDate.value} by ${inputName.value}</p>`;

      commentsContainer.insertAdjacentHTML('beforeend', html);

      reservationCounterState += 1;
      reservationTextContainer.innerHTML = `Reservation (${reservationCounterState})`;

      const { id } = e.target.closest('.popup_container');

      createReservation(
        projectID,
        id,
        inputName.value,
        inputStartDate.value,
        inputEndDate.value,
      );
    });
  });
};
const createCards = async () => {
  try {
    let html = '';

    const items = await getData();
    const { categories } = items;

    const itemsCounter = categories.length;
    const itemCounterHtml = `<li class="nav_items"><a class="nav_items_links" href="#"> (${itemsCounter}) Categories</a></li><li class="nav_items"><a class="nav_items_links" href="#">Ingredients</a></li><li class="nav_items"><a class="nav_items_links" href="#">Meal Area</a></li>`;

    navContainer.innerHTML = itemCounterHtml;

    const likeID = await getLikes(projectID);

    categories.forEach((category) => {
      html += `<div id = ${category.idCategory} class="item_contianer">
                <img src="${category.strCategoryThumb}" alt="">
                <div class="name_like_conatiner">
                    <p>${category.strCategory}</p> 
                    
                    <div class="likes_heart"> 
                    <p>${
  likesShow(likeID, category)
    ? likesShow(likeID, category)
    : '0'
}</p>
                    <i class="fas fa-heart"></i>
                    </div>
                </div>
                <button class="comments popup_btn">Comments</button>
                <button class="reservation popup_btn">Reservation</button>
            </div>`;
    });

    mainItemsContainer.insertAdjacentHTML('afterbegin', html);

    comments = document.querySelectorAll('.comments');
    reservation = document.querySelectorAll('.reservation');
    const heartBtn = document.querySelectorAll('.fa-heart');

    comments.forEach((comment, i) => {
      comment.addEventListener('click', (e) => {
        const { id } = e.target.closest('.item_contianer');

        const [filteredObj] = categories.filter(
          (category) => category.idCategory === id,
        );
        createPopupWindow(filteredObj, i + 1);
      });
    });

    reservation.forEach((reserve, i) => {
      reserve.addEventListener('click', (e) => {
        const { id } = e.target.closest('.item_contianer');
        const [filteredObj] = categories.filter(
          (category) => category.idCategory === id,
        );
        createPopupWindowReservation(filteredObj, i + 1);
      });
    });

    heartBtn.forEach((heart) => {
      heart.addEventListener('click', (e) => {
        const { id } = e.target.closest('.item_contianer');
        heart.classList.toggle('colour_red');

        let likeCounter = e.target.previousElementSibling.textContent;
        likeCounter = +likeCounter;
        if (heart.classList.contains('colour_red')) {
          likeCounter += 1;
          e.target.previousElementSibling.textContent = String(likeCounter);
          postLikes(id, projectID);
        } else {
          likeCounter -= 1;
          e.target.previousElementSibling.textContent = String(likeCounter);
        }
      });
    });
    return 'Passed';
  } catch (err) {
    return 'something went wrong';
  }
};

createCards();
