import { FrameRate } from './FrameRate';
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

    public lastFrameTimestamp: 0;
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
            const currentDrawing = this.drawings[this.drawings.length - 1]
            if (this.skipFrame === 0) {
                // this.clearCanvas()

                currentDrawing.addCoordinate(this.getCanvasRelatedCoordinates(event));
                currentDrawing.removeUglyPath();
                this.skipFrame = 60;
            } else {
                currentDrawing.addUglyCoordinate(this.getCanvasRelatedCoordinates(event));
                this.skipFrame--;
            }
            this.draw();
        });
    }

    draw() {
        this.clearCanvas();
        this.drawings.forEach(path => {
            path.draw();
        })
    }
    fps: number = 0;
    times = [];
    private refreshLoop() {
        window.requestAnimationFrame(() => {
            const now = performance.now();
            while (this.times.length > 0 && this.times[0] <= now - 1000) {
                this.times.shift();
            }
            this.times.push(now);
            this.fps = this.times.length;
            console.log(this.fps);

            this.refreshLoop();
        });
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