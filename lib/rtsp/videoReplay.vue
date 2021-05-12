<template>
    <div class="video-replay">
        <video id="test_video" autoplay="autoplay"  preload="auto" :src=src >
        </video>
        <button @click="onQuick" >加速</button>
        <button @click="onSlow" >减速</button>


        <el-slider  v-model="progress_value" :max="progress_max" class="slider"
                    :show-tooltip="true"
                    @change="currentPrecent"
                    :format-tooltip="formatTooltip" ></el-slider>

        <div class="video-err">{{curVideo.statusTxt}}</div>
    </div>
</template>

<script>
import { timeStampToFormatDate, checkFull, getUnixTime, checkArrContain } from "./belong/utility";
import playOptions from "./mixins/playOptions"

export default {
    props: [
      'camera_id',
      'replay_visible',
      'selectFilesDataToRe'
    ],
    mixins: [playOptions],
    data() {
        return {
            src: "",
            progress_value: 0,
            progress_max: 100,
            curVideo: {
                statusTxt: "",
                starttime: ""
            },
        }
    },
    methods: {
        onQuick() {
            this.html5Player.playbackRate *= 2
        },
        onSlow() {
            this.html5Player.playbackRate > 1 && (this.html5Player.playbackRate /= 2)
        },
        currentPrecent(val) {
            this.WSPlayer.isSeeking()

            this.html5Player.currentTime = val

            this.html5Player.pause();
            this.html5Player.play();
        },
        play() {
            this.html5Player = document.getElementById('test_video')

            this.WSPlayer = window.Streamedian.player(this.html5Player, this.playOptions);
            
            this.slideInterval()
        },
        slideInterval() {
            let timer = null
            function interval(func, wait){
                let interv = function(){
                    func.call(null);
                    timer=setTimeout(interv, wait);
                };
                timer= setTimeout(interv, wait);
            }
            interval(() => {
                //设定滚动最大值
                if(this.html5Player.duration && !this.isSetedMax) {
                    this.progress_max = this.html5Player.duration;
                    this.isSetedMax = true
                }
                this.progress_value = this.html5Player.currentTime
            }, 1000);
        }
        
    },
    computed: {
        formatTooltip() {
            return (val) => {
                let curTime = (parseInt(getUnixTime(this.curVideo.starttime)) + parseInt(val)) * 1000;
                return timeStampToFormatDate(curTime, 'Y-m-d H:i:s')
            }
        }
    },
    watch: {
        camera_id(val) {
            this.row = this.selectFilesDataToRe[0]

            Object.assign(this.curVideo, { ...this.row })

            this.src = this.row.rtspUrl

            this.$nextTick(() => {
                this.play()
            })
            
        }
    },
    created () {

    }   
}
</script>

<style scoped>
.video-replay{
    padding: 30px;
}
#test_video{
    height: 500px; width: 600px;
}
.slider{
    width: 600px;
}
</style>