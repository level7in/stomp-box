<template>
    <div class="device-ico" @click.right.prevent="change">

    </div>
</template>

<script>
    export default {
      name: 'DeviceItem',
      methods: {
        change: function () {
          alert('右键')
        }
      }
    }
</script>

<style lang="scss" scoped>
  .device-ico{
    width: 52px;
    height: 52px;
    border-radius: 50%;
    margin: 15px auto;
    background-color: #DEEBFF;
    box-shadow: 0 0 0 2px #4C9AFE inset;
    &:hover{
      background-color: #DEFFFF;
      border-radius: 30%;
      cursor: pointer;
      transition: all 600ms cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
  }
</style>
