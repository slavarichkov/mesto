import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const editButton = document.querySelector('.profile__edit-button');
const popupUserInput = document.querySelector('.popup_user_input');
const closeButtonProfileEdit = document.querySelector('.popup__close-button_profile_edit');
const profileFirstName = document.querySelector('.profile__firstname');
const firstNameInput = document.querySelector('.popup__input_field_firstname');
const professionInput = document.querySelector('.popup__input_field_profession');
const profileSubText = document.querySelector('.profile__subtext');
const popupFormUserInput = document.querySelector('.popup__form_user_input');
const addImageButton = document.querySelector('.profile__add-button');
const popupImage = document.querySelector('.popup_image_content');
const popupFormAddImage = document.querySelector('.popup__form_image_add');
const popupCloseButtonImageContant = document.querySelector('.popup__close-button_image_contant');
export const imageScale = document.querySelector('.popup_image_scale');
export const imageBig = document.querySelector('.popup__image-scale');
export const imageBigText = document.querySelector('.popup__image-title');
const closeButtonBigImage = document.querySelector('.popup__close-button_image_scale');
export const containerOfImages = document.querySelector('.elements')
const buttonSubmitImageAdd = document.querySelector('.popup__button_user_image');
const popupButtoninative = document.querySelector('.popup__button_inactive')
// const elementLike = document.querySelector('.element__like');
// const userImageLoadWorkPiece = document.querySelector('.work-piece').content;
// const popupInputAll = document.querySelector('.popup__input');
// const popup = document.querySelector('.popup__form');
// const userImageLink = document.querySelector('.popup__input_link_image');
// const userImageName = document.querySelector('.popup__input_name_image');


const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    errorClass: 'popup__text-error_show',
    inputConainer: '.popup__input-conainer',
    textError: '.popup__text-error',
    popupSet: '.popup__set',
    typeErrorOn: 'form__input_type_error',
    templateClass: '.work-piece',
    imageElement: '.element__maskgroup',
    titleElement: '.element__title',
    buttonCardDelete: '.element__button-delete',
    likeImage: '.element__like',
    imageLikeactivated: 'element__like_activeted',
    element: '.element',
    containerOfelementsImage: '.elements',
}



//**Общие функции попап----------------------------------------------------------------------
// свернуть все попапы по ESС
export function closeByEscape(e) {
    if (e.keyCode === 27) {
        const openPopup = document.querySelector('.popup_open')
        closePopup(openPopup);
    }
}

// свернуть все попапы по клику на оверлей
export function closeByOverPopup(e) {
    if (e.target.classList.contains("popup_overlay")) {
        closePopup(e.target);
    }
}

export function openPopup(option) {
    option.classList.add('popup_open');
    document.addEventListener('keydown', closeByEscape);
    option.addEventListener('click', closeByOverPopup);
};

export function closePopup(option) {
    option.classList.remove('popup_open');
    option.removeEventListener('keydown', closeByEscape);
    option.removeEventListener('keydown', closeByOverPopup);
}

export function disableSubmitButton(className, buttonName) {
    buttonName.classList.add(className);
    buttonName.disabled = true;
}

//**Попап редактирования профиля-------------------------------------------------------------------------
// Открыть 
editButton.addEventListener('click', (event) => {
    openPopup(popupUserInput);
    // Поле введения имени профиля = Имя профиля
    firstNameInput.value = profileFirstName.textContent;
    // Поле введения профессии = описание профессии
    professionInput.value = profileSubText.textContent;
});

// Свернуть
closeButtonProfileEdit.addEventListener('click', () => {
    closePopup(popupUserInput);
});

// слушатель на добавление информации о юзере
popupFormUserInput.addEventListener('submit', (event) => {
    event.preventDefault();
    // Имя профиля = Поле введения имени профиля
    profileFirstName.textContent = firstNameInput.value;
    // описание профессии = Поле введения профессии 
    profileSubText.textContent = professionInput.value;
    closePopup(popupUserInput);
})

// **Попап добавления картинок пользователем**----------------------------------------------------------------------
// Открыть
addImageButton.addEventListener('click', () => {
    openPopup(popupImage);
    disableSubmitButton(popupButtoninative, buttonSubmitImageAdd);
});

// Свернуть
popupCloseButtonImageContant.addEventListener('click', () => {
    closePopup(popupImage);
    popupFormAddImage.reset();
});

// cвернуть увеличенное изображение
closeButtonBigImage.addEventListener('click', () => {
    closePopup(imageScale);
});


// слушатель на отправку формы добавления картинки**--------------------------------------------------------------------------------
const userImageNameField = document.querySelector('.popup__input_name_image');
const userLinkImg = document.querySelector('.popup__input_link_image');

popupFormAddImage.addEventListener('submit', (event) => {
    event.preventDefault();
    // addCard(userImageNameField.value, userLinkImg.value);
    newCard.addCard(userImageNameField.value, userLinkImg.value);
    popupFormAddImage.reset();
    closePopup(popupImage);
    disableSubmitButton(popupButtoninative, buttonSubmitImageAdd);
});

// **Автоматическое создание 6 карточек при запустке страницы---------------------------------------------------------------------
// массив карточек
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// создать карточку из массива
const newCard = new Card(config);
initialCards.forEach(function (item) {
    newCard.addCard(item.name, item.link);
});

//валидация формы данных пользователя
const validationFormUser = new FormValidator(config, popupUserInput);
validationFormUser.enableValidation();
//валидация формы добавления карточек
const validationFormAddCards = new FormValidator(config, popupImage);
validationFormAddCards.enableValidation();


