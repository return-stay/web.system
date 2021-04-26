<template>
  <div class="os-box">
    <div class="od-status-title">{{statusName}}</div>
    <template v-if="ostatus ===20">
      <div class="od-status-btns">
        <template>
          <div>订单待支付</div>
          <div style="height: 36px;"></div>
          <span slot="reference" class="od-btn" @click="closeOrder">关闭</span>
        </template>
      </div>
    </template>

    <template v-if="ostatus ===30">
      <div class="od-status-btns">
        <template>
          <el-button type="primary" v-if="ostatus === 30" @click="allShipments">去发货</el-button>
          <div v-else style="height: 36px;"></div>
          <span slot="reference" class="od-btn" @click="closeOrder">关闭并退款</span>
        </template>
      </div>
    </template>
    <template v-else-if="ostatus === 40 || ostatus === 50">
      <div class="od-status-btns">
        <div>仓库已发货，等待客户确认收货</div>
        <template>
          <el-button style="margin-top: 20px;" type="primary" @click="viewLogistics">查看物流信息</el-button>
          <!-- <span class="od-btn" @click="backstageReceiving">后台确认收货</span> -->
        </template>
      </div>
    </template>
    <template v-else-if="ostatus === 60">
      <div class="od-status-btns">
        <div>客户已确认收货，租借计时开始</div>
        <template>
          <el-button style="margin-top: 20px;" type="primary" @click="viewLogistics">查看物流信息</el-button>
        </template>
      </div>
    </template>
    <template v-else-if="ostatus === 90">
      <div class="od-status-btns">
        <div>客户已归还，收到后准备质检并结算</div>
        <template>
          <el-button style="margin-top: 20px;" type="primary" @click="qualityTesting">去质检</el-button>
        </template>
      </div>
    </template>
    <template v-else-if="ostatus === 100">
      <div class="od-status-btns">
        <div>结算完成前可重新质检</div>
        <template>
          <el-button style="margin-top: 20px;" type="primary" @click="settlement">确定结算</el-button>
        </template>
      </div>
    </template>
    <template v-else-if="ostatus > 100">
      <div class="od-status-btns">
        <div>结算完成，用户押金已解冻</div>
      </div>
    </template>

    <el-dialog
      title="物流信息"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose">
      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(activity, index) in activities"
          :key="index"
          :timestamp="activity.datetime">
          {{activity.station}}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
import { postAjax } from '@/utils/ajax'
import { TradeCloseSet, DeliveryTraceInf } from '@/api/api'
export default {
  name: 'OrderStatus',
  props: {
    statusName: {
      type: String,
      default: '',
    },
    ostatus: {
      type: Number,
      default: 0,
    },
    orderid: {
      type: Number,
      default: null,
    },
    expressNo: {
      type: String|Number,
      default: '',
    },
  },
  data() {
    return {
      dialogVisible: false,
      reverse: true,
      activities: []
    }
  },
  methods: {
    // 全部发货
    allShipments() {
      this.$emit('callback', {type: 'shipmetns'})
    },
    // 后台确认收货
    backstageReceiving() {
      this.$emit('callback', {type: 'backgroundConfirmation'})
    },
    // 质检
    qualityTesting() {
      this.$emit('callback', {type: 'qualityTesting'})
    },
    // 结算
    settlement() {
      this.$emit('callback', {type: 'settlement'})
    },
    // 查看物流
    viewLogistics() {
      this.dialogVisible = true
      postAjax({
        url: DeliveryTraceInf,
        data: {
          oid: this.expressNo,
        },
      }).then(res=> {
        if(res.code === 1) {
          if(res.data) {
            this.activities = res.data.list || []
          }
        }
      })
    },
    handleClose() {
      this.activities = []
      this.dialogVisible = false
    },
    // 关闭订单
    closeOrder() {
      this.$confirm('确定关闭该订单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const { id } = this.$route.params
        console.log(id)
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
            this.$emit('close')
          }
        })
      })
    },
  }
}

</script>

<style lang="scss" scoped>
.os-box {
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

  .od-btn {
    margin-left: 8px;
    font-size: 14px;
    color: #4C87F9;
    cursor: pointer;
  }
}
</style>