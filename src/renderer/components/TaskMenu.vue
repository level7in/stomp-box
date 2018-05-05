<template>
  <div  class="bp-lp">
    <task-menu-item v-for="mItem in menuItems" :key="mItem.id" :mItem="mItem"></task-menu-item>

  </div>
</template>

<script>
  import TaskMenuItem from './TaskMenuItem'
export default {
    components: {
      TaskMenuItem
    },
    name: 'TaskMenu',
    data () {
      return {
        menuItems: this.$store.state.menuItems
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../../variable";
  .bp-lp {
    width: 238px;
    background-color: $main-color;
    padding: 10px 0px;
    display: flex;
    flex-direction:column;
    align-items: center;
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
  }
</style>
