import {getLyric} from '../../api/song'
import {ERR_OK} from '../../api/config'
import {Base64} from 'js-base64' //解析base64

export default class Song {
  constructor({id, mid, singer, name, album, duration, image, url}) {
    this.id = id;
    this.mid = mid;
    this.singer = singer;
    this.name = name;
    this.album = album;
    this.duration = duration;
    this.image = image;
    this.url = url;
  }
  getLyric(){
    if(this.lyric){
      return Promise.resolve(this.lyric);
    }
    return new Promise((resolve,reject) => {
      getLyric(this.mid).then(res=>{
        if(res.code === ERR_OK){
          this.lyric = Base64.decode(res.lyric);
          resolve(this.lyric);
        }else{
          reject('no lyric');
        }
      })
    })
  }
}

export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://dl.stream.qqmusic.qq.com/http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=7109466026&vkey=2FD511A6F5516956C5CFD37ED49B2F6B586527397262F10F1AC44356271D8E1000E109290EA5B303ECB68DFEB55259E30D01FE668BB1D220&uin=0&fromtag=38`
  })
}

export function filterSinger(singer) {
  let ret = [];
  if(!singer){
    return '';
  }
  singer.forEach((s)=>{
    ret.push(s.name);
  })
  return ret.join('/');
}

