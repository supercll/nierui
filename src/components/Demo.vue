<template>
  <div class="demo">
    <h2>{{ component.__sourceCodeTitle }}</h2>
    <div class="demo-component">
      <component :is="component" />
    </div>
    <div class="demo-actions">
      <nr-button @click="hideCode" v-if="codeVisible">隐藏代码</nr-button>
      <nr-button @click="showCode" v-else>查看代码</nr-button>
    </div>
    <transition :duration="550" :mode="'in-out'" name="nested">
      <div class="demo-code" v-if="codeVisible">
        <pre class="language-html" v-html="html" />
      </div>
    </transition>

  </div>
</template>

<script lang="ts">
import { NrButton } from '@/lib/index.js'
import 'prismjs'
import 'prismjs/themes/prism.css'
import {
  computed,
  ref
} from 'vue'
const Prism = (window as any).Prism

export default {
  components: {
    NrButton,
  },
  props: {
    component: Object,
  },
  setup(props) {
    const html = computed(() => {
      return Prism.highlight(props.component.__sourceCode, Prism.languages.html, 'html')
    })
    const showCode = () => {
      codeVisible.value = true
    }
    const hideCode = () => {
      codeVisible.value = false
    }
    const codeVisible = ref(false)

    return {
      Prism,
      html,
      codeVisible,
      showCode,
      hideCode,
    }
  },
}
</script>

<style lang="scss" scoped>
$border-color: #d9d9d9;

.demo {
  border: 1px solid $border-color;
  margin: 16px 0 32px;

  >h2 {
    font-size: 20px;
    padding: 8px 16px;
    border-bottom: 1px solid $border-color;
  }

  &-component {
    padding: 16px;
  }

  &-actions {
    padding: 8px 16px;
    border-top: 1px dashed $border-color;
  }

  &-code {
    padding: 8px 16px;
    border-top: 1px dashed $border-color;

    >pre {
      line-height: 1.1;
      font-family: Consolas, 'Courier New', Courier, monospace;
      margin: 0;
    }
  }

  .nested-enter-active,
  .nested-leave-active {
    transition: all 0.3s linear;
  }

  /* delay leave of parent element */
  .nested-leave-active {
    transition-delay: 0.25s;
  }

  .nested-enter-from,
  .nested-leave-to {
    transform: translateY(30px);
    opacity: 0;
  }

  /* we can also transition nested elements using nested selectors */
  .nested-enter-active .language-html,
  .nested-leave-active .language-html {
    transition: all 0.3s linear;
  }

  /* delay enter of nested element */
  .nested-enter-active .language-html {
    transition-delay: 0.25s;
  }

  .nested-enter-from .language-html,
  .nested-leave-to .language-html {
    transform: translateX(30px);
    opacity: 0.001;
  }
}
</style>
