<demo>
function 功能型图标按钮
</demo>
<template>
  <div>
    <nr-button theme="func" xh="praise"></nr-button>
    <nr-button theme="func" xh="coin"></nr-button>
    <nr-button theme="func" xh="collection"></nr-button>
    <nr-button theme="func" xh="dongtai"></nr-button>
    <nr-button theme="func" xh="qq"></nr-button>
    <nr-button theme="func" xh="weibo"></nr-button>
    <nr-button theme="func" xh="tieba"></nr-button>
    <nr-button theme="func" xh="set"></nr-button>
    <nr-button theme="func" xh="add"></nr-button>
  </div>
</template>

<script lang="ts">
import { NrButton } from '../lib/index'
export default {
  components: {
    NrButton,
  },
}
</script>

<style lang="scss" scoped>
button {
    margin: 0 12px;
}
</style>
