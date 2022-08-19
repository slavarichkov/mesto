//добавляет елемент в разметку

export default class Section {
    constructor({ data, renderer }, container) {
        this.data = data;
        this.renderer = renderer; // функция

        this.container = container;
    }

    //проработать массив
    createElements() {
        this.data.forEach(item => {
            this.renderer(item)
        })
    }
    //проработать запрос на 1 карточку
    createElement() {
        this.renderer(this.data)
    }

    addItem(element) {
        this.container.prepend(element);
    }
}
