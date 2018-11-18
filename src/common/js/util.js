function getRandomInt(min,max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function shuffle(arr) {
  let _arr = arr.slice(); //_arr为arr副本 使其不影响arr的数据
  for(let i=0;i<_arr.length;i++){
    let j = getRandomInt(0,1);
    let t = _arr[i];
    _arr[i] = _arr[j];
    _arr[j] = t;
  }
  return _arr;
}

//截流函数
//也就是说当很快的去调用一个函数的时候 截流函数保证这个func只调用一次
//从而起到截流的作用
export function debounce(func,delay) {
  let timer;
  return function(...args){
    if(timer){
      clearTimeout(timer);
    }
    timer = setTimeout(()=>{
      func.apply(this,args)
    },delay)
  }
}
