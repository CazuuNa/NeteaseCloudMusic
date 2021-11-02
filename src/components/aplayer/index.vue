<template>
  <audio
    height="100" width="100"
    ref="audio"
    
    @canplay="getDuration"
    @pause="pause"
    @play="play"
    class="audio-main"
    controls
  >
  <source :src="currentPlayUrl" type="audio/mpeg">
  </audio>
  <!-- <audio controls height="100" width="100"></audio> -->
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, computed } from 'vue'
export default defineComponent({
  setup() {
    const audio = ref(); // 这里是拿到audio的dom元素
    // 开始播放音频'
    function audioPlay() {
      audio.value.play();
    };

    // dom元素加载完后开始播放音乐
    onMounted(() => {
      console.log(audio.value,'audio')
      // audioPlay();
    });
    const state = reactive({
      playList: [
        { url: 'http://m801.music.126.net/20211029121900/021f1bc4037136f33caf4bdcad7275fa/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/10591495406/df09/49ab/22e6/bb312ce0504d022eea11c041efbb7e43.mp3' },
        { url: 'http://m7.music.126.net/20210326154148/251d2d32b08419744ca682170d98bf35/ymusic/0409/520c/5158/3c17fbba85efa6b428d2f2dafd5de326.mp3' },
        { url: 'http://m8.music.126.net/20210326162043/b8af89f1ac2579ea17035b51a7656f7f/ymusic/7634/c63c/a0c1/ad330e06c7f3c791d065af5c255e002c.mp3' }
      ],
      currentIndex: 0,
      isPlay: false,
      currentTime: 0,
    });
    const currentPlayUrl = computed(() => {
      return (state.playList[state.currentIndex]).url;
    });
    /**
     * 更新当前时间
     * 如果当前音频进度 = 总时长，则自动播放下一首
     */
    function timeupdate(e: any) {
      state.currentTime = e.target.currentTime;
      if (e.target.currentTime === state.endTime) {
        nextPlay();
      }
    };
    /**
     * 控制播放按钮
     * 通过paused属性，判断当前音频播放状态
     * 
     */
    function controlPlay() {
      state.isPlay = !state.isPlay;
      if (!audio.value.paused) {
        audio.value.pause();
      } else {
        audio.value.play();
      }
    };
    function play() {
      // 展示播放按钮
    };
    function pause() {
      // 展示暂停按钮
    };
    function getDuration() {
      // 此时可以拿到音频时长（audio.value.duration）;
    };
    return {
      audio, currentPlayUrl,timeupdate, controlPlay, getDuration, pause,play
    };
  }
})
</script>

<style lang="scss" scoped>
.audio-main {
  width: 100%;
}
</style>