/* modal: */
const showModalBtn = document.querySelector('.header__btn');
const modal = document.querySelector('.modal');
const hideModalBtn = document.querySelector('.modal__close');
const body = document.querySelector('body');

function showModal() {
    modal.style.display = 'flex';
    body.style.overflow = 'hidden';
}

function hideModal() {
    modal.style.display = 'none';
    body.style.overflow = '';
    
}

showModalBtn.addEventListener('click', showModal);
hideModalBtn.addEventListener('click', hideModal);
/* /modal */