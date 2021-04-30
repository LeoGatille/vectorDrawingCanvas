import Coordinate from './Coordinate';
import Drawing from './Drawing';

export default class CanvasWindow {
    constructor() {
        this.ctx = this.canvas.getContext('2d');
        // this.drawings = new Drawing(this.ctx);

        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.canvasPosLeft = this.canvas.offsetLeft + this.canvas.clientLeft;
        this.canvasPosTop = this.canvas.offsetTop + this.canvas.clientTop;

        this.canvas.addEventListener('mousedown', (event) => {
            this.initDrawing(event);
        });
        window.addEventListener('mouseup', (event) => {
            if (!this.isLocked) {
                this.stopDrawing(event);
            }
        });
        this.canvas.addEventListener('mousemove', (event) => {
            this.recordMouseMove(event);
        });
        window.addEventListener('resize', (event) => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;

            this.canvasPosLeft = this.canvas.offsetLeft + this.canvas.clientLeft;
            this.canvasPosTop = this.canvas.offsetTop + this.canvas.clientTop;

            this.draw();
        });
    }
    private canvas = <HTMLCanvasElement>document.getElementById('myCanvas');
    private ctx: CanvasRenderingContext2D;
    private canvasPosLeft;
    private canvasPosTop;
    private drawings: Drawing[] = [];
    private frameRequest;
    private isDrawing: boolean = false;
    private skipFrame: number = 0;
    private singleDotList: Coordinate[] = [];
    private isLocked: boolean = false;

    public color: string = 'black';
    public smoothing: number = 10;
    public lastFrameTimestamp: 0;
    public canceledPaths: Drawing[] = [];



    public setColor(color: string) {
        this.color = color;
    }
    public setSmoothing(value: number) {
        this.smoothing = value;
    }
    public toggleLockCanvas() {
        this.isLocked = !this.isLocked;
    }
    public removePath() {
        if (this.drawings.length) {
            const canceledDrawing = this.drawings.pop();
            canceledDrawing.toggleDisplay();
            this.canceledPaths.push(canceledDrawing);

            this.draw();
        }
    }
    public setFrameToSkip(val) {
        if (((this.smoothing + val) > 0) && ((this.smoothing + val) < 70)) {
            this.smoothing += val;
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
        this.drawings.push(new Drawing(new Coordinate(this.getCanvasRelatedCoordinates(event)), this.ctx, this.color));
    }

    private getCanvasRelatedCoordinates(event: MouseEvent) {
        return {
            posX: event.pageX - this.canvasPosLeft,
            posY: event.pageY - this.canvasPosTop,
        }
    }

    private recordMouseMove(event: MouseEvent) {
        if (!this.isDrawing) return

        const currentDrawing = this.drawings[this.drawings.length - 1]
        if (this.skipFrame === 0) {
            // this.clearCanvas()

            currentDrawing.addCoordinate(this.getCanvasRelatedCoordinates(event));
            currentDrawing.removeUglyPath();
            this.skipFrame = this.smoothing;
        } else {
            currentDrawing.addUglyCoordinate(this.getCanvasRelatedCoordinates(event));
            this.skipFrame--;
        }
        // this.frameRequest = requestAnimationFrame(() => {

        this.draw();
        // });
    }

    // private recordMouseMove(event: MouseEvent) {
    //     if (!this.isDrawing) return
    //     this.frameRequest = requestAnimationFrame(() => {
    //         const currentDrawing = this.drawings[this.drawings.length - 1]
    //         if (this.skipFrame === 0) {
    //             // this.clearCanvas()

    //             currentDrawing.addCoordinate(this.getCanvasRelatedCoordinates(event));
    //             currentDrawing.removeUglyPath();
    //             this.skipFrame = this.smoothing;
    //         } else {
    //             currentDrawing.addUglyCoordinate(this.getCanvasRelatedCoordinates(event));
    //             this.skipFrame--;
    //         }
    //         this.draw();
    //     });
    // }

    draw() {
        this.clearCanvas();
        this.drawings.forEach(path => {
            path.draw();
        });
        this.singleDotList.forEach(coordinate => {
            this.ctx.beginPath();
            this.ctx.arc(coordinate.x, coordinate.y, 3, 0, 2 * Math.PI);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
        })
    }

    public stopDrawing(event: MouseEvent = null) {
        if (event) {
            this.finishDrawing(event);
        }
        this.isDrawing = false;
    }

    private finishDrawing(event: MouseEvent) {
        const currentPath = this.drawings[this.drawings.length - 1];

        if (currentPath.path.length === 1) {
            this.singleDotList.push(new Coordinate({ posX: currentPath.path[0].x, posY: currentPath.path[0].y }))
        } else if (currentPath.path.length > 2) {
            currentPath.addCoordinate({
                posX: event.pageX - this.canvasPosLeft,
                posY: event.pageY - this.canvasPosTop,
            });
            currentPath.removeUglyPath();
        }

        this.draw();
    }

    private canvasWidth = () => {
        return this.canvas.width;
    }
    private canvasHeight = () => {
        return this.canvas.height;
    }

    private clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvasWidth(), this.canvasHeight());
    }
}