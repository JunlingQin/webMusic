<template>
  <div id="app">
    <m-header></m-header>
    <tab></tab>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import Tab from "&/components/tab/tab";
import MHeader from "@/components/m-header/m-header";
import Player from "@/components/player/player";

export default {
  components: {
    Tab,
    MHeader,
    Player
  }
};
</script>

<style lang="stylus" scoped>
@import 'common/stylus/variable'

#app
  color: $color-theme
</style>
