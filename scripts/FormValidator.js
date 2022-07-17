class FormValidator {
    constructor(config, formElement) {
        this.config = config;
        this.formElement = formElement;
        this.inputList = Array.from(this.formElement.querySelectorAll(this.config.inputSelector));
    }

    // показать ошибку, принимает форму, инпут, сообщение об ошибке
    _showInputError() {
        // подчеркнуть поле ввода красным
        this.input = this.formElement.querySelector(this.config.inputSelector)
        this.input.classList.add(this.config.typeErrorOnClass);
        // найти спан 
        this.inputCont = this.input.closest(this.config.inputConainerSelector);
        this.errorElement = this.inputCont.querySelector(this.config.textErrorSelector);
        // выдернуть ошибку, чтобы добавить в спан и отобразить
        this.errorElement.textContent = this.input.validationMessage;
        // сделать видимой ошибку
        this.errorElement.classList.add(this.config.errorClass);
    }


    //   спрятать ошибку инпута
    _hideInputError() {
        // Удаляем классы подчеркивания и видимости текста
        this.input.classList.remove(this.config.typeErrorOnClass);
        this.errorElement.classList.add(this.config.errorClass);
        // очищаем
        this.errorElement.textContent = '';
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
        // проходим по массиву и проверяем при вводе валидность поля и меняем поведение кнопки в зависимости от валидности
        this.inputList.forEach((input) => {
            input.addEventListener('input', () => {
                this._checkInputValidity();
                this._toggleButtonState();
            });
        });
    };

    disableSubmitButton() {
        this.buttonElement = this.formElement.querySelector(this.config.submitButtonSelector);
        this.buttonElement.classList.add(this.config.inactiveButtonClass);
        this.buttonElement.disabled = true;
    }

    //   проверить валидны ли все инпуты внутри формы
    _hasInvalidInput() {
        return this.inputList.some((input) => {
            return !input.validity.valid;
        });
    }

    //   состояние кнопки
    _toggleButtonState() {

        if (this._hasInvalidInput()) {
            this.buttonElement.classList.add(this.config.inactiveButtonClass);
            this.buttonElement.disabled = true;
        } else {
            this.buttonElement.classList.remove(this.config.inactiveButtonClass);
            this.buttonElement.disabled = false;
        }
    }

    enableValidation() {
        this.formList = Array.from(document.querySelectorAll(this.config.formSelector));
        // проходим по каждой форме
        this.formList.forEach(() => {
            this._setEventListeners();
        });
    }
}

export default FormValidator