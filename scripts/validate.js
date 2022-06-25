// кнопка отправки формы добавления изображения
const buttonAddUserImage = document.querySelector('.popup__button_user_image');
// все инпуты внутри формы доб изображения. popupImage - блок, в котором кнопка и форма
const inputList = Array.from(popupImage.querySelectorAll('input'));
// все инпуты внутри формы редактирования информации пользователя
const inputListUserInfo = Array.from(popupUserInput.querySelectorAll('input'));
// кнопка отправки формы информации пользователя
const buttonAddUserInfo = document.querySelector('.popup__button_user_info');


// проверка на валидность инпута //
function isInputValid(inputElement) {
    return inputElement.checkValidity();
}
//показать ошибку //
function activateError(inputElement, message) {
    // родитель инпута для дальнейшего поиска спана
    const conteinerElement = inputElement.closest('.popup__input-conainer');
    // спан относительно родителя
    const errorText = conteinerElement.querySelector('.popup__input_text_error');
    // текст ошибки
    errorText.textContent = message;
    // добавляем видимость для ошибки ( спан внутри формы и инпута)
    errorText.classList.add('popup__input_show_error');
    //добавляем красное подчеркивание инпуту
    inputElement.classList.add('form__input_type_error');
}

// скрыть ошибку //
function deleteError(inputElement) {
    // родитель инпута для дальнейшего поиска спана
    const conteinerElement = inputElement.closest('.popup__input-conainer');
    // спан относительно родителя
    const errorText = conteinerElement.querySelector('.popup__input_text_error');
    // добавляем видимость для ошибки ( спан внутри формы и инпута)
    errorText.classList.remove('popup__input_show_error');
    //добавляем красное подчеркивание инпуту
    inputElement.classList.remove('form__input_type_error');
}

// управление кнопкой //
function controlButton(buttonName, arrayValidInput) {
    if (arrayValidInput.includes(false) === true) {
        buttonName.disabled = true;
    } else {
        buttonName.disabled = false;
    }
}

// управление показом ошибки
function controleError(inputElement, arrayValidInput) {
    if (!isInputValid(inputElement) === true) {
        activateError(inputElement, inputElement.validationMessage);
    } else {
        deleteError(inputElement)
    }
}

// Валидация формы добавления изображения-------------------------------------------------------------------------------------------------

// popupFormAddImage - форма отправки изображени **
popupFormAddImage.addEventListener('input', function (evt) {
    const arrayValidInput = []

    inputList.forEach(inputElement => {
        controleError(inputElement, arrayValidInput)
        // наполняем массив (находится в studyInputValid) значениями для проверки есть ли хоть одно невалидное поле, для функции controlButton
        arrayValidInput.push(isInputValid(inputElement))
    });

    // управление кнопкой в зависимости есть в массиве невалидные инпуты или нет
    controlButton(buttonAddUserImage, arrayValidInput);
});


// Валидация формы добавления информации пользователя-------------------------------------------------------------------------------------------------

popupFormUserInput.addEventListener('input', function (evt) {
    const arrayValidInput = []

    inputListUserInfo.forEach(inputElement => {
        controleError(inputElement, arrayValidInput);
        // наполняем массив (находится в studyInputValid) значениями для проверки есть ли хоть одно невалидное поле, для функции controlButton
        arrayValidInput.push(isInputValid(inputElement))
    });

    // управление кнопкой в зависимости есть в массиве невалидные инпуты или нет
    controlButton(buttonAddUserInfo, arrayValidInput);
});


