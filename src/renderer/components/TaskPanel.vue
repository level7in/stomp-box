<template>
    <div class="task-panel">
      <!--<span>{{whoChecked}}</span>-->
      <span v-show="DownloadResult.length === 0" class="no-task">
        <img src="../assets/img/launch.svg" alt="lunch" width="40%">
      </span>

      <span v-for="(DownloadItem,index) in DownloadResult">
        <input
                type="checkbox"
                :key="index+'id'"
                class="download-item"
                :id="'id-' + index"
                :value ="DownloadItem.gid"
                v-model="whoChecked">
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
        DownloadResult: this.$store.state.DownloadResult
      }
    },
    computed: {
      getMenuStatus () {
        return this.$store.state.menuItemActive
      },
      whoChecked: {
        get () {
          switch (this.getMenuStatus) {
            case 0:
              return this.checkedActiveNames
            case 1:
              return this.checkedWaitNames
            case 2:
              return this.checkedStopNames
          }
        },
        set (val) {
          switch (this.getMenuStatus) {
            case 0:
              this.checkedActiveNames = val
              break
            case 1:
              this.checkedWaitNames = val
              break
            case 2:
              this.checkedStopNames = val
              break
          }
        }
      },
      checkedActiveNames: {
        get () {
          return this.$store.state.checkedActiveNames
        },
        set (val) {
          this.$store.commit('saveCheckedActiveNames', val)
        }
      },
      checkedWaitNames: {
        get () {
          return this.$store.state.checkedWaitNames
        },
        set (val) {
          this.$store.commit('saveCheckedWaitNames', val)
        }
      },
      checkedStopNames: {
        get () {
          return this.$store.state.checkedStopNames
        },
        set (val) {
          this.$store.commit('saveCheckedStopNames', val)
        }
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
    width: 100px;
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
</style>
