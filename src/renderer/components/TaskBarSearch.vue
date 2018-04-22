<template>
    <div class="task-search">
      <input name="search" type="text" placeholder="筛选"/>
    </div>
</template>

<script>
    export default {
      name: 'TaskBarSearch'

    }
</script>

<style lang="scss" scoped>
  .task-search{
    width: 238px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    input{
      width: 86%;
      height: 33px;
      font-size: 16px;
      padding:0 6px;
      border-radius: 3px;
      border: 1px solid #ddd;
      outline: none;
      background-color: rgba(9, 30, 66, 0.04);
      &:focus{
        border: 1px solid #4C9AFE;
        box-shadow: 0 0 0 1px #4C9AFE inset;
        transition: all 10ms;
      }
    }
  }
</style>
