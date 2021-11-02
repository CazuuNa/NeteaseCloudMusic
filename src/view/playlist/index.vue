<template>
  <div class="main" v-loading="mainLoading">
    <div class="songs-main">
      <el-image :src="playListDetail.coverImgUrl" :lazy="true" style="height:200px"></el-image>
      <div class="songs-detail">
        <div class="details">
          <div class="details-name">
            <span class="playlist-span">歌单</span>
            <span class="playlist-name">{{ playListDetail.name }}</span>
          </div>
          <div class="details-count">
            <div>
              <p>歌曲数</p>
              <span>{{ playListDetail.trackCount }}</span>
            </div>
            <div>
              <p>播放数</p>
              <span>{{ (playListDetail.playCount / 10000) > 1 ? Math.round(playListDetail.playCount / 10000) + 'w' : playListDetail.playCount }}</span>
            </div>
          </div>
        </div>
        <div class="details-creator">
          <el-image
            :src="creatorDetail.avatarUrl"
            style="height:40px;border-radius:50%;margin-right:10px"
          ></el-image>
          <span style="font-size:16px;color:#444">{{ creatorDetail.nickname }}</span>
          <span
            style="font-size:14px;color:#888;padding-left:20px"
          >{{ dateToISO(playListDetail.createTime,'YYYY-MM-DD') }}创建</span>
        </div>
        <div class="details-operate">
          <el-button-group>
            <el-button size="mini" type="primary">播放全部</el-button>
            <el-button type="primary" size="mini">+</el-button>
          </el-button-group>
          <el-button size="mini">收藏（{{ playListDetail.subscribedCount }}）</el-button>
          <el-button size="mini">分享（{{ playListDetail.shareCount }}）</el-button>
          <el-button size="mini">下载全部</el-button>
        </div>
        <div class="details-tag">
          标签：
          <span v-for="(tag,index) in playListDetail.tags" :key="index">
            {{ tag }}
            <span
              style="color:#ccc"
            >{{ (index) !== playListDetail.tags.length - 1 ? '/' : '' }}</span>
          </span>
        </div>
        <div
          class="details-brief"
          v-if="playListDetail.description"
        >简介：{{ playListDetail.description }}</div>
      </div>
    </div>
    <div class="playlist-menu">
      <el-tabs v-model="activeMenu" @tab-click="handleClickMenu" v-if="!mainLoading">
        <el-tab-pane label="歌单" name="playlist">
          <el-table class="table-baseStyle" :data="playlistData" style="width: 100%">
            <el-table-column type="index" />
            <!-- <el-table-column></el-table-column> -->
            <el-table-column label="歌名" sortable min-width="200">
              <template #default="scope">
                {{scope.row.name}}
                <span v-if="scope.row.alia.length > 0" style="color:#aeaeae">-（<span v-for="item in scope.row.alia">{{item}}</span>）</span>
              </template>
            </el-table-column>
            <el-table-column label="时长" min-width="140">
              <template #default="scope">
                <span class="time-class">{{ toComputedTime(scope.row) }}</span>
                <div class="change-time-class">
                  <span class="add-icon iconfont icon-icon_tianjia"></span>
                  <span class="add-icon iconfont icon-wenjianjia"></span>
                  <span class="add-icon iconfont icon-fenxiang"></span>
                  <span class="add-icon iconfont icon-xiazai_o"></span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="歌手">
              <template #default="scope">{{ scope.row.ar ? toComputedSinger(scope.row) : '' }}</template>
              <!-- <template #default="scope">{{ scope.row.ar[0].name }}</template> -->
            </el-table-column>
            <el-table-column label="专辑">
              <template #default="scope">{{ scope.row.al.name }}</template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="评论" name="comment"></el-tab-pane>
        <el-tab-pane label="收藏者" name="collecter"></el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { defineComponent, toRefs, reactive, onMounted } from 'vue'
import { playListDetail } from '../../api/common'
import { dateToISO } from '../../utils/time'
import { State } from './index'
export default defineComponent({
  setup() {
    const state = reactive<State>({
      playListDetail: {},
      creatorDetail: {},
      mainLoading: true,
      playlistData: [],
      activeMenu: 'playlist'
    })
    const router = useRouter()
    console.log(router.currentRoute.value.query.id, '1')
    onMounted(async () => {
      console.log(router.currentRoute.value.query.id, '2')
      const detail = await playListDetail({ id: router.currentRoute.value.params.id })
      state.playListDetail = detail.data.playlist
      state.creatorDetail = detail.data.playlist.creator
      state.playlistData = detail.data.playlist.tracks
      state.mainLoading = false
    })
    // const dateToISOs = ((data: number) => {
    //   return dateToISO(data, 'YYYY-MM-DD')
    // })
    // onMounted(() => {
    //   console.log('onMounted')
    // })
    const handleClickMenu = (() => {

    })
    const toComputedTime = ((row: any) => {
      var hours = Math.floor((row.dt % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((row.dt % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((row.dt % (1000 * 60)) / 1000);
      return (hours >= 1 ? (hours + ":") : '') + minutes + ":" + seconds;
    })

    const toComputedSinger = ((row:any) => {
      let name = ''
      row.ar.forEach((item:any,index:number) => {
        if(index == 0) {
          name = item.name
        }else {
          name = name + '/' + item.name
        }
      });
      return name
    })

    return {
      ...toRefs(state), handleClickMenu, toComputedTime,toComputedSinger,dateToISO
    }
  }
})
</script>

<style lang="scss" scoped>
[v-cloak] {
  display: none;
}
.main {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.songs-main {
  width: 100%;
  padding: 28px 0 28px 28px;
  display: flex;
  .songs-detail {
    width: calc(100% - 200px);
    padding-left: 40px;
    .details {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      .details-name {
        display: flex;
        align-items: center;
        .playlist-span {
          padding: 3px 4px;
          display: inline-block;
          border: 1px solid #e03f40;
          color: #e03f40;
          font-size: 12px;
          margin-right: 10px;
        }
        .playlist-name {
          font-size: 24px;
          font-weight: 500;
        }
      }
      .details-count {
        display: flex;
        div {
          color: #999999;
          font-size: 14px;
          text-align: right;
          padding: 0 4px;
        }
        div:first-child {
          border-right: 1px solid #999999;
        }
      }
    }
    .details-creator {
      width: 100%;
      display: flex;
      align-items: center;
      height: 40px;
      margin-top: 10px;
    }
    .details-operate {
      width: 70%;
      display: flex;
      padding-top: 10px;
      justify-content: space-between;
    }
    .details-tag {
      width: 100%;
      display: flex;
      height: 40px;
      align-items: center;
      margin-top: 10px;
      span {
        color: #0c73c2;
        font-size: 12px;
        cursor: pointer;
      }
    }
  }
}
.add-icon {
  font-size: 13px;
  margin-right: 8px;
  &:hover {
    color: #000;
    font-weight: bold;
  }
}
</style>>
