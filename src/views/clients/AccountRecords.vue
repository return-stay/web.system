<template>
  <div>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="type_name"
        label="记录内容"
        align="center">
      </el-table-column>
      <el-table-column
        prop=""
        label="客户"
        align="center">
        <template slot-scope="{row}">
          <div>
            <div><span>{{row.username}}</span><span>（微信昵称{{row.nickname}}）</span></div>
            <div>手机号 <span>{{row.mobile}}</span></div>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="fee_time"
        label="发生时间"
        align="center">
        <template slot-scope="{row}">
          <span>{{moment(row.fee_time).format("YYYY-MM-DD")}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="fee"
        label="金额"
        align="center">
        <template slot-scope="{row}">
          <span>{{Number(((row.fee/100).toFixed(2)))||null}}元</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {UserFeeLst} from '@/api/api'
import {postAjax} from '@/utils/ajax'
import moment from 'moment'
export default {
  name: 'AccountRecords',
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
    this.getFeeList()
  },
  methods: {
    manage() {},
    getFeeList() {
      const { id } = this.$route.params
      postAjax({
        url: UserFeeLst,
        data: {
          uid: id,
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