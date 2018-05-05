<template>
    <div class="task-panel">
      <span>{{checkedNames}}</span>
      <span v-show="DownloadResult.length === 0" class="no-task">
        <div class="standby">
          {{ isConnected }}
        </div>
      </span>

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
                :DownloadItem="DownloadItem"
                :menuStatus="getMenuStatus">

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
    },
    computed: {
      getMenuStatus () {
        return this.$store.state.menuItemActive
      },
      isConnected () {
        return this.$store.state.isConnected
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
      border-bottom: solid 2px #f56c6c;
      box-shadow: rgba(150, 29, 7, 0.3) 0px 6px 20px, rgba(150, 29, 7, 0.14) 0px 1px 3px, rgba(255, 0, 14, 0.08) 0px 0px 1px;
      transition: all .2s ;
    }
  }
  .no-task{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .standby{
    display: flex;
    color: #fff;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
    width: 200px;
    height: 200px;
    box-shadow: 0 0 0 5px #4C9AFE inset,  0 0 0.5rem rgba(90,97,105,.2);
    border-radius: 50%;
    background-color: #4C9AFE;
  }
</style>
