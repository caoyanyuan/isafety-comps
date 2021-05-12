export function getCurrentDate() {
    var date = new Date();
    var seperator = ":";
    return date.getHours() + seperator + date.getMinutes() + seperator + date.getSeconds();
  }
  
  export function wideTraversal(node, preOnly) {
    let quen = []; // 用来遍历的数组
    // let result = []; // 遍历的结果
    quen.push(node);
    // 从队列取，然后再追加
    for (let i = 0; i < quen.length; i++) {
      let k = quen[i];
      if (k.children.length) {
        if (preOnly) { // 仅仅是局站
          quen = quen.concat(k.children.filter(t => t.type != 3 && t.type != 5));
        } else { // 所有节点
          quen = quen.concat(k.children);
        }
      }
    }
    return quen;
  }
  
  // type 0 本域根节点 1 本域局站   2 子域根节点    3本域摄像头    4 子域局站  5 子域摄像头
  export function differ(oldCameras, newCameras) {
    if (oldCameras.length != newCameras.length) {
      // console.log("len not equal " + oldCameras.length + ", " + newCameras.length)
      return true;
    } else {
      oldCameras.sort(function (a, b) {
        if (a.deviceId == b.deviceId) {
          return 0;
        } else if (a.deviceId > b.deviceId) {
          return 1;
        } else {
          return -1;
        }
      });
      // console.log(oldCameras);
      newCameras.sort(function (a, b) {
        if (a.deviceId == b.deviceId) {
          return 0;
        } else if (a.deviceId > b.deviceId) {
          return 1;
        } else {
          return -1;
        }
      });
      // console.log(newCameras);
      for (let i = 0; i < oldCameras.length; i++) {
        if (oldCameras[i].deviceId != newCameras[i].deviceId ||
          oldCameras[i].deviceName != newCameras[i].deviceName ||
          oldCameras[i].state != newCameras[i].state) {
          return true;
        }
      }
      return false;
    }
  }
  
  // 建立子域的局站树
  export function buildDomainTree(domainName, precincts) {
    console.log("build-tree begin--" + precincts.length);
    precincts = precincts.map(v =>
      Object.assign({}, v, {
        children: [],
        label: v.precinctName,
        deviceId: v.precinctId,
        totalNum: 0,
        onlineNum: 0,
        type: 4,
        loadFlag: false
      })
    );
    // 先找到根节点
    let top = [];
    precincts.forEach(pre => {
      let ups = precincts.filter(t => t.precinctId === pre.upPrecinctId);
      if (ups.length == 0) {
        // console.log("---find top precinct:" + pre.precinctId);
        top.push(pre);
      }
    })
    // console.log("top is: " + JSON.stringify(top));
    // 查找子节点
    const find = (nodes) => {
      nodes.map(v => {
        // console.log("find preid:" + v.precinctId);
        let add = precincts.filter(t => v.precinctId === t.upPrecinctId);
        // console.log("domain add: " + add.length);
        v.isLeaf = false;
        // 局站id为子域id+局站id 防止id冲突
        v.deviceId = v.precinctId + "@" + domainName;
        if (add.length > 0) {
          find(add);
        }
        v.children = v.children.concat(add);
        return v;
      });
      return nodes;
    }
    let res = find(top);
    console.log("res: " + JSON.stringify(res));
    console.log("build-tree end--");
    return res;
  }
  
  // 将区域树组成树形结构
  export function buildSelfTree(precincts) {
    console.log("build-self-tree begin--");
    if (precincts == undefined || precincts == null) {
      return;
    }
  
    precincts = precincts.map(v =>
      Object.assign({}, v, {
        children: [],
        label: v.precinctName,
        deviceId: v.precinctId,
        type: v.precinctKind == "1" ? 0 : 1, // 0本域根节点， 1本域非根节点
        loadFlag: false,
        totalNum: 0,
        onlineNum: 0,
        isLeaf: false
      })
    );
    let roots = precincts.filter(v => v.upPrecinctId === '0');
    const transform = (nodes) => {
      nodes.map(v => {
        let add = precincts.filter(t => v.precinctId === t.upPrecinctId);
        if (add.length > 0) {
          transform(add);
        }
        v.children = v.children.concat(add);
        v.deviceId = v.precinctId;
        v.type = 1;
        return v;
      });
      return nodes;
    };
    roots = transform(roots);
    console.log("build-self-tree end--");
    return roots;
  }
  
  export function calculateOnline(root) {
    const calculate = node => {
      if (node.type == 3 || node.type == 5) { // 摄像头则判断状态
        let ret = {"num": 1, "online": 0};
        ret.online = node.state != '1' && node.state != '2' ? 1 : 0;
        // console.log("camera " + node.label + ":" + JSON.stringify(ret));
        return ret;
      } else if (node.type == 1 || node.type == 4 || node.type == 0 || node.type == 2) { // 局站
        let ret = {"num": 0, "online": 0};
        node.children.forEach(child => {
          let t = calculate(child)
          ret.num += t.num;
          ret.online += t.online;
        });
        node.onlineNum = ret.online;
        node.totalNum = ret.num;
        // 子域根节点更新
        if (node.type == 2) {
          root.onlineNum = ret.online;
          root.totalNum = ret.num;
        }
        // console.log("pre " + node.label + ":" + node.onlineNum + ", " + node.totalNum + ", " + JSON.stringify(ret));
        return ret;
      } else {
        console.log("invalid------------------");
      }
    };
    calculate(root);
    console.log("calculate finished ");
  }
  
  export function getIconUrl(node, dark) {
    let iconurl;
    if (node.type == 0) { // 本域根节点
      iconurl = dark ? require("@/components/rtsp-wall/icons/vedioTree/center.png") : require("@/components/rtsp-wall/icons/vedioTree/center_black.png");
    } else if (node.type == 2) { // 子域根节点
      iconurl = dark ? require("@/components/rtsp-wall/icons/vedioTree/computer.png") : require("@/components/rtsp-wall/icons/vedioTree/computer_black.png");
    } else if (node.type == 1 || node.type == 4) { // 子局站
      iconurl = dark ? require("@/components/rtsp-wall/icons/vedioTree/house.png") : require("@/components/rtsp-wall/icons/vedioTree/house_black.png");
    } else if (node.type == 3 || node.type == 5) { // 摄像头
      switch (node.deviceType) {
        case "120100":
          iconurl = dark ? require("@/components/rtsp-wall/icons/vedioTree/sider_qiuji.png") : require("@/components/rtsp-wall/icons/vedioTree/sider_qiuji_black.png");
          break;
        case "120200":
          iconurl = dark ? require("@/components/rtsp-wall/icons/vedioTree/sider_banqiu.png") : require("@/components/rtsp-wall/icons/vedioTree/sider_qiuji_black.png");
          break;
        case "110400":
          iconurl = dark ? require("@/components/rtsp-wall/icons/vedioTree/sider_kakou.png") : require("@/components/rtsp-wall/icons/vedioTree/sider_kakou_black.png");
          break;
        default:
          iconurl = dark ? require("@/components/rtsp-wall/icons/vedioTree/sider_qiuji.png") : require("@/components/rtsp-wall/icons/vedioTree/sider_qiuji_black.png");
      }
    } else {
      console.log("invalid node type------" + node.type);
    }
    return iconurl;
  }
  