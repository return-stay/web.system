<template>
  <div class="oi-box">
    <div class="title">
      <span>订单号：{{orderInfo.transaction_id}}</span>
      <span> / </span>
      <span>下单时间：{{createTime}}</span>
    </div>

    <div class="od-status">
      <div class="od-status-left">
        <OrderStatus @callback="statusCallback" @close="closeOrder" :expressNo="orderInfo.delivery_order_id" :statusName="orderInfo.status_name" :ostatus="orderInfo.status" :orderid="orderInfo.id" />
      </div>
      <div class="od-status-steps">
        <div style="width: 100%;">
          <el-steps :active="orderType" align-center finish-status="finish">
            <el-step title="客户下单" :description="createTime" icon="el-icon-success"></el-step>
            <el-step title="客户支付" :description="payTime" icon="el-icon-success"></el-step>
            <el-step title="仓库发货" :description="sendTime" icon="el-icon-success"></el-step>
            <el-step title="客户收货" :description="arrivedTime" icon="el-icon-success"></el-step>
          </el-steps>
        </div>
      </div>
    </div>
    <div class="od-user-info">
      <UserInfo :orderInfo="orderInfo" />
    </div>

    <div class="oi-game-info">
      <div class="dgl-game-list">
        <div v-for="item in orderList" :key="item.id">
        <DetailGameList 
          :gameInfo="item"
          :expressNo="orderInfo.transaction_id" 
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
export default {
  name: 'OrderInfo',
  components: {OrderStatus, DetailGameList, UserInfo},
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
    expressNo() {
      return this.orderInfo.express_no
    },
    createTime() {
      return moment(this.orderInfo.create_time).format('YYYY-MM-DD HH:mm:ss')
    },
    payTime() {
      return moment(this.orderInfo.pay_time).format('YYYY-MM-DD HH:mm:ss')
    },
    sendTime() {
      return moment(this.orderInfo.send_time).format('YYYY-MM-DD HH:mm:ss')
    },
    arrivedTime() {
      return moment(this.orderInfo.arrived_time).format('YYYY-MM-DD HH:mm:ss')
    },
  },
  mounted() {
    console.log(this.orderInfo)
    this.getDiscOrderListDat()
  },
  methods: {
    // 点击，质检，发货，结算的回调
    statusCallback(e) {
      console.log(e)
      switch(e.type) {
        case "shipmetns":
          this.$emit('callback', {type: 'shipmetns'})
          break;
        default:

      }
      console.log('lll')
    },
    // 关闭订单回调
    closeOrder() {
      this.$emit('callback', {type: 'close'})
    },
    oCallback(row) {
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