export class CanvasSelection {
    items = []

    toggle(items) {
        const idx = this.items.indexOf(items)
        if (idx >= 0) {
            this.items.splice(idx, 1)
        } else {
            this.items.push(items)
        }
    }

    clear() {
        this.items = []
    }

    selectMany(items) {
        this.items = [...this.items, ...items]
    }
}
