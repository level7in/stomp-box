<template>
  <div class="musk" @click.self="changeDeviceCard">
    <div class="delta" :style="{ top: this.$store.state.deviceCard.y+2 + 'px' }"></div>
    <div class="dev-card" :style="{ top: positionCard + 'px' }">
      <h5>地址（host）</h5>
      <input type="text" v-model="panelItemsOptions.host">
      <hr>

      <h5>端口号（port）</h5>
      <input type="text" v-model="panelItemsOptions.port">
      <hr>

      <div class="between">
        <h5>SSL加密</h5>
        <div class="switch">
          <input type="checkbox" class="switch-checkbox" id="checkbox10-0" v-model="panelItemsOptions.secure">
          <label for="checkbox10-0" class="switch-label"/>
        </div>
      </div>
      <hr>
      <input type="text" v-model="panelItemsOptions.secret" placeholder="密钥">

      <hr>

      <div class="between">
        <input type="button" class="danger" value="删除" @click="deleteDevice(getDeviceCard.index)">
        <input type="button" class="primary" value="保存" @click="saveOptions">
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'DeviceCard',
    props: {
    },
    methods: {
      changeDeviceCard () {
        this.$store.commit('changeDeviceCard')
      },
      deleteDevice (index) {
        // 删除指定设备
        this.$store.commit('changeDeviceCard')
        this.$store.commit('deleteCardOption', index)
        this.$store.commit('saveOptions')
      },
      saveOptions () {
        this.$store.commit('changeDeviceCard')
        this.$store.commit('saveOptions')
      }
    },
    computed: {
      panelItemsOptions () {
        // 设备连接选项
        return this.$store.state.options[this.getDeviceCard.index]
      },
      getDeviceCard () {
        // 卡片 索引值 click事件触发的 x,y 坐标
        return this.$store.state.deviceCard
      },
      clientHeight () {
        // 客户端界面高度
        return document.body.clientHeight
      },
      positionCard () {
        // 定位卡片 纵坐标 防止卡片越界
        if ((this.clientHeight - this.getDeviceCard.y) > 330) {
          return this.getDeviceCard.y
        } else {
          return this.clientHeight - 330
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/musk";
  @import "../assets/scss/input";
  @import "../assets/scss/checkbox";
  .dev-card{
    width: 235px;
    height: auto;
    position: absolute;
    box-sizing: border-box;
    padding: 10px;
    left: 70px;
    background-color: #fff;
    box-shadow: rgba(84, 70, 35, 0.3) 0px 6px 20px, rgba(84, 70, 35, 0.14) 0px 1px 3px, rgba(0, 0, 0, 0.08) 0px 0px 1px;
    border-radius: 3px;
    transition: all 10ms;
  }
  .delta{
    position: absolute;
    left: 64px;
    z-index: 3;
    width: 0;
    height: 0;
    border-top: 8px solid transparent;
    border-right: 6px solid #fff;
    border-bottom: 8px solid transparent;
  }
</style>