var examples = {
  "1":"// You have a turtle named 'yurt' at the ready.\nyurt.cs();\nyurt.home();\nyurt.pd();\nyurt.fd(20);\n",
  "2":'yurt.home();\nyurt.cs();\nyurt.pd(); // pen down\nyurt.fd(30);\nyurt.arc({radius:50, turn:"r", angle:140});\nyurt.rt(45); //turn right\nyurt.arc({radius:30, turn:"l", angle:128});\nyurt.fd(50);\n',
  "3":'var t = 0;\nwhile( t < 32 ) {\n  t += 1;\n  (function(t) {\n    setTimeout(function() {\n      yurt.home();\n      yurt.cs();\n      yurt.pd(); // pen down\n    yurt.rt(11.25*t); //turn right\n      yurt.fd(30);\n      yurt.arc({radius:50, turn:"r", angle:90});\n      yurt.lt(45); //turn left\n      yurt.arc({radius:30, turn:"l", angle:128});\n      yurt.fd(30);\n      yurt.arc({radius:50, turn:"r", angle:140});\n      yurt.rt(45); //turn right\n      yurt.arc({radius:30, turn:"l", angle:128});\n      yurt.fd(50);\n    }, 100*t);\n  })(t);\n}\n',
  "4":"yurt.pd();\nyurt.fd(20);\n"
};

class Page {
  current_script_name:string = "";
  $ = null;
  constructor($) {
    this.$ = $;
    this.current_script_name = "first";
    var page = this;
    $('#process').on('click', function() {
      var code = $('#logo_code').val();
      page.run_sjslogo({}, code);
    });
    $('#how_about_this').on('change', function() {
      //alert($(this).val());
      var code = examples[$(this).val()];
      if (code) {
        $('#logo_code').val(code);
        page.run_sjslogo({}, code);
      }
    });

  }
  load_script(script_name:string) {
    this.current_script_name = script_name;
    // load into the editing area and run the script

  }

  // sandbox for functional (saferEval)
  // create our own local versions of window and document with limited functionality
  run_sjslogo(env, code:string) {
    // Shadow some sensitive global objects
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
    var sandbox = createSandbox(env, code, locals); // create a sandbox

    sandbox(); // call the user code in the sandbox
    return env;
  }
}

class Vector3 {
  v:array = [];
  constructor(v:Array) {
    if (v) {
      this.v[0] = v[0];
      this.v[1] = v[1];
      this.v[2] = v[2];
    }
    else {
      this.v = [0,0,0];
    }
  }
  applyProjection(matrix:Matrix33):Vector3 {
    let ret_v = new Vector3();
    ret_v[0] = matrix.m[0][0]*this.v[0] +  matrix.m[1][0]*this.v[1] +  matrix.m[2][0]*this.v[2];
    ret_v[1] = matrix.m[0][1]*this.v[0] +  matrix.m[1][1]*this.v[1] +  matrix.m[2][1]*this.v[2];
    ret_v[2] = matrix.m[0][2]*this.v[0] +  matrix.m[1][2]*this.v[1] +  matrix.m[2][2]*this.v[2];
    return ret_v;
  }
}

class Matrix33 {
  m = [];
  constructor() {
    this.m = [[1,0,0], [0,1,0], [0,0,1]];
  }
  rotate(axis:string, angle:number) {
    var c = Math.cos(angle), s = Math.sin(angle);
    if (axis === 'x') {
      this.m = [
        [  1,  0,  0 ],
        [  0,  c, -s ],
        [  0,  s,  c ]
      ];
      return;
    }
    if (axis === 'y') {
      this.m = [
        [  c,  0,  s ],
        [  0,  1,  0 ],
        [ -s,  0,  c ]
      ];
      return;
    }
    if (axis === 'z') {
      this.m = [
        [  c, -s,  0 ],
        [  s,  c,  0 ],
        [  0,  0,  1 ]
      ];
      return;
    }
  }

}
