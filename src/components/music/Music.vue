<template>
  <ul>
    <li class="music" v-for="item in musicList" :key="item.id">
      <router-link :to="'/musicAlbums/'+item.id">
      <img :src="item.bg" alt="">
      </router-link>
    </li>
  </ul>
</template>

<script>
  import axios from 'axios'
  export default{
    created(){
        axios.get('./static/data/musiclist.json').then(res=>{
          console.log(res.data);
          this.musicList = res.data.albums;
        }).catch(res=>{
          console.log('failed');
        });
    },
    data(){
        return {
            musicList:[]
        }
    }
  }
</script>

<style scoped>
  .music{
    width: 50%;
    float:left;
  }
  .music img{
    width: 100%;
  }
</style>
