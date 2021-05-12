/****************************
*  项目名称: scms-iv
*  作者：张新瑞
*  功能：录像回放
*  时间：2019.12
*****************************/

<template>
  <div class="video_replay_div">
    <div class="all_replay_content_display" id="all_replay_content_mv">
      <div class="close_replay_div_left"  id="closeReplayL" v-on:click="closeReplay()" :title="$t('videoQuery.close')" style="display: block"></div>
      <div class="close_replay_div_right" id="closeReplayR" v-on:click="closeReplay()" :title="$t('videoQuery.close')" style="display: none"></div>
      <div class="header_replay_div">
        <div class="squ_replay_div">
          <div class="squ_replay_text">{{$t('videoQuery.videoplay')}}</div>
        </div>
      </div>
    <ul class="squared_ul11" id="squared_ul_mv">
      <ul class="quarter_div_nomal" v-on:dblclick="replayAllScreen()" id="quarter_div1_mv" ref="videopanel">
        <video id="video_0" style="width:100%; height:101%; object-fit: fill; margin-top: -1px"  autoplay="autoplay"  preload="none">
          <!-- <source src= "rtsp://10.72.55.166:554/record/00000000001110000021-1/time-1574130445-1574131532/s?A=b30d463033934eb0396339d3333b344" type="application/x-rtsp">-->
          <!-- <source :src="videos['0']['rtspAddress']" type="application/x-rtsp"> -->
        </video>
        <div class="errorStatus" v-if="videos.errorShow">{{videos.error}}</div>
      </ul>
<!--      stopReplay()-->
      <div class="basic-operation-div-nomal" id="basic-operation-div-mv"
           @mouseover="enterOperation()" @mouseleave="leaveOperation()">
        <div id="operation-enter-mv" class="operation-enter-nomal">
        <div id="recordplay" class="el-icon-pause" :title="$t('passingInformation.kszt')"></div>
        <div id="recordstop" class="el-icon-stop1" :title="$t('passingInformation.tz')"></div>
        <div  class="el-icon-progress">
        <el-slider  v-model="progress_value" :max="progress_max"
                    id="filePrecent" :show-tooltip="true"
                    @change="currentPrecent" @input="currentInput"
                    :format-tooltip="formatTooltip" ></el-slider>
        </div>
          <i id="screenrecordsave"
             v-if="!isRecordingUp"
             class='iconfont iconluxiang1 icon-font'
             style="font-size: 22px;
                    float: right;
                    margin-top: 8px;"
             :title="recordStr" v-on:click="recording()"/>
          <img v-else id="screenrecordsave"
               src="./icons/video/luping.gif" style="width: 20px;height: 20px;margin-top: 10px;" :title="recordStr"
               v-on:click="recording()">
          <i class="iconfont icon-font iconpaizhao"
             style="font-size: 22px;
                    margin-right: 10px;
                    float: right;
                    margin-top: 8px;" id="screenshot" :title="$t('videoReplay.screenshot')"
             v-on:click="screenshots()"/>
<!--        <div id="screenshot" class="el-icon-screenshot" :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"></div>-->
        <button id="recordslow" style="border: none;" class="el-icon-slow" :title="$t('passingInformation.mj')"></button>
        <button id="recordquick" style="border: none;" class="el-icon-quick" :title="$t('passingInformation.kj')"></button>
        <div class="el-speed-title"> {{$t('videoReplay.speed')}}: *<span style="color: white;margin-left: 0.4em;margin-right: 0.4em;">{{speedValueStr}}</span></div>
<!--        <span id="recordspeedtitle" class="el-speed-title" >速度 :*</span>-->
        </div>
      </div>

    </ul>
      <div id="exportShowLabel" class="export-show" :title="$t('videoQuery.expandtag')" style="display: none"></div>
    <el-form :inline="true"  id="export-table" class="add-table-div" label-width="100px" style="display: none">
      <template>
        <el-tabs v-model="activeName"  @tab-click="handleClick">
          <el-tab-pane :label="$t('videoQuery.playList')" name="first" v-if="showPlayList" :key="menuKey">
            <div class="video-file-table-style1" >
              <el-table :data="selectFilesDatas"
                        style="width: 100%"
                        ref="singleTable"
                        class="table-div"
                        max-height="400"
                        :show-header="false"
              >
