<template>
    <div class="dash-board">
      <span>{{ unit(dashBoard[0])}}/s</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-activity"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
      <span>{{ unit(dashBoard[1])}}/s</span>
    </div>
</template>

<script>
    export default {
      name: 'DashBoard',
      data () {
        return {
          dashBoard: this.$store.state.dashBoard
        }
      },
      methods: {
        convert (input) {
          input = input * 1
          if (input < 1024) {
            return input.toFixed(1)
          } else {
            input = input / 1024
            return this.convert(input)
          }
        },
        // 单位
        unit (input) {
          input = input * 1
          let units
          if (input < 1024) {
            units = 'B'
          } else if (input < (1024 * 1024)) {
            units = 'KB'
          } else if (input < 1024 * 1024 * 1024) {
            units = 'MB'
          } else if (input < 1024 * 1024 * 1024 * 1024) {
            units = 'GB'
          }
          return this.convert(input) + units
        }
      }
    }
</script>

<style lang="scss" scoped>
  .dash-board{
    width: 238px;
    height: 100%;
    display: flex;
    cursor: default;
    align-items: center;
    text-align: center;
    justify-content: space-between;
    border-right: 1px solid #ddd;
    span{
      flex: 1;
    }
  }
</style>
