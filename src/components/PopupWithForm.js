import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._formElement = this._popup.querySelector('.popup__form');
        this._inputList = this._popup.querySelectorAll('.popup__field');
        this._submitButton = this._popup.querySelector('.popup__submit');
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach(input => {
        this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._handleFormSubmit(this._getInputValues());
        });
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
            input.value = data[input.name];
        })
    }

    setSubmitButtonText(text) {
        this._submitButton.textContent = text;
    }

    close() {
        super.close();
        this._formElement.reset();
    }
}