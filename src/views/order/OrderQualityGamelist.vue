<template>
  <div class="oqt-game-li">
    <div class="oqt-game-li-title">
      <span class="oqt-game-li-title-t">游戏{{index}}</span>
      <span class="oqt-game-li-title-n" v-if="gameInfo.status < 60">运单号：{{expressNo || '-'}}</span>
      <span class="oqt-game-li-title-n" v-else>（租借中：第{{gameInfo.lease}}天，其中免租{{gameInfo.free_lease}}天）</span>
    </div>
    <div class="oqt-game-li-cont">
      <div style="flex:1;">
        <GameView :games="gameInfo" :isBtn="false">
          <template v-if="!isqualitySelect">
            <span @click="qualityTesting" v-if="setQualitySelect === 1">重新质检</span>
            <span @click="qualityTesting(gameInfo)" v-else>质检</span>
            <span @click="settlement(gameInfo)">结算</span>
          </template>
        </GameView>
        <div class="oqt-game-li-cont-b">
          <div class="oqt-game-li-cont-b-l">
            <div class="oqt-game-li-cont-b-l-step">
              <OrderSteps :active="setpAction">
                <OrderStep title="租借开始" :description="arrivedTime"></OrderStep>
                <OrderStep title="客户已归还" :description="givebackTime"></OrderStep>
                <OrderStep :title="setpAction<3?'质检': '质检完成'" :description="checkTime"></OrderStep>
                <OrderStep title="租借完成" :description="checkTime" ></OrderStep>
              </OrderSteps>
            </div>
            <div class="oqt-game-li-cont-b-l-s" v-if="isSettlementInformation">
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
                <h4>结算</h4>
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
                  <span>共消费</span><span style="color: #FE6247;">{{Number(((gameInfo.depreciation + gameInfo.total_rent)/100).toFixed(2))}}元</span>
                </div>
              </div>
            </div> 
          </div>
          <div class="oqt-game-li-cont-b-r" v-if="isQualitySelect">
            <div class="oqt-game-li-cont-b-r-top">
              <h5>上传该游戏发货照片（盒、盘面的正反各1张）</h5>
              <div class="oqt-game-li-cont-b-r-top-imgs">
                <div class="oqt-game-li-cont-b-r-top-imgs-img" v-for="p in photoList" :key="p.id" >
                  <ImageLarger :src="p.path" alt="" imgstyle="height: 100%;width: 100%;"></ImageLarger>
                </div>
              </div>
            </div>
            <div class="oqt-game-li-cont-b-r-select">
              <span class="oqt-game-li-cont-b-r-select-t">介质类型：</span>
              <el-select v-model="tp" placeholder="请选择" size="small">
                <el-option
                  v-for="ci in typeList"
                  :key="ci.id"
                  :label="ci.name"
                  :value="ci.id">
                </el-option>
              </el-select>
            </div>
            <div class="oqt-game-li-cont-b-r-select">
              <span class="oqt-game-li-cont-b-r-select-t">介质读取：</span>
              <el-select v-model="rs" placeholder="请选择" size="small">
                <el-option label="正常" :value="0"></el-option>
                <el-option
                  v-for="ci in readList"
                  :key="ci.id"
                  :label="ci.depreciate"
                  :value="ci.id">
                </el-option>
              </el-select>
            </div>
            <div class="oqt-game-li-cont-b-r-select">
              <span class="oqt-game-li-cont-b-r-select-t">介质外观：</span>
              <el-select v-model="ms" placeholder="请选择" size="small">
                <el-option label="正常" :value="0"></el-option>
                <el-option
                  v-for="ci in mediaList"
                  :key="ci.id"
                  :label="ci.depreciate"
                  :value="ci.id">
                </el-option>
              </el-select>
            </div>
            <div class="oqt-game-li-cont-b-r-select">
              <span class="oqt-game-li-cont-b-r-select-t">包装盒外观：</span>
              <el-select v-model="cs" placeholder="请选择" size="small">
                <el-option label="正常" :value="0"></el-option>
                <el-option
                  v-for="ci in coverList"
                  :key="ci.id"
                  :label="ci.depreciate"
                  :value="ci.id">
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="oqt-game-li-cont-b-r" style="border: none;" v-else></div>
        </div>
        <div class="od-btns">
          <template v-if="isqualitySelect">
            <el-button  type="primary" @click="qualityInspectionAndSettlement(gameInfo.id)">质检并结算</el-button>
            <span class="od-btn od-save-btn" @click="saveAndReturn(gameInfo.id)">保存并返回</span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GameView from './GameView'
