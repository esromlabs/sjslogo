var Heading = (function () {
    function Heading() {
        this.rad = 0;
    }
    Heading.prototype.add = function (degrees) {
        this.rad += degrees * 0.0174532925;
    };
    return Heading;
})();
var Turtle = (function () {
    function Turtle(ctx) {
        this.ctx = ctx;
        this.x = 100;
        this.y = 100;
        this.h = new Heading();
        this.pen_down = true;
    }
    Turtle.prototype.fd = function (dist) {
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
    };
    Turtle.prototype.rt = function (turn) {
        this.h.add(turn);
    };
    Turtle.prototype.lt = function (turn) {
        this.h.add(-turn);
    };
    Turtle.prototype.pu = function () {
        this.pen_down = false;
    };
    Turtle.prototype.pd = function () {
        this.pen_down = true;
    };
    return Turtle;
})();
var ctx;
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
