// You have a turtle named 'yurt' at the ready.
function t (s) {
  'use strict';
  yurt.pd();
  // decorate with an arc that indicates the orientation of the rhombus
  //yurt.lt(2 * 36);
  //yurt.arc 4 * 36 :s * 0.618034 / 2
  //yurt.rt(2 * 36);

  yurt.rt(2 * 36);
  yurt.fd(s);
  yurt.lt(4 * 36);
  yurt.fd(s);
  yurt.lt(1 * 36);
  yurt.fd(s);
  yurt.lt(4 * 36);
  yurt.fd(s);
  yurt.lt(1 * 36);
  yurt.lt(2 * 36);
  yurt.pu();
}

function w (s) {
  'use strict';
  yurt.pd();
  // decorate with an arc that indicates the orientation of the rhombus
  //yurt.lt(1 * 36
  //arc 2 * 36 :s * 0.618034
  //yurt.rt(1 * 36

  yurt.rt(1 * 36);
  yurt.fd(s);
  yurt.lt(2 * 36);
  yurt.fd(s);
  yurt.lt(3 * 36);
  yurt.fd(s);
  yurt.lt(2 * 36);
  yurt.fd(s);
  yurt.lt(3 * 36);
  yurt.lt(1 * 36);
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
      // generate a t and w
      // first the t
      yurt.fd(scale);
      yurt.rt(3 * 36);
      //setcolor :depth
      if (paint_at_level >= depth) {
        t(scale);
      }
      gen(scale, 't', dep, paint_at_level);

      yurt.lt(2 * 36);
      yurt.fd(scale);
      yurt.rt(3 * 36);
      //setcolor :depth
      if (paint_at_level >= depth) {
        w(scale);
      }
      gen(scale, 'w', dep, paint_at_level);

      yurt.rt(1 * 36);
      yurt.fd(scale);
      yurt.rt(1 * 36);
      yurt.fd(scale);

      yurt.rt(4 * 36);
  }
    if (k === 'w') {
      // w -> w t w
      // first generate w
      yurt.rt(2 * 36);
      yurt.fd(s);
      yurt.rt(5 * 36);
      //setcolor :depth
      if (paint_at_level >= depth) {
        w(scale);
      }
      gen(scale, 'w', dep, paint_at_level);


      yurt.rt(2 * 36);
      yurt.fd(scale);
      yurt.lt(3 * 36);
      //setcolor :depth
      if(paint_at_level >= depth) {
        t(scale);
      }
      gen(scale, 't', dep, paint_at_level);

      // last another w

      yurt.rt(2 * 36);
      yurt.fd(scale);
      yurt.rt(2 * 36);
      yurt.fd(scale);
      yurt.rt(4 * 36);
      //setcolor :depth
      if (paint_at_level >= depth) {
        w(scale);
      }
      gen(scale, 'w', dep, paint_at_level);
      yurt.rt(1 * 36);
      yurt.fd(s * 1.618034);
      yurt.lt(5 * 36);
    }
  }
}
yurt.cs();
yurt.home();
yurt.pu();
yurt.lt(90);
yurt.fd(220);
yurt.rt(90);

yurt.rt(2 * 36);
var level = 0;
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
yurt.fd(40);
yurt.lt(90 - 36);

// level one test of 'w'
//w(scale);
gen(scale, 'w', level, 1);
