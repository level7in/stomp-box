<template>
    <div class="menu-bt" :class="{active:mItem.active}" @click="doThis(mItem.active,mItem.id)">
      <span class="menu-ico" v-html="mItem.ico"></span>
      <span class="menu-name">{{ mItem.name }}</span>
      <span class="sum-num">{{mItem.sum}}</span>
    </div>
</template>

<script>
    export default {
      name: 'TaskMenuItem',
      props: {
        mItem: {
          type: Object,
          required: true
        }
      },
      methods: {
        doThis: function (isActive, id) {
          if (isActive) { return }
          this.$store.commit('menuActiveCancel')
          this.$store.commit('menuActive', id)
          switch (id) {
            case 0:
              this.$store.dispatch('tellActive')
              break
            case 1:
              this.$store.dispatch('tellWaiting')
              break
            case 2:
              this.$store.dispatch('tellStopped')
          }
        }
      }

    }
</script>

<style lang="scss" scoped>
.active{
  background-color: rgba(9, 30, 66, 0.04);
  cursor: pointer;
  transition: all 600ms ;
}
.menu-bt{
  width: 92%;
  height: 40px;
  color: #42526E;
  border-radius: 3px;
  font-size: 16px;
  display: flex;
  align-items: center;
  .menu-ico{
    flex: 1;
    display: flex;
    justify-content: center;
  }
  .menu-name{
    flex: 2;
    text-align: left;
  }
  .sum-num{
    flex: 1;
    text-align: right;
    margin-right: 12px;
  }

  &:hover{
    background-color: rgba(9, 30, 66, 0.04);
    cursor: pointer;
    transition: all 600ms ;
  }
  &:active{
    background-color: #DEEBFF;
    box-shadow: 0 0 0 2px #4C9AFE inset;
    transition: all 10ms;
  }
}

</style>
