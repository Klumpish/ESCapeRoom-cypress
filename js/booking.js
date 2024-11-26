/**
 * @author Jörgen Lindström
 */

const modal = document.querySelector("#modal");
const openModal = document.querySelectorAll(".open-button");
const openModals = document.querySelector(".open-button"); //new code
// const openModal = document.querySelector(".open-button");
const closeModal = document.querySelector(".close-modal-button");
const multiStepForm = document.querySelector("[data-multi-step]");
const formSteps = [...multiStepForm.querySelectorAll("[data-step]")];
const submitButton = multiStepForm.querySelector(".booking-card__button--submit");
const nextButton = multiStepForm.querySelector(".booking-card__button--next");
const dateInput = multiStepForm.querySelector("#simple");
const timeSelect = multiStepForm.querySelector("#time");
const participantsSelect = multiStepForm.querySelector("#participants");
const challengeInput = multiStepForm.querySelector("#challenge");
const header1 = multiStepForm.querySelector("#header1");
const header2 = multiStepForm.querySelector("#header2");

import { ApiArray as events } from "../main.js";

let eventId;
// goes through all classes of .open-button and gets rooms number."
openModal.forEach(
	(openModal) =>
		openModal.addEventListener("click", () => {
			modal.showModal();
			eventId = parseInt(openModal.getAttribute("id"));
			const eventDetails = events.find((event) => event.id === eventId);
			header1.textContent = `Book room "${eventDetails.title}" (step 1)`;

			if (challengeInput) {
				challengeInput.value = eventId;
			} else {
				console.error("The inputfield could not be found");
			}
		})
	//here
);

closeModal.addEventListener("click", () => {
	modal.close();
});

nextButton.addEventListener("click", () => {
	// eventId = parseInt(openModals.getAttribute("id"));
	console.log(eventId, "nextButton");
	const eventDetails = events.find((event) => event.id === eventId);
	header2.textContent = `Book room "${eventDetails.title}" (step 2)`;
	const date = dateInput.value;
	fetchAvailableTimes(date, eventId);

	// Fyll select med deltagarantal
	participantsSelect.innerHTML = ""; // Rensa tidigare alternativ
	for (let i = 1; i <= eventDetails.maxParticipants; i++) {
		const option = document.createElement("option");
		option.value = i;
		option.textContent = i;
		participantsSelect.appendChild(option);
	}
});

const simple = new Datepicker("#simple");

let currentStep = formSteps.findIndex((step) => {
	return step.classList.contains("active");
});

if (currentStep < 0) {
	currentStep = 0;
	showCurrentStep();
}

multiStepForm.addEventListener("click", (e) => {
	if (e.target.matches("[next-data]")) {
		currentStep += 1;
	} else if (e.target.matches("[data-previous]")) {
		currentStep -= 1;
	}
	showCurrentStep();
});

function showCurrentStep() {
	formSteps.forEach((step, index) => {
		step.classList.toggle("active", index === currentStep);
	});
}

////////////////////////////// FETCH AVAILABLE TIMESLOTS ///////////////////////

async function fetchAvailableTimes(date, challenge) {
	try {
		const res = await fetch(
			`https://lernia-sjj-assignments.vercel.app/api/booking/available-times?date=${date}&challenge=${challenge}` //date=${date}&challenge=${challenge}
		);
		if (!res.ok) {
			throw new Error(`HTTP error! Status: ${res.status}`);
		}

		const data = await res.json();

		if (Array.isArray(data.slots)) {
			data.slots.forEach((slot) => {
				const option = document.createElement("option");
				option.value = slot; // Sets the value for <option>
				option.textContent = slot; // Sets the text displayed in <option>
				timeSelect.appendChild(option); // Adds <option> in <select>
			});
		} else {
			console.log("No slots are available or slots is not an array");
		}
	} catch (error) {
		console.error("Error fetching available times", error);
	}
}

/////////////////////////////////  SUBMIT FORM ////////////////////////////////

multiStepForm.addEventListener("submit", (e) => {
	e.preventDefault(); // prevent form submission

	const formData = new FormData(multiStepForm);

	// send the data somewhere
	console.log(Object.fromEntries(formData));

	//////////////////////////////// POST DATA TO API /////////////////////////
	// async function sendBooking(){
	//   const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/booking/reservations', {
	//     method: 'POST',
	//     headers: {
	//         'Content-Type': 'application/json',
	//     },
	//     body: JSON.stringify({
	//         challenge: 12,
	//         name: "Customer Name",
	//         email: "name@example.com",
	//         date: "2024-12-12",
	//         time: "18:30",
	//         participants: 4,
	//     }),
	// });
	// const data = await res.json();
	// console.log(data);
	// }

	/////////////////////////////////// SHOW COMPLETESIGN //////////////////////////////
	submitButton.disabled = true;
	submitButton.textContent = "Submitting...";

	// mimic a server request
	setTimeout(() => {
		multiStepForm.querySelector(".multi-step-form__completed").hidden = false;
	}, 3000);
});
