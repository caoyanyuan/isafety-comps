import crawl from "tree-crawl";

/**
 * 时间戳
 * @param dateStr
 * @returns {string}
 */
export const getUnixTime = function (dateStr) {
  let newstr = dateStr.replace(/-/g, "/");
  let date = new Date(newstr);
  let timestr = date.getTime().toString();
  return timestr.substr(0, 10);
};

/**
 * 保留两位小数
 * 功能：将浮点数四舍五入，取小数点后2位
 */

export const toDecimal = function (x) {
  var f = parseFloat(x);
  if (isNaN(f)) {
    return;
  }
  f = Math.round(x * 100) / 100;
  return f;
};

/**
 * 数组根据数组对象中的某个属性值进行排序的方法
 * 使用例子：newArray.sort(sortBy('number',false)) //表示根据number属性降序排列;若第二个参数不传递，默认表示升序排序
 * @param attr 排序的属性 如number属性
 * @param rev true表示升序排列，false降序排序
 */
export const sortTableData = function (attr, rev) {
  if (rev == undefined) {
    rev = 1;
  } else {
    rev = rev ? 1 : -1;
  }

  return function (a, b) {
    a = a[attr];
    b = b[attr];
    if (a < b) {
      return rev * -1;
    }
    if (a > b) {
      return rev * 1;
    }
    return 0;
  };
};

/**
 * 数组是否包含另一个数组
 */

export const checkArrContain = function (arr1, arr2) {
  var arr3 = [];
  for (var i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) > -1) {
      arr3.push(arr2[i])
    }
  }
  if (arr3.length == arr2.length) {
    return true;
  } else {
    return false;
  }
}

export const timeStampToFormatDate = function (timestamp, formats) {
  // formats格式包括
  // 1. Y-m-d
  // 2. Y-m-d H:i:s
  // 3. Y年m月d日
  // 4. Y年m月d日 H时i分
  formats = formats || "Y-m-d";

  var zero = function (value) {
    if (value < 10) {
      return "0" + value;
    }
    return value;
  };

  var myDate = timestamp ? new Date(timestamp) : new Date();

  var year = myDate.getFullYear();
  var month = zero(myDate.getMonth() + 1);
  var day = zero(myDate.getDate());

  var hour = zero(myDate.getHours());
  var minite = zero(myDate.getMinutes());
  var second = zero(myDate.getSeconds());

  return formats.replace(/Y|m|d|H|i|s/gi, function (matches) {
    return {
      Y: year,
      m: month,
      d: day,
      H: hour,
      i: minite,
      s: second
    }[matches];
  });
};
/**
 * 处理设备树数据
 * @param flag
 * @returns {string}
 */
export const convertData = function (datas) {
  if (datas === undefined || datas.precincts === undefined) {
    return;
  }
  let precincts = datas.precincts;
  precincts = precincts.map(v =>
    Object.assign({}, v, {
      children: [],
      label: v.precinctName,
      deviceId: v.precinctId,
      state: "-1",
      icon:
        v.precinctKind === "1"
          ? require("@/components/rtsp-wall/icons/vedioTree/center_black.png")
          : require("@/components/rtsp-wall/icons/vedioTree/house_black.png")
    })
  );
  /* 转换element tree所需结构数据 */
  let roots = precincts.filter(v => v.upPrecinctId === "0");
  const transform = nodes => {
    nodes.map(v => {
      v.children = precincts.filter(t => v.precinctId === t.upPrecinctId);
      transform(v.children);
      return v;
    });
    return nodes;
  };
  roots = transform(roots);
  let cameras = datas.cameras;
  let iconUrl;
  cameras = cameras.map(v => {
    // 匹配设备树图标
    switch (v.deviceType) {
      case "120100":
        iconUrl = require("@/components/rtsp-wall/icons/vedioTree/sider_qiuji_black.png");
        break;
      case "120200":
        iconUrl = require("@/components/rtsp-wall/icons/vedioTree/sider_banqiu_black.png");
        break;
      case "110400":
        iconUrl = require("@/components/rtsp-wall/icons/vedioTree/sider_kakou_black.png");
        break;
      default:
        iconUrl = require("@/components/rtsp-wall/icons/vedioTree/sider_qiuji_black.png");
    }
    return Object.assign({}, v, {
      label: v.deviceName,
      icon: iconUrl
    });
  });

  const setcamera = nodes => {
    nodes.map(v => {
      if (v.hasOwnProperty("children")) {
        for (let i = 0; i < cameras.length; i++) {
          const ci = cameras[i];
          if (ci.precinctId === v.precinctId) {
            v.children.push(ci);
          }
        }
        setcamera(v.children);
      }
    });
    return nodes;
  };
  roots = setcamera(roots);
  let domians = datas.subDomians;
  domians = domians.map(v =>
    Object.assign({}, v, {
      children: [],
      label: v.name,
      deviceId: v.precinctId,
      state: "-1",
      icon: require("@/components/rtsp-wall/icons/vedioTree/computer_black.png"),
      type: "domians"
    })
  );
  roots = roots.concat(domians);
  return roots;
};

