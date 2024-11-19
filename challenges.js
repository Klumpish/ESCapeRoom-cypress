////// Challenges loading from button (All online challenges & All on-site challenges)

document.addEventListener('DOMContentLoaded', async () => {
  const currentPath = window.location.pathname; // fetch challenges.html
  const contentContainer = document.querySelector('.api-challenges'); // Show challenges

  // Dynamic loading of challenges.js only if location is challenge.html 
  
  if (currentPath.includes('challenges.html')) {
    try {
      const response = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
      const data = await response.json();

      // Create new container for API 
      const newContent = document.createElement('div');
      newContent.id = 'content';

      data.challenges.forEach(challenge => {
        const challengeItem = document.createElement('div');
        challengeItem.classList.add('card'); // classes for challenges

        // Create card structure manually instead of innerHTML
        const img = document.createElement('img');
        img.classList.add('card__image');
        img.src = challenge.image;
        img.alt = challenge.title;

        const cardBody = document.createElement('div');
        cardBody.classList.add('card__body');

        const title = document.createElement('h3');
        title.classList.add('card__title');
        title.textContent = `${challenge.title} (${challenge.type === 'onsite' ? 'on-site' : 'online'})`;

        const review = document.createElement('div');
        review.classList.add('card__review');

        const participants = document.createElement('div');
        participants.classList.add('card__participants');
        participants.textContent = `${challenge.minParticipants} - ${challenge.maxParticipants} participants`;

        const description = document.createElement('div');
        description.classList.add('card__description');
        const p = document.createElement('p');
        p.textContent = challenge.description; // Challenge description
        description.appendChild(p);

        const link = document.createElement('div');
        link.classList.add('card__link');
        const button = document.createElement('a');
        button.classList.add('button', 'red-button-small');
        button.textContent = 'Book this room';
        link.appendChild(button);

        // To show in order
        cardBody.appendChild(title);
        cardBody.appendChild(review);
        cardBody.appendChild(participants);
        cardBody.appendChild(description);
        cardBody.appendChild(link);
        challengeItem.appendChild(img);
        challengeItem.appendChild(cardBody);
        newContent.appendChild(challengeItem);
      });

      // The new content is between header & footer
      contentContainer.appendChild(newContent);

      // Temporary back to top button
      const backButton = document.createElement('button');
      backButton.textContent = 'Back to top';
      backButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      newContent.appendChild(backButton);

      //Error message in console if error occurs 

    } catch (error) {
      console.error('Error fetching challenges:', error);
    }
  }
});


  ////// Challenges loading from button (All online challenges & All on-site challenges)
  
