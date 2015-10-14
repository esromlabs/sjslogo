// Heart Horn 2
var i = 0;
var j, k;
yurt.bk(10);
for (i = 0; i < 360; i += 1) {
 j = i;
 if (j > 180) {j = (180-i/2)*2;}
 k = Math.sqrt(i*8) * 3;
 k = (k - 180) * -1;
 k = k - 18;
 //k = (j - 180) * -1;
 //k = Math.sqrt(i/360)*180 + j;
 // k = (i/360)*(i/360)*(i/360)*360;
 yurt.pu();
 yurt.fd(j/2);
 yurt.pd();
 yurt.fd(k);
 yurt.pu();
 yurt.bk(0.5*j+k);
 yurt.lt(1);
}
