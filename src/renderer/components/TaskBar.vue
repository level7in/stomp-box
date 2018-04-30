<template>
  <div class="task-bar">
    <dash-board></dash-board>
    <task-bar-items v-for="tmItems in taskBarItems" :key="tmItems.id" :tmItems="tmItems"></task-bar-items>
    <task-bar-search></task-bar-search>
  </div>

</template>

<script>
import TaskBarSearch from './TaskBarSearch'
import DashBoard from './DashBoard'
import TaskBarItems from './TaskBarItems'
export default {
  components: {
    TaskBarSearch,
    DashBoard,
    TaskBarItems
  },
  name: 'TaskBar',
  data () {
    return {
      taskBarItems: this.$store.state.taskBarItems
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../variable";
.task-bar{
  display: flex;
  flex-direction:row;
  align-items: center;
  background-color: $main-color;
  height: 50px;
  border-bottom: 1px solid #ddd;
  -webkit-app-region: drag;
  /*-webkit-backdrop-filter:saturate(180%) blur(20px);*/
  /*background-color: rgba(255,255,255,0.7);*/
}
</style>
