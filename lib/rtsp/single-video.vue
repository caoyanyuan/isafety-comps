<template>
    <div class="single-video" :class="{isFull: isFulling}" :id="containerID" >
        <video class="play-video" :id="camera_id" autoplay="autoplay"  preload="auto" :src=src />
        <div class="device-name">{{deviceName}}</div>
        
        <div class="bot-oper">
            <div class="video-err">{{curVideo.statusTxt}}</div>
            <div class="opers">
                <c-tooltip v-for="(item, i) in operList" :content="item.content" :key="i">
                    <i v-if="item.icon" class="iconfont icon icon-font" :class="item.icon"
                        @click="item.fn"/>
                    <div class="icon" v-else :class="[item.type,{active:item.active}]" @click="item.fn" ></div>
                </c-tooltip>
                
                <div class="capture" @click="onCapture"></div>
                <div class="record" @click="onRecord"></div>
                <div class="change"></div>
            </div>
        </div>
        
    </div>
</template>

<script>
import playOptions from "./mixins/playOptions"
import { Full_Screen } from "@/common/utils/util"
import PicCapture from "./mixins/PicCapture"
import VideoRecord from "./mixins/VideoRecord"
import { cameraData } from "@/api/api"
import CTooltip from "@/base/cover/cTooltip"

const REPLAY_ICON = "iconluxiang1"

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
            deviceName: "",
            isFulling: false,
            curVideo: {
                statusTxt: "",
                starttime: ""
            },
            operList: []
        }
    },
    methods: {
        onCapture() {
            this.picCapture = new PicCapture(this.camera_id)
            
            this.picCapture.download()
        },
        onRecord() {
            !this.recorder && (this.recorder = new VideoRecord(this.camera_id))
            this.replayOper.icon = this.replayOper.icon ? null : REPLAY_ICON

            if(!this.replayOper.icon) {
                this.recorder.start()
            }else{
                this.recorder.stop()
            }
        },
        onToggleFullScreen() {
            let el = document.getElementById(this.containerID) 

            if(this.isFulling) {
                Full_Screen.exit(el)
            }else{
                Full_Screen.enter(el)
            }
        },
        onChangeStream() {

        },
        init({deviceName, deviceCode}) {
            this.deviceName = deviceName

           

            this._getRtsp(deviceCode).then(src => {
                this.src = src

                setTimeout(() => {
                    this.html5Player = document.getElementById(this.camera_id)
                    this.WSPlayer = window.Streamedian.player(this.html5Player, this.playOptions);
                }, 200);
            })
        },
        stop() {
            this.src = ""
            this.WSPlayer.destroy(this.WSPlayer.isLockReconnected)
        },
        async _getRtsp(deviceCode) {
            let ret = this.rtsp_map[deviceCode]

            if(!ret) {
                await cameraData({
                    cameraId: deviceCode,
                    streamType: Global_Config.homeStreamType
                }).then(data => {
                    if (data.rtsp) {
                        ret = data.rtsp
                    } else {
                        Message.error('获取播放地址失败，请检测是否配置设备编码？')
                    }
                })
            }

            return ret
        },
        _initData() {
            this.isFulling = false
            this.curVideo = { statusTxt: "" }
        },
        _initCreatedData() {
            //存储rtsp链接 
            this.rtsp_map = {}

            this.operList = [
                // { type: 'changeStream', icon:"iconzimaliu", content: "切换成子码流", fn: this.onChangeStream },
                { type: 'screenshot',icon: "iconpaizhao", content: "截图", fn: this.onCapture },
                { type: 'recording', icon: REPLAY_ICON , content: "录像", fn: this.onRecord },
                { type: 'full', content: "全屏", fn: this.onToggleFullScreen, active: false },
            ]

            this.replayOper = this.operList[1]
            this.fullOper = this.operList[2]
        }
    },
    watch: {
        isFulling(flag) {
            console.log('isFulling', flag, this.fullOper)
            this.$set(this.fullOper, 'active', flag)
        }
    },
    mounted() {
        window.onresize = () => {
            this.isFulling = Full_Screen.checkFull()
        }
    },
    computed: {
        containerID() {
            return `single-video-${this.camera_id}`
        }
    },
    created () {
        this._initCreatedData()
    },
    components: {
        CTooltip
    } 
}
</script>

<style scoped lang="less">
.single-video{
    height: calc(100% - 50px); height: 100%; position: relative; background: #000;
    &.isFull{
        width: 100%; height: 100%; position: fixed; top: 0; left:0;
    }
}
.bot-oper{
    position: absolute; bottom: 0;  width: 100%; color: #fff; height: 35px; background: rgba(0,0,0,0.4);
    display: flex; justify-content: space-between; align-items: center;
    padding-left: 10px;
    .opers{
        margin-right: 10px;
        .icon{
            width: 18px; height: 18px; display: inline-block; .bgFull(); font-size: 26px; margin:0 8px; cursor: pointer;
            .bg(@url){
                background-image: url('./icons/video/@{url}');
            }
            &.full{  
                .bg('all_screen.png');
                &.active{
                    .bg('out_all_screen.png')
                }
            }
            &.changeStream{
                .bg('all_screen.png');  
            }
            &.recording{
                .bg('luping.gif'); width: 22px;
            }
            &.full{
                .bg('all_screen.png')
            }
        }
    }
}
.play-video{
    width: 100%; height: 100%; object-fit: fill;
}
.device-name{
    position: absolute; top:10px;  color: #fff; left: 10px;
    text-shadow: #000 1px 0 0, #000 0 1px 0, #000 -1px 0 0, #000 0 -1px 0;
}
</style>