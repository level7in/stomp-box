<template>
    <div class="dash-board">
      <span>{{(dashBoard[0]/1024).toFixed(1) }}KB/s</span>  |
      <span>{{(dashBoard[1]/1024).toFixed(1) }}KB/s</span>
    </div>
</template>

<script>
    export default {
      name: 'DashBoard',
      data () {
        return {
          dashBoard: this.$store.state.dashBoard
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
