<template>
  <div class="vedio_tree">
    <div class="tree-filter">
      <el-input id="search"
                clearable
                type="text"
                v-model="filterText"
                :placeholder="$t('videoBrowsing.srgjzjxss')">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
      <i class="el-icon-refresh-right" @click="refreshTree" style="margin-top:20px;margin-right:10px"></i>
    </div>
    <div class="line"></div>
    <!--    <el-scrollbar style="height:100%;width:100%;">-->
    <div class="tree-content"
         ref="treeContent"
         v-if="isShowTree">
      <el-scrollbar style="width: 100%; height: 100%" wrapClass="vedio_tree" :noresize="false" :native="false"
                    ref="scrollbar">
        <div>
          <el-tree style="width:100%; color:#606266; font-size:14px "
                   :data="roots"
                   node-key="deviceId"
                   ref="tree"
                   :default-expanded-keys="expandedKeys"
                   :render-after-expand="false"
                   @node-expand="nodeExpand"
                   @node-collapse="nodeCollapse"
                   :show-checkbox="isShow"
                   :default-checked-keys="defautCheckoutArry"
                   :filter-node-method="filterNode"
                   @check-change="handleCheckChange"
                   @node-click="handleNodeClick">
            <div slot-scope="{ node, data }"
                 @dblclick="nodeDblClick(data)"
                 style="width:100%">
              <div style="width:100%;display: flex;align-items: center;justify-content: space-between">
                   <span style="width:100%; position: relative;display: flex;align-items: center"
                         v-em-focus="{data, activeId}">
                  <img :src="getIcon(data)"
                       style="width: 20px; height: 20px;display: block" width="20" height="20"/>
                     <!--                     1： 离线； 2：为注册-->
                  <img v-if="data.state && (data.state.toString() === '1' || data.state.toString() === '2') "
                       src="./icons/vedioTree/mark_disabled.png"
                       style="position:absolute;left:10px;top: 8px;width:9px;height:8px"/>
                  <img v-if="data.state && data.state.toString() === '12' "
                       src="./icons/vedioTree/yi_ji.png"
                       style="position:absolute;left:10px;top: 8px"/>
                  <img v-if="data.state && data.state.toString() === '13' "
                       src="./icons/vedioTree/er_ji.png"
                       style="position:absolute;left:10px;top: 8px"/>
                  <img v-if="data.state && data.state.toString() === '14' "
                       src="./icons/vedioTree/san_ji.png"
                       style="position:absolute;left:10px;top: 8px"/>
                  <img v-if="data.state && data.state.toString() === '15' "
                       src="./icons/vedioTree/san_ji.png"
                       style="position:absolute;left:10px;top: 8px"/>&nbsp{{ node.label }}
                   <span v-if="data.type != 3 && data.type != 5">{{onlineStat(data)}}</span>
                </span>
                <!--                  <i class="el-icon-circle-check" style="margin-right: 10px; color: #249bff" v-if="pageType == 'prest' && data.isControlable == 1 "/>-->
              </div>
            </div>
          </el-tree>
        </div>
      </el-scrollbar>
    </div>

    <!--    </el-scrollbar>-->
    <div v-show="isShowLoading"
         style="margin-top:100px">
      <i class="el-icon-loading"
         style="font-size:30px;margin-left:130px;margin-bottom:20px"></i><br/>
      <span style="margin-left:80px;font-size:16px">{{$t('videoBrowsing.dataloading')}}</span>
    </div>
    <div class="videoback-wrapper"
         v-if="showCanlender">
      <div class="flex title select-wrap"
           style="justify-content: space-between;">
        <div class="mar-right">{{$t('videoBrowsing.fileaddress')}}</div>
        <el-select v-model="value"
                   :placeholder="$t('videoInspection.qxz')">
          <el-option v-for="item in options"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </div>
      <div class="data-time">
        <el-calendar :first-day-of-week="7"
                     v-model="valuedate">
          <template slot="dateCell"
                    slot-scope="{date, data}">
            <p :class="data.isSelected ? 'is-selected' : ''">
              {{ data.day.split('-').slice(2).join('-') }}
            </p>
          </template>
        </el-calendar>
      </div>
      <div class="btn">
        <el-button type="primary"
                   size="small"
                   @click="queryClick()">{{$t('passingInformation.cxx')}}
        </el-button>
      </div>
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  import Axios from "axios";
  import $ from "jquery"
  import {
    differ,
    getIconUrl,
    buildSelfTree,
    buildDomainTree,
    wideTraversal,
    calculateOnline
  } from "./belong/deviceTreeUtil";

  const debounce = (function () {
    let timer = 0
    return function (func, delay) {
      clearTimeout(timer)
      timer = setTimeout(func, delay)
    }
  })()
  export default {
    name: "newVideoTree",
    props: {
      'tab': Boolean,
      "isShowCanlender": Boolean,
      "pageType": String,
      'streamType': [String, Boolean, Number],
      'rtspAddress': [String, Object]
    },
    directives: {
      emFocus(el, {value: {data, activeId}}) {
        let $node = $(el).parents(".el-tree-node__content:first");
        if (!data || !activeId) {
          $node.removeClass("light");
          return;
        }
        let light = data.deviceId == activeId;
        if (light) {
          $node.css("background", "rgba(40,148,240,0.2)");
        } else {
          $node.css("background", "");
        }
      }
    },
    data() {
      return {
        // scrollTop: 0,
        refreshVisible: true,
        isType: this.pageType, // 判断是视频浏览还是预置位  'brows'：浏览  'tvWall'：电视墙  'prest'：预置位 'puconfig':pu参数配置
        value1: '',
        filterText: "",
        subDomainTreeData: [],
        actNodeData: {},
        value: 0,
        isWsUsed: true,
        options: [
          {value: 0, label: this.$t('videoBrowsing.storageServer')},
          {value: 1, label: this.$t('videoBrowsing.web')},
          // { value: 2, label: this.$t('videoBrowsing.all') },
          {value: 3, label: this.$t('videoBrowsing.ExtServer1')},
          {value: 4, label: this.$t('videoBrowsing.ExtServer2')},
          {value: 5, label: this.$t('videoBrowsing.mainDomain')}
        ],
        valuedate: new Date(),
        arr: [],
        isShowTree: true,
        isShowLoading: false,
        isLight: false,
        activeId: '',
        expandedKeys: [],
        streamTypeChange: '',
        defautCheckoutArry: [], // 被选中的设备
        // ziyutree: require("./ziyutree.json"),
        roots: [],
        preArray: [],
        count: 0,
        iCount: null,
        checkedChildren: [],
        iInitTimer: null,
        tick: 0
      };
    },
    mounted() {
      this.iInitTimer = setTimeout(this.initTree, 10);
    },
    beforeDestroy() {
      console.log("------white tree beforeDestroy");
      this.roots = [];
    },

    destroyed() {
      this.roots = [];
      console.log("white video destroyed====");
    },
    watch: {
      valuedate(date) {
        this.valuedate = date;
      },
      filterText(val) {
        debounce(() => { // 通过延时过滤的功能，在input输入字符后，可在设置的延时时间1000（1秒）后进行过滤
          this.$refs.tree.filter(val)
        }, 1000);
      }
    },
    computed: {
      isShow() {
        return this.tab
      },
      showCanlender() {
        return this.isShowCanlender
      }/*,
      defaultNode() {
        return this.$store.state.deaultExpandNode;
      }*/
    },
    methods: {
      initTree() {
        this.roots = this.$store.getters.getGlobalTree || [];
        if (this.roots.length == 0) {
          console.log('pre white got null tree---');
          this.refreshVisible = false;
          this.getRegionTree();
        }
        console.log("default check keys: " + JSON.stringify(this.defautCheckoutArry))
        clearTimeout(this.iInitTimer);
      },

      isShowType(val, data, type) {
        this.streamTypeChange = val
        if (type === 'alarmLinkage') {
          data.forEach(el => {
            this.nodeDblClick(el, type)
          })
        } else {
          this.nodeDblClick(data, type)
        }
      },

      updateScroll() {
        this.$nextTick(() => {
          this.$refs.scrollbar.update()
        });
      },

      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },

      // 获取区域树
      queryRegionTree() {
        this.getRegionTree();
      },

      refreshTree() {
        const _this = this;
        _this.refreshVisible = false;
        _this.getRegionTree();
      },

      handleCheckChange() {
        this.$emit('checkChange')
        let selectData = this.$refs.tree.getCheckedNodes()
        selectData = selectData.map(el => {
          let obj = {
            deviceId: el.deviceId,
            parentDeviceId: el.parentDeviceId,
            inport: el.inport,
            name: el.deviceName,
            subDomain: el.domain,
            downright: 1
          }
          return obj
        })
        selectData = selectData.filter(item => (item.name) !== undefined)
        this.defautCheckoutArry = selectData.map(el => el.deviceId)
        this.arr = selectData
      },
      queryClick() {
        let time = JSON.parse(JSON.stringify(this.valuedate))
        time = moment(time).format("YYYY-MM-DD")
        this.$emit('selectData', time, this.arr, this.value)
      },

      // 获取区域树，获取本域下所有的设备
      getRegionTree() {
        const _this = this;
        _this.roots = [];
        _this.count = 0;
        _this.tick = 0;
        const queryParam = {
          "domain": "", // 子域域名，查询本域时，可以不传
          "onSubDomain": false // 否查询子域
        };
        console.log("getRegionTree----");
        Axios.get("/proxyApi/device-service/devmgt/region", queryParam).then(res => {
          console.log("----getRegionTree res-----" + res.data.code);
          // console.log(JSON.stringify(res.data.data));
          if (res.data.code === 0) {
            this.roots = [];
            // 组建局站树结构
            this.roots = buildSelfTree(res.data.data.precincts);
            if (this.roots.length > 0) {
              this.roots[0].type = 0;
            }
            let domains = res.data.data.subDomians;
            console.log("domains: " + JSON.stringify(domains))
            domains = domains.map(v =>
              Object.assign({}, v, {
                children: [],
                label: v.name,
                deviceId: v.id,
                state: "-1",
                type: 2,
                loadFlag: false,
                isLeaf: false,
                onlineNum: 0,
                totalNum: 0
              })
            );
            this.roots = this.roots.concat(domains);
            // 树放入了区域结构和子域一级结构
            //this.$store.commit("updateGlobalTree", this.roots);

            // 获取本域下所有设备
            //this.getSelfTree();
          } else {
          }
        });
      },

      // 获取所有本域的区域设备
      getSelfTree() {
        this.preArray = [];
        console.log('xxxx', this.roots)
        // 遍历到所有的局站，分层遍历
        this.preArray = wideTraversal(this.roots[0]);
        console.log("preArray length:" + this.preArray.length);
        console.log(this.preArray);
        // this.timerRunnable(); // 50ms请求一次，防止网络拥塞
        this.iCount = setInterval(this.timerRunnable, 80);
      },

      // 获取单个区域设备，之后获取下一个区域的
      timerRunnable() {
        if (this.tick >= this.preArray.length) {
          return;
        }
        const queryParam = {
          "precientId": this.preArray[this.tick].precinctId, // 区域ID
          "needEncoder": false, // 默认为false,是否返回编码器列表
          "domain": '',
          "onSubDomain": false
        };
        const pre = this.preArray[this.tick];
        this.tick++;
        Axios.post("/api/scms/iv/cmsproxy/tree/regionDevices", queryParam).then(res => {
          if (res.data.code === 200) {
            let cameras = res.data.data.cameras;
            if (cameras.length > 0) {
              cameras = cameras.map(v => {
                return Object.assign({}, v, {
                  label: v.deviceName,
                  type: 3,
                  deviceId: v.deviceId,
                  precinctName: pre.precinctName,
                  isLeaf: true
                });
              });
              pre.children = pre.children.concat(cameras);
              pre.loadFlag = true;
            } else {
              // console.log("got pre" + queryParam.precientId + ", camNum: " + cameras.length)
            }
          }
          this.count++;
          // console.log("got num----------" + this.count);
          if (this.count >= this.preArray.length) { // 遍历完
            console.log("pre 1 timer canceled----------");
            // 在线率统计
            calculateOnline(this.roots[0]);
            this.refreshVisible = true;
            clearInterval(this.iCount);
            // this.$store.commit("commitValidateTree", !this.$store.getters.getValidateTree);
            // clearTimeout(this.iCount);
          }
          /*else {
                     clearTimeout(this.iCount);
                     this.iCount = setTimeout(this.timerRunnable, 50);
                   }*/
        });
      },

      // 获取区域下的摄像头并更新树结构
      getPrecinctDevices(data) {
        // 摄像头 直接返回
        if (data.type == 3 || data.type == 5) {
          return;
        }
        // console.log("get precinct type: " + node.type + ", deviceId:" + node.deviceId);
        let isDomain = data.type != 0 && data.type != 1;
        let domain = '';
        if (isDomain) {
          if (data.type == 2) {
            domain = data.domain;
          } else {
            domain = data.deviceId.substring(data.deviceId.lastIndexOf('@') + 1);
          }
          // console.log("get precinct domain: " + domain);
        }

        let queryParam = {
          "precientId": data.precinctId, // 区域ID
          "needEncoder": false, // 默认为false,是否返回编码器列表
          "domain": domain,
          "onSubDomain": isDomain
        };
        console.log("query--:" + JSON.stringify(queryParam))
        Axios.post("/api/scms/iv/cmsproxy/tree/regionDevices", queryParam).then(res => {
          if (res.data.code === 200) {
            console.log("cameras: ", res.data.data.cameras.length);
            let cameras = res.data.data.cameras;
            cameras = cameras.map(v => {
              return Object.assign({}, v, {
                label: v.deviceName,
                type: isDomain ? 5 : 3,
                deviceId: isDomain ? v.deviceId + '@' + domain : v.deviceId,
                precinctName: data.precinctName,
                isLeaf: true
              });
            });
            let oldOnes = data.children.filter(t => t.type == 3 || t.type == 5);
            if (differ(oldOnes, cameras)) {
              let preOnes = data.children.filter(t => t.type != 3 && t.type != 5);
              data.children = [];
              data.children = data.children.concat(preOnes).concat(cameras);

              this.restoreChecked();
              console.log("update precinct " + data.label);
            } else {
              // this.$refs.tree.updateKeyChildren(node.deviceId, node.children);
              console.log("no need to update precinct " + data.label);
            }
            // 重新计算统计数据
            // this.roots = this.$store.getters.getGlobalTree;
            if (isDomain) {
              // 找到对应的节点，统计在线率
              for (let i = 0; i < this.roots.length; i++) {
                if (domain == this.roots[i].domain) {
                  calculateOnline(this.roots[i]);
                  break;
                }
              }
            } else {
              console.log("expand roots[0] calcl");
              console.log(this.roots[0]);
              calculateOnline(this.roots[0]);
            }
          }
        });
      },

      // 获取子域根节点下的局站结构
      getDomainTree(domainId, domainName) {
        // 防止丢失
        let domain = {};
        console.log("get domain precinct:" + domainName);
        let index = 1;
        for (let i = 1; i < this.roots.length; i++) {
          if (this.roots[i].domain == domainName) {
            domain = this.roots[i];
            console.log("replace sub domain---" + domainName);
          }
        }
        const queryParam = {
          "domain": domainName, // 子域域名，查询本域时，可以不传
          "onSubDomain": true // 否查询子域
        };
        Axios.get("/proxyApi/device-service/devmgt/region", queryParam).then(res => {
            console.log("----getDomainRegion:" + domainName + " res-----" + res.data.code);
            console.log(JSON.stringify(res.data.data));
            if (res.data.code === 200) {
              // console.log("get domain: " + domain.domain + " suc");
              let precincts = res.data.data.precincts;
              let tree = buildDomainTree(domainName, precincts);
             /* if (tree.length == 1) { // 单个节点则取子节点
                domain.children = tree[0].children;
                domain.deviceId = domainId;
                domain.precinctId = tree[0].precinctId;
              } else*/ if (tree.length > 0) { // 多个节点则都取出来
                domain.children = tree;
                domain.deviceId = domainId;
                domain.precinctId = domainId; // 多个节点则根节点没数据随意填写
              } else { // 没有树
                return;
              }
              domain.totalNum = 0;
              domain.onlineNum = 0;
              domain.type = 2;
              console.log("++++print domain " + JSON.stringify(domain));
              console.log("+++ get ID:" + domain.precinctId);
            } else {

            }
          }
        );
      },
      // 双击树节点
      nodeDblClick(data, type) {
        var _this = this;
        // 电视墙管理双击时
        if (_this.isType === 'tvWall') {
          this.$emit("getTreeData", data)
          return
        }
        if (_this.isType === 'puConfig') {
          this.$emit("getNodeInfo", data);
          return
        }
        if (data.deviceKind == "4") { // 摄像头节点
          var cameraID = data.deviceId;
          /*let domainName = '';
          if (data.type == 5) { // 子域摄像头
            cameraID = data.deviceId.subString(0, data.deviceId.lastIndexOf('@'));
            domainName = data.deviceId.substring(data.deviceId.lastIndexOf('@') + 1);
          }*/
          let url;
          if (this.streamTypeChange == '' || this.streamTypeChange == undefined) {
            this.streamTypeChange = 0
          }
          if (type == '' || type == undefined) {
            this.streamTypeChange = 0
          }
          // if (data.type == 3) { // 本域摄像头
          url = "/api/scms/iv/cmsproxy/rtsp/realTimeStreamUrl?cameraId=" + cameraID + "&streamType=" + this.streamTypeChange + "&isWsUsed=" + this.isWsUsed
          // } else { // 子域摄像头
          //   url = "/api/scms/iv/cmsproxy/rtsp/realTimeStreamUrl?cameraId=" + cameraID + "@" + domainName + "&streamType=" + this.streamTypeChange + "&isWsUsed=" + this.isWsUsed
          // }
          console.log("double click query stream url : " + url)
          if (_this.isType !== 'prest') {
            let videoArr = this.$parent.$parent.$parent.$refs.videoChlid.videos;
            let flag = videoArr.findIndex(el => el.camera_id == cameraID)
            console.log(flag + ':flag')
            if (flag > -1) return false;
          }
          Axios.get(url)
            .then(res => {
              if (res.data.code === 200) {
                var rtspUrl = res.data.data.rtspUrl;
                console.log("rtspUrl : " + rtspUrl)
                // var videoPanel = _this.$parent.$parent.$parent.$refs.videoChlid;
                // videoPanel.videoServerUrl = "ws:" + res.data.data.ip + ":" + res.data.data.websocketPort + "/ws"
                if (_this.isType === 'prest') {
                  var videoPanelPrest = _this.$parent.$parent.$parent.$refs.preliminaryVideo;
                  videoPanelPrest.videoServerUrl = "ws:" + res.data.data.ip + ":" + res.data.data.websocketPort + "/ws"
                  let obj = {
                    'rtspAddress': rtspUrl,
                    'camera_id': cameraID
                  }
                  this.$emit("getVideoUrl", obj, data);
                } else {
                  var videoPanel = _this.$parent.$parent.$parent.$refs.videoChlid;
                  videoPanel.videoServerUrl = "ws:" + res.data.data.ip + ":" + res.data.data.websocketPort + "/ws"
                  videoPanel.rtspAddress = rtspUrl;
                  videoPanel.camera_id = cameraID;
                  videoPanel.alarmLinkageType = type;
                  videoPanel.inspecType = 'browsing';
                  this.$emit("getTreeData", data)
                  console.log('lily test 双击摄像头 得到数据 getTreeData: ', data)
                  _this.$parent.$parent.$parent.$refs.videoChlid.gettreedata(data, this.streamTypeChange)
                }
              } else {
                console.log("rtsp url error---" + res.data.code)
                let errMessage = _this.getErrEnOrZh(localStorage.lang, res.data.code, null);
                _this.$message({
                  type: "error",
                  message: errMessage
                });
              }
            })
            .catch(err => {
              let errMessage = _this.getErrEnOrZh(localStorage.lang, err.response.data.code, null);
              _this.$message({
                type: "error",
                showClose: true,
                message: errMessage
              });
            });
        }
      },

      /**
       * 高亮当前播放视频的设备树
       * @param data
       */
      setActiveItemNode(data) {
        this.activeId = data.camera_id
      },

      nodeExpand(data) {
        // 获取已选中的摄像头
        if (this.isShow) {
          this.checkedChildren = [];
          data.children.forEach(child => {
            if (child.type == 3 || child.type == 5) {
              let item = this.$refs.tree.getNode(child.deviceId);
              if (item.checked) {
                this.checkedChildren.push(child.deviceId)
              }
            }
          });
        }
        this.expandedKeys.push(data.deviceId)
        this.getPrecinctDevices(data);
      },
      restoreChecked() {
        // 将选中摄像头状态还原
        if (this.isShow) {
          this.$nextTick(() => {
            this.checkedChildren.forEach(id => {
              this.$refs.tree.setChecked(id, true, true)
            });
          });
        }
      },
      nodeCollapse(data) {
        this.expandedKeys.splice(this.expandedKeys.indexOf(data.deviceId), 1); // 收起时删除数组里对应选项
      },

      handleNodeClick(data) {
        const _this = this;
        this.actNodeData = data;
        console.log("---node click:" + data.deviceId + ", label: " + data.label + ", type: " + data.type + ", deviceKind: " + data.deviceKind);
        this.$emit("transferNodeDataAll", data);
        if (data.type == 2) {
          _this.getDomainTree(data.deviceId, data.domain);
        } else if (data.type == 0 || data.type == 1 || data.type == 4) { // 更新局站设备
          _this.nodeExpand(data);
        } else {
          _this.$emit("transferNodeData", this.actNodeData);
          _this.$emit("positionEquipment", data); // 有经纬度信息
        }
      },

      getIcon(data) {
        return getIconUrl(data, false);
      },

      onlineStat(data) {
        return "(" + data.onlineNum + "/" + data.totalNum + ")";
      }
    }
  }
  ;
