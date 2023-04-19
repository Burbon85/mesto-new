import './index.css'; // добавьте импорт главного файла стилей 

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import arhyz from '../images/arkhyz.jpg'
import chelyabinsk from '../images/chelyabinsk-oblast.jpg';
import ivanovo from '../images/ivanovo.jpg';
import kamchatka from '../images/kamchatka.jpg';
import kholmogorsky from '../images/kholmogorsky.jpg';
import baikal from '../images/baikal.jpg';

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

export const validationConfig = {
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
    link: arhyz
  },
  {
    name: 'Челябинская область',
    link: chelyabinsk
  },
  {
    name: 'Иваново',
    link: ivanovo
  },
  {
    name: 'Камчатка',
    link: kamchatka
  },
  {
    name: 'Холмогорский район',
    link: kholmogorsky
  },
  {
    name: 'Байкал',
    link: baikal
  }
];

// Создание попапа картинки с помощью класса PopupWithImage
const popupWithImage = new PopupWithImage('.popup-image', popupCardImage, popupImageSubtitle); 
popupWithImage.setEventListeners();

//Клик по картинке
function handleCardClick(name, link) {
  popupWithImage.open(name,link);
}

popupOpenButtonElement.addEventListener('click', function() {
  popupProfileWithForm.open();
  popupProfileWithForm.setInputValues(userInfo.getUserInfo());
} );
popupOpenButtonAdd.addEventListener('click', function() {
  popupCardWithForm.open();
  formCard.reset();} );

// Функция создания карточки из класса Card
function renderCard(data) {
  const card = new Card(data, '.element-tamplate', handleCardClick);
  const cardElement = card.createCard(data);
  return cardElement;
}

//создание секции с карточками через класс Section
const cardsSection = new Section({items: initialCards, render: (item) => { 
  cardsSection.addItem(renderCard(item)) 
}}, 
sectionCardElement); 
cardsSection.renderItems();

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
    popupProfileWithForm.close();
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
    cardsSection.addItem(renderCard(data));
    popupCardWithForm.close();
    // formCard.reset();
  }
})
popupCardWithForm.setEventListeners(); 

const formProfileValidator = new FormValidator(validationConfig, formProfile);
formProfileValidator.enableValidation();
const formCardValidator = new FormValidator(validationConfig, formCard);
formCardValidator.enableValidation();