export const convertDataBlack = function (datas) {
  if (datas === undefined || datas.precincts === undefined) {
    return;
  }
  let precincts = datas.precincts;
  precincts = precincts.map(v =>
    Object.assign({}, v, {
      children: [],
      label: v.precinctName,
      deviceId: v.precinctId,
      state: "-1",
      icon:
        v.precinctKind === "1"
          ? require("@/components/rtsp-wall/icons/vedioTree/center.png")
          : require("@/components/rtsp-wall/icons/vedioTree/house.png")
    })
  );
  /* 转换element tree所需结构数据 */
  let roots = precincts.filter(v => v.upPrecinctId === "0");
  const transform = nodes => {
    nodes.map(v => {
      v.children = precincts.filter(t => v.precinctId === t.upPrecinctId);
      transform(v.children);
      return v;
    });
    return nodes;
  };
  roots = transform(roots);
  let cameras = datas.cameras;
  let iconurl;
  cameras = cameras.map(v => {
    switch (v.deviceType) {
      case "120100":
        iconurl = require("@/components/rtsp-wall/icons/vedioTree/sider_qiuji.png");
        break;
      case "120200":
        iconurl = require("@/components/rtsp-wall/icons/vedioTree/sider_banqiu.png");
        break;
      case "110400":
        iconurl = require("@/components/rtsp-wall/icons/vedioTree/sider_kakou.png");
        break;
      default:
        iconurl = require("@/components/rtsp-wall/icons/vedioTree/sider_qiuji.png");
    }
    return Object.assign({}, v, {
      label: v.deviceName,
      icon: iconurl
    });
  });

  const setcamera = nodes => {
    nodes.map(v => {
      if (v.hasOwnProperty("children")) {
        for (let i = 0; i < cameras.length; i++) {
          const ci = cameras[i];
          if (ci.precinctId === v.precinctId) {
            v.children.push(ci);
          }
        }
        setcamera(v.children);
      }
    });
    return nodes;
  };
  roots = setcamera(roots);
  let domians = datas.subDomians;
  domians = domians.map(v =>
    Object.assign({}, v, {
      children: [],
      label: v.name,
      deviceId: v.precinctId,
      state: "-1",
      icon: require("@/components/rtsp-wall/icons/vedioTree/computer.png"),
      type: "domians"
    })
  );
  roots = roots.concat(domians);
  return roots;
};

export const checkFull = function () {
  var isFull = !!(
    document.webkitIsFullScreen ||
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement ||
    document.mozFullScreenElement ||
    null
  );
  return isFull;
};

/**
 * 设备树子域树数据处理
 * @param treedata
 * @returns {*}
 */
