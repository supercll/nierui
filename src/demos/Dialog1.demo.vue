<demo>
默认 Dialog
</demo>
<template>
  <div>
    <nr-button @click="toggle">打开对话框</nr-button>
    <nr-dialog v-model:visible="bool" :closeOnClickOverlay="false" :onSure="confirm" :onCancel="cancel">
      <template v-slot:content>
        <strong>hi</strong>
        <div>hi2</div>
      </template>
      <template v-slot:title>
        <strong>加粗的标题</strong>
      </template>
    </nr-dialog>
  </div>
</template>

<script lang="ts">
import { NrDialog } from '../lib/index'
import { NrButton } from '../lib/index'
import { ref } from 'vue'
export default {
  components: {
    NrDialog,
    NrButton,
  },
  setup() {
    const bool = ref(false)
    const toggle = () => {
      bool.value = !bool.value
    }
    const confirm = () => {
      return true
    }
    const cancel = () => {
      console.log('cancel')
    }

    return {
      bool,
      toggle,
      confirm,
      cancel,
    }
  },
}
</script>
