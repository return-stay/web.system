<template>
  <div class="dgl-box">
    <div class="od-game-item" v-for="item in orderList" :key="item.id">
      <div class="od-game-item-title">
        <span class="od-game-item-title-t">游戏1</span>
        <span class="od-game-item-title-n">运单号：{{expressNo || '-'}}</span>
      </div>
      <div class="od-game-item-cont">
        <div class="od-game-item-cont-left">
          <img :src="item.game_info.cover" alt="">
        </div>
        <div class="od-game-item-cont-middle">
          <div class="od-game-item-cont-middle-up">
            <div class="od-game-item-cont-middle-up-game">
              <p>{{item.game_info.platform_name}} {{item.game_info.name}}</p>
              <p>{{item.game_info.area_name}} {{item.game_info.language_name}}</p>
            </div>
            <div class="od-game-item-cont-middle-up-loca">
              <p>盘编号：{{item.disc_info.serial || '-'}}</p>
              <p>货架号：{{item.disc_info.shelves || '-'}}</p>
            </div>
          </div>
        </div>
        <div class="od-game-item-cont-right">
          <div class="od-game-item-cont-right-price">
            <span>租金：{{Number(item.day_rent/100).toFixed(2)}}元/天</span>
            <span>租金：{{Number(item.deposit/100).toFixed(2)}}元</span>
          </div>
          <div class="od-game-item-cont-right-btns">
            <span>选择游戏盘</span>
            <span>发货照片</span>
            <!-- <span @click="separateDelivery">单独发货</span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {DiscOrderListDat} from '@/api/api'
import { postAjax } from '@/utils/ajax'
export default {
  name: 'DetailGameList',
  props: {
    expressNo: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      orderList: [{game_info: {}, disc_info: {}}]
    }
  },
  mounted() {
    this.getDiscOrderListDat()
  },
  methods: {
    separateDelivery() {
      this.$emit('separateDelivery', {id: 0})
    },
    // 获取用户租借游戏盘列表
    getDiscOrderListDat() {
      const { id } = this.$route.params
      postAjax({
        url: DiscOrderListDat,
        data: {
          tid: id,
        }
      }).then(res=> {
        // console.log(res)
        if(res.code === 1) {
          const resdata = res.data
          this.orderList = resdata
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.dgl-box {
  .od-game-item {
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
      border: 3px solid #F8F8F8;
      display: flex;
      padding: 20px 40px;
      &-left {
        width: 100px;
        height: 100px;
        flex-shrink: 0;
        margin-right: 30px;
        >img {
          width: 100%;
        }
      }
      &-right {
        flex: 1;
      }
      &-middle {
        margin-right: 150px;
        &-up {
          height: 80px;
          padding: 15px 0;
          color: #000;
          font-size: 14px;
          line-height: 24px;
          display: flex;
          &-game {
            margin-right: 80px;
          }
        }
      }
      &-right {
        padding: 15px 0;
        display: flex;
        justify-content: space-between;
        &-price {
          font-size: 14px;
          >span{
            margin-right: 10px;
          }
        }
        &-btns {
          color: #4C87F9;
          font-size: 14px;
          >span {
            cursor: pointer;
            margin-left: 4px;
          }
        }
      }
    }
  }
}
</style>