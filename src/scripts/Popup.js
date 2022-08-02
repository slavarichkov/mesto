// открыть закрыть Попап

export default class Popup {
    constructor(selectorPopup) {
        this._popup = document.querySelector(selectorPopup);
        this._buttonClosePopup = this._popup.querySelector('.popup__close-button');
        this._handleEscClose = this._handleEscClose.bind(this);
        this._overlay = document.querySelector('.popup_overlay');

    }

    open(e) {
        this._popup.classList.add('popup_open');
    }

    close() {
        this._popup.classList.remove('popup_open');
        document.removeEventListener('keydown', this._handleEscClose);
        document.removeEventListener('click', this._handleOverlayClose);
        this._buttonClosePopup.removeEventListener('click', this.closePopup);
    }

    // закрыть на Esc
    _handleEscClose(e) {
        if (e.key === "Escape") {
            this.close();
        }
    }

    //закрыть кликом на оверлей
    _handleOverlayClose(e) {
        if (e.target.classList.contains('popup_overlay')) {
            this.close();
        }
    }

    // закрыть кликом на оверлей или кнопку закрытия попапа
    setEventListeners() {
        this.closePopup = () => this.close();
        this._handleOverlayClose = this._handleOverlayClose.bind(this);
        this._buttonClosePopup.addEventListener('click', this.closePopup);
        document.addEventListener('click', this._handleOverlayClose);
        document.addEventListener('keydown', this._handleEscClose);
    }
}