import Vue from 'vue'
import Vuex from 'vuex'
import Aria2 from 'aria2'
// 引入Vuex-状态管理
Vue.use(Vuex)
const options = [
  {'host': 'localhost', 'port': 6806, 'secure': false},
  {'host': '192.168.123.1', 'port': 6800, 'secure': false}
  // {'host': '127.0.0.1', 'port': 6800, 'secure': false, 'secret': '7in'}
]
const aria2 = new Aria2(options[0])

aria2.onopen = function () {
  console.log('web-socket OPEN')
}
aria2.open(function () {
  console.log(aria2)
})

// 用于 setInterval clearInterval 控制
let tell0, tell1, tell2

const store = new Vuex.Store({
  state: {
    version: '123',

    // 是否显示新建任务面板 => UrlPanel.vue
    isUrlPanel: false,
    // 是否显示设置面板
    isSetting: false,
    // 任务信息刷新间隔
    heart: 2000,
    // 项目选择
    // checkedNames: [],
    // 菜单面板选项 => TaskMenu.vue
    menuItems: [
      {
        id: 0,
        name: '正在下载',
        ico: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>',
        sum: 0,
        active: true
      },
      {
        id: 1,
        name: '等待队列',
        ico: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-loader"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>',
        sum: 0,
        active: false
      },
      {
        id: 2,
        name: '任务出错',
        ico: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-alert-octagon"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12" y2="16"></line></svg>',
        sum: 0,
        active: false
      },
      {
        id: 3,
        name: '已完成',
        ico: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-inbox"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>',
        sum: 0,
        active: false
      }
    ],
    // 任务面板选项 => TaskBarItems.vue
    taskBarItems: [
      {
        id: 0,
        name: '新建任务',
        ico: '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file-plus"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>'
      },
      {
        id: 1,
        name: '开始任务',
        ico: '<svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-play-circle"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8"/></svg>'
      },
      {
        id: 2,
        name: '暂停任务',
        ico: '<svg data-v-2d50e17c="" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-pause-circle"><circle data-v-2d50e17c="" cx="12" cy="12" r="10"></circle><line data-v-2d50e17c="" x1="10" y1="15" x2="10" y2="9"></line><line data-v-2d50e17c="" x1="14" y1="15" x2="14" y2="9"></line></svg>'
      },
      {
        id: 3,
        name: '删除任务',
        ico: '<svg data-v-2d50e17c="" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-trash-2"><polyline data-v-2d50e17c="" points="3 6 5 6 21 6"></polyline><path data-v-2d50e17c="" d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line data-v-2d50e17c="" x1="10" y1="11" x2="10" y2="17"></line><line data-v-2d50e17c="" x1="14" y1="11" x2="14" y2="17"></line></svg>'
      },
      {
        id: 4,
        name: '任务排序',
        ico: '<svg data-v-2d50e17c="" xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-filter"><polygon data-v-2d50e17c="" points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>'
      }
    ],
    // dashboard全局速度面板
    dashBoard: [0, 0],
    // 正在下载
    DownloadResult: [],
    // 全局设置选项
    GlobalOption: {}
  },
  //
  actions: {
    tellActive ({commit, state}) {
      clearInterval(tell1)
      clearInterval(tell2)
      tell0 = window.setInterval(() => {
        commit('tellActive')
      }, state.heart)
    },
    tellWaiting ({commit, state}) {
      clearInterval(tell0)
      clearInterval(tell2)
      tell1 = window.setInterval(() => {
        commit('tellWaiting')
      }, state.heart)
    },
    tellStopped ({commit, state}) {
      clearInterval(tell0)
      clearInterval(tell1)
      tell2 = window.setInterval(() => {
        commit('tellStopped')
      }, state.heart)
    },
    getGlobalStat ({commit}) {
      window.setInterval(() => {
        commit('getGlobalStat')
      }, 2000)
    },
    getGlobalOption ({commit}) {
      commit('getGlobalOption')
    }
  },

  mutations: {
    changeUrlPanel (state) {
      state.isUrlPanel = !state.isUrlPanel
    },
    menuActiveCancel (state) {
    //  取消菜单按钮 Active
      state.menuItems.forEach(item => {
        item.active = false
      })
    },
    menuActive (state, id) {
    //  激活菜单按钮 Active
      state.menuItems[id].active = true
    },
    isSetting (state) {
    //  更改设置面板状态
      state.isSetting = !state.isSetting
    },

    //  初始化 下载列表
    tellActive (state) {
      aria2.tellActive().then(
        function (res) {
          state.DownloadResult.splice(res.length)
          res.forEach((resItem, index) => {
            Vue.set(state.DownloadResult, index, resItem)
          })
        },
        function (err) {
          console.log('tellActive-error', err)
        }
      )
    },
    //
    tellWaiting (state) {
      aria2.tellWaiting(0, 100).then(
        function (res) {
          state.DownloadResult.splice(res.length)
          res.forEach((resItem, index) => {
            Vue.set(state.DownloadResult, index, resItem)
          })
        },
        function (err) {
          console.log('tellWaiting-error', err)
        }
      )
    },
    tellStopped (state) {
      aria2.tellStopped(0, 200).then(
        function (res) {
          state.DownloadResult.splice(res.length)
          res.forEach((resItem, index) => {
            Vue.set(state.DownloadResult, index, resItem)
          })
        },
        function (err) {
          console.log('tellStopped-error', err)
        }
      )
    },

    getGlobalStat (state) {
      aria2.getGlobalStat().then(
        function (res) {
          // numActive
          state.menuItems[0].sum = res.numActive
          // numWaiting
          state.menuItems[1].sum = res.numWaiting
          // numStopped
          state.menuItems[3].sum = res.numStopped
          //  全局速度
          Vue.set(state.dashBoard, 0, res.uploadSpeed)
          Vue.set(state.dashBoard, 1, res.downloadSpeed)
        },
        function (err) {
          console.log('getGlobalStat-error', err)
        }

      )
    },
    //  获取全局设置
    getGlobalOption (state) {
      aria2.getGlobalOption().then(
        function (res) {
          state.GlobalOption = res
        },
        function (err) {
          console.log('getGlobalOption-error', err)
        }
      )
    }

  },
  getters: {

  }
})

export default store
