//добавляет елемент в разметку

export default class Section {
    constructor({ data, renderer }, containerSelector) {
        this.data = data;
        this.renderer = renderer; // функция

        this.containerSelector = containerSelector;
    }


    createElements() {
        this.data.forEach(item => {
            this.renderer(item)
        })
    }

    addItem(element) {
        this.containerSelector.prepend(element);
    }
}
