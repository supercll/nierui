<template>
  <div
    v-if="isMobile"
    class="nier-progress"
    ref="progressRef"
    @touchstart="onMouseDown($event)"
  >
    <div class="nier-progress-wrap">
      <div class="nier-progress-bar" :style="barStyle"></div>
    </div>
    <div class="nier-progress-icon-wrap" :style="barStyle">
      <svg class="icon nier-progress-icon">
        <use :xlink:href="`#icon-${xh}`" />
      </svg>
    </div>
    {{ percentage }}
  </div>
  <div
    v-else
    class="nier-progress"
    ref="progressRef"
    @mouseenter="showIcon"
    @mousedown="onMouseDown($event)"
  >
    <div class="nier-progress-wrap">
      <div class="nier-progress-bar" :style="barStyle"></div>
    </div>
    <div class="nier-progress-icon-wrap" :style="barStyle">
      <svg class="icon nier-progress-icon">
        <use :xlink:href="`#icon-${xh}`" />
      </svg>
    </div>
  </div>
</template>

<script lang="ts" scoped>
import {
  computed,
  nextTick,
  ref,
  toRefs
} from 'vue'

function browserRedirect() {
  const sUserAgent = navigator.userAgent.toLowerCase()
  const bIsIpad = /ipad/.test(sUserAgent)
  const bIsIphoneOs = /iphone os/.test(sUserAgent)
  const bIsAndroid = /android/.test(sUserAgent)
  const bIsWM = /windows mobile/.test(sUserAgent)

  if (bIsIpad || bIsIphoneOs || bIsAndroid || bIsWM) {
    return true // 移动设备
  } else {
    return false // PC
  }
}

const isMobile = browserRedirect()

export default {
  name: 'nr-process',
  props: {
    percentage: {
      type: Number,
      default: 20,
    },
    xh: {
      type: String,
      default: 'progress_tv',
    },
  },
  setup(props, ctx) {
    const { percentage } = toRefs(props)
    const progressRef = ref(null)
    const moveData = {
      progressStart: 0,
      mouseStartX: 0,
      mouseStartY: 0,
      times: 0,
      isPress: false,
      offsetLeft: 0,
    }

    nextTick(() => {
      moveData.times = progressRef.value.offsetWidth / 100
      moveData.offsetLeft = progressRef.value.getBoundingClientRect().left
    })

    const barStyle = computed(() => {
      return {
        transform: `translateX(-${100 - percentage.value}%)`,
      }
    })

    const onMouseMove = (e) => {
      let event = e

      if (isMobile) {
        event = e.touches[0]
      }
      if (moveData.isPress) {
        const dx = event.clientX - moveData.mouseStartX
        const dy = event.clientY - moveData.mouseStartY

        if (dx > dy) {
          e.preventDefault()
        }
        let currentPercentage = moveData.progressStart + dx / moveData.times

        if (currentPercentage < 0) currentPercentage = 0
        if (currentPercentage > 100) currentPercentage = 100

        ctx.emit('update:percentage', Math.floor(currentPercentage))
      }
    }
    const onMouseDown = (e) => {
      moveData.isPress = true
      let event = e

      if (isMobile) {
        event = e.touches[0]
      }
      moveData.mouseStartX = event.clientX
      moveData.mouseStartY = event.clientY
      if (/[svg|use]/.test(event.target.tagName)) {
        moveData.progressStart = percentage.value
      } else {
        moveData.progressStart =
          Math.floor((moveData.mouseStartX - moveData.offsetLeft) / moveData.times)
        ctx.emit('update:percentage', moveData.progressStart)
      }
      if (isMobile) {
        document.addEventListener('touchmove', onMouseMove, { passive: false })
        document.addEventListener('touchend', onMouseUp)
      } else {
        document.addEventListener('mousemove', onMouseMove, { passive: false })
        document.addEventListener('mouseup', onMouseUp)
      }
    }

    const onMouseUp = () => {
      moveData.isPress = false
      document.removeEventListener('touchmove', onMouseMove)
      document.removeEventListener('touchend', onMouseUp)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    return {
      barStyle,
      onMouseDown,
      progressRef,
      isMobile,
    }
  },
}
</script>

<style lang="scss" scoped>
.nier-progress {
  position: relative;
  width: 100%;
  height: 4px;
  border-radius: 10px;
  cursor: pointer;

  &:hover,
  &:active {
    transform: scaleY(1.5);
  }

  &:hover &-icon {
    transform: scaleX(1.5) translateY(-50%) translateX(50%);
  }

  &-wrap {
    overflow: hidden;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    background: rgba(173, 176, 190, 0.4);
  }

  &-bar {
    width: 100%;
    height: 100%;
    background: #00a1d6;
  }

  &-icon-wrap {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    text-align: right;
  }

  &-icon {
    position: absolute;
    top: 50%;
    right: 0;
    width: 15px;
    height: 15px;
    transition: all 300ms;
    transform: scale(1) translateY(-50%) translateX(50%);

    &:active {
      transform: scale(1) translateY(-50%) translateX(50%);
    }
  }
  @media (max-width: 500px) {
    .nier-progress-icon {
      transform: scale(1) translateY(-50%) translateX(50%);
    }
  }
}
</style>
