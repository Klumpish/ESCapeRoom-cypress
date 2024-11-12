const mainNavContainer = document.querySelector('.main-nav__container');

const btnOpen = document.querySelector('.btnOpen');
const btnClose = document.querySelector('.btnClose');

btnOpen.addEventListener('click', () => {
    mainNavContainer.classList.add('main-nav__container--active');
})

btnClose.addEventListener('click', () => {
    mainNavContainer.classList.remove('main-nav__container--active');
})