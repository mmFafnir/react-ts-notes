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

        this.canvas.ontouchend = this.touchUpHandler.bind(this)
        this.canvas.ontouchstart = this.touchDownHandler.bind(this)
        this.canvas.ontouchmove = this.touchMoveHandler.bind(this)
    }

    touchUpHandler(e:TouchEvent) {
        this.mouseDown = false
    }

    touchDownHandler(e:TouchEvent) {
        this.mouseDown = true
        this.ctx.beginPath()
        let target = e.target as HTMLElement
        this.ctx.moveTo(e.touches[0].pageX - target.offsetLeft, e.touches[0].pageY - target.offsetTop)
    }

    touchMoveHandler(e:TouchEvent) {
        if(this.mouseDown) {
            let target = e.target as HTMLElement
            this.draw(e.touches[0].pageX - target.offsetLeft, e.touches[0].pageY - target.offsetTop)
        }
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