export function convertDomainData(treedata, type) {
  const precincts = treedata.precincts;
  let cameras = treedata.cameras;
  let count = 0;
  const len = cameras.length;
  for (let i = 0; i < cameras.length; i++) {
    const ci = cameras[i];
    if (ci.state === "0") {
      count++;
    }
  }
  const datas = precincts.map(v => {
    // console.log(v)
    return Object.assign({}, v, {
      children: [],
      label: v.precinctName,
      // label: v.precinctName + "(" + count + "/" + len + ")",
      // label: v.upPrecinctId == 1 ? v.precinctName : v.precinctName + "(" + count + "/" + len + ")",
      icon:
        type == "videoTree"
          ? require("@/components/rtsp-wall/icons/vedioTree/house_black.png")
          : require("@/components/rtsp-wall/icons/vedioTree/house.png")
    });
  });
  const roots = datas.filter(v => v.upPrecinctId === "0");
  const transform = nodes => {
    nodes.map(v => {
      v.children = datas.filter(t => v.precinctId === t.upPrecinctId);
      let arr = JSON.parse(JSON.stringify(v.children))
      arr = arr.filter(el => el.state == "0")
      v.label = v.upPrecinctId === "0" ? v.precinctName + "(" + count + "/" + len + ")" : `${v.precinctName}(${arr.length}/${v.children.length})`
      console.log(v)
      transform(v.children);
      return v;
    });
    return nodes;
  };
  // const children = transform(roots)[0].children;
  const children = transform(roots);
  let iconUrl;
  cameras = cameras.map(v => {
    // 匹配设备树图标
    switch (v.deviceType) {
      case "120100":
        iconUrl =
          type == "videoTree"
            ? require("@/components/rtsp-wall/icons/vedioTree/sider_qiuji_black.png")
            : require("@/components/rtsp-wall/icons/vedioTree/sider_qiuji.png");
        break;
      case "120200":
        iconUrl =
          type == "videoTree"
            ? require("@/components/rtsp-wall/icons/vedioTree/sider_banqiu_black.png")
            : require("@/components/rtsp-wall/icons/vedioTree/sider_banqiu.png");
        break;
      case "110400":
        iconUrl =
          type == "videoTree"
            ? require("@/components/rtsp-wall/icons/vedioTree/sider_kakou_black.png")
            : require("@/components/rtsp-wall/icons/vedioTree/sider_kakou.png");
        break;
      default:
        iconUrl =
          type == "videoTree"
            ? require("@/components/rtsp-wall/icons/vedioTree/sider_qiuji_black.png")
            : require("@/components/rtsp-wall/icons/vedioTree/sider_qiuji.png");
    }
    return Object.assign({}, v, {
      label: v.deviceName,
      icon: iconUrl
    });
  });
  const setcamera = nodes => {
    nodes.map(v => {
      if (v.hasOwnProperty("children")) {
        for (let i = 0; i < cameras.length; i++) {
          const ci = cameras[i];
          if (ci.precinctId === v.precinctId) {
            v.children.push(ci);
            let arr = JSON.parse(JSON.stringify(v.children))
            arr = arr.filter(el => el.state == "0")
            v.label = `${v.precinctName}(${arr.length}/${v.children.length})`
          }
        }
        setcamera(v.children);
      }
    });
    return nodes;
  };
  return setcamera(children);
}

/**
 * 电视墙设备树数据处理
 * @param treedata
 * @returns {*}
 */
export const convertTvWallDatas = function (datas) {
  if (datas === undefined || datas.precincts === undefined) {
    return;
  }
  let precincts = datas.precincts;
  precincts = precincts.map(v =>
    Object.assign({}, v, {
      children: [],
      label: v.precinctName,
      deviceId: v.precinctId,
      state: "-1",
      icon:
        v.precinctKind === "1"
          ? require("@/components/rtsp-wall/icons/vedioTree/center_black.png")
          : require("@/components/rtsp-wall/icons/vedioTree/house_black.png")
    })
  );
  /* 转换element tree所需结构数据 */
  let roots = precincts.filter(v => v.upPrecinctId === "0");
  const transform = nodes => {
    nodes.map(v => {
      v.children = precincts.filter(t => v.precinctId === t.upPrecinctId);
      transform(v.children);
      return v;
    });
    return nodes;
  };
  roots = transform(roots);
  let tvWalls = datas.tvWalls;
  tvWalls = tvWalls.map(v => {
    return Object.assign({}, v, {
      label: v.deviceName,
      icon: `<i class="iconfont iconmenu_dianshiqiangguanli"  style="font-size: 18px;margin-right: 10px"></i>`
    });
  });

  const setcamera = nodes => {
    nodes.map(v => {
      if (v.hasOwnProperty("children")) {
        for (let i = 0; i < tvWalls.length; i++) {
          const ci = tvWalls[i];
          if (ci.precinctId === v.precinctId) {
            v.children.push(ci);
          }
        }
        setcamera(v.children);
      }
    });
    return nodes;
  };
  roots = setcamera(roots);
  return roots;
};

/**
 * 遍历树的每个节点
 * @param treedata
 * @param childrenKey
 * @param callback
 * @returns {*|m.data}
 */
