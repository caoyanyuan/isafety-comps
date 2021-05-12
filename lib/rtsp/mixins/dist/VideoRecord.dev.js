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

/** 视频录像 */
var VideoRecord =
/*#__PURE__*/
function () {
  function VideoRecord(videoId) {
    _classCallCheck(this, VideoRecord);

    this.isRecording = false;
    this.videoDom = document.getElementById(videoId);
  }

  _createClass(VideoRecord, [{
    key: "start",
    value: function start() {
      var datestr = (0, _moment["default"])(new Date()).format("YYYYMMDDHHmmss");
      this.recodename = "screenrecode_" + datestr + ".mp4";
      var stream = this.videoDom.captureStream();
      this.recorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=h264'
      });
      this.recorder.addEventListener('dataavailable', this.finishCapturing.bind(this));
      this.recorder.start();
    }
  }, {
    key: "stop",
    value: function stop() {
      this.recorder.stop();
    }
  }, {
    key: "finishCapturing",
    value: function finishCapturing(e) {
      var videoData = [e.data];
      var blob = new Blob(videoData, {
        'type': 'video/webm;'
      });
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = this.recodename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 1000);
    }
  }]);

  return VideoRecord;
}();

exports["default"] = VideoRecord;