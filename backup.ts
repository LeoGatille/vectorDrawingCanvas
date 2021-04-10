/* WIP
private createPath() {
        if (this.path.length) {
            this.path.forEach((point, i) => {
    
                // if(this.path.length % 4 && i % 4) {
                //     /*
                //     P1 <= P1
                //     p2 <= P1 - (P2 - P1 - v1) / 6 * f
                //     p3 <= P2 + (P2 + v2 - P1) / 6 * f
                //     p4 <= P2

                //     */
                //     this.ctx.quadraticCurveTo(
                //         point.x, 
                //         point.y, 
                //         this.path[i - 1].x,
                //         this.path[i - 1].y
                //     )
                // }

                
                // if (i % 2) {


                //     this.ctx.bezierCurveTo(
                //         i > 0 ? this.path[i - 1].x : this.originPoint.x,
                //         i > 0 ? this.path[i - 1].y : this.originPoint.y,
                //         point.x,
                //         point.y,
                //          point.x,
                //          point.y
                //     );   

                    // this.ctx.bezierCurveTo(
                    //     i > 0 ? this.path[i - 1].x : this.originPoint.x,
                    //     i > 0 ? this.path[i - 1].y : this.originPoint.y,
                    //     (point.x + this.path[i - 1].x) / 2,
                    //     (point.y + this.path[i - 1].y) / 2,
                    //     point.x,
                    //     point.y
                    // );

                    


                    // const curveControl = {
                    //     x: (point.x + this.path[i - 1].x) / 2,
                    //     y: (point.y + this.path[i - 1].y) / 2,
                    // }
                    // this.ctx.quadraticCurveTo(point.x, point.y, curveControl.x, curveControl.y)
                    // if (i < this.path.length) {
                    //     this.ctx.quadraticCurveTo(point.x, point.y, this.path[i + 1].x, this.path[i + 1].y)
                    // }
        //         }
        //     });
        // }


        // private createPath() {
        //     if (this.path.length) {
        //         this.path.forEach((point, i) => {
        //             if (!(i % 2)) {                   
        //                 this.ctx.bezierCurveTo(
        //                     i > 0 ? this.path[i - 1].x : this.originPoint.x,
        //                     i > 0 ? this.path[i - 1].y : this.originPoint.y,
        //                     point.x,
        //                     point.y,
        //                     i === (this.path.length - 1) ? point.x : this.path[i + 1].x,
        //                     i === (this.path.length - 1) ? point.y : this.path[i + 1].y
        //                 );
        //             }
        //         });
        //     }
        // }