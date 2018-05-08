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
    <transition name="down-fade">
      <!--新建任务面板-->
      <url-panel v-show="isUrlPanel"></url-panel>
    </transition>
    <transition name="fade">
      <!--设置面板-->
      <setting v-if="isSetting"></setting>
    </transition>
    <transition name="slide-fade">
      <!--aria2 地址编辑-->
      <DeviceCard v-if="isDeviceCard"></DeviceCard>
    </transition>
    <transition name="down-fade">
      <!--快捷设置-->
      <quick-set v-if="isQuickSet"></quick-set>
    </transition>
    <transition name="slide-fade">
      <!--任务详细信息面板-->
      <task-detail v-if="isTaskDetail"></task-detail>
    </transition>

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
import QuickSet from './renderer/components/QuickSet'
import TaskDetail from './renderer/components/TaskDetail'

export default {
  components: {
    TaskBar,
    UrlPanel,
    DeviceItem,
    DevicePanel,
    TaskMenu,
    TaskPanel,
    Setting,
    DeviceCard,
    QuickSet,
    TaskDetail
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
    },
    isQuickSet () {
      return this.$store.state.isQuickSet
    },
    isTaskDetail () {
      return this.$store.state.isTaskDetail
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
  /*透明渐变*/
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  /*侧滑*/
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
  }
  /*下滑*/
  .down-fade-enter-active {
    transition: all .3s ease;
  }
  .down-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .down-fade-enter, .slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
  }
</style>
