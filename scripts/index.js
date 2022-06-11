const editButton = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const closeButton = document.querySelector('.popup__close-button');
const profileFirstname = document.querySelector('.profile__firstname');
const firstnameInput = document.querySelector('.popup__input_field_firstname');
const professionInput = document.querySelector('.popup__input_field_profession');
const profileSubtext = document.querySelector('.profile__subtext');
const popupForm = document.querySelector('.popup__form');
const addImageButton = document.querySelector('.profile__add-button');
const popupImage = document.querySelector('.popup_image_content');
const popupFormAddImage = document.querySelector('.popup__form_image_add');
const popupCloseButtonImageContant = document.querySelector('.popup__close-button_image_contant');
const userImageLink = document.querySelector('.popup__input_link_image');
const userImageName = document.querySelector('.popup__input_name_image');
// переменные для темплейт
const userImageLoadWorkPiece = document.querySelector('.work-piece').content;
const userElement = userImageLoadWorkPiece.querySelector('.element').cloneNode(true);
const containerOfImages = document.querySelector('.elements')
const elementLike = document.querySelector('.element__like');

//**Общие функции попап**
function openPopup(option) {
    option.classList.add('popup_open');
};

function closePopup(option) {
    option.classList.remove('popup_open');
}

//**Попап редактирования профиля**
// Открть 
editButton.addEventListener('click', (event) => {
    event.preventDefault();
    openPopup(popup);
    // Поле введения имени профиля = Имя профиля
    firstnameInput.value = profileFirstname.textContent;
    // Поле введения профессии = описание профессии
    professionInput.value = profileSubtext.textContent;
});

// Свернуть
closeButton.addEventListener('click', () => {
    closePopup(popup);
});

popupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    // Имя профиля = Поле введения имени профиля
    profileFirstname.textContent = firstnameInput.value;
    // описание профессии = Поле введения профессии 
    profileSubtext.textContent = professionInput.value;
    closePopup(popup);
})

// **Попап добавления картинок пользователем**
// Открыть
addImageButton.addEventListener('click', () => {
    openPopup(popupImage);
});
// Свернуть
popupCloseButtonImageContant.addEventListener('click', () => {
    closePopup(popupImage);
});

// добавление элемента**
function addImageUser(valueName, valueLink) {
    userElement.querySelector('.element__maskgroup').src = valueLink;
    userElement.querySelector('.element__maskgroup').alt = valueName;
    containerOfImages.prepend(userElement);
}

// слушатель на отправку формы добавления картинки**
const userImageNameField = document.querySelector('.popup__input_name_image');
const userLinkImg = document.querySelector('.popup__input_link_image');
const userImageNameInput = userElement.querySelector('.element__title');

popupFormAddImage.addEventListener('submit', (event) => {
    event.preventDefault();
    userImageNameInput.textContent = userImageNameField.value;
    addImageUser(userImageNameField.value, userLinkImg.value);
    closePopup(popupImage);
});

//**добавление лайка**
document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('element__like')) {
        evt.target.classList.add('element__like_activeted')
    }
});

//**удалить изображение пользователя**
document.addEventListener('click', (evt) => {
    if (evt.target.classList.contains(('element__button-delete'))) {
        const deleteButton = evt.target;
        const element = deleteButton.closest('.element');
        element.remove();
    }
});

// **увеличение изображений**
const ImageScale = document.querySelector('.elements__image-boost');

containerOfImages.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('element__maskgroup')) {
        // вкл видимое увеличенное изображение
        ImageScale.classList.add('elements__image-boost_activated');
        // заменяем ссылки на изображении
        let image = evt.target;
        let imageLink = image.getAttribute('src');
        const ImageBig = document.querySelector('.elements__image-big');
        const ImageBigLink = ImageBig.setAttribute('src', imageLink);
        //заменяем название картинки
        let imageText = image.getAttribute('alt');
        const imageBigText = document.querySelector('.elements__image-title');
        imageBigText.textContent = imageText;
    }
});

// cвернуть увеличенное изображение
const closeButtonBigImage = document.querySelector('.elements__button-image');
closeButtonBigImage.addEventListener('click', () => {
    ImageScale.classList.remove('elements__image-boost_activated');
});

// **Автоматическое создание 6 карточек при запустке страницы
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

initialCards.forEach(function (item) {
    //*?*задать вопрос на вебинаре, почему если переменные ниже объявлены глобально, но не указаны локально - не добавляются карточки, добавляется только 1
    const userImageLoadWorkPiece = document.querySelector('.work-piece').content;
    const userElement = userImageLoadWorkPiece.querySelector('.element').cloneNode(true);
    const userImageNameInput = userElement.querySelector('.element__title');

    userElement.querySelector('.element__maskgroup').src = item.link;
    userElement.querySelector('.element__maskgroup').alt = item.name;
    userImageNameInput.textContent = item.name;
    containerOfImages.prepend(userElement);
});