import { postAjax } from '@/utils/ajax'
import { DiscOrderCheckSet, DiscOrderSettlementSet, DiscOrderCheckInf, DiscOrderPhotoLst } from '@/api/api'
import moment from 'moment'
import ImageLarger from '@/components/ImageLarger'
import OrderSteps from '@/components/Steps/OrderSteps'
import OrderStep from '@/components/Steps/OrderStep'
export default {
  name: 'OrderQualityGameList',
  components: { GameView, ImageLarger, OrderSteps, OrderStep },
  props: {
    expressNo: {
      type: String,
      default: '',
    },
    gameInfo: {
      type: Object,
      default: () => {},
    },
    mediumLists: {
      type: Object,
      default: () => {},
    },
    index: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    // 是否显示结算信息
    isSettlementInformation() {
      let siBool = false
      if(this.gameInfo.status>90) {
        siBool = true
      }
      return siBool
    },
    arrivedTime() {
      let atime = this.gameInfo.arrived_time
      return atime? moment(atime).format('YYYY-MM-DD') : null
    },
    givebackTime() {
      let gtime = this.gameInfo.giveback_time
      return gtime ? moment(gtime).format('YYYY-MM-DD') : null
    },
    // 完成时间
    finishTime() {
      let ftime = this.gameInfo.finish_time
      return ftime ? moment(ftime).format('YYYY-MM-DD') : null
    },
    // 质检时间
    checkTime() {
      let checktime = this.gameInfo.check_time
      return checktime ? moment(checktime).format('YYYY-MM-DD') : null
    },
    // 是否显示质检选项
    isQualitySelect() {
      return this.isqualitySelect
    },
    // 是否质检  0.未质检  1. 质检未结算  2.质检并结算 
    setQualitySelect() {
      let num = 0, status = this.gameInfo.status
      if(status < 100 || this.isqualitySelect) {
        num = 1
      }
      if(status === 100) {
        num = 1
      }
      if(status >100) {
        num = 2
      }
      console.log(num)
      return num;
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
  data() {
    return {
      moment,
      isqualitySelect: true,
      photoList: [],
      tp: null,
      typeList: [],
      cs: null,
      coverList: [],
      ms: null,
      mediaList: [],
      rs: null,
      readList: [],
    }
  },
  created() {
    this.setMediumLists()
    this.getCheckInfo()
    this.getDiscOrderPhotoLst()
  },
  methods: {
    // 质检
    qualityTesting(gameinfo) {
      this.isqualitySelect = true
      let id = gameinfo.id
      // this.$router.push({
      //   path: '/order/settlement/' + id,
      //   query: {
      //     type: 'check'
      //   }
      // })
    },
    // 结算
    settlement(row) {
      this.settlementReuqest(row.id, () => {
        this.$emit('callback', {type: 1, isSettlement: false}) //false 获取详情的时候会重新调用订单游戏列表
      })
    },
    settlementReuqest(id, callback) {
      postAjax({
        url: DiscOrderSettlementSet,
        data: {
          id:id
        }
      }).then(res=> {
        console.log(res)
        if(res.code === 1) {
          this.$message.success("结算成功")
          callback && callback()
        }
      })
    },
    setMediumLists() {
      const res = this.mediumLists
      this.typeList = res.type_list.dataList
      this.coverList = res.cover_list.dataList
      this.mediaList = res.media_list.dataList
      this.readList = res.read_list.dataList
    },
    // id 订单ID  ， isSettlement 是否结算 true 结算， false 不结算
    qualityInspectionAndSettlement(id, isSettlement = true) {
      const that = this
      let obj = {
        oid: id,
        tp: that.tp || 0,
        rs: that.rs || 0,
        ms: that.ms || 0,
        cs: that.cs || 0,
      }
      postAjax({
        url: DiscOrderCheckSet,
        data: obj,
      }).then(res=> {
        if(res.code === 1) {
          that.isqualitySelect = false
          if(isSettlement) {
            this.settlementReuqest(id,() => {
              // this.$emit('callback', {type: 1, isSettlement: true})
              this.$router.go(-1)
            })
          }else {
            // this.$emit('callback', {type: 1, isSettlement: false})
            this.$router.go(-1)
          }
        }
      })
    },
    saveAndReturn(id) {
      this.isqualitySelect = false
      this.qualityInspectionAndSettlement(id, false)
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
    // 获取订单还盘信息
    getCheckInfo() {
      const { id } = this.gameInfo
      const that = this
      postAjax({
        url: DiscOrderCheckInf,
        data: {
          oid: id
        }
      }).then(res=> {
        if(res.code === 1) {
          console.log(res.data)
          let resdata = res.data
          that.tp = resdata.type || null
          that.rs = resdata.read_status
          that.ms = resdata.media_status
          that.cs = resdata.cover_status
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.oqt-game-li {
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
.od-btns {
  text-align: right;
  padding-right: 120px;
  margin-top: 20px;
  .od-btn {
    display: inline-block;
    margin-left: 36px;
    font-size: 14px;
    color: #4C87F9;
    cursor: pointer;
  }
}
</style>


<style lang="scss">
@import './prici.scss';
</style>