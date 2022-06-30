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
const userImageLink = document.querySelector('.popup__input_link_image');
const userImageName = document.querySelector('.popup__input_name_image');
const imageScale = document.querySelector('.popup_image_scale');
const imageBig = document.querySelector('.popup__image-scale');
const imageBigText = document.querySelector('.popup__image-title');
const closeButtonBigImage = document.querySelector('.popup__close-button_image_scale');
const containerOfImages = document.querySelector('.elements')
const elementLike = document.querySelector('.element__like');
const userImageLoadWorkPiece = document.querySelector('.work-piece').content;
const popupInputAll = document.querySelector('.popup__input');
const popup = document.querySelector('.popup__form');

//**Общие функции попап----------------------------------------------------------------------
// свернуть все попапы по ESС
function closeByEscape(e) {
    if (e.keyCode === 27) {
        const openPopup = document.querySelector('.popup_open')
        closePopup(openPopup);
    }
}

// свернуть все попапы по клику на оверлей
function closeByOverPopup(e) {
    if (e.target.classList.contains("popup_overlay")) {
        closePopup(e.target);
    }
}

function openPopup(option) {
    option.classList.add('popup_open');
    document.addEventListener('keydown', closeByEscape);
    option.addEventListener('click', closeByOverPopup);
};

function closePopup(option) {
    option.classList.remove('popup_open');
    option.removeEventListener('keydown', closeByEscape);
    option.removeEventListener('keydown', closeByOverPopup);
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

// наполнение карточки**-----------------------------------------------------------------------------
function addImageUser(valueName, valueLink) {
    // создание карточки из html, её наполнение
    const userElement = userImageLoadWorkPiece.querySelector('.element').cloneNode(true);
    const cardImage = userElement.querySelector('.element__maskgroup');
    cardImage.src = valueLink;
    cardImage.alt = valueName;
    userElement.querySelector('.element__title').textContent = valueName;
    // cлушатель лайк
    const like = userElement.querySelector('.element__like');
    const handleLike = (event) => { event.target.classList.toggle('element__like_activeted') };
    like.addEventListener('click', handleLike);
    //слушатель удаления карточки
    const buttonDelete = userElement.querySelector('.element__button-delete');
    const handleDelete = () => { buttonDelete.closest('.element').remove() };
    buttonDelete.addEventListener('click', handleDelete);
    //слушатель увеличения изображения
    // const image = userElement.querySelector('.element__maskgroup');
    cardImage.addEventListener('click', () => {
        openPopup(imageScale);
        imageBig.setAttribute('src', valueLink);
        imageBig.setAttribute('alt', valueName);
        imageBigText.textContent = valueName;
    })
    return userElement;
}

// добавляем карточку в общий список карточек в начало-----------------------------------------------------------
function addCard(valueName, valueLink) {
    const returnImageUser = addImageUser(valueName, valueLink)
    // и добавляем в общий список карточек новую карточку
    containerOfImages.prepend(returnImageUser);
};

// слушатель на отправку формы добавления картинки**--------------------------------------------------------------------------------
const userImageNameField = document.querySelector('.popup__input_name_image');
const userLinkImg = document.querySelector('.popup__input_link_image');

popupFormAddImage.addEventListener('submit', (event) => {
    event.preventDefault();
    const userElement = userImageLoadWorkPiece.querySelector('.element').cloneNode(true);
    addCard(userImageNameField.value, userLinkImg.value);
    popupFormAddImage.reset();
    closePopup(popupImage);
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
// пройтись по каждому объекту в массиве и создать карточку
initialCards.forEach(function (item) {
    addCard(item.name, item.link);
});


