import Vue from 'vue'
import Router from 'vue-router'
import Movie from '@/components/movie/Movie'
import Music from '@/components/music/Music'
import News from '@/components/news/News'
import Jokes from '@/components/jokes/Jokes'
import MovieDetail from '@/components/movie/MovieDetail'
import MusicAlbums from '@/components/music/MusicAlbums'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Movie',
      component: Movie
    },{
      path: '/music',
      name:'Music',
      component: Music,
      beforeEnter(to,from,next){
        from.name===null?next('/'):next();
        // if(from.name === null){
        //   next('/');
        // }else{
        //   next();
        // }
        // console.log(from);
      }
    },{
      path: '/news',
      name:'news',
      component: News,
      beforeEnter(to,from,next){
        from.name === null ? next('/') : next();
      }
    },{
      path: '/jokes',
      name:'Jokes',
      component: Jokes,
      beforeEnter(to,from,next){
        from.name === null ? next('/') : next();
      }
    },{
      path: '/moviedetail/:movieId',
      component: MovieDetail
    },{
      path: '/musicAlbums/:musicId',
      component: MusicAlbums,
      beforeEnter(to,from,next){
        from.name === null ? next('/') : next();
      }
    }
  ]
})
