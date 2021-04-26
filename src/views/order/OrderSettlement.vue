<template>
  <div class="os-box">
    <div class="title">
      <span>订单号：{{orderInfo.transaction_id}}</span>
      <span>/ 下单时间：{{createTime}}</span>
    </div>
    <div class="od-user-info">
      <el-row :gutter="76">
        <el-col :span="6">
          <div>
            <h3>归还信息</h3>
            <p>收货人：{{orderInfo.username}}</p>
            <p>联系电话：{{orderInfo.mobile}}</p>
            <p>地址：{{orderInfo.province}}{{orderInfo.city}}{{orderInfo.county}}{{orderInfo.address}}</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <h3>配送信息</h3>
            <p>配送方式：{{orderInfo.delivery_company_name}}</p>
            <p @click="viewLogistics" style="cursor: pointer;">运单号：{{orderInfo.express_no}}</p>
          </div>
        </el-col>
        <el-col :span="6"></el-col>
        <el-col :span="6"></el-col>
      </el-row>
    </div>

    <div class="oqt-game-list">
      <div v-for="(item, index) in orderList" :key="item.id">
        <OrderQualityGameList 
          :gameInfo="item" 
          :index="index+1"
          :mediumLists="mediumLists" 
          :expressNo="orderInfo.transaction_id" 
          @callback="oCallback" />
      </div>
    </div>

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
import { postAjax, getAjax } from '@/utils/ajax'
import { DiscOrderListDat, DiscFreeLst, BaseCheckStatusLst, DeliveryTraceInf,TradeInfoDat } from '@/api/api'
import OrderQualityGameList from './OrderQualityGamelist'
import moment from 'moment'
export default {
  name: 'OrderSettlement',
  components: { OrderQualityGameList },
  data() {
    return {
      expressNo: "",
      orderInfo: {},
      orderList: [],
      mediumLists: {},
      dialogVisible: false,
      reverse: true,
      activities: [],
    }
  },
  computed: {
    createTime() {
      return moment(this.orderInfo.create_time).format('YYYY-MM-DD HH:mm:ss')
    },
  },
  mounted() {
    this.getDiscOrderListDat()
    this.getCheckStatusLst()

    this.getOrderDetail()
  },
  methods: {
    // 获取订单详情
    getOrderDetail() {
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
          this.expressNo = resdata.express_no
        }
      })
    },
    // 获取结算列表
    getCheckStatusLst() {
      getAjax({
        url: BaseCheckStatusLst,
      }).then(res=> {
        if(res.code === 1) {
          this.mediumLists = res
        }
      })
    },
    // 根据游戏ID 获取可以发货的游戏盘
    getDiscFreeLst(id ) {
      return postAjax({
        url: DiscFreeLst,
        data: {
          gid: id
        }
      })
    },
    
    // 获取用户租借游戏盘列表
    getDiscOrderListDat() {
      const { id } = this.$route.params
      const that = this
      postAjax({
        url: DiscOrderListDat,
        data: {
          tid: id,
        }
      }).then(async res=> {
        if(res.code === 1) {
          const resdata = res.data
          const { cid } = this.$route.query
          if(cid) {
            let newlist = []
            for(let i = 0;i<resdata.length;i++) {
              const oid = resdata[i].id, gid = resdata[i].game_info.id
              if(Number(cid) === oid) {
                const freeList = await that.getDiscFreeLst(gid)
                resdata[i].freeList = freeList.data? freeList.data: []
                newlist.push(resdata[i])
              }
            }
            that.orderList = newlist
          }else {
            that.orderList = resdata
          }
        }
      })
    },
    oCallback(res) {
      console.log(res)
      this.getDiscOrderListDat()
      if(res.isSettlement) {
        this.$emit('callback', res)
      }
    },
    // 查看物流
    viewLogistics() {
      this.dialogVisible = true
      postAjax({
        url: DeliveryTraceInf,
        data: {
          oid: this.orderInfo.delivery_order_id,
        },
      }).then(res=> {
        if(res.code === 1) {
          this.activities = res.data.list || []
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

<style lang="scss" scoped>
.os-box {
  background-color: #fff;
  min-height: 100%;
  padding: 16px;
  .title {
    height: 40px;
    color: #000;
    font-size: 20px;
    font-weight: 500;
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
  .oqt-game-list {
    margin-top: 20px;
  }
}
</style>