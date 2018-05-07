<template>
  <div  class="bp-lp">
    <div class="bp-lp-tp">
      <task-menu-item v-for="mItem in menuItems" :key="mItem.id" :mItem="mItem"></task-menu-item>
    </div>

    <speed-chart class="speed-chart" :data="{}" :options="{}"></speed-chart>
  </div>
</template>

<script>
  import TaskMenuItem from './TaskMenuItem'
  import SpeedChart from './SpeedChart'
  export default {
    components: {
      TaskMenuItem,
      SpeedChart
    },
    name: 'TaskMenu',
    data () {
      return {
        menuItems: this.$store.state.menuItems
        // datacollection: {
        //   labels: ['January', 'February'],
        //   datasets: [
        //     {
        //       label: 'Data One',
        //       backgroundColor: '#f87979',
        //       data: [40, 20]
        //     }
        //   ]
        // }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../variable";
  .bp-lp-tp{
    display: flex;
    flex-direction:column;
    align-items: center;
    padding: 10px 0px;
  }
  .bp-lp {
    width: 238px;
    background-color: $main-color;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid #ddd;
  }
  .speed-chart{
    box-sizing: border-box;
    width: 100%;
    height: 300px;
    border-top: 1px solid #ddd;
    /*background: transparent;*/
  }
</style>
