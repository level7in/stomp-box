<template>
  <div class="musk" @click.self="changeUrlPanel">
    <div class="new-mission" >
      <h5>下载地址</h5>
      
      <textarea  v-model="url" cols="50" rows="8" placeholder="输入链接"></textarea>
      <hr>
      <div class="between">
        <input type="button" class="danger" value="取消" @click="cancleDownload">
        <input type="button" class="primary" value="下载" @click="urlDownload">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        url: ''
      }
    },
    computed: {
      urlCheck: function () {
        const regex0 = /^(https?|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/gm
        const regex1 = /^magnet:\?xt=urn:btih:.+/gm
        let urls0 = this.url.match(regex0)
        let urls1 = this.url.match(regex1)
        if (urls0 === null && urls1 !== null) {
          return urls1
        } else if (urls1 === null && urls0 !== null) {
          return urls0
        } else if (urls0 === null && urls1 === null) {
          return 'error'
        } else {
          return urls0.concat(urls1)
        }
      }
    },
    methods: {
      changeUrlPanel () {
        this.$store.commit('changeUrlPanel')
      },
      cancleDownload () {
        this.url = null
        this.$store.commit('changeUrlPanel')
      },
      urlDownload () {
        let downUrl = this.urlCheck
        this.$store.dispatch('addUri', downUrl)
        this.url = null
        this.$store.commit('changeUrlPanel')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/musk";
  @import "../assets/scss/textarea";
  @import "../assets/scss/input";
  @import "../assets/scss/checkbox";
  .new-mission{
    width: 400px;
    max-height: 80vh;
    padding: 10px;
    background-color: #F4F5F7;
    overflow-y: scroll;
    border-radius: 3px;
    box-shadow: rgba(84, 70, 35, 0.3) 0px 6px 20px, rgba(84, 70, 35, 0.14) 0px 1px 3px, rgba(0, 0, 0, 0.08) 0px 0px 1px;

    /*margin: 50px 0;*/
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
