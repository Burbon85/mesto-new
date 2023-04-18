export default class Section {
    constructor({items, renderer}, container) {
        this._items = items;
        this._renderer = renderer;
        this._container = container;
    }

    addItem(card) {
        this._container.append(card);
    }

    rendererItems() {
        this._items.forEach(item => {
            this._renderer(item);
        });
    }

}