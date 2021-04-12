export class FrameRate {
    constructor() {
        // this.setFrameRate()
        requestAnimationFrame(() => {
            this.setFrameRate()
                .then(() => {
                    requestAnimationFrame(() => {
                        this.setFrameRate();
                    });
                })
        });

    }
    frameRate: number;
    lastFrameTimeStamp: number = performance.now();
    animationFrame;

    setFrameRate(): Promise<void> {
        return new Promise(res => {
            const currentFrameTimestamp = performance.now();
            // console.log('old => ', this.lastFrameTimeStamp, 'new => ', currentFrameTimestamp);

            this.frameRate = (currentFrameTimestamp - this.lastFrameTimeStamp);
            // console.log('frameRate => ', this.frameRate);
            this.lastFrameTimeStamp = currentFrameTimestamp;
            res();
        })
    }
}