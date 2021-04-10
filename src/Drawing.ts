import Coordinate from './Coordinate';
export default class Drawing {
    constructor(originPoint: Coordinate, ctx: CanvasRenderingContext2D, color: string = 'black') {
        this.color = color;
        this.ctx = ctx;
        this.originPoint = originPoint;
    }
    color: string;
    ctx: CanvasRenderingContext2D;
    originPoint: Coordinate;
    path: Coordinate[] = [];
    public addCoordinate(coordinate) {
        this.path.push(new Coordinate(coordinate));
        this.draw();
    }

    private initPath() {
        this.ctx.beginPath();
        //! WARNING do not use canvas offset might be troubles here !
        this.ctx.moveTo(this.originPoint.x, this.originPoint.y);
    }

    private createPath() {
        if (this.path.length) {
            this.path.forEach((point, i) => {
                if (i % 2) {
                    this.ctx.bezierCurveTo(
                        i > 0 ? this.path[i - 1].x : this.originPoint.x,
                        i > 0 ? this.path[i - 1].y : this.originPoint.y,
                        point.x,
                        point.y,
                        i === this.path.length ? point.x : this.path[i + 1].x,
                        i === this.path.length ? point.y : this.path[i + 1].y
                    );
                }
            });
        }
    }
    public draw() {
        this.initPath();
        this.createPath();
        this.ctx.stroke();
    }
}