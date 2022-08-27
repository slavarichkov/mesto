import Popup from "./Popup.js";

export default class PopupWhithImage extends Popup {
    constructor(popup) {
        super(popup);
    }

    open(name, link) {
        super.open();
        this._imageBig.setAttribute('src', link);
        this._imageBig.setAttribute('alt', name);
        this._imageBigText.textContent = name;
    }
}