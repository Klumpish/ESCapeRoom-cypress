/**
 * @author Marcus Möller
 */
const challengeSort = {
    ratingArray: [],
    /**
     * 
     * @returns {object} data Importan information 
     */
    async getApiToArray () {
        const res = await fetch('https://lernia-sjj-assignments.vercel.app/api/challenges');
        const data = await res.json();
        this.ratingArray = data.challenges;

        return this.ratingArray.sort((a, b) => b.rating - a.rating);
    },
    /**
     * Function to create img for div.
     * */
    appendImg (imageUrl) {
        const img = document.createElement('img');
        img.classList.add('card__image');
        img.src = `${imageUrl}`;
        img.alt = 'A hacker sits turned away at a computer';
    },
    /**
     * Function to convert numbers into stars.
     */
    getStars (counter, fullStars, hasHalfStar) {
        const starImg = document.createElement('img');
        starImg.classList.add('starholder__item');
        if (counter <= fullStars) {
            starImg.src = './images/star.png';
        } else if (hasHalfStar === true) {
            starImg.src = './images/star.png';
            starImg.style.clipPath = 'inset(0 50% 0 0)';
        } else {
            starImg.src = './images/star-empty.png';
        }

        return starImg;
    },
    /**
     * Function to create image for card.
     */
    createImg (imgSrc) {
        const img = document.createElement('img');
        img.classList.add('card__image');
        img.src = `${imgSrc}`;
        img.alt = 'A hacker sits turned away at a computer';
        return img;
    },
    /**
     * Function to create title for the cards.
     */
    createTitle (title) {
        const h3 = document.createElement('h3');
        h3.innerHTML = title;
        h3.classList.add('card__title');
        return h3;
    },
    /**
     * Function to create a button.
     */
    createBtn (btnParam) {
        const btn = document.createElement('a');
        btn.classList.add('button');
        btn.classList.add('red-button-small');
        btn.role = 'link';
        btn.href = '#';
        const online = 'Take challenge online';
        const onsite = 'Book this room';
        if (/* this.ratingArray[i].type */btnParam === 'online') {
            btn.innerHTML = online;
        } else {
            btn.innerHTML = onsite;
        }

        return btn;
    },
    /**
     * Function to create a challenge card.
     */
    createSpanChallenge () {
        /* console.log(this.ratingArray) */
        const cardContainer = document.querySelector('.card__container');
        /* loop through the three highest rated */
        for (let i = 0; i < 3; i++) {
            /* create div for card */
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card'); //add class for card
            /**
             * IMPORTANT Create img, create divs and more. MAKE THEM INTO function.
             */

            /* create  div card__body */
            const divCardBody = document.createElement('div');
            divCardBody.classList.add('card__body');

            /* h3 title */
            const h3String = `${this.ratingArray[i].title} (${this.ratingArray[i].type})`;
            divCardBody.append(this.createTitle(h3String)); //append to div where text is placed inside card

            /* Create div for rating and participants */
            const cardReview = document.createElement('div');
            cardReview.classList.add('card__review');
            divCardBody.append(cardReview);

            /* create rating stars div */
            const starHolder = document.createElement('div');
            starHolder.classList.add('card__starholder');

            //create span
            const holder = document.createElement('div');
            holder.classList.add('card__starholder');
            cardReview.append(holder);

            /* values to check for full stars */
            let counter = 1;
            const fullStars = Math.floor(this.ratingArray[i].rating);
            const hasHalfStar = (this.ratingArray[i].rating - fullStars) === 0.5;

            /* create spans and img for stars */
            for (let i = 0; i < 5; ++i) {
                //create span
                const span = document.createElement('span');
                holder.append(span);

                //create the stars
                const stars = this.getStars(counter, fullStars, hasHalfStar);
                counter++;
                span.append(stars);
            }

            /* Create participants div */
            const participantDiv = document.createElement('div');
            participantDiv.classList.add('card__participants');
            participantDiv.innerHTML = `${this.ratingArray[i].minParticipants}-${this.ratingArray[i].maxParticipants} participants`;
            cardReview.append(participantDiv);

            /* Create text and div to contain text */
            const divTxt = document.createElement('div');
            divTxt.classList.add('card__description');
            const txt = document.createElement('p');
            const paraString = this.ratingArray[i].description;
            txt.innerHTML = paraString;

            divTxt.append(txt);
            divCardBody.append(divTxt);

            /* Create div for button */
            const btnDiv = document.createElement('div');
            btnDiv.classList.add('card__link');

            /* Create button and append it to a div*/
            btnDiv.append(this.createBtn(this.ratingArray[i].type));

            /* append divs for cards */
            cardContainer.append(cardDiv);
            cardDiv.append(this.createImg(this.ratingArray[i].image));
            cardDiv.append(divCardBody);
            divCardBody.append(btnDiv);
        }
    }
};

export { challengeSort };