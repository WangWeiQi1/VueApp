<template>
  <ul class="footer" :style="{background:bgColor}">
      <!--<li><router-link @click.native="clickHandler({bgColor:'rgb(33,150,243)',title:'Movie'})" to="/">电影</router-link></li>-->
      <!--<li><router-link @click.native="clickHandler({bgColor:'rgb(0,150,136)',title:'Music'})" to="/music">音乐</router-link></li>-->
      <!--<li><router-link @click.native="clickHandler({bgColor:'rgb(121,85,72)',title:'Book'})" tnewsbook">新闻</router-link></li>-->
      <!--<li><router-link @click.native="clickHandler({bgColor:'rgb(63,81,180)',title:'Photo'})" tjokeshoto">段子</router-link></li>-->
    <li><router-link @click.native="$emit('change','影视推荐')" to="/">电影</router-link></li>
    <li><router-link @click.native="$emit('change','音乐鉴赏')" to="/music">音乐</router-link></li>
    <li><router-link @click.native="$emit('change','娱乐新闻')" to="/news">新闻</router-link></li>
    <li><router-link @click.native="$emit('change','内涵段子')" to="/jokes">段子</router-link></li>
</ul>
</template>

<script>
export default{
    props:['bgColor'],
  data(){
      return {
//          bgColor:'rgb(33,150,243)'
      }
  },
  methods:{
//    clickHandler({bgColor,title}){
//      this.bgColor = bgColor;
//      this.$emit('change',{bgColor,title});
//    }
  }
}
</script>

<style scoped>
.footer{
  height: 1rem;
  /*background-color: rgb(33,150,243);*/
  position: fixed;
  bottom:0;
  width: 100%;
  line-height: 1rem;
  display:flex;
}
.footer li{
  flex-grow:1;
  text-align: center;
  color:#ccc;
}
.footer li a{
  color:#ccc;
  outline: none;
}
.footer li a.router-link-exact-active{
  color:#fff;
}
</style>
