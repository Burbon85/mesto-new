import FormValidator from './FormValidator.js';
import Card from './Card.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import Section from './Section.js';
import UserInfo from './UserInfo.js';


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
export const sectionCardElement = document.querySelector('.elements');
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


// function openPopup(popup) {
//   popup.classList.add('popup_opened');
//   document.addEventListener('keydown', closeByEscape )  
// }

// function closePopup(popup) {
//   popup.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closeByEscape );
// }

// function closeByEscape(evt) {
//   if (evt.key === 'Escape') {
//     const openedPopup = document.querySelector('.popup_opened')
//     closePopup(openedPopup)
//   }
// }

// Создание попапа картинки с помощью класса PopupWithImage
const popupWithImage = new PopupWithImage('.popup-image', popupCardImage, popupImageSubtitle); 
popupWithImage.setEventListeners();

//Клик по картинке
function handleCardClick(name, link) {
  popupWithImage.openPopup(name,link);
}

// function handleFormSubmitProfile (evt) {
//   evt.preventDefault(); 
//   profileTitle.textContent = nameInput.value;
//   profileSubtitle.textContent = jobInput.value;
//   closePopup(popupProfile);
//   formProfile.reset();
// }

// popups.forEach((item) => {
//   item.addEventListener('click', (evt) => {
//     if (evt.target.classList.contains('popup_opened')) {
//       closePopup(item);
//     } 
//   })
// });

// function handleFormSubmitCard (evt) {
//   evt.preventDefault();
//   const data = {
//     name: cardTitleInput.value,
//     link: cardLinkInput.value,
// };
//   prependCard(data);
//   closePopup(popupCard);
//   formCard.reset();
// }


// formCard.addEventListener('submit',handleFormSubmitCard);

popupOpenButtonElement.addEventListener('click', function() {
  popupProfileWithForm.openPopup();
  return popupProfileWithForm.setInputValues(userInfo.getUserInfo()); 
  // formProfile.reset();
} );
// popupCloseButtons.forEach((button) => {
//   const popup = button.closest('.popup');
//   button.addEventListener('click', () => closePopup(popup));
// });
// formProfile.addEventListener('submit', handleFormSubmitProfile);
popupOpenButtonAdd.addEventListener('click', function() {
  popupCardWithForm.openPopup();
  formCard.reset();} );
// Функция создания карточки из класса Card
function renderCard(data) {
  const card = new Card(data, '.element-tamplate', handleCardClick);
  const cardElement = card.createCard(data);
  return cardElement;
}

// function prependCard(data) {
//   const template = renderCard(data);
//   card.prepend(template);
// }

// initialCards.forEach((data) => {
//   const cardElement = renderCard(data);
//   sectionCardElement.prepend(cardElement);
// });

//создание секции с карточками через класс Section
const cardsSection = new Section({items: initialCards, renderer: (item) => { 
  cardsSection.addItem(renderCard(item)) 
}}, 
sectionCardElement); 
cardsSection.rendererItems();

//Данные пользователя
const userInfo = new UserInfo({ 
  profileName: profileTitle, 
  profileJob: profileSubtitle
})

// создание попапа с профилем с помощью класса PopupWithForm
const popupProfileWithForm = new PopupWithForm({
  popupSelector: '.popup-dop',
  handleFormSubmit: (formValues) => {
    const data = {
      name: formValues["name"],
      info: formValues["job"]
    }
    userInfo.setUserInfo(data);
    popupProfileWithForm.closePopup();
  }
})
popupProfileWithForm.setEventListeners();

// создание попапа с созданием карточек с помощью класса PopupWithForm
const popupCardWithForm = new PopupWithForm({
  popupSelector: '.popup-add',
  handleFormSubmit: (formValues) => {
    const data = {
        name: formValues["place"],
        link: formValues["link"]
    };
    renderCard(data);
    popupCardWithForm.closePopup();
    formCard.reset();
  }
})
popupCardWithForm.setEventListeners(); 


const formProfileValidator = new FormValidator(obj, formProfile);
formProfileValidator.enableValidation();
const formCardValidator = new FormValidator(obj, formCard);
formCardValidator.enableValidation();
