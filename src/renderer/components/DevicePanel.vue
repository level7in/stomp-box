<template>
  <div class="between">
    <div class="lp">
      <device-item v-for="(itemOption, index) in panelItemsOptions" :key="index" :index="index"></device-item>
    </div>

    <!--快捷设置-->
    <div class="ico" @click="isQuickSet">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
    </div>
    <!--添加 aria2 设备-->
    <div class="ico" @click="addCard(panelItemsOptions.length)">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus-square"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>    </div>

    <!--设置面板-->
    <div class="ico" @click="isSetting">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-settings"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    </div>
  </div>
</template>

<script>
  import DeviceItem from './DeviceItem'

export default {
    components: {
      DeviceItem
    },
    name: 'DevicePanel',
    methods: {
      isSetting: function () {
        this.$store.dispatch('getGlobalOption')
        this.$store.commit('isSetting')
      },
      addCard: function (index) {
        // 类似 DeviceItem的 change 方法
        this.$store.commit('devPanelEdit', {
          index: index,
          x: event.clientX,
          y: event.clientY
        })
        this.$store.commit('addCardOption')
        this.$store.commit('changeDeviceCard')
      },
      isQuickSet: function () {
        this.$store.dispatch('getGlobalOption')
        this.$store.commit('changeQuickSet')
      }
    },
    computed: {
      panelItemsOptions () {
        return this.$store.state.options
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../variable";
  .between{
    width: 67px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-right: 1px solid #ddd;
    background-color: #EBECF0;
  }
  .lp{
    /*background-color: rgba(9, 30, 66, 0.4);*/
    padding-top: 12px;
    flex-direction:column;
    align-items: center;
    overflow-y: scroll;
    flex: 1;
  }
  .ico{
    height: 50px;
    width: 67px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    /*border-radius: 50%;*/
    margin: 0 auto;
    &:hover{
      color: #fff;
      transition: all .1s;
      background-color: $heavy-color;
      border-right: 1px solid $heavy-color;
    }
  }

</style>
