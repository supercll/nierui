<demo>
一键打开 Dialog
</demo>
<template>
  <div>
    <nr-button @click="showDialog">打开对话框</nr-button>
  </div>
</template>

<script lang="ts">
import { NrButton } from '../lib/index'
import { h } from 'vue'
import { openDialog } from '../lib/index'
export default {
  components: {
    NrButton,
  },
  setup() {
    const showDialog = () => {
      openDialog({
        title: h('strong', {}, '标题'),
        content: 'hello',
        onSure() {
          console.log('onSure')
        },
        cancel() {
          console.log('cancel')
        },
      })
    }

    return {
      showDialog,
    }
  },
}
</script>
