/**
 *
 * @author Marcus och Tobias
 */
////// Challenges loading from button (All online challenges & All on-site challenges)
/**
 * Function to read from array and dynamically make challenge cards.
 */
function createChallengeCards(challengeArray) {
	const currentPath = window.location.pathname; // fetch challenges.html
	const contentContainer = document.querySelector(".api-challenges"); // Show challenges

	// Dynamic loading of challenges.js only if location is challenge.html

	if (currentPath.includes("challenges.html")) {
		try {
			/* const challengeArray = array; */
			console.log(challengeArray);

			// Create new container for API
			const newContent = document.createElement("div");
			newContent.id = "content";

			challengeArray.forEach((challenge) => {
				// Write out the order of challenge
				const challengeItem = document.createElement("div");
				challengeItem.classList.add("card"); // classes for challenges

				// Create card structure manually instead of innerHTML
				const img = document.createElement("img");
				img.classList.add("card__image");
				img.src = challenge.image;
				img.alt = challenge.title;

				const cardBody = document.createElement("div");
				cardBody.classList.add("card__body");

				const title = document.createElement("h3");
				title.classList.add("card__title");
				title.textContent = `${challenge.title} (${
					challenge.type === "onsite" ? "on-site" : "online"
				})`;

				const review = document.createElement("div");
				review.classList.add("card__review"); //Adding cardparticipants in review

				//creates div to hold the stars for card__review
				const starHolder = document.createElement("div");
				starHolder.classList.add("card__starholder");

				// create span and append stars
				for (let i = 1; i <= 5; ++i) {
					// create span
					const span = document.createElement("span");

					// check full star or half star or empty star.
					const fullStars = Math.floor(challenge.rating); // gives the value of fullStars
					const hasHalfStar = challenge.rating - fullStars === 0.5; // true if halfStar

					// create image
					const starImg = document.createElement("img");
					/* starImg.classList.add('card__image'); */
					starImg.classList.add("starholder__item");
					starImg.alt = "";

					//compare half or hole star and decides which star.
					if (i <= fullStars) {
						starImg.src = "./images/star.png";
					} else if (hasHalfStar === true && i === fullStars + 1) {
						starImg.src = "./images/half-star.png";
					} else {
						starImg.src = "./images/star-empty.png";
					}

					// append star to span
					span.append(starImg);

					// append span to starHolder
					starHolder.appendChild(span);
				}

				// creates text for participants.
				const participants = document.createElement("div");
				participants.classList.add("card__participants");
				participants.textContent = `${challenge.minParticipants} - ${challenge.maxParticipants} participants`;

				//append starHolder to review before participants
				review.append(starHolder);
				review.appendChild(participants);

				const description = document.createElement("div");
				description.classList.add("card__description");
				const p = document.createElement("p");
				p.textContent = challenge.description; // Challenge description
				description.appendChild(p);

				const link = document.createElement("div");
				link.classList.add("card__link");
				const button = document.createElement("a");
				button.classList.add("button", "red-button-small");
				button.textContent = `${
					challenge.type === "onsite" ? "Book this room" : "Take challenges online"
				}`;
				link.appendChild(button);

				// To show in order
				cardBody.appendChild(title);
				cardBody.appendChild(review);
				cardBody.appendChild(description);
				cardBody.appendChild(link);
				challengeItem.appendChild(img);
				challengeItem.appendChild(cardBody);
				newContent.appendChild(challengeItem);
			});

			// The new content is between header & footer
			contentContainer.appendChild(newContent);

			// Temporary back to top button
			const backButton = document.createElement("button");
			backButton.textContent = "Back to top";
			backButton.addEventListener("click", () => {
				window.scrollTo({ top: 0, behavior: "smooth" });
			});
			newContent.appendChild(backButton);

			//Error message in console if error occurs
		} catch (error) {
			console.error("Error fetching challenges:", error);
		}
	}
}

export { createChallengeCards };
