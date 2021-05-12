<template>
  <div class="ptz_control">
    <div class="top">
      <!-- 圆盘 -->
      <div class="circle">
        <div :class="[isControl?'up-active' :'up-inactive', 'up']" :title="$t('PreliminaryPosition.turnup')" @mouseup="turnDirection(21, 1)" @mousedown="turnDirection(21, 0)"></div>
        <div :class="['left', isControl? 'left-active' :'left-inactive']" :title="$t('PreliminaryPosition.turnleft')" @mouseup="turnDirection(23, 1)" @mousedown="turnDirection(23, 0)"></div>
        <div :class="['right',  isControl?'right-active':'right-inactive']" @mouseup="turnDirection(24, 1)" @mousedown="turnDirection(24, 0)" :title="$t('PreliminaryPosition.turnright')"></div>
        <div :class="['down',  isControl?'down-active':'down-inactive']"  @mouseup="turnDirection(22, 1)" @mousedown="turnDirection(22, 0)" :title="$t('PreliminaryPosition.turndown')"></div>
        <div :class="['down',  isControl?'down-active':'down-inactive']"  @mouseup="turnDirection(22, 1)" @mousedown="turnDirection(22, 0)" :title="$t('PreliminaryPosition.turndown')"></div>

        <div :class="['top_left', isControl?'top_left-active':'top_left-inactive']"  @mouseup="turnDirection(25, 1)" @mousedown="turnDirection(25, 0)" :title="$t('PreliminaryPosition.turnleftup')"></div>
        <div :class="['top_right', isControl?'top_right-active':'top_right-inactive']" @mouseup="turnDirection(26, 1)" @mousedown="turnDirection(26, 0)" :title="$t('PreliminaryPosition.turnrightup')"></div>
        <div :class="['bottom_left', isControl?'bottom_left-active':'bottom_left-inactive']"  @mouseup="turnDirection(27, 1)" @mousedown="turnDirection(27, 0)" :title="$t('PreliminaryPosition.turnleftdowm')"></div>
        <div :class="['bottom_right', isControl?'bottom_right-active':'bottom_right-inactive']"  @mouseup="turnDirection(28, 1)" @mousedown="turnDirection(28, 0)" :title="$t('PreliminaryPosition.turnrightdowm')"></div>

        <div class="small-circle">
          <div class="refresh" :title="$t('PreliminaryPosition.cruise')" @mousedown="turnDirection(24, 0, 'cruise')"></div>
        </div>
      </div>
      <!-- 右侧按钮组 -->
      <div class="right_btn_group">
        <div class="row icon-wrap">
          <i :title="$t('PreliminaryPosition.applicationControl')" :class="['iconfont', 'iconyuntai', isControl?'':'active-color', ptzData && ptzData.isControlable == 1 ? '' : 'not-allowed']"  @click="controlApplyHandel(1)"/>
          <i :title="$t('PreliminaryPosition.lock')" :class="['iconfont', 'iconsuoding', isControl?'':'active-color', ptzData && ptzData.isControlable == 1 ? '' : 'not-allowed']"  @click="controlApplyHandel(3)"/>
          <i :title="$t('PreliminaryPosition.cancelLock')" :class="['iconfont', 'iconjinyong', isControl?'active-color':'', ptzData &&  ptzData.isControlable == 1 ? '' : 'not-allowed']"  @click="controlApplyHandel(4)"/>
        </div>
        <div class="row">
          <div class="sun">
            <div :class="[isControl?'light-active':'light-inactive']" @mouseup="turnDirection(15, 1)" @mousedown="turnDirection(15, 0)" :title="$t('PreliminaryPosition.changelight')"></div>
          </div>
          <div class="sun_disable">
            <div :class="[isControl?'sun_disable-active':'sun_disable-inactive']"  @mouseup="turnDirection(16, 1)" @mousedown="turnDirection(16, 0)" :title="$t('PreliminaryPosition.changedark')"></div>
          </div>
        </div>

        <div class="row">
          <div class="voice">
            <img :class="[isControl? '': 'focus-large']" :src="isControl?require('./icons/video/voice1.png'):require('./icons/video/voice1-inactive.png')"  :title="$t('PreliminaryPosition.focalbigger')"  @mouseup="turnDirection(13, 1)" @mousedown="turnDirection(13, 0)">
          </div>
          <div class="voice_disable">
            <img :class="[isControl? '': 'focus-large']" :src="isControl?require('./icons/video/voice_disable1.png'):require('./icons/video/voice-disable-inactive.png')" :title="$t('PreliminaryPosition.focallittle')" @mouseup="turnDirection(14, 1)" @mousedown="turnDirection(14, 0)">
          </div>
        </div>

        <div class="row">
          <div class="admin">
            <img :class="[isControl? '': 'focus-large']" :src="isControl?require('./icons/video/admin.png'):require('./icons/video/admin-inactive.png')"  :title="$t('PreliminaryPosition.Zoomout')"  @mouseup="turnDirection(12, 1)" @mousedown="turnDirection(12, 0)">
          </div>
          <div class="admin_disable">
            <div :class="[isControl?'admin_disable-active':'admin_disable-inactive']" :title="$t('PreliminaryPosition.Zoomin')"  @mouseup="turnDirection(11, 1)" @mousedown="turnDirection(11, 0)"></div>
          </div>
        </div>

        <div class="row">
          <div class="sanjiao">
            <img :class="[isControl? '': 'focus-large']" :src="isControl?require('./icons/video/sanjiao.png'):require('./icons/video/right-curise-inactive.png')" :title="$t('PreliminaryPosition.leftCruise')" @click="turnDirection(23, 0, 'cruise')">
          </div>
          <div class="sanjiao_disable">
            <img :class="[isControl? '': 'focus-large']" :src="isControl?require('./icons/video/sanjiao_disable.png'):require('./icons/video/right-curise-inactive.png')" :title="$t('PreliminaryPosition.rightCruise')" @click="turnDirection(24, 0, 'cruise')">
          </div>
        </div>
      </div>
    </div>
    <!-- 加减调节 -->
    <div class="add_and_subtract">
      <znv-slider class="progress" :min=0 :max=100 :value="per" @func="getValue"></znv-slider>
      <!-- <div class="preset">
        <span class="yzw-title">{{$t('PreliminaryPosition.yzw')}}</span>
        <el-select class="select" v-model="presetValue" :placeholder="$t('PreliminaryPosition.qxeyzwmc')" v-loading="loading" @focus="getList(videoPlayedIndex)" size="small">
          <el-option v-for="(item,index) in tableData" :value="item.presetId" :label="item.remark" :key="index"/>
        </el-select>
        <el-button class="btn" type="primary" @click="turnDirection(39, presetValue, 'jumpto')" size="small" :disabled="Boolean(!isControl)">{{$t('PreliminaryPosition.jump')}}</el-button>
      </div> -->
    </div>
  </div>
