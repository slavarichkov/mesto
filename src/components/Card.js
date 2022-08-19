import { config } from "../utils/constants";

// наполнение темплейта + слушатели лайка,удаления карточки и увеличения изображения
class Card {
    // constructor(config, handleCardClick,valueName,valueLink, handleCardDelete, addLike, deleteLike, userId) {
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

    // дата данных карточки, в тч присвоение айди для дальнейшего удаления карточки по автору + айди для удаления картинки и тд
    addIdCard(data) {
        this._allDataCard = data;
        this._idUser = data.owner._id;
        this._idImage = data._id;
        this._arrayLikes = data.likes
        this._removeButtonDelete();
    }

    //показать или спрятать лайк
    async _handleLike() {
        await this._controleLike();
        await this._controlQuantityLikes();
        this._like.classList.toggle(this.config.imageLikeactivatedClass);
    }

    // управление лайком (отправить на сервер, либо удалить)
    _controleLike() {
        const newArrayLikes = [];
        //this._controleLike();
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

    //добавить количество лайков
    _controlQuantityLikes() {
        if (this._like.classList.contains(this.config.imageLikeactivatedClass)) {
            this._userElement.querySelector(config.likeQuantitySelector).textContent = this._userElement.querySelector(config.likeQuantitySelector).textContent - 1;
        } else {
            this._userElement.querySelector(config.likeQuantitySelector).textContent = Number(this._userElement.querySelector(config.likeQuantitySelector).textContent) + 1;
        }
    }
    // управление удалением карточки
    handleApiDelete() {
        this._handleCardDelete(this);
    }

    handleDelete() {
        this._userElement.remove();
        this._userElement = null;
    }


    //удалить значек удаления с карточки, если она создана другим юзером.
    _removeButtonDelete() {
        if (this._idUser != this.userId) {
            this._userElement.querySelector(this.config.buttonCardDeleteSelector).remove();
        }
    }

    //наполнить темплейт - ссылка на картинку и ее название + прикрепить слушатели
    //generateCard() {
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
        //this._buttonDelete.addEventListener('click', this.handleApiDelete.bind(this));
        this._handleCardDelete
        this._buttonDelete.addEventListener('click', this.handleApiDelete.bind(this));
        //слушатель увеличения изображения
        this._handleCardScale = () => this._handleCardClick(this.valueName, this.valueLink);
        this._cardImage.addEventListener('click', this._handleCardScale);
    }

}

export default Card;