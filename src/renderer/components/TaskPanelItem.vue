<template>
  <div class="task-panel-item">
    <span class="between">
      <div>
        {{DownloadItem.files[0].path}}
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

  </div>
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
      }
    }
</script>

<style lang="scss" scoped>
.task-panel-item{
  width: calc(100% - 50px);
  height: auto;
  margin:20px auto;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #fff;
  border-radius: 5px;
  border-bottom: 1px solid #ddd;
  box-shadow: rgba(84, 70, 35, 0.3) 0px 6px 20px, rgba(84, 70, 35, 0.14) 0px 1px 3px, rgba(0, 0, 0, 0.08) 0px 0px 1px;

  &:hover{
    /*box-shadow: 0 3px 8px #d3ddeb;*/
    box-shadow: rgba(84, 70, 35, 0.3) 0px 6px 20px, rgba(84, 70, 35, 0.14) 0px 1px 3px, rgba(0, 0, 0, 0.08) 0px 0px 1px;
    background-color: rgba(9, 30, 66, 0.04);
    transition: all 200ms ;
  }
}
.between{
  width: 100%;
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
