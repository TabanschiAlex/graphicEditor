// eslint-disable-next-line import/no-unresolved
import Canvas from './Canvas';


class Events extends Canvas {
    protected curve: HTMLElement = document.querySelector('#curve');
    protected line: HTMLElement = document.querySelector('#line');
    protected rectangle: HTMLElement = document.querySelector('#rectangle');
    protected arc: HTMLElement = document.querySelector('#arc');
    protected sizeHtml: HTMLElement = document.querySelector('#size');
    protected colorPick: HTMLElement = document.querySelector('.colors_container');

    constructor() {
        super();
        this.calcWinSize();
        window.onresize = () => {
            this.calcWinSize();
        }

        this.colorPick.addEventListener('click', (e) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.color = e.target.id;
        });

        this.sizeHtml.addEventListener('change', (e) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.size = e.target.value;
        });

        this.curve.addEventListener('click', () => {
            this.currentFigure = 'curve';
        });

        this.line.addEventListener('click', () => {
            this.currentFigure = 'line';
        });

        this.rectangle.addEventListener('click', () => {
            this.currentFigure = 'rectangle';
        });

        this.arc.addEventListener('click', () => {
            this.currentFigure = 'arc';
        });

        this.canvas.addEventListener('mousedown', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            this.ctx.strokeStyle = this.color;
            this.ctx.fillStyle = this.color;
            this.ctx.lineWidth = this.size * 2;

            if (this.currentFigure === 'curve') {
                this.isMouseDown = true;
            }

            if (this.currentFigure === 'line') {
                this.coords.push(x, y);
                if (this.coords.length === 4) {
                    this.createLine();
                    this.coords = [];
                }
            }

            if (this.currentFigure === 'rectangle') {
                this.coords.push(x, y);
                if (this.coords.length === 4) {
                    this.createRectangle();
                    this.coords = [];
                }
            }

            if (this.currentFigure === 'arc') {
                this.coords.push(x, y);
                if (this.coords.length === 4) {
                    this.createArc();
                    this.coords = [];
                }
            }
        });

        this.canvas.addEventListener('mouseup', () => {
            this.isMouseDown = false;
            this.ctx.beginPath();
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (this.isMouseDown) {
                this.ctx.lineWidth = this.size * 2;
                this.ctx.strokeStyle = this.color;
                this.ctx.lineTo(e.clientX, e.clientY);
                this.ctx.stroke();

                this.ctx.beginPath();
                this.ctx.arc(e.clientX, e.clientY, this.size, 0, Math.PI * 2);
                this.ctx.fillStyle = this.color;
                this.ctx.fill();

                this.ctx.beginPath();
                this.ctx.moveTo(e.clientX, e.clientY);
            }
        });
    }
}

new Events();