import { containerOfImages } from "./index.js";
// import { openPopup } from "./index.js";
// import { imageScale } from "./index.js";
// import { imageBig } from "./index.js";
// import { imageBigText } from "./index.js";

class Card {
    constructor(config, controlScaleImage) {
        this.config = config;
        this.controlScaleImage = controlScaleImage;
    }

    // управление лайком
    _handleLike = () => { this.like.classList.toggle(this.config.imageLikeactivatedClass)}
    // управление удалением карточки
    _handleDelete = () => {
        this.userElement.remove();
        this.userElement = null;
    }

    //наполнить темплейт - ссылка на картинку и ее название + прикрепить слушатели
    _fillTemplate(valueName, valueLink) {
        this.templateElement = document.querySelector(this.config.templateSelector);
        this.userElement = this.templateElement.content.querySelector(this.config.elementSelector).cloneNode(true);
        this.cardImage = this.userElement.querySelector(this.config.imageElementSelector);
        this.cardImage.src = valueLink;
        this.cardImage.alt = valueName;
        this.userElement.querySelector(this.config.titleElementSelector).textContent = valueName;
        // слушатель управление лайком
        this.like = this.userElement.querySelector(this.config.likeImageSelector);
        this.like.addEventListener('click', this._handleLike);
        // слушатель удаления карточки
        this._buttonDelete = this.userElement.querySelector(this.config.buttonCardDeleteSelector);
        // console.log(this._buttonDelete)
        this._buttonDelete.addEventListener('click', this._handleDelete);
        //слушатель увеличения изображения
        this.cardImage.addEventListener('click', () => this.controlScaleImage(valueName, valueLink));

        return this.userElement;
    }


    // // добавить в разметку
    // addCard(valueName, valueLink) {
    //     const returnImageUser = this._fillTemplate(valueName, valueLink);
    //     containerOfImages.prepend(returnImageUser);
    // }


}

export default Card;