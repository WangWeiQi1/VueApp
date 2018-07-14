<template>
  <!--<div>-->
  <!--&lt;!&ndash;<common-header bgColor="rgb(33,150,243)">&ndash;&gt;-->
  <!--&lt;!&ndash;<span slot="title">Movie</span>&ndash;&gt;-->
  <!--&lt;!&ndash;</common-header>&ndash;&gt;-->

  <!--&lt;!&ndash;<common-footer bgColor="rgb(33,150,243)">&ndash;&gt;-->

  <!--&lt;!&ndash;</common-footer>&ndash;&gt;-->
  <!--</div>-->
  <div>
    <ul class="list">
      <li @click="getDetail(movie.id)" class="movie" v-for="movie in movieList" :key="movie.id">
        <div class="movie-img">
          <img :src="movie.img" alt="">
          <!--<img src="https://p0.meituan.net/128.180/movie/238e2dc36beae55a71cabfc14069fe78236351.jpg" alt="">-->
        </div>
        <div class="movie-info">
          <p class="movie-name">{{movie.nm}}</p>
          <p class="ping">评分</p>
          <p class="fen">{{movie.sc}}</p>
          <p class="star">主演:{{movie.star}}</p>
          <!--<p>上映时间:{{movie.rt}}</p>-->
          <p>{{movie.showInfo}}</p>
        </div>
      </li>
    </ul>
    <div class="loading" v-show="isLoading">
      <img src="../../assets/img/123.gif" alt="">
    </div>
    <div class="tip" v-show="isEnd">
      <h3>数据到底了。。。</h3>
    </div>
  </div>


</template>

<script>
  //  import CommonHeader from '@/components/common/Header'
  //  import CommonFooter from '@/components/common/Footer'
  import axios from 'axios'
  export default{
//    components:{
//      CommonHeader,
//      CommonFooter
//    }
    data(){
      return {
        movieList:[],
        isLoading:true,
        isEnd:false
      }
    },
    methods:{
      getMovieData(){
//        axios.get(API_PROXY+`http://m.maoyan.com/movie/list.json?type=hot&offset=${this.movieList.length}&limit=10`).
        axios.get(API_PROXY+`http://m.maoyan.com/ajax/movieOnInfoList`).
        then(res=>{
          console.log(res.data.movieList);
//            this.movieList = res.data.movieList;
          const lista = res.data.movieList;
          lista.map(e => {
            //map用于对数组遍历
            return e.img = e.img.replace('w.h', '128.180');
          })
          this.movieList = lista;

//            console.log('lista', lista)

//            let list = res.data.movieList;
          if(lista.length<10){
            this.isEnd = true;
          }
//          this.movieList = this.movieList.concat(list);
          this.isLoading = false;
        }).catch(res=>{
          alert('failed');
        })
      },
      getDetail(movieId){
        this.$router.push(`/moviedetail/${movieId}`);
      }
    },
    created(){
      this.getMovieData();
    },
    mounted(){
      window.onscroll = ()=> {
        let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
        let clientHeight = document.documentElement.clientHeight;
        let scrollHeight = document.documentElement.scrollHeight;
//          console.log(scrollTop,clientHeight,scrollHeight);
        if(scrollTop+clientHeight == scrollHeight && !this.isEnd){
          this.isLoading = true;
          setTimeout(()=>{
//                this.getMovieData();
            if(this.movieList.length>=12){
              this.isLoading = false;
              this.isEnd = true;
            }
          },1000);

        }
      }
    }
  }

</script>

<style scoped>
  .list{
    margin-bottom:2rem;
    padding:0 .1rem;
  }
  .movie{
    display:flex;
    border-bottom:1px solid #ccc;
    padding:.1rem;
  }
  .movie-img{
    flex-grow:1;
    width: 0;
    margin-right:.1rem;
  }
  .movie-info{
    flex-grow:2;
    width: 0;
  }
  .movie-name{
    font-weight: bolder;
  }
  .loading{
    text-align: center;
    /*margin-bottom:1rem;*/
    position: fixed;
    bottom: 1rem;
    width: 100%;
  }
  .tip{
    text-align: center;
    margin-bottom:1rem;
  }
  .ping{
    float:left;
    padding:.2rem .1rem 0 0;
  }
  .fen{
    font-size:25px;
    color:#ffc600;
  }
  .star{
    margin-bottom:.1rem;
  }

</style>
