// показать ошибку, принимает форму, инпут, сообщение об ошибке
const showInputError = (formElement, inputElement, errorMessage, validateConfig) => {
    // получаем ошибку
    const inputCont = inputElement.closest(validateConfig.inputConainer);
    const errorElement = inputCont.querySelector(validateConfig.textError);
    // делаем рамку красной, добавляем класс инпуту
    inputElement.classList.add(validateConfig.typeErrorOn);
    // выдергиваем ошибку, чтобы добавить в спан и отобразить
    errorElement.textContent = errorMessage;
    // делаем видимой ошибку
    errorElement.classList.add(validateConfig.errorClass);
};

//   спрятать ошибку инпута
const hideInputError = (formElement, inputElement, validateConfig) => {
    // ловим ошибку
    const inputCont = inputElement.closest(validateConfig.inputConainer);
    const errorElement = inputCont.querySelector(validateConfig.textError);
    // Удаляем классы подчеркивания и видимости текста
    inputElement.classList.remove(validateConfig.typeErrorOn);
    errorElement.classList.remove(validateConfig.errorClass);
    // очищаем
    errorElement.textContent = '';
};

//   проверка на валидность инпута
const checkInputValidity = (formElement, inputElement, validateConfig) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, validateConfig);
    } else {
        hideInputError(formElement, inputElement, validateConfig);
    }
};

//   добавление слушателя
const setEventListeners = (formElement, validateConfig) => {
    // получаем массив всех инпутов внутри формы 
    const inputList = Array.from(formElement.querySelectorAll(validateConfig.inputSelector));
    // находим кнопку внутри формы
    const buttonElement = formElement.querySelector(validateConfig.submitButtonSelector);
    // проходим по массиву и проверяем при вводе валидность поля и меняем поведение кнопки в зависимости от валидности
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, config);
            toggleButtonState(inputList, buttonElement, config);
        });
    });
};

const enableValidation = (validateConfig) => {
    // получаем массив из всех форм
    const formList = Array.from(document.querySelectorAll(validateConfig.formSelector));
    // проходим по каждой форме
    formList.forEach((formElement) => {
        //   получаем массив "контейнера" внутри формы в котором находятся инпуты и кнопка отправки
        const fieldsetList = Array.from(formElement.querySelectorAll(validateConfig.popupSet));
        //   по каждому контейнеру проходим функцией о добавлении слушателя и проверке на валидацию
        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet, config);
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
function toggleButtonState(inputList, buttonElement, validateConfig) {
    if (hasInvalidInput(inputList, config)) {
        buttonElement.classList.add(validateConfig.inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(validateConfig.inactiveButtonClass);
        buttonElement.disabled = false;
    }
}