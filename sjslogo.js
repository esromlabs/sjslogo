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
cav.width = 1000;
cav.height = 660;
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
        w2(t, scale, level);
        t.pop();
    }
    else {
        t.push();
        t.fd(s);
        t.rt(pent(1));
        t.fd(s);
        t.rt(pent(3));
        w34(t, s, l);
        t.pop();
        t.push();
        t.lt(pent(5));
        t.bk(scale * 1.61803399);
        w4(t, s, l);
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
function w2(t, scale, level) {
    var s = scale * 0.61803399;
    var l = level - 1;
    if (!level) {
        t.push();
        t.rt(pent(1));
        t.fd(scale);
        t.rt(pent(3));
        t.bk(scale);
        t.pd();
        t.fd(scale);
        t.pu();
        t.pop();
    }
    else {
        t.push();
        t.fd(scale * 1.61803399);
        t.rt(pent(4));
        w34(t, s, l);
        t.pop();
    }
}
function w3(t, scale, level) {
    var s = scale * 0.61803399;
    var l = level - 1;
    if (!level) {
        t.push();
        t.rt(pent(4));
        t.bk(scale);
        t.rt(pent(2));
        t.bk(scale);
        t.pd();
        t.fd(scale);
        t.pu();
        t.pop();
    }
    else {
        t.push();
        t.fd(scale * 1.61803399);
        t.rt(pent(4));
        w1t4(t, s, l);
        t.pop();
    }
}
function w4(t, scale, level) {
    var s = scale * 0.61803399;
    var l = level - 1;
    if (!level) {
        t.push();
        t.rt(pent(4));
        t.bk(scale);
        t.pd();
        t.fd(scale);
        t.pu();
        t.pop();
    }
    else {
        t.push();
        t.fd(scale * 1.61803399);
        t.lt(pent(4));
        w3(t, s, l);
        t.pop();
        t.push();
        t.lt(pent(4));
        t.bk(scale);
        t2w2(t, s, l);
        t.pop();
    }
}
function w1t4(t, scale, level) {
    var s = scale * 0.61803399;
    var l = level - 1;
    if (!level) {
        w1(t, scale, level);
        t.push();
        t.rt(pent(1));
        t.fd(scale);
        t.rt(pent(2));
        t.fd(scale);
        t.lt(pent(3));
        t4(t, scale, level);
        t.pop();
    }
    else {
        t.push();
        t.rt(pent(2));
        t.fd(scale);
        t.rt(pent(5));
        w34(t, s, l);
        t.bk(s);
        t.rt(pent(1));
        w4(t, s, l);
        t.pop();
    }
}
var level = 7;
yurt.pu();
yurt.bk(260);
w1(yurt, 350, level);
w2(yurt, 350, level);
w34(yurt, 350, level);
