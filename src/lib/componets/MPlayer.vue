<template>

  <!--音乐播放器-->
  <div class="music-container" :class="{'music-active-switch': offsetThreshold}">
    <div class="music-disk">
      <!--唱片图片-->
      <img class="music-disk-picture"
           :class="{'music-disk-playing-style': playState}"
           src="https://nier.oss-cn-shanghai.aliyuncs.com/web/record.png"
           alt="">

    </div>
    <!--按钮组-->
    <div class="button-group">
      <!--上一曲 按钮-->
      <button class="play-button" @click="lastButtonClick">
        <icon-go-start theme="outline"
                       size="23"
                       fill="#939393"
                       :strokeWidth="3"
                       strokeLinejoin="miter"
                       strokeLinecap="butt" />
      </button>
      <!--播放 按钮-->
      <button class="play-button" @click="playButtonClick">
        <svg v-if="!playState" :class="['icon', `icon-play`]">
          <use :xlink:href="`#icon-play`" />
        </svg>
        <svg v-if="playState" :class="['icon', `icon-pause`]">
          <use :xlink:href="`#icon-pause`" />
        </svg>
      </button>
      <!--下一曲 按钮-->
      <button class="play-button" @click="nextButtonClick">
        <icon-go-end theme="outline"
                     size="23"
                     fill="#939393"
                     :strokeWidth="3"
                     strokeLinejoin="miter"
                     strokeLinecap="butt" />
      </button>

    </div>
    <audio
      ref="musicAudio"
      class="audio-component"
      controls
      preload="auto"
      @canplay="changeDuration">
      <source ref="musicSource" type="audio/mpeg" />
    </audio>
  </div>

</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, reactive, ref } from 'vue'

/*
 * 这里是自己封装的axios请求，可以将这里替换成自己的请求逻辑
 * import requests from '@/api/ajax'
 */

export default defineComponent({
  name: 'nr-m-player',
  props: {
    musicArr: {

      type: Array<string>,
      default: [],
    },
  },
  setup() {
    // 是否正在播放
    const playState = ref(false)

    // 歌曲的时间长度
    const playDuration = ref(0.00)

    // 歌曲URL
    const musicUrl = ref('')

    // 播放器标签
    const musicAudio = ref(null)

    // 实现音乐播放的标签
    const musicSource = ref(null)

    // 是否静音
    const voiceMute = ref(false)

    // 音量大小
    const voicePower = ref(0.5)

    const musicState = reactive({
      musicArr: [],
      musicCount: 0,
    })

    const musicCursor = ref(0)

    // 页面偏移量
    const pageOffset = ref(0)

    // 是否达到阈值，达到阈值就显示播放器，反之
    const offsetThreshold = ref(true)

    // 激活播放器
    const operateMusicPlayer = () => {
      pageOffset.value = window.scrollY
      // 当页面滚动偏移达到800，激活用户框
      if (pageOffset.value > 800) {
        offsetThreshold.value = true
      } else {
        // 反之
        offsetThreshold.value = false
      }
    }

    // 播放按钮点击回调
    const playButtonClick = () => {
      if (playState.value) {
        musicAudio.value.pause()
      } else {
        musicAudio.value.play()
      }

      // 重新设置播放状态
      playState.value = !playState.value
    }

    // 上一曲按钮点击回调
    const lastButtonClick = () => {
      musicCursor.value -= 1

      changeMusic()
    }

    // 下一曲按钮点击回调
    const nextButtonClick = () => {
      musicCursor.value += 1

      changeMusic()
    }

    // 当歌曲能播放时【亦即在canplay钩子函数中】，musicAudio.value.duration才不会是NaN，才能进行歌曲长度的设置
    const changeDuration = () => {
      if (playDuration.value != musicAudio.value.duration) {
        // 修改歌曲播放时间
        playDuration.value = musicAudio.value.duration
      }
    }

    // 音量按钮点击回调
    const voiceButtonClick = () => {
      voiceMute.value = !voiceMute.value

      if (!voiceMute.value) {
        voicePower.value = 1

        musicAudio.value.volume = 1
      } else {
        voicePower.value = 0

        musicAudio.value.volume = 0
      }
    }

    // el-slider的钩子函数，用于调节音量
    const changeVoicePower = (val) => {
      musicAudio.value.volume = val

      voicePower.value = val

      if (val > 0) {
        voiceMute.value = false
      } else {
        voiceMute.value = true
      }
    }

    // 切歌
    const changeMusic = () => {
      // 切歌【这里的music_url是后端返回给前端的json字符串中，用于存储歌曲在线链接的属性名是：music_url，所以要实现自己的请求逻辑，将这里的music_url改为自己的即可】
      musicSource.value.src = musicState.musicArr[musicCursor.value % musicState.musicCount].music_url

      // 当刷新了url之后，需要执行load方法才能播放这个音乐
      musicAudio.value.load()

      musicAudio.value.play()

      playState.value = true
    }

    /*
     * 初始化歌曲源【将这里替换成自己的请求逻辑】
     * const initMusicArr = () => {
     *   requests.get('/Music/QueryAllMusic').then(function(res) {
     *     musicState.musicArr = res
     */

    /*
     *     musicState.musicCount = res.length
     *   })
     * }
     */

    onMounted(() => {
      // initMusicArr()

      // 添加滚动事件
      window.addEventListener('scroll', operateMusicPlayer)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', operateMusicPlayer)
    })

    return {
      musicAudio,
      musicSource,
      playState,
      playDuration,
      musicUrl,
      voiceMute,
      voicePower,
      musicState,
      musicCursor,
      pageOffset,
      offsetThreshold,
      playButtonClick,
      lastButtonClick,
      nextButtonClick,
      voiceButtonClick,
      changeMusic,
      changeDuration,
      changeVoicePower,
    }
  },
})
</script>

<style lang="scss" scoped>

.music-container {
  justify-content: center;
  height: 110px;
  border-radius: 15px;
  bottom: 15px;
  left: 10px;
  transition: 0.5s;
  z-index: 99;
  display: flex;
  flex-direction: column;
  align-items: center;
  .music-disk {
    width: 60px;
    height: 60px;
    border-radius: 50%;

  }

  .music-disk-picture {
    width: inherit;
    height: inherit;
    border-radius: 50%;
    /*设置图片不可点击*/
    pointer-events: none;
  }

  .music-disk-playing-style {
    animation: music-disk-rotate 5s linear infinite;
  }

  @keyframes music-disk-rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .button-group {
    height: 38px;
  }

  .play-button {
    float: left;
    width: 26px;
    height: 26px;
    /*margin: 0px;*/
    border: none;
    border-radius: 50%;
    margin: 2px 0px 0px 0px;
  }

  .voice-button {
    float: left;
    width: 31px;
    height: 31px;
    padding: 0px;
    /*margin: 0px;*/
    border: 0px;
    border-radius: 50%;
    margin: 7px 0px 0px 0px;
    background-color: transparent;
  }

  .voice-container {
    float: left;
    margin-left: 12px;
    width: 31px;
    height: 38px;
    overflow: hidden !important;
    transition: 0.5s;
  }

  .voice-container:hover {
    width: 160px;
  }

  .voice-slider {
    position: relative;
    top: 2px;
    right: -30px;
    width: 90px;
    height: 35px;
    background-color: white;
    border-radius: 10px;
    padding: 0px 15px 0px 15px;
    transition: 0.2s;
  }

  .audio-component {
    width: 300px;
    height: 200px;
    top: 100px;
    display: none;
  }

  .music-active-switch{
    opacity: 1;
  }

}

</style>

