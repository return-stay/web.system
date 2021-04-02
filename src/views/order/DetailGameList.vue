<template>
  <div class="dgl-game-li">
    <div class="dgl-game-li-title">
      <span class="dgl-game-li-title-t">游戏1</span>
      <span class="dgl-game-li-title-n">运单号：{{expressNo || '-'}}</span>
    </div>
    <div class="dgl-game-li-cont">
      <div style="flex:1;">
        <GameView :games="gameInfo" :expressNo="expressNo">
          <template v-if="gameInfo.status === 30">
            <span @click="shipmetns">选择游戏盘</span>
            <span @click="shipmetns">发货照片</span>
          </template>
          <template v-if="gameInfo.status === 90">
            <span @click="qualityTesting">质检</span>
            <span @click="qualityTesting">结算</span>
          </template>
        </GameView>

        <div class="oqt-game-li-cont-b" v-if="gameInfo.status>100">
          <div class="oqt-game-li-cont-b-l">
            <div class="oqt-game-li-cont-b-l-step">
              <el-steps :active="setpAction" align-center finish-status="finish">
                <el-step title="租借开始" :description="arrivedTime" icon="el-icon-success"></el-step>
                <el-step title="客户已归还" :description="givebackTime" icon="el-icon-success"></el-step>
                <el-step title="质检" description="" icon="el-icon-success"></el-step>
                <el-step title="租借完成" description="" icon="el-icon-success"></el-step>
              </el-steps>
            </div>
            <div class="oqt-game-li-cont-b-l-s" v-if="gameInfo.status>90">
              <div class="oqt-game-li-cont-b-l-s-lease">
                <h4>租期</h4>
                <div class="oqt-game-li-cont-b-l-s-lease-li">
                  <span>开始时间：</span>
                  <span class="oqt-game-li-cont-b-l-s-lease-li-text">{{arrivedTime}}</span>
                </div>
                <div class="oqt-game-li-cont-b-l-s-lease-li">
                  <span>结束时间：</span>
                  <span class="oqt-game-li-cont-b-l-s-lease-li-text">{{givebackTime}}</span>
                </div>
                <div class="oqt-game-li-cont-b-l-s-lease-li">
                  <span>免租天数：</span>
                  <span class="oqt-game-li-cont-b-l-s-lease-li-text">{{gameInfo.free_lease}}天</span>
                </div>
                <div class="oqt-game-li-cont-b-l-s-all">
                  <span>计费天数</span><span style="color: #FE6247;">{{gameInfo.lease}}天</span>
                </div>
              </div>
              <div class="oqt-game-li-cont-b-l-s-settl">
                <h4>计算</h4>
                <div class="oqt-game-li-cont-b-l-s-settl-li">
                  <span>租金：</span>
                  <span class="oqt-game-li-cont-b-l-s-settl-li-text">{{Number((gameInfo.day_rent/100).toFixed(2))}}元</span>
                </div>
                <div class="oqt-game-li-cont-b-l-s-settl-li">
                  <span>押金：</span>
                  <span class="oqt-game-li-cont-b-l-s-settl-li-text">{{Number((gameInfo.deposit/100).toFixed(2))}}元</span>
                </div>
                <div class="oqt-game-li-cont-b-l-s-settl-li">
                  <span>罚金：</span>
                  <span class="oqt-game-li-cont-b-l-s-settl-li-text">{{Number((gameInfo.depreciation/100).toFixed(2))}}元</span>
                </div>
                <div class="oqt-game-li-cont-b-l-s-all">
                  <span>共消费</span><span style="color: #FE6247;">{{Number((gameInfo.total_rent/100).toFixed(2))}}元</span>
                </div>
              </div>
            </div> 
          </div>
          <div class="oqt-game-li-cont-b-r" v-if="setQualitySelect && photoList.length>0">
            <div class="oqt-game-li-cont-b-r-top">
              <h5>该游戏发货照片（盒、盘面的正反各1张）</h5>
              <div class="oqt-game-li-cont-b-r-top-imgs">
                <div class="oqt-game-li-cont-b-r-top-imgs-img" v-for="p in photoList" :key="p.id" >
                  <ImageLarger :src="p.path" alt=""></ImageLarger>
                </div>
              </div>
            </div>
          </div>
          <div class="oqt-game-li-cont-b-r" style="border: none;" v-else></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import GameView from './GameView'
import {DiscOrderPhotoLst} from '@/api/api'
import {postAjax} from '@/utils/ajax'
import ImageLarger from '@/components/ImageLarger'
export default {
  name: 'DetailGameList',
  props: {
    expressNo: {
      type: String,
      default: '',
    },
    gameInfo: {
      type: Object,
      default: () => {},
    },
  },
  components: { GameView, ImageLarger },
  data() {
    return {
      moment,
      photoList: [],
    }
  },
  computed: {
    arrivedTime() {
      let atime = this.gameInfo.arrived_time
      return atime? moment(atime).format('YYYY-MM-DD') : null
    },
    givebackTime() {
      let gtime = this.gameInfo.giveback_time
      return gtime ? moment(gtime).format('YYYY-MM-DD') : null
    },
    // 是否质检完成
    setQualitySelect() {
      return this.gameInfo.status < 120
    },
    setpAction() {
      let num = 0;
      switch(this.gameInfo.status) {
        case 60:
          num = 1
          break;
        case 90:
          num = 2
          break;
        case 100:
          num = 3
          break;
        case 110:
          num = 4
          break;
        default: 
          num = 0
      }
      return num
    }
  },
  mounted() {
    console.log(this.gameInfo)
    if(this.gameInfo.status>90) {
      this.getDiscOrderPhotoLst()
    }
  },
  methods: {
    qualityTesting() {
      this.$emit('callback', {type: 'qualityTesting'})
    },
    shipmetns() {
      this.$emit('callback', {type: 'shipmetns'})
    },
    // 获取图片
    getDiscOrderPhotoLst () {
      const { id } = this.gameInfo
      postAjax({
        url: DiscOrderPhotoLst,
        data: {
          oid: id,
        }
      }).then(res=> {
        console.log(res)
        if(res.code === 1) {
          this.photoList = res.data
        }
      })
    },
  }
}
</script>

<style lang="scss">
@import './prici.scss';
</style>
<style lang="scss" scoped>
.dgl-game-li {
  margin-bottom: 20px;
  &-title {
    height: 38px;
    &-t {
      font-size: 14px;
      color: #000;
      background-color:#F8F8F8;
      width: 140px;
      text-align: center;
    }
    &-n {
      font-size: 12px;
      color: #2C2C2C;
      min-width: 160px;
      margin-left: 80px;
    }
    >span {
      display: inline-block;
      height: 38px;
      line-height: 38px;
    }
  }
  &-cont {
    display: flex;
    border: 3px solid #F8F8F8;
    padding: 20px 40px;
  }
}
</style>