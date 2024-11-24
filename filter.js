/* 
1.get data.
    -from main.js maybe.
    -get filter choices from filterwindow options
    -add them to array.
2.filtrera hämtad data.
    -make sure all data is lowercase
    -get filter array from listener
    -then sort according to array.

3. send filter data to challenges.js
    -to show filtered cards

 */

// TODO: fix rating stars. Gives five hole stars sometimes.

import { createChallengeCards } from "./challenges.js";
import { array } from "./main.js";

const filterWindow = document.querySelector(".filterWindow");
filterWindow.addEventListener("change", filterFunctionWindow);

/*
# TODO:
card need to reset so that its not 300+cards -check
by-type - online/on-site - check if one or both are "checked" -not done
remove back to top button - dont wanna.

-clear existing cards before adding new ones - checked
  -delete div #content -checked

-move filtering in to a function -checked
  -filter type/rating/search/tags in to their own function - not done
  
-we might wanna remove the resetBtn and have it listening for something else.

*/

function filterFunctionWindow() {
	// grabs what we are clicking on

	// Get the value of the search input inside filterWindow
	const searchInput = filterWindow.querySelector('input[type="text"]');
	// ternary opperator aka sshorthand for an if-else statement
	const searchValue = searchInput ? searchInput.value.trim() : "";

	// Get the selected type (online or onsite or both)
	const selectedTypes = Array.from(
		filterWindow.querySelectorAll('input[name="activeItems"]:checked')
	).map((checkbox) => checkbox.value);

	// Get all checked checkboxes for tags
	// Array.from makes queryselectorall in to a "normal array so we can use . things behind it"
	const checkedTagCheckboxes = Array.from(
		filterWindow.querySelectorAll('input[name="tags"]:checked')
	);
	// Get the values of the checked tag checkboxes
	const selectedTags = checkedTagCheckboxes.map((checkbox) => checkbox.value);

	// Get the selected min and max rating values (from radio buttons)
	const minRating = filterWindow.querySelector('input[name="minRating"]:checked')?.value;
	const maxRating = filterWindow.querySelector('input[name="maxRating"]:checked')?.value;

	// apply filter logic
	const filterData = array.filter((card) => {
		let matches = true;

		// filter by search term (if there is a search term)
		// looks if the search is in the title or description
		if (
			searchValue &&
			!(
				card.title.toLowerCase().includes(searchValue.toLowerCase()) ||
				card.description.toLowerCase().includes(searchValue.toLowerCase())
			)
		) {
			matches = false;
		}
		// filters by selected tags if there are any
		// every checks if every element in the array is true
		// here it checks if slectedTags exisit in card.labels
		if (selectedTags.length > 0 && !selectedTags.every((tag) => card.labels.includes(tag))) {
			matches = false;
		}
		// filter by rating min anx max
		// here we use parsefloat to make the value of our raidoInput, from a string to a number
		if (minRating && card.rating < parseFloat(minRating)) {
			matches = false;
		}
		if (maxRating && card.rating > parseFloat(maxRating)) {
			matches = false;
		}
		// filter selected types if any are selected
		if (selectedTypes.length > 0 && !selectedTypes.includes(card.type)) {
			matches = false;
		}

		return matches;
	});

	clearCards();
	// console.log(filterData);
	createChallengeCards(filterData);
}

function clearCards() {
	document.querySelector("#content").remove();
}

// resetButton
const resetBtn = document.querySelector("#resetFilters");

resetBtn.addEventListener("click", () => {
	// reset text
	const searchInput = filterWindow.querySelector('input[type="text"]');
	searchInput.value = "";

	const tags = filterWindow.querySelectorAll('input[name="tags"]');
	tags.forEach((checkbox) => {
		checkbox.checked = false; //should uncheck
	});

	const activeCheckbox = filterWindow.querySelectorAll("input[name='activeItems'");
	activeCheckbox.forEach((checkbox) => {
		checkbox.checked = false;
	});

	const maxStars = filterWindow.querySelectorAll('input[name="maxRating"]');
	maxStars.forEach((star) => {
		star.checked = false;
	});

	const minStars = filterWindow.querySelectorAll('input[name="minRating"]');
	minStars.forEach((star) => {
		star.checked = false;
	});

	clearCards();
	createChallengeCards(array);
});
