// You have a turtle named 'yurt' at the ready.
function t (s, rise) {
  'use strict';
  yurt.pd();
  // decorate with an arc that indicates the orientation of the rhombus
  yurt.push();
  yurt.lt(2 * 36);
  yurt.fd(s);
  yurt.rt(4 * 36);
  yurt.fd(s * 0.618034);
  yurt.rt(0.5 * 36);
  yurt.fd(s * 0.618034 *1.18);
  yurt.pop();

  yurt.push();
  yurt.rt(2 * 36);
  yurt.fd(s, rise);
  yurt.lt(4 * 36);
  yurt.fd(s, rise);
  yurt.lt(1 * 36);
  yurt.fd(s, -rise);
  yurt.lt(4 * 36);
  yurt.fd(s, -rise);
  yurt.lt(1 * 36);
  yurt.lt(2 * 36);
  yurt.pop();

  yurt.pu();
}

function w (s, rise) {
  'use strict';
  yurt.pd();
  // decorate with an arc that indicates the orientation of the rhombus
  yurt.push();
  yurt.lt(1 * 36);
  yurt.fd(s * 0.618034);
  yurt.rt(3.5 * 36);
  yurt.fd(s * 0.618034 * 1.18);
  yurt.pop();

  yurt.push();
  yurt.rt(1 * 36);
  yurt.fd(s, rise);
  yurt.lt(2 * 36);
  yurt.fd(s, rise);
  yurt.lt(3 * 36);
  yurt.fd(s, -rise);
  yurt.lt(2 * 36);
  yurt.fd(s, -rise);
  yurt.lt(3 * 36);
  yurt.lt(1 * 36);
  yurt.pop();

  yurt.pu();
}

// generate (at_scale, kind[t,w], recursion_depth, paint_all_levels)
function gen (s, k, depth, paint_at_level) {
  'use strict';
  var dep, scale;
  if (depth < 1) {
    //setcolor :depth
    if (k === 't') {
      t(s);
    }
    if (k === 'w') {
      w(s);
    }
  }
  else {
    dep = depth -1;
    scale = s * 0.618034;

    if (k === 't') {
      yurt.push();

      yurt.rt(1 * 36);
      // generate a t and w
      if (paint_at_level >= depth) {
        t(scale);
      }
      gen(scale, 't', dep, paint_at_level);

      yurt.rt(3 * 36);
      yurt.fd(s);
      yurt.lt(6 * 36);

      if (paint_at_level >= depth) {
        w(scale);
      }
      gen(scale, 'w', dep, paint_at_level);

      yurt.pop();
  }
    if (k === 'w') {
      yurt.push();
      // w -> w t w
      if (paint_at_level >= depth) {
        w(scale);
      }
      gen(scale, 'w', dep, paint_at_level);

      if(paint_at_level >= depth) {
        t(scale);
      }
      gen(scale, 't', dep, paint_at_level);

      if (paint_at_level >= depth) {
        w(scale);
      }
      gen(scale, 'w', dep, paint_at_level);
      yurt.pop();
    }
  }
}
yurt.cs();
yurt.home();
yurt.pu();
yurt.lt(90);
yurt.fd(260);
yurt.rt(90);

yurt.rt(2 * 36);
var level = 1;
var scale = 280;
// level one test of 't'
//t(scale);
gen(scale, 't', level, 1);
yurt.lt(1 * 36);

yurt.bk(scale * 1.618034);
yurt.rt(1 * 36);
yurt.fd(scale * 1.618034);
yurt.lt(1 * 36);

yurt.rt(90 - 36);
yurt.fd(80);
yurt.lt(90 - 36);

// level one test of 'w'
//w(scale);
gen(scale, 'w', level, 1);
