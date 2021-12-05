import Tool from "./Tool";

export default class Line extends Tool {
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
        this.listen()
    }

    listen() {
        this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
        this.canvas.onmousedown = this.mouseDownHandler.bind(this)
        this.canvas.onmouseup = this.mouseUpHandler.bind(this)
    }

    mouseUpHandler(e) {
        this.mouseDown = false
        this.socket.send(JSON.stringify({
            method: 'draw',
            id: this.id,
            figure: {
                type: 'line',
                cx: e.pageX - e.target.offsetLeft,
                cy: e.pageY - e.target.offsetTop,
                x: this.currentX,
                y: this.currentY,
                fill_color: this.ctx.fillStyle,
                stroke_color: this.ctx.strokeStyle,
                line_width:this.ctx.lineWidth
            }
        }))
    }

    mouseDownHandler(e) {
        this.mouseDown = true
        this.currentX = e.pageX - e.target.offsetLeft
        this.currentY = e.pageY - e.target.offsetTop
        this.ctx.beginPath()
        this.ctx.moveTo(this.currentX, this.currentY)
        this.saved = this.canvas.toDataURL()
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
        }
    }

    draw(x, y) {
        const img = new Image()
        img.src = this.saved
        img.onload = async function () {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
            this.ctx.beginPath()
            this.ctx.moveTo(this.currentX, this.currentY)
            this.ctx.lineTo(x, y)
            this.ctx.stroke()
        }.bind(this)
    }

    static staticDraw(ctx, x, y,cx,cy,fill_color,stroke_color,line_width) {
        ctx.fillStyle = fill_color
        ctx.strokeStyle = stroke_color
        ctx.lineWidth = line_width
        ctx.beginPath()
        ctx.moveTo(cx, cy)
        ctx.lineTo(x, y)
        ctx.stroke()
    }
}