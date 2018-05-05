<template>
    <div class="" @click.right.prevent="change(index)" @click.prevent="switchDevice(index)" :class="{'device-ico': true, active: isDevActive(index)}">

    </div>
</template>

<script>
    export default {
      name: 'DeviceItem',
      props: {
        index: {
          type: Number,
          required: true
        }
      },
      methods: {
        change (index) {
          // 发送 事件 坐标 和 索引
          this.$store.commit('devPanelEdit', {
            index: index,
            x: event.clientX,
            y: event.clientY
          })
          this.$store.commit('changeDeviceCard')
        },
        switchDevice (index) {
          // 设备切换
          this.$store.dispatch('aria2Switch', index)
        },
        isDevActive (index) {
          if (this.$store.state.selectOption === index) {
            return true
          } else {
            return false
          }
        }
      },
      computed: {
      }
    }
</script>

<style lang="scss" scoped>
  .device-ico{
    width: 52px;
    height: 52px;
    border-radius: 50%;
    margin: 20px auto;
    background-color: #DEEBFF;
    box-shadow: 0 0 0 2px #4C9AFE inset,  0 0.5rem 0.5rem rgba(90,97,105,.15)inset;
    background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
      &:hover{
      background-color: #DEFFFF;
      border-radius: 30%;
      cursor: pointer;
      transition: all 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
  }
  .active{
      box-shadow: 0 0 0 2px #4C9AFE inset,  0 0 0.5rem rgba(90,97,105,.2);
      background-color: #4C9AFE;
    &:hover{
      background-color: #4C9AFE;
    }
  }
</style>
