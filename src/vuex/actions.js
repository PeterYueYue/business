//test
export const increment = ({commit}) => { commit('INCREMENT')}
export const decrement = ({commit}) => {commit('DECREMENT')}
export const changeLoding = ({commit}) => { commit('CHANGELODING')}
export const closeLoding = ({commit}) => {commit('CLOSELODING')}
export const getType = ({commit},data) => {commit('GETTYPE',data)}