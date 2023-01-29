<template>
  <Fragment v-if="visible">
    <Teleport to="body">
      <div class="nier-dialog-overlay" @click="onClickOverlay"></div>
      <div class="nier-dialog-wrapper">
        <div class="nier-dialog">
          <header>
            <slot name="title" />
            <span @click="close" class="nier-dialog-close"></span>
          </header>
          <main>
            <slot name="content" />
          </main>
          <footer>
            <n-button level="main" @click="sure">OK</n-button>
            <n-button @click="cancel">Cancel</n-button>
          </footer>
        </div>
      </div>
    </Teleport>
  </Fragment>
</template>

<script lang="ts">
import NButton from './Button.vue'
export default {
  name: 'nr-dialog',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    closeOnClickOverlay: {
      type: Boolean,
      default: true,
    },
    onSure: {
      type: Function,
      default: Function.prototype,
    },
    onCancel: {
      type: Function,
      default: Function.prototype,
    },
  },
  components: {
    NButton,
  },
  setup(props, context) {
    const close = () => {
      context.emit('update:visible', false)
    }
    const onClickOverlay = () => {
      if (props.closeOnClickOverlay) {
        close()
      }
    }
    const sure = () => {
      if (props.onSure() !== false) {
        close()
      }
    }
    const cancel = () => {
      props.onCancel()
      close()
    }

    return {
      close,
      onClickOverlay,
      sure,
      cancel,
    }
  },
}
</script>

<style lang="scss">
$radius: 4px;
$border-color: #d9d9d9;

.nier-dialog {
  background: white;
  border-radius: $radius;
  box-shadow: 0 0 3px fade_out(black, 0.5);
  min-width: 15em;
  max-width: 90%;

  &-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: fade_out(black, 0.5);
    z-index: 10;
  }

  &-wrapper {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 11;
  }

  >header {
    padding: 12px 16px;
    border-bottom: 1px solid $border-color;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 20px;
  }

  >main {
    padding: 12px 16px;
  }

  >footer {
    border-top: 1px solid $border-color;
    padding: 12px 16px;
    text-align: right;
  }

  &-close {
    position: relative;
    display: inline-block;
    width: 16px;
    height: 16px;
    cursor: pointer;

    &::before,
    &::after {
      content: "";
      position: absolute;
      height: 1px;
      background: black;
      width: 100%;
      top: 50%;
      left: 50%;
    }

    &::before {
      transform: translate(-50%, -50%) rotate(-45deg);
    }

    &::after {
      transform: translate(-50%, -50%) rotate(45deg);
    }
  }
}
</style>