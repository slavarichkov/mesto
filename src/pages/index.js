import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWhithImage from "../components/PopupWhithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import './index.css'; //импорт css для webpack
import { buttonEdit, firstNameInput, professionInput, popupFormUserInput, imageAddButton, popupFormAddImage, containerOfImages, config, buttonRedactAvatar } from "../utils/constants.js"; //импорт переменных

//класс Апи - передать токен и хост
const api = new Api('https://mesto.nomoreparties.co/v1/cohort-47/', 'aa25b93c-b1f5-4136-8d21-3d760fe1b048');

//удалить карточку
function deleteCard(idCard) {
    const deleteCardPopup = new PopupWithForm('.popup__card-remove', () => api.deleteCard(idCard));
    deleteCardPopup.setEventListeners();
    deleteCardPopup.open()
}

//отправить лайк
function likeCard(idCard) {
    api.addLike(idCard)
}

//удалить лайк
function deleteLike(idCard) {
    api.deleteLike(idCard)
}

// создать карточку ----------------------------------------------------------------------------
function createNewCard(name, link, identificator) {
    const newCard = new Card(config, controlScaleImage, name, link, deleteCard, likeCard, deleteLike, '9bd3c86322412c56203f6689');
    const returnImageUser = newCard.generateCard();
    newCard.addIdCard(identificator); // присвоить айди для дальнейшего удаления по автору
    newCard.showLike(); // отрисовать лайки
    newCard.showQuantityLikes()//показать количество лайков
    return returnImageUser;
}

//заменить название кнопки сабмита
function changeNameButtonSubmit(selectorPopup) {
    document.querySelector(selectorPopup).querySelector('.popup__button').textContent = 'Сохранение...'
}

//Попап редактирования аватара (изображения юзера)
const popupUserSendAvatar = new PopupWithForm('.popup__avatar-redact', (data) => { api.sendAvatar(data); changeNameButtonSubmit('.popup__avatar-redact') });
popupUserSendAvatar.setEventListeners();
buttonRedactAvatar.addEventListener('click', () => {
    popupUserSendAvatar.open();
    formValidators['formUserAvatarAdd'].disableSubmitButton();
})

//**Попап редактирования профиля-------------------------------------------------------------------------
const userInfoRedact = new UserInfo('.profile__firstname', '.profile__subtext', '.profile__avatar');
const popupControlUserInput = new PopupWithForm('.popup_user_input', (data) => { api.sendUserInfo(data); changeNameButtonSubmit('.popup_user_input') });
popupControlUserInput.setEventListeners();

// Открыть (свернуть вшито в метод класса)
buttonEdit.addEventListener('click', (e) => {
    popupControlUserInput.open();
    api.getUserInfo().then((data) => {
        firstNameInput.value = data.name;
        professionInput.value = data.about;
        userInfoRedact.setUserInfo(data.name, data.about);
    });
});

//отображение данных пользователя с сервера на странице
api.getUserInfo().then((data) => {
    userInfoRedact.setUserInfo(data.name, data.about, data.avatar);
});

// управление увеличением изображения
const popupImageScaleControl = new PopupWhithImage('.popup_image_scale');
popupImageScaleControl.setEventListeners();

function controlScaleImage(name, link) {
    popupImageScaleControl.open(name, link);
}

// **Автоматическое создание карточек c сервера при запустке страницы---------------------------------------------------------------------
api.getImages()
    .then((item) => {
        const renderElements = new Section({
            data: item,
            renderer: (item) => {
                renderElements.addItem(createNewCard(item.name, item.link, item))
            }
        },
            containerOfImages
        );
        renderElements.createElements();
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
    });

//добавить новую карточку, обработка инпутов формы(+слушатели) и отправка новой карточки на сервер
const popupUserImageAdd = new PopupWithForm('.popup_image_content', (data) => { api.sendImages(data); changeNameButtonSubmit('.popup_image_content') });
popupUserImageAdd.setEventListeners();

// Открыть (свернуть и слушатель на сабмит внутри метода класса)
imageAddButton.addEventListener('click', () => {
    popupUserImageAdd.open();
    formValidators['formUserImageAdd'].disableSubmitButton();
});

// Включение валидации
const formValidators = {}

const enableValidation = (config) => {
    const formList = Array.from(document.querySelectorAll(config.formSelector));
    formList.forEach((formElement) => {
        const validator = new FormValidator(config, formElement);
        // получаем данные из атрибута `name` у формы
        const formName = formElement.getAttribute('name')
        // вот тут в объект записываем под именем формы
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(config);

