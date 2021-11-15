import Vector from './Vector';

export default class Segment {

    constructor(public from: Vector, public to: Vector) {

    }

    public static isIntersecting(s1: Segment, s2: Segment) {
        function CCW(p1: Vector, p2: Vector, p3: Vector) {
            return (p3.y - p1.y) * (p2.x - p1.x) > (p2.y - p1.y) * (p3.x - p1.x);
        }
        return (CCW(s1.from, s2.from, s2.to) != CCW(s1.to, s2.from, s2.to)) && (CCW(s1.from, s1.to, s2.from) != CCW(s1.from, s1.to, s2.to));
    }

}