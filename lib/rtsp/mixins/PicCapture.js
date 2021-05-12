import moment from "moment"

export default class PicCapture {
  constructor(videoId, fileType) {
    let dom = document.getElementById(videoId)
    this.fileType = fileType || 'png'
    this.canvas = document.createElement("canvas");
    this.canvas.className = "my-canvas"
    
    this.ctx = this.canvas.getContext('2d')
    this.width = dom.videoWidth
    this.height = dom.videoHeight

    this.canvas.width = this.width
    this.canvas.height = this.height

    this.ctx.drawImage(dom, 0, 0, this.width, this.height)
    document.body.appendChild(this.canvas)
  }

  addWaterMark(word) {
    let ctx = this.ctx
    ctx.rotate(-20 * Math.PI / 180) // 逆时针旋转π/9
    ctx.font = '30px Vedana' // 设置字体
    ctx.fillStyle = 'rgba(200, 200, 200, 0.50)' // 设置字体的颜色
    ctx.textAlign = 'left' // 文本对齐方式
    ctx.textBaseline = 'Middle' // 文本基线

    for (let i = 0; i < this.canvas.height / 240; i++) {
        for (let j = 0; j < this.canvas.width / 100; j++) {
          ctx.fillText(word, i * 400, j * 200, this.canvas.width)
        } 
    }
  }
  
  download() {
    // canvas中的图片并转成dataURL
    var strDataURL = this.canvas.toDataURL("image/" + this.fileType); 
    var arr = strDataURL.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
       
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        var blob = new Blob([u8arr], {
          type: mime
        });
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');

        var datestr = moment(new Date()).format("YYYYMMDDHHmmss");
        let filename = "screenrecode_" + datestr + ".pmg";

        a.style.display = 'none';
        a.href = url;
        a.download = filename
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 1000);
  }
}
       
        