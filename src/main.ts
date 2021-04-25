import CanvasWindow from "./CanvasWindow";
console.log('------COMPILED------', new Date().getMinutes() + ' : ' + new Date().getSeconds());


const canvas = new CanvasWindow();

document.querySelector('#undo').addEventListener('click', () => undo());
document.querySelector('#redo').addEventListener('click', (e) => { e.stopPropagation(); redo(); });

document.querySelector('#addFrameToSkip').addEventListener('click', () => setFrameToSkip(2));
document.querySelector('#removeFrameToSkip').addEventListener('click', () => setFrameToSkip(-2));

document.querySelector('#settings').addEventListener('mouseenter', () => canvas.toggleLockCanvas());
document.querySelector('#settings').addEventListener('mouseleave', () => canvas.toggleLockCanvas());


function setFrameToSkip(val) {
    canvas.setFrameToSkip(val);
}
function undo() {
    canvas.removePath();
}
function redo() {
    canvas.reAddPath();
}
