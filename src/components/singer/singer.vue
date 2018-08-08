<template>
    <div class="singer-list" ref="singer">
      <list-view @select='selectSinger' :data="singers" ref="list"></list-view>
      <router-view></router-view>
    </div>
</template>
<script>
import { getSingerList } from "api/singer";
import { ERR_OK } from "api/config";
import Singer from "common/js/singer";
import ListView from "base/listview/listview";
import { mapMutations } from "vuex";
import { playlistMixin } from "common/js/mixin";
const HOT_NAME = "热门";
const OTHER_NAME = "其他";
const HOT_SINGER_LEN = 10;
export default {
  mixins: [playlistMixin],
  data() {
    return {
      singers: []
    };
  },
  created() {
    this._getSingerList();
  },
  methods: {
    ...mapMutations({
      setSinger: "SET_SINGER"
    }),
    handlePlayList(playlist) {
      const bottom = playlist.length ? "60px" : "";
      this.$refs.singer.style.bottom = bottom;
      this.$refs.list.refresh();
    },
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      });
      this.setSinger(singer);
    },
    _getSingerList() {
      getSingerList().then(res => {
        if (res.code === ERR_OK) {
          this.singerList = res.singerList.data.singerlist;
          this.singers = this._normalizeSinger(this.singerList);
        }
      });
    },
    _normalizeSinger(list) {
      let map = {
        [HOT_NAME]: {
          title: HOT_NAME,
          items: []
        }
      };
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map[HOT_NAME].items.push(
            new Singer({
              id: item.singer_mid,
              name: item.singer_name
            })
          );
        }
        const key = item.country || OTHER_NAME;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          };
        }
        map[key].items.push(
          new Singer({
            id: item.singer_mid,
            name: item.singer_name
          })
        );
      });
      let arr = [];
      for (var key in map) {
        let val = map[key];
        if (val.title !== HOT_NAME && val.title !== OTHER_NAME) {
          arr.push(val);
        }
      }
      arr.sort(function(a, b) {
        return a.title.localeCompare(b.title, "zh");
      });
      arr.unshift(map[HOT_NAME]);
      map[OTHER_NAME] && arr.push(map[OTHER_NAME]);
      return arr;
    }
  },
  components: {
    ListView
  }
};
</script>
<style lang="stylus" scoped>
@import '~common/stylus/variable'

.singer-list
  position: fixed
  top: 88px
  bottom: 0
  width: 100%
</style>