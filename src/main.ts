import CanvasWindow from "./CanvasWindow";
console.log('------COMPILED------', new Date().getMinutes() + ' : ' + new Date().getSeconds());

const allColorList = {
    main: ['black', 'white', 'blue', 'red', 'green', 'yellow', 'orange'],
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
    const colorList: string[] = allColorList[colorListName];
    const target: HTMLElement = document.querySelector('#' + colorListName + '-color-container');

    colorList.forEach(color => {
        const DOMItem = document.createElement('div');
        DOMItem.className = "color";
        DOMItem.dataset.color = color;
        DOMItem.style.backgroundColor = color;
        // DOMItem.onclick = (ev: MouseEvent)  =>  setSelectedColor( ev.target.);

        target.appendChild(DOMItem);
    });
}
function setSelectedColor(toto) {
    console.log('TOTO')
}
//! FUCK => Le smoothing doit être calculé à partir des points et pas des frame
//! sinon ça fait que si tu dessine trop vite ça tej la moité de ton dessin :D
export type Color = {
    name: string,
    rgba: string,
    unset: boolean,
}
displayColorsOptions('main');

