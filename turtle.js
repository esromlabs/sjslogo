// http://www.typescriptlang.org/Playground
var Heading = (function () {
    function Heading() {
        this.rad = Math.PI * 1.5;
    }
    Heading.prototype.add = function (degrees) {
        this.rad += degrees * 0.0174532925;
    };
    return Heading;
})();
var Turtle = (function () {
    function Turtle(ctx) {
        this.turtle_stack = [];
        this.ctx = ctx;
        this.x = ctx.canvas.width / 2;
        this.y = ctx.canvas.height / 2;
        this.last_x = -1;
        this.last_y = -1;
        this.h = new Heading();
        this.pen_down = true;
        this.text_path = "";
    }
    Turtle.prototype.push = function () {
        this.turtle_stack.push([this.x, this.y, this.h.rad]);
    };
    Turtle.prototype.pop = function () {
        var pos = this.turtle_stack.pop();
        this.x = pos[0];
        this.y = pos[1];
        this.h.rad = pos[2];
    };
    Turtle.prototype.fd = function (dist) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        if (this.pen_down && (this.x !== this.last_x ||
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
    };
    Turtle.prototype.bk = function (dist) {
        this.fd(-dist);
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
    Turtle.prototype.home = function () {
        this.x = ctx.canvas.width / 2;
        this.y = ctx.canvas.height / 2;
        this.h = new Heading();
    };
    return Turtle;
})();
// now make a turtle named yurt and a canvas and a 2d graphic context
var yurt, ctx;
var cav = $('<canvas></canvas>');
cav.attr("id", "myCanvas");
cav.attr("width", "1000");
cav.attr("height", "660");
cav.attr("style", "border: 1px solid #d3d3d3; background: #bbbbbb");
ctx = cav[0].getContext("2d");
$('body').append(cav);
var yurt = new Turtle(ctx);
