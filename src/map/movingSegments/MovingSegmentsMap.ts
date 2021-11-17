import Map from '../Map';
import Point from './Point';
import Segment from '../../vector/Segment';
import Vector from '../../vector/Vector';
import Utils from '../../Utils';

export default class MovingSegmentsMap extends Map {

    public points: Point[] = [];
    public segments: Segment[] = [];
    public lastSegments: Segment[] = [];
    public cellSize = 100;
    public fade: number = 0;
    public size: Vector;
    public borders: Segment[]  = this.getBorderFormated();

    constructor(public ctx: CanvasRenderingContext2D) {
        super(ctx);
        
        this.size = new Vector(Math.floor(innerWidth / this.cellSize) + 2, Math.floor(innerHeight / this.cellSize) + 2);
        for(let cellX = 0; cellX < this.size.x; cellX++) {
            for(let cellY = 0; cellY < this.size.y; cellY++) {
                const x = cellX * this.cellSize + Math.floor(Math.random() * this.cellSize);
                const y = cellY * this.cellSize + Math.floor(Math.random() * this.cellSize);
                this.points.push(new Point(x, y, 1, new Vector(cellX, cellY)));
            }
        }
        
        setInterval(() => {
            this.updatePoints();
        }, 1000 / 60);
        
        setInterval(() => {
            this.calculateSegments();
        }, 10 * 1000);

        this.calculateSegments();
    }

    private getBorderFormated() {
        return [
            new Segment(new Vector(0, 0), new Vector(0, innerHeight)),
            new Segment(new Vector(0, innerHeight), new Vector(innerWidth, innerHeight)),
            new Segment(new Vector(innerWidth, innerHeight), new Vector(innerWidth, 0)),
            new Segment(new Vector(0, 0), new Vector(innerWidth, 0)),
            new Segment(new Vector(innerWidth / 5 * 4, 0), new Vector(innerWidth / 5 * 4, innerHeight / 5)),
            new Segment(new Vector(innerWidth / 5 * 4, innerHeight / 5), new Vector(innerWidth, innerHeight / 5)),
        ].map((v) => {
            v.from.x += this.cellSize;
            v.from.y += this.cellSize;
            v.to.x += this.cellSize;
            v.to.y += this.cellSize;
            return v;
        });
    }

    public draw() {

        if(Math.floor(innerWidth / this.cellSize) + 2 != this.size.x || Math.floor(innerHeight / this.cellSize) + 2 != this.size.y) {

            this.size = new Vector(Math.floor(innerWidth / this.cellSize) + 2, Math.floor(innerHeight / this.cellSize) + 2);
            
            this.points = this.points.filter((point) => {
                return point.cell.x <= this.size.x && point.cell.y <= this.size.y;
            });
            console.log(this.points);
            

            for(let cellX = 0; cellX < this.size.x; cellX++) {
                for(let cellY = 0; cellY < this.size.y; cellY++) {
                    if(this.getPointByCell(new Vector(cellX, cellY)) != undefined) continue;

                    const pointX = Math.floor(Math.random() * this.cellSize);
                    const pointY = Math.floor(Math.random() * this.cellSize);
                    const x = cellX * this.cellSize + pointX;
                    const y = cellY * this.cellSize + pointY;
    
                    this.points.push(new Point(x, y, 1, new Vector(cellX, cellY)));
                }
            }

            this.calculateSegments();
            this.borders = this.getBorderFormated();
        }

        this.ctx.save();

        this.ctx.translate(-this.cellSize, -this.cellSize);
    
        this.ctx.strokeStyle = `rgb(237, 239, 255, ${Math.min(this.fade, 255) / 256})`;
        this.ctx.lineWidth = 0.75;

        this.ctx.beginPath();
        this.segments.filter((seg) => !this.segments.find((s) => Segment.isIntersecting(seg, s) && (s.from !== seg.from && s.to !== seg.to) && (s.from !== seg.to && s.to !== seg.from))).forEach((segment) => {
    
            const colide = this.borders.map((border) => Segment.isIntersecting(border, segment));
    
            if(colide.find((v) => v)) return;
            
            if((segment.from.x > innerWidth - innerWidth / 5 + this.cellSize && segment.from.y < innerHeight / 5 + this.cellSize) ||
                (segment.to.x > innerWidth - innerWidth / 5 + this.cellSize && segment.to.y < innerHeight / 5 + this.cellSize)) return;
            
            this.ctx.moveTo(segment.from.x, segment.from.y);
            this.ctx.lineTo(segment.to.x, segment.to.y);
        });
        this.ctx.stroke();

        if(this.fade < 256) {
            this.fade += 5;
            this.ctx.strokeStyle = `rgba(237, 239, 255, ${Math.max(256 - this.fade, 0) / 256})`;
            this.ctx.beginPath();
            this.lastSegments.filter((seg) => !this.lastSegments.find((s) => Segment.isIntersecting(seg, s) && (s.from !== seg.from && s.to !== seg.to) && (s.from !== seg.to && s.to !== seg.from))).forEach((segment) => {
                const colide = this.borders.map((border) => Segment.isIntersecting(border, segment));
        
                if(colide.find((v) => v)) return;
        
                if(segment.from.x < 0 || segment.from.x > innerWidth || segment.from.y < 0 || segment.from.y > innerHeight ||
                    segment.to.x < 0 || segment.to.x > innerWidth || segment.to.y < 0 || segment.to.y > innerHeight) return;
                if((segment.from.x > innerWidth - innerWidth / 5 && segment.from.y < innerHeight / 5) ||
                    (segment.to.x > innerWidth - innerWidth / 5 && segment.to.y < innerHeight / 5)) return;
                
                this.ctx.moveTo(segment.from.x, segment.from.y);
                this.ctx.lineTo(segment.to.x, segment.to.y);
            });
            this.ctx.stroke();
        }

        this.ctx.restore();

    }

