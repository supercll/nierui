<demo>
音乐播放器
</demo>
<template>
  <Draggable storage-key="vueuse-draggable" storage-type="local" :initialValue="{ x: 200, y: 300 }" style="position: fixed; z-index: 999;">
    <MPlayer></MPlayer>
  </Draggable>
</template>

<script lang="ts">
import { UseDraggable as Draggable } from '@vueuse/components'
import { MPlayer } from '../lib/index'
export default {
  components: {
    MPlayer,
    Draggable,
  },
}
</script>
