import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWhithImage from "./PopupWhithImage.js";
import UserInfo from "./UserInfo.js";

const buttonEdit = document.querySelector('.profile__edit-button');
//const popupUserInput = document.querySelector('.popup_user_input');
//const buttonCloseProfileEdit = document.querySelector('.popup__close-button_profile_edit');
const profileFirstName = document.querySelector('.profile__firstname');
//const firstNameInput = document.querySelector('.popup__input_field_firstname');
//const professionInput = document.querySelector('.popup__input_field_profession');
const profileSubText = document.querySelector('.profile__subtext');
const popupFormUserInput = document.querySelector('.popup__form_user_input');
const imageAddButton = document.querySelector('.profile__add-button');
//const popupImage = document.querySelector('.popup_image_content');
const popupFormAddImage = document.querySelector('.popup__form_image_add');
//const popupCloseButtonImageContant = document.querySelector('.popup__close-button_image_contant');
export const imageScale = document.querySelector('.popup_image_scale');
export const imageBig = document.querySelector('.popup__image-scale');
export const imageBigText = document.querySelector('.popup__image-title');
//const buttonCloseBigImage = document.querySelector('.popup__close-button_image_scale');
export const containerOfImages = document.querySelector('.elements');




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

// создать карточку ----------------------------------------------------------------------------

function createNewCard(name, link) {
    const newCard = new Card(config, controlScaleImage);
    const returnImageUser = newCard.fillTemplate(name, link);
    return returnImageUser;
}

//**Попап редактирования профиля-------------------------------------------------------------------------
const userInfoRedact = new UserInfo('.popup__input_field_firstname', '.popup__input_field_profession');
const popupControlUserInput = new PopupWithForm('.popup_user_input', () => userInfoRedact.setUserInfo(profileFirstName, profileSubText));

// Открыть (свернуть вшито в метод класса)
buttonEdit.addEventListener('click', () => {
    popupControlUserInput.open();
    userInfoRedact.getUserInfo(profileFirstName.textContent, profileSubText.textContent);
    popupControlUserInput.setEventListeners();
});

// управление увеличением изображения
function controlScaleImage(name, link) {
    const popupImageScaleControl = new PopupWhithImage('.popup_image_scale');
    popupImageScaleControl.open(name, link);
    popupImageScaleControl.setEventListeners();
}

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

//добавить карточку из массива в разметку
const renderElements = new Section({
    data: initialCards,
    renderer: (item) => {
        renderElements.addItem(createNewCard(item.name, item.link))
    }
},
    containerOfImages
);

renderElements.createElements();

// **Попап добавления картинок пользователем**----------------------------------------------------------------------
const popupUserImageAdd = new PopupWithForm('.popup_image_content', (data) => renderElements.addItem(createNewCard(data.image_title, data.link)));

// Открыть (свернуть и слушатель на сабмит внутри метода класса)
imageAddButton.addEventListener('click', () => {
    popupUserImageAdd.open();
    popupUserImageAdd.setEventListeners();
    validationFormAddCards.disableSubmitButton();
});

//валидация формы данных пользователя
const validationFormUser = new FormValidator(config, popupFormUserInput);
validationFormUser.enableValidation();
//валидация формы добавления карточек
const validationFormAddCards = new FormValidator(config, popupFormAddImage);
validationFormAddCards.enableValidation();
