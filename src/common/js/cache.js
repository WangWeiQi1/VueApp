import storage from 'good-storage'

const SEARCH_KEY = '__search__';
const SEARCH_MAX_LENGTH = 15;

const PLAY_KEY = '__play__';
const PLAY_MAX_LENGTH = 200;

const FAVORITE_KEY = '__favorite__';
const FAVORITE_MAX_LENGTH = 200;

function insetArray(arr,val,compare,maxLen) {
  const index = arr.findIndex(compare); //查找当前数组中是否有某个元素 支持传入function
  if(index === 0){ //如果找到的index在数组第一位置 则什么都不做
    return;
  }
  if(index > 0){ //如果找到的index不在数组的第一位置 则把这个元素从数组中删除
    arr.splice(index,1);
  }
  arr.unshift(val);  //然后将这个值插入到数组第一位置
  if(maxLen && arr.length > maxLen){ //如果没有查找到index 则插入完毕后比较现在的数组长度和规定的长度 如果超过规定长度则把最后一位删除
    arr.pop()
  }
}

function deleteFromArray(arr,compare) {
  const index = arr.findIndex(compare);
  if(index > -1){
    arr.splice(index,1);
  }
}

export function saveSearch(query) {
  let searches = storage.get(SEARCH_KEY,[]);
  insetArray(searches,query,(item)=>{
    return item === query;
  },SEARCH_MAX_LENGTH)
  storage.set(SEARCH_KEY,searches);
  return searches;
}

export function loadSearch() {
  return storage.get(SEARCH_KEY,[])
}

export function deleteSearch(query) {
  let searches = storage.get(SEARCH_KEY,[]);
  deleteFromArray(searches,(item)=>{
    return item === query;
  });
  storage.set(SEARCH_KEY,searches);
  return searches;
}

export function clearSearch() {
  storage.remove(SEARCH_KEY);
  return [];
}

export function savePlay(song) {
  let songs = storage.get(PLAY_KEY,[]);
  insetArray(songs,song,(item)=>{
    return song.id === item.id;
  },PLAY_MAX_LENGTH)
  storage.set(PLAY_KEY,songs);
  return songs;
}
export function loadPlay() {
  return storage.get(PLAY_KEY,[]);
}

export function saveFavorite(song) {
  let songs = storage.get(FAVORITE_KEY,[]);
  insetArray(songs,song,(item)=>{
    return song.id === item.id;
  },FAVORITE_MAX_LENGTH)
  storage.set(FAVORITE_KEY,songs);
  return songs;
}

export function deleteFavorite(song) {
  let songs = storage.get(FAVORITE_KEY,[]);
  deleteFromArray(songs,(item)=>{
    return song.id === item.id;
  })
  storage.set(FAVORITE_KEY,songs);
  return songs;
}

export function loadFavorite() {
  return storage.get(FAVORITE_KEY,[])
}
