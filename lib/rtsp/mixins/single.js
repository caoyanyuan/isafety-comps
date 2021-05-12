//处理单个播放，， 多个单播放会有id重复问题


export default {
    props: [
        //single 单个播放 multi 视频墙
        'showType',
        //单个播放时候的内容id
        'containerID'
    ],
    methods: {
        myVideoIname(index) {
            if(index == 0) return this.firstVideoId()
            else return `video_${index}`
        }
    },
    computed: {
        firstVideoId() {
            return (str) => {
                let ret = this.showType == 'single' ? `${this.camera_id}_video_0` : 'video_0'

                return str ? ret+"_"+str : ret
            }
        }
    }

}