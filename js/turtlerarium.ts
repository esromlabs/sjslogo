var examples = {
  "first":"// You have a turtle named 'yurt' at the ready.\nyurt.pd();\nyurt.fd(20);\nyurt.rt(Math.random()*180-90);\n",
  "curves":'// yurt.home();\n// yurt.cs();\nyurt.pd(); // pen down\nyurt.fd(30);\nyurt.arc({radius:50, turn:"r", angle:140});\nyurt.rt(45); //turn right\nyurt.arc({radius:30, turn:"l", angle:128});\nyurt.fd(50);\n',
  "animation":'var t = 0;\nwhile( t < 32 ) {\n  t += 1;\n  (function(t) {\n    setTimeout(function() {\n      yurt.home();\n      yurt.cs();\n      yurt.pd(); // pen down\n    yurt.rt(11.25*t); //turn right\n      yurt.fd(30);\n      yurt.arc({radius:50, turn:"r", angle:90});\n      yurt.lt(45); //turn left\n      yurt.arc({radius:30, turn:"l", angle:128});\n      yurt.fd(30);\n      yurt.arc({radius:50, turn:"r", angle:140});\n      yurt.rt(45); //turn right\n      yurt.arc({radius:30, turn:"l", angle:128});\n      yurt.fd(50);\n    }, 100*t);\n  })(t);\n}\n',
  "chaining":'// you can chain together yurtle calls\nyurt.pd().fd(20).lt(72).rt(36).fd(10);\n',
  "cloning":'yurt.pd().fd(20).lt(72);\nyurt.clone("this.rt(36).fd(10);").run_mission();\n',
  "grid":'// make a grid using loops and clones.\nunit = 20;\ngridCountWidth = 10;\ngridCountHeight = 12;\nvar i = 0;\nfor (i = 0; i < gridCountHeight; i += 1) {\n    yurt.clone("this.rt(90).fd(gridCountWidth*unit);").run_mission();\n    yurt.pd().fd(unit);\n}\nyurt.rt(90)\nfor (i = 0; i < gridCountWidth; i += 1) {\n    yurt.pd().fd(unit).clone("this.rt(90).fd(gridCountHeight*unit);").run_mission();\n}\n',
  "penrose_tiling_perimeter": function load() { $.ajax('examples/fractile_penrose_perimeter.js', {'success': function(code) {$('#logo_code').val(code);}}); return 'loading'; },
  "fractal_penrose": function load() {
    $.ajax('examples/fractal_penrose.js', {
      "success": function(code) {
        $('#logo_code').val(code);
      }
    });
  },
  "circle round": function load() { $.ajax('examples/circleround.js', {'success': function(code) {$('#logo_code').val(code);}}); return 'loading'; }
};

class Page {
  current_script_name:string = "";
  $ = null;
  constructor($) {
    this.$ = $;
    this.current_script_name = "first";
    var page = this;
    $('#logo_code').val(examples[this.current_script_name]);
    $('#process').on('click', function() {
      var code = $('#logo_code').val();
      page.run_sjslogo({}, code);
    });
    $.each(examples, function(i,o) {
      $('#how_about_this').append('<option value="'+i+'">'+i+'</option>');
    });
    $('#how_about_this').on('change', function() {
      //alert($(this).val());
      this.current_script_name = $(this).val();
      let code = examples[this.current_script_name];
      if (code) {
        $('#logo_code').val(code);
        page.run_sjslogo({}, code);
      }
    });
    $('#yurt_go_home').on('click', function() {
      var code = 'yurt.home();';
      page.run_sjslogo({}, code);
    });
    $('#yurt_clear_screen').on('click', function() {
      var code = 'yurt.cs();';
      page.run_sjslogo({}, code);
    });
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

// classes for projection from 3D to 2D screen.
class Vector3 {
  v = [];
  constructor(v) {
    if (v) {
      this.v[0] = v[0];
      this.v[1] = v[1];
      this.v[2] = v[2];
    }
    else {
      this.v = [0,0,0];
    }
  }
}
