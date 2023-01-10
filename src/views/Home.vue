<template>
  <div class="main">
    <Topnav />
    <div class="banner">
      <h1>NieR UI</h1>
      <p class="actions">
        <a href="https://github.com/supercll/nierui">Github</a>
        <router-link to="/doc">开始</router-link>
      </p>
    </div>
  </div>

</template>

<script lang="ts">
import Topnav from '../components/Topnav.vue'
export default {
  name: 'Home',
  components: {
    Topnav,
  },
}
</script>

<style lang="scss">
$blue: #73c9e5;

.main {
    background: #73c9e5;
    background: -webkit-linear-gradient(bottom left, #73c9e5, #fb739a);
    background: -moz-linear-gradient(bottom left, #73c9e5, #fb739a);
    background: linear-gradient(to top right, #73c9e5, #fb739a);
    clip-path: ellipse(80% 60% at 50% 20%);

    svg {
        width: 56px;
        height: 56px;
    }
}
.banner {
    padding: 20px 0 60px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: white;

    > .actions {
        padding: 8px 0;

        a {
            margin: 0 8px;
            background: $blue;
            color: white;
            display: inline-block;
            $h: 30px;
            border-radius: 15%;
            padding: 0 10px;
            height: $h;
            line-height: $h;
            &:hover {
                text-decoration: none;
            }
        }
    }
}
.cover {
    text-align: center;
}
.features {
    display: flex;
    justify-content: space-around;
    svg {
        width: 52px;
        height: 52px;
        margin-right: 10px;
    }
    > div {
        display: flex;
        flex-wrap: nowrap;
    }
}

@media (max-width: 500px) {
    .features {
        display: flex;
        flex-direction: column;
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0);
        justify-content: space-around;
        height: 50vh;
    }
    .cover {
        display: none;
    }
}
</style>
