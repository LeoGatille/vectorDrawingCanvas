import CanvasWindow from "./CanvasWindow";
console.log('------COMPILED------', new Date().getMinutes() + ' : ' + new Date().getSeconds());


const canvas = new CanvasWindow(1024, 768);

document.querySelector('#undo').addEventListener('click', () => undo())
document.querySelector('#redo').addEventListener('click', () => redo())



function undo() {

    canvas.removePath();
}
function redo() {
    canvas.reAddPath();
}
