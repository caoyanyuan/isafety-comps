import moment from "moment"
/** 视频录像 */

export default class VideoRecord{
    constructor(videoId) {
        this.isRecording = false
        this.videoDom = document.getElementById(videoId)
    }
    start() {
        var datestr = moment(new Date()).format("YYYYMMDDHHmmss");
        this.recodename = "screenrecode_" + datestr + ".mp4";

        var stream = this.videoDom.captureStream(); 
        this.recorder = new MediaRecorder(stream, {mimeType: 'video/webm;codecs=h264'});
        this.recorder.addEventListener('dataavailable', this.finishCapturing.bind(this));
        this.recorder.start();
    }
    stop() {
        this.recorder.stop();
    }
    finishCapturing(e) {
        var videoData = [e.data];
        var blob = new Blob(videoData, {'type': 'video/webm;'});
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
}