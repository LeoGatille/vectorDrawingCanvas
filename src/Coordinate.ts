export default class Coordinate {
    constructor({ posX, posY }) {
        this.x = posX;
        this.y = posY;
    }
    x: number;
    y: number;

    public setX(val: number) {
        this.x = val;
    }

    public setY(val: number) {
        this.y = val;
    }
}