import {commonParams,options} from './config'
import axios from 'axios'
export function getRankList() {
  const url = '/getRankList';
  const data = Object.assign({},commonParams,{
    g_tk: 5381,
    uin: 0,
    format: 'json',
    platform: 'h5',
    needNewCode: 1
  })
  return axios.get(url,{
    params: data
  }).then(res=>{
    return Promise.resolve(res.data);
  })
}
export function getMusicList(topid) {
  const url = '/getMusicList';
  const data = Object.assign({},commonParams,{
    g_tk: 5381,
    format: 'json',
    platform: 'h5',
    needNewCode: 1,
    tpl: 3,
    page: 'detail',
    type: 'top',
    topid
  })
  return axios.get(url,{
    params: data
  }).then((res) => {
    return Promise.resolve(res.data);
  })
}
