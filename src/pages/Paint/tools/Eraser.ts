import Tool from "./Tool";



export default class Eraser extends Tool {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(canvas: HTMLCanvasElement) {
        super(canvas);
        this.listen();
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
        let target = e.target as HTMLElement
        this.ctx.moveTo(e.pageX - target.offsetLeft, e.pageY - target.offsetTop)
    }
    mouseMoveHandler(e: MouseEvent) {
        if(this.mouseDown) {
            let target = e.target as HTMLElement
            this.draw(e.pageX - target.offsetLeft, e.pageY - target.offsetTop)
        }
    }

    draw(x:number, y:number) {
        this.ctx.lineTo(x, y)
        this.ctx.fillStyle = '#fff'
        this.ctx.strokeStyle = '#fff'
        this.ctx.stroke()
    }
    
}