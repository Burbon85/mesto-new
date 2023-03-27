export default class Card {
    constructor(data, tamplate, handlerCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._tamplate = tamplate;
        this._handlerCardClick = handlerCardClick;

    }

    _getTemplate() {
        const cardTemplate = document.querySelector(this._tamplate).content.cloneNode(true).children[0];
        return cardTemplate;
    }

    createCard() {
        this._cardTemplate = this._getTemplate();
        this._textCard = this._cardTemplate.querySelector('.element__title');
        this._imageCard = this._cardTemplate.querySelector('.element__img');
        this._deleteButton = this._cardTemplate.querySelector('.element__button_trash');
        this._cardLikeButton = this._cardTemplate.querySelector('.element__button');
        this._textCard.textContent = this._name;
        this._imageCard.src = this._link;
        this._imageCard.alt = this._name;
        this._setEventListeners();
        return this._cardTemplate;
        }    

    _setEventListeners() {
        this._imageCard.addEventListener ('click', () => {
            this._handleCardClick(this._name, this._link)
        });

        this._deleteButton.addEventListener ('click', (evt) => {
            evt.target.closest('.element').remove()
        });

        this._cardLikeButton.addEventListener ('click', (evt) => {
            evt.target.classList.toggle('element__button_active')
        });
    }

}
