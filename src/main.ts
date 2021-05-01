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
    //! FUCK => Le smoothing doit être calculé à partir des points et pas des frame (les points ne marche pas non plus...)
    //! sinon ça fait que si tu dessine trop vite ça tej la moité de ton dessin :D
    const canvas = new CanvasWindow();
    const menu = new Menu();

    window.addEventListener('undo', () => canvas.removePath());
    window.addEventListener('redo', () => canvas.reAddPath());

    window.addEventListener('mouseEnterMenu', () => canvas.toggleLockCanvas());
    window.addEventListener('mouseLeaveMenu', () => canvas.toggleLockCanvas());

    //! Has a any type !
    window.addEventListener('smoothingChange', (smoothingValue: any) => canvas.setSmoothing(smoothingValue));
    window.addEventListener('colorChange', (e: any) => canvas.setColor(e.detail));

}


export type Color = {
    name: string,
    rgba: string,
    unset: boolean,
}


