<template>
    <div class="setting" >
      <div class="setting-lp" @click.self="isSetting">
        <div class="setting-menu">
          <ul>
            <!--<li v-for="(tab, index) in tabs" :key="index">-->
              <!--<label :for="'tab'+index"  @click.self="switchTab(index)">-->
                <!--{{ tab.name }}-->
              <!--</label>-->
            <!--</li>-->
            <li>
              <input type="radio" id="tab0" name="tabGroup1" class="tab" checked>
              <label for="tab0" @click="switchTab(0)">连接设置</label>
            </li>
            <li>
              <input type="radio" id="tab1" name="tabGroup1" class="tab">
              <label for="tab1" @click="switchTab(1)">基本设置</label>
            </li>
            <hr>
            <li>
              <input type="radio" id="tab2" name="tabGroup1" class="tab">
              <label for="tab2" @click="switchTab(2)">日志</label>
            </li>
            <hr>
            <li>
              <input type="radio" id="tab3" name="tabGroup1" class="tab">
              <label for="tab3" @click="switchTab(3)">HTTP / FTP / SFTP 设置</label>
            </li>
            <li>
              <input type="radio" id="tab4" name="tabGroup1" class="tab">
              <label for="tab4" @click="switchTab(4)">HTTP 特定选项</label>
            </li>
            <li>
              <input type="radio" id="tab5" name="tabGroup1" class="tab">
              <label for="tab5" @click="switchTab(5)">FTP / SFTP 特定选项</label>
            </li>
            <hr>
            <li>
              <input type="radio" id="tab6" name="tabGroup1" class="tab">
              <label for="tab6" @click="switchTab(6)">BitTorrent / Metalink 设置</label>
            </li>
            <li>
              <input type="radio" id="tab7" name="tabGroup1" class="tab">
              <label for="tab7" @click="switchTab(7)">BitTorrent 特定选项</label>
            </li>
            <li>
              <input type="radio" id="tab8" name="tabGroup1" class="tab">
              <label for="tab8" @click="switchTab(8)">Metalink 特定选项</label>
            </li>
            <hr>
            <li>
              <input type="radio" id="tab9" name="tabGroup1" class="tab">
              <label for="tab9" @click="switchTab(9)">RPC 设置</label>
            </li>
            <li>
              <input type="radio" id="tab10" name="tabGroup1" class="tab">
              <label for="tab10" @click="switchTab(10)">高级选项</label>
            </li>
            <hr>
            <li>
              <input type="radio" id="tab11" name="tabGroup1" class="tab">
              <label for="tab11" @click="switchTab(11)">关于</label>
            </li>
          </ul>
        </div>
      </div>
      <div class="setting-rp">
        <!--连接设置-->

        <section class="tab-page" v-show="tabs[0].switch">

        </section>

        <section class="tab-page" v-show="tabs[1].switch">
          <h4>下载目录</h4>
          <input type="text" v-model="GlobalOption.dir" :placeholder="GlobalOption.dir">
          <h5>
            存储下载文件的目录。
          </h5>

          <hr>

          <div class="between">
            <h4>检查文件完整性</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox1-0" v-model="GlobalOption['check-integrity']">
              <label for="checkbox1-0" class="switch-label"/>
            </div>
          </div>

          <hr>

          <div class="between">
            <h4>断点续传</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox1-1">
              <label for="checkbox1-1" class="switch-label"/>
            </div>
          </div>

          <hr>

        </section>

        <section class="tab-page" v-show="tabs[2].switch">
          <h4>日志</h4>
          <input type="text" v-model="GlobalOption.log" :placeholder="GlobalOption.log">
          <h5>日志等级 {{ GlobalOption['log-level']}}</h5>
          <input type="range"  min="1" step="1" value="6">

          <hr>
        </section>

        <section class="tab-page" v-show="tabs[3].switch">
          <h4>使用代理服务器</h4>
          <h5>为所有协议使用代理服务器</h5>
          <input type="text" :value="GlobalOption['all-proxy']">
          <h5>设置代理服务器用户名：</h5>
          <input type="text" :value="GlobalOption['all-proxy-user']">
          <h5>设置代理服务器密码：</h5>
          <input type="text" :value="GlobalOption['all-proxy-passwd']">

          <hr>

          <div class="between">
            <h4>模拟运行</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox2-1">
              <label for="checkbox2-1" class="switch-label"/>
            </div>
          </div>

          <hr>
          <div class="between">
            <h5>最小速度限制</h5>
            <input type="select" class="switch-checkbox" >
          </div>

        </section>

        <section class="tab-page" v-show="tabs[4].switch">

        </section>

        <section class="tab-page" v-show="tabs[5].switch">

        </section>

        <section class="tab-page" v-show="tabs[6].switch"></section>

        <section class="tab-page" v-show="tabs[7].switch"></section>

        <section class="tab-page" v-show="tabs[8].switch"></section>

        <section class="tab-page" v-show="tabs[9].switch"></section>

        <section class="tab-page" v-show="tabs[10].switch"></section>

        <section class="tab-page" v-show="tabs[11].switch"></section>

        <div v-for="(option,key) in GlobalOption">
          {{key}}:{{option}}
        </div>

      </div>

      <div class="close-setting" @click.self="isSetting">

      </div>
    </div>
