import Vue from 'vue'
import Vuex from 'vuex'
import Aria2 from 'aria2'
// 引入Vuex-状态管理
Vue.use(Vuex)
// rpc 通信 参数
let aria2
// 用于 setInterval clearInterval 控制
let tell0, tell1, tell2

const store = new Vuex.Store({
  state: {
    version: null,

    // 是否显示新建任务面板 => UrlPanel.vue
    isUrlPanel: false,
    // 是否显示设置面板
    isSetting: false,
    // 是否显示快捷面板
    isQuickSet: false,
    // 是否显示任务详细信息
    isTaskDetail: false,
    // 任务详细信息
    taskDetail: null,
    taskDetailGid: null,
    // 任务信息刷新间隔
    heart: 1000,
    // 设备信息
    options: [],
    // 设备选择
    isConnected: false,
    selectOption: 0,
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
        name: '已完成',
        ico: '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-inbox"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"></path></svg>',
        sum: 0,
        active: false
      }
    ],
    menuItemActive: 0,
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
    GlobalOption: {},
    // 设备卡片 事件触发的 x，y 坐标及 index
    deviceCard: {},
    // 是否显示设备卡片
    isDeviceCard: false,
    // 活动任务选择
    checkedActiveNames: [],
    // 等待任务选择
    checkedWaitNames: [],
    // 停止任务选择
    checkedStopNames: []
  },
  //
  actions: {
    aria2Init ({commit, state}) {
      if (localStorage.length === 0) {
        state.options = [{'host': 'localhost', 'port': 6806, 'secure': false, secret: '', path: '/jsonrpc'}]
        localStorage.setItem('options', JSON.stringify(state.options))
      } else {
        state.options = JSON.parse(localStorage.getItem('options'))
      }
      // 开启 aria2
      aria2 = new Aria2(state.options[0])
      // state.isConnected = true
      // 链接是否成功
      aria2.getVersion().then(
        function (res) {
          state.version = res
          state.isConnected = true
        },
        function (err) {
          console.log(err)
          state.isConnected = false
        }
      )
    },
    aria2Switch ({commit, state}, index) {
      // 开启
      aria2 = new Aria2(state.options[index])
      state.selectOption = index
      // 链接是否成功
      aria2.getVersion().then(
        function (res) {
          state.version = res
          state.isConnected = true
        },
        function (err) {
          console.log(err)
          state.isConnected = false
        }
      )
    },
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
    },
    addUri ({commit}, urls) {
      console.log(urls)
      urls.forEach(function (url) {
        aria2.addUri(
          [url],
          function (err, gid) {
            console.log(err || 'gid: ' + gid)
          })
      })
    },
    taskBegin ({commit, state}) {
      let x = state.checkedWaitNames
      x.forEach(function (name) {
        aria2.unpause(
          name,
          function (err, gid) {
            console.log(err || 'gid: ' + gid)
          }
        )
      })
    },
    taskWait ({commit, state}) {
      let x = state.checkedActiveNames
      x.forEach(function (name) {
        aria2.pause(
          name,
          function (err, gid) {
            console.log(err || 'gid: ' + gid)
          }
        )
      })
    },
    taskDelete ({commit, state}) {
      let x
      // 活动和暂停任务删除
      // 已完成任务删除的方法不同
      switch (state.menuItemActive) {
        case 0:
          x = state.checkedActiveNames
          x.forEach(function (name) {
            console.log(name)
            aria2.remove(
              name,
              function (err, gid) {
                console.log(err || 'gid: ' + gid)
              }
            )
          })
          break
        case 1:
          x = state.checkedWaitNames
          x.forEach(function (name) {
            console.log(name)
            aria2.remove(
              name,
              function (err, gid) {
                console.log(err || 'gid: ' + gid)
              }
            )
          })
          break
        case 2:
          x = state.checkedStopNames
          x.forEach(function (name) {
            console.log(name)
            aria2.removeDownloadResult(
              name,
              function (err, gid) {
                console.log(err || 'gid: ' + gid)
              }
            )
          })
          break
      }
    },
    quickSet ({commit, state}) {
      aria2.changeGlobalOption(
        {
          'max-overall-download-limit': state.GlobalOption['max-overall-download-limit'],
          'max-overall-upload-limit': state.GlobalOption['max-overall-upload-limit'],
          'max-concurrent-downloads': state.GlobalOption['max-concurrent-downloads'],
          'max-connection-per-server': state.GlobalOption['max-connection-per-server']
        },
        function (err, ok) {
          console.log(err || 'OK?: ' + ok)
        }
      )
    },
    globalSet ({commit, state}) {
      for (let option in state.GlobalOption) {
        if (state.GlobalOption[option] === false) {
          state.GlobalOption[option] = 'false'
        } else if (state.GlobalOption[option] === true) {
          state.GlobalOption[option] = 'true'
        }
      }
      aria2.changeGlobalOption(
        state.GlobalOption,
        function (err, ok) {
          console.log(err || 'OK?: ' + ok)
        }
      )
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
      // 取消选中任务
      state.checkedActiveNames = []
      state.checkedWaitNames = []
      state.checkedStopNames = []
      // 选项卡激活
      state.menuItemActive = id
    },
    isSetting (state) {
    //  更改设置面板状态
      state.isSetting = !state.isSetting
    },
    changeQuickSet (state) {
      state.isQuickSet = !state.isQuickSet
    },
    // 更改任务详细信息面板
    changeTaskDetail (state) {
      state.isTaskDetail = !state.isTaskDetail
    },
    // 存入任务Gid
    setTaskDetail (state, gid) {
      state.taskDetailGid = gid
    },
    //  初始化 下载列表
    tellActive (state) {
      aria2.tellActive().then(
        function (res) {
          state.DownloadResult.splice(res.length)
          res.forEach((resItem, index) => {
            if (state.taskDetailGid !== null && state.taskDetailGid === resItem.gid) {
              state.taskDetail = resItem
            }
            state.DownloadResult[index] = resItem
          })
        }
        // function (err) {
        //   console.log('tellActive-error', err)
        // }
      )
    },
    //
    tellWaiting (state) {
      aria2.tellWaiting(-1, 100).then(
        function (res) {
          state.DownloadResult.splice(res.length)
          res.forEach((resItem, index) => {
            if (state.taskDetailGid !== null && state.taskDetailGid === resItem.gid) {
              state.taskDetail = resItem
            }
            Vue.set(state.DownloadResult, index, resItem)
          })
        }
        // function (err) {
        //   console.log('tellWaiting-error', err)
        // }
      )
    },
    tellStopped (state) {
      aria2.tellStopped(-1, 200).then(
        function (res) {
          state.DownloadResult.splice(res.length)
          res.forEach((resItem, index) => {
            if (state.taskDetailGid !== null && state.taskDetailGid === resItem.gid) {
              state.taskDetail = resItem
            }
            Vue.set(state.DownloadResult, index, resItem)
          })
        }
        // function (err) {
        //   console.log('tellStopped-error', err)
        // }
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
          state.menuItems[2].sum = res.numStopped
          //  全局速度
          Vue.set(state.dashBoard, 0, res.uploadSpeed)
          Vue.set(state.dashBoard, 1, res.downloadSpeed)
        }
        // function (err) {
        //   console.log('getGlobalStat-error', err)
        // }

      )
    },
    //  获取全局设置
    getGlobalOption (state) {
      aria2.getGlobalOption().then(
        function (res) {
          for (let option in res) {
            if (res[option] === 'false') {
              res[option] = false
            } else if (res[option] === 'true') {
              res[option] = true
            }
          }
          state.GlobalOption = res
        },
        function (err) {
          console.log('getGlobalOption-error', err)
        }
      )
    },
    devPanelEdit (state, pos) {
      // 发送设备右键点击事件触发的位置和索引
      state.deviceCard = pos
    },
    changeDeviceCard (state) {
      // 更改设备卡片是否出现
      state.isDeviceCard = !state.isDeviceCard
    },
    addCardOption (state) {
      // 添加新的设备
      state.options.push({'host': 'localhost', 'port': 6800, 'secure': false, secret: '', path: '/jsonrpc'})
    },
    deleteCardOption (state, index) {
      // 删除设备
      state.options.splice(index, 1)
    },
    saveOptions (state) {
      // 将设备存储到 localstorage
      localStorage.setItem('options', JSON.stringify(state.options))
    },
    saveCheckedActiveNames (state, val) {
      state.checkedActiveNames = val
    },
    saveCheckedWaitNames (state, val) {
      state.checkedWaitNames = val
    },
    saveCheckedStopNames (state, val) {
      state.checkedStopNames = val
    }
  },
  getters: {
  }
})

export default store
