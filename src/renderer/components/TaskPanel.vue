<template>
    <div class="task-panel">
      <task-panel-item v-for="(DownloadItem,index) in DownloadResult" :key="index" :index="index" :DownloadItem="DownloadItem"></task-panel-item>

      <!--<task-panel-item></task-panel-item>-->

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
        DownloadResult: this.$store.state.DownloadResult
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
</style>
