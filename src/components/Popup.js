export default class Popup {
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popup = document.querySelector(this._popupSelector);
        this._handleEscClose = this.handleEscClose.bind(this);

    }

    handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close();
        }    
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }

    setEventListeners() {  
        this._popup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains('popup_opened') || 
            evt.target.classList.contains('popup__close')) {
                this.close();
            } 
        });
    }
}