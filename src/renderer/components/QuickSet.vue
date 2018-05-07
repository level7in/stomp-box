<template>
  <div class="musk" @click.self="changeQuickSet">
    <div class="quick-set-card">
      <h5>最高下载速度</h5>
      <input type="text" v-model="GlobalOption['max-overall-download-limit']">
      <hr>

      <h5>最高上传速度</h5>
      <input type="text" v-model="GlobalOption['max-overall-upload-limit']">
      <hr>

      <h5>同时下载数</h5>
      <input type="text" v-model="GlobalOption['max-concurrent-downloads']">
      <hr>

      <h5>默认线程数量</h5>
      <input type="text" v-model="GlobalOption['max-connection-per-server']">
      <hr>
      <div class="between">
        <input type="button" class="danger" value="取消" @click="changeQuickSet">
        <input type="button" class="primary" value="保存" @click="quickSet">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'QuickSet',
    methods: {
      changeQuickSet () {
        this.$store.commit('changeQuickSet')
      },
      quickSet () {
        this.$store.dispatch('quickSet')
        this.$store.commit('changeQuickSet')
      }
    },
    computed: {
      GlobalOption () {
        return this.$store.state.GlobalOption
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/musk";
  @import "../assets/scss/input";
  .quick-set-card{
    width: 300px;
    height: auto;
    box-sizing: border-box;
    padding: 10px;
    background-color: #fff;
    box-shadow: rgba(84, 70, 35, 0.3) 0px 6px 20px, rgba(84, 70, 35, 0.14) 0px 1px 3px, rgba(0, 0, 0, 0.08) 0px 0px 1px;
    border-radius: 3px;
    transition: all 10ms;
  }
  h5{
    color: #99999a;
    margin: 5px 0;
  }
  hr{
    border-bottom: 0px;
    border-left: 0px;
    border-right: 0px;
    border-top: 1px solid #E2E3E4;
  }
  .between{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>