    public getPointByCell(cell: Vector) {
        return this.points.find((point) => point.cell.equal(cell));
    }

    public calculateSegments() {
        let lastSegmentsPoints = this.points.map((point) => new Point(point.x, point.y, point.rotationSpeed, point.cell));
        this.lastSegments = this.segments.map((seg) => {
            const from = lastSegmentsPoints.find((point) => point.equal(seg.from));
            const to = lastSegmentsPoints.find((point) => point.equal(seg.to));
            if(from == undefined) return undefined;
            if(to == undefined) return undefined;
            return new Segment(from, to);
        }).filter((seg) => seg != undefined) as Segment[];
        this.fade = 0;
        this.segments.length = 0;
        this.points.forEach((point) => {
            const neighbours: Point[] = [];
    
            neighbours.push(this.getPointByCell(new Vector(point.cell.x - 1, point.cell.y)) as Point);
            neighbours.push(this.getPointByCell(new Vector(point.cell.x, point.cell.y - 1)) as Point);
            neighbours.push(this.getPointByCell(new Vector(point.cell.x + 1, point.cell.y)) as Point);
            neighbours.push(this.getPointByCell(new Vector(point.cell.x, point.cell.y + 1)) as Point);
            neighbours.push(this.getPointByCell(new Vector(point.cell.x - 1, point.cell.y - 1)) as Point);
            neighbours.push(this.getPointByCell(new Vector(point.cell.x + 1, point.cell.y - 1)) as Point);
            neighbours.push(this.getPointByCell(new Vector(point.cell.x + 1, point.cell.y + 1)) as Point);
            neighbours.push(this.getPointByCell(new Vector(point.cell.x - 1, point.cell.y + 1)) as Point);
            
            neighbours.forEach((neighbour) => {
                if(neighbour == undefined) return;
                if(this.segments.find((v) => (v.from.equal(point) && v.to.equal(neighbour)) || (v.from.equal(neighbour) && v.to.equal(point)))) return;
                if(Math.random() < 0.4) this.segments.push(new Segment(point, neighbour));
            });
        });
    }

    public updatePoints() {
        this.points = this.points.map((point) => {
                
            point.rotationSpeed = Utils.clamp(point.rotationSpeed + (Math.random() / 10 - 0.05), 0.5, 1.25);
    
            const cellCenter = new Vector(point.cell.x * this.cellSize + (this.cellSize / 2), point.cell.y * this.cellSize + (this.cellSize / 2));
            const translate = new Vector(cellCenter.x - point.x, cellCenter.y - point.y);
            const rotatedTranslate = translate.copy().rotate(point.rotationSpeed);
            const pointTranslate = new Vector(translate.x - rotatedTranslate.x, translate.y - rotatedTranslate.y);
    
            point.x += pointTranslate.x;
            point.y += pointTranslate.y;
    
            return point;
        });
    }

}