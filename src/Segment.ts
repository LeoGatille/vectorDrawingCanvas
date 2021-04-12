import Coordinate from "./Coordinate";

export default class Segment {
    constructor(vector: Coordinate, coordinate: Coordinate) {
        this.vector = vector;
        this.coordinate = coordinate;
    }

    coordinate: Coordinate;
    vector: Coordinate;
    length = 0;
    angle: number;
}