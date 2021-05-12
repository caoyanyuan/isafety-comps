<template>
  <div class="videoDiv" :id="parentId" :class="`videoDiv-${firstVideoId()}`">
    <ul class="squared_ul" :id="containerID" ref="videopanel">
      <li :id="`quarter-div-mv-0-${containerID}`"
          v-bind:class="[isActive == 1 ? 'quarter-div-mv': '',isActive == 4 ? 'quarter-div-mv4': '',isActive == 6 ? 'quarter-div-mv6-1': '',isActive == 9 ? 'quarter-div-mv9': '',isActive == 16 ? 'quarter-div-mv16': '']"
          v-on:dblclick="playAllScreen()">
        <!--        <canvas id="playCanvas" style="width: 100%;height: 100%"></canvas>-->
        <!--        <video id="video_0" autoplay style="width: 0.001%;height: 0.001%">-->
        <!-- <source :src="videos['0']['rtspAddress']" type="application/x-rtsp"> -->
        <div v-if="replayVideos[0]['short_replay_visible']"
             v-bind:class="[isActive == 1 ? 'quarter-div-mv-replay': '',isActive == 4 ? 'quarter-div-mv4-replay': '',isActive == 6 ? 'quarter-div-mv6-1-replay': '',isActive == 9 ? 'quarter-div-mv9-replay': '',isActive == 16 ? 'quarter-div-mv16-replay': '']"
        >
          <video :id="firstVideoId('replay')" autoplay >
          </video>
          <div class="errorReplayStatus">{{replayVideos[0]["error"]}}</div>
        </div>

        <video :id="firstVideoId()" autoplay>
        </video>
        <div class="errorStatus" v-if="videos[0]['errorShow']">{{videos[0]["error"]}}</div>
        <div class="basic-operation-inner-div" v-if="showInnerCtrl"
             @mouseover="enterOperation()" @mouseleave="leaveOperation()">
          <div v-if="!replayVideos[0]['isActive']"
               id="operation_inner_enter_mv_0" class="operation_inner_enter_diss">
            <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon"
               :title="$t('videoReplay.stop')"
               v-if="!patrolTreeVisible"
               v-on:click="stopSeletedScreen(false,-1)"/>
            <i id="camera_0" class="iconfont icon-font iconpaizhao icon-inner-dereticon"
               :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
            <i v-if="!isRecording[0]" id="screenrecordsave_0"
               class="iconfont icon-inner-dereticon iconluxiang1 icon-font" :title="recordStr"
               v-on:click="recording()"/>
            <img v-else src="./icons/video/luping.gif" id="screenrecordsave_0" class="icon-inner-dereticon"
                 style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()"/>
            <i class="iconfont icon-font icon-inner-dereticon iconzhumaliu" :title="$t('videoReplay.mainScreen')"
               @click="mainStreameHandel(0)" v-if="streamKind == 0"></i>
            <i class="iconfont icon-font icon-inner-dereticon iconzimaliu" :title="$t('videoReplay.childScream')"
               @click="mainStreameHandel(1)" v-else></i>
          </div>
          <div v-else
               id="operation_inner_enter_mv_0" class="operation_inner_enter_diss">
            <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon-left"
               :title="$t('videoReplay.stop')"
               v-if="!patrolTreeVisible"
               v-on:click="stopSeletedScreen(false,-1)"/>
            <i id="camera_0" class="iconfont icon-font iconpaizhao icon-inner-dereticon-left"
               :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
            <i v-if="!isRecording[0]" id="screenrecordsave_0"
               class="iconfont icon-inner-dereticon-left iconluxiang1 icon-font" :title="recordStr"
               v-on:click="recording()"/>
            <img v-else src="./icons/video/luping.gif" id="screenrecordsave_0" class="icon-inner-dereticon"
                 style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()"/>
            <i class="iconfont icon-font icon-inner-dereticon-left iconzhumaliu" :title="$t('videoReplay.mainScreen')"
               @click="mainStreameHandel(0)" v-if="streamKind == 0"></i>
            <i class="iconfont icon-font icon-inner-dereticon-left iconzimaliu" :title="$t('videoReplay.childScream')"
               @click="mainStreameHandel(1)" v-else></i>
          </div>
        </div>
      </li>
      <template v-if="showType!='single'">
        <li v-show="isActive != 1"
            v-bind:class="[isActive == 4 ? 'quarter-div-mv4': '',isActive == 6 ? 'quarter-div-mv9': '',isActive == 9 ? 'quarter-div-mv9': '',isActive == 16 ? 'quarter-div-mv16': '']"
            v-on:dblclick="playAllScreen()">
          <!--<video id="video_1" controls disablePictureInPicture controlsList='nodownload noremote footbar' autoplay>-->
          <div v-if="replayVideos[1]['short_replay_visible']"
            v-bind:class="[isActive == 4 ? 'quarter-div-mv4-replay': '',isActive == 6 ? 'quarter-div-mv9-replay': '',isActive == 9 ? 'quarter-div-mv9-replay': '',isActive == 16 ? 'quarter-div-mv16-replay': '']"
          >
            <video id="video_1_replay" autoplay>
            </video>
            <div class="errorReplayStatus">{{replayVideos[1]["error"]}}</div>
          </div>
          <video id="video_1" autoplay>
          </video>
          <div class="errorStatus" v-if="videos[1]['errorShow']">{{videos[1]["error"]}}</div>
          <div class="basic-operation-inner-div" v-if="showInnerCtrl"
              @mouseover="enterOperation()" @mouseleave="leaveOperation()">
            <div v-if="!replayVideos[1]['isActive']"
                id="operation_inner_enter_mv_1" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_1" class="iconfont icon-font iconpaizhao icon-inner-dereticon"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_1"
                class="iconfont icon-inner-dereticon iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_1" class="icon-inner-dereticon"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"></i>
              <i class="iconfont icon-font icon-inner-dereticon iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else></i>
            </div>
            <div v-else
                id="operation_inner_enter_mv_1" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon-left" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_1" class="iconfont icon-font iconpaizhao icon-inner-dereticon-left"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_1"
                class="iconfont icon-inner-dereticon-left iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_1" class="icon-inner-dereticon-left"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon-left iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"></i>
              <i class="iconfont icon-font icon-inner-dereticon-left iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else></i>
            </div>
          </div>
        </li>
        <li v-show="isActive != 1"
            v-bind:class="[isActive == 4 ? 'quarter-div-mv4': '',isActive == 6 ? 'quarter-div-mv9': '',isActive == 9 ? 'quarter-div-mv9': '',isActive == 16 ? 'quarter-div-mv16': '']"
            v-on:dblclick="playAllScreen()">
          <div v-if="replayVideos[2]['short_replay_visible']"
            v-bind:class="[isActive == 4 ? 'quarter-div-mv4-replay': '',isActive == 6 ? 'quarter-div-mv9-replay': '',isActive == 9 ? 'quarter-div-mv9-replay': '',isActive == 16 ? 'quarter-div-mv16-replay': '']"
          >
            <video id="video_2_replay" autoplay>
            </video>
            <div class="errorReplayStatus">{{replayVideos[2]["error"]}}</div>
          </div>
          <video id="video_2" autoplay>
          </video>
          <div class="errorStatus" v-if="videos[2]['errorShow']">{{videos[2]["error"]}}</div>
          <div class="basic-operation-inner-div" v-if="showInnerCtrl"
              @mouseover="enterOperation()" @mouseleave="leaveOperation()">
            <div v-if="!replayVideos[2]['isActive']" id="operation_inner_enter_mv_2" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_2" class="iconfont icon-font iconpaizhao icon-inner-dereticon"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_2"
                class="iconfont icon-inner-dereticon iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_2" class="icon-inner-dereticon"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"></i>
              <i class="iconfont icon-font icon-inner-dereticon iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else></i>
            </div>
            <div v-else id="operation_inner_enter_mv_2" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon-left" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_2" class="iconfont icon-font iconpaizhao icon-inner-dereticon-left"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_2"
                class="iconfont icon-inner-dereticon-left iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_2" class="icon-inner-dereticon-left"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon-left iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"></i>
              <i class="iconfont icon-font icon-inner-dereticon-left iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else></i>
            </div>
          </div>
        </li>
        <li v-show="isActive != 1"
            v-bind:class="[isActive == 4 ? 'quarter-div-mv4': '',isActive == 6 ? 'quarter-div-mv9': '',isActive == 9 ? 'quarter-div-mv9': '',isActive == 16 ? 'quarter-div-mv16': '']"
            v-on:dblclick="playAllScreen()">
          <div v-if="replayVideos[3]['short_replay_visible']"
            v-bind:class="[isActive == 4 ? 'quarter-div-mv4-replay': '',isActive == 6 ? 'quarter-div-mv9-replay': '',isActive == 9 ? 'quarter-div-mv9-replay': '',isActive == 16 ? 'quarter-div-mv16-replay': '']"
          >
            <video id="video_3_replay" autoplay>
            </video>
            <div class="errorReplayStatus">{{replayVideos[3]["error"]}}</div>
          </div>
          <video id="video_3" autoplay>
          </video>
          <div class="errorStatus" v-if="videos[3]['errorShow']">{{videos[3]["error"]}}</div>
          <div class="basic-operation-inner-div" v-if="showInnerCtrl"
              @mouseover="enterOperation()" @mouseleave="leaveOperation()">
            <div v-if="!replayVideos[3]['isActive']" id="operation_inner_enter_mv_3" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_3" class="iconfont icon-font iconpaizhao icon-inner-dereticon"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_3"
                class="iconfont icon-inner-dereticon iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_3" class="icon-inner-dereticon"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"></i>
              <i class="iconfont icon-font icon-inner-dereticon iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else></i>
            </div>
            <div v-else id="operation_inner_enter_mv_3" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon-left" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_3" class="iconfont icon-font iconpaizhao icon-inner-dereticon-left"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_3"
                class="iconfont icon-inner-dereticon-left iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_3" class="icon-inner-dereticon-left"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon-left iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"></i>
              <i class="iconfont icon-font icon-inner-dereticon-left iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else></i>
            </div>
          </div>
        </li>
        <li v-show="isActive == 6 || isActive == 9 || isActive == 16"
            v-bind:class="[isActive == 6 ? 'quarter-div-mv9': '',isActive == 9 ? 'quarter-div-mv9': '',isActive == 16 ? 'quarter-div-mv16': '']"
            v-on:dblclick="playAllScreen()">
          <div v-if="replayVideos[4]['short_replay_visible']"
            v-bind:class="[isActive == 6 ? 'quarter-div-mv9-replay': '',isActive == 9 ? 'quarter-div-mv9-replay': '',isActive == 16 ? 'quarter-div-mv16-replay': '']"
          >
            <video id="video_4_replay" autoplay>
            </video>
            <div class="errorReplayStatus">{{replayVideos[4]["error"]}}</div>
          </div>
          <video id="video_4" autoplay>
          </video>
          <div class="errorStatus" v-if="videos[4]['errorShow']">{{videos[4]["error"]}}</div>
          <div class="basic-operation-inner-div" v-if="showInnerCtrl"
              @mouseover="enterOperation()" @mouseleave="leaveOperation()">
            <div v-if="!replayVideos[4]['isActive']" id="operation_inner_enter_mv_4" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_4" class="iconfont icon-font iconpaizhao icon-inner-dereticon"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_4"
                class="iconfont icon-inner-dereticon iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_4" class="icon-inner-dereticon"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"></i>
              <i class="iconfont icon-font icon-inner-dereticon iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else></i>
            </div>
            <div v-else id="operation_inner_enter_mv_4" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon-left" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_4" class="iconfont icon-font iconpaizhao icon-inner-dereticon-left"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_4"
                class="iconfont icon-inner-dereticon-left iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_4" class="icon-inner-dereticon-left"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon-left iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"></i>
              <i class="iconfont icon-font icon-inner-dereticon-left iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else></i>
            </div>
          </div>
        </li>
        <li v-show="isActive == 6 || isActive == 9 || isActive == 16"
            v-bind:class="[isActive == 6 ? 'quarter-div-mv9': '',isActive == 9 ? 'quarter-div-mv9': '',isActive == 16 ? 'quarter-div-mv16': '']"
            v-on:dblclick="playAllScreen()">
          <div v-if="replayVideos[5]['short_replay_visible']"
            v-bind:class="[isActive == 6 ? 'quarter-div-mv9-replay': '',isActive == 9 ? 'quarter-div-mv9-replay': '',isActive == 16 ? 'quarter-div-mv16-replay': '']"
          >
            <video id="video_5_replay" autoplay>
            </video>
            <div class="errorReplayStatus">{{replayVideos[5]["error"]}}</div>
          </div>
          <video id="video_5" autoplay>
          </video>
          <div class="errorStatus" v-if="videos[5]['errorShow']">{{videos[5]["error"]}}</div>
          <div class="basic-operation-inner-div" v-if="showInnerCtrl"
              @mouseover="enterOperation()" @mouseleave="leaveOperation()">
            <div v-if="!replayVideos[5]['isActive']" id="operation_inner_enter_mv_5" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_5" class="iconfont icon-font iconpaizhao icon-inner-dereticon"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_5"
                class="iconfont icon-inner-dereticon iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_5" class="icon-inner-dereticon"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"></i>
              <i class="iconfont icon-font icon-inner-dereticon iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else></i>
            </div>
            <div v-else id="operation_inner_enter_mv_5" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon-left" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_5" class="iconfont icon-font iconpaizhao icon-inner-dereticon-left"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_5"
                class="iconfont icon-inner-dereticon-left iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_5" class="icon-inner-dereticon-left"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon-left iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"></i>
              <i class="iconfont icon-font icon-inner-dereticon-left iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else></i>
            </div>
          </div>
        </li>
        <li v-show="isActive == 9|| isActive == 16"
            v-bind:class="[isActive == 9 ? 'quarter-div-mv9': '',isActive == 16 ? 'quarter-div-mv16': '']"
            v-on:dblclick="playAllScreen()">
          <div v-if="replayVideos[6]['short_replay_visible']"
            v-bind:class="[isActive == 9 ? 'quarter-div-mv9-replay': '',isActive == 16 ? 'quarter-div-mv16-replay': '']"
          >
            <video id="video_6_replay" autoplay>
            </video>
            <div class="errorReplayStatus">{{replayVideos[6]["error"]}}</div>
          </div>
          <video id="video_6" autoplay>
          </video>
          <div class="errorStatus" v-if="videos[6]['errorShow']">{{videos[6]["error"]}}</div>
          <div class="basic-operation-inner-div" v-if="showInnerCtrl"
              @mouseover="enterOperation()" @mouseleave="leaveOperation()">
            <div  v-if="!replayVideos[6]['isActive']" id="operation_inner_enter_mv_6" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_6" class="iconfont icon-font iconpaizhao icon-inner-dereticon"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_6"
                class="iconfont icon-inner-dereticon iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_6" class="icon-inner-dereticon"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"></i>
              <i class="iconfont icon-font icon-inner-dereticon iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else></i>
            </div>
            <div  v-else id="operation_inner_enter_mv_6" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon-left" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_6" class="iconfont icon-font iconpaizhao icon-inner-dereticon-left"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_6"
                class="iconfont icon-inner-dereticon-left iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_6" class="icon-inner-dereticon-left"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon-left iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"></i>
              <i class="iconfont icon-font icon-inner-dereticon-left iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else></i>
            </div>
          </div>
        </li>
        <li v-show="isActive == 9|| isActive == 16"
            v-bind:class="[isActive == 9 ? 'quarter-div-mv9': '',isActive == 16 ? 'quarter-div-mv16': '']"
            v-on:dblclick="playAllScreen()">
          <div v-if="replayVideos[7]['short_replay_visible']"
            v-bind:class="[isActive == 9 ? 'quarter-div-mv9-replay': '',isActive == 16 ? 'quarter-div-mv16-replay': '']"
          >
            <video id="video_7_replay" autoplay>
            </video>
            <div class="errorReplayStatus">{{replayVideos[7]["error"]}}</div>
          </div>
          <video id="video_7" autoplay>
          </video>
          <div class="errorStatus" v-if="videos[7]['errorShow']">{{videos[7]["error"]}}</div>
          <div class="basic-operation-inner-div" v-if="showInnerCtrl"
              @mouseover="enterOperation()" @mouseleave="leaveOperation()">
            <div v-if="!replayVideos[7]['isActive']" id="operation_inner_enter_mv_7" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_7" class="iconfont icon-font iconpaizhao icon-inner-dereticon"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_7"
                class="iconfont icon-inner-dereticon iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_7" class="icon-inner-dereticon"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"></i>
              <i class="iconfont icon-font icon-inner-dereticon iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else></i>
            </div>
            <div v-else id="operation_inner_enter_mv_7" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon-left" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_7" class="iconfont icon-font iconpaizhao icon-inner-dereticon-left"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_7"
                class="iconfont icon-inner-dereticon-left iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_7" class="icon-inner-dereticon-left"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon-left iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"></i>
              <i class="iconfont icon-font icon-inner-dereticon-left iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else></i>
            </div>
          </div>
        </li>
        <li v-show=" isActive == 9|| isActive == 16"
            v-bind:class="[isActive == 9 ? 'quarter-div-mv9': '',isActive == 16 ? 'quarter-div-mv16': '']"
            v-on:dblclick="playAllScreen()">
          <div v-if="replayVideos[8]['short_replay_visible']"
            v-bind:class="[isActive == 9 ? 'quarter-div-mv9-replay': '',isActive == 16 ? 'quarter-div-mv16-replay': '']"
          >
            <video id="video_8_replay" autoplay>
            </video>
            <div class="errorReplayStatus">{{replayVideos[8]["error"]}}</div>
          </div>
          <video id="video_8" autoplay>
          </video>
          <div class="errorStatus" v-if="videos[8]['errorShow']">{{videos[8]["error"]}}</div>
          <div class="basic-operation-inner-div" v-if="showInnerCtrl"
              @mouseover="enterOperation()" @mouseleave="leaveOperation()">
            <div v-if="!replayVideos[8]['isActive']" id="operation_inner_enter_mv_8" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_8" class="iconfont icon-font iconpaizhao icon-inner-dereticon"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_8"
                class="iconfont icon-inner-dereticon iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_8" class="icon-inner-dereticon"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"></i>
              <i class="iconfont icon-font icon-inner-dereticon iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else></i>
            </div>
            <div v-else id="operation_inner_enter_mv_8" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon-left" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_8" class="iconfont icon-font iconpaizhao icon-inner-dereticon-left"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_8"
                class="iconfont icon-inner-dereticon-left iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_8" class="icon-inner-dereticon-left"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon-left iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"></i>
              <i class="iconfont icon-font icon-inner-dereticon-left iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else></i>
            </div>
          </div>
        </li>
        <li v-show="isActive == 16" v-bind:class="[isActive == 16 ? 'quarter-div-mv16': '']"
            v-on:dblclick="playAllScreen()">
          <div v-if="replayVideos[9]['short_replay_visible']"
            v-bind:class="[isActive == 16 ? 'quarter-div-mv16-replay': '']"
          >
            <video id="video_9_replay" autoplay>
            </video>
            <div class="errorReplayStatus">{{replayVideos[9]["error"]}}</div>
          </div>
          <video id="video_9" autoplay>
          </video>
          <div class="errorStatus" v-if="videos[9]['errorShow']">{{videos[9]["error"]}}</div>
          <div class="basic-operation-inner-div" v-if="showInnerCtrl"
              @mouseover="enterOperation()" @mouseleave="leaveOperation()">
            <div v-if="!replayVideos[9]['isActive']" id="operation_inner_enter_mv_9" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_9" class="iconfont icon-font iconpaizhao icon-inner-dereticon"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_9"
                class="iconfont icon-inner-dereticon iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_9" class="icon-inner-dereticon"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"></i>
              <i class="iconfont icon-font icon-inner-dereticon iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else></i>
            </div>
            <div v-else id="operation_inner_enter_mv_9" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon-left" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_9" class="iconfont icon-font iconpaizhao icon-inner-dereticon-left"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_9"
                class="iconfont icon-inner-dereticon-left iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_9" class="icon-inner-dereticon-left"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon-left iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"></i>
              <i class="iconfont icon-font icon-inner-dereticon-left iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else></i>
            </div>
          </div>
        </li>
        <li v-show="isActive == 16" v-bind:class="[isActive == 16 ? 'quarter-div-mv16': '']"
            v-on:dblclick="playAllScreen()">
          <div v-if="replayVideos[10]['short_replay_visible']"
            v-bind:class="[isActive == 16 ? 'quarter-div-mv16-replay': '']"
          >
            <video id="video_10_replay" autoplay>
            </video>
            <div class="errorReplayStatus">{{replayVideos[10]["error"]}}</div>
          </div>
          <video id="video_10" autoplay>
          </video>
          <div class="errorStatus" v-if="videos[10]['errorShow']">{{videos[10]["error"]}}</div>
          <div class="basic-operation-inner-div" v-if="showInnerCtrl"
              @mouseover="enterOperation()" @mouseleave="leaveOperation()">
            <div v-if="!replayVideos[10]['isActive']" id="operation_inner_enter_mv_10" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_10" class="iconfont icon-font iconpaizhao icon-inner-dereticon"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_10"
                class="iconfont icon-inner-dereticon iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_10" class="icon-inner-dereticon"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"></i>
              <i class="iconfont icon-font icon-inner-dereticon iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else></i>
            </div>
            <div v-else id="operation_inner_enter_mv_10" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon-left" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_10" class="iconfont icon-font iconpaizhao icon-inner-dereticon-left"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_10"
                class="iconfont icon-inner-dereticon-left iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_10" class="icon-inner-dereticon-left"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon-left iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"></i>
              <i class="iconfont icon-font icon-inner-dereticon-left iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else></i>
            </div>
          </div>
        </li>
        <li v-show="isActive == 16" v-bind:class="[isActive == 16 ? 'quarter-div-mv16': '']"
            v-on:dblclick="playAllScreen()">
          <div v-if="replayVideos[11]['short_replay_visible']"
            v-bind:class="[isActive == 16 ? 'quarter-div-mv16-replay': '']"
          >
            <video id="video_11_replay" autoplay>
            </video>
            <div class="errorReplayStatus">{{replayVideos[11]["error"]}}</div>
          </div>
          <video id="video_11" autoplay>
          </video>
          <div class="errorStatus" v-if="videos[11]['errorShow']">{{videos[11]["error"]}}</div>
          <div class="basic-operation-inner-div" v-if="showInnerCtrl"
              @mouseover="enterOperation()" @mouseleave="leaveOperation()">
            <div v-if="!replayVideos[11]['isActive']" id="operation_inner_enter_mv_11" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_11" class="iconfont icon-font iconpaizhao icon-inner-dereticon"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_11"
                class="iconfont icon-inner-dereticon iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_11" class="icon-inner-dereticon"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"/>
              <i class="iconfont icon-font icon-inner-dereticon iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else/>
            </div>
            <div v-else id="operation_inner_enter_mv_11" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon-left" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_11" class="iconfont icon-font iconpaizhao icon-inner-dereticon-left"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_11"
                class="iconfont icon-inner-dereticon-left iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_11" class="icon-inner-dereticon-left"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon-left iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"/>
              <i class="iconfont icon-font icon-inner-dereticon-left iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else/>
            </div>
          </div>
        </li>
        <li v-show="isActive == 16" v-bind:class="[isActive == 16 ? 'quarter-div-mv16': '']"
            v-on:dblclick="playAllScreen()">
          <div v-if="replayVideos[12]['short_replay_visible']"
            v-bind:class="[isActive == 16 ? 'quarter-div-mv16-replay': '']"
          >
            <video id="video_12_replay" autoplay>
            </video>
            <div class="errorReplayStatus">{{replayVideos[12]["error"]}}</div>
          </div>
          <video id="video_12" autoplay>
          </video>
          <div class="errorStatus" v-if="videos[12]['errorShow']">{{videos[12]["error"]}}</div>
          <div class="basic-operation-inner-div" v-if="showInnerCtrl"
              @mouseover="enterOperation()" @mouseleave="leaveOperation()">
            <div v-if="!replayVideos[12]['isActive']" id="operation_inner_enter_mv_12" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_12" class="iconfont icon-font iconpaizhao icon-inner-dereticon"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_12"
                class="iconfont icon-inner-dereticon iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_12" class="icon-inner-dereticon"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"/>
              <i class="iconfont icon-font icon-inner-dereticon iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else/>
            </div>
            <div v-else id="operation_inner_enter_mv_12" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon-left" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_12" class="iconfont icon-font iconpaizhao icon-inner-dereticon-left"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_12"
                class="iconfont icon-inner-dereticon-left iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_12" class="icon-inner-dereticon-left"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon-left iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"/>
              <i class="iconfont icon-font icon-inner-dereticon-left iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else/>
            </div>
          </div>
        </li>
        <li v-show="isActive == 16" v-bind:class="[isActive == 16 ? 'quarter-div-mv16': '']"
            v-on:dblclick="playAllScreen()">
          <div v-if="replayVideos[13]['short_replay_visible']"
            v-bind:class="[isActive == 16 ? 'quarter-div-mv16-replay': '']"
          >
            <video id="video_13_replay" autoplay>
            </video>
            <div class="errorReplayStatus">{{replayVideos[13]["error"]}}</div>
          </div>
          <video id="video_13" autoplay>
          </video>
          <div class="errorStatus" v-if="videos[13]['errorShow']">{{videos[13]["error"]}}</div>
          <div class="basic-operation-inner-div" v-if="showInnerCtrl"
              @mouseover="enterOperation()" @mouseleave="leaveOperation()">
            <div v-if="!replayVideos[13]['isActive']" id="operation_inner_enter_mv_13" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_13" class="iconfont icon-font iconpaizhao icon-inner-dereticon"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_13"
                class="iconfont icon-inner-dereticon iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_13" class="icon-inner-dereticon"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"></i>
              <i class="iconfont icon-font icon-inner-dereticon iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else></i>
            </div>
            <div v-else id="operation_inner_enter_mv_13" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon-left" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_13" class="iconfont icon-font iconpaizhao icon-inner-dereticon-left"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_13"
                class="iconfont icon-inner-dereticon-left iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_13" class="icon-inner-dereticon-left"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon-left iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"></i>
              <i class="iconfont icon-font icon-inner-dereticon-left iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else></i>
            </div>
          </div>
        </li>
        <li v-show="isActive == 16" v-bind:class="[isActive == 16 ? 'quarter-div-mv16': '']"
            v-on:dblclick="playAllScreen()">
          <div v-if="replayVideos[14]['short_replay_visible']"
            v-bind:class="[isActive == 16 ? 'quarter-div-mv16-replay': '']"
          >
            <video id="video_14_replay" autoplay>
            </video>
            <div class="errorReplayStatus">{{replayVideos[14]["error"]}}</div>
          </div>
          <video id="video_14" autoplay>
          </video>
          <div class="errorStatus" v-if="videos[14]['errorShow']">{{videos[14]["error"]}}</div>
          <div class="basic-operation-inner-div" v-if="showInnerCtrl"
              @mouseover="enterOperation()" @mouseleave="leaveOperation()">
            <div v-if="!replayVideos[14]['isActive']" id="operation_inner_enter_mv_14" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_14" class="iconfont icon-font iconpaizhao icon-inner-dereticon"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_14"
                class="iconfont icon-inner-dereticon iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_14" class="icon-inner-dereticon"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"></i>
              <i class="iconfont icon-font icon-inner-dereticon iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else></i>
            </div>
            <div v-else id="operation_inner_enter_mv_14" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon-left" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_14" class="iconfont icon-font iconpaizhao icon-inner-dereticon-left"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_14"
                class="iconfont icon-inner-dereticon-left iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_14" class="icon-inner-dereticon-left"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon-left iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"></i>
              <i class="iconfont icon-font icon-inner-dereticon-left iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else></i>
            </div>
          </div>
        </li>
        <li v-show="isActive == 16" v-bind:class="[isActive == 16 ? 'quarter-div-mv16': '']"
            v-on:dblclick="playAllScreen()">
          <div v-if="replayVideos[15]['short_replay_visible']"
            v-bind:class="[isActive == 16 ? 'quarter-div-mv16-replay': '']"
          >
            <video id="video_15_replay" autoplay>
            </video>
            <div class="errorReplayStatus">{{replayVideos[15]["error"]}}</div>
          </div>
          <video id="video_15" autoplay>
          </video>
          <div class="errorStatus" v-if="videos[15]['errorShow']">{{videos[15]["error"]}}</div>
          <div class="basic-operation-inner-div" v-if="showInnerCtrl"
              @mouseover="enterOperation()" @mouseleave="leaveOperation()">
            <div v-if="!replayVideos[15]['isActive']" id="operation_inner_enter_mv_15" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_15" class="iconfont icon-font iconpaizhao icon-inner-dereticon"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_15"
                class="iconfont icon-inner-dereticon iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_15" class="icon-inner-dereticon"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"></i>
              <i class="iconfont icon-font icon-inner-dereticon iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else></i>
            </div>
            <div v-else id="operation_inner_enter_mv_15" class="operation_inner_enter_diss">
              <i class="iconfont icon-font iconvideo_stop icon-inner-dereticon-left" :title="$t('videoReplay.stop')"
                v-if="!patrolTreeVisible"
                v-on:click="stopSeletedScreen(false,-1)"/>
              <i id="camera_15" class="iconfont icon-font iconpaizhao icon-inner-dereticon-left"
                :title="$t('videoReplay.screenshot')" v-on:click="screenshots()"/>
              <i v-if="!isRecording[0]" id="screenrecordsave_15"
                class="iconfont icon-inner-dereticon-left iconluxiang1 icon-font" :title="recordStr"
                v-on:click="recording()"/>
              <img v-else src="./icons/video/luping.gif" id="screenrecordsave_15" class="icon-inner-dereticon-left"
                  style="width: 18px;height: 18px;margin-top: 2px;" :title="recordStr" v-on:click="recording()">
              <i class="iconfont icon-font icon-inner-dereticon-left iconzhumaliu" :title="$t('videoReplay.mainScreen')"
                @click="mainStreameHandel(0)" v-if="streamKind == 0"></i>
              <i class="iconfont icon-font icon-inner-dereticon-left iconzimaliu" :title="$t('videoReplay.childScream')"
                @click="mainStreameHandel(1)" v-else></i>
            </div>
          </div>
          >
        </li>
      </template>
    </ul>
    <div class="basic-operation-div-play-nomal" id="basic-operation-div-play-nomal-mv"
         @mouseover="enterAllOperation()" @mouseleave="leaveAllOperation()">
      <div class="ul_handle" id="ul_handle_id">
        <div class="video-list-play" :class="[(parentId=='first' || parentId=='second')?'showPlay':'hidePlay']">
          <el-button-group>
            <el-button size="small" icon="el-icon-arrow-left" @click="previousCameras" :disabled="turnPageBtnDisabled">{{$t('home.syy')}}</el-button>
            <el-button size="small" :class="[turnPagePlayStatus ? 'el-icon-video-pause' : 'el-icon-video-play']" @click="playOrPause('')" :disabled="playBtnDisabled"></el-button>
            <el-button size="small" @click="nextCameras" :disabled="turnPageBtnDisabled">{{$t('home.xyy')}}<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          </el-button-group>
          <el-checkbox v-model="autoTurnPage" style="margin-left: 10px;margin-right: 10px;">{{$t('home.zdfy')}}</el-checkbox>
          <el-checkbox v-model="timingCaptured"  @change="timingCapturedHandel">{{$t('home.sdzp')}}</el-checkbox>
        </div>
        <div :class="(allScreenFlag? 'multi-screen-video-div-full':'multi-screen-video-div')">
          <div :class="'el-icon-1-normal'+ (isActive==1?' one-active':'')" :title="$t('bayonetMonitoring.1huamian')"
               v-on:click="changeScreen(1)"></div>
          <div :class="'el-icon-4-normal'+ (isActive==4?' four-active':'')" :title="$t('bayonetMonitoring.4huamian')"
               v-on:click="changeScreen(4)"></div>
          <div :class="'el-icon-6-normal'+ (isActive==6?' six-active':'')" :title="$t('bayonetMonitoring.6huamian')"
               v-on:click="changeScreen(6)"></div>
          <div :class="'el-icon-9-normal'+ (isActive==9?' nine-active':'')" :title="$t('bayonetMonitoring.9huamian')"
               v-on:click="changeScreen(9)"></div>
          <div :class="'el-icon-16-normal'+ (isActive==16?' sixteen-active':'')"
               :title="$t('bayonetMonitoring.16huamian')"
               v-on:click="changeScreen(16)"></div>
        </div>
        <div class="basic-operation-div">
          <div :class="{'enable-voc':enableVoc,'uenable-voc':!enableVoc}" :title="ctrlVol" v-show="audioSwitchValue"
               @click="ctrlMute()"></div>
          <i id="screenrecordsave"
             v-if="!isRecordingUp"
             class='iconfont iconluxiang1 icon-font'
             style="font-size: 22px;
                    margin-left: 20px;"
             :title="recordStr" v-on:click="recording()"/>
          <img v-else id="screenrecordsave"
               src="./icons/video/luping.gif" style="width: 18px;height: 18px;" :title="recordStr"
               v-on:click="recording()">
          <i class="iconfont icon-font iconzhumaliu" :title="$t('videoReplay.mainScream')" @click="mainStreameHandel(0)"
             v-if="streamKind == 0"/>
          <i class="iconfont icon-font iconzimaliu" :title="$t('videoReplay.childScream')" @click="mainStreameHandel(1)"
             v-else/>
