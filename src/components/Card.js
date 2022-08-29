
// наполнение темплейта + слушатели лайка,удаления карточки и увеличения изображения
class Card {
    constructor(config, handleCardClick, valueName, valueLink, handleCardDelete, addLike, deleteLike, userId, dataCard) {
        this.config = config;
        this._handleCardClick = handleCardClick; // слушатель клика по изображению
        this._handleCardDelete = handleCardDelete; // слушатель клика по корзине
        this._addLike = addLike; //отправить или удалить лайк с  сервера
        this._deleteLike = deleteLike; // удалить лайк
        this.valueName = valueName; //название изображения
        this.valueLink = valueLink; //ссылка на изображение
        this.userId = userId;
        this._templateElement = document.querySelector(this.config.templateSelector);
        this._userElement = this._templateElement.content.querySelector(this.config.elementSelector).cloneNode(true);// возвращенный темплейт, нода
        this._cardImage = this._userElement.querySelector(this.config.imageElementSelector);//картинка
        this._like = this._userElement.querySelector(this.config.likeImageSelector);//лайк
        this._likesСounter = this._userElement.querySelector(this.config.likeQuantitySelector);//счетчик лайков
        //this.newArrayLikes = []; // заготовка под массив лайков на карточке
        this.allDataCard = dataCard;
        this._idUser = dataCard.owner._id;
        // this._idImage = dataCard._id;
        this.idImage = dataCard._id;
        this._arrayLikes = dataCard.likes
    }

    //показать или спрятать лайк
    _handleLike() {
        if (this._like.classList.contains(this.config.imageLikeactivatedClass)) {
            this._deleteLike(this); //удалить лайк 
        } else {
            this._addLike(this);  //добавить лайк сервер + браузер
        }
    }


    // отрисовать лайк на странице
    drawLike(likeArray) {
        this._like.classList.add(this.config.imageLikeactivatedClass);
        this._likesСounter.textContent = (likeArray.length);
    }

    removeLike(likeArray) {
        this._like.classList.remove(this.config.imageLikeactivatedClass);
        this._likesСounter.textContent = likeArray.length;
    }

    //отрисовать лайк  при загрузке информации с сервера
    _showLike() {
        this._arrayLikes.forEach((item) => {
            if (item._id === this.userId) {
                this._like.classList.add(this.config.imageLikeactivatedClass);
            }
        })
    }

    //отрисовать количество лайков при загрузке информации с сервера
    _showQuantityLikes() {
        if (this._arrayLikes.length > 0) {
            this._likesСounter.classList.add(this.config.likeQuantityActiveClass);
            this._likesСounter.textContent = this._arrayLikes.length;
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

    // дата данных карточки, в тч присвоение айди для дальнейшего удаления карточки по автору + айди для удаления картинки и тд
    addOptions() {
        this._removeButtonDelete(); // спрятать корзину по автору
        this._showLike(); // отрисовать лайк при загрузке
        this._showQuantityLikes() // показать количество лайков
    }

    //наполнить темплейт - ссылка на картинку и ее название + прикрепить слушатели
    generateCard() {
        this._cardImage.src = this.valueLink;
        this._cardImage.alt = this.valueName;
        this._userElement.querySelector(this.config.titleElementSelector).textContent = this.valueName;
        this._setEventListeners();
        return this._userElement;
    }

    _setEventListeners() {
        this._like.addEventListener('click', this._handleLike.bind(this)); // слушатель управление лайком
        this._buttonDelete = this._userElement.querySelector(this.config.buttonCardDeleteSelector); // слушатель удаления карточки
        this._buttonDelete.addEventListener('click', this.handleApiDelete.bind(this));
        this._handleCardScale = () => this._handleCardClick(this.valueName, this.valueLink); //слушатель увеличения изображения
        this._cardImage.addEventListener('click', this._handleCardScale);
    }

}

export default Card;