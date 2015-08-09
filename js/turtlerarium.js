var examples = {
    "1": "// You have a turtle named 'yurt' at the ready.\nyurt.cs();\nyurt.home();\nyurt.pd();\nyurt.fd(20);\n",
    "2": 'yurt.home();\nyurt.cs();\nyurt.pd(); // pen down\nyurt.fd(30);\nyurt.arc({radius:50, turn:"r", angle:140});\nyurt.rt(45); //turn right\nyurt.arc({radius:30, turn:"l", angle:128});\nyurt.fd(50);\n',
    "3": 'var t = 0;\nwhile( t < 32 ) {\n  t += 1;\n  (function(t) {\n    setTimeout(function() {\n      yurt.home();\n      yurt.cs();\n      yurt.pd(); // pen down\n    yurt.rt(11.25*t); //turn right\n      yurt.fd(30);\n      yurt.arc({radius:50, turn:"r", angle:90});\n      yurt.lt(45); //turn left\n      yurt.arc({radius:30, turn:"l", angle:128});\n      yurt.fd(30);\n      yurt.arc({radius:50, turn:"r", angle:140});\n      yurt.rt(45); //turn right\n      yurt.arc({radius:30, turn:"l", angle:128});\n      yurt.fd(50);\n    }, 100*t);\n  })(t);\n}\n',
    "4": "yurt.pd();\nyurt.fd(20);\n"
};
var Page = (function () {
    function Page($) {
        this.current_script_name = "";
        this.$ = null;
        this.$ = $;
        this.current_script_name = "first";
        var page = this;
        $('#process').on('click', function () {
            var code = $('#logo_code').val();
            page.run_sjslogo({}, code);
        });
        $('#how_about_this').on('change', function () {
            var code = examples[$(this).val()];
            if (code) {
                $('#logo_code').val(code);
                page.run_sjslogo({}, code);
            }
        });
    }
    Page.prototype.load_script = function (script_name) {
        this.current_script_name = script_name;
    };
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
