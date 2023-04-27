export default class Card {
    constructor({data, handleCardClick, handleLike, handleDelete}, tamplate, userId) {
        this._name = data.name;
        this._link = data.link;
        this._tamplate = tamplate;
        this._handleCardClick = handleCardClick;        
        this._likes = data.likes;
        this._ownerCardUserId = data.owner._id;
        this._cardId = data._id;
        this._handleDelete = handleDelete;
        this._handleLike = handleLike;                
        this._userId = userId;
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
        this._numberLike = this._cardTemplate.querySelector('.element__number-like');
        this._numberLike.textContent = this._likes.length;
        this._setEventListeners();
        return this._cardTemplate;
        }

    _setEventListeners() {        
        this._imageCard.addEventListener ('click', () => {
            this._handleCardClick(this._name, this._link)
        });

        this._deleteButton.addEventListener ('click', () => {
            this._deleteCard();
        });

        this._cardLikeButton.addEventListener ('click', () => {
            this._handleLike(this._cardId);
        });
    }

    _deleteCard = () => {
        if (this._ownerCardUserId === this._userId) {
            this._handleDelete(this._cardId);
            } else {
        this._deleteButton.closest('.element').remove()
        }
    }
    
    toggleLike(){
        return this._likes.some(data => data._id === this._userId);
    }

    setLikes(likes) {
        this._likes = likes;
        this._numberLike.textContent = likes.length;
        if (this.toggleLike()) {
        this._cardLikeButton.classList.add('element__button_active');
        } else {
        this._cardLikeButton.classList.remove('element__button_active');
        }
    }

}
