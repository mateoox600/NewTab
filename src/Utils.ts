
export default class Utils {
    
    public static lerp(from: number, to: number, rate: number) {
        return (1 - rate) * from + rate * to;
    }


    public static clamp(n: number, min: number, max: number) {
        return Math.min(Math.max(n, min), max);
    }

}