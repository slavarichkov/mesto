import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

const buttonEdit = document.querySelector('.profile__edit-button');
const popupUserInput = document.querySelector('.popup_user_input');
const buttonCloseProfileEdit = document.querySelector('.popup__close-button_profile_edit');
const profileFirstName = document.querySelector('.profile__firstname');
const firstNameInput = document.querySelector('.popup__input_field_firstname');
const professionInput = document.querySelector('.popup__input_field_profession');
const profileSubText = document.querySelector('.profile__subtext');
const popupFormUserInput = document.querySelector('.popup__form_user_input');
const imageAddButton = document.querySelector('.profile__add-button');
const popupImage = document.querySelector('.popup_image_content');
const popupFormAddImage = document.querySelector('.popup__form_image_add');
const popupCloseButtonImageContant = document.querySelector('.popup__close-button_image_contant');
export const imageScale = document.querySelector('.popup_image_scale');
export const imageBig = document.querySelector('.popup__image-scale');
export const imageBigText = document.querySelector('.popup__image-title');
const buttonCloseBigImage = document.querySelector('.popup__close-button_image_scale');
export const containerOfImages = document.querySelector('.elements')



const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    errorClass: 'popup__text-error_show',
    inputConainerSelector: '.popup__input-conainer',
    textErrorSelector: '.popup__text-error',
    popupSetSelector: '.popup__set',
    typeErrorOnClass: 'form__input_type_error',
    templateSelector: '.work-piece',
    imageElementSelector: '.element__maskgroup',
    titleElementSelector: '.element__title',
    buttonCardDeleteSelector: '.element__button-delete',
    likeImageSelector: '.element__like',
    imageLikeactivatedClass: 'element__like_activeted',
    elementSelector: '.element',
}



//**Общие функции попап----------------------------------------------------------------------
// свернуть все попапы по ESС
function closeByEscape(e) {
    if (e.key === "Escape") {
        const popupOpen = document.querySelector('.popup_open')
        closePopup(popupOpen);
    }
}

// свернуть все попапы по клику на оверлей
function closeByOverPopup(e) {
    if (e.target.classList.contains("popup_overlay")) {
        closePopup(e.target);
    }
}

export function popupOpen(option) {
    option.classList.add('popup_open');
    document.addEventListener('keydown', closeByEscape);
    option.addEventListener('click', closeByOverPopup);
};

function closePopup(option) {
    option.classList.remove('popup_open');
    document.removeEventListener('keydown', closeByEscape);
    option.removeEventListener('keydown', closeByOverPopup);
}

// добавить изображение -------------------------------------------------
function createNewCard(name, link) {
    const newCard = new Card(config, controlScaleImage);
    const returnImageUser = newCard._fillTemplate(name, link);
    containerOfImages.prepend(returnImageUser);
}

//**Попап редактирования профиля-------------------------------------------------------------------------
// Открыть 
buttonEdit.addEventListener('click', (event) => {
    popupOpen(popupUserInput);
    // Поле введения имени профиля = Имя профиля
    firstNameInput.value = profileFirstName.textContent;
    // Поле введения профессии = описание профессии
    professionInput.value = profileSubText.textContent;
});

// Свернуть
buttonCloseProfileEdit.addEventListener('click', () => {
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
imageAddButton.addEventListener('click', () => {
    popupOpen(popupImage);
    validationFormAddCards.disableSubmitButton();
});

// Свернуть
popupCloseButtonImageContant.addEventListener('click', () => {
    closePopup(popupImage);
    popupFormAddImage.reset();
});

// управление увеличением изображения
function controlScaleImage(name, link) {
    imageBig.setAttribute('src', link);
    imageBig.setAttribute('alt', name);
    imageBigText.textContent = name;
    popupOpen(imageScale);
}

// cвернуть увеличенное изображение
buttonCloseBigImage.addEventListener('click', () => {
    closePopup(imageScale);
});


// слушатель на отправку формы добавления картинки**--------------------------------------------------------------------------------
const userImageNameField = document.querySelector('.popup__input_name_image');
const userLinkImg = document.querySelector('.popup__input_link_image');

popupFormAddImage.addEventListener('submit', (event) => {
    event.preventDefault();
    createNewCard(userImageNameField.value, userLinkImg.value)
    popupFormAddImage.reset();
    closePopup(popupImage);
    validationFormAddCards.disableSubmitButton();
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
function createNewCardFromArray() {
    initialCards.forEach(function (item) {
        createNewCard(item.name, item.link)
    });
}

createNewCardFromArray();

//валидация формы данных пользователя
const validationFormUser = new FormValidator(config, popupFormUserInput);
validationFormUser.enableValidation();
//валидация формы добавления карточек
const validationFormAddCards = new FormValidator(config, popupImage);
validationFormAddCards.enableValidation();