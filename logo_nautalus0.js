// NautaLOGO
var i = 0;
var i0;
var i1;
yurt.rt(90);
for (i = 0; i < 360; i += 1) {
 i1 = (i/360)*(i/360)*360;
 i0 = 180 - i1/2;
 yurt.pu();
 yurt.fd(i0);
 yurt.pd();
 yurt.fd(i1);
 yurt.pu();
 yurt.bk(i0 + i1);
 yurt.lt(1);
}
