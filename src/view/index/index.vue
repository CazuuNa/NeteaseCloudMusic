<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" :stretch='true'>
    <el-tab-pane v-for="(item,index) in tabList" :key="index" :label="item.label" :name="item.name">
      <component v-if="item.showComponent" :is="item.comName"></component>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">

import { defineComponent, toRefs, reactive, ref } from 'vue'
import Vrecommend from './components/recommend/index.vue'
export default defineComponent({
  name: 'index',
  components:{
    Vrecommend
  },
  setup() {
    const state = reactive({
      tabList:[
        {label:'个性推荐',name:'recommend',comName:'Vrecommend',showComponent:true},
        {label:'歌单',name:'songlist',comName:'Vsonglist',showComponent:false},
        {label:'主播电台',name:'station',comName:'Vstation',showComponent:false},
        {label:'排行榜',name:'ranking',comName:'Vranking',showComponent:false},
        {label:'歌手',name:'singer',comName:'Vsinger',showComponent:false},
        {label:'最新音乐',name:'newmusic',comName:'Vnewmusic',showComponent:false},
      ]
    })
    const activeName = ref('recommend')
    const handleClick = (tab: any, event: any) => {
      console.log(tab,tab.props.name, 'tab', event)
    }
    return {
      activeName, handleClick,...toRefs(state)
    }
  }

})
</script>

<style lang="scss" scoped>
::v-deep .el-tabs__nav-scroll {
  caret-color: transparent;
  width: 40% !important;
  margin: 0 auto !important;
  // display: flex;
}
</style>