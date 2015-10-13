// LOGO
var i = 0;
for (i = 0; i < 360; i += 1) {
 yurt.pu();
 yurt.fd(180-i);
 yurt.pd();
 yurt.fd(i);
 yurt.pu();
 yurt.bk(180);
 yurt.rt(1);
}
