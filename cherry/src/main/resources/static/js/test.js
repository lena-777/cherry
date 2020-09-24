const img = new Image();
const canvas = document.querySelector("#canvas");
let ctx;
ctx = canvas.getContext("2d");
// 当图片加载完再动手
img.onload = function () {
    // 画布大小和图片尺寸不一样算好比例
    const cWidth = canvas.width, cHeight = canvas.height;
    const imgWidth = img.naturalWidth, imgHeight = img.naturalHeight;
    const zoom = {
        width: cWidth / imgWidth,
        height: cHeight / imgHeight,
    };
    // 以图画底
    ctx.drawImage(img, 0, 0, cWidth, cHeight);
    drawPicture();
},
    // 动手
    img.src = "../static/img/show6.jpg";
console.log("draw");