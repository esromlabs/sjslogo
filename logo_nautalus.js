// Nautalus LOGO
var i = 0;
var half_i;
for (i = 0; i < 360; i += 1) {
 half_i = i/2;
 yurt.pu();
 yurt.fd(180-half_i);
 yurt.pd();
 yurt.fd(i);
 yurt.pu();
 yurt.bk(180 + half_i);
 yurt.lt(1);
}
