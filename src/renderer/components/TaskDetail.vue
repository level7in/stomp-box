<template>
  <div class="musk" @click.self="isTaskDetail">
    <div class="task-detail-card"  v-if="getTaskDetail !== null">
      <div class="between">
        <h4>任务ID(GID)</h4>
        <h5>{{getTaskDetail['gid']}}</h5>
      </div>
      <hr>

      <div class="between">
        <h4>下载目录</h4>
        <h5>{{getTaskDetail['dir']}}</h5>
      </div>
      <hr>

      <div class="between">
        <h4>状态</h4>
        <h5>{{getTaskDetail['status']}}</h5>
      </div>
      <hr>

      <div class="between">
        <h4>文件大小</h4>
        <h5>{{unit(getTaskDetail['totalLength'])}}</h5>
      </div>
      <hr>

      <div class="between">
        <h4>已下载数据量</h4>
        <h5>{{unit(getTaskDetail['completedLength'])}}</h5>
      </div>
      <hr>

      <div class="between">
        <h4>上传数据量</h4>
        <h5>{{unit(getTaskDetail['uploadLength'])}}</h5>
      </div>
      <hr>

      <div class="between">
        <h4>任务分片</h4>
        <h5>{{getTaskDetail['numPieces']}}</h5>
      </div>
      <hr>

      <div class="between">
        <h4>分片大小</h4>
        <h5>{{unit(getTaskDetail['pieceLength'])}}</h5>
      </div>
      <hr>

      <div class="between" v-if="getTaskDetail['infoHash']">
        <h4>特征值</h4>
        <h5>{{getTaskDetail['infoHash']}}</h5>
      </div>
      <hr v-if="getTaskDetail['infoHash']">

      <div class="between" v-if="getTaskDetail['seeder']">
        <h4>做种状态</h4>
        <h5>正在做种</h5>
      </div>
      <hr v-if="getTaskDetail['seeder']">

      <div>
        <h4>文件列表</h4>
        <ul v-for="file of getTaskDetail['files']">
          <li>{{unit(file['completedLength'])}}</li>
          <li>{{file['path']}}</li>
        </ul>
      </div>
      <hr>

      <div v-if="getTaskDetail['bittorrent']">
        <h4>Tracker服务器</h4>
        <ul v-for="bit of getTaskDetail['bittorrent']['announceList']">
          <li>{{bit}}</li>
        </ul>
      </div>
      <hr v-if="getTaskDetail['bittorrent']">

      <div v-if="getTaskDetail['bitfield']">
        <h4>区块信息</h4>
        <p>{{getTaskDetail['bitfield']}}</p>
      </div>
      <!--<div v-for="(item, key) in getTaskDetail">-->
        <!--<div class="between">-->
          <!--<span>-->
            <!--{{key}}-->
          <!--</span>-->
          <!--<span>-->
            <!--{{item}}-->
          <!--</span>-->
        <!--</div>-->
        <!--<hr>-->
      <!--</div>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TaskDetail',
    methods: {
      isTaskDetail () {
        this.$store.commit('changeTaskDetail')
      },
      // 转换单位
      convert (input) {
        input = input * 1
        if (input < 1024) {
          return input.toFixed(2)
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
      }
    },
    computed: {
      getTaskDetail () {
        return this.$store.state.taskDetail
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/musk";
  @import "../assets/scss/input";
  .task-detail-card{
    user-select: text;
    width: calc(100% - 307px);
    height: 100vh;
    position: absolute;
    right: 0;
    box-sizing: border-box;
    padding: 5%;
    overflow-y: scroll;
    overflow-x: hidden;
    background-color: rgba(255,255,255,1);
    box-shadow: rgba(84, 70, 35, 0.3) 0px 6px 20px, rgba(84, 70, 35, 0.14) 0px 1px 3px, rgba(0, 0, 0, 0.08) 0px 0px 1px;
  }
  hr{
    width: 100%;
  }
  h4{
    margin: 2px;
  }
  h5{
    color: #42b983;
    font-size: 16px;
    margin: 3px;
  }
  li{
    font-size: 14px;
  }
</style>