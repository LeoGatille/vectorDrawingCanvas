import { Menu } from './Menu';
import CanvasWindow from "./CanvasWindow";
console.log('------COMPILED------', new Date().getMinutes() + ' : ' + new Date().getSeconds());

document.addEventListener('DOMContentLoaded', () => init());

function init() {
    const allColorList = {
        main: ['black', 'white', 'blue', 'red', 'green', 'yellow', 'orange'],
        custom: [],
        history: [],
        secondary: ['pink', 'purple'],
    }
    //! FUCK => Le smoothing doit être calculé à partir des points et pas des frame (les points ne marche pas non plus...)
    //! sinon ça fait que si tu dessine trop vite ça tej la moité de ton dessin :D
    const canvas = new CanvasWindow();
    const menu = new Menu();

    // document.querySelector('#undo').addEventListener('click', () => undo());
    // document.querySelector('#redo').addEventListener('click', (e) => { e.stopPropagation(); redo(); });

    // document.querySelector('#addFrameToSkip').addEventListener('click', () => setFrameToSkip(2));
    // document.querySelector('#removeFrameToSkip').addEventListener('click', () => setFrameToSkip(-2));

    // document.querySelector('#settings').addEventListener('mouseenter', () => canvas.toggleLockCanvas());
    // document.querySelector('#settings').addEventListener('mouseleave', () => canvas.toggleLockCanvas());

    // document.querySelector('#smoothingRange').addEventListener('input', (e: any) => canvas.setSmoothing(parseInt(e.srcElement.value, 10)));

    //! Deprecated
    // window.addEventListener('click', () => setFrameToSkip(2));
    // window.addEventListener('click', () => setFrameToSkip(-2));

    window.addEventListener('undo', () => canvas.removePath());
    window.addEventListener('redo', () => canvas.reAddPath());

    window.addEventListener('mouseEnterMenu', () => canvas.toggleLockCanvas());
    window.addEventListener('mouseLeaveMenu', () => canvas.toggleLockCanvas());

    //! Has a any type !
    window.addEventListener('smoothingChange', (smoothingValue: any) => canvas.setSmoothing(smoothingValue));
    window.addEventListener('colorChange', (e: any) => canvas.setColor(e.detail));




    // function setSmoothing(val) {
    //     console.log('setSmoothing => ', val);
    // }
    // function setFrameToSkip(val) {
    //     canvas.setFrameToSkip(val);
    // }
    // function undo() {
    //     canvas.removePath();
    // }
    // function redo() {
    //     canvas.reAddPath();
    // }

    // function displayColorsOptions(colorListName: string) {
    //     const colorList: string[] = allColorList[colorListName];
    //     const target: HTMLElement = document.querySelector('#' + colorListName + '-color-container');

    //     colorList.forEach(color => {
    //         const DOMItem = document.createElement('div');
    //         DOMItem.className = "color";
    //         DOMItem.id = color;
    //         DOMItem.dataset.color = color;
    //         DOMItem.style.backgroundColor = color;
    //         DOMItem.addEventListener('click', (e: MouseEvent) => {
    //             const target = e.target as HTMLElement;
    //             setSelectedColor(target.id)
    //         });

    //         target.appendChild(DOMItem);
    //     });
    // }
    // function setSelectedColor(toto) {
    //     console.log('TOTO')
    // }
}


export type Color = {
    name: string,
    rgba: string,
    unset: boolean,
}


