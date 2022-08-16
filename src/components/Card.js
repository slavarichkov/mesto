import { config } from "../utils/constants";

// наполнение темплейта + слушатели лайка,удаления карточки и увеличения изображения
class Card {
    constructor(config, handleCardClick, valueName, valueLink, handleCardDelete, addLike, deleteLike, userId) {
        this.config = config;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._addLike = addLike;
        this._deleteLike = deleteLike;
        this.valueName = valueName;
        this.valueLink = valueLink;
        this.userId = userId;
    }

    // присвоение айди для дальнейшего удаления карточки по автору + айди для удаления картинки
    addIdCard(data) {
        this._idUser = data.owner._id;
        this._idImage = data._id;
        this._arrayLikes = data.likes
        this._removeButtonDelete();
    }


    // управление лайком (отправить на сервер, либо удалить)
    _handleLike() {
        const newArrayLikes = [];
        this._like.classList.toggle(this.config.imageLikeactivatedClass);
        this._arrayLikes.forEach((item) => {
            newArrayLikes.push(item._id); // наполнить массив айди лайкнувших юзеров
        });
        if (newArrayLikes.includes(this.userId)) {
            this._deleteLike(this._idImage);
        } else {
            this._addLike(this._idImage);
        }
    }

    //отрисовать лайк  при загрузке информации с сервера
    showLike() {
        const newArrayLikes = [];
        this._arrayLikes.forEach((item) => {
            newArrayLikes.push(item._id); // наполнить массив айди лайкнувших юзеров
        });
        if (newArrayLikes.includes(this.userId)) {
            this._like.classList.add(this.config.imageLikeactivatedClass);
        }
    }

    //отрисовать количество лайков при загрузке информации с сервера
    showQuantityLikes() {
        const newArrayLikes = [];
        this._arrayLikes.forEach((item) => {
            newArrayLikes.push(item._id); // наполнить массив айди лайкнувших юзеров
        });
        if (newArrayLikes.length > 0) {
            this._userElement.querySelector(config.likeQuantitySelector).classList.add(this.config.likeQuantityActiveClass);
            this._userElement.querySelector(config.likeQuantitySelector).textContent = newArrayLikes.length;
        }
    }
    // управление удалением карточки
    _handleDelete() {
        this._handleCardDelete(this._idImage);
    }

    //удалить значек удаления с карточки, если она создана другим юзером.
    _removeButtonDelete() {
        if (this._idUser != this.userId) {
            this._userElement.querySelector(this.config.buttonCardDeleteSelector).remove();
        }
    }

    //наполнить темплейт - ссылка на картинку и ее название + прикрепить слушатели
    generateCard() {
        this._templateElement = document.querySelector(this.config.templateSelector);
        this._userElement = this._templateElement.content.querySelector(this.config.elementSelector).cloneNode(true);
        this._cardImage = this._userElement.querySelector(this.config.imageElementSelector);
        this._cardImage.src = this.valueLink;
        this._cardImage.alt = this.valueName;
        this._userElement.querySelector(this.config.titleElementSelector).textContent = this.valueName;
        this._setEventListeners();
        return this._userElement;
    }

    _setEventListeners() {
        // слушатель управление лайком
        this._like = this._userElement.querySelector(this.config.likeImageSelector);
        this._like.addEventListener('click', this._handleLike.bind(this));
        // слушатель удаления карточки
        this._buttonDelete = this._userElement.querySelector(this.config.buttonCardDeleteSelector);
        this._buttonDelete.addEventListener('click', this._handleDelete.bind(this));
        //слушатель увеличения изображения
        this._handleCardScale = () => this._handleCardClick(this.valueName, this.valueLink);
        this._cardImage.addEventListener('click', this._handleCardScale);
    }

}

export default Card;