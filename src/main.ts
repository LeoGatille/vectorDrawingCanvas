import { Menu } from './Menu';
import CanvasWindow from "./CanvasWindow";
// console.log('------COMPILED------', new Date().getMinutes() + ' : ' + new Date().getSeconds());

document.addEventListener('DOMContentLoaded', () => init());

function init() {
    const allColorList = {
        main: ['black', 'white', 'blue', 'red', 'green', 'yellow', 'orange'],
        custom: [],
        history: [],
        secondary: ['pink', 'purple'],
    }

    const canvas = new CanvasWindow();
    const menu = new Menu();

    window.addEventListener('undo', () => canvas.removePath());
    window.addEventListener('redo', () => canvas.reAddPath());

    window.addEventListener('mouseEnterMenu', () => canvas.toggleLockCanvas());
    window.addEventListener('mouseLeaveMenu', () => canvas.toggleLockCanvas());

    //! Has a any type !
    window.addEventListener('smoothingChange', (smoothingValue: any) => canvas.setSmoothing(smoothingValue.detail));
    window.addEventListener('colorChange', (e: any) => canvas.setColor(e.detail));

    //! Has a any type !
    window.addEventListener('expand', (e: any) => menu.setExpansion(e.detail))

}


export type Color = {
    name: string,
    rgba: string,
    unset: boolean,
}


