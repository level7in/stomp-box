<template>
  <div class="task-bar-items gray"
       :title="tmItems.name"
       v-html="tmItems.ico"
       @click="doThis(tmItems.id)"
       :style="isGray">
  </div>
</template>

<script>
    export default {
      name: 'TaskBarItems',
      props: {
        tmItems: {
          type: Object,
          required: true
        },
        menuStatus: {
          type: Number,
          required: true
        }
      },
      methods: {
        doThis (id) {
          if (this.isLunch) {
            // console.log('阻断')
            return
          }
          // console.log(id)
          switch (id) {
            case 0:
              // 弹出 新建任务面板
              this.$store.commit('changeUrlPanel')
              break
            case 1:
              this.$store.dispatch('taskBegin')
              break
            case 2:
              this.$store.dispatch('taskWait')
              break
            case 3:
              this.$store.dispatch('taskDelete')
              break
          }
        }
      },
      computed: {
        isGray () {
          // 样式区别
          // console.log(this.menuStatus)
          const sty = {
            color: '#c9cacb',
            cursor: 'default'
          }
          switch (this.menuStatus) {
            case 0:
              if (this.tmItems.id === 1) {
                return sty
              }
              break
            case 1:
              if (this.tmItems.id === 2) {
                return sty
              }
              break
            case 2:
              if (this.tmItems.id === 1 || this.tmItems.id === 2) {
                return sty
              }
              break
          }
        },
        isLunch () {
          // 事件阻断
          switch (this.menuStatus) {
            case 0:
              if (this.tmItems.id === 1) {
                return true
              }
              break
            case 1:
              if (this.tmItems.id === 2) {
                return true
              }
              break
            case 2:
              if (this.tmItems.id === 1 || this.tmItems.id === 2) {
                return true
              }
              break
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
