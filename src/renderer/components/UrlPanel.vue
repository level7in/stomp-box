<template>
  <div class="musk" @click.self="changeUrlPanel">
    <div class="new-mission" >
      <textarea  v-model="url" cols="50" rows="8" placeholder="输入链接🔗"></textarea>
      <p v-if="url">{{ urlCheck }}</p>
      <div style="height: 200px"></div>
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
        return this.url + '-check'
      }
    },
    methods: {
      changeUrlPanel: function () {
        this.$store.commit('changeUrlPanel')
      }
    }
  }
</script>

<style scoped>
  .musk{
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,.5);
    position: fixed;
    z-index: 3;
    transition: all .1s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .new-mission{
    background-color: #F4F5F7;
    overflow-y: scroll;
    border-radius: 3px;
    /*margin: 50px 0;*/
  }
  textarea{
    border-radius: 3px;
    border: white;
    outline: none;
  }
</style>
