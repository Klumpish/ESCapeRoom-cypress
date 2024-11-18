////// Challenges loading from button (All online challenges & All on-site challenges)

document.addEventListener('DOMContentLoaded', async () => {
  const currentPath = window.location.pathname; // fetch challenges.html
  const contentContainer = document.querySelector('.api-challenges'); // Show challenges
  const header = document.getElementById('header');
  const footer = document.getElementById('footer');

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
        challengeItem.classList.add('challenge-item'); // classes for challenges
        challengeItem.innerHTML = `
          <h2>${challenge.title}</h2>
          <p>${challenge.description}</p>
          <img src="${challenge.image}" alt="${challenge.title}">
          <p>Rating: ${challenge.rating}</p>
          <p>Type: ${challenge.type}</p>
          <p>Participants: ${challenge.minParticipants} - ${challenge.maxParticipants}</p>
        `;
        newContent.appendChild(challengeItem);
      });

      //new content between header and footer
      contentContainer.appendChild(newContent);

      // Temporary back to top 
      const backButton = document.createElement('button');
      backButton.textContent = 'Back to top';
      backButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
      newContent.appendChild(backButton);

    } catch (error) {
      console.error('Error fetching challenges:', error);
    }
  }

 
});



  ////// Challenges loading from button (All online challenges & All on-site challenges)
  
