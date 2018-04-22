<template>
  <div class="task-bar-items" @click="doThis(tmItems.id)" :title="tmItems.name" v-html="tmItems.ico">
  </div>
</template>

<script>
    export default {
      name: 'TaskBarItems',
      props: {
        tmItems: {
          type: Object,
          required: true
        }
      },
      methods: {
        doThis: function (id) {
          switch (id) {
            case 0:
              this.$store.commit('changeUrlPanel')
              break
            default:
              console.log(id)
          }
        }
      }
    }
</script>

<style lang="scss" scoped>
.task-bar-items{
  color: #676768;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 20px;
  cursor: pointer;
  /*border-right:1px solid rgba(9, 30, 66, 0.2);*/
  &:hover{
    color:rgba(9, 30, 66, 1);
    transition: all .1s;

  }
}
</style>
