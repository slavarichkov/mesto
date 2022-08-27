import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWhithImage from "../components/PopupWhithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import './index.css'; //импорт css для webpack
import { buttonEdit, firstNameInput, professionInput, imageAddButton, containerOfImages, config, buttonRedactAvatar } from "../utils/constants.js"; //импорт переменных

//получить айди юзера
let userIdd = '';

//класс Апи 
const api = new Api({
    host: 'https://mesto.nomoreparties.co/v1/cohort-47/',
    token: 'aa25b93c-b1f5-4136-8d21-3d760fe1b048'
});

function returnPromise(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(
            `Упс: ${res.status}`
        );
    }
}

const likeCard = (idCard, classMetod) => {
    api.addLike(idCard)
        .then((res) => returnPromise(res))
        .then((res) => {
            classMetod.drawLike(res.likes);
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })

}

const deleteLike = (idCard, classMetod) => {
    api.deleteLike(idCard)
        .then((res) => returnPromise(res))
        .then((res) => classMetod.removeLike(res.likes))
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        })
}

// управление увеличением изображения
const popupImageScaleControl = new PopupWhithImage('.popup_image_scale');
popupImageScaleControl.setEventListeners();

function controlScaleImage(name, link) {
    popupImageScaleControl.open(name, link);
}

//Попап редактирования аватара (изображения юзера) --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const popupUserSendAvatar = new PopupWithForm('.popup_avatar_redact', (data) => {
    popupUserSendAvatar.changeNameButtonSubmit();
    api.sendAvatar(data).then((data) => {
        userInfoRedact.setAvatar(data.avatar);
        popupUserSendAvatar.close();
    }).catch((err) => {
        console.log(err); // выведем ошибку в консоль
    }).finally(() => { popupUserSendAvatar.returnNameButtonSubmit() })
});
popupUserSendAvatar.setEventListeners();
buttonRedactAvatar.addEventListener('click', () => {
    popupUserSendAvatar.open();
    formValidators['formUserAvatarAdd'].disableSubmitButton();
})

//**Попап редактирования профиля-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const userInfoRedact = new UserInfo('.profile__firstname', '.profile__subtext', '.profile__avatar');
const popupControlUserInput = new PopupWithForm('.popup_user_input', (data) => {
    popupControlUserInput.changeNameButtonSubmit();
    api.sendUserInfo(data)
        .then((data) => {
            userInfoRedact.setUserInfo(data.name, data.about, data.avatar);
            popupControlUserInput.close()
        })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        }).finally(() => { popupControlUserInput.returnNameButtonSubmit() })
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
function createNewCard(name, link, dataCard, userIdd) {
    const newCard = new Card(config, controlScaleImage, name, link, deleteCard, likeCard, deleteLike, userIdd, dataCard);
    const returnImageUser = newCard.generateCard(newCard);
    newCard.addOptions(); // отрисовать лайки,
    return returnImageUser;
}


//удалить карточку--------------------------------------------------------------------------------------------------------------------------------------------

const deleteCardPopup = new PopupWithConfirmation('.popup_card_remove', (data) => {
    const dataCard = data._allDataCard;
    api.deleteCard(dataCard._id)
        .then(() => {
            data.handleDelete();
        }).catch((err) => {
            console.log(err); // выведем ошибку в консоль 
        }).finally(() => { returnNameButtonSubmit('.popup_avatar_redact'); deleteCardPopup.close() })
})
deleteCardPopup.setEventListeners();

const deleteCard = (card) => {
    deleteCardPopup.open(card);
}


//отрисовать карточки (вставить в разметку)--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const renderCards = new Section({
    renderer: (item) => {
        renderCards.addItem(createNewCard(item.name, item.link, item, userIdd))
    }
},
    containerOfImages
);


//добавить новую карточку, обработка инпутов формы(+слушатели) и отправка новой карточки на сервер-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const popupUserImageAdd = new PopupWithForm('.popup_image_content', (data) => {
    popupUserImageAdd.changeNameButtonSubmit();
    api.sendImages(data).then((data) => {
        renderCards.createElement(data);
        popupUserImageAdd.close()
    })
        .catch((err) => {
            console.log(err); // выведем ошибку в консоль
        }).finally(() => { popupUserImageAdd.returnNameButtonSubmit() })
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
        // объект записываем под именем формы
        formValidators[formName] = validator;
        validator.enableValidation();
    });
};

enableValidation(config);

// **Автоматическое создание карточек и получение инф о юзере c сервера при запустке страницы-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Promise.all([
    api.getUserInfo(),
    api.getImages()])
    .then(([infoUser, initialCards]) => {
        userIdd = infoUser._id;
        renderCards.createElements(initialCards);
        userInfoRedact.setUserInfo(infoUser.name, infoUser.about, infoUser.avatar);
    }).catch((err) => {
        console.log(err);
    }) 