<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="type_name"
        label="售后编号"
        align="center">
      </el-table-column>
      <el-table-column
        prop=""
        label="售后详情"
        align="center">
      </el-table-column>
      <el-table-column
        prop=""
        label="分类"
        align="center">
      </el-table-column>
      <el-table-column
        prop=""
        label="客户信息"
        align="center">
        <template slot-scope="{row}">
          <div>
            <div><span>{{row.username}}</span><span>（微信昵称{{row.nickname}}）</span></div>
            <div>手机号 <span>{{row.mobile}}</span></div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="fee"
        label="退款金额"
        align="center">
        <template slot-scope="{row}">
          <span>{{Number(((row.fee/100).toFixed(2)))||null}}元</span>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="申请时间"
        align="center">
        <template slot-scope="{row}">
          <span>{{moment(row.fee_time).format("YYYY-MM-DD HH:mm:ss")}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="处理时间"
        align="center">
        <template slot-scope="{row}">
          <span>{{moment(row.fee_time).format("YYYY-MM-DD HH:mm:ss")}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop=""
        label="操作"
        align="center">
        <template slot-scope="{row}">
          <span class="text-cursor" @click="handle(row)" >处理</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {RefundListDat} from '@/api/api'
import {postAjax} from '@/utils/ajax'
import moment from 'moment'
export default {
  name: 'AfterSalesRecord',
  data() {
    return {
      moment,
      tableData: [],
    }
  },
  mounted() {
    this.getRefundList()
  },
  methods: {
    handle(row) {
      console.log(row)
    },
    getRefundList() {
      const { id } = this.$route.params
      postAjax({
        url: RefundListDat,
        data: {
          uid: id,
          page: 1,
        }
      }).then(res=> {
        if(res.code === 1) {
          this.tableData = res.data.list
        }
      })
    },
  }
}
</script>