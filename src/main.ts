import { color } from './main';
import CanvasWindow from "./CanvasWindow";
console.log('------COMPILED------', new Date().getMinutes() + ' : ' + new Date().getSeconds());

const colorList = {
    main : ['black', 'white', 'blue', 'red', 'green', 'yellow', 'orange'],
    custom: [],
    history: [],
    secondary: ['pink', 'purple'],
}

const canvas = new CanvasWindow();

// document.querySelector('#undo').addEventListener('click', () => undo());
// document.querySelector('#redo').addEventListener('click', (e) => { e.stopPropagation(); redo(); });

// document.querySelector('#addFrameToSkip').addEventListener('click', () => setFrameToSkip(2));
// document.querySelector('#removeFrameToSkip').addEventListener('click', () => setFrameToSkip(-2));

// document.querySelector('#settings').addEventListener('mouseenter', () => canvas.toggleLockCanvas());
// document.querySelector('#settings').addEventListener('mouseleave', () => canvas.toggleLockCanvas());

// document.querySelector('#smoothingRange').addEventListener('input', (e: any) => canvas.setSmoothing(parseInt(e.srcElement.value, 10)));

function setSmoothing(val) {
    console.log('setSmoothing => ', val);
}
function setFrameToSkip(val) {
    canvas.setFrameToSkip(val);
}
function undo() {
    canvas.removePath();
}
function redo() {
    canvas.reAddPath();
}

function displayColorsOptions(colorListName: string) {
    const colorList: string[] = ;
    const target: HTMLElement = document.querySelector('#' + colorListName + '-color-container');

}

export type Color = {
    name: string,
    rgba: string,
    unset: boolean,
}

