<template>
  <div class="header" :style="{background: bgColor}">
    <!--<router-link to="/">-->
      <!--@click="$router.push('/')" -->
      <span @click="$emit('home')" class="home" :style="{background: bgColor}">首页</span>
    <!--</router-link>-->
    <h2 class="title">
      <slot name="title">默认值</slot>
    </h2>
  </div>
</template>

<script>
  export default{
      props:['bgColor']
  }
</script>

<style scoped>
  .header{
    height: 1rem;
    /*background-color: rgb(33,150,243);*/
    line-height: 1rem;
    color:#fff;
    position: fixed;
    width: 100%;
    top:0;
  }
  .title{
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    font-size:20px;
  }
  .home{
    background-color:rgb(33,150,243);
    color:#fff;
    margin-left:.1rem;
  }
</style>
