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
              <label for="tab6" @click="switchTab(6)">BitTorrent 设置</label>
            </li>
            <li>
              <input type="radio" id="tab7" name="tabGroup1" class="tab">
              <label for="tab7" @click="switchTab(7)">Metalink 设置</label>
            </li>
            <li>
              <input type="radio" id="tab8" name="tabGroup1" class="tab">
              <label for="tab8" @click="switchTab(8)">RPC 设置</label>
            </li>
            <hr>
            <li>
              <!--<input type="radio" id="tab9" name="tabGroup1" class="tab">-->
              <!--<label for="tab9" @click="switchTab(9)">高级选项</label>-->
            </li>
            <li>
              <input type="radio" id="tab10" name="tabGroup1" class="tab">
              <label for="tab10" @click="switchTab(10)">关于</label>
            </li>
            <hr>
          </ul>
        </div>
      </div>
      <div class="setting-rp">
        <!--连接设置-->

        <section class="tab-page" v-show="tabs[0].switch">
          <h4>Aria2引擎版本：v{{getVersion.version}} - 已连接</h4>
          <hr>
          <h5 v-for="item in getVersion.enabledFeatures">√ {{item}}</h5>
        </section>

        <section class="tab-page" v-show="tabs[1].switch">
          <h4>下载目录</h4>
          <input type="text" v-model="GlobalOption.dir">
          <h5>
            存储下载文件的目录。
          </h5>
          <hr>
          <div class="between">
            <h4>最大同时下载数：</h4>
            <input type="text" v-model="GlobalOption['max-concurrent-downloads']">
          </div>
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
              <input type="checkbox" class="switch-checkbox" id="checkbox1-1" v-model="GlobalOption['continue']">
              <label for="checkbox1-1" class="switch-label"/>
            </div>
          </div>

          <hr>

        </section>

        <section class="tab-page" v-show="tabs[2].switch">
          <h4>日志</h4>
          <input type="text" v-model="GlobalOption.log">
          <h5>日志等级 {{ GlobalOption['log-level']}}</h5>
          <input type="range"  min="1" step="1" value="6">

          <hr>
        </section>

        <section class="tab-page" v-show="tabs[3].switch">
          <h4>使用代理服务器</h4>
          <h5>为所有协议使用代理服务器</h5>
          <input type="text" v-model="GlobalOption['all-proxy']">
          <h5>设置代理服务器用户名：</h5>
          <input type="text" v-model="GlobalOption['all-proxy-user']">
          <h5>设置代理服务器密码：</h5>
          <input type="text" v-model="GlobalOption['all-proxy-passwd']">
          <hr>

          <div class="between">
            <h4>模拟运行</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox3-0" v-model="GlobalOption['dry-run']">
              <label for="checkbox3-0" class="switch-label"/>
            </div>
          </div>
          <hr>

          <div class="between">
            <h4>最小速度限制</h4>
            <input type="text" class="small-input" v-model="GlobalOption['lowest-speed-limit']">
          </div>
          <hr>

          <div class="between">
            <h4>单服务器最大连接数</h4>
            <input type="text" class="small-input" v-model="GlobalOption['max-connection-per-server']">
          </div>
          <hr>

          <div class="between">
            <h4>文件未找到重试次数</h4>
            <input type="text" class="small-input" v-model="GlobalOption['max-file-not-found']">
          </div>
          <hr>

          <div class="between">
            <h4>最大尝试次数</h4>
            <input type="text" class="small-input" v-model="GlobalOption['max-tries']">
          </div>
          <hr>

          <div class="between">
            <h4>最小文件分片大小</h4>
            <input type="text" class="small-input" v-model="GlobalOption['min-split-size']">
          </div>
          <hr>

          <div class="between">
            <h4>.netrc 文件路径</h4>
            <input type="text" class="small-input" v-model="GlobalOption['netrc-path']">
          </div>
          <div class="between">
            <h4>禁用 netrc</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox3-1" v-model="GlobalOption['no-netrc']">
              <label for="checkbox3-1" class="switch-label"/>
            </div>
          </div>
          <hr>

          <h4>不使用代理服务器列表</h4>
          <textarea cols="30" rows="10" v-model="GlobalOption['no-proxy']">

          </textarea>
          <hr>

          <div class="between">
            <h4>获取服务器文件时间</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox3-2" v-model="GlobalOption['remote-time']">
              <label for="checkbox3-2" class="switch-label"/>
            </div>
          </div>
          <hr>

          <div class="between">
            <h4>URI 复用</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox3-3" v-model="GlobalOption['reuse-uri']">
              <label for="checkbox3-3" class="switch-label"/>
            </div>
          </div>
          <hr>

          <div class="between">
            <h4>重试等待时间</h4>
            <input type="text" class="small-input" v-model="GlobalOption['retry-wait']">
          </div>
          <hr>

          <div class="between">
            <h4>单任务连接数</h4>
            <input type="text" class="small-input" v-model="GlobalOption['split']">
          </div>
          <hr>

          <div class="between">
            <h4>超时时间</h4>
            <input type="text" class="small-input" v-model="GlobalOption['timeout']">
          </div>
          <hr>
        </section>

        <section class="tab-page" v-show="tabs[4].switch">
          <div class="between">
            <h4>支持 GZip</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox4-0" v-model="GlobalOption['http-accept-gzip']">
              <label for="checkbox4-0" class="switch-label"/>
            </div>
          </div>
          <hr>

          <div class="between">
            <h4>认证质询</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox4-1" v-model="GlobalOption['http-auth-challenge']">
              <label for="checkbox4-1" class="switch-label"/>
            </div>
          </div>
          <hr>

          <div class="between">
            <h4>禁用缓存</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox4-2" v-model="GlobalOption['http-no-cache']">
              <label for="checkbox4-2" class="switch-label"/>
            </div>
          </div>
          <hr>

          <div class="between">
            <h4>启用持久连接</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox4-3" v-model="GlobalOption['enable-http-keep-alive']">
              <label for="checkbox4-3" class="switch-label"/>
            </div>
          </div>

          <div class="between">
            <h4>启用 HTTP 管线化</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox4-4" v-model="GlobalOption['enable-http-pipelining']">
              <label for="checkbox4-4" class="switch-label"/>
            </div>
          </div>
          <hr>

          <div class="between">
            <h4>启用 HEAD 方法</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox4-5" v-model="GlobalOption['use-head']">
              <label for="checkbox4-5" class="switch-label"/>
            </div>
          </div>
          <h5 v-if="GlobalOption['use-head']">自定义请求头</h5>
          <textarea v-if="GlobalOption['use-head']" cols="30" rows="10" v-model="GlobalOption['header']">

          </textarea>
          <hr>

          <div class="between">
            <h4>自定义 User Agent</h4>
            <input type="text" class="small-input" v-model="GlobalOption['user-agent']">
          </div>
          <hr>
        </section>

        <section class="tab-page" v-show="tabs[5].switch">
          <div class="between">
            <h4>被动模式</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox5-0" v-model="GlobalOption['ftp-pasv']">
              <label for="checkbox5-0" class="switch-label"/>
            </div>
          </div>
          <hr>

          <div class="between">
            <h4>连接复用</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox5-1" v-model="GlobalOption['ftp-reuse-connection']">
              <label for="checkbox5-1" class="switch-label"/>
            </div>
          </div>
          <hr>
        </section>

        <section class="tab-page" v-show="tabs[6].switch">
          <div class="between">
            <h4>分离仅做种任务</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox6-0" v-model="GlobalOption['bt-detach-seed-only']">
              <label for="checkbox6-0" class="switch-label"/>
            </div>
          </div>
          <hr>

          <div class="between">
            <h4>启用哈希检查完成事件</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox6-1" v-model="GlobalOption['bt-enable-hook-after-hash-check']">
              <label for="checkbox6-1" class="switch-label"/>
            </div>
          </div>
          <hr>

          <div class="between">
            <h4>启用本地节点发现</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox6-2" v-model="GlobalOption['bt-enable-lpd']">
              <label for="checkbox6-2" class="switch-label"/>
            </div>
          </div>
          <hr>

          <div class="between">
            <h4>强制加密</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox6-3" v-model="GlobalOption['bt-force-encryption']">
              <label for="checkbox6-3" class="switch-label"/>
            </div>
          </div>
          <hr>

          <div class="between">
            <h4>做种前检查文件哈希</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox6-4" v-model="GlobalOption['bt-hash-check-seed']">
              <label for="checkbox6-4" class="switch-label"/>
            </div>
          </div>
          <hr>

          <div class="between">
            <h4>加载已保存的元数据文件</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox6-5" v-model="GlobalOption['bt-load-saved-metadata']">
              <label for="checkbox6-5" class="switch-label"/>
            </div>
          </div>
          <hr>

          <div class="between">
            <h4>最多打开文件数</h4>
            <input type="text" class="small-input" v-model="GlobalOption['bt-max-open-files']">
          </div>
          <hr>

          <div class="between">
            <h4>最大连接节点数</h4>
            <input type="text" class="small-input" v-model="GlobalOption['bt-max-peers']">
          </div>
          <hr>

          <div class="between">
            <h4>仅下载种子文件</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox6-6" v-model="GlobalOption['bt-metadata-only']">
              <label for="checkbox6-6" class="switch-label"/>
            </div>
          </div>
          <hr>

          <div class="between">
            <h4>需要加密</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox6-7" v-model="GlobalOption['bt-require-crypto']">
              <label for="checkbox6-7" class="switch-label"/>
            </div>
          </div>
          <hr>

          <div class="between">
            <h4>期望下载速度</h4>
            <input type="text" class="small-input" v-model="GlobalOption['bt-request-peer-speed-limit']">
          </div>
          <hr>

          <div class="between">
            <h4>保存种子文件</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox6-8" v-model="GlobalOption['bt-save-metadata']">
              <label for="checkbox6-8" class="switch-label"/>
            </div>
          </div>
          <hr>

          <div class="between">
            <h4>不检查已经下载的文件</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox6-9" v-model="GlobalOption['bt-seed-unverified']">
              <label for="checkbox6-9" class="switch-label"/>
            </div>
          </div>
          <hr>

          <div class="between">
            <h4>无速度时自动停止时间</h4>
            <input type="text" class="small-input" v-model="GlobalOption['bt-stop-timeout']">
          </div>
          <hr>

          <h5>BT Tracker 服务器地址:</h5>
          <textarea cols="30" rows="10" v-model="GlobalOption['bt-tracker']">

          </textarea>

          <div class="between">
            <h4>BT Tracker 服务器连接超时时间</h4>
            <input type="text" class="small-input" v-model="GlobalOption['bt-tracker-connect-timeout']">
          </div>

          <div class="between">
            <h4>BT Tracker 服务器连接间隔时间</h4>
            <input type="text" class="small-input" v-model="GlobalOption['bt-tracker-interval']">
          </div>

          <div class="between">
            <h4>BT Tracker 服务器超时时间</h4>
            <input type="text" class="small-input" v-model="GlobalOption['bt-tracker-timeout']">
          </div>
          <hr>

          <div class="between">
            <h4>启用 DHT (IPv4)</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox6-10" v-model="GlobalOption['enable-dht']" disabled>
              <label for="checkbox6-10" class="switch-label"/>
            </div>
          </div>
          <div class="between">
            <h4>启用 DHT (IPv6)</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox6-11" v-model="GlobalOption['enable-dht6']" disabled>
              <label for="checkbox6-11" class="switch-label"/>
            </div>
          </div>
          <div class="between">
            <h4>DHT (IPv4) 文件</h4>
            <input type="text" class="small-input" v-model="GlobalOption['dht-file-path']" disabled>
          </div>
          <div class="between">
            <h4>DHT (IPv6) 文件</h4>
            <input type="text" class="small-input" v-model="GlobalOption['dht-file-path6']" disabled>
          </div>
          <div class="between">
            <h4>DHT 监听端口</h4>
            <input type="text" class="small-input" v-model="GlobalOption['dht-listen-port']" disabled>
          </div>
          <hr>

          <div class="between">
            <h4>启用节点交换</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox6-12" v-model="GlobalOption['enable-peer-exchange']">
              <label for="checkbox6-12" class="switch-label"/>
            </div>
          </div>
          <hr>

          <div class="between">
            <h4>下载种子中的文件</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox6-13" v-model="GlobalOption['follow-torrent']">
              <label for="checkbox6-13" class="switch-label"/>
            </div>
          </div>
          <hr>
          <div class="between">
            <h4>监听端口</h4>
            <input type="text" class="small-input" v-model="GlobalOption['listen-port']" disabled>
          </div>
          <hr>

          <div class="between">
            <h4>全局最大上传速度</h4>
            <input type="text" class="small-input" v-model="GlobalOption['max-overall-upload-limit']">
          </div>
          <div class="between">
            <h4>最大上传速度</h4>
            <input type="text" class="small-input" v-model="GlobalOption['max-upload-limit']">
          </div>
          <hr>

          <div class="between">
            <h4>节点 ID 前缀</h4>
            <input type="text" class="small-input" v-model="GlobalOption['peer-id-prefix']">
          </div>
          <div class="between">
            <h4>Peer Agent</h4>
            <input type="text" class="small-input" v-model="GlobalOption['peer-agent']">
          </div>
          <hr>

          <div class="between">
            <h4>最小分享率</h4>
            <input type="text" class="small-input" v-model="GlobalOption['seed-ratio']">
          </div>
          <hr>

          <!--<div class="between">-->
            <!--<h4>最小做种时间</h4>-->
            <!--<input type="text" class="small-input" v-model="GlobalOption['seed-time']">-->
          <!--</div>-->
          <!--<hr>-->
        </section>

        <section class="tab-page" v-show="tabs[7].switch">
          <div class="between">
            <h4>下载 Metalink 中的文件</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox7-0" v-model="GlobalOption['follow-metalink']">
              <label for="checkbox7-0" class="switch-label"/>
            </div>
          </div>
          <hr>

          <div class="between">
            <h4>仅使用唯一协议</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox7-1" v-model="GlobalOption['metalink-enable-unique-protocol']">
              <label for="checkbox7-1" class="switch-label"/>
            </div>
          </div>
          <hr>
        </section>

        <section class="tab-page" v-show="tabs[8].switch">
          <div class="between">
            <h4>启用 JSON-RPC/XML-RPC 服务器</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox8-0" v-model="GlobalOption['enable-rpc']">
              <label for="checkbox8-0" class="switch-label"/>
            </div>
          </div>
          <hr>

          <div class="between">
            <h4>种子文件下载完后暂停</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox8-1" v-model="GlobalOption['pause-metadata']">
              <label for="checkbox8-1" class="switch-label"/>
            </div>
          </div>
          <hr>

          <div class="between">
            <h4>接受所有远程请求</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox8-2" v-model="GlobalOption['rpc-allow-origin-all']">
              <label for="checkbox8-2" class="switch-label"/>
            </div>
          </div>
          <hr>

          <div class="between">
            <h4>在所有网卡上监听</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox8-3" v-model="GlobalOption['rpc-listen-all']">
              <label for="checkbox8-3" class="switch-label"/>
            </div>
          </div>
          <hr>

          <div class="between">
            <h4>监听端口</h4>
            <input type="text" class="small-input" v-model="GlobalOption['rpc-listen-port']">
          </div>
          <hr>

          <div class="between">
            <h4>最大请求大小</h4>
            <input type="text" class="small-input" v-model="GlobalOption['rpc-max-request-size']">
          </div>
          <hr>

          <div class="between">
            <h4>保存上传的种子文件</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox8-4" v-model="GlobalOption['rpc-save-upload-metadata']">
              <label for="checkbox8-4" class="switch-label"/>
            </div>
          </div>
          <hr>

          <div class="between">
            <h4>启用 SSL/TLS</h4>
            <div class="switch">
              <input type="checkbox" class="switch-checkbox" id="checkbox8-5" v-model="GlobalOption['rpc-secure']">
              <label for="checkbox8-5" class="switch-label"/>
            </div>
          </div>
          <hr>
        </section>

        <section class="tab-page" v-show="tabs[9].switch"></section>

        <section class="tab-page" v-show="tabs[10].switch">
          <div v-for="(option,key) in GlobalOption">
            {{key}}:{{option}}
          </div>
        </section>


      </div>

      <div class="close-setting" @click="isSetting">
        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x-circle"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
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
            {name: 'BitTorrent 设置', switch: false},
            {name: 'Metalink 设置', switch: false},
            {name: 'RPC 设置', switch: false},
            {name: '高级选项', switch: false},
            {name: '关于', switch: false}
          ]
        }
      },
      computed: {
        GlobalOption () {
          return this.$store.state.GlobalOption
        },
        getVersion () {
          return this.$store.state.version
        }
      },
      methods: {
        isSetting: function () {
          this.$store.commit('isSetting')
          this.$store.dispatch('globalSet')
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
      overflow-y: scroll;
      .tab-page{
        /*详细设置 样式*/
        width: 95%;
        box-sizing: border-box;
        padding: 40px;
        background-color: transparent;
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
          width: auto;
          min-width: 50%;
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

        textarea{
          box-sizing: border-box;
          max-width: 100%;
          width: 100%;
          height: auto;
          font-size: 16px;
          padding:6px;
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
      color: #42526E;
      width: 40px;
      height: 40px;
      position: fixed;
      border-radius: 50%;
      right: 10px;
      top: 10px;
      cursor: pointer;
      &:hover{
        color: #fff;
        background-color: $heavy-color;
        transition: all .1s;
      }
    }
    .between{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }


</style>
