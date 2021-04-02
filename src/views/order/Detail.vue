<template>
  <div class="od-box">
    <div v-if="shipmentsType === 0">
      <OrderInfo @callback="callback" :orderInfo="orderInfo" :orderType="orderType" />
    </div>
    <div v-else-if="shipmentsType === 2">
      <OrderShipments :orderInfo="orderInfo" :expressNo="expressNo"  />
    </div>
    <div v-else-if="shipmentsType === 3">
      <OrderQualityTesting :orderInfo="orderInfo" />
    </div>
  </div>
</template>

<script>
import OrderStatus from './OrderStatus'
import { TradeInfoDat } from '@/api/api'
import { postAjax } from '@/utils/ajax'
import DetailGameList from './DetailGameList'
import OrderInfo from './OrderInfo'
import OrderShipments from './OrderShipments'
import OrderQualityTesting from './OrderQualityTesting'
export default {
  name: 'OrderDetail',
  components: { OrderStatus, DetailGameList, OrderInfo, OrderShipments, OrderQualityTesting },
  props: {},
  data() {
    return {
      transactionId: '',
      orderType: 0, //订单状态
      shipmentsType: 0, //发货的状态  1, 发货
      expressNo: '', //快递单号
      orderInfo: {},
      options: [{
        value: 'shunfeng',
        label: '顺丰'
      }, {
        value: 'zhongtong',
        label: '中通'
      }, {
        value: 'yuantong',
        label: '圆通'
      }, {
        value: 'youzheng',
        label: '邮政速运'
      }],
    }
  },
  mounted() {
    this.getDetail()
  },
  created() {
    this.getInit()
  },
  methods: {
    getInit() {
      console.log(this.$route)
      let num = 0
      const type = this.$route.query.type || ''
      switch(type) {
        case 'check':
          num = 0
          break;
        case 'deliver':
          num = 2;
          break;
        case 'quality':
          num = 3;
          break;
        default:
          num = 0
      }
      this.shipmentsType = num
    },
    callback(e) {
      console.log(e)
      let num = 0
      if(e.type === 'shipmetns') {
        num = 2
      }else if(e.type === 'qualityTesting') {
        num = 3
      }else if(e.type === 'close') {
        this.getDetail()
      }else if(e.type ==='qualityTesting') {
        this.shipmentsType = 3
      }
      this.shipmentsType = num
    },
    // 全部发货
    allShipments() {
      this.shipmentsType = 2
    },
    // 关闭订单
    closeOrder() {
      this.getDetail()
    },
    // 保存并返回
    saveAndReturn() {
      this.shipmentsType = 0
    },
    getDetail() {
      const { id } = this.$route.params
      postAjax({
        url: TradeInfoDat,
        data: {
          id: id
        }
      }).then(res=> {
        if(res.code === 1) {
          const resdata = res.data
          this.orderInfo = resdata
          this.transactionId = resdata.transaction_id
          this.expressNo = resdata.express_no
          this.judgmentOrderType(resdata.status)
        }
      })
    },
    // 判断订单的状态
    judgmentOrderType(status) {
      let orderType = 0
      if(status>0 && status<= 20) {
        orderType = 1
      }else if(status > 20 && status<31 ) {
        orderType = 2
      }else if(status > 40 && status <60) {
        // this.shipmentsType = 2
        orderType = 3
      }else if(status > 59 && status < 70) {
        orderType = 4
        // this.shipmentsType = 3
      }else if(status > 70 && status < 120) {
        orderType = 4
        // this.shipmentsType = 3
      }
      this.orderType = orderType
    },
  },
}
</script>

<style lang="scss" scoped>
.od-box {
  background-color: #fff;
  min-height: 100%;
  padding: 16px;
  .el-divider--horizontal {
    margin: 20px 0;
  }
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
      // width: 350px;
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
    h3 {
      margin-bottom: 14px;
    }
    p {
      line-height: 20px;
    }
  }
  .od-game-info {
    margin-top: 20px;
  }
}
</style>