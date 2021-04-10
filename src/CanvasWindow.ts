import Coordinate from './Coordinate';
import Drawing from './Drawing';

export default class CanvasWindow {
    constructor(width: number, height: number) {

        this.ctx = this.canvas.getContext('2d');
        // this.drawings = new Drawing(this.ctx);

        this.canvas.width = width;
        this.canvas.height = height;

        this.canvasPosLeft = this.canvas.offsetLeft + this.canvas.clientLeft;
        this.canvasPosTop = this.canvas.offsetTop + this.canvas.clientTop;

        this.canvas.addEventListener('mousedown', (event) => {
            this.initDrawing(event);
        });
        window.addEventListener('mouseup', (event) => {
            this.stopDrawing();
            console.log('STOP');

        });
        this.canvas.addEventListener('mousemove', (event) => {
            this.recordMouseMove(event);
        })
        window.addEventListener('resize', () => {
            this.canvasPosLeft = this.canvas.offsetLeft + this.canvas.clientLeft;
            this.canvasPosTop = this.canvas.offsetTop + this.canvas.clientTop;
        })
    }
    canvas = <HTMLCanvasElement>document.getElementById('myCanvas');
    ctx: CanvasRenderingContext2D;
    canvasPosLeft;
    canvasPosTop;
    drawings: Drawing[] = [];
    frameRequest;
    isDrawing: boolean = false;
    skipFrame: number = 0;

    initDrawing(event: MouseEvent) {
        this.isDrawing = true;
        this.drawings.push(new Drawing(new Coordinate(this.getCanvasRelatedCoordinates(event)), this.ctx,));
    }

    getCanvasRelatedCoordinates(event: MouseEvent) {
        return {
            posX: event.pageX - this.canvasPosLeft,
            posY: event.pageY - this.canvasPosTop,
        }
    }

    recordMouseMove(event: MouseEvent) {
        if (!this.isDrawing) return

        //! Might need an array of isDrawing to avoid problems (or not...)
        this.frameRequest = requestAnimationFrame(() => {
            if (this.skipFrame === 0) {
                this.drawings[this.drawings.length - 1].addCoordinate(this.getCanvasRelatedCoordinates(event));
                this.skipFrame = 0;
            } else {
                this.skipFrame--;
            }
        });

    
    }

    stopDrawing() {
        this.isDrawing = false;
    }

    canvasWidth = () => {
        return this.canvas.width;
    }
    canvasHeight = () => {
        return this.canvas.height;
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, 1024, 768);
    }
}