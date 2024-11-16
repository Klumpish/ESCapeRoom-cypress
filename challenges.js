////// Challenges loading from button (All online challenges & All on-site challenges)

document.addEventListener('DOMContentLoaded', () => {
    let dataLoaded = false; 

    const originalContent = document.body.innerHTML;
  
    document.getElementById('load-challenges').addEventListener('click', async () => {
      const challengeList = document.getElementById('challenge-list');
      const container = document.querySelector('.api-challenges');
      
      if (!dataLoaded) {
        try {
          const response = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
          const data = await response.json();

           // clear all content besides header and footer
        const header = document.getElementById('header');
        const footer = document.getElementById('footer');
        document.body.innerHTML = ''; // clear content

        // Reset header & footer
        document.body.appendChild(header);
        document.body.appendChild(footer);

        // API content to body 
        const newContent = document.createElement('div');
        newContent.id = 'content';
  
          data.challenges.forEach(challenge => {
            const challengeItem = document.createElement('div');
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

          document.body.insertBefore(newContent, footer);

          const resetButton = document.createElement('button');
          resetButton.textContent = 'Återställ innehåll';
          resetButton.addEventListener('click', () => {
            document.body.innerHTML = originalContent; // Temporary reset button
          });

          newContent.appendChild(resetButton);
          
          document.body.insertBefore(newContent, footer); 

          dataLoaded = true; 
        } catch (error) {
          console.error('Error fetching the challenges:', error);
        }
      }
  
      
      if (challengeList.style.display === 'none' || challengeList.style.display === '') {
        container.style.display = 'flex';
        challengeList.style.display = 'grid';
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        challengeList.style.display = 'none';
      }
    });
  });

  ////// Challenges loading from button (All online challenges & All on-site challenges)
  
