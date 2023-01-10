<demo>
loading按钮
</demo>
<template>
  <div>
    <nr-button loading>loading</nr-button>
    <nr-button @click="onLoad" :loading="loading">{{status}}</nr-button>
  </div>
</template>

<script lang="ts">
import { NrButton } from '../lib/index'
import { ref } from 'vue'
export default {
  components: {
    NrButton,
  },
  setup() {
    const loading = ref(false)
    const status = ref('click me')
    const onLoad = () => {
      loading.value = true
      status.value = 'loading'
      let timer = setTimeout(() => {
        clearTimeout(timer)
        timer = null
        loading.value = false
        status.value = 'click me'
      }, 2000)
    }
    const onClick = () => {
      alert('点击了')
    }

    return {
      onLoad,
      loading,
      status,
      onClick,
    }
  },
}
</script>
