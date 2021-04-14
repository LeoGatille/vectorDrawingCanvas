// import Drawing from "./Drawing";

// export class UglyDrawing extends Drawing {
//     constructor(originPoint, ctx, color = 'black') {
//         super(originPoint, ctx, color = 'black')
//     }

//     public drawUgly() {
//         this.initPath();
//         this.createUglyPath();
//         this.ctx.lineCap = 'round';
//         this.ctx.lineJoin = 'round';
//         this.ctx.stroke();
//     }

//     private createUglyPath() {
//         if (!this.display) return;

//         this.ctx.moveTo(this.path[0].x, this.path[0].y);

//         if (this.path.length > 2) {
//             this.path.forEach((point, i) => {
//                 if (i < this.path.length - 1) {
//                     this.ctx.quadraticCurveTo(point.x, point.y, this.path[i + 1].x, this.path[i + 1].y);
//                 }
//             })
//         }
//     }


// }