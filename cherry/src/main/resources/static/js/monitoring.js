this.addCircle(0,0);
function addCircle(x,y) {
        var cvs = document.getElementById("canvas");
        window.addEventListener("load",function(){
            //canvas的2d上下文
            var ctx=cvs.getContext("2d");
            //圆1
            ctx.beginPath();
            ctx.arc(150,45,35,0,Math.PI*2,false);
            ctx.fillStyle="rgba(192,80,77,0.7)";//半透明的红色
            ctx.fill();
            ctx.strokeStyle="rgba(192,80,77,1)";//红色
            ctx.stroke();
        });
}
