<template>
  <div class="od-box">
    <div class="title" v-if="shipmentsType === 1">
      <span>订单号：{{orderInfo.transaction_id}}</span>
      <span>发货准备</span>
    </div>
    <div class="title" v-else>
      <span>订单号：{{orderInfo.transaction_id}}</span>
      <span> / </span>
      <span>下单时间：{{createTime}}</span>
    </div>

    <div class="od-status" v-if="shipmentsType === 0">
      <div class="od-status-left">
        <div class="od-status-title">{{orderInfo.status_name}}</div>
        <!-- <div class="od-status-text">该客户还未支付，请耐心等待支付完成。</div> -->
        <div class="od-status-btns">
          <template>
            <el-button type="primary" @click="allShipments">全部发货</el-button>
            <span class="od-btn" @click="closeOrder">关闭并退款</span>
          </template>
          
          <!-- <el-button type="primary">关闭订单</el-button> -->
        </div>
      </div>
      <div class="od-status-steps">
        <div style="width: 100%;">
          <el-steps :active="orderType" align-center finish-status="finish">
            <el-step title="客户下单" :description="createTime" icon="el-icon-success"></el-step>
            <el-step title="客户支付" :description="payTime" icon="el-icon-success"></el-step>
            <el-step title="仓库发货" description="" icon="el-icon-success"></el-step>
            <el-step title="客户收货" description="" icon="el-icon-success"></el-step>
          </el-steps>
        </div>
      </div>
    </div>

    <div class="od-user-info">
      <el-row :gutter="76">
        <el-col :span="6">
          <div>
            <h3>收货信息</h3>
            <p>收货人：{{orderInfo.username}}</p>
            <p>联系电话：{{orderInfo.mobile}}</p>
            <p>地址：{{orderInfo.province}}{{orderInfo.city}}{{orderInfo.county}}{{orderInfo.address}}</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <h3>配送信息</h3>
            <p>配送方式：{{orderInfo.delivery_company_name}}</p>
            <p>配送时间：{{orderInfo.delivery_time_description}}</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <h3>支付信息</h3>
            <p>支付金额：{{feeStr}} 元</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <h3>客户信息</h3>
            <p>微信昵称：-</p>
            <p>备注：{{orderInfo.memo || '-'}}</p>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="od-game-info">
      <detail-game-list v-if="shipmentsType === 0" @separateDelivery="separateDelivery" @update="update" />
      <shipments-game-list v-if="shipmentsType !== 0" :transactionId="transactionId" @saveAndReturn="saveAndReturn" @update="update" />
    </div>
  </div>
</template>

<script>

import { TradeInfoDat, TradeCloseSet } from '@/api/api'
import { postAjax } from '@/utils/ajax'
import moment from 'moment'
import DetailGameList from './DetailGameList'
import ShipmentsGameList from './ShipmentsGameList'
export default {
  name: 'OrderDetail',
  components: { DetailGameList, ShipmentsGameList },
  props: {},
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: '',
      transactionId: '',
      orderType: 0, //订单状态
      shipmentsType: 0, //发货的状态  1, 发货
      expressNo: '', //快递单号
      createTime: '',
      payTime: '',
      orderInfo: {},
      gameInfo: [],
      feeStr: '',
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
  methods: {
    update() {
      // this.getDetail()
    },
    separateDelivery(e) {
      console.log(e)
      this.shipmentsType = 1
    },
    // 全部发货
    allShipments() {
      this.shipmentsType = 2
    },
    // 关闭订单
    closeOrder() {
      this.$confirm('确定关闭该订单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const { id } = this.$route.params
        postAjax({
          url: TradeCloseSet,
          data: {
            id: id
          }
        }).then(res=> {
          if(res.code === 1) {
            this.$message({
              type: 'success',
              message: '订单关闭'
            })
            this.getDetail()
          }
        })
      })
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
          this.orderInfo = res.data
          this.transactionId = resdata.transaction_id
          this.expressNo = resdata.express_no
          this.feeStr = (resdata.fee/100).toFixed(2)
          this.createTime = moment(resdata.create_time).format('YYYY-MM-DD HH:mm:ss')
          this.payTime = moment(resdata.payTime).format('YYYY-MM-DD HH:mm:ss')
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
        orderType = 3
      }else if(status > 59 && status < 70) {
        orderType = 4
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
      .od-status-title {
        font-size: 30px;
        color: #000;
        font-weight: 500;
      }
      .od-status-text {
        font-size: 14px;
        margin-top: 20px;
      }
      .od-status-btns {
        margin-top: 20px;
      }
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

  .od-btn {
    margin-left: 8px;
    font-size: 14px;
    color: #4C87F9;
    cursor: pointer;
  }
}
</style>