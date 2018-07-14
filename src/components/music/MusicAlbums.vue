<!--<template>-->
  <!--<div style="padding:10px 0;">-->
    <!--<aplayer autoplay :music="mList" v-if="success"></aplayer>-->
  <!--</div>-->
<!--</template>-->

<!--<script>-->
  <!--import Aplayer from 'vue-aplayer'-->
  <!--import axios from 'axios'-->
  <!--export default{-->
    <!--components:{-->
      <!--Aplayer-->
    <!--},-->
    <!--data(){-->
        <!--return {-->
          <!--mList:[],-->
          <!--success:false-->
        <!--}-->
    <!--},-->
    <!--created(){-->
        <!--axios.get('/static/data/musicdata.json').then(res=>{-->
            <!--console.log(res.data.musicData);-->
            <!--res.data.musicData.forEach(element=>{-->
                <!--this.mList.push({-->
                  <!--artist:element.artist,-->
                  <!--pic:element.pic,-->
                  <!--src:element.src,-->
                  <!--title:element.title-->
                <!--});-->
            <!--});-->
            <!--console.log(this.mList);-->
<!--//            this.mList = res.data.musicData;-->
        <!--}).catch(res=>{-->
            <!--console.log('failed');-->
        <!--})-->
      <!--this.success = true;-->
    <!--}-->
  <!--}-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->

<template>
  <div class="wwqmusic">
    <aplayer v-if="isReady" :music="music" :list="musicList" :showLrc="true"></aplayer>
  </div>
</template>

<script>
  import Aplayer from 'vue-aplayer'
  import axios from 'axios'
  export default{
    data(){
      return{
        musicList:[],
        music:[],
        isReady:false
      }
    },
    components:{
      Aplayer
    },
    created(){
      this.getData();
    },
    methods:{
      getData(){
        axios.get('./static/data/musicdata.json').then((res)=>{
          let obj = {};
          for(var i=0;i<res.data.musicData.length;i++){
            this.musicList.push({
              title:res.data.musicData[i].title,
              artist:res.data.musicData[i].artist,
              src:res.data.musicData[i].src,
              pic:res.data.musicData[i].pic,
              lrc:'http://localhost:8080/static/'+res.data.musicData[i].lrc
            })
          }
          obj.title = res.data.musicData[0].title;
          obj.artist = res.data.musicData[0].artist;
          obj.src = res.data.musicData[0].src;
          obj.pic = res.data.musicData[0].pic;
          obj.lrc = 'http://localhost:8080/static/'+res.data.musicData[0].lrc;
          this.music = obj;
          this.isReady = true;
        }).catch(()=>{
          console.log("error!");
        })
      }
    }
  }
</script>

<style scoped>
  .wwqmusic {
    padding: 5px 0;
  }
</style>

