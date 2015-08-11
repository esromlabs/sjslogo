var examples = {
    "first": "// You have a turtle named 'yurt' at the ready.\nyurt.pd();\nyurt.fd(20);\nyurt.rt(Math.random()*180-90);\n",
    "curves": '// yurt.home();\n// yurt.cs();\nyurt.pd(); // pen down\nyurt.fd(30);\nyurt.arc({radius:50, turn:"r", angle:140});\nyurt.rt(45); //turn right\nyurt.arc({radius:30, turn:"l", angle:128});\nyurt.fd(50);\n',
    "animation": 'var t = 0;\nwhile( t < 32 ) {\n  t += 1;\n  (function(t) {\n    setTimeout(function() {\n      yurt.home();\n      yurt.cs();\n      yurt.pd(); // pen down\n    yurt.rt(11.25*t); //turn right\n      yurt.fd(30);\n      yurt.arc({radius:50, turn:"r", angle:90});\n      yurt.lt(45); //turn left\n      yurt.arc({radius:30, turn:"l", angle:128});\n      yurt.fd(30);\n      yurt.arc({radius:50, turn:"r", angle:140});\n      yurt.rt(45); //turn right\n      yurt.arc({radius:30, turn:"l", angle:128});\n      yurt.fd(50);\n    }, 100*t);\n  })(t);\n}\n',
    "chaining": '// you can chain together yurtle calls\nyurt.pd().fd(20).lt(72).rt(36).fd(10);\n',
    "cloning": 'yurt.pd().fd(20).lt(72);\nyurt.clone("this.rt(36).fd(10);").run_mission();\n',
    "grid": '// make a grid using loops and clones.\nunit = 20;\ngridCountWidth = 10;\ngridCountHeight = 12;\nvar i = 0;\nfor (i = 0; i < gridCountHeight; i += 1) {\n    yurt.clone("this.rt(90).fd(gridCountWidth*unit);").run_mission();\n    yurt.pd().fd(unit);\n}\nyurt.rt(90)\nfor (i = 0; i < gridCountWidth; i += 1) {\n    yurt.pd().fd(unit).clone("this.rt(90).fd(gridCountHeight*unit);").run_mission();\n}\n'
};
var Page = (function () {
    function Page($) {
        this.current_script_name = "";
        this.$ = null;
        this.$ = $;
        this.current_script_name = "first";
        var page = this;
        $('#logo_code').val(examples[this.current_script_name]);
        $('#process').on('click', function () {
            var code = $('#logo_code').val();
            page.run_sjslogo({}, code);
        });
        $('#how_about_this').on('change', function () {
            this.current_script_name = $(this).val();
            var code = examples[this.current_script_name];
            if (code) {
                $('#logo_code').val(code);
                page.run_sjslogo({}, code);
            }
        });
        $('#yurt_go_home').on('click', function () {
            var code = 'yurt.home();';
            page.run_sjslogo({}, code);
        });
        $('#yurt_clear_screen').on('click', function () {
            var code = 'yurt.cs();';
            page.run_sjslogo({}, code);
        });
    }
    Page.prototype.run_sjslogo = function (env, code) {
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
        var sandbox = createSandbox(env, code, locals);
        sandbox();
        return env;
    };
    return Page;
})();
var Vector3 = (function () {
    function Vector3(v) {
        this.v = [];
        if (v) {
            this.v[0] = v[0];
            this.v[1] = v[1];
            this.v[2] = v[2];
        }
        else {
            this.v = [0, 0, 0];
        }
    }
    Vector3.prototype.applyProjection = function (matrix) {
        var ret_v = new Vector3();
        ret_v[0] = matrix.m[0][0] * this.v[0] + matrix.m[1][0] * this.v[1] + matrix.m[2][0] * this.v[2];
        ret_v[1] = matrix.m[0][1] * this.v[0] + matrix.m[1][1] * this.v[1] + matrix.m[2][1] * this.v[2];
        ret_v[2] = matrix.m[0][2] * this.v[0] + matrix.m[1][2] * this.v[1] + matrix.m[2][2] * this.v[2];
        return ret_v;
    };
    return Vector3;
})();
var Matrix33 = (function () {
    function Matrix33() {
        this.m = [];
        this.m = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
    }
    Matrix33.prototype.rotate = function (axis, angle) {
        var c = Math.cos(angle), s = Math.sin(angle);
        if (axis === 'x') {
            this.m = [
                [1, 0, 0],
                [0, c, -s],
                [0, s, c]
            ];
            return;
        }
        if (axis === 'y') {
            this.m = [
                [c, 0, s],
                [0, 1, 0],
                [-s, 0, c]
            ];
            return;
        }
        if (axis === 'z') {
            this.m = [
                [c, -s, 0],
                [s, c, 0],
                [0, 0, 1]
            ];
            return;
        }
    };
    Matrix33.prototype.compose = function (m2) {
        var i = 0, j = 0;
        for (i = 0; i < 3; i += 1) {
            for (j = 0; j < 3; j += 1) {
                this.m[i][j] = this.m[i][j] * m2[i][j];
            }
        }
    };
    return Matrix33;
})();
