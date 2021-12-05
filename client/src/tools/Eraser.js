import Tool from "./Tool";
import Brush from "./Brush";

export default class Eraser extends Brush {
    constructor(canvas, socket, id) {
        super(canvas, socket, id);
    }

    draw(x, y) {
        this.ctx.strokeStyle = "white"
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }

    mouseMoveHandler(e) {
        if (this.mouseDown) {
            // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
            this.socket.send(JSON.stringify({
                method: 'draw',
                id: this.id,
                figure: {
                    type: 'eraser',
                    x: e.pageX - e.target.offsetLeft,
                    y: e.pageY - e.target.offsetTop,
                    line_width: this.ctx.lineWidth
                }
            }))
        }
    }

    static staticDraw(ctx, x, y, line_width) {
        ctx.strokeStyle = "white"
        ctx.lineWidth = line_width
        ctx.lineTo(x, y)
        ctx.stroke()
    }

}