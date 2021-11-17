
export default abstract class Map {

    constructor(public ctx: CanvasRenderingContext2D) { }

    public abstract draw(): void;

}