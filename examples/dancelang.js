var t = 0;
var d = [[40, 0], [-40, 0], [0, 60], [40, 0], [-40, 0]];
      yurt.home();
      yurt.cs();
      man();
while( t < d.length-1 ) {
  t += 1;
  (function(t) {
    setTimeout(function() {
      yurt.cs();
      yurt.pu(); // pen up
      yurt.rt(d[t][1]);
      yurt.fd(d[t][0]);
      man();
    }, 1000*t);
  })(t);
}
function man () {
  yurt.pd(); // pen down
  yurt.fd(10);
  yurt.rt(90);
  yurt.fd(30);
  yurt.rt(90);
  yurt.fd(20);
  yurt.rt(90);
  yurt.fd(60);
  yurt.rt(90);
  yurt.fd(20);
  yurt.rt(90);
  yurt.fd(30);
  yurt.lt(90);
  yurt.bk(10);
  yurt.pu(); // pen up
}
