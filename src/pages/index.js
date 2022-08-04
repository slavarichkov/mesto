import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWhithImage from "../components/PopupWhithImage.js";
import UserInfo from "../components/UserInfo.js";
//импорт css для webpack
import './index.css';
//импорт переменных
import { buttonEdit, firstNameInput, professionInput, popupFormUserInput, imageAddButton, popupFormAddImage, containerOfImages, config } from "../utils/constants.js";

// создать карточку ----------------------------------------------------------------------------

function createNewCard(name, link) {
    const newCard = new Card(config, controlScaleImage);
    const returnImageUser = newCard.fillTemplate(name, link);
    return returnImageUser;
}

//**Попап редактирования профиля-------------------------------------------------------------------------
const userInfoRedact = new UserInfo('.profile__firstname', '.profile__subtext');
const popupControlUserInput = new PopupWithForm('.popup_user_input', (data) => userInfoRedact.setUserInfo(data.firstname, data.profession));
popupControlUserInput.setEventListeners();

// Открыть (свернуть вшито в метод класса)
buttonEdit.addEventListener('click', (e) => {
    popupControlUserInput.open();
    const dataUserInfo = userInfoRedact.getUserInfo();
    firstNameInput.value = dataUserInfo.userName;
    professionInput.value = dataUserInfo.userProffesion;


});

// управление увеличением изображения
const popupImageScaleControl = new PopupWhithImage('.popup_image_scale');
popupImageScaleControl.setEventListeners();

function controlScaleImage(name, link) {
    popupImageScaleControl.open(name, link);
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
popupUserImageAdd.setEventListeners();

// Открыть (свернуть и слушатель на сабмит внутри метода класса)
imageAddButton.addEventListener('click', () => {
    popupUserImageAdd.open();
    validationFormAddCards.disableSubmitButton();
});

//валидация формы данных пользователя
const validationFormUser = new FormValidator(config, popupFormUserInput);
validationFormUser.enableValidation();
//валидация формы добавления карточек
const validationFormAddCards = new FormValidator(config, popupFormAddImage);
validationFormAddCards.enableValidation();
