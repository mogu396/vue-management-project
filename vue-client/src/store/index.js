import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  // 授权状态，默认为false
  isAuthorized: false,
  // 从token中解析出来的用户信息
  user: {}
}

const actions = {
  setIsAuthorized(context, isAuthorized) {
    context.commit('SET_IS_AUTHORIZED', isAuthorized)
  },
  setUser(context, user) {
    context.commit('SET_USER', user)
  },
  clearState(context) {
    context.commit('SET_IS_AUTHORIZED', false)
    context.commit('SET_USER', null)
  }

}

const mutations = {
  SET_IS_AUTHORIZED(state, isAuthorized) {
    // decode为真，设置授权为真
    if (isAuthorized) {
      state.isAuthorized = isAuthorized
    } else {
      state.isAuthorized = false
    }
  },

  SET_USER(state, user) {
    // 判断传入对象是否为空，不为空，将它的值给state
    if (JSON.stringify(user) !== {}) {
      state.user = user
    } else {
      state.user = {}
    }
  }
}

const getters = {
  isAuthorized(state) {
    return state.isAuthorized
  },
  user(state) {
    return state.user
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
