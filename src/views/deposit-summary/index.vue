
<template>
  <div class="summary-cont-box">
    <div class="summary-cont-top">
      <span>{{ title }} ({{ value2 }})</span>
      <div class="selece-cont"></div>
      <div class="summary-cont-content">
        <date-picker @change="pickerChange" :picker-options="pickerOptions" />
      </div>
      <div style="margin-left: 20px;">
        <el-select style="width: 120px;" v-model="platformValue" @change="platformChange" placeholder="请选择渠道">
          <el-option
            v-for="(item, i) in trenchList"
            :key="i"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>

    <div class="game-cont-box">
      <!-- <div class="game-cont" style="margin-right: 20px;">
        <p class="game-cont-title">概要</p>
        <ul class="game-ul">
          <li>
            <p>新增用户数</p>
            <p class="game-li-num">{{newUser}}</p>
          </li>
          <li>
            <p>回访用户数</p>
            <p class="game-li-num">{{oldUser}}</p>
          </li>
        </ul>
      </div> -->
      <div class="game-cont" style="flex: 1;">
        <p class="game-cont-title">汇总</p>

        <ul class="game-ul">
          <li>
            <p>押金流水</p>
            <p class="game-li-num">{{deposit_str}}</p>
          </li>
          <li>
            <p>可提现余额</p>
            <p class="game-li-num">{{free_fee_str}}</p>
          </li>
          <li>
            <p>订单付费用户数</p>
            <p class="game-li-num">{{free_fee_user_count}}</p>
          </li>
          <li>
            <p>可提现用户数</p>
            <p class="game-li-num">{{trade_user}}</p>
          </li>
        </ul>
      </div>
    </div>
    
    <div>
      <el-table
        ref="filterTable"
        border
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="day"
          label="日期"
          align="center"
          sortable
          :cell-style="{background: '#ccc'}"
        >
        </el-table-column>
        <el-table-column
          prop="deposit"
          align="center"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>押金流水</span>
              <el-tooltip class="item" effect="dark" content="每日收到的订单押金金额，单位人民币元" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
          <template slot-scope="{row}">
            <div>
              <span>{{row.deposit_str}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="free_fee"
          align="center"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>可提现余额</span>
              <el-tooltip class="item" effect="dark" content="每日可提现的余额金额，单位人民币元" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
          <template slot-scope="{row}">
            <div>
              <span>{{row.free_fee_str}}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="free_fee_user_count"
          align="center"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>订单付费用户数</span>
              <el-tooltip class="item" effect="dark" content="每日通过订单付费的用户数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          prop="trade_user_count"
          align="center"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>可提现用户数</span>
              <el-tooltip class="item" effect="dark" content="每日可提现的用户数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="pagination-block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          :layout="pageLayout"
          :total="pageTotal">
        </el-pagination>
      </div> -->
    </div>
  </div>
</template>

<script>
import tableMixins from '@/mixins/tableMixins'
import DatePicker from '@/components/DatePicker'
import moment from 'moment'
export default {
  name: 'DepositSummary',
  mixins: [tableMixins],
  components: {DatePicker},
  data() {
    return {
      title: '押金汇总',
      s_time: 0, 
      e_time: 0,
      deposit_str: 0, //总押金
      free_fee_str: 0, //总的提现余额
      free_fee_user_count: 0, //订单付费用户
      trade_user: 0, //可提现用户

      
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            const dataArr = []
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            
            dataArr.push(date)
            const eDate = new Date()
            eDate.setTime(eDate.getTime())
            dataArr.push(eDate)
            picker.$emit('pick', dataArr);
          }
        }, {
          text: '前7天',
          onClick(picker) {
            const date = new Date();
            const dataArr = []
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            
            dataArr.push(date)
            const eDate = new Date()
            eDate.setTime(eDate.getTime())
            dataArr.push(eDate)
            picker.$emit('pick', dataArr);
          }
        }, {
          text: '前30天',
          onClick(picker) {
            const date = new Date();
            const dataArr = []
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
            
            dataArr.push(date)
            const eDate = new Date()
            eDate.setTime(eDate.getTime())
            dataArr.push(eDate)
            picker.$emit('pick', dataArr);
          }
        }]
      },
      value2: '', //显示 YYYY年MM月DD日 ~ YYYY年MM月DD日 
      placeholderValue: [], //时间选择器的默认值
      platformValue: -1,
      trenchList: [],
    }
  },
  mounted() {
    this.getInitTime()
    this.getTrenchList()
  },
  methods: {
    getInitTime() {
      let timestamp=new Date()
      const etimeNumber =this.dateToMs(timestamp)- 24*60*60*1000
      this.e_time = etimeNumber
      let valuee = timestamp - 30 * 24 * 60*60*1000
      this.s_time = valuee
      this.value2 = moment(valuee).format('YYYY年MM月DD日') + ' ~ ' +moment(etimeNumber).format('YYYY年MM月DD日');
      this.placeholderValue = [new Date(this.s_time), new Date(this.e_time)]
      this.init()
    },
    pickerChange(data) {
      this.s_time = this.dateToMs(data[0])
      this.e_time = this.dateToMs(data[1])
      this.value2 = moment(data[0]).format('YYYY年MM月DD日') + ' ~ ' +moment(data[1]).format('YYYY年MM月DD日');
      this.placeholderValue = [new Date(this.s_time), new Date(this.e_time)]
      this.init()
    },
    dateToMs (date) {
      let result = new Date(date).getTime();
      return result;
    },
    init() {
      this.getList()
      this.getInfo()
    },
    getInfo () {
      let timestamp=new Date().getTime()
      const obj = {
        s_time: this.s_time, e_time: this.e_time, ch_id: this.platformValue
      }
      const that = this
      this.$store.dispatch('game/getDepositSummaryInfo', obj).then(res=> {
        const info = res.data
        this.deposit_str = (info.deposit/100).toFixed(2)
        this.free_fee_str = (info.free_fee/100).toFixed(2)
      })
    },
    getList() {
      let timestamp=new Date().getTime()
      let stime = this.s_time
      let etime = this.e_time
      const obj = {
        s_time: this.s_time, e_time: this.e_time, ch_id: this.platformValue
      }
      const that = this
      this.$store.dispatch('game/getDepositSummaryList', obj).then(res=> {
        let list = res.data.list || []
        that.pageTotal = list.length;
        that.tableData = list
        for(let i = 0;i<list.length;i++) {
          list[i].deposit_str = (list[i].deposit / 100).toFixed(2)
          list[i].free_fee_str = (list[i].free_fee / 100).toFixed(2)
        }
      })
    },
    platformChange(e) {
      this.platformValue = e
      this.init()
    },
    // 获取渠道列表
    getTrenchList() {
      this.$store.dispatch('game/getChannelList').then(res=> {
        let list = res
        list.unshift({
          id: -1,
          name: '全部',
        })
        this.trenchList = list
      })
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/summary-cont.scss";

</style>
