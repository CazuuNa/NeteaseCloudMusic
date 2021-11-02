<template>
  <div class="main" v-loading="mainLoading">
    <el-carousel :interval="3000" type="card" :initial-index="initialIndex">
      <el-carousel-item style v-for="(item,index) in bannerList" :key="index">
        <div style="position: relative;">
          <el-image style="height:100%;width:100%;" :src="item.imageUrl" alt></el-image>
          <span class="image-tag" :class="`${item.titleColor}-class`">{{ item.typeTitle }}</span>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div class="recommend-songs">
      <p>推荐歌单</p>
      <span>更多 ></span>
    </div>
    <ul class="songs-list">
      <li class="songs-list-item"></li>
      <li class="songs-list-item" v-for="(songs,index) in songList" :key="index">
        <div class="songs-bgimg" style="width:80%;margin:0 auto;position:relative">
          <el-image :src="songs.picUrl" @click="toPlayListDetail(songs)"></el-image>
          <span class="amount-play">
            <i style="margin-right:8px" class="iconfont icon-24gl-headphones"></i>
            <!-- {{ (songs.playCount.toSting()).length > 4 ? `${(songs.playCount.toString()).substring(0,songs.playCount.toString().length -4)}w` : songs.playCount }} -->
            {{ (songs.playCount / 10000) > 1 ? Math.round(songs.playCount / 10000) + 'w' : songs.playCount }}
          </span>
          <span class="recommend-songs-name">为你推荐{{ songs.name }}</span>
          <span class="recommend-play iconfont icon-bofang"></span>
        </div>

        <span class="songs-name">{{ songs.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { getBannerList, getPersonalizedList } from '../../../../api/common'
import { defineComponent, toRefs, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { State } from './index'
export default defineComponent({
  name: 'Vrecomment',
  setup() {
    let state = reactive<State>({
      bannerList: [],
      initialIndex: 0,
      songList: [],
      mainLoading: true
    })
    const router = useRouter()
    const store = useStore()
    console.log(store.state.LoginStatus)
    getBannerList().then(res => {
      state.bannerList = res.data.banners
    })
    if (store.state.LoginStatus === 1) {

    } else {
      getPersonalizedList().then(res => {
        state.songList = res.data.result
        state.mainLoading = false
      })
    }
    const toPlayListDetail = (item: any) => {
      router.push({
        name: 'playlist',
        params: {
          id: item.id
        }
      })
    }
    return {
      ...toRefs(state), toPlayListDetail
    }
  }
})
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.image-tag {
  display: flex;
  position: absolute;
  align-items: center;
  bottom: 24px;
  right: 0px;
  height: 20px;
  font-size: 12px;
  color: #fff;
  padding: 0 10px;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.red-class {
  background: #cc4a4a;
}
.blue-class {
  background: #4a79cc;
}
.recommend-songs {
  margin-top: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #e1e1e2;
  line-height: 30px;
  p {
    font-size: 16px;
    color: #333333;
  }
  span {
    color: #444444;
    font-size: 14px;
    cursor: pointer;
  }
}
.songs-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 auto;
  background: #f5f5f5;
  padding: 10px;
  .songs-list-item {
    background: #fff;
    width: 18%;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    padding: 8px;
    text-align: center;
    .songs-name {
      display: flex;
      flex-wrap: wrap;
      width: 80%;
      margin: 10px auto 0;
      text-align: left;
    }
    .songs-bgimg {
      .amount-play {
        display: flex;
        width: 100%;
        height: 24px;
        background: rgba($color: #000000, $alpha: 0.3);
        z-index: 10;
        position: absolute;
        top: 0;
        color: #f5f5f5;
        align-items: center;
        padding-right: 10px;
        justify-content: flex-end;
        font-size: 12px;
      }
      .recommend-songs-name {
        width: 100%;
        height: 48px;
        background: rgba($color: #000000, $alpha: 0.3);
        z-index: 10;
        position: absolute;
        bottom: 0;
        color: #f5f5f5;
        align-items: center;
        text-align: left;
        padding: 0 8px;
        font-size: 12px;
        overflow: hidden; // 溢出隐藏
        text-overflow: ellipsis; // 溢出用省略号显示
        opacity: 0;
        display: -webkit-box;
        -webkit-box-orient: vertical; // 设置伸缩盒子的子元素排列方式：从上到下垂直排列
        -webkit-line-clamp: 2;
        line-height: 24px;
      }
      .recommend-play {
        display: none;
        position: absolute;
        bottom: 48px;
        right: 10px;
        font-size: 24px;
        color: #f5f5f5;
      }
    }
    .songs-bgimg:hover {
      cursor: pointer;
      .recommend-songs-name {
        opacity: 1;
        transition: all 1s;
      }
      .recommend-play {
        display: block;
      }
    }
  }
}
</style>