</template>

<script>
import ZnvSlider from './ZnvSlider'
import Axios from "axios";
import { vcmsControllApply, vcmsControllCamera } from "@/api/device"

export default {
  name: 'PTZControl',
  components: { ZnvSlider },
  props: ['videoData', 'ptzTreeData', 'type'],
  watch: {
    'videoData': {
      handler(val) {
        this.videoPlayedIndex = val
        console.log('云台控制 videoPlayedIndex: ', val)
        if (this.videoPlayedIndex.TVWall_type == 1) {
          this.isActive = 0 // 电视墙的云控初始化，状态都是不可控
          //this.videoPlayedIndex.ptzControl = 0;//videoPlayedIndex 电视墙赋初值
          if(!this.ptzData){//进入“电视墙管理”，没有选择设备树，电视墙已经有设备上墙状态，直接选了窗口，则ptzData（ptzTreeData）为空。
            let obj = {
              'isControlable': 1
            }
            this.ptzData = obj
            //this.ptzData.isControlable == 1
            console.log('云台控制 his.ptzData.isControlable:',this.ptzData.isControlable)
          }
        }

        // this.getList(val)
      },
      immediate: true
    },
    'ptzTreeData': {
      handler(val) {
        this.ptzData = val
      },
      immediate: true
    },
    'type': {
      handler(val) {
        this.ptzType = val
      },
      immediate: true
    }
  },
  data() {
    return {
      per: 50,
      presetValue: '',
      videoPlayedIndex: {},
      tableData: [],
      loading: false,
      isActive: 0,
      ptzData: '',
      ptzType: ''
    }
  },
  computed: {
    isControl() { //ptzControl变化时，触发isControl变化
      let self = this
      console.log('云台控制 isControl:',self.videoPlayedIndex.ptzControl)
      if (!self.videoPlayedIndex) return;
      let isPtzStatus = self.videoPlayedIndex.ptzControl
      return isPtzStatus
    }
  },
  methods: {
    getValue (data) {
      this.per = data
    },
    /**
     * 获取预置位列表
     */
    getList(val) {
      if (!val.camera_id) return;
      this.loading = true
      Axios.post("/api/scms/iv/cmsproxy/videoPreset/getVideoPreset", {'cameraId': val.camera_id})
        .then(res => {
          if (res.data.code === 200) {
            this.loading = false
            this.tableData = res.data.data
          } else {
            let errMessage = this.getErrEnOrZh(localStorage.lang, res.data.code, null);
            this.$message({
              type: "error",
              message: errMessage
            })
          }
        })
        .catch(err => {
          console.info(err);
        });
    },

    /**
     * 旋转方向
     */
    turnDirection(num, isPlay, type) {
      if (this.videoPlayedIndex.ptzControl == 0 || !this.videoPlayedIndex.camera_id) return
      let params = {
        "cameraId": this.videoPlayedIndex.camera_id, // 相机ID
        "nopId": num, // 操作ID
        "npara1": isPlay, // 开启、停止操作
        "npara2": type === 'jumpto' ? 50 : this.per, // 控制速度，范围 0-100
        // "npara2": type === 'cruise' ? 50 : 40, // 控制速度，范围 0-100
        "npara3": 0,
        "npara4": 0
      }
      //params.cameraId = "DV000000000000001497"
      vcmsControllCamera(params).catch(err => {
        let errMessage = this.getErrEnOrZh(localStorage.lang, res.data.code, null);
            this.$message({
              type: "error",
              message: errMessage
            })
      })
      return 
      Axios.post("/api/scms/iv/cmsproxy/ptz/control", params)
        .then(res => {
          if (res.data.code === 200) {
          } else {
            let errMessage = this.getErrEnOrZh(localStorage.lang, res.data.code, null);
            this.$message({
              type: "error",
              message: errMessage
            })
          }
        })
        .catch(err => {
          console.info(err);
        });
    },

    /**
     * 球机控制
     */
    controlApplyHandel(type) {
      const self = this
      console.log(self)
      if (!self.videoPlayedIndex.camera_id) {
        self.$message({
          type: "error",
          message: self.$t('PreliminaryPosition.wfyk')
        })
        return
      }
      if (self.videoPlayedIndex.TVWall_type == 1) {
        // console.log('云台控制 camera_decState:',self.videoPlayedIndex.camera_decState)
        if (self.videoPlayedIndex.camera_decState != 0) {
          self.$message({
            type: "error",
            message: self.$t('PreliminaryPosition.wfyk')
          })
          return
        } // 电视墙不是“正常播放” 状态，不能申请控制。
      }
      if (type === 1 || type === 3) { // type: 1:申请控制   3: 锁定控制  4:取消控制
        self.isActive = 1
      } else {
        self.isActive = 0
      }
      if (self.ptzType === 'liveVideo') {
        self.videoPlayedIndex = Object.assign({}, self.videoPlayedIndex, {ptzControl: self.isActive})
      } else {
        self.videoPlayedIndex.ptzControl = self.isActive
        console.log('云台控制 ptzControl:',self.videoPlayedIndex.ptzControl)
      }
      let params = {
        "cameraId": self.videoPlayedIndex.camera_id, // 相机ID
        "controllType": type // 控制类型
      }
      //params.cameraId = "DV000000000000001497"

      vcmsControllApply(params).then(res => {
        if (type === 1) {
              self.$notify({
                title: self.$t('PreliminaryPosition.applicationControl'),
                message: self.$t('PreliminaryPosition.applicationControlSuccess'),
                type: 'success'
              });
            } else if (type === 3) {
              self.$notify({
                title: self.$t('PreliminaryPosition.lock'),
                message: self.$t('PreliminaryPosition.lockSuccess'),
                type: 'success'
              });
            } else if (type === 4) {
              self.$notify({
                title: self.$t('PreliminaryPosition.cancelLock'),
                message: self.$t('PreliminaryPosition.cancelLockSuccess'),
                type: 'success'
              });
            }
      })

    //   this.$http.post("/proxyApi42/device-service/devmgt/controllApply", params)
    //     .then(res => {
    //       if (res.data.code === 200) {
    //         if (type === 1) {
    //           self.$notify({
    //             title: self.$t('PreliminaryPosition.applicationControl'),
    //             message: self.$t('PreliminaryPosition.applicationControlSuccess'),
    //             type: 'success'
    //           });
    //         } else if (type === 3) {
    //           self.$notify({
    //             title: self.$t('PreliminaryPosition.lock'),
    //             message: self.$t('PreliminaryPosition.lockSuccess'),
    //             type: 'success'
    //           });
    //         } else if (type === 4) {
    //           self.$notify({
    //             title: self.$t('PreliminaryPosition.cancelLock'),
    //             message: self.$t('PreliminaryPosition.cancelLockSuccess'),
    //             type: 'success'
    //           });
    //         }
    //       } else {
    //         let errMessage = self.getErrEnOrZh(localStorage.lang, res.data.code, null);
    //         self.$message({
    //           type: "error",
    //           message: errMessage
    //         })
    //       }
    //     })
    //     .catch(err => {
    //       console.info(err);
    //     });
     }
  },
  created() {
    // @keydown（键盘按下时触发），@keypress(键盘按住时触发)，@keyup(键盘弹起)
    var that = this
    // 当前页面监视键盘输入
    document.onkeydown = function (e) { // 事件对象兼容
      let e1 = e || event || window.event || arguments.callee.caller.arguments[0]
      // 键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40;左上 --Q,左下 --Z,右上--E,右下--C,上下左右（WSAD）
      if (e1 && (e1.keyCode == 37 || e1.keyCode == 65)) {
        that.turnDirection(23, 0)
      } else if (e1 && (e1.keyCode == 38 || e1.keyCode == 87)) {
        that.turnDirection(21, 0)
      } else if (e1 && (e1.keyCode == 39 || e1.keyCode == 68)) {
        that.turnDirection(24, 0)
      } else if (e1 && (e1.keyCode == 40 || e1.keyCode == 83)) {
        that.turnDirection(22, 0)
      } else if (e1 && e1.keyCode == 81) {
        that.turnDirection(25, 0)
      } else if (e1 && e1.keyCode == 90) {
        that.turnDirection(27, 0)
      } else if (e1 && e1.keyCode == 69) {
        that.turnDirection(26, 0)
      } else if (e1 && e1.keyCode == 67) {
        that.turnDirection(28, 0)
      }
    }

    document.onkeypress = function (e) { // 事件对象兼容
      let e1 = e || event || window.event || arguments.callee.caller.arguments[0]
      // 键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40
      if (e1 && (e1.keyCode == 37 || e1.keyCode == 65)) {
        that.turnDirection(23, 0)
      } else if (e1 && (e1.keyCode == 38 || e1.keyCode == 87)) {
        that.turnDirection(21, 0)
      } else if (e1 && (e1.keyCode == 39 || e1.keyCode == 68)) {
        that.turnDirection(24, 0)
      } else if (e1 && (e1.keyCode == 40 || e1.keyCode == 83)) {
        that.turnDirection(22, 0)
      } else if (e1 && e1.keyCode == 81) {
        that.turnDirection(25, 0)
      } else if (e1 && e1.keyCode == 90) {
        that.turnDirection(27, 0)
      } else if (e1 && e1.keyCode == 69) {
        that.turnDirection(26, 0)
      } else if (e1 && e1.keyCode == 67) {
        that.turnDirection(28, 0)
      }
    }

    document.onkeyup = function (e) { // 事件对象兼容
      let e1 = e || event || window.event || arguments.callee.caller.arguments[0]
      // 键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40
      if (e1 && (e1.keyCode == 37 || e1.keyCode == 65)) {
        that.turnDirection(23, 1)
      } else if (e1 && (e1.keyCode == 38 || e1.keyCode == 87)) {
        that.turnDirection(21, 1)
      } else if (e1 && (e1.keyCode == 39 || e1.keyCode == 68)) {
        that.turnDirection(24, 1)
      } else if (e1 && (e1.keyCode == 40 || e1.keyCode == 83)) {
        that.turnDirection(22, 1)
      } else if (e1 && e1.keyCode == 81) {
        that.turnDirection(25, 1)
      } else if (e1 && e1.keyCode == 90) {
        that.turnDirection(27, 1)
      } else if (e1 && e1.keyCode == 69) {
        that.turnDirection(26, 1)
      } else if (e1 && e1.keyCode == 67) {
        that.turnDirection(28, 1)
      }
    }
  },
  beforeDestroy() {
    document.onkeydown = null
  }
}
</script>

