const avg = document.querySelector('.star-count .avg');
const ratingCount = document.querySelector('.rating-count .count');
const progressLine = document.querySelectorAll('.progress-line');
const countReview = document.querySelector('.count-review span');
const writeBtn = document.querySelector('.btn-write');
const reviewContent = document.querySelector('.review-content');
const username = document.getElementById('name');
const feedback = document.getElementById('feedback');
const submitBtn = document.querySelector('.submit');
const feedbackBox = document.querySelector('.feedback-user');
const starDiv = feedbackBox.querySelector('.stars');
const closeFeedback = document.querySelector('.close-btn .fas');

// rating 5 star when user not click
const numberStar = 5;
let userRatingStar = 5;
// initialize rating object
let ratingStars = {
    numRatings: 0,
    avgRating: 0,
};
// use for update time of feedback
let timeouts = [];
// set default value
setDefaultRating();
// set rating when page loaded
calcRating();

// initialize number of stars "5stars:0 4stars:0 3stars:0"
Array.from({ length: numberStar }, (_, i) => {
    let number = ++i; // value: 1,2,3,4,5

    ratingStars[`${number}stars`] = 0;
});
// console.log(ratingStars);

// SHOW/HIDE feedback
writeBtn.addEventListener('click', () => {
    feedbackBox.classList.add('show');
});
closeFeedback.addEventListener('click', setDefaultRating);

// submit feedback
submitBtn.addEventListener('click', () => {
    if (username.value !== '' && feedback.value !== '') {
        const options = {
            timeZone: 'Asia/Ho_Chi_Minh',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        let time = new Date().toLocaleString('en-US', options);

        reviewContent.insertAdjacentHTML(
            'afterbegin',
            `
        <div class="user-review">
            <div class="user-rating">
                <div class="username">${username.value}</div>
                <div class="stars">
                    ${setStars(userRatingStar)}
                </div>
            </div>
            <div class="comment-content">${feedback.value}</div>
            <time datetime="${time}" title="">${time}</time>
        </div>
        `
        );

        // CALC RATING AND SET TO DOM
        ratingStars[`${userRatingStar}stars`]++;
        ratingStars.numRatings++;
        calcRating();
        // UPDATE TIME FOR FEEDBACK
        for (let time of timeouts) {
            clearInterval(time);
        }
        timeouts = []; // reset
        updateTimeAgo(); // update again time for comment
        // set default value
        setDefaultRating();
    }
});

// set rating DOM
function calcRating() {
    let sumStars = 0;

    let indexProgress = 0;
    const barItems = document.querySelectorAll('.rating-bar .bar-item');
    for (let number = numberStar; number >= 1; number--) {
        let percent = 0;

        const numberOfStars = ratingStars[`${number}stars`];
        if (numberOfStars) {
            sumStars += number * numberOfStars;
            percent = ((numberOfStars / ratingStars.numRatings) * 100).toFixed(
                1
            );
        }

        barItems[indexProgress].querySelector(
            '.progress-line'
        ).style.width = `${percent}%`;
        barItems[indexProgress].querySelector(
            '.percent'
        ).textContent = `${percent}%`;

        indexProgress++;
    }

    if (ratingStars.numRatings) {
        ratingStars.avgRating = (sumStars / ratingStars.numRatings).toFixed(1);
    }

    document.querySelector('.rating-count .count').textContent =
        ratingStars.numRatings;
    document.querySelector('.count-review span').textContent =
        ratingStars.numRatings;
    document.querySelector('.star-count span').textContent =
        ratingStars.avgRating;
    document.querySelector('.avg-stars').innerHTML = setStars(
        ratingStars.avgRating
    );
}

function setDefaultRating() {
    starDiv.innerHTML = '';
    feedbackBox.classList.remove('show');
    username.value = '';
    feedback.value = '';
    userRatingStar = 5;

    Array.from({ length: numberStar }, (_, i) => {
        let number = ++i; // value: 1,2,3,4,5

        const starEle = document.createElement('i');
        starEle.classList.add('fas', 'fa-star', 'fa-fw');
        starEle.dataset.rating = number;

        starEle.addEventListener('click', () => {
            handleRating(number);
        });
        starDiv.appendChild(starEle);
    });
}
function handleRating(number) {
    const stars = feedbackBox.querySelectorAll('.stars i');
    userRatingStar = number;
    stars.forEach((star) => {
        if (number < star.dataset.rating) {
            star.classList.remove('fas');
            star.classList.add('far');
        } else {
            star.classList.add('fas');
            star.classList.remove('far');
        }
    });
}
function setStars(number) {
    let stars = '';
    Array.from({ length: numberStar }, (_, i) => {
        let starNth = 0;
        starNth = ++i;

        stars += `${
            number >= starNth
                ? "<i class='fas fa-fw fa-star'></i>"
                : number >= starNth - 0.5
                ? "<i class='fas fa-fw fa-star-half'></i>"
                : "<i class='far fa-fw fa-star'></i>"
        }`;
    });

    return stars;
}
