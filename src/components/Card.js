// наполнение темплейта + слушатели лайка,удаления карточки и увеличения изображения
class Card {
    constructor(config, handleCardClick, valueName, valueLink) {
        this.config = config;
        this._handleCardClick = handleCardClick;
        this.valueName = valueName;
        this.valueLink = valueLink;
    }

    // управление лайком
    _handleLike() { this._like.classList.toggle(this.config.imageLikeactivatedClass) }
    // управление удалением карточки
    _handleDelete() {
        this._userElement.remove();
        this._userElement = null;
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