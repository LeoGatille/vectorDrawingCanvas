import { Menu } from './Menu';
import CanvasWindow from "./CanvasWindow";
// console.log('------COMPILED------', new Date().getMinutes() + ' : ' + new Date().getSeconds());

document.addEventListener('DOMContentLoaded', () => init());

function init() {
    const canvas = new CanvasWindow();
    const menu = new Menu();

    window.addEventListener('undo', () => canvas.removePath());
    window.addEventListener('redo', () => canvas.reAddPath());

    window.addEventListener('mouseEnterMenu', () => canvas.toggleLockCanvas());
    window.addEventListener('mouseLeaveMenu', () => canvas.toggleLockCanvas());

    window.addEventListener('smoothingChange', (smoothingValue: CustomEvent) => canvas.setSmoothing(smoothingValue.detail));
    window.addEventListener('lineWeightChange', (lineWeight: CustomEvent) => canvas.setLineWeight(lineWeight.detail));
    window.addEventListener('colorChange', (e: CustomEvent) => canvas.setColor(e.detail));

    window.addEventListener('expand', (e: CustomEvent) => menu.setExpansion(e.detail))

    window.addEventListener('addPath', () => menu.addActionToHistory());
}


export type Color = {
    name: string,
    rgba: string,
    unset: boolean,
}


