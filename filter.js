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


// asdasd

import { createChallengeCards } from "./challenges.js";
import { array } from "./main.js";

const filterWindow = document.querySelector(".filterWindow");
filterWindow.addEventListener("change", filterFunctionWindow);


/*
#TODO 
card need to reset so that its not 300+cards
by-type - online/on-site not working
remove back to top button

-clear existing cards before adding new ones
  -delete div #content

-move filtering in to a function
  -filter type/rating/search/tags in to there own function

*/

function filterFunctionWindow () {
  // grabs what we are clicking on

	// Get the value of the search input inside filterWindow
	const searchInput = filterWindow.querySelector('input[type="text"]');
	// ternary opperator aka sshorthand for an if-else statement
	const searchValue = searchInput ? searchInput.value.trim() : "";

	// Get the checkbox for active items
	// checkboxes "name put to activeItems"
	// Get the selected type (online or onsite)
	const selectedTypeRadio = filterWindow.querySelector('input[name="activeItems"]:checked');
	const selectedType = selectedTypeRadio ? selectedTypeRadio.value : "";

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
				card.title.toLowerCase().includes(searchValue) ||
				card.description.toLowerCase().includes(searchValue)
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

		if (selectedType && card.type !== selectedType) {
			matches = false;
		}

		return matches;
	});

	console.log(filterData);
	createChallengeCards(filterData);
}

function clearCards(){
  document.querySelector("#content").remove();
}