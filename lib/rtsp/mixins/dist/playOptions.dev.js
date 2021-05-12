"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _scmsVideoStatus = _interopRequireDefault(require("../belong/scmsVideoStatus"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  methods: {
    errHandler: function errHandler(err) {
      this.curVideo.statusTxt = err.message;
    },
    stuHandler: function stuHandler(currentProxy, message) {
      var self = this;

      switch (message) {
        case _scmsVideoStatus["default"].STATUS_REQUESTING_VIDEO:
          self.curVideo.statusTxt = self.$t('public.requesting_video');
          break;

        case _scmsVideoStatus["default"].STATUS_REQUESTING_VIDEO_FAILED:
          self.curVideo.statusTxt = self.$t('public.video_request_failed');
          break;

        case _scmsVideoStatus["default"].STATUS_INTERRUPT_TRYING_TO_RECONNECT_VIDEO:
          if (!self.isDestroy) {
            self.curVideo.statusTxt = self.$t('public.video_interrupt_trying_to_reconnect');
          }

          break;

        case _scmsVideoStatus["default"].STATUS_RECONNECT_VIDEO:
          self.reconnectWs();
          break;

        case _scmsVideoStatus["default"].STATUS_NO_CONTAIN_AUDIO:
          break;

        case _scmsVideoStatus["default"].STATUS_CONTAIN_AUDIO:
          break;

        default:
          self.curVideo.statusTxt = self.$t('public.receiving_data') + " " + message.toFixed(2) + "kbps";
          break;
      }
    }
  },
  computed: {
    playOptions: function playOptions() {
      return {
        // 可以拿到视频的时长  this.html5Player.duration
        proxyTransport: 'true',
        socket: 'ws://10.72.77.187:8060/ws',
        redirectNativeMediaErrors: true,
        bufferDuration: 100,
        statuHandler: this.stuHandler,
        errorHandler: this.errHandler,
        forward: '0',
        reconnectTime: 0,
        audioSwitchValue: false
      };
    }
  },
  created: function created() {
    this.stuHandler = this.stuHandler.bind(this);
    this.errHandler = this.errHandler.bind(this);
  }
};
exports["default"] = _default;