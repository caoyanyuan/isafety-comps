"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var PicCapture =
/*#__PURE__*/
function () {
  function PicCapture(videoId, fileType) {
    _classCallCheck(this, PicCapture);

    var dom = document.getElementById(videoId);
    this.fileType = fileType || 'png';
    this.canvas = document.createElement("canvas");
    this.canvas.className = "my-canvas";
    this.ctx = this.canvas.getContext('2d');
    this.width = dom.videoWidth;
    this.height = dom.videoHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx.drawImage(dom, 0, 0, this.width, this.height);
    document.body.appendChild(this.canvas);
  }

  _createClass(PicCapture, [{
    key: "addWaterMark",
    value: function addWaterMark(word) {
      var ctx = this.ctx;
      ctx.rotate(-20 * Math.PI / 180); // 逆时针旋转π/9

      ctx.font = '30px Vedana'; // 设置字体

      ctx.fillStyle = 'rgba(200, 200, 200, 0.50)'; // 设置字体的颜色

      ctx.textAlign = 'left'; // 文本对齐方式

      ctx.textBaseline = 'Middle'; // 文本基线

      for (var i = 0; i < this.canvas.height / 240; i++) {
        for (var j = 0; j < this.canvas.width / 100; j++) {
          ctx.fillText(word, i * 400, j * 200, this.canvas.width);
        }
      }
    }
  }, {
    key: "download",
    value: function download() {
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
      var datestr = (0, _moment["default"])(new Date()).format("YYYYMMDDHHmmss");
      var filename = "screenrecode_" + datestr + ".pmg";
      a.style.display = 'none';
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 1000);
    }
  }]);

  return PicCapture;
}();

exports["default"] = PicCapture;