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
        this.canvas.addEventListener('mouseup', (event) => {
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
    private canvas = <HTMLCanvasElement>document.getElementById('myCanvas');
    private ctx: CanvasRenderingContext2D;
    private canvasPosLeft;
    private canvasPosTop;
    private drawings: Drawing[] = [];
    private frameRequest;
    private isDrawing: boolean = false;
    private skipFrame: number = 0;

    public canceledPaths: Drawing[] = [];

    public removePath() {
        if (this.drawings.length) {
            const canceledDrawing = this.drawings.pop();

            canceledDrawing.toggleDisplay();
            this.canceledPaths.push(canceledDrawing);

            this.draw();

        }
    }
    public reAddPath() {
        if (this.canceledPaths.length) {
            const pathToReAdd = this.canceledPaths.pop();

            pathToReAdd.toggleDisplay();
            this.drawings.push(pathToReAdd);

            this.draw();
        }
    }

    private initDrawing(event: MouseEvent) {
        this.isDrawing = true;
        this.drawings.push(new Drawing(new Coordinate(this.getCanvasRelatedCoordinates(event)), this.ctx,));
    }

    private getCanvasRelatedCoordinates(event: MouseEvent) {
        return {
            posX: event.pageX - this.canvasPosLeft,
            posY: event.pageY - this.canvasPosTop,
        }
    }

    private recordMouseMove(event: MouseEvent) {
        if (!this.isDrawing) return
        //! Might need an array of isDrawing to avoid problems (or not...)
        this.frameRequest = requestAnimationFrame(() => {
            if (this.skipFrame === 0) {
                this.clearCanvas()
                this.drawings[this.drawings.length - 1].addCoordinate(this.getCanvasRelatedCoordinates(event));
                this.draw()
                this.skipFrame = 30;
            } else {
                this.skipFrame--;
            }
        });


    }

    draw() {
        this.clearCanvas();
        this.drawings.forEach(path => {
            path.draw();
        })
    }

    private stopDrawing() {
        this.isDrawing = false;
    }

    private canvasWidth = () => {
        return this.canvas.width;
    }
    private canvasHeight = () => {
        return this.canvas.height;
    }

    private clearCanvas() {
        this.ctx.clearRect(0, 0, 1024, 768);
    }
}