// http://www.typescriptlang.org/Playground
class Heading {
	rad: number;
	constructor() { this.rad = Math.PI * 1.5; }
	add(degrees: number) {
		this.rad += degrees * 0.0174532925;
	}
}

class Turtle {
	ctx: CanvasRenderingContext2D;
	x: number;
	y: number;
	last_x: number;
	last_y: number;
	text_path: string;
	h: Heading; // heading in radians
	pen_down: boolean;
	turtle_stack = [];
    constructor(ctx : CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.x = ctx.canvas.width/2;
        this.y = ctx.canvas.height/2;
        this.last_x = -1;
        this.last_y = -1;
        this.h = new Heading();
        this.pen_down = true;
		this.text_path = "";
    }
    push() {
		this.turtle_stack.push([this.x, this.y, this.h.rad]);
	}
    pop() {
		let pos = this.turtle_stack.pop();
		this.x = pos[0];
		this.y = pos[1];
		this.h.rad = pos[2];
	}
    fd(dist: number) {
		this.ctx.beginPath();
		this.ctx.moveTo(this.x, this.y);
		if (this.pen_down && (
			this.x !== this.last_x ||
			this.y !== this.last_y)) {
			// start a path
			this.text_path += "m" + this.x + " " + this.y;
		}
		this.x = this.x + dist * Math.cos(this.h.rad);
		this.y = this.y + dist * Math.sin(this.h.rad);

		if (this.pen_down) {
			this.ctx.lineTo(this.x, this.y);
			this.ctx.stroke();
			// start a path
			this.text_path += "l" + this.x + " " + this.y;
			this.last_x = this.x;
			this.last_y = this.y;
		}
		else {
			this.ctx.moveTo(this.x, this.y);
		}
	}
	bk(dist: number) {
		this.fd(-dist);
	}
    rt(turn: number) {
		this.h.add(turn);
	}
    lt(turn: number) {
      this.h.add(-turn);
    }
    pu() {
      this.pen_down = false;
    }
    pd() {
      this.pen_down = true;
    }
}
// now make a turtle named yurt and a canvas and a 2d graphic context
var yurt, ctx;
var cav = $('<canvas></canvas>');
cav.attr( "id", "myCanvas");
cav.attr( "width", "1000");
cav.attr( "height", "660");
cav.attr( "style", "border: 1px solid #d3d3d3; background: #bbbbbb");

ctx = cav[0].getContext("2d");
$('body').append(cav);

var yurt = new Turtle(ctx);