</template>

<script>
    export default {
      name: 'Setting',
      data () {
        return {
          tabs: [
            {name: '连接设置', switch: true},
            {name: '基本设置', switch: false},
            {name: '日志', switch: false},
            {name: 'HTTP / FTP / SFTP 设置', switch: false},
            {name: 'HTTP 特定选项', switch: false},
            {name: 'FTP / SFTP 特定选项', switch: false},
            {name: 'BitTorrent / Metalink 设置', switch: false},
            {name: 'BitTorrent 特定选项', switch: false},
            {name: 'Metalink 特定选项', switch: false},
            {name: 'RPC 设置', switch: false},
            {name: '高级选项', switch: false},
            {name: '关于', switch: false}
          ]
        }
      },
      computed: {
        GlobalOption: function () {
          return this.$store.state.GlobalOption
        }
        //   get (){
        //
        //   };
        //   set (){
        //
        //   }
        // }
      },
      methods: {
        isSetting: function () {
          this.$store.commit('isSetting')
        },
        switchTab: function (num) {
          this.tabs.forEach((tab) => {
            tab.switch = false
          })
          this.tabs[num].switch = true
        }
      }
    }
</script>

<style lang="scss" scoped>
  @import "../../variable";
  @import "../assets/scss/checkbox";
  .setting{
    width: 100vw;
    height: 100vh;
    backdrop-filter:saturate(180%) blur(20px);
    background-color: rgba(255,255,255,0.3);
    position: fixed;
    z-index: 5;
    display: flex;
    flex-direction: row;
    color: #42526E;
    .setting-lp{
      width: 30vw;
      height:100vh;
      background-color: rgba(230, 230, 230, 0.4);
      display: flex;
      justify-content: flex-end;
      .setting-menu{
        overflow-y: scroll;
        width: 250px;
        padding: 40px 15px;
        ul{
          list-style: none;
        }
        li{
          margin: 3px 0;
        }
        label{
          display: block;
          padding: 7px 0 7px 10px;
          &:hover{
            background-color: rgba(9, 30, 66, 0.08);
            border-radius: 3px;
            cursor: pointer;
            transition: all 0.1s ;
          }
          &:active{
            background-color: #DEEBFF;
            box-shadow: 0 0 0 2px #4C9AFE inset;
            transition: all 0.1s;
          }
        }
        .tab{
          display: none;
        }
        input[name="tabGroup1"]:checked + label:first-of-type{
          border-radius: 3px;
          background-color: $heavy-color;
          color: #fff;
        }
        hr{
          border-bottom: 0px;
          border-left: 0px;
          border-right: 0px;
          border-top: 1px solid #E2E3E4;
        }
      }
    }
    .setting-rp{
      width: 70vw;
      max-width: 800px;
      height: 100vh;
      padding: 40px;
      overflow-y: scroll;
      .tab-page{
        /*详细设置 样式*/
        width: 95%;
        hr{
          border-bottom: 0px;
          border-left: 0px;
          border-right: 0px;
          border-top: 1px solid #E2E3E4;
        }

        h4{
          margin: 10px 0;
        }

        h5{
          color: #99999a;
          margin: 10px 0;
        }

        input[type="text"]{
          box-sizing: border-box;
          width: 100%;
          height: 33px;
          font-size: 16px;
          padding:0 6px;
          border-radius: 3px;
          border: 1px solid #ddd;
          outline: none;
          background-color: rgba(9, 30, 66, 0.04);
          &:focus{
            border: 1px solid #4C9AFE;
            box-shadow: 0 0 0 1px #4C9AFE inset;
            transition: all 10ms;
          }
        }

      }
    }
    .close-setting{
      width: 50px;
      height: 50px;
      position: fixed;
      right: 10px;
      top: 10px;
      background-color: #4C9AFE;
    }
    .between{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }


</style>
