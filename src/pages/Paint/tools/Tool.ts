
export default class Tool {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    mouseDown:boolean;
    startX: number;
    startY: number
    
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d')!
        this.mouseDown = false;
        this.startX = 0;
        this.startY = 0;
        this.ctx.fillStyle = '#000';
        this.ctx.strokeStyle = '#000';
        this.ctx.lineCap = "round";
        this.destroyEvents()
    }
    
    set fillColor(color: string) {
        this.ctx.fillStyle = color
    }

    set strokeColor(color: string) {
        this.ctx.strokeStyle = color
    }
    
    set lineWidth(width: number) {
        this.ctx.lineWidth = width
    }

    destroyEvents() {
        this.canvas.onmouseup = null
        this.canvas.onmousedown = null
        this.canvas.onmousemove = null
    }
}