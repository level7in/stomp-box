<template>

  <label class="task-panel-item" :for="'id-' + index">
    <!--任务名-->
    <div class="between">
      <div class="title">{{taskName}}</div>
      <div class="present" :style="{ backgroundColor: bgColor}" @click.self.prevent="boring">
        {{ present }}%
      </div>
    </div>
    <hr>


    <div class="task-msg">
      <!--速度显示-->
      <div class="speed flex1">
        <!--{{ speedDownload }}-->
        {{ speed }} /s
      </div>
      <!--连接数-->
      <div class="flex1">
        {{ connections }}
      </div>
      <!--完成数据量 / 总数据量-->
      <div class="flex1">
        {{ unit(DownloadItem.completedLength)}} /
        {{ unit(DownloadItem.totalLength) }}
      </div>
      <!--完成所耗时间-->
      <div class="flex1 for-time">
        {{ timeConvert }}
      </div>
    </div>


    <div class="progress-docker">
      <div class="progress-bar" :style="{width : present + '%',backgroundColor : bgColor }"></div>
    </div>

    <!--{{index}}-->

  </label>

</template>

<script>
    export default {
      name: 'TaskPanelItem',
      props: {
        DownloadItem: {
          type: Object,
          required: true
        },
        index: {
          type: Number,
          required: true
        },
        menuStatus: {
          type: Number,
          required: true
        }
      },
      data () {
        return {
          type: ''
        }
      },
      methods: {
        // 转换单位
        convert (input) {
          input = input * 1
          if (input < 1024) {
            return input.toFixed(1)
          } else {
            input = input / 1024
            return this.convert(input)
          }
        },
        // 单位
        unit (input) {
          input = input * 1
          let units
          if (input < 1024) {
            units = 'B'
          } else if (input < (1024 * 1024)) {
            units = 'KB'
          } else if (input < 1024 * 1024 * 1024) {
            units = 'MB'
          } else if (input < 1024 * 1024 * 1024 * 1024) {
            units = 'GB'
          }
          return this.convert(input) + units
        },
        boring () {
          alert('boring')
        }
      },
      computed: {
        taskName () {
          // 类别判断 输出文件名
          if (this.DownloadItem.hasOwnProperty('bittorrent') && this.DownloadItem.bittorrent.hasOwnProperty('info')) {
            // bt 信息
            this.type = 'bt'
            return this.DownloadItem.bittorrent.info.name
          } else if (this.DownloadItem.errorCode !== '0' && this.DownloadItem.hasOwnProperty('errorCode')) {
            // 错误
            this.type = 'error'
            return `错误 (${this.DownloadItem.errorCode}):${this.DownloadItem.files[0].path.slice(this.DownloadItem.dir.length + 1)}`
          } else if (this.DownloadItem.files[0].path.indexOf('[METADATA]') === 0) {
            // 磁力链接元数据
            this.type = 'meta'
            return this.DownloadItem.files[0].path
          } else if (this.DownloadItem.files[0].path === '') {
            // 尚未开始任务
            this.type = 'init'
            return '任务ID：' + this.DownloadItem.gid
          } else {
            this.type = 'http'
            return this.DownloadItem.files[0].path.slice(this.DownloadItem.dir.length + 1)
          }
        },
        timeConvert () {
          if (this.menuStatus === 2) {
            return '已完成'
          } else if (this.menuStatus === 1) {
            return '已暂停'
          } else {
            let time
            if (this.type === 'bt') {
              // 是否做种状态
              if (this.DownloadItem.seeder === true) {
                if (this.DownloadItem.uploadSpeed === '0') {
                  // 上传速度为0
                  return '未知'
                }
                // 上传任务结束时间
                time = ((this.DownloadItem.totalLength - this.DownloadItem.uploadLength) / this.DownloadItem.uploadSpeed).toFixed()
              } else {
                if (this.DownloadItem.downloadSpeed === '0') {
                  // 下载速度为0
                  return '未知'
                }
                time = (this.DownloadItem.totalLength - this.DownloadItem.completedLength / this.DownloadItem.downloadSpeed).toFixed()
              }
            } else if (this.DownloadItem.downloadSpeed === '0') {
              // 下载速度为0
              return '未知'
            } else {
              time = ((this.DownloadItem.totalLength - this.DownloadItem.completedLength) / this.DownloadItem.downloadSpeed).toFixed()
            }
            let h = Math.floor(time / 3600 % 24)
            let m = Math.floor(time / 60 % 60)
            if (h < 1) {
              time = m + '分钟'
            } else {
              time = h + '小时' + m + '分钟'
            }
            return time
          }
        },
        // 显示所用方法
        present () {
          if (this.DownloadItem.totalLength === '0') {
            return 0
          }
          if (this.type === 'bt' && this.DownloadItem.seeder === 'true') {
            // 上传百分比
            return (this.DownloadItem.uploadLength / this.DownloadItem.totalLength * 100).toFixed()
          }
          // 下载百分比
          return (this.DownloadItem.completedLength / this.DownloadItem.totalLength * 100).toFixed()
        },
        speed () {
          if (this.menuStatus === 0) {
            if (this.type === 'bt' && this.DownloadItem.seeder === 'true') {
              // 做种速度
              return this.unit(this.DownloadItem.uploadSpeed)
            } else {
              // 下载速度
              return this.unit(this.DownloadItem.downloadSpeed)
            }
          } else {
            return '----'
          }
        },
        connections () {
          if (this.menuStatus === 0) {
            if (this.type === 'bt') {
              return this.DownloadItem.numSeeders + ' / ' + this.DownloadItem.connections
            } else {
              return '- / ' + this.DownloadItem.connections
            }
          } else {
            return '-- / --'
          }
        },
        bgColor () {
          if (this.menuStatus === 0) {
            // bt 做种
            if (this.type === 'bt' && this.DownloadItem.seeder === 'true') {
              return '#42b983'
            } else {
              return '#4C9AFE'
            }
          } else if (this.menuStatus === 1) {
            return '#E6A23C'
          } else if (this.menuStatus === 2) {
            if (this.type === 'error') {
              return '#F56C6C'
            }
            return '#42b983'
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
  .task-panel-item{
    font-size: 16px;
    width:97%;
    height: auto;
    margin:15px auto;
    padding: 7px;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 5px;
    border-bottom: 2px solid #ddd;
    box-shadow: rgba(84, 70, 35, 0.3) 0px 6px 20px, rgba(84, 70, 35, 0.14) 0px 1px 3px, rgba(0, 0, 0, 0.08) 0px 0px 1px;
    box-sizing: border-box;
  }
  .lp-task{
    width: calc(100% - 150px);
    /*border-right: #c9c9c9 solid 1px;*/
  }
  .rp-task{
    display: flex;
    flex-direction: column;
    align-items:flex-end;
    justify-content: space-between;
    flex: 1;
  }
  .present{
    padding: 1px 3px;
    font-size: 16px;
    color: #fff;
    background-color: #4C9AFE;
    border-radius: 5px;
    cursor: pointer;
  }
  .task-msg{
    font-size: 12px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .flex1{
    flex: 1;
  }
  .for-time{
    text-align: right;
  }
  .between{
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .title{
    margin: 0;
    font-size: 16px;
    font-weight: normal;
    white-space: nowrap;
    overflow:hidden;
    text-overflow: ellipsis;
    /*&:hover{*/
      /*white-space: normal;*/
      /*transition: height 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275);*/
    /*}*/
  }
  hr{
    width: 100%;
    border-bottom: 0px;
    border-left: 0px;
    border-right: 0px;
    border-top: 1px solid #d3d4d5;
    margin: 3px;
  }
  .progress-docker{
    width: 100%;
    height: 10px;
    background-color: #f5f5f6;
    margin: 3px 0 0 0;
    border-radius: 1.25rem;
    overflow: hidden;
    box-shadow: inset 0 0.1rem 0.1rem rgba(90,97,105,.15);
  }
  .progress-bar{
    margin: 0;
    height: 100%;
    border-radius: 3px;
    transition: all 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    /*background-color: #4C9AFE;*/
    background-size: .625rem .625rem;
    background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)
  }
</style>
