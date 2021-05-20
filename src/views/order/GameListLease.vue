<template>
  <div class="oqt-game-li-cont-b-l-s">
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
        <span>计费天数</span><span style="color: #FE6247;">{{gameInfo.fee_lease}}天</span>
      </div>
    </div>
    <div class="oqt-game-li-cont-b-l-s-settl">
      <h4>结算</h4>
      <div class="oqt-game-li-cont-b-l-s-settl-li">
        <span>租金：</span>
        <span class="oqt-game-li-cont-b-l-s-settl-li-text">{{Number((gameInfo.total_rent/100).toFixed(2))}}元</span>
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
</template>

<script>
import moment from 'moment'
export default {
  name: 'GameListLease',
  props: {
    gameInfo: {
      type: Object,
      default: () => {}
    },
  },
  computed: {
    arrivedTime() {
      let atime = this.gameInfo.arrived_time
      return atime? moment(atime).format('YYYY-MM-DD HH:mm') : null
    },
    givebackTime() {
      let atime = this.gameInfo.giveback_time
      return atime? moment(atime).format('YYYY-MM-DD HH:mm') : null
    },
  },
}
</script>

<style lang="scss" scoped>
.oqt-game-li-cont-b-l-s {
  border-top: 1px solid #BABABA;
  display: flex;
  margin-top: 10px;
  padding-top: 10px;
  >div {
    flex: 1;
    font-size: 14px;
    color:#707070;
  }
  &-lease, &-settl {
    line-height: 18px;
    margin-right: 4px;
    &-li {
      display: flex;
      justify-content: space-between;
      &-text {
        color: #000;
      }
    }
  }
  &-lease {
    margin-right: 60px;
  }
  .oqt-game-li-cont-b-l-s-all {
    color: #000;
    margin-top: 8px;
    text-align: right;
    font-size: 16px;
    >span {
      margin-left: 10px;
    }
  }
}
</style>