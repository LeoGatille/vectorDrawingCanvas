import { Color } from './Types/Color';
export class Menu {
    constructor() {
        this.setEventListeners();
        this.displayColorsOptions('main');
        this.setSelectedColor();
    }
    allColorList = {
        main: ['black', 'white', 'blue', 'red', 'green', 'yellow', 'orange'],
        custom: [],
        history: [],
        secondary: ['pink', 'purple'],
    }
    selectedColor: string;

    private undo() {
        this.emit('undo');
    }
    private redo() {
        this.emit('redo');
    }
    private setSmoothing(val: number) {
        this.emit('smoothingChange');
    }
    private mouseEnter() {
        this.emit('mouseEnterMenu');
    }
    private mouseLeave() {
        this.emit('mouseLeaveMenu');
    }

    private emit(eventType: string, val: any = null) {
        const customEvent = new CustomEvent(eventType, val ? { detail: val } : null);
        window.dispatchEvent(customEvent);
    }

    private displayColorsOptions(colorListName: string) {
        const colorList: string[] = this.allColorList[colorListName];
        const target: HTMLElement = document.querySelector('#' + colorListName + '-color-container');

        colorList.forEach(color => {
            const DOMItem = document.createElement('div');
            DOMItem.className = "color";
            DOMItem.id = color;
            DOMItem.dataset.color = color;
            DOMItem.style.backgroundColor = color;
            DOMItem.addEventListener('click', (e: MouseEvent) => {
                const target = e.target as HTMLElement;
                this.setSelectedColor(target.id)
            });

            target.appendChild(DOMItem);
        });
    }

    private setSelectedColor(color: string = 'black') {
        if (this.selectedColor !== color) {
            this.selectedColor = color;
            this.emit('colorChange', this.selectedColor);
            this.setSelectedColorDisplay();
        }
    }

    private setSelectedColorDisplay() {
        const domColors: HTMLCollection = document.getElementsByClassName('color');
        for (const domColor of domColors) {
            if (domColor.id === this.selectedColor) {
                domColor.classList.add('selected');
            } else {
                domColor.classList.remove('selected');
            }
        }
    }

    private setEventListeners() {
        document.querySelector('#undo').addEventListener('click', () => this.undo());
        document.querySelector('#redo').addEventListener('click', () => this.redo());
        document.querySelector('#settings').addEventListener('mouseenter', () => this.mouseEnter());
        document.querySelector('#settings').addEventListener('mouseleave', () => this.mouseLeave());
        // document.querySelector('#smoothingRange').addEventListener('input', (e: any) => this.setSmoothing(parseInt(e.srcElement.value, 10)));
    }
}
