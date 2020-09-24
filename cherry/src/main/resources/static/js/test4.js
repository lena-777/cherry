new Vue({
    el:"#app",
    data(){
        return{
            isAnalyze:false,
            pictureMessage:[{
                x:15,
                y:20,
            },{
                x:30,
                y:90,
            },{
                x:100,
                y:200,
            },{
                x:300,
                y:100,
            }],
            show:true,
        }
    },
    methods:{
        submitUpload:function () {
            this.show=!this.show;
            window.show=this.show;
            console.log("ichange="+this.show);
        },
        open5() {
            this.$alert('<canvas id="canvas" width="400" height="300"></canvas>', 'HTML 片段', {
                dangerouslyUseHTMLString: true
            });
        },
        drawPicture:function () {
            //遍历画圈
            var x;var y;
            for(var i=0;i<this.pictureMessage.length;i++){
                x=this.pictureMessage[i].x;
                y=this.pictureMessage[i].y;
                this.cir(x,y);
            }
        },
        cir:function(x,y) {
            //圆1
            ctx.beginPath();
            ctx.arc(x,y,35,0,Math.PI*2,false);
            ctx.fillStyle="rgba(192,80,77,0.7)";//半透明的红色
            ctx.fill();
            ctx.strokeStyle="rgba(192,80,77,1)";//红色
            ctx.stroke();
        },
        change:function () {
            this.show=!this.show;
            console.log("ichange="+this.show);
        }

    },
    beforeDestroy() {

    },
    mounted(){
        //将方法赋值给window，这样外部的js文件就可以使用该方法
        window.drawPicture=this.drawPicture;
        window.show=this.show;
    },
    created(){

    }
});
