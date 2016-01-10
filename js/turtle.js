var T3D;
(function (T3D) {
    var Heading = (function () {
        function Heading() {
            this.rad = Math.PI * 1.5;
        }
        Heading.prototype.set = function (degrees) {
            this.rad = degrees * 0.0174532925;
        };
        Heading.prototype.add = function (degrees) {
            this.rad += degrees * 0.0174532925;
        };
        return Heading;
    })();
    var Turtle = (function () {
        function Turtle(ctx, $) {
            this.turtle_stack = [];
            this.mission = '';
            this.$ = null;
            this.$ = $;
            this.ctx = ctx;
            this.pos = new Vector3();
            this.pos.v[0] = ctx.canvas.width / 2;
            this.pos.v[1] = ctx.canvas.height / 2;
            this.last = new Vector3();
            this.last.v[0] = -1;
            this.last.v[1] = -1;
            this.h = new Heading();
            this.pen_down = true;
            this.text_path = "";
            var undashed_array = this.ctx.getLineDash();
            this.dashed = { i: 0, arr: [undashed_array, [2, 4]] };
        }
        Turtle.prototype.run_mission = function () {
            var env = this;
            var locals = {
                "window": {},
                "document": {},
                "$": {},
                "jQuery": {}
            };
            locals = this.$.extend({}, locals, env);
            var createSandbox = function (env, code, locals) {
                var params = [];
                var args = [];
                for (var param in locals) {
                    if (locals.hasOwnProperty(param)) {
                        args.push(locals[param]);
                        params.push(param);
                    }
                }
                var context = Array.prototype.concat.call(env, params, code);
                var sandbox = new (Function.prototype.bind.apply(Function, context))();
                context = Array.prototype.concat.call(env, args);
                return Function.prototype.bind.apply(sandbox, context);
            };
            var sandbox = createSandbox(env, this.mission, locals);
            sandbox();
            return this;
        };
        Turtle.prototype.clone = function (code) {
            var nt = new Turtle(this.ctx, this.$);
            nt.pos = new Vector3(this.pos.v);
            nt.last.v[0] = this.last.v[0];
            nt.last.v[1] = this.last.v[1];
            nt.h.rad = this.h.rad;
            nt.mission = code;
            return nt;
        };
        Turtle.prototype.push = function () {
            this.turtle_stack.push([this.pos.v[0], this.pos.v[1], this.h.rad, this.dashed.i]);
            return this;
        };
        Turtle.prototype.pop = function () {
            var pos = this.turtle_stack.pop();
            this.pos.v[0] = pos[0];
            this.pos.v[1] = pos[1];
            this.h.rad = pos[2];
            this.dashed.i = pos[3];
            this.dash(this.dashed.i);
            return this;
        };
        Turtle.prototype.is_close = function (p1, p2) {
            if (p1.v[0] + 0.01 > p2.v[0] && p1.v[0] - 0.01 < p2.v[0]
                && p1.v[1] + 0.01 > p2.v[1] && p1.v[1] - 0.01 < p2.v[1]) {
                return true;
            }
            else {
                return false;
            }
        };
        Turtle.prototype.fd = function (dist, rise) {
            if (rise === void 0) { rise = 0; }
            var svg_text = '';
            var json_pt = '';
            var pt_a = new Vector3(this.pos.v);
            var pt_b;
            this.pos.v[0] = this.pos.v[0] + dist * Math.cos(this.h.rad);
            this.pos.v[1] = this.pos.v[1] + dist * Math.sin(this.h.rad);
            this.pos.v[2] = this.pos.v[2] + rise;
            pt_b = new Vector3(this.pos.v);
            if (this.pen_down) {
                pt_b = new Vector3(this.pos.v);
                if (!this.is_close(this.last, pt_a)) {
                    pt_b = new Vector3(pt_a.v);
                    pt_a = new Vector3(this.pos.v);
                }
                if (this.text_path === '') {
                    this.text_path = 'M';
                }
                json_pt = "[" + pt_a.v[0] + ", " + pt_a.v[1];
                svg_text = this.text_path + pt_b.v[0] * 0.3 + " " + pt_b.v[1] * 0.3 + ' \n';
                this.text_path = ' L';
                json_pt += ", " + pt_b.v[0] + ", " + pt_b.v[1] + ", " + pt_b.v[2] + '],\n';
                this.ctx.beginPath();
                this.ctx.moveTo(pt_a.v[0], pt_a.v[1]);
                this.ctx.lineTo(pt_b.v[0], pt_b.v[1]);
                this.ctx.stroke();
                if (dist > 0) {
                    this.last.v[0] = pt_b.v[0];
                    this.last.v[1] = pt_b.v[1];
                }
                else {
                    this.last.v[0] = this.pos.v[0];
                    this.last.v[1] = this.pos.v[1];
                }
            }
            else {
                this.ctx.moveTo(this.pos.v[0], this.pos.v[1]);
                this.ctx.arc(this.pos.v[0], this.pos.v[1], 3, 0, 2 * Math.PI);
            }
            this.$('#svg_out').append(svg_text);
            this.$('#json_out').append(json_pt);
            return this;
        };
        Turtle.prototype.bk = function (dist, rise) {
            if (rise === void 0) { rise = 0; }
            return this.fd(-dist, -rise);
        };
        Turtle.prototype.rt = function (turn) {
            this.h.add(turn);
            return this;
        };
        Turtle.prototype.lt = function (turn) {
            this.h.add(-turn);
            return this;
        };
        Turtle.prototype.pu = function () {
            this.pen_down = false;
            return this;
        };
        Turtle.prototype.pd = function () {
            this.pen_down = true;
            return this;
        };
        Turtle.prototype.dash = function (i) {
            this.dashed.i = i;
            this.ctx.setLineDash(this.dashed.arr[this.dashed.i]);
        };
        Turtle.prototype.home = function () {
            this.pos.v[0] = this.ctx.canvas.width / 2;
            this.pos.v[1] = this.ctx.canvas.height / 2;
            this.h = new Heading();
            return this;
        };
        Turtle.prototype.cs = function () {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            return this;
        };
        Turtle.prototype.arc = function (opt) {
            var center_x, center_y;
            var heading_to_center;
            var start_angle, end_angle;
            var range = new Heading();
            range.set(opt.angle);
            var end_x, end_y;
            var anti_CW = false;
            opt = opt || { radius: 50, turn: "r", angle: Math.PI * 0.5 };
            if (opt.turn !== 'r') {
                anti_CW = true;
            }
            heading_to_center = (opt.turn === "r") ? this.h.rad + Math.PI * 0.5 : this.h.rad - Math.PI * 0.5;
            start_angle = heading_to_center - Math.PI;
            if (opt.turn === 'r') {
                end_angle = start_angle + range.rad;
            }
            else {
                end_angle = start_angle - range.rad;
            }
            center_x = this.pos.v[0] + opt.radius * Math.cos(heading_to_center);
            center_y = this.pos.v[1] + opt.radius * Math.sin(heading_to_center);
            end_x = center_x + opt.radius * Math.cos(end_angle);
            end_y = center_y + opt.radius * Math.sin(end_angle);
            if (this.pen_down) {
                this.ctx.beginPath();
                this.ctx.moveTo(this.pos.v[0], this.pos.v[1]);
                this.ctx.arc(center_x, center_y, opt.radius, start_angle, end_angle, anti_CW);
                this.ctx.stroke();
            }
            this.h.rad = (opt.turn === "r") ? end_angle + Math.PI * 0.5 : end_angle - Math.PI * 0.5;
            this.pos.v[0] = end_x;
            this.pos.v[1] = end_y;
            this.last.v[0] = this.pos.v[0];
            this.last.v[1] = this.pos.v[1];
            return this;
        };
        return Turtle;
    })();
    T3D.Turtle = Turtle;
})(T3D || (T3D = {}));
var cav = $('<canvas></canvas>');
cav.attr("id", "myCanvas");
cav.attr("width", "1000");
cav.attr("height", "660");
cav.attr("style", "border: 1px solid #d3d3d3; background: #bbbbbb");
var ctx = cav[0].getContext("2d");
$('#turtlerarium').append(cav);
var yurt = new T3D.Turtle(ctx, $);
