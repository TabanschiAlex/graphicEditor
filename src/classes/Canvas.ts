export default class Canvas {
    protected canvas: HTMLCanvasElement = document.querySelector('canvas');
    protected ctx: CanvasRenderingContext2D;
    protected isMouseDown = false;
    protected coords: number[] = [];
    protected currentFigure = 'curve';
    protected size = 2;
    protected color = 'black';

    constructor() {
        this.ctx = this.canvas.getContext('2d');
    }

    protected calcWinSize(): void {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx.lineWidth = this.size * 2;
    }

    protected createLine(): boolean {
        this.ctx.beginPath();
        this.ctx.moveTo(this.coords[0], this.coords[1]);
        this.ctx.lineTo(this.coords[2], this.coords[3]);
        this.ctx.stroke();

        return true;
    }

    protected createRectangle(): boolean {
        this.ctx.beginPath();
        this.ctx.rect(this.coords[0], this.coords[1], this.coords[2] - this.coords[0], this.coords[3] - this.coords[1]);
        this.ctx.stroke();

        return true;
    }

    protected createArc(): boolean {
        const r = Math.sqrt(Math.pow(this.coords[3] - this.coords[1], 2) + Math.pow(this.coords[2] - this.coords[0], 2));

        this.ctx.beginPath();
        this.ctx.arc(this.coords[0], this.coords[1], r, 0, 2 * Math.PI);
        this.ctx.stroke();

        return true;
    }
}