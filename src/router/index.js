import Vue from "vue";
import Router from "vue-router";
// import Recommend from 'components/recommend/recommend'
// import Singer from "components/singer/singer";
// import Rank from "components/rank/rank";
// import Search from "components/search/search";
// import SingerDetail from "components/singer-detail/singer-detail";
const Recommend = () =>
  import ( /* webpackChunkName: "recommend" */ "components/recommend/recommend");
const Singer = () =>
  import ( /* webpackChunkName: "singer" */ "components/singer/singer");
const Rank = () =>
  import ( /* webpackChunkName: "rank" */ "components/rank/rank");
const Search = () =>
  import ( /* webpackChunkName: "search" */ "components/search/search");
const SingerDetail = () =>
  import ( /* webpackChunkName: "singer-detail" */ "components/singer-detail/singer-detail");
const Disc = () =>
  import ( /* webpackChunkName: "singer-detail" */ "components/disc/disc");
const Toplist = () =>
  import ( /* webpackChunkName: "top-list" */ "components/top-list/top-list");



Vue.use(Router);

export default new Router({
  routes: [{
      path: "/",
      redirect: "/recommend"
    },
    {
      path: "/recommend",
      component: Recommend,
      children: [{
        path: ':id',
        component: Disc
      }]
    },
    {
      path: "/singer",
      component: Singer,
      children: [{
        path: ":eid",
        component: SingerDetail
      }]
    },
    {
      path: "/rank",
      component: Rank,
      children: [{
        path: ':id',
        component: Toplist
      }]
    },
    {
      path: "/search",
      component: Search
    }
  ]
});