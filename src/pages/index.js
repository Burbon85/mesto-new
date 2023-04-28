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
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';

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

export const avatarProfile = document.querySelector('.profile__avatar');
export const avatarHoverProfile = document.querySelector('.profile__avatar_hover');
export const formAvatar = document.querySelector('#popup-avatar-form');

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

const popupWithConfirmation = new PopupWithConfirmation('.popup-delete');
popupWithConfirmation.setEventListeners();

//Данные пользователя
const userInfo = new UserInfo({ 
  profileName: profileTitle, 
  profileJob: profileSubtitle,
  profileAvatar: avatarProfile
})
// console.log(userInfo);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '68cde520-ac6c-40b9-a1ad-21ed7cb7863b',
    'Content-Type': 'application/json'
  }
});

api.getNeededAll()
.then((result) => {
  const [forUserInfo, forInitialCards] = result;
  userInfo.setUserInfo(forUserInfo);
  userInfo.setUserAvatar(forUserInfo.avatar);
  const initialCards = forInitialCards;
  cardsSection.renderItems(initialCards);
})
.catch(error => console.log(error))

const cardsSection = new Section(
  {
    render: (data) => {
      cardsSection.appendItem(renderCard(data));
    }
  },
  sectionCardElement
);

popupOpenButtonElement.addEventListener('click', function() {
  popupProfileWithForm.open();
  popupProfileWithForm.setInputValues(userInfo.getUserInfo());
} );
popupOpenButtonAdd.addEventListener('click', function() {
  popupCardWithForm.open();
  formCard.reset();
});
avatarHoverProfile.addEventListener('click', function() {
  popupAvatarWithForm.open();
  // formAvatar.reset();
});


// Функция создания карточки из класса Card
function renderCard(data) {
  // const card = new Card(data, '.element-tamplate', handleCardClick);
  // const cardElement = card.createCard(data);
  // return cardElement;
  const card = new Card({
    data: data,
    handleCardClick: (name, link) => {
      popupWithImage.open(name, link);      
    },
    handleDelete: (cardId) => {
      popupWithConfirmation.open();
      popupWithConfirmation.closeCallBack(() => {
        api.deleteCard(cardId)
          .then(() => {
            popupWithConfirmation.close();
            card.remove();
          })
          .catch(err => console.log(err))
      });
    },
    handleLike: (cardId) => {
      if(card.toggleLike()) {
        api.deleteLike(cardId)
          .then((response) => {
            card.setLikes(response.likes);
          })
          .catch(err => console.log(err))
      } else {
        api.putLike(cardId)
          .then((response) => {
            card.setLikes(response.likes);
          })
          .catch(err => console.log(err))
      }
    }
  },
  '.element-tamplate',
  userInfo.getUserId());
  const cardTemplate = card.createCard();
  // console.log(cardTemplate);
  return cardTemplate;  
}

// создание попапа с профилем с помощью класса PopupWithForm
const popupProfileWithForm = new PopupWithForm({
  popupSelector: '.popup-dop',
  handleFormSubmit: (formValues) => {
    const data = {
      name: formValues["name"],
      about: formValues["job"]
    }    
    popupProfileWithForm.setSubmitButtonText("Сохранение...");
    api.patchUserInfo(data)
      .then(() => {
        userInfo.setUserInfo(data);
        popupProfileWithForm.close();
      })    
      .catch(error => console.log(error))
      .finally(() => {
        popupProfileWithForm.setSubmitButtonText("Сохранить");
      });
    // userInfo.setUserInfo(data);
    // popupProfileWithForm.close();
  }
})
popupProfileWithForm.setEventListeners();

// создание попапа с созданием карточек с помощью класса PopupWithForm
const popupCardWithForm = new PopupWithForm({
  popupSelector: '.popup-add',
  handleFormSubmit: (formValues) => {
    popupCardWithForm.setSubmitButtonText("Создание...");
    api.createNewCard(formValues)
    .then((response) => {
      cardsSection.addItem(renderCard(response));
      popupCardWithForm.close();
    })
    .catch(error => console.log(error))
    .finally(() => {
      popupCardWithForm.setSubmitButtonText("Создать");
    });
  }
})
popupCardWithForm.setEventListeners();

const popupAvatarWithForm = new PopupWithForm({
  popupSelector: '.popup-avatar',
  handleFormSubmit: (formValues) => {
    const avatar = formValues["popup__field_avatar"];

    popupAvatarWithForm.setSubmitButtonText("Сохранение...");
    api.patchAvatar(avatar)
      .then(() => {
        popupAvatarWithForm.close();
        userInfo.setUserAvatar(avatar);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        popupAvatarWithForm.setSubmitButtonText("Сохранить");
      });
  }
});
popupAvatarWithForm.setEventListeners();

const formProfileValidator = new FormValidator(validationConfig, formProfile);
formProfileValidator.enableValidation();
const formCardValidator = new FormValidator(validationConfig, formCard);
formCardValidator.enableValidation();
const formAvatarValidator = new FormValidator(validationConfig, formAvatar);
formAvatarValidator.enableValidation();
