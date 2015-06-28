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
	h: Heading; // heading in radians
	pen_down: boolean;
	turtle_stack = [];
    constructor(ctx : CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.x = ctx.canvas.width/2;
        this.y = ctx.canvas.height/2;
        this.h = new Heading();
        this.pen_down = true;
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
		this.x = this.x + dist * Math.cos(this.h.rad);
		this.y = this.y + dist * Math.sin(this.h.rad);

		if (this.pen_down) {
			this.ctx.lineTo(this.x, this.y);
			this.ctx.stroke();
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

var ctx: CanvasRenderingContext2D;
var cav = document.createElement('canvas');
cav.id = "myCanvas";
cav.width = 600;
cav.height = 400;
cav.style.border = "1px solid #d3d3d3";
cav.style.background = '#bbbbbb';
document.body.appendChild(cav);
ctx = cav.getContext("2d");
var yurt = new Turtle(ctx);
function pent(tick: number) {
	return tick * 36;
}
function w1(t: Turtle, scale: number, level: number) {
	if (!level) {
		t.push();
		t.rt(pent(1));
		t.pd();
		t.fd(scale);
		t.pu();
		t.pop();
	}
	else {
		let s = scale * 0.61803399;
		let l = level - 1;
		t.push();
		t.lt(pent(3));
		t.bk(scale);
		w34(t, s, l);
		t.pop();

		t.push();
		t.lt(pent(4));
		t.bk(scale);
		t4(t, s, l);
		t.pop();
	}
}
function w34(t: Turtle, scale: number, level: number) {
	if (!level) {
		t.push();
		t.fd(scale * 1.61803399)
		t.lt(pent(4));
		t.pd();
		t.fd(scale);
		t.lt(pent(2));
		t.fd(scale);
		t.pu();
		t.pop();
	}
	else {
		let s = scale * 0.61803399;
		let l = level - 1;
		t.push();
		t.rt(pent(5));
		t.bk(scale * 1.61803399);
		t.lt(pent(1));
		w1(t, s, l);
		t.pop();
		
		t.push();
		t.lt(pent(4));
		t.bk(scale);
		t2w2(t, s, l);
		t.pop();
	}	
}
function t4(t: Turtle, scale: number, level: number) {
	if (!level) {
		t.push();
		t.rt(pent(3));
		t.bk(scale);
		t.pd();
		t.fd(scale);
		t.pu();
		t.pop();
	}
	else {
		let s = scale * 0.61803399;
		let l = level - 1;
		t.push();
		t.lt(pent(2));
		w34(t, s, l);
		t.pop();
	}	
}
function t2w2(t: Turtle, scale: number, level: number) {
	let s = scale * 0.61803399;
	let l = level - 1;
	if (!level) {
		t2(t, scale);
		
		t.push();
		t.lt(pent(2));
		t.fd(scale);
		t.rt(pent(3));
		w2(t, scale);
		t.pop();
	}
	else {
		t.push();
		t.lt(pent(3));
		t.bk(scale);
		// w34(t, s, l);
		t.pop();

		t.push();
		t.lt(pent(5));
		t.bk(scale);
		// t4();
		t.pop();	
	}	
}
function t2(t: Turtle, s: number) {
	t.push();
	t.rt(pent(2));
	t.fd(s);
	t.rt(pent(1));
	t.bk(s);
	t.pd();
	t.fd(s);
	t.pu();
	t.pop();
}
function w2(t: Turtle, s: number) {
	t.push();
	t.rt(pent(1));
	t.fd(s);
	t.rt(pent(3));
	t.bk(s);
	t.pd();
	t.fd(s);
	t.pu();
	t.pop();
}
yurt.pu();
//w34(yurt, 160, 0);
//t4 (yurt, 160, 0);
//t2(yurt, 160);
//w2(yurt, 160);
w1(yurt, 160, 2);

