
import { challengeSort } from './challenges_rating_sort.js';
import {createChallengeCards} from "./challenges.js";

const mainNavContainer = document.querySelector('.main-nav__container');


const btnOpen = document.querySelector(".btnOpen");
const btnClose = document.querySelector(".btnClose");


btnOpen.addEventListener('click', () => {
    mainNavContainer.classList.add('main-nav__container--active');
});

btnClose.addEventListener('click', () => {
    mainNavContainer.classList.remove('main-nav__container--active');
});


let array = challengeSort.ratingArray;
array = await challengeSort.getApiToArray();
console.log(array);
challengeSort.createSpanChallenge();
// 
export {array}
// 

btnOpen.addEventListener("click", () => {
	mainNavContainer.classList.add("main-nav__container--active");
});

btnClose.addEventListener("click", () => {
	mainNavContainer.classList.remove("main-nav__container--active");
});

async function challenges() {
	const res = await fetch("https://lernia-sjj-assignments.vercel.app/api/challenges");
	const data = await res.json();
	data.challenges.forEach((challenge) => {
		console.log(challenge.title);
	});
}

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
