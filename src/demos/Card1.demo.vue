<demo>
卡片
</demo>
<template>
  <section>
    <div>
      <nr-card title="video1" />
    </div>
    <div>
      <nr-card title="video2">
        <template v-slot:card_body>这是卡片主题描述</template>
        <template v-slot:card_wrap_body>这是卡片遮罩层描述</template>
      </nr-card>
    </div>
    <div>
      <nr-card title="video3" type="normal" />
    </div>
    <div>
      <nr-card title="video4" type="normal">
        <template v-slot:card_body>这是卡片描述</template>
      </nr-card>
    </div>
    <div>
      <nr-card title="video5" type="normal" shadow="awalys" />
    </div>
    <div>
      <nr-card title="video6" type="normal" shadow="never" />
    </div>
  </section>
</template>

<script lang="ts">
import { NrCard } from '../lib/index'
export default {
  components: {
    NrCard,
  },
}
</script>
<style lang="scss" scoped>
section {
  display: flex;
  flex-wrap: wrap;
  div {
    margin: 5px;
  }
}
</style>
