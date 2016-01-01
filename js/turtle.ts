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
		//T3D.Heading = Heading;

    // Main Turtle Class
    class Turtle {
        ctx: CanvasRenderingContext2D;
        pos: Vector3;
        last: Vector3;
        text_path: string;
        h: Heading; // heading in radians
        pen_down: boolean;
        turtle_stack = [];
        mission:string = '';
        $ = null;

        constructor(ctx: CanvasRenderingContext2D, $) {
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
          nt.pos = new Vector3(this.pos.v);
          nt.last.v[0] = this.last.v[0];
          nt.last.v[1] = this.last.v[1];
          nt.h.rad = this.h.rad;
          nt.mission = code;
          return nt;
        }
        push() {
            this.turtle_stack.push([this.pos.v[0], this.pos.v[1], this.h.rad]);
            return this;
        }
        pop() {
            let pos = this.turtle_stack.pop();
            this.pos.v[0] = pos[0];
            this.pos.v[1] = pos[1];
            this.h.rad = pos[2];
            return this;
        }
        is_close(p1:Vector3, p2:Vector3):boolean {
          if (p1.v[0] + 0.01 > p2.v[0] && p1.v[0] - 0.01 < p2.v[0]
            && p1.v[1] + 0.01 > p2.v[1] && p1.v[1] - 0.01 < p2.v[1]) {
            return true;
          }
          else {
            return false;
          }
        }
        fd(dist: number) {
          let svg_text:string = '';
          let json_pt:string = '';
          let pt_a: Vector3 = new Vector3(this.pos.v);
          let pt_b: Vector3;
          this.pos.v[0] = this.pos.v[0] + dist * Math.cos(this.h.rad);
          this.pos.v[1] = this.pos.v[1] + dist * Math.sin(this.h.rad);
          pt_b = new Vector3(this.pos.v);
          if (this.pen_down) {
            // start a path output to either svg and/or JSON
            pt_b = new Vector3(this.pos.v);
            if (!this.is_close(this.last, pt_a)) {
                  // swap pt_a and pt_b
                  pt_b = new Vector3(pt_a.v);
                  pt_a = new Vector3(this.pos.v);
            }
            if (this.text_path === '') {
                  //svg_text = this.text_path + pt_a.v[0] + " " + pt_a.v[1] + ' \n';
                  this.text_path = 'M';
            }
            json_pt = "[" + pt_a.v[0] + ", " + pt_a.v[1];

            svg_text = this.text_path + pt_b.v[0]*0.3 + " " + pt_b.v[1]*0.3 + ' \n';
            this.text_path = ' L';
            json_pt +=  ", " + pt_b.v[0] + ", " + pt_b.v[1]+'],\n';
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
              this.ctx.arc(this.pos.v[0], this.pos.v[1], 3, 0, 2*Math.PI);
          }
          this.$('#svg_out').append(svg_text);
          this.$('#json_out').append(json_pt);
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
            this.pos.v[0] = this.ctx.canvas.width / 2;
            this.pos.v[1] = this.ctx.canvas.height / 2;
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
            center_x = this.pos.v[0] + opt.radius * Math.cos(heading_to_center);
            center_y = this.pos.v[1] + opt.radius * Math.sin(heading_to_center);
            end_x = center_x + opt.radius * Math.cos(end_angle);
            end_y = center_y + opt.radius * Math.sin(end_angle);
            if (this.pen_down) {
                this.ctx.beginPath();
                this.ctx.moveTo(this.pos.v[0], this.pos.v[1]);
								// ToDo make into ellipse rather than arc...
                this.ctx.arc(center_x, center_y, opt.radius, start_angle, end_angle, anti_CW);
                this.ctx.stroke();
                // start a path
                //this.text_path += " arc" + this.pos.v[0] + " " + this.pos.v[1];
            }
            this.h.rad = (opt.turn === "r") ? end_angle + Math.PI * 0.5 : end_angle - Math.PI * 0.5;
            this.pos.v[0] = end_x;
            this.pos.v[1] = end_y;
            this.last.v[0] = this.pos.v[0];
            this.last.v[1] = this.pos.v[1];
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
