
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
        this.x = (this.x * cos - this.y * sin);
        this.y = (this.x * sin + this.y * cos);
        return this;
    }

    public distance(vec: Vector) {
        let a = this.x - vec.x;
        let b = this.y - vec.y;
        return Math.sqrt(a*a + b*b);
    }

    public copy() {
        return new Vector(this.x, this.y);
    }

}