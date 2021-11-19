
export default abstract class Background {

    public abstract name: string;

    constructor(public ctx: CanvasRenderingContext2D) { }

    public abstract draw(): void;

}