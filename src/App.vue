<template>
  <div id="app">
    <!--left-panel-->
    <device-panel></device-panel>
    <!--right-panel-->
    <div class="rp">
      <!--top-panel-操作栏-->
      <task-bar></task-bar>
      <!--bottom-panel-->
      <div class="bp">
        <!--任务菜单-->
        <task-menu></task-menu>
        <!--任务面板-->
        <task-panel></task-panel>
      </div>
    </div>

    <!--新建任务面板-->
    <url-panel v-show="isUrlPanel"></url-panel>
    <!--设置面板-->
    <setting v-show="isSetting"></setting>
    <!--aria2 地址编辑-->
    <DeviceCard v-if="isDeviceCard"></DeviceCard>
  </div>
</template>

<script>
import UrlPanel from './renderer/components/UrlPanel'
import DevicePanel from './renderer/components/DevicePanel'
import DeviceItem from './renderer/components/DeviceItem'
import TaskMenu from './renderer/components/TaskMenu'
import TaskBar from './renderer/components/TaskBar'
import TaskPanel from './renderer/components/TaskPanel.vue'
import Setting from './renderer/components/Setting.vue'
import DeviceCard from './renderer/components/DeviceCard'

export default {
  components: {
    TaskBar,
    UrlPanel,
    DeviceItem,
    DevicePanel,
    TaskMenu,
    TaskPanel,
    Setting,
    DeviceCard
  },
  name: 'app',
  beforeCreate () {
    this.$store.dispatch('aria2Init')
    this.$store.dispatch('tellActive')
    this.$store.dispatch('getGlobalStat')
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  computed: {
    // 显示新建任务面板
    isUrlPanel () {
      return this.$store.state.isUrlPanel
    },
    isSetting () {
      return this.$store.state.isSetting
    },
    isDeviceCard () {
      return this.$store.state.isDeviceCard
    }
  },
  methods: {

  }

}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica,'Microsoft JhengHei','Microsoft YaHei', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  display: flex;
  width: 100vw;
  height: 100vh;
}
.rp{
  flex:1;
  .bp{
    height: calc(100% - 51px);
    display: flex;
    flex-direction: row;
  }
}
a {
  color: #42b983;
}
</style>
