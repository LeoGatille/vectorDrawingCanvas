import Coordinate from './Coordinate';
export default class Drawing {
    constructor(originPoint: Coordinate, ctx: CanvasRenderingContext2D, color: string = 'black') {
        this.color = color;
        this.ctx = ctx;
        // this.originPoint = originPoint;


        this.addCoordinate({ posX: originPoint.x, posY: originPoint.y });
        this.addUglyCoordinate({ posX: originPoint.x, posY: originPoint.y });
    }
    color: string;
    ctx: CanvasRenderingContext2D;
    originPoint: Coordinate;
    path: Coordinate[] = [];
    uglyPath: Coordinate[] = [];
    display = true;

    public draw() {
        this.initPath();
        this.createPath();

        this.ctx.stroke();

        this.uglyPath.forEach((point, i) => {

            // this.ctx.beginPath();
            // this.ctx.arc(point.x, point.y, 1, 0, 2 * Math.PI);
            // this.ctx.fillStyle = 'red';
            // this.ctx.fill();


            //     // if (i % 2) {
            //     //     this.ctx.beginPath();
            //     //     this.ctx.arc((point.x + this.path[i - 1].x) / 2, (point.y + this.path[i - 1].y) / 2, 3, 0, 2 * Math.PI);
            //     //     this.ctx.fillStyle = 'green';
            //     //     this.ctx.fill();
            //     // } else {
            //     //     this.ctx.beginPath();
            //     //     this.ctx.arc(point.x, point.y, 3, 0, 2 * Math.PI);
            //     //     this.ctx.fillStyle = 'red';
            //     //     this.ctx.fill();
            //     // }
        })
    }


    public drawUgly() {
        this.initPath();
        this.createUglyPath();

        this.ctx.stroke();
    }
    createUglyPath() {
        if (!this.display) return;

        this.ctx.moveTo(this.path[0].x, this.path[0].y);

        if (this.path.length > 2) {
            this.path.forEach((point, i) => {
                if (i < this.path.length - 1) {
                    this.ctx.quadraticCurveTo(point.x, point.y, this.path[i + 1].x, this.path[i + 1].y);
                }
            })
        }

    }

    public addCoordinate(coordinate) {
        console.log('addCoordinate')
        this.path.push(new Coordinate(coordinate));
        // this.draw();
    }


    public addCircle() {
        this.ctx.beginPath();
        this.ctx.arc(this.path[0].x, this.path[0].y, 12, 0, 2 * Math.PI);
        this.ctx.fillStyle = 'blue';
        this.ctx.fill();
    }

    public addUglyCoordinate(coordinate) {
        this.uglyPath.push(new Coordinate(coordinate));
    }

    public removeUglyPath() {
        this.uglyPath = [];
    }

    public toggleDisplay() {
        this.display = !this.display;
        // this.draw();
    }

    protected initPath() {
        this.ctx.beginPath();
        this.ctx.lineCap = 'round';
        this.ctx.lineJoin = 'round';
        this.ctx.lineWidth = 5
    }

    protected createPath() {
        if (!this.display) return;

        this.ctx.moveTo(this.path[0].x, this.path[0].y);

        if (this.path.length > 2) {
            for (let i = 1; i < this.path.length - 2; i++) {
                // if (i > this.path.length - 2) {

                const p0 = this.path[i],
                    p1 = this.path[i + 1],
                    midx = (p0.x + p1.x) / 2,
                    midy = (p0.y + p1.y) / 2;

                this.ctx.quadraticCurveTo(p0.x, p0.y, midx, midy);
                // }
            };
            const p0 = this.path[this.path.length - 2],
                p1 = this.path[this.path.length - 1];

            this.ctx.quadraticCurveTo(p0.x, p0.y, p1.x, p1.y);
        }
        if (this.uglyPath.length > 2) {
            this.ctx.moveTo(this.path[this.path.length - 1].x, this.path[this.path.length - 1].y);
            this.uglyPath.forEach((point, i) => {
                if (i < this.uglyPath.length - 1) {
                    this.ctx.quadraticCurveTo(point.x, point.y, this.uglyPath[i + 1].x, this.uglyPath[i + 1].y);
                }
            })
        }



    }





    // private getControlPoint(vector, orthogonalOrigin: Coordinate, tangentOrigin: Coordinate,) {

    //     let length = 0;

    //     const vectorCopy = JSON.parse(JSON.stringify(vector))

    //     const orthogonal = {
    //         coordinate: JSON.parse(JSON.stringify(orthogonalOrigin)),
    //         vector: { posX: vectorCopy.y, posY: vectorCopy.x * -1 },
    //         // angle: this.getVectorAngle(vectorCopy),

    //     };
    //     const tangent = {
    //         coordinate: JSON.parse(JSON.stringify(tangentOrigin)),
    //         vector: { x: vectorCopy.x, y: vectorCopy.y },
    //         // angle: this.getVectorAngle(vectorCopy),
    //     }
    //     do {
    //         length++;

    //         orthogonal.coordinate.x += vector.sin() * -1;
    //         orthogonal.coordinate.y += vector.cos();

    //         tangent.coordinate.x += vector.cos();
    //         tangent.coordinate.y += vector.sin();

    //         // this.ctx.beginPath();

    //         this.ctx.beginPath();
    //         this.ctx.arc(tangentOrigin.x, tangentOrigin.y / 50, 3, 0, 2 * Math.PI);
    //         this.ctx.fillStyle = 'blue';
    //         this.ctx.fill();


    //         // this.ctx.beginPath();
    //         this.ctx.beginPath();
    //         this.ctx.arc(orthogonalOrigin.x, orthogonalOrigin.y / 2, 3, 0, 2 * Math.PI);
    //         this.ctx.fillStyle = 'pink';
    //         this.ctx.fill();


    //         /*
    //        orthogonal.coordinate.x += Math.cos(Math.atan2(orthogonal.vector.posY, orthogonal.vector.posX));
    //         orthogonal.coordinate.y += Math.sin(Math.atan2(orthogonal.vector.posY, orthogonal.vector.posX));

    //         tangent.coordinate.x += Math.cos(Math.atan2(vector.y, vector.x));
    //         tangent.coordinate.y += Math.sin(Math.atan2(vector.y, vector.x));

    //         */
    //         if (length === 1000) {
    //             console.log('Length === 1000');

    //             break;
    //         }
    //     } while (
    //         orthogonal.coordinate.x - tangent.coordinate.x > 50
    //         || orthogonal.coordinate.x - tangent.coordinate.x < -50
    //     );

    //     this.ctx.beginPath();
    //     this.ctx.arc(tangentOrigin.x, tangentOrigin.y / 50, 3, 0, 2 * Math.PI);
    //     this.ctx.fillStyle = 'blue';
    //     this.ctx.fill();


    //     // this.ctx.beginPath();
    //     this.ctx.beginPath();
    //     this.ctx.arc(orthogonalOrigin.x, orthogonalOrigin.y / 2, 3, 0, 2 * Math.PI);
    //     this.ctx.fillStyle = 'pink';
    //     this.ctx.fill();

    //     return tangent.coordinate;
    // }

    // setAngle() {
    //     const angle = 90 * Math.PI / 180;

    // }

    // setVecorAngle() {
    //     const angle = 90;

    // }

    // getVectorAngle(vector: Coordinate): number {
    //     const angle = Math.atan2(vector.y, vector.x);
    //     const degrees = 180 * angle / Math.PI;
    //     return (360 + Math.round(degrees)) % 360;
    // }
}
