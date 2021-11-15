import Vector from '../vector/Vector';

export default class Point extends Vector {

    constructor(public x: number, public y: number, public rotationSpeed: number, public cell: Vector) {
        super(x, y);
    }

}