export const eachTreeData = function (treedata, childrenKey, callback) {
  if (typeof childrenKey !== "string") {
    callback = childrenKey;
    childrenKey = "children";
  }

  if (treedata.push) {
    treedata = {[childrenKey]: treedata};
  }

  crawl(
    treedata,
    (node, context) => {
      callback(node, context);
    },
    {
      getChildren(node) {
        node.children = node[childrenKey];
        return node[childrenKey];
      }
    }
  );
}

/**
 * 从树形结构中查找符合条件的节点
 * @param condi 查找条件 如{id:"foo"}, {id:"foo", age:7}
 * @param tree
 * @param childrenKey
 * @returns {*}
 */
export function findNodeFormTree(condi, tree, childrenKey) {
  let ret;
  eachTreeData(tree, childrenKey, function (node, ctx) {
    for (var k in condi) {
      if (node[k] != condi[k]) {
        return;
      }
    }
    ret = node;
    ctx.break();
  })
  return ret;
}

/**
 * 从树形结构中查找符合条件的所有节点
 * @param condi 查找条件 如{id:"foo"}, {id:"foo", age:7}
 * @param tree
 * @param childrenKey
 * @returns {*}
 */
export function findAllNodeFormTree(condi, tree, childrenKey) {
  let ret=[];
  eachTreeData(tree, childrenKey, function (node, ctx) {
    for (var k in condi) {
      if (node[k] != condi[k]) {
        return;
      }
    }
    //ret = node;
    //ctx.break();
    ret.push(node)
  })
  return ret;
}

/**
 * 参考 findNodeFormTree 和 eachTreeDataWithLocal
 * @param condi
 * @param treeWithLocal
 * @param childrenKey
 */
export function findNodeFormTreeWithLocal(condi, treeWithLocal, childrenKey) {
  let ret = {};
  for (var k in treeWithLocal) {
    ret[k] = findNodeFormTree(condi, treeWithLocal[k], childrenKey)
  }
  return ret;
}

/**
 * 遍历形如这种结构的树
 * {
 *     list_a: ...tree1,
 *     list_b:...tree2,
 *     ...
 * }
 * @param localData
 * @param childrenKey
 * @param callback
 */
