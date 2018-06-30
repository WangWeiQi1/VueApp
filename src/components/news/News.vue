<template>
  <div>
    <ul class="head">
      <li class="item-news" v-for="(news,index) in newsList">
        <h3 :class="{active:ind === index}" @mouseover="changeBgc(index)" @mouseout="hideit">{{news.title}}</h3>
        <div class="news-xia">
          <p class="news-date">{{news.date}}</p>
          <img class="icon-com" src="../../assets/img/icon-cmnt.png" alt="">
          <p class="news-comment">{{news.comment}}</p>
          <img class="news-img" :src="news.img" alt="">
        </div>
      </li>
    </ul>
  </div>


</template>

<script>
  import axios from 'axios'
  export default{
    data(){
        return {
            newsList:[],
            ind:''
        }
    },
    created(){
        axios.get(API_PROXY+`https://interface.sina.cn/ent/feed.d.json?ch=ent&col=ent&act=more&t=1484477669001&show_num=10&page=4`).then(res=>{
            console.log(res.data.data);
          this.newsList = res.data.data;
        }).catch(res=>{
           alert('failed');
        });
    },
    methods:{
      changeBgc: function (index) {
          console.log('鼠标移入')
        this.ind = index
      },
      hideit:function (index) {
        console.log('鼠标移出')
        this.ind = !index
      },
    }
  }
</script>

<style scoped>
  .head{
    margin-bottom:1rem;
  }
  .active{
    color:#F04C64;
  }
  .item-news{
    border-bottom:1px solid #ccc;
    /*margin-bottom:1rem;*/
    padding:0 .1rem .2rem .1rem;

  }
  .news-xia{
    display: flex;
  }
  .news-date{
    padding-top:1.7rem;
    flex-grow: 1;
  }
  .news-comment{
    padding-right:.2rem;
    padding-top:1.7rem;
  }
  .icon-com{
    width: 16px;
    height: 16px;
    padding-top:1.8rem;
    padding-right:.1rem;
  }
</style>
