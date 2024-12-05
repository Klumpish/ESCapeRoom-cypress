import { createChallengeCards } from "./challenges.js";
import { ApiArray as array } from "./main.js";

const filterWindow = document.querySelector(".filterWindow");

const searchInput = filterWindow.querySelector('input[type="text"]');

// Makes sure the user has typed at least 3 characters.
	searchInput.addEventListener("input", () => {
		if (searchInput.value.trim().length >= 3) {
			filterFunctionWindow();
		} else {
			clearCards();
			createChallengeCards(array);
		}
	});

// filterWindow.addEventListener("change", filterFunctionWindow); //

function filterFunctionWindow() {
	// grabs what we are clicking on

	// Get the value of the search input inside filterWindow

	// ternary opperator aka sshorthand for an if-else statement
	const searchValue = searchInput.value.trim().toLowerCase();

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
	// document.querySelector("#backToTopButton").remove()
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
