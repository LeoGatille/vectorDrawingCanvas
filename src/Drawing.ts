import Coordinate from './Coordinate';
export default class Drawing {
    constructor(originPoint: Coordinate, ctx: CanvasRenderingContext2D, color: string = 'black') {
        this.color = color;
        this.ctx = ctx;
        // this.originPoint = originPoint;
        this.addCoordinate(originPoint);
    }
    color: string;
    ctx: CanvasRenderingContext2D;
    originPoint: Coordinate;
    path: Coordinate[] = [];
    display = true;

    public draw() {
        this.initPath();
        this.createPath();
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.stroke();
        this.ctx.imageSmoothingEnabled = true;

        this.path.forEach((point, i) => {
            if (i % 2) {
                this.ctx.beginPath();
                this.ctx.arc((point.x + this.path[i - 1].x) / 2, (point.y + this.path[i - 1].y) / 2, 3, 0, 2 * Math.PI);
                this.ctx.fillStyle = 'green';
                this.ctx.fill();
            } else {
                this.ctx.beginPath();
                this.ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
                this.ctx.fillStyle = 'red';
                this.ctx.fill();
            }
        })
    }

    public addCoordinate(coordinate) {
        this.path.push(new Coordinate(coordinate));
        // this.draw();
    }

    public toggleDisplay() {
        this.display = !this.display;
        // this.draw();
    }

    private initPath() {
        this.ctx.beginPath();
        this.ctx.lineWidth = 5
    }


    private createPath() {
        if (!this.display) return;

        /*
            function intersects(a,b,c,d,p,q,r,s) {
            var det, gamma, lambda;
            det = (c - a) * (s - q) - (r - p) * (d - b);
            if (det === 0) {
                return false;
            } else {
                lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
                gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
                return (0 < lambda && lambda < 1) && (0 < gamma && gamma < 1);
            }
            };
        */



        if (this.path.length) {
            this.path.forEach((point, i) => {
                if (i % 2) {
                    console.log("1 => ", i);
                    this.ctx.quadraticCurveTo(
                        i < this.path.length - 1 ? ((point.x + this.path[i - 1].x) / 2) : point.x,
                        i < this.path.length - 1 ? ((point.y + this.path[i - 1].y) / 2) : point.y,
                        point.x,
                        point.y,
                    )
                } else {
                    console.log("0 => ", i);
                    if (i !== 0) {
                        this.ctx.moveTo(this.path[i - 1].x, this.path[i - 1].y);
                    } else {
                        this.ctx.moveTo(point.x, point.y)
                    }
                }
            });
        }
    }


    // private createPath() {
    //     if (!this.display) return;
    //     if (this.path.length) {
    //         this.path.forEach((point, i) => {

    //             if (i % 2) {


    //                 this.ctx.quadraticCurveTo(this.path[i - 1].x, this.path[i - 1].y, point.x, point.y,)
    //                 // this.ctx.quadraticCurveTo(point.x, point.y, this.path[i - 1].x, this.path[i - 1].y)



    //                 // this.ctx.bezierCurveTo(
    //                 //     this.path[i - 1].x,
    //                 //     this.path[i - 1].y,
    //                 //     (point.x + this.path[i - 1].x) / 2,
    //                 //     (point.y + this.path[i - 1].y) / 2,
    //                 //     i < this.path.length - 1 ? this.path[i + 1].x : point.x,
    //                 //     i < this.path.length - 1 ? this.path[i + 1].y : point.y
    //                 // );



    //                 // this.ctx.bezierCurveTo(
    //                 //     i > 0 ? this.path[i - 1].x : this.originPoint.x,
    //                 //     i > 0 ? this.path[i - 1].y : this.originPoint.y,
    //                 //     point.x,
    //                 //     point.y,
    //                 //      point.x,
    //                 //      point.y
    //                 // );
    //                 // const curveControl = {
    //                 //     x: (point.x + this.path[i - 1].x) / 2,
    //                 //     y: (point.y + this.path[i - 1].y) / 2,
    //                 // }
    //                 // this.ctx.quadraticCurveTo(point.x, point.y, curveControl.x, curveControl.y)
    //             }
    //         });
    //     }
    // }

}
