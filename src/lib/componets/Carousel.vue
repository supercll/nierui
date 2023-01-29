<template>
  <div class="nier-carousel" ref="carouselDom">
    <div
      class="nier-carousel-container"
      :class="{ autoplay: carouselData.autoplay }"
      ref="containerRef"
    >
      <slot></slot>
    </div>
    <div @click="onPrev" class="nier-carousel-button nier-carousel-button_prev">
      &lt;
    </div>
    <div @click="onNext" class="nier-carousel-button nier-carousel-button_next">
      &gt;
    </div>
    <ul class="nier-carousel-nav">
      <li
        v-for="(item, index) in carouselData.length"
        :key="item"
        :data-id="index"
        :class="{ active: index == carouselData.currentIndex }"
        @click="onToggle"
      ></li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  VueElement
} from 'vue'
type RefElement = Element & VueElement
const props = defineProps({
  transition: {
    type: String,
    default: 'transform .4s ease-in-out',
  },
  delay: {
    type: Number,
    default: 1500,
  },
  timingFunction: {
    type: String,
    default: 'linear',
  },
})
const getNextIndex = (index) => {
  if (index >= carouselItemList.length) {
    return 0
  } else if (index <= -1) {
    return carouselItemList.length - 1
  } else {
    return index
  }
}

defineComponent({
  name: 'nr-carousel',
})
const carouselDom = ref<RefElement>()

const containerRef = ref<RefElement>()

let carouselItemList: HTMLElement[] = null

const virtualList: number[] = []

let io = null as IntersectionObserver
const { delay } = props
let autoTimer = null

const carouselData = reactive({
  list: [],
  currentIndex: 0,
  length: 0,
  autoplay: false,
})

const initCarousel = () => {
  carouselItemList = Array.from(document.querySelectorAll('.nier-carousel_item'))

  carouselData.list = carouselItemList
  carouselData.length = carouselItemList.length

  carouselItemList.forEach((item: HTMLElement, index) => {
    virtualList.push(index)
    if (index === carouselItemList.length - 1) {
      item.style.transform = 'translateX(-100%)'
    } else {
      item.style.transform = `translateX(${index * 100}%)`
    }
  })
  virtualList.unshift(virtualList.pop())

  setActive(0)
}

onMounted(() => {
  initCarousel()
  // 鼠标悬浮事件
  carouselDom.value.onmouseenter = () => {
    clearInterval(autoTimer)
  }
  carouselDom.value.onmouseleave = () => {
    autoPlayer()
  }
  // 视口显示监听
  io = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return
      autoPlayer()
    },
    { root: null, threshold: [0.5] }
  )
  io.observe(carouselDom.value)
})

onBeforeUnmount(() => {
  containerRef.value.ontransitionend = null
  carouselDom.value.onmouseenter = null
  carouselDom.value.onmouseleave = null
  clearInterval(autoTimer)
  autoTimer = null
  io.unobserve(carouselDom.value) // 停止观察
  io.disconnect() // 关闭观察器
})

const autoPlayer = () => {
  autoTimer = setInterval(() => {
    onNext()
  }, delay)
}

const setAnimation = () => {
  carouselItemList.forEach(el => {
    el.classList.remove('is_animating')
  })
  carouselItemList[0].classList.add('z_index-3')
  carouselItemList[1].classList.add('z_index-3')

  for (let i = 0; i < 3; i++) {
    carouselItemList[virtualList[i]].classList.add('is_animating')
  }
}

const setActive = (activeIndex, isToggle = false) => {
  const virtualList = setVirtualPosition(activeIndex)

  if (!isToggle) {
    setAnimation()
  } else {
    carouselItemList.forEach(el => {
      el.classList.add('is_animating')
    })
  }

  carouselData.currentIndex = activeIndex
  carouselItemList.forEach((el, domPosition) => {
    el.style.transform = `translateX(${(virtualList.indexOf(domPosition) - 1) * 100}%)`
  })
}

const setVirtualPosition = (currentIndex) => {
  virtualList.forEach((item, index, vList) => {
    if (index === 0) {
      const virtualPosition = currentIndex - 1

      vList[index] = virtualPosition >= 0 ? virtualPosition : virtualPosition + carouselItemList.length
    } else {
      const virtualPosition = currentIndex + index - 1

      vList[index] = virtualPosition <= carouselItemList.length - 1 ? virtualPosition : virtualPosition - carouselItemList.length
    }
  })
  return virtualList
}

const onNext = () => {
  const nextIndex = getNextIndex(carouselData.currentIndex + 1)

  setActive(nextIndex)
}
const onPrev = () => {
  const prevIndex = getNextIndex(carouselData.currentIndex - 1)

  setActive(prevIndex)
}

const onToggle = (e) => {
  const id = Number(e.target.dataset.id)

  setActive(id, true)
}

</script>
 <style lang="scss">
.nier-carousel {
  box-sizing: border-box;
  position: relative;
  width: 460px;
  height: 240px;
  margin: 0 5px;
  background: #d0cca5;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  overflow: hidden;

  .is_animating {
    transition: v-bind(transition);
  }

  &-container {
    position: relative;
    height: 100%;
  }

  &:hover &-button {
    visibility: visible;
  }

  &-button {
    visibility: hidden;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 28px;
    color: rgba(251, 114, 153, 0.4);
    cursor: pointer;
    margin: 0 5px;
    z-index: 10;

    &:hover {
      color: #73c9e5;
    }

    &_prev {
      left: 0;
    }
    &_next {
      right: 0;
    }
  }

  &-nav {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    z-index: 10;
    li {
      width: 12px;
      height: 12px;
      margin: 0 8px;
      cursor: pointer;
      border-radius: 50%;
      background: #000000;

      &:hover {
        background: #686157;
      }
    }

    &-active {
      background: #686157;
    }
  }

  .active {
    background: #686157;
  }
  .autoplay {
    transition: none !important;
  }

  .z_index-3 {
    z-index: 3;
  }
}
</style>
