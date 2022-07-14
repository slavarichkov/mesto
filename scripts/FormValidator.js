class FormValidator {
    constructor(config, formElement) {
        this.config = config;
        this.formElement = formElement;
        this.inputList = Array.from(this.formElement.querySelectorAll(this.config.inputSelector));
    }

    // показать ошибку, принимает форму, инпут, сообщение об ошибке
    _showInputError() {
        // подчеркнуть поле ввода красным
        const input = this.formElement.querySelector(this.config.inputSelector)
        input.classList.add(this.config.typeErrorOn);
        // найти спан 
        const inputCont = input.closest(this.config.inputConainer);
        const errorElement = inputCont.querySelector(this.config.textError);
        // выдернуть ошибку, чтобы добавить в спан и отобразить
        errorElement.textContent = input.validationMessage;
        // сделать видимой ошибку
        errorElement.classList.add(this.config.errorClass);
    }

    //   спрятать ошибку инпута
    _hideInputError() {
        // ловим ошибку
        const input = this.formElement.querySelector(this.config.inputSelector)
        const inputCont = input.closest(this.config.inputConainer);
        const errorElement = inputCont.querySelector(this.config.textError);
        // Удаляем классы подчеркивания и видимости текста
        input.classList.remove(this.config.typeErrorOn);
        errorElement.classList.add(this.config.errorClass);
        // очищаем
        errorElement.textContent = '';
    };

    //   проверка на валидность инпута
    _checkInputValidity() {
        const input = this.formElement.querySelector(this.config.inputSelector)
        if (!input.validity.valid) {
            this._showInputError();
        } else {
            this._hideInputError();
        }
    };

    //   добавление слушателя
    _setEventListeners() {
        // получаем массив всех инпутов внутри формы 
        const inputList = Array.from(this.formElement.querySelectorAll(this.config.inputSelector));
        // находим кнопку внутри формы
        const buttonElement = this.formElement.querySelector(this.config.submitButtonSelector);
        // проходим по массиву и проверяем при вводе валидность поля и меняем поведение кнопки в зависимости от валидности
        inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity();
                this._toggleButtonState();
            });
        });
    };

    //   проверить валидны ли все инпуты внутри формы
    _hasInvalidInput() {
        return this.inputList.some((input) => {
            return !input.validity.valid;
        });
    }

    //   состояние кнопки
    _toggleButtonState() {
        const buttonElement = this.formElement.querySelector(this.config.submitButtonSelector)
        if (this._hasInvalidInput()) {
            buttonElement.classList.add(this.config.inactiveButtonClass);
            buttonElement.disabled = true;
        } else {
            buttonElement.classList.remove(this.config.inactiveButtonClass);
            buttonElement.disabled = false;
        }
    }

    enableValidation() {
        const formList = Array.from(document.querySelectorAll(this.config.formSelector));
        // проходим по каждой форме
        formList.forEach(() => {
            this._setEventListeners();
        });
    }
}

export default FormValidator