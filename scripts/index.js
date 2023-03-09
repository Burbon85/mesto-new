const popups = document.querySelectorAll('.popup'); //все попапы
const popupProfile = document.querySelector('.popup-dop');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const formProfile = document.querySelector('#popup-form-profile');
const nameInput = popupProfile.querySelector('.popup__field_type_name-profile');
const jobInput = popupProfile.querySelector('.popup__field_type_job-profile');
const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');


const popupCard = document.querySelector('.popup-add');
const popupOpenButtonAdd = document.querySelector('.profile__add-button');
// const popupCloseButtonAdd = document.querySelector('.popup-add__close');
const createButtonAdd = document.querySelector('.popup-add__submit');
const formCard = document.querySelector('#popup-add-form');
const nameInputAdd = document.querySelector('.popup__field_name');
const linkInputAdd = document.querySelector('.popup__field_link');

const cardsTamplate = document.querySelector('.element-tamplate');
const card = document.querySelector('.elements');
const cardTitleInput = document.querySelector('.popup__field_name');
const cardLinkInput = document.querySelector('.popup__field_link');

// const popupCloseButtonImage = document.querySelector('.popup-image__close')
const popupImage = document.querySelector('.popup-image'); //Открывающаяся картинка
const popupImageSubtitle = document.querySelector('.popup__subtitle-image'); //подпись картинки
const popupCardImage = document.querySelector('.popup__image'); // увеличенная картинка

const errorMessage = {'text':'Вы пропустили это поле'};

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


function createCard(data) {
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
    openPopup(popupImage);
  });

  return template;
}

function prependCard(data) {
  const template = createCard(data);
  card.prepend(template);
}

formCard.addEventListener('submit',handleFormSubmitCard);
popupOpenButtonElement.addEventListener('click', function() {openPopup(popupProfile)} );
// popupCloseButtons.addEventListener('click', closePopup);
popupCloseButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
formProfile.addEventListener('submit', handleFormSubmitProfile);
popupOpenButtonAdd.addEventListener('click', function() {openPopup(popupCard)} );
// popupCloseButtonAdd.addEventListener('click', function() {closePopup(popupCard)});
// popupCloseButtonImage.addEventListener('click', function() {closePopup(popupImage)});

initialCards.forEach(prependCard);