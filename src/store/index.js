import Vue from 'vue'
import VueX from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import createLogger from 'vuex/dist/logger'

Vue.use(VueX)

const debug = process.env.NODE_ENV != 'production'

export default new VueX.Store({
    state,
    getters,
    mutations,
    actions,
    strict: debug,
    plugins: debug ? [createLogger()] : []
})