<template>
  <div>
    <ul class="head">
      <li class="duan" v-for="duanzi in duanziList">
        <h3 class="title">{{duanzi.text}}</h3>
        <img :src="duanzi.image" alt="">
        <img :src="duanzi.gif" alt="">
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios'
  export default{
      data(){
          return {
              duanziList:[]
          }
      },
      created(){
          axios.get(API_PROXY+`https://www.apiopen.top/satinGodApi?type=1&page=1`).then(res=>{
              console.log(res);
              this.duanziList = res.data.data;
          }).catch(res=>{
              alert('failed');
          })
      }
  }
</script>

<style scoped>
  .head{
    margin-bottom:1rem;
  }
  .duan{
    border-bottom:1px solid #ccc;
    padding-bottom:.1rem;
  }
</style>
