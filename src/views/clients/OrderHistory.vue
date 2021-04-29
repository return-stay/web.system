<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="订单号"
        align="center"
        width="100">
      </el-table-column>
      <el-table-column
        prop="nickname"
        label="商品"
        align="center">
        <template slot-scope="{row}">
          <div>
            <span>{{row.game_info}}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="收货人"
        align="center">
        <template slot-scope="{row}">
          <div>
            <div><span>{{row.username}}</span> <span>{{row.mobile}}</span></div>
            <div class="table-text-hidden">
              {{row.province}}{{row.city}}{{row.county}}{{row.address}}
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="创建时间"
        align="center">
        <template slot-scope="{row}">
          <span>{{moment(row.create_time).format("YYYY-MM-DD HH:mm:ss")}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="fee"
        label="金额"
        align="center">
        <template slot-scope="{row}">
          <span>{{Number(((row.fee/100).toFixed(2)))}}元</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="status_name"
        label="状态"
        align="center">
      </el-table-column>
      <el-table-column
        prop=""
        label="操作"
        align="center">
        <template slot-scope="{row}">
          <span class="text-cursor" @click="goOrderInfo(row)">详情</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {postAjax} from '@/utils/ajax'
import {UserTradeLst} from '@/api/api'
import moment from 'moment'
export default {
  name: 'OrderHistory',
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  
  data() {
    return {
      moment,
      tableData: [],
    }
  },
  mounted() {
    this.getHistoryList()
  },
  methods: {
    getHistoryList() {
      const { id } = this.$route.params
      postAjax({
        url: UserTradeLst,
        data: {
          uid: id,
        }
      }).then(res=> {
        if(res.code === 1) {
          this.tableData = res.data
        }
      })
    },
    goOrderInfo(row) {
      this.$router.push({
        path: '/order/detail/' + row.id,
        query: {
          type: 'check'
        }
      })
    },
  }
}
</script>
<style lang="scss" scoped>
.table-text-hidden {
  overflow: hidden;/*超出部分隐藏*/
  white-space: nowrap;/*不换行*/
  text-overflow:ellipsis;
}
</style>