
import { challengeSort } from './challenges_rating_sort.js';

const mainNavContainer = document.querySelector('.main-nav__container');


const btnOpen = document.querySelector(".btnOpen");
const btnClose = document.querySelector(".btnClose");


btnOpen.addEventListener('click', () => {
    mainNavContainer.classList.add('main-nav__container--active');
});

btnClose.addEventListener('click', () => {
    mainNavContainer.classList.remove('main-nav__container--active');
});

// read data from api and set it into ratingArray.
let array = challengeSort.ratingArray;
array = await challengeSort.getApiToArray();

// sort arrray in descending order.
challengeSort.sortAscendingOrder();
/* console.log(challengeSort.ratingArray, "hello hello") */
// show the three highest cards.
challengeSort.createChallenge();

btnOpen.addEventListener("click", () => {
	mainNavContainer.classList.add("main-nav__container--active");
});

btnClose.addEventListener("click", () => {
	mainNavContainer.classList.remove("main-nav__container--active");
});

/* TODO: fix Tobias code to challenge object. */
/* challengeSort.tobiasFunction() */

/* async function challenges() {
	const res = await fetch("https://lernia-sjj-assignments.vercel.app/api/challenges");
	const data = await res.json();
	data.challenges.forEach((challenge) => {
		console.log(challenge.title);
	});
} */

//FilterBtn open/close
// filterBtn  filterWindow
const filterBtnOpen = document.querySelector(".filterBtn");
const filterBtnClose = document.querySelector(".buttonX");
const filterWindow = document.querySelector(".filterWindow");
const filterBtnDiv = document.querySelector(".filterBtn__div");

filterBtnOpen.addEventListener("click", () => {
	filterWindow.classList.add("filterWindow--active");
	filterBtnDiv.classList.add("filterBtn--hidden");
});

// target the div to close
filterBtnClose.addEventListener("click", () => {
	filterWindow.classList.remove("filterWindow--active");
	filterBtnDiv.classList.remove("filterBtn--hidden");
});

// show more tags
document.querySelector("#show-more-tags-btn").addEventListener("click", (event)=>{
    const extraTags = document.querySelector("#extra-tags");
    const button = event.target;

    if(extraTags.style.display === "none"){
        extraTags.style.display = "block";
        button.textContent = "Show Less";
    } else {
        extraTags.style.display = "none"
        button.textContent = "Show More";


    }
})

/* TODO: fix Tobias code to challenge object. */
challengeSort.tobiasFunction();