<style lang="scss" scoped>
  .ptz_control {
    position: relative;
    .not-allowed{
      cursor: not-allowed;
      opacity: 0.6;
    }
    .top {
      display: flex;
      padding-top: 10px;
    }
    .circle {
      width: 187px;
      height: 188px;
      background: rgba(40, 148, 240, 1);
      margin: 26px 0 0 10px;
      border-radius: 50%;
      .small-circle {
        width: 95px;
        height: 96px;
        background: rgba(249, 248, 248, 1);
        border-radius: 50%;
        position: absolute;
        top: 80px;
        left: 55px;
        .refresh {
          background: url(./icons/video/refresh.png);
          width: 42px;
          height: 42px;
          color: rgba(111, 119, 144, 1);
          margin-left: 28px;
          margin-top: 25px;
        }
      }
      .up {
        width: 32px;
        height: 32px;
        position: absolute;
        top: 40px;
        left: 84px;
        transform: rotate(-90deg);
      }
      .up-active{
        background: url(./icons/video/sanjiao_right.png);
      }
      .up-inactive{
        background: url(./icons/video/sanjiao-inactive.png) no-repeat center center;
      }
      .left {
        width: 32px;
        height: 32px;
        transform: rotate(180deg);
        position: absolute;
        left: 12px;
        top: 120px;
        z-index: 9;
      }
      .left-active{
        background: url(./icons/video/sanjiao_right.png) no-repeat center center;
      }
      .left-inactive{
        background: url(./icons/video/sanjiao-inactive.png) no-repeat center center;
      }
      .right {
        width: 32px;
        height: 32px;
        position: absolute;
        top: 116px;
        left: 158px;
      }
      .right-active{
        background: url(./icons/video/sanjiao_right.png) no-repeat center center;
      }
      .right-inactive{
        background: url(./icons/video/sanjiao-inactive.png) no-repeat center center;
      }
      .down {
        width: 32px;
        height: 32px;
        transform: rotate(90deg);
        position: absolute;
        top: 186px;
        left: 82px;
      }
      .down-active{
        background: url(./icons/video/sanjiao_right.png) no-repeat center center;
      }
      .down-inactive{
        background: url(./icons/video/sanjiao-inactive.png) no-repeat center center;
      }
      .top_left {
        width: 24px;
        height: 24px;
        position: absolute;
        top: 68px;
        left: 43px;

      }
      .top_left-active{
        transform: rotate(-15deg);
        opacity: 0.4;
        background: url(./icons/video/little_sanjiao_right.png) no-repeat center center;
      }
      .top_left-inactive{
        background: url(./icons/video/lefttop.png) no-repeat center center;
      }
      .top_right {
        width: 24px;
        height: 24px;
        position: absolute;
        top: 70px;
        left: 141px;
      }
      .top_right-active{
        opacity: 0.4;
        transform: rotate(-45deg);
        background: url(./icons/video/little_sanjiao_right.png) no-repeat center center;
      }
      .top_right-inactive{
        background: url(./icons/video/righttop.png) no-repeat center center;
      }
      .bottom_left {
        width: 24px;
        height: 24px;
        position: absolute;
        top: 170px;
        left: 45px;
      }
      .bottom_left-active{
        opacity: 0.4;
        transform: rotate(0deg);
        background: url(./icons/video/little_sanjiao_right.png) no-repeat center center;
      }
      .bottom_left-inactive{
        background: url(./icons/video/bottomleft.png) no-repeat center center;
      }
      .bottom_right {
        width: 24px;
        height: 24px;
        position: absolute;
        top: 172px;
        left: 138px;
      }
      .bottom_right-active{
        opacity: 0.4;
        transform: rotate(30deg);
        background: url(./icons/video/little_sanjiao_right.png) no-repeat center center;
      }
      .bottom_right-inactive{
        background: url(./icons/video/bottomright.png) no-repeat center center;
      }
    }
    .right_btn_group {
      width: 120px;
      margin-left: 10px;
      /*margin-top: 20px;*/

      .row {
        display: flex;
        justify-content: space-around;
      }
      .icon-wrap{
        justify-content: center;
        margin-bottom: 10px;
      }
      .iconyuntai{
        margin-right: 18px;
      }
      .iconsuoding{
        margin: 0 18px; display:none;
      }
      .active-color{
        color: #249bff;
      }
      .sun {
        margin-bottom: 20px;
        width: 32px;
        height: 32px;
        border: 16px solid #249bff;
        border-radius: 50%;
        position: relative;
        div {
          width: 32px;
          height: 32px;
          position: absolute;
          top: -16px;
          left: -17px;
        }
        .light-active{
          background: url(./icons/video/sun.png) no-repeat center center;
        }
        .light-inactive{
          width: 34px;
          left: -17px;
          top: -18px;
          height: 34px;
          background: url(./icons/video/lightactive.png) no-repeat center center;
        }
      }
      .sun_disable {
        width: 32px;
        height: 32px;
        border: 16px solid #67aae7;
        border-radius: 50%;
        position: relative;
        div {
          width: 32px;
          height: 32px;
          position: absolute;
          top: -16px;
          left: -17px;
        }
        .sun_disable-active{
          background: url(./icons/video/sun_disable.png) no-repeat center center;
        }
        .sun_disable-inactive{
          width: 34px;
          left: -17px;
          top: -18px;
          height: 34px;
          background: url(./icons/video/sundisabledinactive.png) no-repeat center center;
        }
      }
      .voice {
        margin-bottom: 20px;
        width: 32px;
        height: 32px;
        border: 16px solid #249bff;
        border-radius: 50%;
        img {
          width: 19px;
          height: 21px;
          position: relative;
          top: -10px;
          left: -10px;
        }
      }
      .focus-large{
        width: 34px !important;
        height: 34px !important;
        top: -17px !important;
        left: -17px !important;
      }
      .voice_disable {
        width: 32px;
        height: 32px;
        border: 16px solid #67aae7;
        border-radius: 50%;
        img {
          width: 19px;
          height: 21px;
          position: relative;
          top: -10px;
          left: -10px;
        }
      }
      .admin {
        margin-bottom: 20px;
        width: 32px;
        height: 32px;
        border: 16px solid #249bff;
        border-radius: 50%;
        // position: relative;
        img {
          width: 19px;
          height: 21px;
          position: relative;
          top: -10px;
          left: -9px;
        }
      }
      .admin_disable {
        width: 32px;
        height: 32px;
        border: 16px solid #67aae7;
        border-radius: 50%;
        position: relative;
        div {
          width: 28px;
          height: 28px;
          position: absolute;
          top: -14px;
          left: -14px;
        }
        .admin_disable-active{
          background: url(./icons/video/admin_disable.png) no-repeat center center;
        }
        .admin_disable-inactive{
          width: 34px !important;
          height: 34px !important;
          top: -17px !important;
          left: -17px !important;
          background: url(./icons/video/admin-distable-inactive.png) no-repeat center center;
        }
      }
      .sanjiao {
        width: 32px;
        height: 32px;
        border: 16px solid #249bff;
        border-radius: 50%;
        // position: relative;
        img {
          width: 19px;
          height: 21px;
          position: relative;
          top: -10px;
          left: -10px;
          transform: rotate(-180deg);
        }
      }
      .sanjiao_disable {
        width: 32px;
        height: 32px;
        border: 16px solid #67aae7;
        border-radius: 50%;
        // position: relative;
        img {
          width: 19px;
          height: 21px;
          position: relative;
          top: -10px;
          left: -7px;
        }
      }
    }
    .add_and_subtract {
      .progress {
        margin-top: 26px;
        margin-left: 5px;
      }
      .preset {
        .yzw-title {
          font-size:14px;
          margin-left:8px;
          color:#333333
        }
      }
      .select {
        width: 188px;
        height: 30px;
        margin-right: 8px;
      }
      .btn {
        width: 70px;
      }
    }
  }
</style>