<!--                @cell-dblclick="playCurVideo"-->
                <el-table-column fixed="right" :label="$t('videoQuery.videoname')" min-width="5%">
                  <template slot-scope="scope">
                    <el-button size="small"
                               type="text"
                               style="font-size: 16px;"
                                v-if = "scope.row.curPlaying"
                               @click="playCurVideo(scope.$index, scope.row)">{{ scope.row.filename }}</el-button>
                    <el-button size="small"
                               type="text"
                               style="font-size: 16px;color: whitesmoke"
                                v-else
                               @click="playCurVideo(scope.$index, scope.row)">{{ scope.row.filename }}</el-button>

                  </template>
                </el-table-column>

              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane :label="$t('videoQuery.videotag')" name="second" v-if="showLabel">
            <div class="video-file-table-style1" >
              <el-table :data="propTableData.col.filter(data => handleAdd || data.labelName.toLowerCase().includes(handleAdd.toLowerCase()))"
                        style="width: 100%"
                        ref="singleTable"
                        class="table-div"
                        max-height="400"
              >
                <el-table-column
                  min-width="1%">
                </el-table-column>
                <el-table-column prop="labelName" :label="$t('videoQuery.tagname')" min-width="5%">
                  <template slot-scope="scope">
              <span v-if="scope.row.isSet">
              <el-input size="mini" v-model="scope.row.labelName"></el-input>
              </span>
                    <span v-else >{{ scope.row.labelName }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="userName" :label="$t('videoQuery.cerater')" min-width="4%">
                  <template slot-scope="scope">
              <span v-if="scope.row.isSet">
              <el-input size="mini" v-model="scope.row.userName" readonly style="background-color:#3c3f4e"></el-input>
              </span>
                    <span v-else>{{ scope.row.userName }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="reportTime" :label="$t('videoQuery.writeTime')" min-width="5%">
                  <template slot-scope="scope">
              <span v-if="scope.row.isSet">
              <el-input size="mini" v-model="scope.row.reportTime" readonly style="background-color:#3c3f4e"></el-input>
              </span>
                    <span v-else>{{ scope.row.reportTime }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="visible" :label="$t('videoQuery.disabled')" min-width="3%">
                  <template slot-scope="scope">
              <span v-if="scope.row.isSet">
                <el-select v-model="scope.row.visible"
                           size="mini">
              <el-option v-for="item in visibleOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
              </span>
                    <span v-else>{{ scope.row.visible ==1 ? $t('videoQuery.yes'):$t('videoQuery.no') }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="remark" :label="$t('videoQuery.remark')" min-width="5%">
                  <template slot-scope="scope">
              <span v-if="scope.row.isSet">
              <el-input size="mini" v-model="scope.row.remark"></el-input>
              </span>
                    <span v-else>{{ scope.row.remark }}</span>
                  </template>
                </el-table-column>
                <el-table-column fixed="right" :label="$t('passingInformation.cz')" min-width="5%">
                  <template slot-scope="scope">
                    <el-button size="small"
                               type="text"
                               style="font-size: 16px"
                               v-if="!scope.row.isSet"
                               @click="valChange(scope.row,scope.$index,true)">{{$t('productList.bj')}}</el-button>
                    <el-button size="small"
                               type="text"
                               style="font-size: 16px"
                               v-else
                               @click="valChange(scope.row,scope.$index,true)">{{$t('passingInformation.bc')}}</el-button>
                    <el-button size="small"
                               type="text"
                               style="font-size: 16px"
                               v-if="!scope.row.isSet"
                               @click="handleDelete(scope.$index, scope.row)">{{$t('productList.sc')}}</el-button>
                    <el-button size="small"
                               type="text"
                               style="font-size: 16px"
                               v-else
                               @click="valChange(scope.row,scope.$index,false)">{{$t('passingInformation.qx')}}</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <el-button class="add-data" type="text" @click="handleAdd()" style="font-size: 16px" v-if="showAddLabel">+ {{$t('productList.xz')}}</el-button>
          </el-tab-pane>
        </el-tabs>
      </template>
    </el-form>
      <div id="hideShow" class="export-hide" :title="$t('videoQuery.closetag')" style="display: none"></div>
    </div>
  </div>
</template>

<script>
  import { timeStampToFormatDate, checkFull, getUnixTime, checkArrContain } from "./belong/utility";

  import Axios from "axios";
  import moment from 'moment';
  import Watermark from "./belong/watermark.js";
  import $ from 'jquery'
  import globalScmsVideoStatus from "./belong/scmsVideoStatus"

  export default {
    name: "VideoQueryReplay",
    props: [
      'Camera_ID',
      'replay_visible',
      'selectFilesDataToRe'
    ],
    data() {
      return {
        speedValue: 1,
        speedValueStr: '1',
        progress_value: 0,
        progress_max: 1000,
        infiledList: [],
        fildtps: [{text: this.$t('videoQuery.string'), value: '1'}, {text: this.$t('videoQuery.num'), value: '2'}],
        visible: this.replay_visible,
        isActive: '1',
        videoServerUrl: "",
        proxyTransport: 'true',
        isVideoRecording: false,
        videos: {"rtspAddress": "", "played": false, "camera_ip": "", "camera_id": "", "error": "", "errorShow": true},
        videoArr: ["1"],
        playBox: {},
        playerOptions: {},
        rtspAddress: "",
        allScreenFlag: true,
        isAllScreen: false,
        screenTitle: this.$t('videoReplay.AllScreen'),
        currentPage: 1,
        pageSize: 4,
        isPlay: false,
        playSpeed: 1,
        playState: -1,
        html5Player: {},
        isPlayColsed: true,
        loadTime: null,
        reconnect: null,
        curTime: 0,
        isSlider: true,
        isMark: true,
        countInput: -1,
        count: -1,
        screenWidth: "",
        screenHeight: "",
        videoServerIp: "",
        videoWebsocketPort: "",
        seenOperation: true,
        contW: 0,
        cliWidth: 0,
        screW: 0,
        recorder: null,
        recodename: "recode",
        readonly: true,
        enterPlayer: false,
        sendBeatToaken: null,
        selectFilesDatas: this.selectFilesDataToRe,
        isClickStop: false,
        playedArray: [],
        showPlayList: false,
        showLabel: false,
        showAddLabel: false,
        activeName: 'first',
        curFileName: "",
        menuKey: 1,
        menuData: 0,
        curVideoFile: [],
        nextVideoFlag: false,
        isPlayed: false,
        isDestroy: false,
        rtpbps: 0,
        fileStartTime: "",
        fileEndTime: "",
        fileName: "",
        endTime: "",
        startTime: "",
        fileSize: "",
        storeServerId: "",
        recordType: "",
        recordPosition: "",
        isDuration: false,
        reconnectTime: 0,
        lastReconnectTime: 0,
        isProgress: false,
        isLockReconnected: true,
        isWsUsed: true,
        audioSwitchValue: false,
        recordStr: this.$t('videoReplay.recording'),
        isRecordingUp: false,
        userNameTemp: localStorage.getItem('userName'),
        visibleOptions: [
          {
            value: 1,
            label: this.$t('videoQuery.yes')
          },
          {
            value: 0,
            label: this.$t('videoQuery.no')
          }
        ],
        propTableData: {
          sel: null, // 选中行
          col: []
        }
      };
    },
    computed: {
      isWinMin() {
        return this.$store.state.isWinMin;
      },
      camera_id: {
          get() {
              const id = JSON.parse(JSON.stringify(this.Camera_ID))
              return id
          },
          set(val) {
              return 
          }
      }
    },
    watch: {
      '$store.getters.getAllScreenFlag': function (val) {
        this.allScreenFlag = !val
        if (this.allScreenFlag === false) {
          this.screenTitle = this.$t('videoReplay.outAllScreen')
        } else {
          this.screenTitle = this.$t('videoReplay.AllScreen')
        }
      },
      isWinMin(val) {
      },
      menuData() {
        ++this.menuKey
      },
      enterPlayer(val) {
        if (val) {
          this.sendBeatToaken = setInterval(() => {
            this.heartBeatToaken();
            console.log("enterPlayer", val);
          }, 5000)
        } else {
          clearInterval(this.sendBeatToaken);
          this.sendBeatToaken = null;
          console.log("enterPlayer", val);
        }
      },
      camera_id(val) {
        // 这样重新赋值后，就得到了父组件动态改变的数据
        if (val != "") {
          if (!this.nextVideoFlag) {
            this.camera_id = val;
            document.getElementById('exportShowLabel').style.display = 'block'
            this.init();
            this.progress_value = 0;
            this.selectFilesDatas = this.selectFilesDataToRe;
            if (this.selectFilesDatas.length == 1) {
              this.curVideoFile = this.selectFilesDatas[0];
            } else if (this.selectFilesDatas.length > 1) {
              this.curVideoFile = this.selectFilesDatas[0];
              this.playedArray.push(this.selectFilesDatas[0].filePath)
            }
            this.handleRePlay(this.curVideoFile);
            this.loadSliderCurTime();
          }
        }
      },
      visible(val) {
        this.replay_visible = val;
      }
    },
    activated: function () {
      for (var i = 0; i < this.isActive; i++) {
        if (this.videos.played) {
          this.html5Player.play();
        }
      }
    },
    mounted: async function () {
      if (localStorage.getItem('audioSwitchValue') != null) {
        this.audioSwitchValue = JSON.parse(localStorage.getItem('audioSwitchValue'));
        console.log("audioSwitchValue:", this.audioSwitchValue);
      }
      // this.refreshPatrol();
      var that = this;
      window.addEventListener('resize', function () {
        if (!checkFull()) {
          that.initScreenDivStatus();
        }
      })

      // 设置页面水印
    //   Watermark.set('力维视频 ' + localStorage.getItem('userName') + localStorage.getItem('ipdz'), this.$refs.videopanel)
      //this.visible =  false;
      //this.replay_visible = false;
    //   this.closeReplay();
    },
    methods: {
      enterOperation() {
        if (checkFull()) {
          $(document.getElementById("operation-enter-mv")).removeClass("operation-enter-diss");
          $(document.getElementById("operation-enter-mv")).addClass("operation-enter-nomal-grand");
        }
      },
      leaveOperation() {
        if (checkFull()) {
          $(document.getElementById("operation-enter-mv")).removeClass("operation-enter-nomal-grand");
          $(document.getElementById("operation-enter-mv")).addClass("operation-enter-diss");
        }
      },
      formatTooltip(val) {
        this.curTime = (parseInt(this.fileStartTime) + parseInt(val)) * 1000;
        return timeStampToFormatDate(this.curTime, 'Y-m-d H:i:s');
      },
      allScreen() {
        this.$store.commit('updateAllScreen', !this.$store.getters.getAllScreenFlag)
      },
      handleClick(tab, event) {
        if (tab.label == this.$t('videoQuery.videotag')) {
          this.queryLabal(this.curVideoFile.filePath)
        } else if (tab.label == this.$t('videoQuery.playList')) {
          this.propTableData.col = [];
        }
      },
      playCurVideo (index, row) {
        let _this = this
        this.playedArray = [];
        for (var i = 0; i < this.selectFilesDatas.length; i++) {
          if (i <= index) {
            this.playedArray.push(this.selectFilesDatas[i].filePath)
          }
          if (i == index) {
            this.selectFilesDatas[i].curPlaying = true;
            this.curVideoFile = this.selectFilesDatas[i];
          } else {
            this.selectFilesDatas[i].curPlaying = false;
          }
        }
        this.nextVideoFlag = true;
        this.stopReplay();
        setTimeout(function () {
          _this.handleRePlay(row);
        }, 1000);
      },
      heartBeatToaken() {
        return 
        Axios.get("/api/scms/iv/cmsproxy/heartbeat")
          .then(res => {
            if (res.data.code === 200) {
              console.log("heartBeatToaken--");
            } else {
              self.$message({
                type: "error",
                message: res.data.message
              });
            }
          })
          .catch(err => {
            console.info(err);
          });
      },
      handleAdd() {
        for (let i of this.propTableData.col) {
          if (i.isSet) {
            return;
          }
        }
        let curTime = timeStampToFormatDate((Math.round(new Date() / 1000)) * 1000, 'Y-m-d H:i:s');
        let row = {
          labelName: '', userName: this.userNameTemp, reportTime: curTime, remark: '', visible: 1, isSet: true, labelId: '', vfLabelId: ''
        }
        console.log("row", row);
        this.propTableData.col.push(row)
        this.propTableData.sel = row
      },
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },

      valChange(row, index, qx) {
        for (let i of this.propTableData.col) {
          console.log('i.isSet', i.isSet, i.id, row.id)
          if (i.isSet && i.id != row.id) {
           // this.Message(this.$t('basicData.device.propDlg.pleSave'), 'warning')
            return false
          }
        }
        if (!qx) {
          console.log('qx', this.propTableData.sel.id)
          if (!this.propTableData.sel.id) {
            this.propTableData.col.splice(index, 1)
            console.log('qx', this.propTableData.col)
          }
          return (row.isSet = !row.isSet)
        }
        if (row.isSet) {
          console.log('this.propTableData.sel', this.propTableData.sel)
          console.log('this.propTableData.row', row)
          const v = this.propTableData.sel
          // 必填项判断
          if (v.labelName == '') {
            this.$message({
              type: "warn",
              message: this.$t('videoQuery.entertagname')
            });
          } else {
             row.isSet = false;
             if (row.vfLabelId == '' && row.labelId == '') {
              this.addNewlabel(row, this.curVideoFile);
             } else {
               this.updatelabel(row, this.curVideoFile);
             }
          }
        } else {
          row.isSet = true
          this.propTableData.sel = row
        }
      },
      // 删除
      handleDelete(index, row) {
        this.delLabal(index, row);
      },
      queryLabal(filename) {
        var _this = this;
        let labelDevs = {};
        labelDevs.fileName = filename;
        labelDevs.labelType = 2;
        console.log("labelDevs", labelDevs);
        Axios.post("/api/scms/iv/cmsproxy/recordlabel/getRecordlabel", labelDevs)
          .then(res => {
            if (res.data.code === 200) {
              console.log('row', res.data);
              if (res.data.data != null) {
                _this.propTableData.col = res.data.data;
                console.log("labelDevs", _this.propTableData.col);
              }
            } else {
              _this.$message({
                type: "error",
                message: res.data.message
              });
            }
          })
          .catch(err => {
            console.info(err);
          });
      },
      delLabal(index, row) {
        var _this = this;
        console.log("row", row);
        let delDevs = {};
        delDevs.labelId = row.labelId;
        delDevs.vfLabelId = row.vfLabelId;
        Axios.post("/api/scms/iv/cmsproxy/recordlabel/delRecordlabel", delDevs)
          .then(res => {
            if (res.data.code === 200) {
              _this.propTableData.col.splice(index, 1)
            } else {
              _this.$message({
                type: "error",
                message: res.data.message
              });
            }
          })
          .catch(err => {
            console.info(err);
          });
      },
      addNewlabel(row, mulVideoData) {
        let selDevs = {};
        selDevs.createAddress = '';
        selDevs.deptDescr = '';
        if (mulVideoData.length == 0) {
          selDevs.deviceId = this.camera_id;
          selDevs.endTime = this.endTime;
          selDevs.fileName = this.fileName;
          selDevs.fileSize = this.fileSize;
          selDevs.recordPosition = this.recordPosition;
          selDevs.recordType = this.recordType;
          selDevs.startTime = this.startTime;
          selDevs.storeServerId = this.storeServerId;
        } else {
          selDevs.deviceId = mulVideoData.camera_id;
          selDevs.endTime = mulVideoData.endtime;
          selDevs.fileName = mulVideoData.filePath;
          selDevs.fileSize = mulVideoData.size;
          selDevs.recordPosition = mulVideoData.forward;
          selDevs.recordType = mulVideoData.type;
          selDevs.startTime = mulVideoData.starttime;
          selDevs.storeServerId = mulVideoData.service_id;
        }
        selDevs.labelName = row.labelName;
        selDevs.remark = row.remark;
        selDevs.labelType = 2;
        selDevs.visible = row.visible;
        var _this = this;
        console.log('this.propTableData.row', selDevs);
        Axios.post("/api/scms/iv/cmsproxy/recordlabel/addRecordlabel", selDevs)
          .then(res => {
            console.log('this.propTableData.row', res);
            if (res.data.code === 200) {
              console.log('this.propTableData.row', res.data.message);
              if (mulVideoData.length == 0) {
                _this.queryLabal(_this.fileName);
              } else {
                _this.queryLabal(mulVideoData.filePath);
              }
            } else {
              row.isSet = !row.isSet;
              _this.$message({
                type: "error",
                message: res.data.message
              });
            }
          })
          .catch(err => {
            console.info(err);
          });
      },
      updatelabel(row, mulVideoData) {
        let selDevs = {};
        selDevs.createAddress = '';
        selDevs.deptDescr = '';
        if (mulVideoData.length == 0) {
          selDevs.deviceId = this.camera_id;
          selDevs.endTime = this.endTime;
          selDevs.fileName = this.fileName;
          selDevs.fileSize = this.fileSize;
          selDevs.recordPosition = this.recordPosition;
          selDevs.recordType = this.recordType;
          selDevs.startTime = this.startTime;
          selDevs.storeServerId = this.storeServerId;
        } else {
          selDevs.deviceId = mulVideoData.camera_id;
          selDevs.endTime = mulVideoData.endtime;
          selDevs.fileName = mulVideoData.filePath;
          selDevs.fileSize = mulVideoData.size;
          selDevs.recordPosition = mulVideoData.forward;
          selDevs.recordType = mulVideoData.type;
          selDevs.startTime = mulVideoData.starttime;
          selDevs.storeServerId = mulVideoData.service_id;
        }
        selDevs.labelName = row.labelName;
        selDevs.remark = row.remark;
        selDevs.labelType = 2;
        selDevs.visible = row.visible;
        selDevs.vfLabelId = row.vfLabelId;
        selDevs.labelId = row.labelId;
        var _this = this;
        console.log('this.propTableData.row', selDevs);
        Axios.post("/api/scms/iv/cmsproxy/recordlabel/updateRecordlabel", selDevs)
          .then(res => {
            console.log('this.propTableData.row', res);
            if (res.data.code === 200) {
              console.log('this.propTableData.row', res.data.message);
              if (mulVideoData.length == 0) {
                _this.queryLabal(_this.fileName);
              } else {
                _this.queryLabal(mulVideoData.filePath);
              }
            } else {
              row.isSet = !row.isSet;
              _this.$message({
                type: "error",
                message: res.data.message
              });
            }
          })
          .catch(err => {
            console.info(err);
          });
      },
      handleSizeChange(val) {
        this.pageSize = val;
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.currentPage = val;
        console.log(`当前页: ${val}`);
      },
      init: function () {
        var self = this;
        self.initScreenDivStatus();
        this.html5Player = document.getElementById('video_0');
        this.videos.error = "";
        this.fileEndTime = parseInt(this.fileEndTime) * 1000;

        $('#exportShowLabel').unbind('click').click(function () {
          self.showLabel = true;
          self.showAddLabel = true;
          if (self.selectFilesDatas.length > 1) {
            self.showPlayList = true;
            self.curVideoFile = self.selectFilesDatas[0];
            self.queryLabal(self.selectFilesDatas[0].filePath);
            self.activeName = "first";
          } else {
            self.queryLabal(self.fileName);
            self.showPlayList = false;
            self.activeName = "second";
          }
          document.getElementById('hideShow').style.display = 'block'
          document.getElementById('export-table').style.display = 'block'
          document.getElementById('exportShowLabel').style.display = 'none'
          document.getElementById('closeReplayL').style.display = 'none'
          document.getElementById('closeReplayR').style.display = 'block'
          document.getElementById('squared_ul_mv').style.borderRadius = '0px'
          $(document.getElementById("all_replay_content_mv")).removeClass("all_replay_content_display");
          $(document.getElementById("all_replay_content_mv")).addClass("all_replay_content_show");
        });
        $('#hideShow').unbind('click').click(function () {
          self.showLabel = false;
          self.showAddLabel = false;
          document.getElementById('hideShow').style.display = 'none'
          document.getElementById('export-table').style.display = 'none'
          document.getElementById('exportShowLabel').style.display = 'block'
          document.getElementById('closeReplayL').style.display = 'block'
          document.getElementById('closeReplayR').style.display = 'none'
          document.getElementById('squared_ul_mv').style.borderRadius = '0px 25px 10px 10px'
          $(document.getElementById("all_replay_content_mv")).removeClass("all_replay_content_show");
          $(document.getElementById("all_replay_content_mv")).addClass("all_replay_content_display");
        });
        $('#recordplay').unbind('click').click(function () {
          if (self.playState == 0) {
            self.recordplay();
            self.setPlayState(1);
          } else if (self.playState == 1) {
            self.recordpause();
            self.setPlayState(0);
          } else if (self.playState == -1) {
            self.recordpause();
            self.setPlayState(0);
          }
        });
        $('#recordstop').unbind('click').click(function () {
            self.stopReplay();
        });
        $('#recordquick').unbind('click').click(function () {
          var btnQuick = document.getElementById('recordquick');
          btnQuick.disabled = 'disabled';
          setTimeout(function() {
            btnQuick.disabled = '';
          }, 1000);
          if (self.html5Player.paused) {
            return
          }
          var playName = "player_0";
          var audioValue = false;
          if (self.playBox[playName] != null) {
            self.playBox[playName].switchAudioMute(audioValue);
          }
          if (self.html5Player.playbackRate > 0 && self.html5Player.playbackRate < 16) {
            self.html5Player.playbackRate *= 2;
          }
          self.speedValue = self.html5Player.playbackRate;
          self.speedValueStr = self.decimalsToFractional(self.speedValue);
        });
        $('#recordslow').unbind('click').click(function () {
          var btnSlow = document.getElementById('recordslow');
          btnSlow.disabled = 'disabled';
          setTimeout(function() {
            btnSlow.disabled = '';
          }, 1000);
          if (self.html5Player.paused) {
            return
          }
          var playName = "player_0";
          var audioValue = false;
          if (self.playBox[playName] != null) {
            self.playBox[playName].switchAudioMute(audioValue);
          }
          if (self.html5Player.playbackRate > 0.125 && self.html5Player.playbackRate <= 16) {
            self.html5Player.playbackRate /= 2;
          }
          self.speedValue = self.html5Player.playbackRate;
          self.speedValueStr = self.decimalsToFractional(self.speedValue);
        });
      },

      configAndPlayVideo() {
        this.videos.played = true;
        this.isPlayColsed = false;
        this.videos.camera_id = this.camera_id;
        this.videos.rtspAddress = this.rtspAddress;
        this.videos.error = "";
        this.setPlayerSource(false);
      },
      loadSliderCurTime() {
        this.loadTime = setInterval(() => {
          if (!this.html5Player.paused) {
            this.progress_value = this.html5Player.currentTime;
            this.setPlayState(1);
          } else {
            this.setPlayState(0);
          }
          this.speedValue = this.html5Player.playbackRate;
          this.speedValueStr = this.decimalsToFractional(this.speedValue);
          if (this.html5Player.duration && !this.isDuration) {
            this.progress_max = this.html5Player.duration;
            this.isDuration = true;
          }
          // console.log("currentTime:" + this.html5Player.currentTime);
          console.log("progress_max:" + this.progress_max);
          // console.log("this.html5Player.error:" + this.html5Player.error);
          // if (this.curTime >= this.fileEndTime) {
          // //   this.stopReplay();
          // this.stopForExit();
          // }
          if (this.html5Player.currentTime >= this.progress_max) {
            this.stopForExit();
          }
        }, 1000)
      },
      reconnectWs() {
        var this_ = this;
        this_.stopForReconnect();
        setTimeout(function() {
          this_.handleRePlay(this_.curVideoFile);
        }, 2000);
      },
      setPlayerSource: function (isPauseToPlay) {
        var playname = "player_0";
        // if (isPauseToPlay == false) {
            this.html5Player.src = this.rtspAddress;
        // } else {
        //   if (this.recordPosition == 0) {
        //     this.html5Player.src = this.videos.rtspAddress;
        // }
        this.isPlayColsed = false;
        this.isPlayed = true;
        this.playBox[playname] = window.Streamedian.player("video_0", this.playerOptions);
        this.enterPlayer = true;
        this.isDestroy = false;
      },
      getVideoServerUrl: async function (houseId) {
        let self = this;
        var url = "/etis/rollcall/getVideoServerUrl";
        Axios.get("/api/scms/iv/cmsproxy/streamproxy/getOptimalStreamproxy")
          .then(res => {
            if (res.data.code === 200) {
              self.videoServerIp = res.data.data.ip;
              self.videoWebsocketPort = res.data.data.websocketPort;
              self.videoServerUrl = "ws:" + self.videoServerIp + ":" + self.videoWebsocketPort + "/ws"
              self.initvideo();
              self.configAndPlayVideo();
            } else {
              self.$message({
                type: "error",
                message: res.data.message
              });
            }
          })
          .catch(err => {
            console.info(err);
          });
      },
      isPlaying: function () { // 判断设备是否正在播放
        //   let played = this.videos.played;
        //   if (played && camera_ip == this.videos.camera_ip) {
        //     playing = true;
        // }
        let playing = false;
        return playing;
      },
      initvideo: function (index) {
        var self = this;
        if (window.Streamedian) {
          let errHandler = function (err) {
            self.videos.error = err.message;
          };
          let reconHandler = function () {
          };
          let stuHandler = function (currentProxy, message) {
              switch (message) {
                case self.globalScmsVideoStatus.STATUS_REQUESTING_VIDEO:
                  self.videos.error = self.$t('public.requesting_video');
                  break;
                case self.globalScmsVideoStatus.STATUS_REQUESTING_VIDEO_FAILED:
                  self.videos.error = self.$t('public.video_request_failed');
                  break;
                case self.globalScmsVideoStatus.STATUS_INTERRUPT_TRYING_TO_RECONNECT_VIDEO:
                  if (!self.isDestroy) {
                    self.videos.error = self.$t('public.video_interrupt_trying_to_reconnect');
                  }
                  break;
                case self.globalScmsVideoStatus.STATUS_RECONNECT_VIDEO:
                  if (!self.html5Player.paused || self.isPlayed) {
                    if (self.html5Player.currentTime != 0) {
                      self.reconnectTime = self.html5Player.currentTime;
                      self.lastReconnectTime = self.reconnectTime;
                    } else {
                      self.reconnectTime = self.lastReconnectTime;
                    }
                    console.log("reconnect", self.html5Player.currentTime);
                    self.reconnectWs();
                  }
                  break;
                case self.globalScmsVideoStatus.STATUS_NO_CONTAIN_AUDIO:
                  break;
                case self.globalScmsVideoStatus.STATUS_CONTAIN_AUDIO:
                  break;
                default:
                  if (!self.html5Player.paused || self.isPlayed) {
                   self.videos.error = self.$t('public.receiving_data') + " " + message.toFixed(2) + "kbps";
                   self.rtpbps = message;
                    break;
                  }
              }
          };
          if (this.videoServerUrl == "") {
            this.$message({
              message: this.$t('passingInformation.spfwqdzmyjzcg')
            });
            return;
          }

          this.playerOptions = {
            proxyTransport: this.proxyTransport,
            socket: this.videoServerUrl,
            redirectNativeMediaErrors: true,
            bufferDuration: 100,
            statuHandler: stuHandler,
            errorHandler: errHandler,
            forward: this.recordPosition,
            reconnectTime: this.reconnectTime,
            audioSwitchValue: this.audioSwitchValue
          };
          $("video").bind("contextmenu", function () { // 取消右键事件
            return false;
          });
        }
      },
      stopForExit: function() {
        this.nextVideoFlag = true;
        this.isPlayed = false;
        this.stopReplay();
        console.log("select", this.selectFilesDatas);
        for (var j = 0; j < this.selectFilesDatas.length; j++) {
          this.selectFilesDatas[j].curPlaying = false;
        }
        for (var i = 0; i < this.selectFilesDatas.length; i++) {
          if (this.fileName != this.selectFilesDatas[i].filePath && this.playedArray.indexOf(this.selectFilesDatas[i].filePath) == -1) {
            this.selectFilesDatas[i].curPlaying = true;
            this.curVideoFile = this.selectFilesDatas[i];
            this.playedArray[i] = this.selectFilesDatas[i].filePath;
            this.handleRePlay(this.selectFilesDatas[i]);
            return;
          }
        }
      },
      stopReplay: function() {
        this.reconnectTime = 0;
        this.progress_value = 0;
        this.progress_max = 1;
        this.html5Player.src = "";
        this.isPlayColsed = true;
        this.enterPlayer = false;
        this.isPlayed = false;
        this.isDuration = false;
        this.videos.error = this.$t('public.stopped');
        var playname = "player_0";
        if (this.playBox[playname] != null) {
          this.isLockReconnected = false;
          this.playBox[playname].destroy(this.isLockReconnected);
          this.playBox[playname] = null;
          this.isDestroy = true;
        }
      },
      stopForReconnect: function () {
        var playname = "player_0";
        if (this.playBox[playname] != null) {
          this.isLockReconnected = true;
          this.playBox[playname].destroy(this.isLockReconnected);
          this.playBox[playname] = null;
          this.videos.error = this.$t('public.video_interrupt_trying_to_reconnect');
          this.isDestroy = true;
        }
      },
      closeReplay: function () {
          console.log('关闭');
        this.isDestroy = true;
        this.propTableData.sel = null;
        this.propTableData.col = [];
        this.selectFilesDatas = [];
        this.curVideoFile = [];
        this.playedArray = [];
        this.nextVideoFlag = false;
        this.isPlayed = false;
        this.isDuration = false;
        this.reconnectTime = 0;
        // $(document.getElementById("all_replay_content_mv")).removeClass("all_replay_content_show");
        // $(document.getElementById("all_replay_content_mv")).addClass("all_replay_content_display");
        // document.getElementById('export-table').style.display = 'none'
        // document.getElementById('exportShowLabel').style.display = 'none'
        // document.getElementById('hideShow').style.display = 'none'
        // document.getElementById('closeReplayL').style.display = 'block'
        // document.getElementById('closeReplayR').style.display = 'none'
        // document.getElementById('squared_ul_mv').style.borderRadius = '0px 25px 10px 10px'
        clearInterval(this.loadTime);
        this.isPlayColsed = true;
        this.html5Player.src = "";
        this.progress_value = 0;
        this.progress_max = 1;
        this.speedValue = 1;
        this.speedValueStr = '1';
        this.stopPlay();
        this.initScreen();
        this.loadTime = null;
        this.enterPlayer = false;
        this.videos.error = "";
        this.$emit('replayVisibleEvent', false);
      },
      initScreen: function () {
        $('.squared_ul11 li').removeClass('current');
      },
      stopPlay: function () {
        this.$emit('stopCallback', this.videos.camera_id);
        this.videos.camera_ip = "";
        this.videos.camera_id = "";
        this.videos.rtspAddress = "";
        this.videos.played = false;
        this.videos.error = "";
        this.camera_ip = "";
        this.camera_id = "";
        this.rtspAddress = "";
        var playname = "player_0";
        this.isPlayed = false;
        if (this.playBox[playname] != null) {
          this.isLockReconnected = false;
          this.playBox[playname].destroy(this.isLockReconnected);
          this.playBox[playname] = null;
        }
      },
      handleRePlay: function (row) {
        console.log(row);
        console.log(row.filePath);
        ++this.menuData;
        var _this = this;
        var cameraID = row.camera_id;
        var storeId = row.storeId;
        var isLocal = row.isLocal;
        this.fileStartTime = getUnixTime(row.starttime);
        this.fileEndTime = getUnixTime(row.endtime);
        var forward = row.forward;
        this.fileName = row.filePath;
        this.endTime = row.endtime;
        this.startTime = row.starttime;
        this.fileSize = row.size;
        this.storeServerId = row.service_id;
        this.recordType = row.type;
        this.recordPosition = row.forward;

        
        var rtspUrl = row.rtspUrl;
        _this.videos.rtspAddress = rtspUrl;
        _this.rtspAddress = rtspUrl;
        _this.camera_id = cameraID;
        
        _this.videoServerUrl = Global_Config.ws
        _this.initvideo();
        _this.configAndPlayVideo();

        return 
        if (cameraID.indexOf("@") == -1) {
          console.log("handleRePlay", "/api/scms/iv/cmsproxy/rtsp/historicalVideoUrl?cameraId=" + cameraID + "&startTime=" + this.fileStartTime + "&endTime=" + this.fileEndTime + "&forward=" + forward+ "&isWsUsed=" + this.isWsUsed);
          Axios.get("/api/scms/iv/cmsproxy/rtsp/historicalVideoUrl?cameraId=" + cameraID + "&startTime=" + this.fileStartTime + "&endTime=" + this.fileEndTime + "&forward=" + forward + "&isWsUsed=" + this.isWsUsed)
            .then(res => {
              if (res.data.code === 200) {
                var rtspUrl = res.data.data.rtspUrl;
                _this.videos.rtspAddress = rtspUrl;
                _this.rtspAddress = rtspUrl;
                _this.camera_id = cameraID;
                _this.videoServerIp = res.data.data.ip;
                _this.videoWebsocketPort = res.data.data.websocketPort;
                _this.videoServerUrl = "ws:" + _this.videoServerIp + ":" + _this.videoWebsocketPort + "/ws"
                _this.initvideo();
                _this.configAndPlayVideo();
                //_this.getVideoServerUrl();
              } else {
                _this.$message({
                  type: "error",
                  message: res.data.message
                });
              }
            })
            .catch(err => {
              console.info(err);
            });
        } else {
          console.log("handleRePlay", "/api/scms/iv/cmsproxy/rtsp/historicalVideoUrl?cameraId=" + cameraID + "&startTime=" + this.fileStartTime + "&endTime=" + this.fileEndTime + "&forward=" + forward + "&storeId=" + storeId + "&isLocal=" + isLocal+ "&isWsUsed=" + this.isWsUsed);
          Axios.get("/api/scms/iv/cmsproxy/rtsp/historicalVideoUrl?cameraId=" + cameraID + "&startTime=" + this.fileStartTime + "&endTime=" + this.fileEndTime + "&forward=" + forward + "&storeId=" + storeId + "&isLocal=" + isLocal + "&isWsUsed=" + this.isWsUsed)
            .then(res => {
              if (res.data.code === 200) {
                var rtspUrl = res.data.data.rtspUrl;
                _this.videos.rtspAddress = rtspUrl;
                _this.rtspAddress = rtspUrl;
                _this.camera_id = cameraID;
                _this.videoServerIp = res.data.data.ip;
                _this.videoWebsocketPort = res.data.data.websocketPort;
                _this.videoServerUrl = "ws:" + _this.videoServerIp + ":" + _this.videoWebsocketPort + "/ws"
                _this.initvideo();
                _this.configAndPlayVideo();
                //_this.getVideoServerUrl();
              } else {
                _this.$message({
                  type: "error",
                  message: res.data.message
                });
              }
            })
            .catch(err => {
              console.info(err);
            });
         }
      },
      currentPrecent(val) {
        console.log(val);
        var self = this;
        this.progress_value = val;
       // setTimeout(function () {
        var playname = "player_0";
        if (this.playBox[playname] != null) {
          this.playBox[playname].isSeeking();
        }
          this.html5Player.currentTime = val;
          console.log(this.html5Player);
          //测试提bug：快进后倍数重置
        //   if (this.html5Player.playbackRate != 1) {
        //     this.html5Player.playbackRate = 1;
        //   }
        this.html5Player.pause();
        setTimeout(() => {
          this.html5Player.play();
        },1000)
       //}, 1000);
      },
      currentInput(val) {
      },
      recordpause: function () {
        this.isPlayColsed = false;
        this.isPlayed = false;
        var playname = "player_0";
        if (this.playBox[playname] != null) {
          this.playBox[playname].isNotSeeking();
        }
        this.html5Player.pause();
        this.videos.error = this.$t('public.paused');
      },

      recordplay: function () {
        if (this.isPlayColsed) {
          if (this.selectFilesDatas.length > 1) {
            for (var i = 0; i < this.selectFilesDatas.length; i++) {
              if (this.curVideoFile.filePath == this.selectFilesDatas[i].filePath) {
                this.selectFilesDatas[i].curPlaying = true
              } else {
                this.selectFilesDatas[i].curPlaying = false
              }
            }
          }
          this.handleRePlay(this.curVideoFile);
        } else {
          this.html5Player.play();
          this.isPlayColsed = false;
          this.isPlayed = true;
        }
      },
      setPlayState: function (state) {
        if (state == 0) {
          $('#recordplay').removeClass('el-icon-pause');
          $('#recordplay').addClass('el-icon-play');
          this.isPlay = false;
          this.playSpeed = 1;
        } else if (state == 1) {
          $('#recordplay').removeClass('el-icon-play');
          $('#recordplay').addClass('el-icon-pause');
          this.isPlay = true;
          this.playSpeed = 1;
        } else if (state == -1) {
          $('#recordplay').removeClass('el-icon-pause');
          $('#recordplay').addClass('el-icon-play');
          this.isPlay = false;
          this.playSpeed = 1;
        } else if (state == 3) {
        } else if (state == 4) {
        }
        this.playState = state;
      },
      // checkFull() {
      //   var isFull = !!(document.webkitIsFullScreen || document.fullscreenElement ||
      //     document.webkitFullscreenElement ||
      //     document.msFullscreenElement ||
      //     document.mozFullScreenElement ||
      //     null);
      //   return isFull;
      // },
      replayAllScreen: function () {
        if (checkFull()) {
          this.replayExitScreen();
          this.initScreenDivStatus();
        } else {
          this.fullScreenDivStatus();
          this.replayEnterScreen();
        }
      },
      fullScreenDivStatus: function () {
        $(document.getElementById("basic-operation-div-mv")).removeClass("basic-operation-div-nomal");
        $(document.getElementById("quarter_div1_mv")).removeClass("quarter_div_nomal");
        $(document.getElementById("basic-operation-div-mv")).addClass("basic-operation-div-full");
        $(document.getElementById("quarter_div1_mv")).addClass("quarter_div_full");
        $(document.getElementById("operation-enter-mv")).removeClass("operation-enter-nomal");
        $(document.getElementById("operation-enter-mv")).addClass("operation-enter-diss");
        $(".el-icon-progress")
          .css("transform", "scale(" + 1 + "," + 1 + ")")
          .css("margin-left", 15)
          .css("margin-right", 15);
      },
      initScreenDivStatus: function () {
        $(document.getElementById("basic-operation-div-mv")).removeClass("basic-operation-div-full");
        $(document.getElementById("quarter_div1_mv")).removeClass("quarter_div_full");
        $(document.getElementById("basic-operation-div-mv")).addClass("basic-operation-div-nomal");
        $(document.getElementById("quarter_div1_mv")).addClass("quarter_div_nomal");
        $(document.getElementById("operation-enter-mv")).removeClass("operation-enter-diss");
        $(document.getElementById("operation-enter-mv")).addClass("operation-enter-nomal");
        // this.contW = 1920;
        // this.cliWidth = document.documentElement.clientWidth || document.body.clientWidth;
        // let w = this.contW / this.cliWidth;
        // this.screW = window.screen.width;
        // if (this.screW < 1920) {
        //   $(".el-icon-progress")
        //     .css("transform", "scale(" + w + "," + 1 + ")")
        //     .css("margin-left", w * 4 * 15)
        //     .css("margin-right", w * 4 * 15);
        // }
        this.initResizeMap();
      },
      initResizeMap () {
        let contW = 1920;
        let contH = 1080;
        let cliWidth =
          document.documentElement.clientWidth || document.body.clientWidth;
        let cliHeight =
          document.documentElement.clientHeight || document.body.clientHeight;
        let w = cliWidth / contW;
        let h = cliHeight / contH;
        this.resize({ w: w, h: h });
        // this.$root.eventBus.$on("resize", oo => {
        //   this.resize(oo);
        // });
      },
      resize: function (oo) {
        let w = oo.w;
        let h = oo.h;
        if (w < 0.99) {
          $(".el-icon-progress").css("transform", "scale(" + 1 / w + "," + 1 / h + ")")
                                 // .css("margin-left", (w * 35) + "%")
                                 // .css("margin-top", (w * 10) + "%")
                                 // .css("width", (w * 95) + "%")
                                 // .css("height", (h * 100) + "%")
                                .css("margin-left", (1 / w) * 4.3 * 15)
                                .css("margin-right", (1 / w) * 4.3 * 15)
                                .css("margin-top", 2);
        } else {
          $(".el-icon-progress")
            .css("transform", "scale(" + 1 / w + "," + 1 / h + ")")
            .css("transformOrigin", "top left");
        }
      },
      replayEnterScreen: function () {
        var el = document.querySelector('.squared_ul11');
        if (el.requestFullscreen) {
          el.requestFullscreen();
        } else if (el.mozRequestFullScreen) {
          el.mozRequestFullScreen();
        } else if (el.webkitRequestFullscreen) {
          el.webkitRequestFullscreen();
        } else if (el.msRequestFullscreen) {
          el.msRequestFullscreen();
        }
      },
      replayExitScreen: function () {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      },
      screenshots: function () {
        if (this.videos.played && !this.isPlayColsed) {
          let date = new Date();
          let datestr = moment(date).format("YYYYMMDDHHmmss");
          let picname = "screenshot_" + datestr + ".png";
          this.savePic(picname);
        }
      },
      screenrecodes: function () {
        if (this.videos.played && !this.isPlayColsed) {
          var date = new Date();
          var datestr = moment(date).format("YYYYMMDDHHmmss");
           this.recodename = "screenrecode_" + datestr + ".mp4";
          this.saveRecord();
        }
      },
      recording: function () {
        this.isVideoRecording = !this.isVideoRecording;
        if (this.isVideoRecording == true) {
          if (this.videos.played && !this.isPlayColsed) {
            this.recordStr = this.$t('videoReplay.stoprecording');
            this.isRecordingUp = true;
            var date = new Date();
            var datestr = moment(date).format("YYYYMMDDHHmmss");
            this.recodename = "screenrecode_" + datestr + ".mp4";
            this.saveRecord();
          }
        } else {
          this.recordStr = this.$t('videoReplay.recording');
          this.isRecordingUp = false;
          this.stopRecord();
        }
      },
      savePic(fileName) {
        var fileType = "png"; // 如果文件名中没有带后缀，默认使用png
        var videoname = "video_0";
        var video = document.getElementById(videoname);
        var canvas = window.canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        //canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height); // 图片大小和视频分辨率一致
        //
        var ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height); // 图片大小和视频分辨率一致
        ctx.rotate(-20 * Math.PI / 180) // 逆时针旋转π/9
        ctx.font = '30px Vedana' // 设置字体
        ctx.fillStyle = 'rgba(200, 200, 200, 0.50)' // 设置字体的颜色
        ctx.textAlign = 'left' // 文本对齐方式
        ctx.textBaseline = 'Middle' // 文本基线
        //ctx.fillText("视频测试 lily", 0, 4 * canvas.height / 5) // 绘制文字
        //水印密度
        for (let i = 0; i < canvas.height / 240; i++) {
          for (let j = 0; j < canvas.width / 100; j++) {
            ctx.fillText('力维视频 ' + localStorage.getItem('userName')+ localStorage.getItem('ipdz'), i * 400, j * 200, canvas.width)
          }
        }
        //
        var strDataURL = canvas.toDataURL("image/" + fileType); // canvas中video中取一帧图片并转成dataURL
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
        a.style.display = 'none';
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 1000);
      },
      saveRecord() {
        var fileType = "MP4"; // 如果文件名中没有带后缀，默认使用png
        var video = this.html5Player;
        var stream = video.captureStream(); // build a 15 fps stream
        this.recorder = new MediaRecorder(stream, {mimeType: 'video/webm;codecs=h264'});
        this.recorder.addEventListener('dataavailable', this.finishCapturing);
        this.recorder.start();
      },
      stopRecord() {
        this.recorder.stop();
      },
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
      },
      decimalsToFractional(decimals) {
        switch (decimals) {
          case 0.5:
            return '1/2';
          case 0.25:
            return '1/4';
          case 0.125:
            return '1/8';
          case 1:
            return '1';
          case 2:
            return '2';
          case 4:
            return '4';
          case 8:
            return '8';
          case 16:
            return '16'
        }
      }
    },
    created: function () {
      this.globalScmsVideoStatus = globalScmsVideoStatus
      // let that = this
      // window.onresize = function () {
      //   if (checkFull()) {
      //     that.fullScreenDivStatus();
      //   } else {
      //     that.initScreenDivStatus();
      //   }
      // }
    },
    destroyed: function () {
      this.closeReplay();
    }
  }
