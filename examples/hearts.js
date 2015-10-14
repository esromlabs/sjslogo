// LOGO
var i = 0;
var j;
for (i = 0; i < 360; i += 1) {
 j = i;
 if (j > 180) {j = (180-i/2)*2;}
 yurt.pu();
 yurt.fd(j/2);
 yurt.pd();
 yurt.fd(j);
 yurt.pu();
 yurt.bk(1.5*j);
 yurt.rt(1);
}
