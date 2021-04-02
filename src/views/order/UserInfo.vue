<template>
<div class="order-ui-box">
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

        <p v-if="payTime">支付时间：{{payTime}}</p>
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
  
</template>

<script>
import moment from 'moment'
export default {
  name: 'UserInfo',
  props: {
    orderInfo: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    feeStr() {
      return (this.orderInfo.fee/100).toFixed(2)
    },
    payTime() {
      let paytime = this.orderInfo.pay_time
      return paytime? moment(paytime).format('YYYY-MM-DD HH:mm:ss'): null
    },
  }
}
</script>

<style lang="scss" scoped>
.order-ui-box {
  h3 {
    margin-bottom: 14px;
  }
  p {
    line-height: 20px;
  }
}

</style>