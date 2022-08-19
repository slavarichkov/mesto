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

//отправить лайк
function likeCard(idCard) {
    api.addLike(idCard)
}

//удалить лайк
function deleteLike(idCard) {
    api.deleteLike(idCard)
}

//отображение данных пользователя с сервера на странице при загрузке
api.getUserInfo().then((data) => {
    userInfoRedact.setUserInfo(data.name, data.about, data.avatar);
});

// управление увеличением изображения
const popupImageScaleControl = new PopupWhithImage('.popup_image_scale');
popupImageScaleControl.setEventListeners();

function controlScaleImage(name, link) {
    popupImageScaleControl.open(name, link);
}

//заменить название кнопки сабмита
function changeNameButtonSubmit(selectorPopup) {
    document.querySelector(selectorPopup).querySelector('.popup__button').textContent = 'Сохранение...'
}

//вернуть название кнопки сабмита
function returnNameButtonSubmit(selectorPopup) {
    document.querySelector(selectorPopup).querySelector('.popup__button').textContent = 'Сохранение...'
}


//Попап редактирования аватара (изображения юзера) --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const popupUserSendAvatar = new PopupWithForm('.popup_avatar_redact', (data) => {
    changeNameButtonSubmit('.popup_avatar_redact');
    api.sendAvatar(data).then((data) => {
        userInfoRedact.setAvatar(data.avatar);
    }).catch((err) => {
        console.log(err); // выведем ошибку в консоль
    }).finally(() => { returnNameButtonSubmit('.popup_avatar_redact'); popupUserSendAvatar.close() })
});
popupUserSendAvatar.setEventListeners();
buttonRedactAvatar.addEventListener('click', () => {
    popupUserSendAvatar.open();
    formValidators['formUserAvatarAdd'].disableSubmitButton();
})

//**Попап редактирования профиля-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const userInfoRedact = new UserInfo('.profile__firstname', '.profile__subtext', '.profile__avatar');
const popupControlUserInput = new PopupWithForm('.popup_user_input', (data) => {
    changeNameButtonSubmit('.popup_user_input');
    api.sendUserInfo(data)
        .then((data) =>
            userInfoRedact.setUserInfo(data.name, data.about, data.avatar))
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        }).finally(() => { returnNameButtonSubmit('.popup_user_input'); popupControlUserInput.close() })
});
popupControlUserInput.setEventListeners();

// Открыть (свернуть вшито в метод класса)
buttonEdit.addEventListener('click', (e) => {
    popupControlUserInput.open();
    api.getUserInfo().then((data) => {
        firstNameInput.value = data.name;
        professionInput.value = data.about;
    });
});



// создать карточку --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function createNewCard(name, link, identificator) {
    const newCard = new Card(config, controlScaleImage, name, link, deleteCard, likeCard, deleteLike, '9bd3c86322412c56203f6689');
    const returnImageUser = newCard.generateCard(name, link, likeCard);
    newCard.addIdCard(identificator); // присвоить айди для дальнейшего удаления по автору
    newCard.showLike(); // отрисовать лайки
    newCard.showQuantityLikes()//показать количество лайков
    return returnImageUser;
}


//удалить карточку--------------------------------------------------------------------------------------------------------------------------------------------
function deleteCard(Card) {
    const dataCard = Card._allDataCard;
    const deleteCardPopup = new PopupWithForm('.popup_card_remove', () => api.deleteCard(dataCard._id)
        .then(() => {
            Card.handleDelete();
        }).catch((err) => {
            console.log(err); // выведем ошибку в консоль
        }).finally(() => { returnNameButtonSubmit('.popup_avatar_redact'); deleteCardPopup.close() }));
    deleteCardPopup.setEventListeners()
    deleteCardPopup.open();
}


//отрисовать карточки (вставить в разметку)--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function renderCards(info) {
    const renderElements = new Section({
        data: info,
        renderer: (item) => {
            renderElements.addItem(createNewCard(item.name, item.link, item))
        }
    },
        containerOfImages
    );
    return renderElements;
}


// **Автоматическое создание карточек c сервера при запустке страницы-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
api.getImages()
    .then((item) => {
        renderCards(item).createElements();
    })
    .catch((err) => {
        console.log(err); // выведем ошибку в консоль
    });


//добавить новую карточку, обработка инпутов формы(+слушатели) и отправка новой карточки на сервер-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const popupUserImageAdd = new PopupWithForm('.popup_image_content', (data) => {
    changeNameButtonSubmit('.popup_image_content');
    api.sendImages(data).then((data) => {
        renderCards(data).createElement();
    })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        }).finally(() => { returnNameButtonSubmit('.popup_user_input'); popupUserImageAdd.close() })
});
popupUserImageAdd.setEventListeners();

// Открыть (свернуть и слушатель на сабмит внутри метода класса)
imageAddButton.addEventListener('click', () => {
    popupUserImageAdd.open();
    formValidators['formUserImageAdd'].disableSubmitButton();
});

// Включение валидации-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
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

