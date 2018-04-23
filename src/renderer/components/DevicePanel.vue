<template>
  <div class="between">
    <div class="lp">
      <device-item v-for="item in items" :key="item.index"></device-item>
    </div>
    <div class="setting-ico" @click="isSetting">

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
    data () {
      return {
        items: [
          {
            index: 0,
            name: '正在下载',
            sum: 0
          },
          {
            index: 1,
            name: '等待队列',
            sum: 0
          },
          {
            index: 2,
            name: '任务出错',
            sum: 0
          },
          {
            index: 3,
            name: '已完成',
            sum: 0
          }
        ]
      }
    },
    methods: {
      isSetting: function () {
        this.$store.dispatch('getGlobalOption')
        this.$store.commit('isSetting')
      }
    }
  }
</script>

<style scoped>
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
    display: flex;
    flex-direction:column;
    align-items: center;
    overflow-y: scroll;
    flex: 1;
  }
  .setting-ico{
    height: 63px;
    /*background-color: rgba(9, 30, 66, 0.4);*/
  }
</style>