</script>
<style lang="scss">
  .vedio_tree /deep/ .el-input__inner {
    margin: 20px 0 0 10px;
    padding-left: 24px;
    width: 95%;
    line-height: 32px;
    height: 32px;
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(213, 218, 230, 1);
    border-radius: 4px;
    color: #333;
    /*background: rgba(227, 227, 227, 0.5);*/
    outline: none;
    &::-webkit-input-placeholder {
      /* WebKit browsers */
      color: rgba(193, 194, 201, 1);
    }
    &:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: rgba(193, 194, 201, 1);
    }
    &::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: rgba(193, 194, 201, 1);
    }
    &:-ms-input-placeholder {
      /* Internet Explorer 10+ */
      color: rgba(193, 194, 201, 1);
    }
  }

  .vedio_tree /deep/ .el-icon-circle-close::before {
    position: absolute;
    top: 15px;
    left: -20px;
    font-size: 16px !important;
    color: #9e9e9e !important;
  }

  .vedio_tree /deep/ .el-input__prefix {
    left: 10px;
    top: 12px;
  }

  .vedio_tree /deep/ .el-input__suffix {
    right: 0;
    top: 2px;
  }
</style>
<style lang="scss" scoped>
  .vedio_tree {
    width: 100%;
    // height: 100%;
    background-color: #fff;
    // border-top: 1px solid #42475a;

    .tree-filter {
      width: 100%;
      display: flex;
      align-items: center;
    }
    .line {
      height: 1px;
      background: #fff;
      margin-bottom: 20px;
    }
    .tree-content {
      width: 300px;
      height: 90%;
      overflow: auto;
    }
    /deep/ .el-tree-node {
      width: 100%;
    }
    /deep/ .el-tree-node__content {
      font-size: 14px;
      height: 32px;
      &:hover {
        background: rgba(237, 242, 245, 1);
      }
    }
    /deep/ .el-tree-node:focus > .el-tree-node__content {
      background: rgba(237, 242, 245, 1);
    }
    /deep/ .el-tree {
      .el-tree-node.is-current > .el-tree-node__content {
        //background-color:#DEE1E6 !important;
        background: rgba(237, 242, 245, 1) !important;
      }
    }

  }

  .videoback-wrapper {
    padding: 10px;
    color: #4f5777;
    font-size: 20px;
    background: #fff;
    margin-top: -6px;
    .title {
      margin-bottom: 10px;
      font-size: 14px;
    }
    .flex {
      display: flex;
      align-items: center;
    }
    .mar-right {
      display: inline-block;
      white-space: nowrap;
    }
    .select-wrap {
      /deep/ .el-input--suffix {
        .el-input__inner {
          padding: 0 10px;
          margin-top: 0;
          height: 26px;
          line-height: 26px;
          color: #92959e;
          /*background-color: #92959e;*/
          border-color: #c3c3c3;
          font-size: 14px;
          width: 170px;
        }
        .el-input__icon {
          line-height: 26px;
        }
      }
    }
    .data-time {
      margin-bottom: 10px;
      width: 100%;
      .el-calendar {
        background-color: rgba(277, 277, 277, 0.5);
      }
      .is-selected {
        color: #fff;
      }
      /deep/ .el-calendar-table td.is-selected {
        background-color: #1989fa
      }
      /deep/ .el-calendar__body {
        padding: 0;
        thead {
          border-left: 1px solid #ebeef5;
          border-right: 1px solid #ebeef5;
        }
      }
      /deep/ .el-calendar__header {
        border-right: 1px solid #ebeef5;
        padding: 10px 0;
        border-left: 1px solid #ebeef5;
        border-top: 1px solid #ebeef5;
      }
      /deep/ .el-calendar__title {
        font-size: 12px;
        color: #606266;
      }
      /deep/ .el-button--mini,
      .el-button--mini.is-round {
        padding: 6px;
      }
      /deep/ .el-calendar-table .el-calendar-day {
        height: 30px;
        font-size: 12px;
        text-align: center;
      }
      /deep/ .el-calendar-table thead th {
        font-size: 12px;
        padding: 8px 0;
      }
      /deep/ .el-calendar-table .el-calendar-day:hover {
        background-color: rgba(277, 277, 277, 0.5);
      }
    }
  }
</style>
