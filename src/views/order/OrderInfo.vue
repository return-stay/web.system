<template>
  <div class="oi-box">
    <div class="title">
      <span>订单号：{{getOrderInfo.transaction_id}}</span>
      <span> / </span>
      <span>下单时间：{{createTime}}</span>
    </div>

    <div class="od-status">
      <div class="od-status-left">
        <OrderStatus @callback="statusCallback" @close="closeOrder" :expressNo="getOrderInfo.delivery_order_id" :statusName="getOrderInfo.status_name" :ostatus="getOrderInfo.status" :orderid="getOrderInfo.id" />
      </div>
      <div class="od-status-steps">
        <div style="width: 100%;">
          <OrderSteps :active="orderType">
            <OrderStep title="客户下单" :description="createTime"></OrderStep>
            <OrderStep title="客户支付" :description="payTime"></OrderStep>
            <OrderStep title="仓库发货" :description="sendTime"></OrderStep>
            <OrderStep title="客户收货" :description="arrivedTime" ></OrderStep>
          </OrderSteps>
        </div>
      </div>
    </div>
    <div class="od-user-info">
      <UserInfo :orderInfo="getOrderInfo" />
    </div>

    <div class="oi-game-info">
      <div class="dgl-game-list">
        <div v-for="(item, index) in orderList" :key="item.id">
        <DetailGameList 
          :gameInfo="item"
          :index="index+1"
          :expressNo="getOrderInfo.express_no" 
          @callback="oCallback" />
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderStatus from './OrderStatus'
import moment from 'moment'
import DetailGameList from './DetailGameList'
import UserInfo from './UserInfo'
import {postAjax} from '@/utils/ajax'
import {DiscOrderListDat} from '@/api/api'
import OrderSteps from '@/components/Steps/OrderSteps'
import OrderStep from '@/components/Steps/OrderStep'
export default {
  name: 'OrderInfo',
  components: {OrderStatus, DetailGameList, UserInfo, OrderSteps, OrderStep },
  props: {
    orderInfo: {
      type: Object,
      default: () => {}
    },
    orderType: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      orderList: [],
    }
  },
  computed: {
    getOrderInfo() {
      return this.orderInfo
    },
    expressNo() {
      return this.orderInfo.express_no
    },
    createTime() {
      let create_time = this.orderInfo.create_time
      let timeStr = create_time ? moment(create_time).format('YYYY-MM-DD HH:mm:ss') : null
      return moment(timeStr).format('YYYY-MM-DD HH:mm:ss')
    },
    payTime() {
      let pay_time = this.orderInfo.pay_time
      let timeStr = pay_time ? moment(pay_time).format('YYYY-MM-DD HH:mm:ss') : null
      return timeStr
    },
    sendTime() {
      let send_time = this.orderInfo.send_time
      let timeStr = send_time ? moment(send_time).format('YYYY-MM-DD HH:mm:ss') : null
      return timeStr
    },
    arrivedTime() {
      let arrivedTime = this.orderInfo.arrived_time
      let timeStr = arrivedTime ? moment(arrivedTime).format('YYYY-MM-DD HH:mm:ss'): null
      return timeStr
    },
  },
  mounted() {
    this.getDiscOrderListDat()
  },
  methods: {
    // 点击，质检，发货，结算的回调
    statusCallback(e) {
      switch(e.type) {
        case "shipmetns": //发货
          this.$emit('callback', {type: 'shipmetns'})
          break;
        case 'backgroundConfirmation': //后台确认收货
          break;
        case 'qualityTesting': //质检
          this.$emit('callback', {type: 'shipmetns'})
          break;
        case 'settlement': //结算
          break;
        default:

      }
    },
    // 关闭订单回调
    closeOrder() {
      this.$emit('callback', {type: 'close'})
    },
    oCallback(row) {
      console.log(row)
      if(row.status === 'success') {
        this.getDiscOrderListDat()
      }
      this.$emit('callback', row)
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
        if(res.code === 1) {
          const resdata = res.data
          this.orderList = resdata
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.oi-box {
  .title {
    height: 40px;
    color: #000;
    font-size: 20px;
    font-weight: 500;
  }
  .od-status {
    background-color: #F8F8F8;
    padding: 3px;
    display: flex;
    .od-status-left {
      flex-shrink: 0;
      width: 350px;
      height: 200px;
      background-color: #fff;
      margin-right: 3px;
      padding: 30px 40px;
    }
    .od-status-steps {
      flex: 1;
      background-color: #fff;
      display: flex;
      align-items: center;
    }
  }
  .od-user-info {
    background-color: #F8F8F8;
    padding: 20px 42px;
    font-size: 14px;
    color: #444;
    margin-top: 14px;
  }
  .oi-game-info {
    margin-top: 20px;
    .dgl-game-list {
      margin-top: 20px;
    }
  }
}
</style>