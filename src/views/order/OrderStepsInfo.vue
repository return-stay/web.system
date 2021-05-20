<template>
  <div>
    <OrderSteps :active="setpAction">
      <OrderStep title="租借开始" :description="arrivedTime"></OrderStep>
      <OrderStep title="客户已归还" :description="givebackTime" :valueInfo="expressNo" @callback="expressInfo"></OrderStep>
      <OrderStep :title="setpAction<3?'质检': '质检完成'" :description="checkTime"></OrderStep>
      <OrderStep title="租借完成" :description="finishTime" ></OrderStep>
    </OrderSteps>

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
import moment from 'moment'
import OrderSteps from '@/components/Steps/OrderSteps'
import OrderStep from '@/components/Steps/OrderStep'
import { postAjax } from '@/utils/ajax'
import { DeliveryTraceInf } from '@/api/api'
export default {
  name: 'OrderStepsInfo',
  components: { OrderSteps, OrderStep },
  props: {
    status: {
      type: Number,
      default: 0,
    },
    delivery_order_id: Number,
    arrived_time: "",
    giveback_time: '',
    finish_time: '',
    check_time: '',
    express_no: '',
  },
  data() {
    return {
      moment,
      reverse: true,
      activities: [],
      dialogVisible: false,
    }
  },
  computed: {
    setpAction() {
      let num = 0;
      let statusNum = this.status
      if(statusNum === 60 || statusNum === 70 || statusNum === 80) {
        num = 1
      }else if(statusNum === 90) {
        num = 2
      }else if(statusNum === 100) {
        num = 3
      }else if(statusNum === 110 || statusNum === 200) {
        num = 4
      }else {
        num = 0
      }
      return num
    },
    expressNo() {
      return this.express_no
    },
    arrivedTime() {
      let atime = this.arrived_time
      return atime? moment(atime).format('YYYY-MM-DD HH:mm') : null
    },
    givebackTime() {
      let gtime = this.giveback_time
      return gtime ? moment(gtime).format('YYYY-MM-DD HH:mm') : null
    },
    // 完成时间
    finishTime() {
      let ftime = this.finish_time
      return ftime ? moment(ftime).format('YYYY-MM-DD HH:mm') : null
    },
    // 质检时间
    checkTime() {
      let checktime = this.check_time
      return checktime ? moment(checktime).format('YYYY-MM-DD HH:mm') : null
    },
  },
  methods: {
    expressInfo() {
      this.viewLogistics()
    },
    // 查看物流
    viewLogistics() {
      this.dialogVisible = true
      postAjax({
        url: DeliveryTraceInf,
        data: {
          oid: this.delivery_order_id,
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
  }
}
</script>