const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: '.popup__button_inactive',
    errorClass: 'popup__text-error_show',
    inputConainer: '.popup__input-conainer',
    textError: '.popup__text-error',
    popupSet: '.popup__set',
    typeErrorOn: 'form__input_type_error',
  }

// показать ошибку, принимает форму, инпут, сообщение об ошибке
const showInputError = (formElement, inputElement, errorMessage) => {
    // получаем ошибку
    const inputCont = inputElement.closest(config.inputConainer);
    const errorElement = inputCont.querySelector(config.textError);
    // делаем рамку красной, добавляем класс инпуту
    inputElement.classList.add(config.typeErrorOn);
    // выдергиваем ошибку, чтобы добавить в спан и отобразить
    errorElement.textContent = errorMessage;
    // делаем видимой ошибку
    errorElement.classList.add(config.errorClass);
};

//   спрятать ошибку инпута
const hideInputError = (formElement, inputElement) => {
    // ловим ошибку
    const errorElement = formElement.querySelector(config.textError);
    // Удаляем классы подчеркивания и видимости текста
    inputElement.classList.remove(config.typeErrorOn);
    errorElement.classList.remove(config.errorClass);
    // очищаем
    errorElement.textContent = '';
};

//   проверка на валидность инпута
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

//   добавление слушателя
const setEventListeners = (formElement) => {
    // получаем массив всех инпутов внутри формы 
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    // находим кнопку внутри формы
    const buttonElement = formElement.querySelector(config.submitButtonSelector);
    // вкл кнопку
    toggleButtonState(inputList, buttonElement);
    // проходим по массиву и проверяем при вводе валидность поля и меняем поведение кнопки в зависимости от валидности
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};


const enableValidation = (config) => {
    // получаем массив из всех форм
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    // проходим по каждой форме
    formList.forEach((formElement) => {
        // навешиваем слушатель - сбрасываем стандартные действия
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        //   получаем массив "контейнера" внутри формы в котором находятся инпуты и кнопка отправки
        const fieldsetList = Array.from(formElement.querySelectorAll(config.popupSet));
        //   по каждому контейнеру проходим функцией о добавлении слушателя и проверке на валидацию
        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet);
        });

    }
    )
}

enableValidation(config);

//   отображение неверного ввода
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

//   состояние кнопки
function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(config.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(config.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}