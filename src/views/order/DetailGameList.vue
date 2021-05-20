<template>
  <div class="dgl-game-li">
    <div class="dgl-game-li-title">
      <span class="dgl-game-li-title-t">游戏{{index}}</span>
      <span class="dgl-game-li-title-n">运单号：{{expressNo || '-'}}</span>
    </div>
    <div class="dgl-game-li-cont">
      <div style="flex:1;">
        <GameView :games="gameInfo" :expressNo="expressNo">
          <template v-if="gameInfo.status === 30">
            <span @click="shipmetns">选择游戏盘</span>
            <span @click="shipmetns">发货照片</span>
          </template>
          <template v-if="gameInfo.status === 60 && gameInfo.rt_total_rent > gameInfo.deposit">
            <span @click="overdueSettlement">超期结算</span>
          </template>

          <template v-if="gameInfo.status === 90 || gameInfo.status === 50">
            <span @click="qualityTesting('qualityTesting')">质检</span>
            <span @click="qualityTesting('settlement', gameInfo.status)">结算</span>
          </template>
          <template v-if="gameInfo.status === 100">
            <span @click="qualityTesting('qualityTesting')">重新质检</span>
            <span @click="qualityTesting('settlement', gameInfo.status)">结算</span>
          </template>
        </GameView>

        <div class="oqt-game-li-cont-b">
          <div class="oqt-game-li-cont-b-l">
            <div class="oqt-game-li-cont-b-l-step"  v-if="gameInfo.status>50">
              <OrderStepsInfo
                :status="gameInfo.status"
                :arrived_time="gameInfo.arrived_time"
                :express_no="gameInfo.express_no"
                :delivery_order_id="gameInfo.delivery_order_id"
                :giveback_time="gameInfo.giveback_time"
                :finish_time="gameInfo.finish_time"
                :check_time="gameInfo.check_time"
              />
            </div>
            <GameListLease 
              v-if="isSettlementInformation && gameInfo.status>90"
              :gameInfo="gameInfo"
              />
          </div>
          <div class="oqt-game-li-cont-b-r" v-if="setQualitySelect && photoList.length>0 && gameInfo.status>90">
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
import { DiscOrderPhotoLst, DiscOrderSettlementSet, DiscOrderSettlementBuySet } from '@/api/api'
import {postAjax} from '@/utils/ajax'
import ImageLarger from '@/components/ImageLarger'
import GameListLease from './GameListLease'
import OrderStepsInfo from './OrderStepsInfo'
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
    index: {
      type: Number,
      default: 0,
    },
  },
  components: { GameView, ImageLarger, GameListLease, OrderStepsInfo },
  data() {
    return {
      moment,
      photoList: [],
    }
  },
  computed: {
    // 是否显示结算信息
    isSettlementInformation() {
      return this.gameInfo.status>90
    },
    // 是否质检完成
    setQualitySelect() {
      return this.gameInfo.status < 100
    },
  },
  mounted() {
    let gameStatus = this.gameInfo.status
    if(gameStatus>80 && gameStatus<110) {
      this.getDiscOrderPhotoLst()
    }
  },
  methods: {
    // 超期结算
    overdueSettlement() {
      this.$confirm('该游戏盘的累计租金总额已经超过押金金额，可以进行超期结算操作，操作后押金将被扣除，且游戏盘状态将更改为【已购买】，确认操作吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          postAjax({
            url: DiscOrderSettlementBuySet,
            data: {
              id: this.gameInfo.id
            }
          }).then(res=> {
            if(res.code === 1) {
              this.$message.success("超期结算成功")
              this.$emit('callback', {type: 'settlement', status: 'success'})
            }
          })
        })
    },
    // 直接或结算
    qualityTesting(type, status) {
      if(type === 'settlement') {
        if(status > 90) {
          this.settlementReuqest(this.gameInfo.id, () => {
            this.$emit('callback', {type: 'settlement', status: 'success'})
          })
        }else {
          this.$emit('callback', {type: 'qualityTesting'})
        }
      }else {
        // let id = this.gameInfo.id
        let id = this.$route.params.id
        // this.$emit('callback', {type: 'qualityTesting'})
        this.$router.push({
          path: '/order/settlement/' + id,
          query: {
            cid: this.gameInfo.id
          }
        })
      }
    },
    // 结算
    settlementReuqest(id, callback) {
      postAjax({
        url: DiscOrderSettlementSet,
        data: {
          id:id
        }
      }).then(res=> {
        if(res.code === 1) {
          this.$message.success("结算成功")
          callback && callback()
        }
      })
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