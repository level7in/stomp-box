<template>
    <div class="setting" @click.self="isSetting">
      <div class="setting-lp">

      </div>
      <div class="setting-rp">
        <div v-for="(option,key) in GlobalOption">
          {{key}}:{{option}}
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'Setting',
      computed: {
        GlobalOption () {
          return this.$store.state.GlobalOption
        }
      },
      methods: {
        isSetting: function () {
          this.$store.commit('isSetting')
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import "../../variable";
  .setting{
    width: 100vw;
    height: 100vh;
    background-color: $main-color;
    position: fixed;
    z-index: 5;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    .setting-lp{
      width: 30vw;
      height:80vh;
      background-color: black;
      overflow-y: scroll;
    }
    .setting-rp{
      width: 50vw;
      height: 80vh;
      background-color: gainsboro;
      overflow-y: scroll;
    }
  }


</style>
