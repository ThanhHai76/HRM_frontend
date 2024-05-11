import state from './trackingState'
import mutations from './trackingMutations'
import getters from './trackingGetters'
import actions from './trackingActions'

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
