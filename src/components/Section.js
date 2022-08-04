//добавляет елемент в разметку

export default class Section {
    constructor({ data, renderer }, container) {
        this.data = data;
        this.renderer = renderer; // функция

        this.container = container;
    }


    createElements() {
        this.data.forEach(item => {
            this.renderer(item)
        })
    }

    addItem(element) {
        this.container.prepend(element);
    }
}
