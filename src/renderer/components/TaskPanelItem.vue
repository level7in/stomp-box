<template>

  <label class="task-panel-item" :for="'id-' + index">
    <span class="between">
      <div>
        <!--任务名-->
        {{typeJudge}}
      </div>
      <a>
        {{(DownloadItem.uploadLength / DownloadItem.totalLength *100).toFixed(1) }}% |
        {{(DownloadItem.completedLength / DownloadItem.totalLength *100).toFixed(1) }} %
      </a>
    </span>

    <span class="between">
      <div>
        上传/下载
        <a href="">{{(DownloadItem.uploadSpeed /1024).toFixed(1)}} KB/s</a> /
        <a href="">{{(DownloadItem.downloadSpeed / 1024).toFixed(1)}} KB/s </a>
      </div>
      <div>
        上 传 率 | 下 载 率
      </div>
    </span>

    <span class="between">
      <span>
        {{ '||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'.slice(0,(DownloadItem.uploadLength / DownloadItem.totalLength *100).toFixed())}}
      </span>
      <span>
        {{index}}
      </span>
    </span>

    <span>
      {{ '||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||'.slice(0,(DownloadItem.completedLength / DownloadItem.totalLength *100).toFixed()) }}
    </span>

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
        }
      },
      computed: {
        typeJudge () {
          if (this.DownloadItem.hasOwnProperty('bittorrent')) {
            return this.DownloadItem.bittorrent.info.name
          } else if (this.DownloadItem.files[0].path !== '') {
            return this.DownloadItem.files[0].path.slice(this.DownloadItem.dir.length + 1)
          } else {
            return `错误信息：${this.DownloadItem.errorMessage}`
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
.task-panel-item{
  font-size: 13px;
  width:95%;
  height: auto;
  margin:15px auto;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  border-radius: 5px;
  border-bottom: 1px solid #ddd;
  box-shadow: rgba(84, 70, 35, 0.3) 0px 6px 20px, rgba(84, 70, 35, 0.14) 0px 1px 3px, rgba(0, 0, 0, 0.08) 0px 0px 1px;
  box-sizing: border-box;
  cursor:default;
  &:hover{
    border-left: solid 7px #000;
    padding-left: 13px;
    transition: all .2s ;
  }
}

.between{
  width: 100%;
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
