<template>
  <div class="topnav" v-if="path !== '/' ">
    <div class="toggleAside" @click="toggleMenu"></div>
    <div class="logo" @click="toggleMenu">
    </div>
    <div class="backToHome" @click="backRouter" v-if="path !== '/' ">返回主页</div>
  </div>
</template>

<script lang="ts" scpoed>
import { inject, Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
export default {
  name: 'Topnav',
  setup() {
    const menuVisible = inject<Ref<boolean>>('xxx')
    const toggleMenu = () => {
      menuVisible.value = !menuVisible.value
    }
    const route = useRoute()
    const router = useRouter()
    const path = route.path
    const backRouter = () => {
      router.push('/')
    }

    return {
      toggleMenu,
      path,
      backRouter,
    }
  },
}
</script>

<style lang="scss">
.topnav {
    z-index: 10;
    display: flex;
    padding: 12px 32px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    justify-content: space-between;
    align-items: center;
    background: rgba($color: #ffffff, $alpha: 0.8);
    box-shadow: 0px 2px 10px #73c9e5;
    .backToHome {
        float: right;
        cursor: pointer;
        &:hover {
            color:#73c9e5;
        }
    }
    > .logo {
        transform: translateX(50%);
        svg {
            width: 42px;
            height: 42px;
        }
    }
    > .menu {
        display: flex;
        white-space: nowrap;
        flex-wrap: nowrap;
        > li {
            margin: 0 1em;
        }
    }
    > .toggleAside {
        display: inline-block;
        width: 24px;
        height: 24px;
        background: url("../assets/menu.svg") no-repeat;
        background-size: 28px;
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
        display: none;
        &:hover {
            color: #fb7299;
        }
    }
    @media (max-width: 500px) {
        > .menu {
            display: none;
        }
        > .logo {
            margin: 0 auto;
        }
        > .toggleAside {
            display: inline-block;
        }
    }
}
</style>