export const eachTreeDataWithLocal = function (localData, childrenKey, callback) {
  Object.values(localData).forEach(treedata => {
    eachTreeData(treedata, childrenKey, callback)
  })
}
// 异常告警字典数据
export function abnormalAlarm(type) {
  switch (type) {
    case 100:
      return "设备连接中断";
    case 101:
      return "CPU异常";
    case 102:
      return "内存异常";
    case 103:
      return "上行流量过高";
    case 104:
      return "下行流量过高";
    case 2:
      return "硬盘满异常";
    case 41:
      return "服务器线程无响应";
    case 45:
      return "视频存储异常";
    case 46:
      return "视频转发异常";
    case 5:
      return "硬盘未格式化";
    case 6:
      return "读写硬盘出错";
    case 8:
      return "前端升级";
    case 9:
      return "非法访问";
    case 42:
      return "数据库异常";
    case 43:
      return "存储服务器无数据接收";
    case 44:
      return "转发服务器向前端PU申请视频失败";
    case 47:
      return "数据库性能异常";
    case 48:
      return "中心缓冲区满";
    case 49:
      return "存储磁盘写性能异常";
    case 50:
      return "丢包率过高";
    case 51:
      return "硬盘满预警";
    case 91:
      return "搜星失败";
    case 105:
      return "网络延时大";
    case 53:
      return "硬盘块错误";
    case 54:
      return "磁盘写性能异常";
    case 61:
      return "无可用存储空间";
    case 56:
      return "请求视频路由失败";
    case 201:
      return "中心服务器每秒告警数超出一般阈值告警";
    case 203:
      return "中心服务器每秒异常数超出一般阈值告警";
    case 205:
      return "中心服务器每秒请求数超出一般阈值告警";
    case 207:
      return "单台中心服务器管理设备数超出一般阈值告警";
    case 209:
      return "前端设备在线率超出一般阈值告警";
    case 211:
      return "数据库缓存命中率低于一般阈值告警";
    case 213:
      return "锁进程占用率超出一般阈值告警";
    case 215:
      return "设备在线率低于一般阈值告警";
    case 217:
      return "每秒请求数超出一般阈值告警";
    case 219:
      return "单台接入设备数超出一般阈值告警";
    case 221:
      return "视频转发失败率超出一般阈值告警";
    case 223:
      return "单台服务器转发数超出一般阈值告警";
    case 225:
      return "存储失败率超出一般阈值告警";
    case 227:
      return "存储丢包率超出一般阈值告警";
    case 229:
      return "磁盘空间空闲率低于一般阈值告警";
    case 231:
      return "转码请求失败率超出一般阈值告警";
    case 233:
      return "主机CPU利用率超出一般阈值告警";
    case 202:
      return "中心服务器每秒告警数超出重要阈值告警";
    case 204:
      return "中心服务器每秒异常数超出重要阈值告警";
    case 206:
      return "中心服务器每秒请求数超出重要阈值告警";
    case 208:
      return "单台中心服务器管理设备数超出重要阈值告警";
    case 210:
      return "前端设备在线率超出重要阈值告警";
    case 212:
      return "数据库缓存命中率低于重要阈值告警";
    case 214:
      return "锁进程占用率超出重要阈值告警";
    case 216:
      return "设备在线率低于重要阈值告警";
    case 218:
      return "每秒请求数超出重要阈值告警";
    case 220:
      return "单台接入设备数超出重要阈值告警";
    case 222:
      return "视频转发失败率超出重要阈值告警";
    case 224:
      return "单台服务器转发数超出重要阈值告警";
    case 226:
      return "存储失败率超出重要阈值告警";
    case 228:
      return "存储丢包率超出重要阈值告警";
    case 230:
      return "磁盘空间空闲率低于重要阈值告警";
    case 232:
      return "转码请求失败率超出重要阈值告警";
    case 234:
      return "主机CPU利用率超出重要阈值告警";
    case 235:
      return "CPU利用率超出一般阈值告警";
    case 236:
      return "CPU利用率超出重要阈值告警";
    case 237:
      return "内存利用率超出一般阈值告警";
    case 238:
      return "内存利用率超出重要阈值告警";
    case 239:
      return "上行流量超出一般阈值告警";
    case 240:
      return "上行流量超出重要阈值告警";
    case 241:
      return "下行流量超出一般阈值告警";
    case 242:
      return "下行流量超出重要阈值告警";
    case 243:
      return "网络延时超出一般阈值告警";
    case 244:
      return "网络延时超出重要阈值告警";
    case 57:
      return "连接转发服务器失败";
    case 58:
      return "前端PU故障";
    case 59:
      return "设备连接中断";
    case 60:
      return "服务程序无响应";
    case 8002:
      return "电源正常工作";
    case 8003:
      return "主柜温度超出关机阈值";
    case 8004:
      return "主柜温度超出警告阈值";
    case 8005:
      return "主柜温度正常";
    case 8006:
      return "主柜温度在主要范围内";
    case 8007:
      return "风扇停止工作";
    case 8008:
      return "风扇开始工作";
    case 8009:
      return "坏盘出现";
    case 8010:
      return "磁盘拔出";
    case 8011:
      return "磁盘插入";
    case 8012:
      return "扩展柜磁盘拔出";
    case 8013:
      return "扩展柜磁盘插入 磁盘组恢复正常";
    case 8014:
      return "连接扩展柜磁盘成功";
    case 8015:
      return "磁盘组降级模式，丢失磁盘";
    case 8016:
      return "磁盘组恢复正常工作";
    case 8017:
      return "吉比特以太链路正常工作";
    case 8018:
      return "开始重建磁盘组";
    case 8019:
      return "磁盘组重建完成";
    case 8020:
      return "磁盘组重建失败";
    case 8021:
      return "CIFS服务失败或者中断";
    case 8022:
      return "NFS服务失败或者中断";
    case 8023:
      return "ISCSI服务失败或者中断";
    case 8024:
      return "磁盘出现IO错误";
    case 8025:
      return "备用磁盘出现IO错误";
    case 8026:
      return "系统NAS Shell不可用";
    case 8027:
      return "控制器操作状态是关机状态";
    case 8028:
      return "控制器操作状态是启动状态";
    case 8029:
      return "控制器重启";
    case 8036:
      return "吉比特以太链路不能正常工作";
    case 8040:
      return "主柜CCP电压点越界";
    case 8041:
      return "主柜CCP电压点正常";
    case 8042:
      return "主柜3.3伏电压点越界";
    case 8043:
      return "主柜3.3伏电压点正常";
    case 8044:
      return "主柜5伏电压点越界";
    case 8045:
      return "主柜5伏电压点正常";
    case 8046:
      return "主柜12伏电压点越界";
    case 8047:
      return "主柜12伏电压点正常";
    case 8049:
      return "坏盘移除";
    case 8050:
      return "控制器STONITH另一控制器";
    case 8051:
      return "远端控制器宕机，磁盘组被本地控制器接管";
    case 8053:
      return "电池模块发生故障";
    case 8054:
      return "HDM电源正常状态";
    case 8055:
      return "HDM电源不能正常工作状态";
    case 8058:
      return "RAM发生ECC Error";
    case 8059:
      return "磁盘组不健全";
    case 8062:
      return "电池充电器故障";
    case 8063:
      return "电池未提供";
    case 8064:
      return "电池电量小于20%";
    case 8065:
      return "电池不能正常工作";
    case 8066:
      return "电池不确定故障";
    case 8067:
      return "电池未提供或坏";
    case 8068:
      return "Fail-Over失败";
    case 8070:
      return "主柜电源直流电供电正常";
    case 8071:
      return "主柜电源直流电供电不正常";
    case 8072:
      return "主柜电源交流电供电正常";
    case 8073:
      return "主柜电源交流电供电不正常";
    case 8074:
      return "从柜加入系统";
    case 8075:
      return "从柜移除";
    case 8078:
      return "从柜温度不正常";
    case 8079:
      return "从柜温度正常";
    case 8080:
      return "从柜3.3伏电压点越界";
    case 8081:
      return "从柜5.0伏电压点越界";
    case 8082:
      return "从柜12.0伏电压点越界";
    case 8083:
      return "从柜3.3伏电压点正常";
    case 8084:
      return "从柜5.0伏电压点正常";
    case 8085:
      return "从柜12.0伏电压点正常";
    case 8086:
      return "从柜装备电源";
    case 8087:
      return "从柜未装备电源";
    case 8088:
      return "从柜电源直流电工作正常";
    case 8089:
      return "从柜电源直流电工作不正常";
    case 8090:
      return "从柜电源风扇工作正常";
    case 8091:
      return "从柜电源风扇工作不正常";
    case 8096:
      return "物理磁盘响应慢";
    case 9097:
      return "清除不健全磁盘组";
    case 8098:
      return "电池电量充满";
    case 8120:
      return "网卡速率未达到1Gbps";
    case 8122:
      return "系统重新利用侦测发现的坏盘";
    case 8124:
      return "主柜电源传感器1温度不正常";
    case 8125:
      return "主柜电源传感器1温度正常";
    case 8126:
      return "主柜电源传感器2温度不正常";
    case 8127:
      return "主柜电源传感器2温度正常";
    case 8128:
      return "从柜电源传感器1温度不正常";
    case 8129:
      return "从柜电源传感器1温度正常";
    case 8130:
      return "从柜电源传感器2温度不正常";
    case 8131:
      return "从柜电源传感器2温度正常";
    case 8132:
      return "系统禁用所有网卡";
    case 8133:
      return "系统未禁用所有网卡";
    case 8001:
      return "电源不可使用";
    case 8134:
      return "USB工作不正常";
    case 8135:
      return "USB工作正常";
    case 8140:
      return "主柜1.8伏电压点越界";
    case 8141:
      return "主柜1.8伏电压点正常";
    case 8142:
      return "主柜FSB电压点越界";
    case 8143:
      return "主柜FSB电压点正常";
    case 8144:
      return "主柜CMOS电池电压点越界";
    case 8145:
      return "主柜CMOS电池电压点正常";
    case 8147:
      return "控制器被标明RAM CRC错误";
    case 8148:
      return "从柜1.8伏电压点越界";
    case 8149:
      return "从柜CCP电压点越界";
    case 8150:
      return "从柜1.8伏电压点正常";
    case 8151:
      return "从柜CCP电压点正常";
    case 8152:
      return "从柜电源交流电供电正常";
    case 8153:
      return "从柜电源交流电供电不正常";
    case 8154:
      return "网卡硬件配置冲突";
    case 8155:
      return "红外灯异常";
    case 8156:
      return "硬盘温度过高";
    case 8157:
      return "硬盘温度过低";
    case 9098:
      return "RAID磁盘故障";
    case 9099:
      return "RAID降级";
    case 9100:
      return "RAID阵列故障";
    case 9101:
      return "RAID卷错误";
    case 9102:
      return "RAID电源故障";
    case 9103:
      return "RAID高温";
    case 9104:
      return "RAID不能识别磁盘";
  }
}
