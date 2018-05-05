<template>
  <div class="musk" @click.self="changeUrlPanel">
    <div class="new-mission" >
      <textarea  v-model="url" cols="50" rows="8" placeholder="输入链接"></textarea>
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
        // getter
        // get: function () {
        //   return this.firstName + ' ' + this.lastName
        // },
        // // setter
        // set: function (newValue) {
        //   var names = newValue.split(' ')
        //   this.firstName = names[0]
        //   this.lastName = names[names.length - 1]
        // }
      }
    },
    methods: {
      changeUrlPanel: function () {
        this.$store.commit('changeUrlPanel')
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/scss/musk";
  @import "../assets/scss/textarea";
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

</style>
