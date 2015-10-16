// LOGO
var i = 0;
for (i = 0; i < 360; i += 1) {
 yurt.pu();
 yurt.fd(180-i/2);
 yurt.pd();
 yurt.fd(i/2);
 yurt.pu();
 yurt.bk(180);
 yurt.rt(1);
}
