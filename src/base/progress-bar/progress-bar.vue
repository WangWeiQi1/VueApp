<template>
  <div class="progress-bar" ref="progressBar" @click="progressClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref="progressBtn"
           @touchstart.prevent="progressTouchStart"
           @touchmove.prevent="progressTouchMove"
           @touchend="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {prefixStyle} from '../../common/js/dom'
  const progressBtnWidth = 16;
  const transform = prefixStyle('transform');
  export default {
    props:{
      percent:{
        type: Number,
        default: 0
      }
    },
    watch:{
      percent(newPercent){
        if(newPercent >= 0 && !this.touch.initiated){
          const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
          const offsetWidth = newPercent * barWidth;
          this._offset(offsetWidth);
        }
      }
    },
    created(){
      this.touch = {}; //在不同回调函数中需要共享数据的时候 把共享数据挂载到这个touch对象上
    },
    methods:{
      progressTouchStart(e){
        this.touch.initiated = true; //表示已经初始化
        this.touch.startX = e.touches[0].pageX; //第一次手指点击位置
        this.touch.left = this.$refs.progress.clientWidth; //开始点击按钮的时候按钮在进度条上的位置
      },
      progressTouchMove(e){
        if(!this.touch.initiated){
          return;
        }
        const deltaX = e.touches[0].pageX - this.touch.startX; //当前手指位置减去第一次手指位置 计算出的偏移量
        const offsetWidth = Math.min(this.$refs.progressBar.clientWidth -progressBtnWidth,Math.max(0,this.touch.left + deltaX)); //按钮的偏移量
        this._offset(offsetWidth);
      },
      progressTouchEnd(){
        this.touch.initiated = false;
        this._triggerPercent();
      },
      progressClick(e){
        const rect = this.$refs.progressBar.getBoundingClientRect();
        const offsetWidth = e.pageX - rect.left;
        this._offset(offsetWidth);
          //这里当我们点击progress-btn的时候e.offsetX获取不正确
//        this._offset(e.offsetX);
        this._triggerPercent();
      },
      _offset(offsetWidth){
        this.$refs.progress.style.width = offsetWidth + 'px';
        this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
      },
      _triggerPercent(){
        const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
        const percent = this.$refs.progress.clientWidth / barWidth;
        this.$emit('percentChange',percent);
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>
