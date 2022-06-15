const editButton = document.querySelector('.profile__edit-button');
const popupUserInput = document.querySelector('.popup_user_input');
const closeButton = document.querySelector('.popup__close-button');
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
const ImageBig = document.querySelector('.popup__image-scale');
const imageBigText = document.querySelector('.popup__image-title');
const closeButtonBigImage = document.querySelector('.popup__close-button_image_scale');
const containerOfImages = document.querySelector('.elements')
const elementLike = document.querySelector('.element__like');

//**Общие функции попап----------------------------------------------------------------------
function openPopup(option) {
    option.classList.add('popup_open');
};

function closePopup(option) {
    option.classList.remove('popup_open');
}

//**Попап редактирования профиля-------------------------------------------------------------------------
// Открть 
const handleOpenInfoProfile = editButton.addEventListener('click', (event) => {
    event.preventDefault();
    openPopup(popupUserInput);
    // Поле введения имени профиля = Имя профиля
    firstNameInput.value = profileFirstName.textContent;
    // Поле введения профессии = описание профессии
    professionInput.value = profileSubText.textContent;
});

// Свернуть
const handleCloseInfoProfile = closeButton.addEventListener('click', () => {
    closePopup(popupUserInput);
});

const handlePopupSubmitInfoProfile = popupFormUserInput.addEventListener('submit', (event) => {
    event.preventDefault();
    // Имя профиля = Поле введения имени профиля
    profileFirstName.textContent = firstNameInput.value;
    // описание профессии = Поле введения профессии 
    profileSubText.textContent = professionInput.value;
    closePopup(popupUserInput);
})

// **Попап добавления картинок пользователем**----------------------------------------------------------------------
// Открыть
const handlePopupOpenButtonImageContant = addImageButton.addEventListener('click', () => {
    openPopup(popupImage);
});
// Свернуть
const handlePopupCloseButtonImageContant = popupCloseButtonImageContant.addEventListener('click', () => {
    closePopup(popupImage);
});

// наполнение карточки**-----------------------------------------------------------------------------
function addImageUser(valueName, valueLink) {
    // создание карточки из html, её наполнение
    const userImageLoadWorkPiece = document.querySelector('.work-piece').content;
    const userElement = userImageLoadWorkPiece.querySelector('.element').cloneNode(true);
    userElement.querySelector('.element__maskgroup').src = valueLink;
    userElement.querySelector('.element__maskgroup').alt = valueName;
    userElement.querySelector('.element__title').textContent = valueName;
}

// добавляем карточку в общий список карточек в начало + cлушатели на карточку-------------------------------------------------
function addCard(valueName, valueLink, parent) {
    // заполнение карточки
    parent.querySelector('.element__maskgroup').src = valueLink;
    parent.querySelector('.element__maskgroup').alt = valueName;
    parent.querySelector('.element__title').textContent = valueName;
    // cлушатель лайк
    const like = parent.querySelector('.element__like');
    const handleLike = like.addEventListener('click', () => { like.classList.add('element__like_activeted') })
    //слушатель удаления карточки
    const buttonDelete = parent.querySelector('.element__button-delete');
    const handleDelete = buttonDelete.addEventListener('click', () => { buttonDelete.closest('.element').remove() })
    //слушатель увеличения изображения
    const image = parent.querySelector('.element__maskgroup');
    const handleImage = image.addEventListener('click', () => {
        openPopup(imageScale);
        ImageBig.setAttribute('src', image.getAttribute('src'));
        imageBigText.textContent = image.getAttribute('alt');
    })
    // cвернуть увеличенное изображение
    const handleCloseButtonBigImage = closeButtonBigImage.addEventListener('click', () => {
        closePopup(imageScale);
    });
    // и добавляем в общий список карточек новую карточку
    containerOfImages.prepend(parent);
};

// слушатель на отправку формы добавления картинки**--------------------------------------------------------------------------------
const userImageNameField = document.querySelector('.popup__input_name_image');
const userLinkImg = document.querySelector('.popup__input_link_image');

const handlePopupFormAddImage = popupFormAddImage.addEventListener('submit', (event) => {
    event.preventDefault();
    const userImageLoadWorkPiece = document.querySelector('.work-piece').content;
    const userElement = userImageLoadWorkPiece.querySelector('.element').cloneNode(true);
    // const userImageNameInput = userElement.querySelector('.element__title');
    addCard(userImageNameField.value, userLinkImg.value, userElement);
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
    const userImageLoadWorkPiece = document.querySelector('.work-piece').content;
    const userElement = userImageLoadWorkPiece.querySelector('.element').cloneNode(true);
    addCard(item.name, item.link, userElement);
});



