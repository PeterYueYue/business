import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import * as getters from './getters'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

// 应用初始状态
const state = {
    count: 10,
    loading2: false,
    type:'FREE',
}
// 定义所需的 mutations
const mutations = {
    INCREMENT(state) {
        state.count++
    },
    DECREMENT(state) {
        state.count--
    },
    CHANGELODING(state){
        state.loading2 = true;
    },
    CLOSELODING(state){
        state.loading2 = false; 
    },
    GETTYPE(state,data){
        state.type = data
        console.log(data)
    }
}
// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    plugins: [createPersistedState({storage: window.sessionStorage})]
})