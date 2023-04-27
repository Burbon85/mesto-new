import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup{
    constructor(PopupSelector) {
        super(PopupSelector);
        this._formElement =  this._popup.querySelector('.popup__container-delete');
        this._submitButton = this._formElement.querySelector('.popup__submit-delete');
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (e) => {
            e.preventDefault();
        this._handleFormSubmit();
        });
    }

    open() {
        super.open();
        this._submitButton.focus();
    }

    closeCallBack(callback) {
        this._handleFormSubmit = callback;        
    }
}