class Turtle {
	ctx: CanvasRenderingContext2D;
	x: number;
	y: number;
	h: number; // heading in radians
	pen_down: boolean;
	
    constructor(ctx : CanvasRenderingContext2D) {
        this.ctx = ctx;
        this.x = 100;
        this.y = 100;
        this.h = 0;
        this.pen_down = true;
    }
    
    fd(dist: number) {
		  this.ctx.beginPath();
		  this.ctx.moveTo(this.x, this.y);
      this.x = this.x + dist * Math.cos(this.h);
      this.y = this.y + dist * Math.sin(this.h);

		  if (this.pen_down) {
  		  this.ctx.lineTo(this.x, this.y);
  		  this.ctx.stroke();
		  }
		  else {
		    this.ctx.moveTo(this.x, this.y);
		  }
    }
    
    
}

var ctx: CanvasRenderingContext2D;
var cav = document.createElement('canvas');
cav.id = "myCanvas";
cav.width = 300;
cav.height = 200;
cav.style.border = "1px solid #d3d3d3";
cav.style.background = '#bbbbbb';
document.body.appendChild(cav);
ctx = cav.getContext("2d");
var yurt = new Turtle(ctx);
yurt.fd(50);
