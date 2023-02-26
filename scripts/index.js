const popup = document.querySelectorAll('.popup-dop'); //все попапы
const popupElement = document.querySelector('.popup');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupCloseButtonElement = popupElement.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = popupElement.querySelector('.popup__field_type_name');
let jobInput = popupElement.querySelector('.popup__field_type_job');
let profileTitle = document.querySelector('.profile__title');
let profileSubtitle = document.querySelector('.profile__subtitle');
const saveButtonProfile = document.querySelector('.popup__submit');

const popupElementAdd = document.querySelector('.popup-add');
const popupOpenButtonAdd = document.querySelector('.profile__add-button');
const popupCloseButtonAdd = document.querySelector('.popup-add__close');
const createButtonAdd = document.querySelector('.popup-add__submit');
let formElementAdd = document.querySelector('.popup-add__form');
let nameInputAdd = document.querySelector('.popup-add__name');
let linkInputAdd = document.querySelector('.popup-add__link');

const cardsTamplate = document.querySelector('.element-tamplate');
const cards = document.querySelector('.elements');
const cardTitleInput = document.querySelector('.popup-add__name');
const cardLinkInput = document.querySelector('.popup-add__link');

const popupCloseButtonImage = ('.popup-image__close')
const popupImage = document.querySelector('.popup-image'); //Открывающаяся картинка
const popupImageSubtitle = document.querySelector('.popup-image__subtitle'); //подпись картинки
const popupCardImage = document.querySelector('.popup-image__image'); // увеличенная картинка


const initialCards = [
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


function PopupOpen(popup) {
  popup.classList.add('popup_opened');  
}

function PopupClose(popup) {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault(); 
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  PopupClose(popupElement);
}

popup.forEach((item) => {
  item.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      PopupClose(item);
    }
    else if (evt.target.classList.contains('popup__close'||'popup-add__close'||'popup-image__close')) {
      PopupClose(item);
    }
  })
});

function handleFormSubmitAdd (evt) {
  evt.preventDefault();
  const data = {
    name: cardTitleInput.value,
    link: cardLinkInput.value,
};
  prependCard(data);
  PopupClose(popupElementAdd);
}


function clone(data) {
  const template = document.querySelector('.element-tamplate').content.querySelector('.element').cloneNode(true);
  const textCard = template.querySelector('.element__title');
  const imageCard = template.querySelector('.element__img');
  template.querySelector('.element__button_trash').addEventListener('click', function (evt) {
    evt.target.closest('.element').remove()
  });
  template.querySelector('.element__button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__button_active')
  });  
  textCard.textContent = data.name;
  imageCard.src = data.link;
  imageCard.alt = data.name;

  imageCard.addEventListener('click', function() {
    popupImageSubtitle.textContent = textCard.textContent;
    popupCardImage.src = imageCard.src;  
    popupCardImage.alt = textCard.textContent;
    PopupOpen(popupImage);
  });

  return template;
}

function createCard(data) {
  const template = clone(data);
  cards.prepend(template);
}

function prependCard(data) {
  const template = createCard(data);
  cardsSection.prepend(template);
}


formElementAdd.addEventListener('submit',handleFormSubmitAdd);
popupOpenButtonElement.addEventListener('click', function() {PopupOpen(popupElement)} );
popupCloseButtonElement.addEventListener('click',  function(){PopupClose(popupElement)} );
formElement.addEventListener('submit', handleFormSubmit);
popupOpenButtonAdd.addEventListener('click', function() {PopupOpen(popupElementAdd)} );
popupCloseButtonAdd.addEventListener('click', function() {PopupClose(popupElementAdd)});
popupCloseButtonImage.addEventListener('click', function() {PopupClose(popupImage)});

initialCards.forEach(createCard);