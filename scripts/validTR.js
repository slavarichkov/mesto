// popupFormAddImage - форма отправки изображени
// popup__input - инпут внутри формы
// ошибка в инпуте
const formError = popupInputAll.querySelector(`.${popupFormAddImage.id}-error`);

// показать уведомление
const showInputError = (popupFormAddImage, inputElement, errorMessage) => {
    // спан с ошибкой
    const errorElement = popupFormAddImage.querySelector(`.${inputElement.id}-error`);
    // изменение поля инпута
    // inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    // вкл текст ошибки
    errorElement.classList.add('popup__input_text_error');
  };

// //   скрыть уведомление
//   const hideInputError = (popupFormAddImage, inputElement) => {
//      // спан с ошибкой
//     const errorElement = popupFormAddImage.querySelector(`.${inputElement.id}-error`);
//     // изменение поля инпута
//     // inputElement.classList.remove('form__input_type_error');
//     errorElement.classList.remove('popup__input_text_error');
//     errorElement.textContent = '';
//   };
  
//   проверка на валидность
  const checkInputValidity = (popupFormAddImage, inputElement) => {
    // если инпут не валиден
    if (!inputElement.validity.valid) {
      showInputError(popupFormAddImage, inputElement, inputElement.validationMessage);
    // } else {
    //   hideInputError(popupFormAddImage, inputElement);
    // }
  };
  
  const setEventListeners = (popupFormAddImage) => {
    const inputList = Array.from(popupFormAddImage.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(popupFormAddImage, inputElement);
      });
    });
  };
  
  function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((popupFormAddImage) => {
        popupFormAddImage.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
      setEventListeners(popupFormAddImage);
  }); 
  }
  
  enableValidation();