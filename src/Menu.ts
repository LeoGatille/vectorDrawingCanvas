import { ExpansionBtn } from './ExpansionBtn';
import { Color } from './Types/Color';
import { Utils } from "./Utils";

export class Menu {
    constructor() {
        this.allColorList.secondary = CSS_COLOR_NAMES;
        this.setEventListeners();
        this.displayColorsOptions('main');
        this.displayColorsOptions('secondary');
        this.displayColorsOptions('history');
        this.setSelectedColor();
        this.expansionBtn = new ExpansionBtn(document.querySelector('#menu-expansion-controller'));
    }
    domSettings: HTMLElement = document.querySelector('#settings');
    additionalContent: HTMLElement = document.querySelector('#additional-content');
    expansionBtn: ExpansionBtn;
    allColorList = {
        main: ['black', 'white', 'blue', 'red', 'green', 'yellow', 'orange'],
        custom: [],
        history: [undefined, undefined, undefined, undefined, undefined],
        secondary: [],
    }
    selectedColor: string;

    public setExpansion(expansion) {
        if (expansion) {
            this.additionalContent.classList.add('expanded');
        } else {
            this.additionalContent.classList.remove('expanded');
        }
    }

    private undo() {
        this.emit('undo');
    }
    private redo() {
        this.emit('redo');
    }
    private setSmoothing(val: number) {
        console.log('smoothing => ', val);
        this.emit('smoothingChange', val);
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
            DOMItem.className = "color" + (colorListName === 'secondary' ? ' secondary-color' : '');
            DOMItem.id = color;
            DOMItem.dataset.color = color;
            DOMItem.style.backgroundColor = color ? color : 'darkgrey';
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
            this.editHistory();
        }
    }

    //! Lame paramter...
    private editHistory() {
        let history = this.allColorList.history
        const selectedColorindexInHistory = history.indexOf(this.selectedColor);
        if (selectedColorindexInHistory === -1) {
            history.splice(0, 0, this.selectedColor);
            console.log('history I => ', history);
            history.pop();

        } else {
            history.splice(selectedColorindexInHistory, 1);
            history.splice(0, 0, this.selectedColor);
            console.log('history II => ', history);

        }
        this.editHistoryDisplay();
    }

    private editHistoryDisplay() {
        this.resetHistory();
        this.displayColorsOptions('history');
        // console.log('historyContainer => ', target);

        // target.childNodes.forEach((node: HTMLElement, i) => {
        //     node.style.backgroundColor = this.allColorList.history[i];
        // })
    }

    private resetHistory() {
        const target: HTMLElement = document.querySelector('#history-color-container');
        while (target.firstChild) {
            target.removeChild(target.firstChild)
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
        document.querySelector('#smoothingRange').addEventListener('input', (e: any) => this.setSmoothing(parseInt(e.srcElement.value, 10)));
    }
}
const CSS_COLOR_NAMES = [
    "AliceBlue",
    "AntiqueWhite",
    "Aqua",
    "Aquamarine",
    "Azure",
    "Beige",
    "Bisque",
    "Black",
    "BlanchedAlmond",
    "Blue",
    "BlueViolet",
    "Brown",
    "BurlyWood",
    "CadetBlue",
    "Chartreuse",
    "Chocolate",
    "Coral",
    "CornflowerBlue",
    "Cornsilk",
    "Crimson",
    "Cyan",
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGray",
    "DarkGrey",
    "DarkGreen",
    "DarkKhaki",
    "DarkMagenta",
    "DarkOliveGreen",
    "DarkOrange",
    "DarkOrchid",
    "DarkRed",
    "DarkSalmon",
    "DarkSeaGreen",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DarkSlateGrey",
    "DarkTurquoise",
    "DarkViolet",
    "DeepPink",
    "DeepSkyBlue",
    "DimGray",
    "DimGrey",
    "DodgerBlue",
    "FireBrick",
    "FloralWhite",
    "ForestGreen",
    "Fuchsia",
    "Gainsboro",
    "GhostWhite",
    "Gold",
    "GoldenRod",
    "Gray",
    "Grey",
    "Green",
    "GreenYellow",
    "HoneyDew",
    "HotPink",
    "IndianRed",
    "Indigo",
    "Ivory",
    "Khaki",
    "Lavender",
    "LavenderBlush",
    "LawnGreen",
    "LemonChiffon",
    "LightBlue",
    "LightCoral",
    "LightCyan",
    "LightGoldenRodYellow",
    "LightGray",
    "LightGrey",
    "LightGreen",
    "LightPink",
    "LightSalmon",
    "LightSeaGreen",
    "LightSkyBlue",
    "LightSlateGray",
    "LightSlateGrey",
    "LightSteelBlue",
    "LightYellow",
    "Lime",
    "LimeGreen",
    "Linen",
    "Magenta",
    "Maroon",
    "MediumAquaMarine",
    "MediumBlue",
    "MediumOrchid",
    "MediumPurple",
    "MediumSeaGreen",
    "MediumSlateBlue",
    "MediumSpringGreen",
    "MediumTurquoise",
    "MediumVioletRed",
    "MidnightBlue",
    "MintCream",
    "MistyRose",
    "Moccasin",
    "NavajoWhite",
    "Navy",
    "OldLace",
    "Olive",
    "OliveDrab",
    "Orange",
    "OrangeRed",
    "Orchid",
    "PaleGoldenRod",
    "PaleGreen",
    "PaleTurquoise",
    "PaleVioletRed",
    "PapayaWhip",
    "PeachPuff",
    "Peru",
    "Pink",
    "Plum",
    "PowderBlue",
    "Purple",
    "RebeccaPurple",
    "Red",
    "RosyBrown",
    "RoyalBlue",
    "SaddleBrown",
    "Salmon",
    "SandyBrown",
    "SeaGreen",
    "SeaShell",
    "Sienna",
    "Silver",
    "SkyBlue",
    "SlateBlue",
    "SlateGray",
    "SlateGrey",
    "Snow",
    "SpringGreen",
    "SteelBlue",
    "Tan",
    "Teal",
    "Thistle",
    "Tomato",
    "Turquoise",
    "Violet",
    "Wheat",
    "White",
    "WhiteSmoke",
    "Yellow",
    "YellowGreen",
];