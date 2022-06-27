
// показать ошибку, принимает форму, инпут, сообщение об ошибке
const showInputError = (formElement, inputElement, errorMessage) => {
    // получаем ошибку по уникальному айди
    // const aerrorElement = formElement.querySelector('.popup__text-error');
    const inputCont = inputElement.closest('.popup__input-conainer');
    const errorElement = inputCont.querySelector('.popup__text-error');
    console.log(inputElement)
    console.log(errorElement)
    console.log(formElement)
    console.log(inputCont)
    // делаем рамку красной, добавляем класс инпуту
    inputElement.classList.add('form__input_type_error');
    // выдергиваем ошибку, чтобы добавить в спан и отобразить
    errorElement.textContent = errorMessage;
    // делаем видимой ошибку
    errorElement.classList.add('popup__text-error_show');
};

//   спрятать ошибку инпута
const hideInputError = (formElement, inputElement) => {
    // ловим ошибку
    const errorElement = formElement.querySelector(`.popup__text-error`);
    // Удаляем классы подчеркивания и видимости текста
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('popup__text-error_show');
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
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    // находим кнопку внутри формы
    const buttonElement = formElement.querySelector('.popup__button');
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


const enableValidation = () => {
    // получаем массив из всех форм
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    // проходим по каждой форме
    formList.forEach((formElement) => {
        // навешиваем слушатель - сбрасываем стандартные действия
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        //   получаем массив "контейнера" внутри формы в котором находятся инпуты и кнопка отправки
        const fieldsetList = Array.from(formElement.querySelectorAll('.popup__set'));
        //   по каждому контейнеру проходим функцией о добавлении слушателя и проверке на валидацию
        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet);
            console.log(fieldSet);
        });

    }
    )
}

enableValidation();

//   отображение неверного ввода
function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

//   состояние кнопки
function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__button_inactive');
        // buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove('popup__button_inactive');
        // buttonElement.disabled = false;
    }
}