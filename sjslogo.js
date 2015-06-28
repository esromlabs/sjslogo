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
        this.h = new Heading();
        this.pen_down = true;
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
function pent(tick) {
    return tick * 36;
}
function w1(t, scale, level) {
    if (!level) {
        t.push();
        t.rt(pent(1));
        t.pd();
        t.fd(scale);
        t.pu();
        t.pop();
    }
    else {
        var s = scale * 0.61803399;
        var l = level - 1;
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
function w34(t, scale, level) {
    if (!level) {
        t.push();
        t.fd(scale * 1.61803399);
        t.lt(pent(4));
        t.pd();
        t.fd(scale);
        t.lt(pent(2));
        t.fd(scale);
        t.pu();
        t.pop();
    }
    else {
        var s = scale * 0.61803399;
        var l = level - 1;
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
function t4(t, scale, level) {
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
        var s = scale * 0.61803399;
        var l = level - 1;
        t.push();
        t.lt(pent(2));
        w34(t, s, l);
        t.pop();
    }
}
function t2w2(t, scale, level) {
    var s = scale * 0.61803399;
    var l = level - 1;
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
function t2(t, s) {
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
function w2(t, s) {
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
