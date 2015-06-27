class Heading {
	rad: number;
	constructor() { this.rad = 0; }
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
	
    constructor(ctx : CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.x = 100;
        this.y = 100;
        this.h = new Heading();
        this.pen_down = true;
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
yurt.fd(50);
yurt.rt(90);
yurt.fd(30);
yurt.rt(90);
yurt.fd(40);
yurt.pu();
yurt.rt(90);
yurt.fd(40);
yurt.pd();
yurt.rt(90);
yurt.fd(40);
