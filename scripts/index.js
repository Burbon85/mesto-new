import FormValidator from './FormValidator.js';
import Card from './Card.js';


export const popups = document.querySelectorAll('.popup'); //все попапы
export const popupProfile = document.querySelector('.popup-dop');
export const popupOpenButtonElement = document.querySelector('.profile__edit-button');
export const popupCloseButtons = document.querySelectorAll('.popup__close');
export const formProfile = document.querySelector('#popup-form-profile');
export const nameInput = popupProfile.querySelector('.popup__field_type_name-profile');
export const jobInput = popupProfile.querySelector('.popup__field_type_job-profile');
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');


export const popupCard = document.querySelector('.popup-add');
export const popupOpenButtonAdd = document.querySelector('.profile__add-button');
// const popupCloseButtonAdd = document.querySelector('.popup-add__close');
export const createButtonAdd = document.querySelector('.popup-add__submit');
export const formCard = document.querySelector('#popup-add-form');
export const nameInputAdd = document.querySelector('.popup__field_name');
export const linkInputAdd = document.querySelector('.popup__field_link');

export const cardsTamplate = document.querySelector('.element-tamplate');
export const card = document.querySelector('.elements');
export const cardTitleInput = document.querySelector('.popup__field_name');
export const cardLinkInput = document.querySelector('.popup__field_link');

// const popupCloseButtonImage = document.querySelector('.popup-image__close')
export const popupImage = document.querySelector('.popup-image'); //Открывающаяся картинка
export const popupImageSubtitle = document.querySelector('.popup__subtitle-image'); //подпись картинки
export const popupCardImage = document.querySelector('.popup__image'); // увеличенная картинка

// const saveButton = document.querySelectorAll('.popup__submit');
export const errorMessage = {'text':'Вы пропустили это поле'};

export const obj = {
  formElement: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_inactive',
  inputError: 'popup__field-error',
  activeError: 'popup__field-error_active'
  };

export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const cardsContainer = document.querySelector('.element-tamplate').content;


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape )  
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape );
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup)
  }
}

function handleFormSubmitProfile (evt) {
  evt.preventDefault(); 
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfile);
  formProfile.reset();
}

popups.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(item);
    } 
  })
});

function handleFormSubmitCard (evt) {
  evt.preventDefault();
  const data = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
};
  prependCard(data);
  closePopup(popupCard);
  formCard.reset();
}


// function createCard(data) {
//   const template = document.querySelector('.element-tamplate').content.querySelector('.element').cloneNode(true);
//   const textCard = template.querySelector('.element__title');
//   const imageCard = template.querySelector('.element__img');
//   template.querySelector('.element__button_trash').addEventListener('click', function (evt) {
//     evt.target.closest('.element').remove()
//   });
//   template.querySelector('.element__button').addEventListener('click', function (evt) {
//     evt.target.classList.toggle('element__button_active')
//   });  
//   textCard.textContent = data.name;
//   imageCard.src = data.link;
//   imageCard.alt = data.name;

//   imageCard.addEventListener('click', function() {
//     popupImageSubtitle.textContent = textCard.textContent;
//     popupCardImage.src = imageCard.src;  
//     popupCardImage.alt = textCard.textContent;
//     openPopup(popupImage);
//   });

//   return template;
// }



formCard.addEventListener('submit',handleFormSubmitCard);
popupOpenButtonElement.addEventListener('click', function() {
  openPopup(popupProfile);
  formProfile.reset();} );
popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
formProfile.addEventListener('submit', handleFormSubmitProfile);
popupOpenButtonAdd.addEventListener('click', function() {
  openPopup(popupCard);
  formCard.reset();} );
// Функция создания карточки из класса Card
function renderCard(data) {
  const card = new Card(data, '.element-tamplate', openPopup);
  const cardElement = card.createCard(data);
  return cardElement;
}

function prependCard(data) {
  const template = renderCard(data);
  card.prepend(template);
}

initialCards.forEach((data) => {
  const cardElement = renderCard(data);
  cardsContainer.prepend(cardElement);
});


const formProfileValidator = new FormValidator(obj, formProfile);
formProfileValidator.enableValidation();
const formCardValidator = new FormValidator(obj, formCard);
formCardValidator.enableValidation();
