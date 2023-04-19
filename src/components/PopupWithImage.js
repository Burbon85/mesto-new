import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popup.querySelector('.popup__image');
        this._popupImageSubtitle = this._popup.querySelectorAll('.popup__subtitle-image');
      }
    
      open(name, link) {
        super.open();
        this._popupImageSubtitle.textContent = name;
        this._popupImage.src = link;
        this._popupImage.alt = name;
      }    
}

