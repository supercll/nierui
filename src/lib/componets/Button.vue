<template>
  <button v-if="theme === 'func'" class="nier-button-func">
    <svg :class="['icon', `icon-${xh}`]">
      <use :xlink:href="`#icon-${xh}`" />
    </svg>
  </button>
  <button v-else class="nier-button" :class="classes" :disabled="disabled">
    <span v-if="loading" class="nier-loadingIndicator"></span>
    <slot />
  </button>
</template>
<script lang="ts">
import { computed } from 'vue'
export default {
  name: 'nr-button',
  props: {
    theme: {
      type: String,
      default: 'button',
    },
    size: {
      type: String,
      default: 'normal',
    },
    level: {
      type: String,
      default: 'normal',
    },
    xh: {
      type: String,
      default: 'normal',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const { theme, size, level } = props
    const classes = computed(() => {
      return {
        [`nier-theme-${theme}`]: theme,
        [`nier-size-${size}`]: size,
        [`nier-level-${level}`]: level,
      }
    })

    return { classes }
  },
}
</script>
<style lang="scss">
$h: 28px;
$border-color: #d9d9d9;
$color: #333;
$nier_blue: #73c9e5;
$nier_pink: #fb7299;
$radius: 4px;
$grey: grey;

.nier-button {
    vertical-align: middle;
    box-sizing: border-box;
    height: $h;
    padding: 0 12px;
    cursor: pointer;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    background: white;
    color: $color;
    border: 1px solid $border-color;
    border-radius: $radius;
    box-shadow: 0 1px 0 fade-out($nier_pink, 0.95);
    transition: 250ms;

    &+& {
        margin-left: 8px;
    }

    &:hover,
    &:focus {
        color: $nier_blue;
        border-color: $nier_blue;
    }

    &:focus {
        outline: none;
    }

    &::-moz-focus-inner {
        border: 0;
    }

    &-func {
        cursor: pointer;
        background: none;
        border: none;
        transition: 150ms;
        padding: 0;

        svg {
            height: $h;
            width: $h;
            fill: #757575;

            &:hover {
                fill: #00a1d6;
            }
        }

        &:focus {
            outline: none;
        }
    }

    &.nier-theme-link {
        border-color: transparent;
        box-shadow: none;
        color: $nier_blue;

        &:hover,
        &:focus {
            color: lighten($nier_blue, 10%);
        }
    }

    &.nier-theme-text {
        border-color: transparent;
        box-shadow: none;
        color: inherit;

        &:hover,
        &:focus {
            background: darken(white, 5%);
        }
    }

    &.nier-size-big {
        font-size: 24px;
        height: 48px;
        padding: 0 16px;
    }

    &.nier-size-small {
        font-size: 12px;
        height: 20px;
        padding: 0 4px;
    }

    &.nier-theme-button {
        &.nier-level-main {
            background: $nier_blue;
            color: white;
            border-color: $nier_blue;

            &:hover,
            &:focus {
                background: darken($nier_blue, 10%);
                border-color: darken($nier_blue, 10%);
            }
        }

        &.nier-level-danger {
            background: $nier_pink;
            border-color: $nier_pink;
            color: white;

            &:hover,
            &:focus {
                background: darken($nier_pink, 10%);
                border-color: darken($nier_pink, 10%);
            }
        }
    }

    &.nier-theme-link {
        &.nier-level-danger {
            color: $nier_pink;

            &:hover,
            &:focus {
                color: darken($nier_pink, 10%);
            }
        }
    }

    &.nier-theme-text {
        &.nier-level-main {
            color: $nier_blue;

            &:hover,
            &:focus {
                color: darken($nier_blue, 10%);
            }
        }

        &.nier-level-danger {
            color: $nier_pink;

            &:hover,
            &:focus {
                color: darken($nier_pink, 10%);
            }
        }
    }

    &.nier-theme-button {
        &[disabled] {
            cursor: not-allowed;
            color: $grey;

            &:hover {
                border-color: $grey;
            }
        }
    }

    &.nier-theme-link,
    &.nier-theme-text {
        &[disabled] {
            cursor: not-allowed;
            color: $grey;
        }
    }

    >.nier-loadingIndicator {
        width: 14px;
        height: 14px;
        display: inline-block;
        margin-right: 4px;
        border-radius: 8px;
        border-color: $nier_blue $nier_blue $nier_blue transparent;
        border-style: solid;
        border-width: 2px;
        animation: nier-spin 1s infinite linear;
    }
}

@keyframes nier-spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>
