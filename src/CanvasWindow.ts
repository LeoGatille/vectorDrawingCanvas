import Coordinate from './Coordinate';
import Drawing from './Drawing';

export default class CanvasWindow {
    constructor(width: number, height: number) {
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
            this.stopDrawing(event);
        });
        this.canvas.addEventListener('mousemove', (event) => {
            this.recordMouseMove(event);
        });
        window.addEventListener('resize', (event) => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            console.log('posLeft => ', this.canvasPosLeft)
            console.log('posRight => ', this.canvasPosLeft)
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

    public color: string = 'black';
    public smoothing: number = 50;
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
                this.skipFrame = this.smoothing;
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
        });
        this.singleDotList.forEach(coordinate => {
            this.ctx.beginPath();
            this.ctx.arc(coordinate.x, coordinate.y, 3, 0, 2 * Math.PI);
            this.ctx.fillStyle = this.color;
            this.ctx.fill();
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
            this.refreshLoop();
        });
    }

    private stopDrawing(event: MouseEvent) {
        const currentPath = this.drawings[this.drawings.length - 1];

        if (currentPath.path.length === 1) {
            this.singleDotList.push(new Coordinate({ posX: currentPath.path[0].x, posY: currentPath.path[0].y }))

            // this.ctx.beginPath();
            // this.ctx.arc(currentPath.path[0].x, currentPath.path[0].y, 3, 0, 2 * Math.PI);
            // this.ctx.fillStyle = 'blue';
            // this.ctx.fill();

            // currentPath.addCircle();
        }

        if (currentPath.path.length > 2) {
            console.log('WTF');

            currentPath.addCoordinate({
                posX: event.pageX - this.canvasPosLeft,
                posY: event.pageY - this.canvasPosTop,
            });
            currentPath.removeUglyPath();
        }

        this.draw();
        this.isDrawing = false;
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