<template>
  <div class="nier-carousel" ref="carouselDom">
    <div
      class="nier-carousel-container"
      :class="{ closeTransition: listData.closeTran }"
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
        v-for="(item, index) in listData.length"
        :key="item"
        :data-id="index"
        :class="{ active: index == listData.currentIndex }"
        @click="onToggle"
      ></li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
  VueElement,
  watch
} from 'vue'
type RefElement = Element & VueElement
const props = defineProps({
  speed: {
    type: Number,
    default: 0.25,
  },
  autoDelay: {
    type: Number,
    default: 2000,
  },
  timingFunction: {
    type: String,
    default: 'linear',
  },
})

defineComponent({
  name: 'nr-carousel',
})
const carouselDom = ref<RefElement>()

const containerRef = ref<RefElement>()

let carouselItemList: HTMLElement[] = null

let io = null as IntersectionObserver
const { speed, autoDelay, timingFunction } = props
let autoTimer = null

const listData = reactive({
  list: [],
  showIndex: 0,
  currentIndex: 0,
  length: 0,
  closeTran: false,
})
const tranSpeed = computed(() => {
  const transition = `transition: transform ${speed}s ${timingFunction};`

  return transition
})

const styles = computed(() => {
  return `${tranSpeed.value}transform: translateX(${-listData.currentIndex * 100}%)`
})

console.log(styles.value)

const initCarousel = () => {
  carouselItemList = Array.from(document.querySelectorAll('.nier-carouselItem'))

  carouselItemList.forEach((item: HTMLElement, index) => {
    item.style.transform = `translateX(${index * 100}%)`
  })
  listData.list = carouselItemList
  listData.length = carouselItemList.length
  // 克隆首位节点
  const copyDomFirst: HTMLElement = listData.list[listData.length - 1].cloneNode(true)
  const copyDomLast = listData.list[listData.list.length - 1]
  const firstChild = containerRef.value.firstElementChild

  containerRef.value.insertBefore(copyDomFirst, firstChild)
  containerRef.value.removeChild(copyDomLast)
  copyDomFirst.style.transform = 'translateX(-100%)'
  setActive(0)
}

onMounted(() => {
  initCarousel()
  // 鼠标悬浮事件
  carouselDom.value.onmouseenter = () => {
    clearInterval(autoTimer)
  }
  carouselDom.value.onmouseleave = () => {
    // autoPlayer()
  }
  // 视口显示监听
  io = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return
      // autoPlayer()
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
  }, autoDelay)
}

const setActive = (activeIndex) => {
  carouselItemList[activeIndex].classList.add('is_animating')
  nextTick(() => {
    listData.currentIndex = activeIndex
    /*
     * carouselItemList[activeIndex].ontransitionend = () => {
     *   carouselItemList.forEach((carouselItem, index) => {
     *     if (activeIndex !== index) {
     *       carouselItem.classList.remove('is_animating')
     *     }
     *   })
     * }
     */
  })
  console.log()
}

watch(() => listData.currentIndex, (currentIndex) => {
  carouselItemList.forEach((el, index) => {
    const n = index - currentIndex

    el.style.transform = `translateX(${n * 100}%)`
  })
})
const onNext = () => {
  setActive(listData.currentIndex + 1)
  console.log(listData.currentIndex)
}
const onPrev = () => {
  setActive(listData.currentIndex - 1)
}

const onToggle = (e) => {
  const id = e.target.dataset.id

  listData.currentIndex = id
  listData.showIndex = id
}

const timeout = () => {
  let timer = setTimeout(() => {
    clearTimeout(timer)
    timer = null
    listData.closeTran = false
  })
}

/*
 * watch(
 *   () => listData.currentIndex,
 *   () => {
 *     const currentIndex = listData.currentIndex
 *     const listLength = listData.length
 */

/*
 *     containerRef.value.style.transform = `translateX(${-currentIndex * 100}%)`
 *     if (currentIndex < 0) {
 *       listData.showIndex = listLength - 1
 *     } else if (currentIndex >= listLength) {
 *       listData.showIndex = 0
 *     } else {
 *       listData.showIndex = currentIndex
 *     }
 *   }
 * )
 */

</script>
 <style lang="scss">
.nier-carousel {
  box-sizing: border-box;
  position: relative;
  width: 460px;
  height: 240px;
  margin: 0 5px;
  background: rgba(115, 201, 229, 0.3);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .is_animating {
    transition: transform .4s ease-in-out;
  }

  &-container {
    position: relative;
    height: 100%;
  }

  &:hover &-button {
    visibility: visible;
  }
  // overflow: hidden;

  &-button {
    visibility: hidden;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 28px;
    color: rgba(251, 114, 153, 0.4);
    cursor: pointer;
    margin: 0 5px;
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

    li {
      width: 12px;
      height: 12px;
      margin: 0 8px;
      cursor: pointer;
      border-radius: 50%;
      background: rgba(251, 114, 153, 0.4);

      &:hover {
        background: #73c9e5;
      }
    }

    &-active {
      background: #73c9e5;
    }
  }

  .active {
    background: #73c9e5;
  }
  .closeTransition {
    transition: none !important;
  }
}
</style>
