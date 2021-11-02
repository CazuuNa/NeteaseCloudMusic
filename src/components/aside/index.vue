<template>
  <p class="title">推荐</p>
  <ul class="menu-ul">
    <li
      class="menu-item"
      @click="toClickMenu(item)"
      :class="[item.actived && state.pathRoute === item.route  ? 'active-class' : '']"
      v-for="(item,index) in state.menuRecList"
      :key="index"
    >
      <span class="iconfont icon-class" :class="item.icon"></span>
      {{ item.title }}
    </li>
  </ul>
  <!-- <p class="title">我的歌单</p>
    <ul class="menu-ul">
      <li class="menu-item" @click="toClickMenu(item)" :class="[item.actived ? 'active-class' : '']" v-for="(item,index) in state.menuRecList" :key="index">
        <span class="iconfont icon-class" :class="item.icon"></span>
          {{item.title}}
      </li>
  </ul>-->
</template>

<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from "vue-router";
import {State} from './index'

export default defineComponent({
  setup() {
    const route = useRoute();
    
    const state = reactive<State>({
      pathRoute:'/',
      menuRecList: [
        {
          title: '发现音乐',
          icon: 'icon-yinle',
          route: 'index',
          actived: true
        },
        {
          title: '私人FM',
          icon: 'icon-luyinjishouyinjidiantai',
          route: '',
          actived: false
        },
        {
          title: 'LOOK直播',
          icon: 'icon-15',
          route: '',
          actived: false
        },
        {
          title: '视频',
          icon: 'icon-shipin_o',
          route: '',
          actived: false
        },
        {
          title: '朋友',
          icon: 'icon-pengyou',
          route: '',
          actived: false
        },
        {
          title: '本地音乐',
          icon: 'icon-yinlemusic214',
          route: '',
          actived: false
        },
        {
          title: '下载管理',
          icon: 'icon-xiazai_o',
          route: '',
          actived: false
        },
        {
          title: '我的音乐云盘',
          icon: 'icon-shouye',
          route: '',
          actived: false
        },
        {
          title: '我的收藏',
          icon: 'icon-shoucang',
          route: '',
          actived: false
        },
      ],
    })
    watch(route, () => {
      console.log(route.name,'route')
      state.pathRoute = route.name
    })
    
    const toClickMenu = (item: any) => {
      state.menuRecList.forEach((i:any, j:any) => {
        i.actived = false
      })
      item.actived = true
    }
    return {
      state, toClickMenu
    }
  },
})
</script>

<style lang="scss" scoped>
.title {
  height: 20px;
  font-size: 14px;
  color: #7d7d7d;
  display: flex;
  // align-items: end;
}
.menu-ul {
  width: 100%;
  padding-bottom: 20px;
  .menu-item {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding-left: 20px;
    font-size: 12px;
    caret-color: transparent;
    .icon-class {
      height: 12px;
      margin-right: 6px;
    }
  }
  .menu-item:hover {
    color: #000000;
    font-weight: 600;
  }
  .active-class {
    background: #e6e7ea;
    color: #000000;
    font-weight: 600;
    border-left: 6px solid #c62f2f;
  }
}
</style>
