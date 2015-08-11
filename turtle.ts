// http://www.typescriptlang.org/Playground
// a heading class to track the heading of a turtle.
module T3D {
    class Heading {
        rad: number;

				constructor() { this.rad = Math.PI * 1.5; }

        set(degrees: number) {
            this.rad = degrees * 0.0174532925;
        }
        add(degrees: number) {
            this.rad += degrees * 0.0174532925;
        }
    }
		T3D.Heading = Heading;

		class Camera {
			y_ratio: number = 1.0;
			transform(y:number):number {
				return y*this.y_ratio;
			}
		}
    // Main Turtle Class
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
				camera:Camera;
        mission:string = '';

        constructor(ctx: CanvasRenderingContext2D, $) {
            this.$ = $;
            this.ctx = ctx;
            this.x = ctx.canvas.width / 2;
            this.y = ctx.canvas.height / 2;
            this.last_x = -1;
            this.last_y = -1;
            this.h = new Heading();
            this.pen_down = true;
            this.text_path = "";
						this.camera = new Camera();
        }
        run_mission() {
          // Shadow some sensitive global objects
          var env = this;
          var locals = {
            "window": {},
            "document": {},
            "$": {},
            "jQuery": {}
          };
          // and mix in the environment
          locals = this.$.extend({}, locals, env);

          var createSandbox = function (env, code, locals) {
            var params = []; // the names of local variables
            var args = []; // the local variables

            for (var param in locals) {
              if (locals.hasOwnProperty(param)) {
                args.push(locals[param]);
                params.push(param);
              }
            }

            var context = Array.prototype.concat.call(env, params, code); // create the parameter list for the sandbox
            var sandbox = new (Function.prototype.bind.apply(Function, context))(); // create the sandbox function
            context = Array.prototype.concat.call(env, args); // create the argument list for the sandbox

            return Function.prototype.bind.apply(sandbox, context); // bind the local variables to the sandbox
          };

          // result is the 'this' object for the code
          //var result = {};
          var sandbox = createSandbox(env, this.mission, locals); // create a sandbox

          sandbox(); // call the user code in the sandbox
          return this;
        }

        clone(code) {
          var nt = new Turtle(this.ctx, this.$);
          nt.x = this.x;
          nt.y = this.y;
          nt.last_x = this.last_x;
          nt.last_y = this.last_y;
          nt.h.rad = this.h.rad;
          nt.camera = this.camera;
          nt.mission = code;
          return nt;
        }
        push() {
            this.turtle_stack.push([this.x, this.y, this.h.rad]);
            return this;
        }
        pop() {
            let pos = this.turtle_stack.pop();
            this.x = pos[0];
            this.y = pos[1];
            this.h.rad = pos[2];
            return this;
        }
        fd(dist: number) {
            this.ctx.beginPath();
            this.ctx.moveTo(this.x, this.camera.transform(this.y));
            if (this.pen_down && (
                this.x !== this.last_x ||
                this.y !== this.last_y)) {
                // start a path
                this.text_path += " m" + this.x + " " + this.y;
            }
            this.x = this.x + dist * Math.cos(this.h.rad);
            this.y = this.y + dist * Math.sin(this.h.rad);

            if (this.pen_down) {
                this.ctx.lineTo(this.x, this.camera.transform(this.y));
                this.ctx.stroke();
                // start a path
                this.text_path += " l" + this.x + " " + this.y;
                this.last_x = this.x;
                this.last_y = this.y;
            }
            else {
                this.ctx.moveTo(this.x, this.camera.transform(this.y));
            }
            return this;
        }
        bk(dist: number) {
            return this.fd(-dist);
        }
        rt(turn: number) {
            this.h.add(turn);
            return this;
        }
        lt(turn: number) {
            this.h.add(-turn);
            return this;
        }
        pu() {
            this.pen_down = false;
            return this;
        }
        pd() {
            this.pen_down = true;
            return this;
        }
        home() {
            this.x = this.ctx.canvas.width / 2;
            this.y = this.ctx.canvas.height / 2;
            this.h = new Heading();
            return this;
        }
        cs() {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            return this;
        }
        arc(opt) {
            var center_x, center_y;
            var heading_to_center;
            var start_angle, end_angle;
            var range = new Heading();
            range.set(opt.angle);
            var end_x, end_y;
            var anti_CW = false;
            // default options are a 90 degree right turn of radius of 50 pixels.
            opt = opt || { radius: 50, turn: "r", angle: Math.PI * 0.5 };
            if (opt.turn !== 'r') { anti_CW = true; }
            heading_to_center = (opt.turn === "r") ? this.h.rad + Math.PI * 0.5 : this.h.rad - Math.PI * 0.5;
            start_angle = heading_to_center - Math.PI;
            if (opt.turn === 'r') {
                end_angle = start_angle + range.rad;
            }
            else {
                end_angle = start_angle - range.rad;
            }

            //alert(heading_to_center);
            center_x = this.x + opt.radius * Math.cos(heading_to_center);
            center_y = this.y + opt.radius * Math.sin(heading_to_center);
            end_x = center_x + opt.radius * Math.cos(end_angle);
            end_y = center_y + opt.radius * Math.sin(end_angle);
            if (this.pen_down) {
                this.ctx.beginPath();
                this.ctx.moveTo(this.x, this.camera.transform(this.y));
								// ToDo make into ellipse rather than arc...
                this.ctx.arc(center_x, this.camera.transform(center_y), opt.radius, start_angle, end_angle, anti_CW);
                this.ctx.stroke();
                // start a path
                //this.text_path += " arc" + this.x + " " + this.y;
            }
            this.h.rad = (opt.turn === "r") ? end_angle + Math.PI * 0.5 : end_angle - Math.PI * 0.5;
            this.x = end_x;
            this.y = end_y;
            this.last_x = this.x;
            this.last_y = this.y;
            return this;
        }
    }
		T3D.Turtle = Turtle;
}
//var $ = $ || {};
// now make a turtle named yurt and a canvas and a 2d graphic context
var cav = $('<canvas></canvas>');
cav.attr("id", "myCanvas");
cav.attr("width", "1000");
cav.attr("height", "660");
cav.attr("style", "border: 1px solid #d3d3d3; background: #bbbbbb");

var ctx = cav[0].getContext("2d");
$('#turtlerarium').append(cav);

var yurt = new T3D.Turtle(ctx, $);