</script>

<style lang="scss" scoped>
  /*@import url("//unpkg.com/element-ui@2.12.0/lib/theme-chalk/index.css");*/
  .video_replay_div {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 999;
  }
  .all_replay_content_display {
    width: 95%;
    margin-top: 10%;
    margin-left: 35%;
  }
  .all_replay_content_show {
    width: 95%;
    margin-top: 12%;
    margin-left: 5%;
  }
  .squared_ul11 {
    float:left;
    width: 42%;
    height: 510px;
    background-color: #3c3f4e;
    border-radius: 0px 25px 10px 10px;
    position:relative;
  }
  .squared_ul12 {
    float:left;
    width: 33%;
    height: 35%;
    background-color: #3c3f4e;
  }
  .close_replay_div_left {
    background: url("./icons/public/close.png");
    width: 35px;
    height: 35px;
    position: absolute;
    cursor: pointer;
    margin-left: 75%;
  }

  .close_replay_div_right {
    background: url("./icons/public/close.png");
    width: 36px;
    height: 34px;
    position: absolute;
    cursor: pointer;
    margin-left: 91.5%;
  }
  .header_replay_div {
    width: 100%;
    float: left;
    .squ_replay_div {
      background: url("./icons/public/squ.png");
      width: 293px;
      height: 36px;
      .squ_replay_text {
        color: #FFFFFF;
        font-size: 16px;
        /*width: 105px;*/
        position: relative;
        left: 10px;
        top: 8px;
      }
    }
  }

  .ul_handle1 {
       width: 100%;
       height: 5%;
       background-color: #3c3f4e;
       font-size: 24px;
       font-family: MicrosoftYaHei;
       font-weight: 400;
       letter-spacing: 3px;
       color: #000;
     }
  .ul_handle2 {
    width: 100%;
    height: 5%;
    background-color: #3c3f4e;
    font-size: 24px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    letter-spacing: 3px;
    color: #000;
  }
  .quarter_div_nomal {
    margin-left: 12px;
    margin-top: 20px;
    margin-bottom: 13px;
    width: 95%;
    height: 86%;
    background: #9e9fa7;
  }
  .quarter_div_full {
    width: 100%;
    height: 100%;
    background: #9e9fa7;
  }

  .errorStatus {
    color: #ffffff;
    width: 100%;
    height: 40px;
    bottom: 40px;
    position: relative;
    line-height: 40px;
    padding-left: 20px;
    font-size: 14px;
    font-family: MicrosoftYaHei;
    background: rgba(0, 0, 0, 0.2);
  }

  /*.errorStatus:hover {*/
  /*  color: #ffffff;*/
  /*  font-family: MicrosoftYaHei;*/
  /*  font-size: 14px;*/
  /*  overflow: hidden;*/
  /*  white-space: nowrap;*/
  /*  text-overflow: ellipsis;*/
  /*  background: rgba(0, 0, 0, 0.2);*/
  /*}*/

  .current {
    border: 1px solid #249BFF;
  }
  .add-data {
    margin-left: 15px;
    margin-top: 15px;
    font-size: 18px;
  }
  .specialColor{
    color:red;
  }
  .add-table-div {
    margin-left: -1px;
    width: 55%;
    float: left;
    color:black;
    font-size: 16px;
    background: #3c3f4e;
    height: 510px;
    border-radius: 0px 25px 0px 0px;

  }
  .table-div {
    margin-top: 5%;
    width: 90%;
    /deep/ .el-table__body tr:hover>td{
      background-color: #3c3f4e!important;
    }

    /deep/ .el-table__body tr.current-row>td{
      background-color: #3c3f4e!important;
    }
    /deep/ .el-table__body tr.hover-row>td{
      background-color: #3c3f4e!important;
    }
  }
  .basic-operation-div-nomal {
    // float: left;
     width: 100%;
     bottom:2px;
     left: 5px;
     position:absolute;
    // height: 100%;
    // margin-left: 31%;
     display: flex;
  }
  .operation-enter-nomal {
    height: 100%;
    width: 100%;
    margin-left: 5px;
    display: flex;
  }
  .operation-enter-nomal-grand {
    height: 72%;
    width: 100%;
    display: flex;
    background:rgba(0,0,0,0.2);
  }
  .operation-enter-diss {
    height: 100%;
    width: 100%;
    display: flex;
    display: none;
  }
  .basic-operation-div-full {
    // float: left;
    width: 100%;
    height: 70px;
    bottom:8px;
    position:absolute;
    // height: 100%;
    // margin-left: 31%;
    /*display: flex;*/
    /*margin-top: 15px;*/
    /*width: 100%;*/
    /*height: 100%;*/
    /*position: relative;*/
    // height: 100%;
    // margin-left: 31%;
    display: flex;
  }
  .video-file-table-style1 {
    width: 95%;
    margin-top: -5.5%;
    background: #3c3f4e;
    /deep/ .el-table {
      width: 50%;
      background: #3c3f4e;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(105, 107, 117, 1);//字体颜色
      /*.el-table__header {*/
      /*  border-color: #3c3f4e;*/
      /*  border-top: 0px solid #BBBBBB;*/
      /*  border-bottom: 1px solid #BBBBBB;*/
      /*}*/
    }
    /deep/ .el-table th {
      //
      background: #3c3f4e;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: white;//字体颜色
    }
    /deep/ .el-table tr {
      line-height: 40px;
      font-size: 16px;
      border-collapse: collapse;
      color: white;
      width: 57px;
      height: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      background: #3c3f4e;
    }
    /deep/ .el-table__body tr:hover>td{
           background-color: #3c3f4e!important;
         }

    /deep/ .el-table__body tr.current-row>td{
      background-color: #3c3f4e!important;
    }
    // 滚动条的宽度
    .el-table__body-wrapper::-webkit-scrollbar {
      width: 3px; // 横向滚动条
      height: 3px; // 纵向滚动条 必写
    }
    .el-table__body-wrapper::-webkit-scrollbar-thumb {
      background-color: #9e9fa7;
      border-radius: 3px;
    }
    .el-table__fixed-right-patch {
      position: absolute;
      top: 0px;
      right: 0;
      background-color: #3c3f4e;
      }
      .el-table__body tr:hover>td{
        background-color: #3c3f4e!important;
      }
      .el-table__body tr.hover-row>td{
        background-color: #3c3f4e!important;
      }
      .el-input__inner{
        background-color: #3c3f4e;
        color: white;
      }
      .el-pagination  {
        margin-top: 8px;
        padding-right: 10px;
        float: right;
        font-size: 16px;
        .el-pagination__total {
          color: white;
        }
        .el-pagination__jump {
          color: white;
        }
        /*.btn-prev {*/
      /*  background-color: #3c3f4e;*/
      /*}*/
      /*.btn-next {*/
      /*  background-color: #3c3f4e;*/
      /*}*/
      /*.el-pager {*/
      /*    background: #3c3f4e;*/
      /*}*/
      /*.el-icon {*/
      /*  .el-icon-arrow-left {*/
      /*    color: white;*/
      /*  }*/
      /*}*/
    }

    .el-pagination span:not([class*=suffix]) {
      font-size: 12px;
    }
    .el-pagination__sizes .el-input .el-input__inner {
      font-size: 12px;
    }
  }

  .icon-font {
    color: #fff;
    font-size: 24px !important;
    margin-left: 16px;
  }

  .icon-font:hover {
    color: #48A5F6
  }
  .el-icon-slow {
    margin-right: 10px;
    float: right;
    width: 40px;
    height: 40px;
    background: url("./icons/public/player-fastbak.png") center no-repeat;
  }
  .el-icon-quick {
    margin-right: 10px;
    float: right;
    width: 40px;
    height: 40px;
    background: url("./icons/public/player-fastfwd.png") center no-repeat;
  }
  .export-show {
    margin-top: 12%;
    margin-left: -10px;
    float: left;
    width: 25px;
    height: 20px;
    background: url("./icons/public/export-show.png") center no-repeat;
    z-index: 9999;
    position:relative;
  }

  .export-hide {
    margin-top: 12%;
    margin-left: -10px;
    float: left;
    width: 25px;
    height: 20px;
    z-index: 9999;
    background: url("./icons/public/export-hide.png") center no-repeat;
    position:relative;
  }
     .export-hide-playlist {
       margin-top: 15%;
       margin-left: -20px;
       float: left;
       width: 25px;
       height: 20px;
       background: url("./icons/public/export-hide.png") center no-repeat;
     }
  .el-speed-title {
    font-weight:lighter;
    font-size: 14px;
    color: #ffffff;
    margin-right: 0px;
    float: right;
    margin-top: 14px;
    width: 150px;
  }
  .el-icon-stop1 {
    margin-left: 5px;
    float: left;
    width: 50px;
    height: 40px;
    background: url("./icons/public/stop_normal.png") center no-repeat;
  }
  .el-icon-progress {
    /*margin-top: 2px;*/
    margin-left: 15px;
    margin-right: 15px;
    width: 80%;
  }
  .el-icon-play {
    margin-left: 5px;
    float: left;
    width: 50px;
    height: 40px;
    background: url("./icons/public/play_normal.png") center no-repeat;
  }
  .el-icon-pause {
    margin-left: 5px;
    width: 50px;
    height: 40px;
    background: url("./icons/public/pause_normal.png") center no-repeat;
  }

  .all-screen {
    margin-top: 10%;
    margin-left: 20px;
    float: left;
    width: 20px;
    height: 20px;
    background: url("./icons/video/all_screen.png") center no-repeat;

    &:hover {
      background: url("./icons/video/all_screen_active.png") center no-repeat;
    }
  }

  .out-all-screen {
    margin-top: 10%;
    margin-left: 20px;
    float: left;
    width: 20px;
    height: 20px;
    background: url("./icons/video/out_all_screen.png") center no-repeat;

    &:hover {
      background: url("./icons/video/out_all_screen_active.png") center no-repeat;
    }
  }
  .recordplay{
    background-image: url("./icons/public/play_normal.png");
  }
  .recordpause{
    background-image: url("./icons/public/pause_normal.png");
  }
  #recordstop{
    background-image: url("./icons/public/stop_normal.png");
  }
  .el-icon-stop {
    margin-top: 10%;
    margin-left: 20px;
    float: left;
    width: 20px;
    height: 20px;
    background: url("./icons/video/stop_all.png") center no-repeat;
  }

  .el-icon-stop:hover {
    background: url("./icons/video/stop_all_down.png") center no-repeat;
  }

  video::-webkit-media-controls,
  video::-moz-media-controls,
  video::-webkit-media-controls-enclosure {
    display: none !important;
  }

  video::-webkit-media-controls-panel,
  video::-webkit-media-controls-panel-container,
  video::-webkit-media-controls-start-playback-button {
    display: none !important;
    -webkit-appearance: none;
  }



</style>
<style lang="less" scoped>
#exportShowLabel{
  display: none !important;
}
.video_replay_div{
  position: relative; background: transparent
}
.squared_ul11{
  width: 86%;
}
.all_replay_content_display{
  margin: 0 0 0 8%;
}
</style>

