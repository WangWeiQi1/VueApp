<template>
  <div class="singer" ref="singer">
    <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
    <router-view></router-view>
    <!--子路由跳转必须加router-view承载-->
  </div>
</template>

<script>
  import {getSingerList} from '../../api/singer'
  import {ERR_OK} from '../../api/config'
  import Singer from '../../common/js/singer'
  import ListView from '../../base/listview/listview.vue'
  import {mapMutations} from 'vuex'
  import {playlistMixin} from '../../common/js/mixin'

  const HOT_NAME = '热门';
  const HOT_SINGER_LEN = 10;

  export default {
    mixins: [playlistMixin], //解决bottom适配问题
    data(){
      return{
        singers: []
      }
    },
    created(){
      this._getSingerList();
    },
    components:{
      ListView
    },
    methods:{
      handlePlaylist(playlist){
        const bottom = playlist.length > 0 ? '60px' : '';
        this.$refs.singer.style.bottom = bottom;
        this.$refs.list.refresh();
      },
      selectSinger(singer){
        this.$router.push({
          path: `/singer/${singer.id}`
        })
        this.setSinger(singer)
      },
      ...mapMutations({ //代替this.$store.commit（）
        setSinger: 'SET_SINGER'
      }),
      _getSingerList(){
        getSingerList().then(res=>{
          if(res.code === ERR_OK){
//            console.log(res.data.list);
            this.singers = this._normalizeSinger(res.data.list); //传入处理好的数据
//            console.log(this._normalizeSinger(this.singers))
          }
        })
      },
      _normalizeSinger(list){ //将得到的数据按姓名首字母分类
        let map = {
          hot:{
            title: HOT_NAME,
            items: []
          }
        }
        list.forEach((item,index) => {
          if (index < HOT_SINGER_LEN) {
            map.hot.items.push(new Singer({
              name: item.Fsinger_name,
              id: item.Fsinger_mid,
            }))
          }
          const key = item.Findex;
          if(!map[key]){
            map[key] = {
              title: key,
              items: []
            }
          }
          map[key].items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid,
          }))
        })
        //为了得到有序列表 需要处理map
        let hot = [];
        let ret = [];
        for(let key in map){
          let val = map[key];
          if(val.title.match(/[a-zA-Z]/)){ //匹配title为字母的放到ret里面
            ret.push(val);
          }else if(val.title === HOT_NAME){ //匹配热门的放到hot里面
            hot.push(val);
          }
        }
        ret.sort((a,b)=>{
          return a.title.charCodeAt(0) - b.title.charCodeAt(0); //升序排列
        })
        return hot.concat(ret); //合并ret和hot
      }
    }
  }
</script>

<style lang="stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
