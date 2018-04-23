<template>
    <div class="task-panel">
      <span>{{checkedNames}}</span>
      <span v-for="(DownloadItem,index) in DownloadResult">
        <input
                type="checkbox"
                :key="index+'id'"
                class="download-item"
                :id="'id-' + index"
                :value ="DownloadItem.gid"
                v-model="checkedNames">
        <!--下载卡片-->
        <task-panel-item
                :key="index" :index="index"
                :DownloadItem="DownloadItem" >

        </task-panel-item>
      </span>



    </div>
</template>

<script>
  import TaskPanelItem from './TaskPanelItem.vue'
  export default {
    components: {
      TaskPanelItem
    },
    name: 'TaskPanel',
    data () {
      return {
        DownloadResult: this.$store.state.DownloadResult,
        checkedNames: []
      }
    }

  }
</script>

<style lang="scss" scoped>
  @import "../../variable";
  .task-panel{
    background-color: $main-color;
    flex-direction: column;
    /*align-items: center;*/
    flex: 1;
    overflow-y: scroll;
  }
  .download-item{
    display: none;
    &:checked + label {
      border-left: solid 7px #4C9AFE;
      padding-left: 13px;
      transition: all .2s ;
    }
  }
</style>
