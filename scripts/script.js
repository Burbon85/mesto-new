const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
let formElement = document.querySelector('.popup__submit');
let nameInput = popupElement.querySelector('.popup__name');
let jobInput = popupElement.querySelector('.popup__profile');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');


console.log (popupOpenButtonElement);


const addPopupOpen = function() {
    popupElement.classList.add('popup__opened');
}

const closePopupOpen = function() {
    popupElement.classList.remove('popup__opened');
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    nameInput.value = nameProfile.textContent;
    infoInput.value = infoProfile.textContent;
}


popupOpenButtonElement.addEventListener('click', addPopupOpen );

popupCloseButtonElement.addEventListener('click', closePopupOpen );

formElement.addEventListener('submit', handleFormSubmit);


