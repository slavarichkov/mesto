import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
    constructor(selectorPopup, handleSendForm) {
        super(selectorPopup);
        this._form = this._popup.querySelector('.popup__form');
        this._inputs = this._form.querySelectorAll('.popup__input');
        this.handleSendForm = handleSendForm;
    }

    // получить данные из инпута
    _getInputValues() {
        const values = {};
        this._inputs.forEach((item) => {
            values[item.name] = item.value;
        });
        return values
    }

    _handlesForm = (e) => {
        e.preventDefault();
        const valueInput = this._getInputValues();
        this.handleSendForm(valueInput);
    }

    // слушатель на сабмит формы
    setEventListeners() {
        this._form.addEventListener('submit', this._handlesForm);
        super.setEventListeners();
    }

    // сбросить форму при закрытии
    close() {
        this._form.reset();
        super.close();
    }
}