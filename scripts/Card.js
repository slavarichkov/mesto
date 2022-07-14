import { containerOfImages } from "./index.js";
import { openPopup } from "./index.js";
import { imageScale } from "./index.js";
import { imageBig } from "./index.js";
import { imageBigText } from "./index.js";

class Card {
    constructor(config) {
        this.config = config;
    }

    //наполнить темплейт - ссылка на картинку и ее название + прикрепить слушатели
    _fillTemplate(valueName, valueLink) {
        const userElement = document.querySelector(this.config.templateClass)
            .content
            .cloneNode(true);
        const cardImage = userElement.querySelector(this.config.imageElement);
        cardImage.src = valueLink;
        cardImage.alt = valueName;
        userElement.querySelector(this.config.titleElement).textContent = valueName;
        // управление лайком
        const _like = userElement.querySelector(this.config.likeImage);
        const _handleLike = (event) => { event.target.classList.toggle(this.config.imageLikeactivated) };
        _like.addEventListener('click', _handleLike);
        //слушатель удаления карточки
        const _buttonDelete = userElement.querySelector(this.config.buttonCardDelete);
        const _handleDelete = () => { _buttonDelete.closest('.element').remove()};
        _buttonDelete.addEventListener('click', _handleDelete);
        //слушатель увеличения изображения
        const _scaleDelete = () => {
            openPopup(imageScale);
            imageBig.setAttribute('src', valueLink);
            imageBig.setAttribute('alt', valueName);
            imageBigText.textContent = valueName;
        };
        cardImage.addEventListener('click', _scaleDelete)

        return userElement;
    }

    // добавить в разметку
    addCard(valueName, valueLink) {
        const returnImageUser = this._fillTemplate(valueName, valueLink);
        containerOfImages.prepend(returnImageUser);
    }


}

export default Card;