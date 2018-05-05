<template>
    <div class="dash-board">
      <span>{{(dashBoard[0]/1024).toFixed() }}KB/s</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-activity"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
      <span>{{(dashBoard[1]/1024).toFixed() }}KB/s</span>
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
