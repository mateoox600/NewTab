
export default class Vector {

    constructor(public x: number, public y: number) {

    }

    public equal(v: Vector) {
        return v.x === this.x && v.y === this.y;
    }

    public rotate(ang: number) {
        ang = -ang * (Math.PI/180);
        var cos = Math.cos(ang);
        var sin = Math.sin(ang);
        this.x = Math.round(10000*(this.x * cos - this.y * sin))/10000;
        this.y = Math.round(10000*(this.x * sin + this.y * cos))/10000;
        return this;
    }

    public copy() {
        return new Vector(this.x, this.y);
    }

}