<!--          <i class="iconfont icon-font iconluyin" id="audio_0" :title="talkingStr" v-on:click="startTalking()"/>-->
          <i class="iconfont icon-font iconpaizhao" id="camera" :title="$t('videoReplay.screenshot')"
             v-on:click="screenshots()"/>
          <div :class="{'short-replay':!short_replay_visible,'out-short-replay':short_replay_visible}" :title="shortReplayTitle"
               @click="shortReplay"></div>
          <i class="iconfont icon-font iconvideo_stop" :title="$t('videoReplay.stop')" v-if="!patrolTreeVisible"
             v-on:click="stopSeletedScreen(false,-1)"/>
          <i class="iconfont icon-font iconquanping1" :title="$t('videoReplay.allstop')" v-if="!patrolTreeVisible"
             v-on:click="stopAllScreen()"/>
          <div :class="{'all-screen-video':!allScreenFlag,'out-all-screen-video':allScreenFlag}" :title="screenTitle"
               @click="allScreen"></div>

        </div>
      </div>
    </div>

  </div>
</template>


<script>
  import Axios from "axios";
  import Watermark from "./belong/watermark.js";
  import moment from 'moment';
  import whilst from "async-es/whilst"
  import {timeStampToFormatDate, checkFull, findAllNodeFormTree, getUnixTime} from "./belong/utility";
  import $ from 'jquery'
  import globalScmsVideoStatus from "./belong/scmsVideoStatus"

  import Single from "./mixins/single"

  export default {
    inheritAttrs: false,
    name: "Video",
    props: [
      'camera_ip',
      'is_play_patrol',
      'patrolTreeVisible',
      'parentId',
      "treeNodeData",
      'needReplaced'
    ],
    mixins: [ Single ],
    data() {
      return {
        streamKind: 1, // 主码流子码流区别
        isActive: '1',
        videoServerUrl: "",
        ctrlVol: this.$t('videoReplay.openVoice'),
        enableVoc: false,
        isVideoRecording: false,
        audioPlay: false,
        recordStr: this.$t('videoReplay.recording'),
        talkingStr: this.$t('videoReplay.voiceTall'),
        talkingStrTil: "",
        videos: [
          {
          "rtspAddress": "",
          "played": false,
          "camera_ip": "",
          "camera_id": "",
          "error": "",
          "errorShow": true,
          'time': '',
          'currentTime': '',
          'reconnectTime': 0,
          'isActive': false,
          loadTime: null,
          isLockReconnected: true,
          photoNum: '',
          photoTime: '',
          caputerPhotoArr: [],
          ptzControl: 0,
          enableVoc: false,
          talkingSupport: false
        },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            isLockReconnected: true,
            photoNum: '',
            photoTime: '',
            caputerPhotoArr: [],
            ptzControl: 0,
            enableVoc: false,
            talkingSupport: false
          },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            isLockReconnected: true,
            photoNum: '',
            photoTime: '',
            caputerPhotoArr: [],
            ptzControl: 0,
            enableVoc: false,
            talkingSupport: false
          },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            isLockReconnected: true,
            photoNum: '',
            photoTime: '',
            caputerPhotoArr: [],
            ptzControl: 0,
            enableVoc: false,
            talkingSupport: false
          },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            isLockReconnected: true,
            photoNum: '',
            photoTime: '',
            ptzControl: 0,
            enableVoc: false,
            talkingSupport: false,
            caputerPhotoArr: []
          },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            isLockReconnected: true,
            photoNum: '',
            photoTime: '',
            caputerPhotoArr: [],
            ptzControl: 0,
            enableVoc: false,
            talkingSupport: false
          },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            isLockReconnected: true,
            photoNum: '',
            photoTime: '',
            caputerPhotoArr: [],
            ptzControl: 0,
            enableVoc: false,
            talkingSupport: false
          },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            isLockReconnected: true,
            photoNum: '',
            photoTime: '',
            caputerPhotoArr: [],
            ptzControl: 0,
            enableVoc: false,
            talkingSupport: false
          },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            isLockReconnected: true,
            photoNum: '',
            photoTime: '',
            caputerPhotoArr: [],
            ptzControl: 0,
            enableVoc: false,
            talkingSupport: false
          },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            isLockReconnected: true,
            photoNum: '',
            photoTime: '',
            caputerPhotoArr: [],
            ptzControl: 0,
            enableVoc: false,
            talkingSupport: false
          },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            isLockReconnected: true,
            photoNum: '',
            photoTime: '',
            caputerPhotoArr: [],
            ptzControl: 0,
            enableVoc: false,
            talkingSupport: false
          },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            isLockReconnected: true,
            photoNum: '',
            photoTime: '',
            caputerPhotoArr: [],
            ptzControl: 0,
            enableVoc: false,
            talkingSupport: false
          },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            isLockReconnected: true,
            photoNum: '',
            photoTime: '',
            caputerPhotoArr: [],
            ptzControl: 0,
            enableVoc: false,
            talkingSupport: false
          },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            isLockReconnected: true,
            photoNum: '',
            photoTime: '',
            caputerPhotoArr: [],
            ptzControl: 0,
            enableVoc: false,
            talkingSupport: false
          },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            isLockReconnected: true,
            photoNum: '',
            photoTime: '',
            caputerPhotoArr: [],
            ptzControl: 0,
            enableVoc: false,
            talkingSupport: false
          },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            isLockReconnected: true,
            photoNum: '',
            photoTime: '',
            caputerPhotoArr: [],
            ptzControl: 0,
            enableVoc: false,
            talkingSupport: false
          }
        ],
        replayVideos: [
          {
          "rtspAddress": "",
          "played": false,
          "camera_ip": "",
          "camera_id": "",
          "error": "",
          "errorShow": true,
          'time': '',
          'currentTime': '',
          'reconnectTime': 0,
          'isActive': false,
          loadTime: null,
          isLockReconnected: true,
          short_replay_visible: false
        },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            short_replay_visible: false,
            isLockReconnected: true
          },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            short_replay_visible: false,
            isLockReconnected: true
          },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            short_replay_visible: false,
            isLockReconnected: true
          },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            short_replay_visible: false,
            isLockReconnected: true
          },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            short_replay_visible: false,
            isLockReconnected: true
          },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            short_replay_visible: false,
            isLockReconnected: true
          },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            short_replay_visible: false,
            isLockReconnected: true
          },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            short_replay_visible: false,
            isLockReconnected: true
          },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            short_replay_visible: false,
            isLockReconnected: true
          },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            short_replay_visible: false,
            isLockReconnected: true
          },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            short_replay_visible: false,
            isLockReconnected: true
          },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            short_replay_visible: false,
            isLockReconnected: true
          },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            short_replay_visible: false,
            isLockReconnected: true
          },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            short_replay_visible: false,
            isLockReconnected: true
          },
          {
            "rtspAddress": "",
            "played": false,
            "camera_ip": "",
            "camera_id": "",
            "error": "",
            "errorShow": true,
            'time': '',
            'currentTime': '',
            'reconnectTime': 0,
            'isActive': false,
            loadTime: null,
            short_replay_visible: false,
            isLockReconnected: true
          }
        ],
        isRecording: [],
        isRecordingUp: false,
        videoArr: ["1", "4", "6", "9", "16"],
        playNum: 0, // 播放了几个设备
        playBox: {},
        playerOptions: {},
        selectedIndex: -1, // 哪个屏幕被选中
        talkingIndex: -1,
        recordSelectedIndex: -1,
        stremSelectedIndex: -1, // 主码流子码流每个窗口播放区别
        cameraNum: 0, // 巡检播放至第几个摄像头
        nosLength: 0, // 播放窗体列表长度
        cameraLength: 0, // 摄像头列表长度
        interval: "", // 定时器
        cameras: [], // 摄像头数组
        nosIndexList: [], // 窗体列表
        playingNode: {}, // 正在播放巡检项
        allScreenFlag: false,  //多窗口全屏，标志
        screenTitle: this.$t('videoReplay.AllScreen'),
        shortReplayTitle: this.$t('videoReplay.ShortReplay'),
        recodename: "recode",
        showInnerCtrl: false,
        innerFullScreen: false,//单窗口全屏，标志
        escFlag: false,
        recordingLen: 15,
        rtspAddress: '',
        camera_id: '',
        inspectionIndex: '',
        inspecType: '', //  ='inspection' 巡检；
        loadTime: null,
        enterPlayer: false,
        sendBeatToaken: null,
        playNums: [], // 没用
        obj: {},
        inspectionList: [], // 巡检列表的摄像头数组
        secneList: [], // 场景列表的摄像头数组
        turnPageList: [], // 视频翻页的摄像头数组
        turnPagePlayStatus: false, // 视频翻页的播放状态
        sceneType: '', // = scene场景； =‘’空巡检；=turnPage 翻页
        treeData: '', // 设备树的数据
        isWsUsed: true,
        videoServerIp: "",
        videoWebsocketPort: "",

        turnPageBtnDisabled: true, // 默认上下页不能按
        playBtnDisabled: true,
        currentPage: 0, // 当前播放的是turnPageList的第几页
        autoTurnPage: false, // false:手动翻页； true：自动翻页
        autoTurnTime: '',
        keyDownF11: false,
        click: true,
        autoAtrr: [],
        timeLoad: null,
        timingCaptured: false, // 定时抓拍
        caputerPhoto: '',
        caputerPhotoTime: '',
        caputerPhotoArr: [],
        alarmNum: 16,
        alarmLinkageType: '', // 告警联动
        short_replay_visible: false,
        autoShortTime: '',
        audioSwitchValue: false,
        audioValue: false,
        queryParm: {
          starttime: "",
          endtime: "",
          type: 0,
          forward: 0,
          baktype: 0,
          deviceList: []
        },
        relateTime: {
          beginTime: '',
          endTime: ''
        },
        fileList: [],
        replayerOptions: {},
        recordPosition: 0,
        proxyTransport: false,
        reconnectTime: 0,
        rePlayBox: {},
        isTakePhoto: false,
        talkingPlayer: ""
      }
    },
    computed: {
      isWinMin() {
        //console.log(this.$store)
        return this.$store.state.isWinMin;
      },
      userName: {
        get () { return this.$store.state.user.name }
      }
    },
    watch: {
      autoTurnPage(val) {
        console.log('autoTurnPage 是: ', val);
        if (this.turnPagePlayStatus) {
          if (this.autoTurnPage === true) {
            this.turnPageBtnDisabled = true
          }
          this.currentPage = 0;// 每次切换成自动或手动，播放从第0页开始播放。
          this.getvideoInspecionId(this.turnPageList, 'turnPage')// 在这个方法中有对屏幕数量的判断来设置手动时候的上下页是否可按？
        }
      },

      // watch 中监测treeNodeData，数据变化才会执行。
      treeNodeData() {
        var self = this;
        console.log('摄像头树选择node后，传递node 数据给播放界面是: ', this.treeNodeData);
        if (this.treeNodeData.deviceKind == "4") { // 摄像头节点
          // 上下页按钮灰色
          self.playBtnDisabled = true;
          self.turnPageBtnDisabled = true;
        } else {
          // 播放按钮可用，上下页按钮不一定
          self.playBtnDisabled = false;
          // 获取node节点下所有叶子节点（摄像头节点）
          let camerasData = findAllNodeFormTree({deviceKind: "4"}, this.treeNodeData, "children");
          console.log('node节点下所有的摄像头列表: ', camerasData);
          this.turnPageList = camerasData
          this.currentPage = 0;
        }
      },

      isWinMin(val) {
      },
      camera_id(val) {
        // 这样重新赋值后，就得到了父组件动态改变的数据
        if (val != "") {
          this.camera_id = val;
          if (this.inspecType === 'inspection') return;
          console.log('获取流媒体getVideoServerUrl 001')
          // console.log(this.alarmLinkageType + 'alarmLinkageType')
          this.getVideoServerUrl()
        }
      },
      isActive(val) {
        if (val != "") {
          // console.log('isActive',val)
          this.isActive = val
        }
      },
      enterPlayer(val) {
        if (val) {
          this.sendBeatToaken = setInterval(() => {
            //this.heartBeatToaken();
          }, 5000)
        } else {
          clearInterval(this.sendBeatToaken);
          this.sendBeatToaken = null;
        }
      },
      rtspAddress(val) {
        if (val != "") {
          this.rtspAddress = val;
        }
      },
      videoServerUrl(val) {
        if (val != "") {
          this.videoServerUrl = val;
        }
      },

      // 告警联动数据
      "$store.getters.getAllAlarmData": {
        handler(val) {
          let flag = localStorage.getItem('alarmPopupSwitchValue')
          if (flag === 'false') return false;
          let openPlayFlag = localStorage.getItem('alarmLinkageValue')
          if (this.$route.name === 'videoBrowsing' && openPlayFlag === 'true') {
            let data = Object.values(val)[0]
            data.map(el => {
              el.deviceId = el.device_id
              el.deviceKind = el.device_kind
              return el
            })
            this.$emit('changeStream', 0, data, 'alarmLinkage')
          }
        }
      }
    },
    activated: function () {
      for (var i = 0; i < this.isActive; i++) {
        var videoname = this.myVideoIname(i);
        var html5Player = document.getElementById(videoname);
        // this.setPlayerSource(i,true);
        if (this.videos[i]['played']) {
          html5Player.play();
        }
      }

      
    },
    mounted: function () {
      let that = this
      this.init();
      // 设置页面水印
      //Watermark.set('力维视频 ' + this.userName, this.$refs.videopanel)
      this.stopVideo();
      if (localStorage.getItem('autoTurnTime')) {
        this.autoTurnTime = JSON.parse(localStorage.getItem('autoTurnTime'));
      } else {
        this.autoTurnTime = 10;
      }
      if (localStorage.getItem('autoShortTime')) {
        this.autoShortTime = JSON.parse(localStorage.getItem('autoShortTime'));
      } else {
        this.autoShortTime = 5;
      }
      if (localStorage.getItem('audioSwitchValue') != null) {
        this.audioSwitchValue = JSON.parse(localStorage.getItem('audioSwitchValue'));
        this.audioValue = this.audioSwitchValue
        console.log("audioSwitchValue:", this.audioSwitchValue);
      }
      if (localStorage.getItem('form')) {
        let form = JSON.parse(localStorage.getItem('form'))
        that.caputerPhoto = form.number;
        that.caputerPhotoTime = form.name;
      } else {
        that.caputerPhoto = 10;
        that.caputerPhotoTime = 10;
      }
      window.addEventListener('resize', this.onResize, true)
      window.addEventListener("keydown", this.KeyDown, true)
    },

    methods: {
      onResize() {
        if (!checkFull()) {
          let that = this
          //console.log('*********************lily test checkFull = false ');//常规，非全屏
          that.showInnerCtrl = false;
          $('.squared_ul li').removeClass('current_inner');
          $(".squared_ul li").eq(that.selectedIndex).addClass("current");

          if (that.escFlag) {
            that.allScreenFlag = false
            that.screenTitle = that.$t('videoReplay.AllScreen')
            that.innitScreenVideoDivStatus();
          }
          that.escFlag = false;
          // 设置页面水印
          //Watermark.set('力维视频 ' + this.userName, that.$refs.videopanel)
        } else {
          //console.log('*********************lily test checkFull = true ');//窗口全屏 / 单窗口全屏
          //console.log('*********************lily test 多窗口全屏标志 this.allScreenFlag = ',that.allScreenFlag)
          //console.log('*********************lily test 单窗口全屏标志 this.innerFullScreen = ',that.innerFullScreen)
        }
      },
      ctrlMute() {
        var index = -1;
        var self = this;
        if (this.videos[this.selectedIndex].played) {
          for (let i = 0; i < 16; i++) {
            if (this.videos[i].enableVoc) {
              index = i;
              continue
            }
          }
          this.videos[this.selectedIndex].enableVoc = !this.videos[this.selectedIndex].enableVoc;
          this.enableVoc = this.videos[this.selectedIndex].enableVoc;
          if (this.enableVoc) {
            this.ctrlVol = this.$t('videoReplay.closeVoice')
          } else {
            this.ctrlVol = this.$t('videoReplay.openVoice')
          }
           if (index != -1) {
            if (this.selectedIndex == index) {
              this.reconnectWs(this.selectedIndex, this.videos[this.selectedIndex].enableVoc, true);
            } else {
              this.videos[index].enableVoc = false;
              this.reconnectWs(index, this.videos[index].enableVoc, true);
              setTimeout(function () {
                self.reconnectWs(self.selectedIndex, self.videos[self.selectedIndex].enableVoc, true);
              }, 200);
            }
          } else {
             this.reconnectWs(this.selectedIndex, this.videos[this.selectedIndex].enableVoc, true);
           }
        } else {
          this.$message({
            type: "error",
            message: this.$t('videoReplay.ShortReplayTil')
          });
        }
      },
      KeyDown(event) {
        //console.log('*********************lily test 12345 '); //按键在正常情况下可以检测到，全屏模式下不行
        if (event.keyCode === 122) {  //F11 code = 122,全屏
          event.preventDefault();
          this.fullScreen();
        }
      },
      fullScreen() {
        if (!this.click) {
          this.click = true;
        }
        if (this.click) {
          document.body.webkitRequestFullscreen();
          this.click = false;
        }
      },
      previousCameras() {
        console.log('上一页previousCameras ');
        if (this.currentPage == 0) {
          this.$message({
            type: "error",
            message: "正播放第一页视频，请点击下一页"
          });
        } else {
          this.currentPage--; // 当前播放的是turnPageList的第几页
        }
        this.getvideoInspecionId(this.turnPageList, 'turnPage')
      },
      nextCameras() {
        console.log('下一页nextCameras ');
        this.currentPage++; // 当前播放的是turnPageList的第几页
        this.getvideoInspecionId(this.turnPageList, 'turnPage')
      },
      playOrPause(data, num) {
        if (data) {
          this.turnPageList = data
          this.isActive = num
        }
        this.turnPagePlayStatus = !this.turnPagePlayStatus
        if (this.turnPagePlayStatus) {
          this.getvideoInspecionId(this.turnPageList, 'turnPage')
          this.currentPage = 0;// 每次播放从第0页开始播放。
          console.log('翻页 播放 playOrPause ');
        } else {
          this.stopAllScreen();// 全部播放停止。
          this.turnPageBtnDisabled = true
          console.log('翻页 暂停 playOrPause ');
        }
      },

      stopVideo() {
        let self = this
        if (!self.__play_seed) {
          self.__play_seed = 0;
        }
        self.__play_seed++;
      },

      // 获取视频巡检下摄像头的url
      getvideoInspecionId(data, type) {
        let self = this
        self.autoAtrr = data
        self.sceneType = type
        if (type === 'scene') {
          self.secneList = data
          console.log('场景下的摄像头列表是: ', this.secneList);
        } else if (type === 'turnPage') {
          // this.turnPageList = data
          console.log('视频翻页的摄像头列表是: ', this.turnPageList);
        } else {
          self.inspectionList = data
        }
        self.stopVideo();

        self.inspecType = 'inspection';
        let arr = data
        let windowNum;
        let time;
        let playNum;
        if (type === 'scene') {
          // 场景
          windowNum = parseInt(self.isActive);
          playNum = windowNum
          // this.$watch("isActive",function(val,oldval){
          //   windowNum = parseInt(val);
          // })
          time = 30 * 1000;
        } else if (type === 'turnPage') {
          // 视频翻页
          windowNum = parseInt(self.isActive);
          playNum = windowNum // 当前有几个窗口：1、4、6、9、16
          time = self.autoTurnTime * 1000;
        } else {
          // 巡检
          // 窗口数量
          self.isActive = parseInt(data[0].nos);
          windowNum = parseInt(data[0].nos);
          // 循环时间
          time = data[0].intervalTime * 1000;
          // 指定窗口播放的位置
          self.nosIndexList = data[0].nosIndexList.split(",");
          playNum = self.nosIndexList.length
        }

        (seed => {
          var count = 0;
          if (type === 'turnPage') {
            count = self.currentPage * playNum;
          }
          whilst(
            function (cb) {
              cb(null, seed == self.__play_seed);
            },
            function (callback) {
              let el = arr[count % arr.length];
              el._index = count; // el._index 对应 turnPageList的元素下标
              count++;
              let url = ''
              let cameraId = (type === 'scene' || type === 'turnPage') ? el.deviceId : el.cameraId
              url = "/api/scms/iv/cmsproxy/rtsp/realTimeStreamUrl?cameraId=" + cameraId + "&streamType=0" + "&isWsUsed=" + self.isWsUsed
              setTimeout(function () {
                Promise.all([
                  el,
                  Axios.get(url)
                ]).then(([el, res]) => {
                  if (res.data.code === 200) {
                    let index = el._index % playNum; // index 指 turnPageList[el._index] 在第几个窗口中播放。
                    console.log('获取obj index是：', index, 'obj  sq是：', el._index);
                    let obj = {
                      el,
                      sq: el._index,
                      index,
                      name: el.label,
                      rtspAddress: res.data.data.rtspUrl,
                      camera_id: (type === 'scene' || type === 'turnPage') ? el.deviceId : el.cameraId
                    }
                    self.videoServerUrl = "ws:" + res.data.data.ip + ":" + res.data.data.websocketPort + "/ws"
                    if (playNum < arr.length) {
                      self.stopSeletedScreen(true, index);
                    }
                    // 窗口数量大于视频数量
                    if (playNum >= arr.length) {
                      if (type === 'turnPage') {
                        self.turnPageBtnDisabled = true; // 如果是视频翻页，摄像头小于窗口数，则上一页，下一页 禁止操作。
                      }
                      if (obj.sq == arr.length) { // obj.sq  指 obj 是 turnPageList的第几个元素
                        callback({playend: 1}) // 播放到最后一个摄像头，就停止循环了？
                        console.log('停止循环的 obj.sq是：', obj.sq);
                      } else {
                        console.log('获取流媒体getVideoServerUrl 002')
                        console.log('不停止循环的 obj.sq是：', obj.sq);
                        self.getVideoServerUrl('inspection', obj).then(_ => {
                          callback();
                        }).catch(callback);
                      }
                      // 窗口数量小于视频数量-需要轮播
                    } else {
                      if (type === 'turnPage' && self.autoTurnPage == false) {
                        self.turnPageBtnDisabled = false; // 如果是视频翻页，摄像头大于窗口数，而且不是自动翻页，则上一页，下一页 允许操作。
                      }
                      console.log(obj.index, "视频位置"); // obj.index 指 turnPageList[el._index] 在第几个窗口中播放。
                      if (obj.index + 1 == playNum) { // 某一页，播放到最后一个窗口
                        console.log('获取流媒体getVideoServerUrl 003,self.currentPage是：', self.currentPage)
                        // self.currentPage ++; //自动翻页的时候，可以计算页数；手动翻页，是在上页 、下页 中去加减（time无穷大，不会自动超时）
                        if (type === 'turnPage' && !self.autoTurnPage) {
                          setTimeout(function () {
                            self.getVideoServerUrl('inspection', obj).then(_ => {
                              callback({playend: 1})
                            }).catch(callback);
                          }, 300)
                        } else {
                          setTimeout(function () {
                            self.getVideoServerUrl('inspection', obj).then(_ => {
                              setTimeout(_ => {
                                callback();
                              }, time);
                            }).catch(callback);
                          }, 300)
                        }
                      } else {
                        console.log('获取流媒体getVideoServerUrl 004')
                        setTimeout(function () {
                          self.getVideoServerUrl('inspection', obj).then(_ => {
                            callback();
                          }).catch(callback);
                        }, 300)
                      }
                    }
                  } else {
                    throw res.data;
                  }
                }).catch(err => {
                  callback(err);
                })
              }, 300)
            },
            (err, result) => {
              if (err) {
                if (err.playend) {
                  console.log("播放完成");
                } else {
                  // 提示错误
                  console.error(err);
                }
              }
            }
          );
        })(self.__play_seed);
      },
      // 全屏
      allScreen() {
        this.escFlag = true;
        this.allScreenFlag = !this.allScreenFlag
        if (this.allScreenFlag) {
          this.screenTitle = this.$t('videoReplay.outAllScreen')
          this.videoEnterAllScreen();
          this.fullScreenVideoDivStatus();
        } else {
          this.exitVideoFullscreen();
          this.screenTitle = this.$t('videoReplay.AllScreen')
          this.innitScreenVideoDivStatus();
        }
      },
      // 初始化窗口
      init: function () {
        var self = this;
        for (var i = 0; i <= this.recordingLen; i++) {
          this.isRecording[i] = false;
        }
        this.setVideoFocus(0);
        $(".squared_ul li").click(function () {
          $(this).siblings('li').removeClass('current'); // 删除其他兄弟元素的样式
          $(this).addClass('current');
          self.selectedIndex = $(this).index();// 获取当前点击的li是ul中的第几个// 添加当前元素的样式
          self.videoPlayedIndex = self.videos[self.selectedIndex]
          self.$emit('selectedTreeNode', self.videos[self.selectedIndex]);
          // console.log("new Date().getTime():", timeStampToFormatDate((Math.round(new Date() / 1000)- 5*60) * 1000, 'Y-m-d H:i:s'));
          // console.log(`self.selectedIndex：${self.selectedIndex}`);
          console.log('初始化窗口self.videos是: ', self.videos[self.selectedIndex]);
          self.short_replay_visible = self.replayVideos[self.selectedIndex].isActive;
          self.enableVoc = self.videos[self.selectedIndex].enableVoc;
          if (self.enableVoc) {
            self.ctrlVol = self.$t("videoReplay.closeVoice");
          } else {
            self.ctrlVol = self.$t("videoReplay.openVoice");
          }
          if (self.videos[self.selectedIndex]['photoTime']) {
            self.timingCaptured = true
            console.log(self.timingCaptured + '*************************')
            // self.isTakePhoto = true
          } else {
            self.timingCaptured = false
          }
          if (self.videos[self.selectedIndex]['stream']) {
            self.streamKind = !self.videos[self.selectedIndex]['stream']
          } else {
            self.streamKind = 1
          }
          if (self.recordSelectedIndex != self.selectedIndex && self.selectedIndex != -1) {
            self.isRecordingUp = false;
          } else {
            self.isRecordingUp = true;
          }
        });
      },
      initScreen: function () {
        $('.squared_ul li').removeClass('current');
      },
      selectCurrentVideo(data) {
        for (let i = 0; i < this.videos.length; i++) {
          let video = this.videos[i];
          if (video["played"] == true) {
            if (data.deviceId == video.camera_id) {
              $('.squared_ul li').removeClass('current');
              $(".squared_ul li").eq(i).addClass("current");
              this.selectedIndex = i;
            }
          }
        }
      },

      // 设置焦点
      setVideoFocus: function (index) {
        this.videoPlayedIndex = this.videos[index]
        $('.squared_ul li').removeClass('current');
        $(".squared_ul li").eq(index).addClass("current");
        this.selectedIndex = index;
        let self = this
        this.$emit('selectedTreeNode', this.videos[index]);
        if (this.videos[this.selectedIndex]['stream']) {
          self.streamKind = !self.videos[self.selectedIndex]['stream']
        }
        // console.log('this.videos[index]setVideoFocus: ' + index);
        // console.log('设置焦点self.videos是: ', this.videos[index]);
        if (this.videos[this.selectedIndex]['camera_id'] == this.treeData.deviceId) {
          this.videos[this.selectedIndex]['obj'] = this.treeData
        }
      },

      /**
       *设置视频浏览播放
       */
      async configAndPlayVideo(type, obj, tihuan) {
        let self = this;
        let local = self.videoArr.indexOf(self.isActive);

        //console.log('设置isActive了吗', local, self.isActive)
        if (type && parseInt(self.isActive) == 1 && self.alarmLinkageType !== 'alarmLinkage') {
          for (let i = 0; i < self.videos.length; i++) {
            let video = self.videos[i];
            if (video["played"] == true) {
              self.stopSeletedScreen(true, i);
            }
          }
        }
        if (type === 'inspection') {
          setTimeout(function () {
            let playerIndex = obj.index
            let _index;
            if (self.sceneType == 'scene') {
              _index = playerIndex
            } else if (self.sceneType == 'turnPage') {
              _index = playerIndex
            } else {
              _index = self.nosIndexList[playerIndex];
            }
            
            self.videos[_index]['played'] = true;
            self.videos[_index]['camera_ip'] = obj.camera_ip;
            self.videos[_index]['camera_id'] = obj.camera_id;
            self.videos[_index]['rtspAddress'] = obj.rtspAddress;
            self.videos[_index]['obj'] = obj.el;
            self.videos[_index]['error'] = "";
            self.playNum = _index;
            var videoname = this.myVideoIname(_index);
            var html5Player = document.getElementById(videoname);

            var playname = "player" + _index;
            html5Player.src = self.videos[_index]['rtspAddress'];
            self.playBox[playname] = window.Streamedian.player(videoname, self.playerOptions);
            self.setVideoFocus(self.playNum);
            self.$emit('playstatus', true)
            self.enterPlayer = true;
          }, 300)
        } else {
          let index = -1;
          for (var i = 0; i < self.isActive; i++) {
            var video = self.videos[i];

            if (video['camera_id'] == self.camera_id) {
              window.setTimeout(function () {
                self.setVideoFocus(i);
              }, 0);
              return;
            }
            if (video['played'] == false) {
              index = i;
              break;
            }
          }

          if (index == -1 && local == 4 && self.alarmLinkageType === 'alarmLinkage') {
            console.log('告警')
            let alarmArr = self.videos
            let count = self.alarmNum
            count++;
            var alarmIndex = count % 16
            index = alarmIndex - 1
            await self.stopSeletedScreen(true, index, 'alarmType');
            let params = {
              "rtspAddress": '',
              "played": false,
              "camera_ip": "",
              "camera_id": '',
              "error": "",
              "errorShow": true,
              'time': '',
              'currentTime': '',
              'reconnectTime': 0,
              'isActive': false,
              loadTime: null,
              isLockReconnected: true,
              photoNum: '',
              photoTime: '',
              caputerPhotoArr: [],
              ptzControl: 0
            }
            alarmArr.splice(index, 1, params);
          }
          if (index == -1) {
            if (local == 4) {
              self.$message({
                message: self.$t('videoReplay.16allplayed')
              });
              return;
            }
            
            //这里可以做替换代码了
            if(this.needReplaced) {
              this.replaceVideo(index)
            }else{
              self.isActive = self.videoArr[local + 1];
              self.configAndPlayVideo();
            }

            window.setTimeout(function () {
              self.setVideoFocus(self.playNum);
            }, 0);
          } else {
            let vodeoPlayIndex = self.selectedIndex > -1 ? self.selectedIndex : index
            if (self.videos[vodeoPlayIndex]['played']) {
              vodeoPlayIndex = index
            }
            // console.log('播放', vodeoPlayIndex)
            
            self.videos[vodeoPlayIndex]['played'] = true;
            self.videos[vodeoPlayIndex]['camera_ip'] = self.camera_ip;
            self.videos[vodeoPlayIndex]['camera_id'] = self.camera_id;
            self.videos[vodeoPlayIndex]['rtspAddress'] = self.rtspAddress;
            self.videos[vodeoPlayIndex]['obj'] = self.treeData;
            self.videos[vodeoPlayIndex]['error'] = "";
            self.playNum = vodeoPlayIndex;
            if (self.audioSwitchValue && vodeoPlayIndex == 0) {
              self.videos[vodeoPlayIndex]['enableVoc'] = true;
            } else {
              self.videos[vodeoPlayIndex]['enableVoc'] = false;
            }
            let audioSwitch = self.videos[vodeoPlayIndex]['enableVoc'];
            self.enableVoc = audioSwitch
            if (self.enableVoc) {
              self.ctrlVol = self.$t('videoReplay.closeVoice')
            } else {
              self.ctrlVol = self.$t('videoReplay.openVoice')
            }
            self.setPlayerSource(vodeoPlayIndex, false, audioSwitch);
          }
          self.setVideoFocus(self.playNum);
        }
        // console.log('self.videos***:', arr)
      },

      async replaceVideo(index) {
        //断开ws连接
        var videoname = this.myVideoIname(index);
        var html5Player = document.getElementById(videoname);
        html5Player && (html5Player.src = "")

        var playname = "player" + index;
        if (this.playBox[playname] != null) {
          this.playBox[playname].isLockReconnected = false;
          this.playBox[playname].destroy(this.playBox[playname].isLockReconnected);
          this.playBox[playname] = null;
        }

        let self = this


        let vodeoPlayIndex = self.selectedIndex > -1 ? self.selectedIndex : index

            //console.log(self.videos[vodeoPlayIndex], vodeoPlayIndex, index)

            
            self.videos[vodeoPlayIndex]['played'] = true;
            self.videos[vodeoPlayIndex]['camera_ip'] = self.camera_ip;
            self.videos[vodeoPlayIndex]['camera_id'] = self.camera_id;
            self.videos[vodeoPlayIndex]['rtspAddress'] = self.rtspAddress;
            self.videos[vodeoPlayIndex]['obj'] = self.treeData;
            self.videos[vodeoPlayIndex]['error'] = "";
            self.playNum = vodeoPlayIndex;
            if (self.audioSwitchValue && vodeoPlayIndex == 0) {
              self.videos[vodeoPlayIndex]['enableVoc'] = true;
            } else {
              self.videos[vodeoPlayIndex]['enableVoc'] = false;
            }
            let audioSwitch = self.videos[vodeoPlayIndex]['enableVoc'];
            self.enableVoc = audioSwitch
            if (self.enableVoc) {
              self.ctrlVol = self.$t('videoReplay.closeVoice')
            } else {
              self.ctrlVol = self.$t('videoReplay.openVoice')
            }
            self.setPlayerSource(vodeoPlayIndex, false, audioSwitch);
      },

      /**
       *保存播放列表
       */
      saveVideosList() {
        const self = this
        let arr = self.videos.filter(el => el.rtspAddress)
        let savePlayVideos = {
          arr: [...arr],
          playWindowNum: self.isActive
        }
        self.$store.commit("saveVideoList", savePlayVideos);
      },
      setPlayerSource: function (index, isPauseToPlay, audioSwitch) {
        //使用id拼接video的id， 需渲染后去获取dom
        setTimeout(() => {
          if(window.Streamedian) {
            var videoname = this.myVideoIname(index)
            var html5Player = document.getElementById(videoname);
            var playname = "player" + index;
            if (isPauseToPlay == false) {
              html5Player.src = this.rtspAddress;
            } else {
              html5Player.src = this.videos[index]['rtspAddress'];
            }
            this.playerOptions.audioSwitchValue = audioSwitch;

            this.playBox[playname] = window.Streamedian.player(videoname, this.playerOptions);
            this.enterPlayer = true;
          }
        }, 300)
      },

      /**
       * 获取流媒体
       * @param houseId
       * @returns {Promise<void>}
       */
      getVideoServerUrl: function (type, obj) {
        let self = this;
        console.log('获取流媒体getVideoServerUrl', type)
        // var url = "/etis/rollcall/getVideoServerUrl";
        let videoServerIp = "";
        let videoWebsocketPort = "";

        
        if (type == "replay") {
          self.initReplayVideo();
          self.configAndRePlayVideo();
        } else {
          self.initvideo();
          self.configAndPlayVideo(type, obj);
        }
        return
        
        return Axios.get('/api/scms/iv/cmsproxy/streamproxy/getOptimalStreamproxy')
          .then(res => {
            if (res.data.code === 0 || res.data.code == 200) {
              videoServerIp = res.data.data.ip;
              videoWebsocketPort = res.data.data.websocketPort;
              
            //当ws有不同的地址时 可以单独配置
              //self.videoServerUrl = "ws:" + videoServerIp + ":" + videoWebsocketPort + "/ws"

              //self.videoServerUrl = "ws://172.16.202.129:8060/ws/"
              
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

      heartBeatToaken() {
        Axios.get("/api/scms/iv/cmsproxy/heartbeat")
          .then(res => {
            if (res.data.code === 200) {
              // console.log("heartBeatToaken--");
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
      // 判断设备是否正在播放
      isPlaying: function (cameraIp) {
        let playing = false;
        for (var i = 0; i < this.isActive; i++) {
          let played = this.videos[i]['played'];
          if (played && cameraIp == this.videos[i]['camera_ip']) {
            this.setVideoFocus(i);
            playing = true;
            break;
          }
        }
        return playing;
      },
      /**
       * 初始化视频，配置视频参数
       * @param index
       */
      initvideo: function (index) {
        var self = this;
        if (window.Streamedian) {
          let errHandler = function (currentProxy, err) {
            let curProxy = currentProxy;
            for (var i = 0; i < self.videos.length; i++) {
              if (curProxy == self.videos[i]['rtspAddress']) {
                switch (err) {
                  default:
                    self.videos[i]["error"] = err.message;
                    break;
                }
              }
            }
          };
          let stuHandler = function (currentProxy, message) {
            let curProxy = currentProxy;
            for (var i = 0; i < self.videos.length; i++) {
              if (curProxy == self.videos[i]['rtspAddress']) {
                switch (message) {
                  case self.globalScmsVideoStatus.STATUS_REQUESTING_VIDEO:
                    self.videos[i]["error"] = self.$t('请求数据') + self.videos[i]['camera_id'];
                    break;
                  case self.globalScmsVideoStatus.STATUS_REQUESTING_VIDEO_FAILED:
                    self.videos[i]["error"] = self.$t('请求失败');
                    break;
                  case self.globalScmsVideoStatus.STATUS_INTERRUPT_TRYING_TO_RECONNECT_VIDEO:
                    self.videos[i]["error"] = self.$t('尝试重连')
                    break;
                  case self.globalScmsVideoStatus.STATUS_RECONNECT_VIDEO:
                    self.reconnectWs(i);
                    break;
                  case self.globalScmsVideoStatus.STATUS_TALKING_VIDEO:
                    self.videos[i]["talkingSupport"] = true;
                    break;
                  default:
                    self.videos[i]["error"] = self.$t('接收数据') + " " + message.toFixed(2) + "kbps";
                    break;
                }
              }
            }
          };
          if (this.videoServerUrl == "") {
            this.$message({
              message: this.$t('videoReplay.videoNotSuccess')
            });
            return;
          }

          this.playerOptions = {
            socket: this.videoServerUrl,
            redirectNativeMediaErrors: true,
            bufferDuration: 5,
            audioSwitchValue: this.audioValue,
            errorHandler: errHandler,
            statuHandler: stuHandler,
            audio: "audio_0",
            playCanvas: "playCanvas"
          };
          $("video").bind("contextmenu", function () { // 取消右键事件
            return false;
          });
        }
      },
      changeScreen: function (num) {
        this.isActive = num;
        if (this.sceneType === 'scene') {
          for (let i = 0; i < this.videos.length; i++) {
            let video = this.videos[i];
            if (video["played"] == true) {
              this.stopSeletedScreen(true, i);
            }
          }
          this.getvideoInspecionId(this.secneList, 'scene')
        } else if (this.sceneType === 'turnPage') {
          for (let i = 0; i < this.videos.length; i++) {
            let video = this.videos[i];
            if (video["played"] == true) {
              this.stopSeletedScreen(true, i);
            }
          }
          this.currentPage = 0;
          this.getvideoInspecionId(this.turnPageList, 'turnPage')
        }
      },
      voiceIntercom: function () {
        if (this.selectedIndex != -1 && this.videos[this.selectedIndex]["played"] == true) {
          navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
          if (!navigator.getUserMedia) {
            alert('浏览器不支持音频输入');
            return
          }
          if (this.videos[this.selectedIndex]["talkingSupport"]) {
            this.audioPlay = !this.audioPlay;
            var playname = "player" + this.selectedIndex;
            if (this.audioPlay == true) {
              this.talkingIndex = this.selectedIndex
              this.startTalking(playname, this.selectedIndex);
            } else {
              if (this.talkingIndex != -1) {
                playname = "player" + this.talkingIndex;
                this.stopTalking(playname, this.talkingIndex);
              }
            }
          } else {
            this.$message({
              type: "error",
              message: this.$t('videoBrowsing.notSupportTalking')
            });
          }
        } else {
          this.$message({
            type: "error",
            message: this.$t('videoReplay.ShortReplayTil')
          });
        }
      },
      startTalking(playname, num) {
        if (this.playBox[playname] != null) {
          this.playBox[playname].startTalking();
        }
        console.log("audiotalking", this.audioPlay);
        this.talkingPlayer = playname;
        this.talkingStrTil = this.videos[num]['obj'].deviceName + this.$t('videoReplay.talking')
        this.talkingStr = this.$t('videoReplay.stopvoiceTall');
      },
      stopTalking(playname, num) {
        console.log("audiotalking", this.audioPlay);
        this.talkingPlayer = "";
        this.talkingStrTil = "";
        this.talkingStr = this.$t('videoReplay.voiceTall');
        if (this.playBox[playname] != null) {
          this.playBox[playname].stopTalking();
        }
        this.talkingIndex = -1;
        this.$parent.stopTalking();
      },
      screenshots(type, index) {
        if (index == '' || index == undefined) {
          index = this.selectedIndex
        }
        let caputerIndex = this.videos.findIndex(el => el.photoTime)
        if (this.selectedIndex != -1 && this.videos[index]["played"] == true) {
          var date = new Date();
          var datestr = moment(date).format("YYYYMMDDHHmmss");
          var picname = "screenshot" + index + datestr + ".png";
          let _index = caputerIndex > -1 ? caputerIndex : index
          this.savePic(picname, type, _index);
        }
      },
      // 定时抓拍
      timingCapturedHandel() {
        let self = this
        let index = self.selectedIndex
        self.videos[index].timingCaptured = self.timingCaptured;
        // self.videos[index].caputerPhotoTime = self.caputerPhotoTime;
        console.log(self.timingCaptured, ',self.timingCaptured')
        // self.videos[index].timingCaptured = self.timingCaptured;
        self.videos[index].caputerPhoto = self.caputerPhoto;
        if (self.videos[index].timingCaptured == false) {
          self.videos[index].timingCaptured = false
          self.timingCaptured = self.videos[index].timingCaptured
          self.videos[index].caputerPhoto = 0
          clearInterval(self.videos[index].photoTime)
          return
        };
        if (self.timingCaptured == false) return;
        if (self.selectedIndex == -1 || self.selectedIndex == undefined) {
          self.$message.error(self.$t('videoReplay.qxzck'));
          return;
        }
        self.videos.forEach((el, pindex) => {
          el.caputerPhotoTime = self.caputerPhotoTime;
          if (el.timingCaptured) {
            el.photoTime = setInterval(_ => {
              if (el.photoTime == null && self.timingCaptured == false) return;
              var date = new Date();
              var datestr = moment(date).ormat("YYYYMMDDHHmmss");
              var picname = "screenshot" + pindex + datestr + ".png";
              self.savePic(picname, 'captured', pindex);
            }, el.caputerPhotoTime * 1000);
          } else {
            // el.timingCaptured = false
            // self.timingCaptured = false
            // el.caputerPhoto = 0
            // clearInterval(el.photoTime)
          }
        })

        // console.log('self.caputerPhotoTime:' + self.caputerPhotoTime)
        // console.log('timeLoad222:' + timeLoad.photoTime)
        self.$once('hook:beforeDestroy', function () {
          clearInterval(self.videos[index].photoTime)
        })
      },
      stopSeletedScreen: function (isAll, num, type) {
        var index = -1;
        if (isAll == true) {
          index = num;
          this.$emit('stopCallback', this.videos[index]["camera_id"]);
          this.enterPlayer = false;
        } else {
          if (this.selectedIndex == -1) {
            this.enterPlayer = false;
            return;
          }
          index = this.selectedIndex;
          this.$emit('stopCallback', this.videos[index]["camera_id"]);
        }
        var videoname = this.myVideoIname(index);
        var html5Player = document.getElementById(videoname);

        this.timingCaptured = false;
        this.videos[index]["camera_ip"] = "";
        this.videos[index]["camera_id"] = "";
        this.videos[index]["rtspAddress"] = "";
        this.videos[index]["played"] = false;
        this.videos[index]["error"] = "";
        this.videos[index].photoTime = null
        this.videos[index].caputerPhoto = 0
        this.videos[index].caputerPhotoArr = []
        this.videos[index].ptzControl = 0
        clearInterval(this.videos[index].photoTime)
        if (type !== 'alarmType') {
          this.camera_ip = "";
          this.camera_id = "";
          this.rtspAddress = "";
          this.selectedIndex = -1;
        }
        this.treeData = ''
        
        var playname = "player" + index;
        console.log('暂停播放 stopSeletedScreen destroy playname是: ', playname);
        if (this.playBox[playname] != null) {
          this.playBox[playname].isLockReconnected = false;
          this.playBox[playname].destroy(this.playBox[playname].isLockReconnected);
          this.playBox[playname] = null;
        }
        this.videos[index]['enableVoc'] = false;
        this.enableVoc = this.videos[index]['enableVoc']
        if (this.enableVoc) {
          this.ctrlVol = this.$t('videoReplay.closeVoice')
        } else {
          this.ctrlVol = this.$t('videoReplay.openVoice')
        }
        if (this.talkingPlayer == playname) {
          this.stopTalking();
        }
        this.videos[index]["talkingSupport"] = false;
        html5Player && (html5Player.src = "");
        if (this.replayVideos[index].isActive) {
          this.stopReplayVideo(index);
        }
        this.initScreen();
        // this.setVideoFocus(0);
      },
      reconnectWs(index, audioSwitch, isVoice) {
        var this_ = this;
        var videoname = this.myVideoIname(index);
        var html5Player = document.getElementById(videoname);
        var playname = "player" + index;
        if (this.playBox[playname] != null) {
          if (isVoice) {
            this.playBox[playname].isLockReconnected = false;
          } else {
            this.playBox[playname].isLockReconnected = true;
          }
          this.playBox[playname].destroy(this.playBox[playname].isLockReconnected);
          this.playBox[playname] = null;
        }
        setTimeout(function () {
          this_.setPlayerSource(index, true, audioSwitch);
        }, 500);
      },
      stopAllScreen: function () {
        // this.$emit('stopCallback', this.videos[this.selectedIndex]["camera_id"]);
        for (let i = 0; i < this.videos.length; i++) {
          let video = this.videos[i];
          if (video["played"] == true) {
            this.stopSeletedScreen(true, i);
          }
        }
        this.initScreen();
        this.stopVideo();
        this.selectedIndex = -1;
        this.secneList = []
        // this.turnPageList = []
        this.currentPage = 0;
        this.nosIndexList = []
        this.sceneType = ''
        this.turnPageBtnDisabled = true
        this.playBtnDisabled = true
        this.turnPagePlayStatus = false
        this.autoTurnPage = false
        this.currentPage = 0;
        this.autoTurnTime = ''
        this.turnPageList = []
        this.autoAtrr = []
        this.$emit('changeStatus', '', 0)
      },
      pauseAllScreen: function () {
        for (let i = 0; i < this.videos.length; i++) {
          let video = this.videos[i];
          if (video["played"] == true) {
            this.pauseSeletedScreen(true, i);
          }
        }
        this.initScreen();
      },
      pauseSeletedScreen: function (isAll, num) {
        var index = -1;
        if (isAll == true) {
          index = num;
        } else {
          index = this.selectedIndex;
        }
        var videoname = this.myVideoIname(index);
        var html5Player = document.getElementById(videoname);
        // var playname = "player" + index;
        html5Player.src = "";
      },
      pauseSeletedScreenToPlay: function (isAll, num) {
        var index = -1;
        if (isAll == true) {
          index = num;
        } else {
          index = this.selectedIndex;
        }
        this.setPlayerSource(index, true);
      },
      savePic: function (fileName, type, index) {
        let self = this
        let _index = index
        var fileType = "png"; // 如果文件名中没有带后缀，默认使用png
        var videoname = this.myVideoIname(_index);
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
            //ctx.fillText('力维视频 ' + localStorage.getItem('userName')+ localStorage.getItem('ipdz'), i * 400, j * 200, canvas.width)
          }
        }
        //
        var strDataURL = canvas.toDataURL("image/" + fileType); // canvas中video中取一帧图片并转成dataURL
        var arr = strDataURL.split(','),
          mime = arr[0].match(/:(.*?);/)[1],
          bstr = atob(arr[1]),
          n = bstr.length,
          u8arr = new Uint8Array(n);
        if (type === 'captured') {
          self.videos.forEach((el, index) => {
            if (el.photoTime) {
              el.caputerPhotoArr.push(arr[1])
              let arrPhoto = el.caputerPhotoArr
              if (arrPhoto.length == el.caputerPhoto) {
                console.log('停止')
                self.timingCaptured = false;
                // self.isTakePhoto = false;
                clearInterval(el.photoTime)
                el.photoTime = null
                el.timingCaptured = false
                el.caputerPhoto = 0
                el.caputerPhotoArr = []
              }
            }
          })
        }
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
      recording: function () {
        if (this.selectedIndex != -1 && this.videos[this.selectedIndex]["played"] == true) {
          this.isVideoRecording = !this.isVideoRecording;
          
          if (this.isVideoRecording == true) {
            this.recordSelectedIndex = this.selectedIndex;
            this.isRecordingUp = true;
            this.isRecording[this.selectedIndex] = true;
            this.recordStr = this.$t('videoReplay.stoprecording');
            var date = new Date();
            var datestr = moment(date).format("YYYYMMDDHHmmss");
            this.recodename = "screenrecode_" + datestr + ".mp4";
            this.saveRecord();
          } else {
            this.recordSelectedIndex = -1;
            this.isRecordingUp = false;
            this.isRecording[this.selectedIndex] = false;
            this.recordStr = this.$t('videoReplay.recording');
            this.stopRecord();
          }
        }
      },
      saveRecord() {
        var fileType = "MP4"; // 如果文件名中没有带后缀，默认使用png
        var videoname = this.myVideoIname(this.selectedIndex);
        var html5Player = document.getElementById(videoname);
        var video = html5Player;
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
      videoPatrol(data) {
        let self = this;
        if (this.is_play_patrol == true) {
          // this.stopAllScreen();
          this.isActive = data[0].nos;
          this.cameraLength = data.length;
          this.cameras = data;
          this.nosIndexList = data[0].nosIndexList.split(",");
          this.nosLength = this.nosIndexList.length;
          this.switchover();
          if (this.cameraLength > this.nosLength) {
            this.interval = window.setInterval(function () {
              self.switchover();
            }, data.intervalTime * 1000);
          }
        } else {
          this.stopAllScreen();
        }
      },
      switchover: function () {
        // this.stopAllScreen();
        for (let i = 0; i < this.nosLength; i++) {
          let index = this.nosIndexList[i];
          if (index == "") {
            this.$message({
              message: this.$t('videoReplay.notAddPollList')
            });
            return;
          }
          this.stopSeletedScreen(true, index);
          this.videos[index]['played'] = true;
          this.videos[index]['rtspAddress'] = this.cameras[this.cameraNum].rtspAddress;
          this.videos[index]['camera_ip'] = this.cameras[this.cameraNum].ipAddr;
          this.videos[index]['camera_id'] = this.cameras[this.cameraNum].id;
          this.setPlayerSource(index, true);
          this.cameraNum++;
          if (this.cameraLength == this.cameraNum) {
            this.cameraNum = 0;
          }
        }
      },
      stopPatrol: function (data) {
        window.clearInterval(this.interval);
        for (let i = 0; i < this.nosLength; i++) {
          let index = this.nosIndexList[i];
          this.stopSeletedScreen(true, index);
        }
        // this.stopAllScreen();
        this.cameraNum = 0;
      },
      playAllScreen: function () {
        return 
        if (checkFull()) {
          if (!this.allScreenFlag) {
            if (!this.innerFullScreen) {
              this.replayEnterScreen();
            } else {
              this.replayExitScreen();
            }
          } else {
            if (this.click) {
              if (!this.innerFullScreen) {
                this.replayEnterScreen();
              } else {
                this.replayExitScreen();
              }
            } else {
              if (!this.innerFullScreen) {
                this.replayEnterScreen();
              } else {
                this.replayExitScreen();
              }
            }
          }
        } else {
          this.replayEnterScreen();
        }
      },
      videoEnterAllScreen: function () {
        var elVideo = document.querySelector(`.videoDiv`);

        if(this.showType == "single") {
          elVideo = document.querySelector(`.videoDiv-${this.firstVideoId()}`);
        }
        
        this.requestVideoFullscreen(elVideo);
        // 设置页面水印
        //Watermark.set('力维视频 ' + this.userName, elVideo)
      },
      replayEnterScreen: function () {
        var fullDiv = [this.isActive == 1 ? 'quarter-div-mv' : '', this.isActive == 4 ? 'quarter-div-mv4' : '', this.isActive == 6 ? (this.selectedIndex == 0 ? 'quarter-div-mv6-1' : 'quarter-div-mv9') : '', this.isActive == 9 ? 'quarter-div-mv9' : '', this.isActive == 16 ? 'quarter-div-mv16' : ''];
        for (var i = 0; i < fullDiv.length; i++) {
          if (fullDiv[i] != "") {
            var fullCurDiv = fullDiv[i];
          }
        }
        var el = document.querySelector("." + fullCurDiv + ".current");//获取DOM元素

        this.requestVideoFullscreen(el);
        this.showInnerCtrl = true;
        this.innerFullScreen = true;
        $('.squared_ul li').removeClass("current");
        $('.squared_ul li').addClass("current_inner");
        // 设置页面水印
        //Watermark.set('力维视频 ' + this.userName, el)
        console.log('*********************lily Watermark el Width = ,Height = ',el.offsetWidth,el.offsetHeight);
      },
      replayExitScreen: function () {
        // 设置页面水印
        //Watermark.set('力维视频 ' + this.userName, this.$refs.videopanel)
        this.exitVideoFullscreen();
        this.innerFullScreen = false;
        this.showInnerCtrl = false;
        $('.squared_ul li').removeClass('current_inner');
        $(".squared_ul li").eq(this.selectedIndex).addClass("current");
      },
      requestVideoFullscreen(el) {
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
      exitVideoFullscreen() {
        // 设置页面水印
        //Watermark.set('力维视频 ' + this.userName, this.$refs.videopanel)
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
      enterOperation() {
        if (checkFull()) {
          if (this.click) {
            if (this.selectedIndex != -1) {
              $(document.getElementById("operation_inner_enter_mv" + "_" + this.selectedIndex)).removeClass("operation_inner_enter_diss");
              $(document.getElementById("operation_inner_enter_mv" + "_" + this.selectedIndex)).addClass("operation_inner_enter_nomal");
            }
          } else {
            if (this.allScreenFlag || this.innerFullScreen) {
              if (this.selectedIndex != -1) {
                $(document.getElementById("operation_inner_enter_mv" + "_" + this.selectedIndex)).removeClass("operation_inner_enter_diss");
                $(document.getElementById("operation_inner_enter_mv" + "_" + this.selectedIndex)).addClass("operation_inner_enter_nomal");
              }
            }
          }
        }
      },
      leaveOperation() {
        if (checkFull()) {
          if (this.click) {
            if (this.selectedIndex != -1) {
              $(document.getElementById("operation_inner_enter_mv" + "_" + this.selectedIndex)).removeClass("operation_inner_enter_nomal");
              $(document.getElementById("operation_inner_enter_mv" + "_" + this.selectedIndex)).addClass("operation_inner_enter_diss");
            }
          } else {
            if (this.allScreenFlag || this.innerFullScreen) {
              if (this.selectedIndex != -1) {
                $(document.getElementById("operation_inner_enter_mv" + "_" + this.selectedIndex)).removeClass("operation_inner_enter_nomal");
                $(document.getElementById("operation_inner_enter_mv" + "_" + this.selectedIndex)).addClass("operation_inner_enter_diss");
              }
            }
          }
          // if (this.selectedIndex != -1) {
          //   $(document.getElementById("operation_inner_enter_mv" + "_" + this.selectedIndex)).removeClass("operation_inner_enter_nomal");
          //   $(document.getElementById("operation_inner_enter_mv" + "_" + this.selectedIndex)).addClass("operation_inner_enter_diss");
          // }
        }
      },
      enterOperationReplay() {
            if (this.selectedIndex != -1 && this.replayVideos[this.selectedIndex].isActive) {
              $(document.getElementById("operation_inner_enter_mv" + "_" + this.selectedIndex + "_replay")).removeClass("operation_inner_enter_diss_replay");
              $(document.getElementById("operation_inner_enter_mv" + "_" + this.selectedIndex + "_replay")).addClass("operation_inner_enter_nomal_replay");
            }
      },
      leaveOperationReplay() {
        if (this.selectedIndex != -1 && this.replayVideos[this.selectedIndex].isActive) {
          $(document.getElementById("operation_inner_enter_mv" + "_" + this.selectedIndex + "_replay")).removeClass("operation_inner_enter_nomal_replay");
          $(document.getElementById("operation_inner_enter_mv" + "_" + this.selectedIndex + "_replay")).addClass("operation_inner_enter_diss_replay");
        }
      },
      enterAllOperation() {
        if (checkFull()) {
          if (this.click) {
            if (this.selectedIndex != -1) {
              $(document.getElementById("ul_handle_id")).removeClass("ul_handle_all_diss");
              $(document.getElementById("ul_handle_id")).addClass("ul_handle_div_full");
            }
          } else {
            if (this.allScreenFlag || this.innerFullScreen) {
              if (this.selectedIndex != -1) {
                $(document.getElementById("ul_handle_id")).removeClass("ul_handle_all_diss");
                $(document.getElementById("ul_handle_id")).addClass("ul_handle_div_full");
              }
            }
          }
        }
      },
      leaveAllOperation() {
        if (checkFull()) {
          if (this.click) {
            if (this.selectedIndex != -1) {
              $(document.getElementById("ul_handle_id")).removeClass("ul_handle_div_full");
              $(document.getElementById("ul_handle_id")).addClass("ul_handle_all_diss");
            }
          } else {
            if (this.allScreenFlag || this.innerFullScreen) {
              if (this.selectedIndex != -1) {
                $(document.getElementById("ul_handle_id")).removeClass("ul_handle_div_full");
                $(document.getElementById("ul_handle_id")).addClass("ul_handle_all_diss");
              }
            }
          }
        }
      },
      fullScreenVideoDivStatus: function () {
        $(document.getElementById(this.containerID)).removeClass("squared_ul");
        $(document.getElementById(this.containerID)).addClass("squared_ul_full");
        $(document.getElementById("basic-operation-div-play-nomal-mv")).removeClass("basic-operation-div-play-nomal");
        $(document.getElementById("basic-operation-div-play-nomal-mv")).addClass("basic-operation-div-play-full");
        $(document.getElementById("ul_handle_id")).removeClass("ul_handle");
        $(document.getElementById("ul_handle_id")).addClass("ul_handle_all_diss");
      },
      innitScreenVideoDivStatus: function () {
        $(document.getElementById(this.containerID)).removeClass("squared_ul_full");
        $(document.getElementById(this.containerID)).addClass("squared_ul");
        $(document.getElementById("basic-operation-div-play-nomal-mv")).removeClass("basic-operation-div-play-full");
        $(document.getElementById("basic-operation-div-play-nomal-mv")).addClass("basic-operation-div-play-nomal");
        $(document.getElementById("ul_handle_id")).removeClass("ul_handle_all_diss");
        $(document.getElementById("ul_handle_id")).removeClass("ul_handle_div_full");
        $(document.getElementById("ul_handle_id")).addClass("ul_handle");
      },

      /**
       * 开启主码流
       */
      async mainStreameHandel(val) {
        let index = this.selectedIndex
        let self = this
        let cid = this.videos[index]["camera_id"] 
        if (this.selectedIndex != -1 && this.videos[index]["played"] == true) {
          this.streamKind = Number(!this.streamKind);
          this.videos[this.selectedIndex]["stream"] = val
          this.videos[index]["camera_id"] = "";
          this.videos[index]["rtspAddress"] = "";
          this.videos[index]["played"] = false;
          this.videos[index]["error"] = "";
          this.camera_ip = "";
          this.camera_id = "";
          this.rtspAddress = "";
         
          setTimeout(() => {
             var videoname = this.myVideoIname(index);
            var html5Player = document.getElementById(videoname);

            if(!html5Player) return 
            var playname = "player" + index;
            if (this.playBox[playname] != null) {
              this.playBox[playname].isLockReconnected = false;
              this.playBox[playname].destroy(this.playBox[playname].isLockReconnected);
              this.playBox[playname] = null;
            }
            html5Player.src = "";
            console.log(self.videos, self.selectedIndex)
            // await this.stopSeletedScreen(false, -1)
            this.$emit('changeStream', Number(val), self.videos[self.selectedIndex]['obj'], 'stream', cid)
          },300)
        }
      },
      gettreedata(data, type) {
        this.streamKind = !type
        this.treeData = data
        console.log('this.treeData:', this.treeData)
      },

      /*
      短时回放区域
       */
      shortReplay() {
        if (this.videos[this.selectedIndex].played) {
          this.replayVideos[this.selectedIndex].isActive = !this.replayVideos[this.selectedIndex].isActive;
          this.short_replay_visible = this.replayVideos[this.selectedIndex].isActive;
          if (this.replayVideos[this.selectedIndex].isActive) {
            this.replayShortVideo();
          } else {
            this.stopReplayVideo(this.selectedIndex)
          }
        } else {
          this.$message({
            type: "error",
            message: this.$t('videoReplay.ShortReplayTil')
          });
        }
      },
      replayShortVideo() {
        this.replayVideos[this.selectedIndex].rtspAddress = "";
        this.replayVideos[this.selectedIndex].camera_id = this.videos[this.selectedIndex].camera_id;
        this.relateTime.beginTime = timeStampToFormatDate((Math.round(new Date() / 1000) - this.autoShortTime * 60) * 1000, 'Y-m-d H:i:s')
        this.relateTime.endTime = timeStampToFormatDate((Math.round(new Date() / 1000)) * 1000, 'Y-m-d H:i:s');
        this.queryParm = {
          starttime: "",
          endtime: "",
          type: 0,
          forward: 0,
          baktype: 0,
          deviceList: []
        };
        this.queryParm.starttime = this.relateTime.beginTime;
        this.queryParm.endtime = this.relateTime.endTime;
        let selfDeviceId = {};
        selfDeviceId.deviceId = this.replayVideos[this.selectedIndex].camera_id;
        this.queryParm.deviceList.push(selfDeviceId);
        this.queryFileList("/api/scms/iv/cmsproxy/videotape/fileList", this.queryParm)
      },
      // 查询设备的文件列表（只有本域）
      queryFileList(url, Parm) {
        this.fileList = [];
        const _this = this;
        Axios.post(url, Parm)
          .then(res => {
            if (res.data.code === 200) {
              let fileData = res.data.data;
              if (fileData.length === 0) {
                _this.queryParm.forward = 1;
                _this.queryWebFileList("/api/scms/iv/cmsproxy/videotape/fileList", _this.queryParm);
              } else {
                _this.fileList = fileData;
                _this.rePlayVideo();
              }
            } else if (res.data.code === -536861435) {
              _this.replayVideos[_this.selectedIndex].isActive = false;
              _this.short_replay_visible = _this.replayVideos[_this.selectedIndex].isActive;
              _this.replayVideos[_this.selectedIndex].short_replay_visible = false;
              _this.$message({
                type: "warning",
                message: this.$t('videoQuery.deviceEmpty')
              })
            } else if (res.data.code === -536861950) {
              _this.replayVideos[_this.selectedIndex].isActive = false;
              _this.short_replay_visible = _this.replayVideos[_this.selectedIndex].isActive;
              _this.replayVideos[_this.selectedIndex].short_replay_visible = false;
              _this.$message({
                type: "warning",
                message: this.$t('videoQuery.recordEmpty')
              })
            } else {
              _this.replayVideos[_this.selectedIndex].isActive = false;
              _this.short_replay_visible = _this.replayVideos[_this.selectedIndex].isActive;
              _this.replayVideos[_this.selectedIndex].short_replay_visible = false;
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
      // 查询前端录像文件
      queryWebFileList(url, Parm) {
        this.fileList = [];
        const _this = this;
        Axios.post(url, Parm)
          .then(res => {
            if (res.data.code === 200) {
              let fileData = res.data.data;
              if (fileData.length === 0) {
                _this.replayVideos[_this.selectedIndex].isActive = false;
                _this.short_replay_visible = _this.replayVideos[_this.selectedIndex].isActive;
                _this.replayVideos[_this.selectedIndex].short_replay_visible = false;
                _this.$message({
                  type: "warning",
                  message: this.$t('videoQuery.videoEmpty')
                })
              } else {
                _this.fileList = fileData;
                _this.rePlayVideo();
                console.log('fileList: ', this.fileList);
              }
            } else if (res.data.code === -536861435) {
              _this.replayVideos[_this.selectedIndex].isActive = false;
              _this.short_replay_visible = _this.replayVideos[_this.selectedIndex].isActive;
              _this.replayVideos[_this.selectedIndex].short_replay_visible = false;
              _this.$message({
                type: "warning",
                message: this.$t('videoQuery.deviceEmpty')
              })
            } else if (res.data.code === -536861950) {
              _this.replayVideos[_this.selectedIndex].isActive = false;
              _this.short_replay_visible = _this.replayVideos[_this.selectedIndex].isActive;
              _this.replayVideos[_this.selectedIndex].short_replay_visible = false;
              _this.$message({
                type: "warning",
                message: this.$t('videoQuery.recordEmpty')
              })
            } else {
              _this.replayVideos[_this.selectedIndex].isActive = false;
              _this.short_replay_visible = _this.replayVideos[_this.selectedIndex].isActive;
              _this.replayVideos[_this.selectedIndex].short_replay_visible = false;
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
      rePlayVideo() {
        let self = this;
        this.proxyTransport = 'true';
        this.recordPosition = '0';
        const cameraID = this.fileList[0].camera_id;
        let forward = this.fileList[0].forward;
        this.recordPosition = this.fileList[0].forward;
        this.fileStartTime = getUnixTime(this.fileList[0].starttime);
        // const beginTime = getUnixTime(this.fileList[0].starttime);
        // const endTime = getUnixTime(this.fileList[this.fileList.length - 1].endtime);
        const beginTime = (Math.round(new Date() / 1000) - this.autoShortTime * 60);
        const endTime = (Math.round(new Date() / 1000));
        Axios.get("/api/scms/iv/cmsproxy/rtsp/historicalVideoUrl?cameraId=" + cameraID + "&startTime=" + beginTime + "&endTime=" + endTime + "&forward=" + forward)
          .then(res => {
            if (res.data.code === 200) {
              let rtspUrl = res.data.data.rtspUrl;
              self.replayVideos[self.selectedIndex].rtspAddress = rtspUrl;
              self.replayVideos[self.selectedIndex].camera_id = cameraID;
              let replay = "replay";
              self.short_replay_visible = self.replayVideos[self.selectedIndex].isActive;
              self.replayVideos[self.selectedIndex].short_replay_visible = true;
              self.getVideoServerUrl(replay);
            } else {
              self.replayVideos[self.selectedIndex].isActive = false;
              self.short_replay_visible = self.replayVideos[self.selectedIndex].isActive;
              self.replayVideos[self.selectedIndex].short_replay_visible = false;
              self.shortReplayTitle = self.$t('videoReplay.ShortReplay')
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
      initReplayVideo: function (index) {
        var self = this;
        if (window.Streamedian) {
          let reStuHandler = function (currentProxy, err) {
            let curProxy = currentProxy.substring(0, currentProxy.indexOf("time"));
            console.log("curProxy", curProxy);
            for (var i = 0; i < self.replayVideos.length; i++) {
              if (curProxy == self.replayVideos[i]['rtspAddress'].substring(0, currentProxy.indexOf("time"))) {
                switch (err) {
                  case self.globalScmsVideoStatus.STATUS_REQUESTING_VIDEO:
                    self.replayVideos[i]["error"] = self.$t('请求数据') + self.videos[i]['camera_id'];
                    break;
                  case self.globalScmsVideoStatus.STATUS_REQUESTING_VIDEO_FAILED:
                    self.replayVideos[i]["error"] = self.$t('请求失败');
                    break;
                  case self.globalScmsVideoStatus.STATUS_INTERRUPT_TRYING_TO_RECONNECT_VIDEO:
                    self.replayVideos[i]["error"] = self.$t('尝试重连');
                    break;
                  case self.globalScmsVideoStatus.STATUS_RECONNECT_VIDEO:
                    self.reconnectWs(i);
                    break;
                  default:
                    self.replayVideos[i]["error"] = self.$t('接收数据') + " " + err.toFixed(2) + "kbps";
                    break;
                }
              }
            }
          };
          let reErrHandler = function (currentProxy, message) {
          };
          if (this.videoServerUrl == "") {
            this.$message({
              message: this.$t('videoReplay.videoNotSuccess')
            });
            return;
          }

          this.replayerOptions = {
            proxyTransport: this.proxyTransport,
            socket: this.videoServerUrl,
            redirectNativeMediaErrors: true,
            bufferDuration: 100,
            statuHandler: reStuHandler,
            errorHandler: reErrHandler,
            forward: this.recordPosition,
            reconnectTime: this.reconnectTime
          };
          $("video").bind("contextmenu", function () { // 取消右键事件
            return false;
          });
        }
      },
      configAndRePlayVideo() {
        this.replayVideos[this.selectedIndex].played = true;
        this.replayVideos[this.selectedIndex].error = "";
        this.setRePlayerSource(this.selectedIndex);
      },
      //replay可能有问题
      setRePlayerSource: function (index) {
        var videoname = "video_" + this.camera_id + "_replay";
        var html5Player = document.getElementById(videoname);
        var playname = "player_" + index + "_replay";
        console.log("replayVideos:", this.replayVideos);
        html5Player.src = this.replayVideos[index]['rtspAddress'];
        this.loadSliderCurTimeReplay(index);
        this.rePlayBox[playname] = window.Streamedian.player(videoname, this.replayerOptions);
      },
      loadSliderCurTimeReplay(index) {
        var videoname = "video_" + index + "_replay";
        var html5Player = document.getElementById(videoname);
        this.replayVideos[index].loadTime = setInterval(() => {
          console.log("currentTimeduration:" + html5Player.duration);
          console.log("currentTime:" + html5Player.currentTime);
          console.log("this.html5Player.error:" + html5Player.error);
          if (html5Player.currentTime >= html5Player.duration) {
            this.stopReplayVideo(index);
          }
        }, 1000)
      },
      stopReplayVideo: function(index) {
          this.reconnectTime = 0;
          var videoname = "video_" + index + "_replay";
          var html5Player = document.getElementById(videoname);
          html5Player.src = "";
          this.replayVideos[index].rtspAddress = "";
          this.replayVideos[index].played = false;
          this.replayVideos[index]["error"] = "";
          var playname = "player_" + index + "_replay";
          if (this.rePlayBox[playname] != null) {
            this.isLockReconnected = false;
            this.rePlayBox[playname].destroy(this.isLockReconnected);
            this.rePlayBox[playname] = null;
          }
        this.replayVideos[index].isActive = false;
          if (this.replayVideos[index].loadTime != null) {
            clearInterval(this.replayVideos[index].loadTime);
            this.replayVideos[index].loadTime = null;
          }
        this.short_replay_visible = this.replayVideos[index].isActive;
        this.replayVideos[index].short_replay_visible = false;
      }
    },
    deactivated() {
      window.removeEventListener('resize', this.onResize, true);
      window.removeEventListener("keydown", this.KeyDown, true)
    },

    created() {
      this.globalScmsVideoStatus = globalScmsVideoStatus
    }
  }
</script>

<style lang="scss" scoped>
  .videoDiv {
    width: 100%;
    height: 100%;
    position: relative;
  }

  .squared_ul {
    width: 100%;
    height: calc(100% - 35px);
    background-color: #000;
  }

  .squared_ul_full {
    width: 100%;
    height: 100%;
    background-color: #000;
  }

  .ul_handle {
    width: 100%;
    height: 100%;
    background-color: #323544;
    font-size: 24px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: #000;
  }

  .basic-operation-div-play-nomal {
    width: 100%;
    height: 35px;
  }

  .basic-operation-div-play-full {
    width: 100%;
    height: 5%;
    bottom: 39px;
    position: absolute;
    display: flex;
  }

  .ul_handle_all_diss {
    height: 100%;
    width: 100%;
    display: flex;
    display: none;
  }

  .ul_handle_div_full {
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
  }

  .quarter-div-mv16 {
    width: 25%;
    height: 25%;
    float: left;
    border: 1px solid #DDDDDD;
    position: relative;
    .quarter-div-mv16-replay {
      width: 50%;
      height: 50%;
      position: absolute;
      border: 1px solid #DDDDDD;
      right: 0px;
      bottom:0px;
      z-index:9999
    }
  }

  .quarter-div-mv9 {
    width: 33.33%;
    height: 33.33%;
    float: left;
    border: 1px solid #DDDDDD;
    position: relative;
    .quarter-div-mv9-replay {
      width: 50%;
      height: 50%;
      border: 1px solid #DDDDDD;
      right: 0px;
      bottom:0px;
      position: absolute;
      z-index:9999
    }
  }

  .stream-icon {
    margin: 0.5% 10px 0 20px;
    font-size: 22px;
    color: white;
    float: right;
  }

  .quarter-div-mv6-1 {
    width: 66.66%;
    height: 66.6%;
    float: left;
    border: 1px solid #DDDDDD;
    position: relative;
    .quarter-div-mv6-1-replay {
      width: 50%;
      height: 50%;
      border: 1px solid #DDDDDD;
      right:0px;
      bottom:0px;
      position: absolute;
      z-index:9999
    }
  }

  .quarter-div-mv4 {
    width: 50%;
    height: 50%;
    float: left;
    position: relative;
    border: 1px solid #DDDDDD;
    .quarter-div-mv4-replay {
      width: 50%;
      height:50%;
      border: 1px solid #DDDDDD;
      right:0px;
      bottom:0px;
      position: absolute;
      z-index:9999
    }
  }

  .quarter-div-mv {
    width: 100%;
    height: 100%;
    border: 1px solid #DDDDDD;
    position: relative;
    .quarter-div-mv-replay {
      width: 50%;
      height: 50%;
      border: 1px solid #DDDDDD;
      right:0px;
      bottom:0px;
      position: absolute;
      z-index:9999
    }
  }

  .quarter-div-mv-inner {
    width: 100%;
    height: 100%;
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
  .errorReplayStatus {
    color: #ffffff;
    width: 100%;
    height: 40px;
    bottom: 40px;
    position: relative;
    line-height: 40px;
    padding-left: 10px;
    font-size: 10px;
    font-family: MicrosoftYaHei;
    background: rgba(0, 0, 0, 0.2);
  }

  .icon-font {
    color: #fff;
    font-size: 24px !important;
    margin-left: 16px;
  }

  .icon-font:hover {
    color: #48A5F6
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

  .basic-operation-inner-div {
    width: 100%;
    height: 40px;
    position: relative;
    bottom: 40px;
    font-size: 0px;
    margin-top: -80px;
  }
  .basic-operation-inner-div-replay {
    width: 100%;
    height: 40px;
    position: relative;
    bottom: 40px;
    font-size: 0px;
    margin-top: -60px;
  }

  .operation_inner_enter_nomal {
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
  }
  .operation_inner_enter_nomal_replay {
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.2);
  }

  .operation_inner_enter_diss {
    height: 100%;
    width: 100%;
    display: none;
  }
  .operation_inner_enter_diss_replay {
    height: 100%;
    width: 100%;
    display: none;
  }

  .current {
    border: 1px solid #249BFF;
  }

  .current_inner {
    border: 0px;
  }

  video {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    object-fit: fill;
  }

  .video-list-play {
    float: left;
    height: 100%;
    width: 45%;
    margin-left: 0.5%;
    display: flex; //
    //justify-content: center;//垂直居中
    align-items: center; //水平居中
    //visibility: hidden;    /*隐藏-占位*/
  }

  .showPlay {
    visibility: visible; /*显示-占位*/
  }

  .hidePlay {
    visibility: hidden; /*隐藏-占位*/
  }

  .multi-screen-video-div {
    float: left;
    width: 18%;
    height: 100%;
    margin-left: 10px;
  }
  .multi-screen-video-div-full {
    float: left;
    width: 18%;
    height: 100%;
    margin-left: 10px;
  }

  .el-icon-1-normal {
    margin-top: 4%;
    margin-left: 20px;
    float: left;
    width: 25px;
    height: 24px;
    background: url("./icons/video/1_normal.png") center no-repeat;
  }

  .one-active {
    background: url("./icons/video/1_down.png") center no-repeat;
  }

  .el-icon-1-normal:hover {
    background: url("./icons/video/1_down.png") center no-repeat;
  }

  .el-icon-4-normal {
    margin-top: 4%;
    margin-left: 20px;
    float: left;
    width: 25px;
    height: 24px;
    background: url("./icons/video/4_normal.png") center no-repeat;
  }

  .el-icon-4-normal:hover {
    background: url("./icons/video/4_down.png") center no-repeat;
  }

  .el-icon-6-normal {
    margin-top: 4%;
    margin-left: 20px;
    float: left;
    width: 25px;
    height: 24px;
    background: url("./icons/video/6_normal.png") center no-repeat;
  }

  .el-icon-6-normal:hover {
    background: url("./icons/bayonet/sixSelected.png") center no-repeat;
  }

  .six-active {
    background: url("./icons/bayonet/sixSelected.png") center no-repeat;
  }

  .four-active {
    background: url("./icons/video/4_down.png") center no-repeat;
  }

  .el-icon-9-normal {
    margin-top: 4%;
    margin-left: 20px;
    float: left;
    width: 25px;
    height: 24px;
    background: url("./icons/video/9_normal.png") center no-repeat;
  }

  .el-icon-9-normal:hover {
    background: url("./icons/video/9_down.png") center no-repeat;
  }

  .nine-active {
    background: url("./icons/video/9_down.png") center no-repeat;
  }

  .el-icon-16-normal {
    margin-top: 4%;
    margin-left: 20px;
    float: left;
    width: 25px;
    height: 24px;
    background: url("./icons/video/16_normal.png") center no-repeat;
  }

  .el-icon-16-normal:hover {
    background: url("./icons/video/16_down.png") center no-repeat;
  }

  .sixteen-active {
    background: url("./icons/video/16_down.png") center no-repeat;
  }

  .basic-operation-div {
    display: flex;
    align-items: center;
    float: right;
    height: 100%;
    margin: 0 30px 0 0;
  }

  .el-icon-camera-pl {
    margin-left: 20px;
    width: 24px;
    height: 24px;
    /*background: url("./icons/video/camera_normal.png") center no-repeat;*/
  }

  .el-icon-mic-pl {
    margin-left: 20px;
  }

  .el-icon-camera-pl-inner {
    margin-top: 0.35%;
    float: right;
    margin-right: 20px;
  }

  .icon-inner-dereticon {
    float: right;
    margin-right: 20px;
  }
  .icon-inner-dereticon-left {
    float: left;
    margin-right: 20px;
  }
  /*.el-icon-camera-normal-pl {*/
  /*background: url("./icons/video/camera_normal.png") center no-repeat;*/
  /*}*/

  /*.el-icon-camera-normal-pl:hover {*/
  /*background: url("./icons/video/camera_down.png") center no-repeat;*/
  /*}*/

  .all-screen-video {
    margin-left: 20px;
    width: 20px;
    height: 20px;
    background: url("./icons/video/all_screen.png") center no-repeat;

    &:hover {
      background: url("./icons/video/all_screen_active.png") center no-repeat;
    }
  }

  .out-short-replay {
    margin-left: 20px;
    width: 20px;
    height: 20px;
    background: url("./icons/video/short_replay_close.png") center no-repeat;

    &:hover {
      background: url("./icons/video/short_replay_close_active.png") center no-repeat;
    }
  }
  .short-replay {
    margin-left: 20px; display: none;
    width: 20px;
    height: 20px;
    background: url("./icons/video/short_replay_open.png") center no-repeat;

    &:hover {
      background: url("./icons/video/short_replay_open_active.png") center no-repeat;
    }
  }
     .enable-voc {
       margin-left: 20px;
       width: 22px;
       height: 22px;
       background: url("./icons/video/close-voice.png") center no-repeat;

       &:hover {
         background: url("./icons/video/close-voice-active.png") center no-repeat;
       }
     }
      .uenable-voc{
        margin-left: 20px;
        width: 22px;
        height: 22px;
        background: url("./icons/video/open-voice.png") center no-repeat;

        &:hover {
          background: url("./icons/video/open-voice-active.png") center no-repeat;
        }
      }

  .out-all-screen-video {
    margin-left: 20px;
    width: 20px;
    height: 20px;
    background: url("./icons/video/out_all_screen.png") center no-repeat;

    &:hover {
      background: url("./icons/video/out_all_screen_active.png") center no-repeat;
    }
  }

  .el-icon-stop-inner {
    margin-top: 0.5%;
    float: right;
    width: 20px;
    margin-right: 8%;
    height: 20px;
    background: url("./icons/video/stop_all.png") center no-repeat;
  }

  .el-icon-stop-inner:hover {
    background: url("./icons/video/stop_all_down.png") center no-repeat;
  }

  .el-icon-stop-video {
    margin-left: 20px;
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
