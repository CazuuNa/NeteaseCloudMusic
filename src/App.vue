<template>
  <el-container>
    <el-header>Header</el-header>
    <el-main>
      <div class="main">
        <div class="aside scrollbars">
          <Vaside></Vaside>
        </div>
        <div class="main-view scrollbars">
          <router-view></router-view>
        </div>
      </div>
    </el-main>
    <el-footer>
      <Vaplayer></Vaplayer>
    </el-footer>
  </el-container>
</template>
<script lang="ts">
import Vaside from 'components/aside/index.vue';
import Vlogin from 'components/login/index.vue';
import Vaplayer from 'components/aplayer/index.vue'
import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    Vaside, Vlogin,Vaplayer
  },
  setup() {
    console.log(import.meta.env.VITE_NODE_MODE)
    console.log(import.meta.env.VITE_APP_API_BASE)
    const music = {
      title: 'secret base~君がくれたもの~',
      artist: 'Silent Siren',
      src: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.mp3',
      pic: 'https://moeplayer.b0.upaiyun.com/aplayer/secretbase.jpg'
    }
    return {
      music
    }
  }
})
</script>

<style lang="scss">
#app {
  min-width: 1200px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  padding: 20px;
}
.el-header,
.el-footer {
  height: 60px;
}
.el-header {
  background: #c62f2f;
  color: #fff;
}
.el-main {
  height: calc(100vh - 160px);
  padding: 0 !important;
}
.main {
  width: 100%;
  display: flex;
  height: 100%;
  .aside {
    width: 200px;
    background: #f5f5f7;
    overflow-y: scroll;
  }
  .main-view {
    padding: 0 20px 20px 20px;
    flex: 1;
    overflow-y: scroll;
  }
  .scrollbars::-webkit-scrollbar {
    width: 5px;
  }
  /*正常情况下滑块的样式*/
  .scrollbars::-webkit-scrollbar-thumb {
    background-color: #e1e1e2;
    border-radius: 10px;
    -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
  }
  /*鼠标悬浮在该类指向的控件上时滑块的样式*/
  .scrollbars:hover::-webkit-scrollbar-thumb {
    background-color: #e1e1e2;
    border-radius: 10px;
    /*-webkit-box-shadow: inset 1px 1px 0 rgba(0,0,0,.1);*/
  }
  /*鼠标悬浮在滑块上时滑块的样式*/
  .scrollbars::-webkit-scrollbar-thumb:hover {
    background-color: #e1e1e2;
    -webkit-box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.1);
  }
  /*正常时候的主干部分*/
  .scrollbars::-webkit-scrollbar-track {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  }
  /*鼠标悬浮在滚动条上的主干部分*/
  .scrollbars::-webkit-scrollbar-track:hover {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  }
}
</style>
