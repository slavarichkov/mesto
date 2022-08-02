// наполнение темплейта + слушатели лайка,удаления карточки и увеличения изображения
class Card {
    constructor(config, handleCardClick) {
        this.config = config;
        this._handleCardClick = handleCardClick;
    }

    // управление лайком
    _handleLike() { this._like.classList.toggle(this.config.imageLikeactivatedClass) }
    // управление удалением карточки
    _handleDelete() {
        this._userElement.remove();
        this._userElement = null;
    }

    //наполнить темплейт - ссылка на картинку и ее название + прикрепить слушатели
    fillTemplate(valueName, valueLink) {
        this._templateElement = document.querySelector(this.config.templateSelector);
        this._userElement = this._templateElement.content.querySelector(this.config.elementSelector).cloneNode(true);
        this._cardImage = this._userElement.querySelector(this.config.imageElementSelector);
        this._cardImage.src = valueLink;
        this._cardImage.alt = valueName;
        this._userElement.querySelector(this.config.titleElementSelector).textContent = valueName;
        // слушатель управление лайком
        this._like = this._userElement.querySelector(this.config.likeImageSelector);
        this._like.addEventListener('click', this._handleLike.bind(this));
        // слушатель удаления карточки
        this._buttonDelete = this._userElement.querySelector(this.config.buttonCardDeleteSelector);
        this._buttonDelete.addEventListener('click', this._handleDelete.bind(this));
        //слушатель увеличения изображения
        this._handleCardScale = () => this._handleCardClick(valueName, valueLink);
        this._cardImage.addEventListener('click', this._handleCardScale);
        return this._userElement;
    }

}

export default Card;