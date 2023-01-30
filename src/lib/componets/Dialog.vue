<template>
  <Fragment v-if="visible">
    <Teleport to="body">
      <div class="nier-dialog">
        <div class="nier-dialog-overlay" @click="onClickOverlay"></div>
        <div class="nier-dialog-wrapper">
          <div @click="close" class="nier-dialog-close"></div>
          <div class="nier-dialog-iframe"></div>
          <div class="nier-dialog-inner">
            <slot />
            <footer>
              <n-button level="main" @click="sure">OK</n-button>
              <n-button @click="cancel">Cancel</n-button>
            </footer>
          </div>
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
    size: {
      type: String,
      default: '60%',
    },

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
  &-inner {
    background: none;
    border-radius: $radius;
    border: 1px solid #999;
    // box-shadow: 0 0 3px fade_out(black, 0.5);
    width: 100%;
    height: 100%;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 3;

    >footer {
      border-top: 1px solid $border-color;
      padding: 12px 16px;
      text-align: right;
      position: absolute;
      width: 100%;
      bottom: 0;
    }
  }

  &-iframe {
    width: 100%;
    height: 100%;
    &::before {
      display: block;
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      transform: scale(1,1);
      background-image: url('https://nier.oss-cn-shanghai.aliyuncs.com/web/noise.png');
      background-size: contain;
      z-index: 2;
    }
    &::after {
      display: block;
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      background-image: url('https://nier.oss-cn-shanghai.aliyuncs.com/web/noise.png');
      background-size: contain;
      transform: scale(1,-1);
      transition-delay: 0s;
      transition-timing-function: cubic-bezier(0.87,0,0.13,1);
      animation-name: noise;
      animation-duration: 0.5s;
      animation-iteration-count: infinite;
      animation-timing-function: steps(5);
      z-index: 3;
    }
  }

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
    width: v-bind(size);
    height: v-bind(size);
  }

  &-close {
    position: absolute;
    right: 0;
    top: 0;
    transform: translateY(-200%);
    display: inline-block;
    width: 32px;
    height: 32px;
    cursor: pointer;
    background: url('https://nier.oss-cn-shanghai.aliyuncs.com/web/staff_close_pc.png');
    background-size: contain;
    background-color: rgba(255,255,255,0);
    transition-property: background-color;
    transition-duration: 0.25s;
    &:hover {
      background-color: rgba(255,255,255,0.2);
    }

  }

  @keyframes noise {
    0% {
      opacity: 0
    }

    50% {
      opacity: 1
    }

    to {
      opacity: 0
    }
  }
}
</style>
