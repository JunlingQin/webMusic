<template>
    <transition name="slide">
        <music-list :rank="rank" :songs="songs" :title="title" :bg-image="bgImage" ></music-list>
    </transition>
</template>
<script>
import { getMusicList } from "api/rank";
import { ERR_OK } from "api/config";
import MusicList from "components/music-list/music-list";
import { mapState } from "vuex";
import { createSong } from "common/js/song";
export default {
  data() {
    return {
      songs: [],
      rank: true
    };
  },
  computed: {
    title() {
      return this.toplist.topTitle;
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].image;
      }
      return this.toplist.picUrl;
    },
    ...mapState(["toplist"])
  },
  created() {
    this._getMusicList();
  },
  methods: {
    _getMusicList() {
      if (!this.toplist.id) {
        this.$router.push({
          path: "/rank"
        });
        return;
      }
      getMusicList(this.toplist.id).then(res => {
        if (res.code === ERR_OK) {
          console.log(res);
          this.songs = this._normalizeSongs(res.songlist);
        }
      });
    },
    _normalizeSongs(list) {
      let ret = [];
      list.forEach(item => {
        const musicData = item.data;
        if (musicData.songid && musicData.albumid) {
          ret.push(createSong(musicData));
        }
      });
      return ret;
    }
  },
  components: {
    MusicList
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'

.slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

.slide-enter, .slide-leave-active
    transform: translate3d(100%, 0, 0)
</style>
