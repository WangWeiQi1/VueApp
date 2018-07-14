<template>
  <div id="app">
    <common-header :bgColor="bg" @home="home">
      <span slot="title">{{title}}</span>
    </common-header>
    <transition name="fade">
      <router-view class="content"/>
    </transition>
    <common-footer @change="switchTab" :bgColor="bg"></common-footer>
  </div>
</template>

<script>
  import CommonHeader from '@/components/common/Header'
  import CommonFooter from '@/components/common/Footer'
export default {
  name: 'App',
  components:{
    CommonHeader,
    CommonFooter
  },
  data(){
    return {
        bg:'#FF4500',
        title:'影视推荐',
        transitionName:''
    }
  },
  methods:{
    home(){
      this.switchTab('影视推荐');
      this.$router.push('/');
    },
    switchTab(tabName){
        this.title = tabName;
        switch(tabName){
          case '影视推荐':
              this.bg = '#FF4500';
              break;
          case '音乐鉴赏':
              this.bg = '#31c27c';
              break;
          case '娱乐新闻':
              this.bg = '#1C86EE';
              break;
          case '内涵段子':
              this.bg = '#F04C64';
              break;
          default:
              this.bg = '#FF4500';
        }
//        this.bg = bgColor;
//        this.title = title;
//        console.log(bg);
    }
  },
  watch: {//使用watch 监听$router的变化
    $route(to, from) {
      //如果to索引大于from索引,判断为前进状态,反之则为后退状态
      if(to.meta.index > from.meta.index){
        //设置动画名称
        this.transitionName = 'slide-left';
      }else{
        this.transitionName = 'slide-right';
      }
    }
  }
}
</script>

<style>
  .content{
    margin-top:1rem;
  }
  .fade-enter-active,.fade-leave-active{
    transition: all 0.5s ease-out;
  }
  /* 进入开始 */
  .fade-enter{
    transform: translateY(-500px);
    opacity: 0;
  }
  /* 出去终点 */
  .fade-leave-active{
    transform: translateY(500px);
    opacity: 0;
  }
</style>
