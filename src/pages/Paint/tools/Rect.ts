import Tool from "./Tool";



export default class Rect extends Tool {
    
    saved: string

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.listen();
        this.saved = '';
    }
    
    listen() {
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    }

    mouseUpHandler(e:MouseEvent) {
        this.mouseDown = false
    }
    mouseDownHandler(e: MouseEvent) {
        this.mouseDown = true
        this.ctx.beginPath()
        let target = e.target as HTMLElement;
        this.startX = e.pageX - target.offsetLeft;
        this.startY = e.pageY - target.offsetTop;
        this.saved = this.canvas.toDataURL()
    }
    mouseMoveHandler(e: MouseEvent) {
        if(this.mouseDown) {
            let target = e.target as HTMLElement
            let currentX = e.pageX - target.offsetLeft;
            let currentY = e.pageY - target.offsetTop;
            let width = currentX - this.startX;
            let height = currentY - this.startY;
            this.draw(this.startX, this.startY, width, height)
        }
    }

    draw(x:number, y:number, w: number, h:number) {
        const img = new Image();
        img.src = this.saved;
        img.onload = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.rect(x, y, w, h)
            this.ctx.fill()
            this.ctx.stroke()
        }

    }
    
}