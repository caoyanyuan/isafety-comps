import globalScmsVideoStatus from "../belong/scmsVideoStatus"

export default {
    methods: {
        errHandler(err) {
            this.curVideo.statusTxt = err.message;
        },
        stuHandler(currentProxy, message) {
            let self = this

           

            switch (message) {
                case globalScmsVideoStatus.STATUS_REQUESTING_VIDEO:
                  self.curVideo.statusTxt = self.$t('public.requesting_video');
                  break;
                case globalScmsVideoStatus.STATUS_REQUESTING_VIDEO_FAILED:
                  self.curVideo.statusTxt = self.$t('public.video_request_failed');
                  break;
                case globalScmsVideoStatus.STATUS_INTERRUPT_TRYING_TO_RECONNECT_VIDEO:
                  if (!self.isDestroy) {
                    self.curVideo.statusTxt = self.$t('public.video_interrupt_trying_to_reconnect');
                  }
                  break;
                case globalScmsVideoStatus.STATUS_RECONNECT_VIDEO:
                  self.reconnectWs();
                  break;
                case globalScmsVideoStatus.STATUS_NO_CONTAIN_AUDIO:
                  break;
                case globalScmsVideoStatus.STATUS_CONTAIN_AUDIO:
                  break;
                default:
                   self.curVideo.statusTxt = self.$t('public.receiving_data') + " " + message.toFixed(2) + "kbps";
                   break;
            }
        }
    },
    computed: {
        playOptions() {
            return {
                // 可以拿到视频的时长  this.html5Player.duration
                proxyTransport: 'true',

                socket:'ws://10.72.77.187:8060/ws',
                redirectNativeMediaErrors: true,
                bufferDuration: 100,
                statuHandler: this.stuHandler,
                errorHandler: this.errHandler,
                forward: '0',
                reconnectTime: 0,
                audioSwitchValue: false
            }
        }
    },
    created() {
        this.stuHandler = this.stuHandler.bind(this)
        this.errHandler = this.errHandler.bind(this)
    }
}