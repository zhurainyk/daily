const getters = {
  getFullscreen: function (state) {
    return state.menu.fullsreen
  },
  getActivedTab:state=>state.menu.activedTab
}

export default getters
