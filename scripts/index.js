const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = popupElement.querySelector('.popup__field_type_name');
let jobInput = popupElement.querySelector('.popup__field_type_job');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');



const addPopupOpen = function() {
    popupElement.classList.add('popup_opened');
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
}

const closePopupOpen = function() {
    popupElement.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileTitle.textContent = nameInput.value;
    profileSubtitle.textContent = jobInput.value;
    closePopupOpen();
}


popupOpenButtonElement.addEventListener('click', addPopupOpen );

popupCloseButtonElement.addEventListener('click', closePopupOpen );

formElement.addEventListener('submit', handleFormSubmit);

