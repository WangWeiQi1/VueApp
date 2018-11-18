import {playMode} from '../common/js/config'
import {loadSearch,loadPlay,loadFavorite} from '../common/js/cache'
const state = {
  singer: {},
  playing: false, //播放
  fullScreen: false, //全屏
  playlist: [], //播放列表
  sequenceList: [], //顺序播放列表
  mode: playMode.sequence, //默认为顺序播放
  currentIndex: -1,
  disc: {},
  rankList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}

export default state
