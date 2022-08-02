import Popup from "./Popup.js";

export default class PopupWhithImage extends Popup {
    constructor(selectorPopup) {
        super(selectorPopup)
    }

    open(name, link) {
        super.open();
        const _imageBig = document.querySelector('.popup__image-scale');
        const _imageBigText = document.querySelector('.popup__image-title');
        _imageBig.setAttribute('src', link);
        _imageBig.setAttribute('alt', name);
        _imageBigText.textContent = name;
    }
}