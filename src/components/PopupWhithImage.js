import Popup from "./Popup.js";

export default class PopupWhithImage extends Popup {
    constructor(popup) {
        super(popup);
        this._imageBig = document.querySelector('.popup__image-scale');
        this._imageBigText = document.querySelector('.popup__image-title');
    }

    open(name, link) {
        super.open();
        this._imageBig.setAttribute('src', link);
        this._imageBig.setAttribute('alt', name);
        this._imageBigText.textContent = name;
    }
}