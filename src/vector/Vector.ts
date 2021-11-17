
export default class Vector {

    constructor(public x: number, public y: number) { }

    public equal(v: Vector) {
        return v.x === this.x && v.y === this.y;
    }

    public rotate(ang: number) {
        ang = -ang * (Math.PI/180);
        var cos = Math.cos(ang);
        var sin = Math.sin(ang);
        let tempX = this.x;
        this.x = this.x * cos - this.y * sin;
        this.y = tempX * sin + this.y * cos;
        return this;
    }

    public distance(vec: Vector) {
        return Math.sqrt(Math.pow(this.y - vec.y, 2) + Math.pow(this.x - vec.x, 2));
    }

    public copy() {
        return new Vector(this.x, this.y);
    }

}