<template>
  <div class="bs-box">
    <div class="bs-top">
      <span>{{ title }} ({{ value2 }})</span>
      <div class="bs-content">
        <i class="el-icon-date" />
        <span>自定义日期范围</span>
        <div class="block">
          <!-- <span class="demonstration">带快捷选项</span> -->
          <!-- <el-date-picker
            v-model="value2"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            :change="pickerChange">
          </el-date-picker> -->

          <el-date-picker
            v-model="value2"
            type="daterange"
            range-separator="至"
            :picker-options="pickerOptions"
            @change="pickerChange"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          
        </div>
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
      <div class="game-cont" style="margin-right: 20px;">
        <p class="game-cont-title">汇总数据</p>
        <ul class="game-ul">
          <li>
            <p>租金收入</p>
            <p class="game-li-num">￥{{allRentIncome}}</p>
          </li>
          <li>
            <p>罚金收入</p>
            <p class="game-li-num">￥{{allNotRentIncome}}</p>
          </li>
          <li>
            <p>会员卡收入</p>
            <p class="game-li-num">￥{{allVipCardincome}}</p>
          </li>
          <li>
            <p>订单押金</p>
            <p class="game-li-num">￥{{allDayDeposit}}</p>
          </li>
        </ul>
      </div>
      <div class="game-cont">
        <p class="game-cont-title">当日实时数据</p>
        <ul class="game-ul">
          <li>
            <p>租金收入</p>
            <p class="game-li-num">￥{{dayInfo.rentIncomeStr}}</p>
          </li>
          <li>
            <p>罚金收入</p>
            <p class="game-li-num">￥{{dayInfo.notRentIncomeStr}}</p>
          </li>
          <li>
            <p>会员卡收入</p>
            <p class="game-li-num">￥{{dayInfo.vipCardIncomeStr}}</p>
          </li>
          <li>
            <p>订单押金</p>
            <p class="game-li-num">￥{{dayInfo.dayDepositStr}}</p>
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
          column-key="day"
        >
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="rentIncomeStr">
          <template slot="header">
            <div class="table-column-header">
              <span>租金收入</span>
              <el-tooltip class="item" effect="dark" content="租金收入，当日产生的租金收入总金额，单位人民币" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="notRentIncomeStr">
          <template slot="header">
            <div class="table-column-header">
              <span>罚金收入</span>
              <el-tooltip class="item" effect="dark" content="罚金收入，当日产生的折损总金额，单位人民币" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="vipCardIncomeStr"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>会员卡收入</span>
              <el-tooltip class="item" effect="dark" content="会员卡收入，当日产生的会员卡收入总金额，单位人民币" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="dayDepositStr"
          sortable
          align="center">
          <template slot="header">
            <div class="table-column-header">
              <span>订单押金</span>
              <el-tooltip class="item" effect="dark" content="订单押金，当日产生的的押金总金额，单位人民币" placement="bottom-end">
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
import moment from 'moment'
export default {
  name: 'IncomeSummary',
  mixins: [tableMixins],
  data() {
    return {
      dayInfo: {},
      allDayDeposit: 0,
      allVipCardincome: 0,
      allRentIncome: 0,
      allNotRentIncome: 0,
      title: '收入汇总',
      s_time: 0, 
      e_time: 0,
      incomeList: [],
      platformValue: -1,
      trenchList: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
        {
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
      value2: '',
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
      this.init()
    },
    init() {
      this.getList()
      this.getTodayInfo()
    },
    pickerChange(data) {
      this.s_time = this.dateToMs(data[0])
      this.e_time = this.dateToMs(data[1])
      this.value2 = moment(data[0]).format('YYYY年MM月DD日') + ' ~ ' +moment(data[1]).format('YYYY年MM月DD日');
      this.getList()
    },
    dateToMs (date) {
      let result = new Date(date).getTime();
      return result;
    },
    getTodayInfo() {
      const that = this
      const obj = {
        ch_id: this.platformValue
      }
      this.$store.dispatch('game/getTodayInfo', obj).then(res=> {
        that.setDayInfo(res.data)
      })
    },
    getList() {
      const obj = {
        s_time: this.s_time, e_time: this.e_time, page: -1, ch_id: this.platformValue
      }
      const that = this
      this.$store.dispatch('game/getIncomeSummaryList', obj).then(res=> {
        console.log(res)
        let list = res.data.list
        that.pageTotal = res.data.count

        let allDayDeposit = 0, allVipCardincome = 0, allRentIncome = 0, allNotRentIncome = 0;
        for(let i = 0;i<list.length;i++) {
          list[i].dayDepositStr = Number((list[i].deposit_income/100).toFixed(2))
          list[i].vipCardIncomeStr = Number((list[i].vip_income/100).toFixed(2))
          list[i].rentIncomeStr = Number((list[i].rent_income/100).toFixed(2))
          list[i].notRentIncomeStr = Number((list[i].depreciation/100).toFixed(2))

          allDayDeposit += list[i].deposit_income
          allVipCardincome += list[i].vip_income
          allRentIncome += list[i].rent_income
          allNotRentIncome +=list[i].depreciation
        }
        that.tableData = list
        that.allDayDeposit = Number((allDayDeposit/100).toFixed(2))
        that.allVipCardincome = Number((allVipCardincome/100).toFixed(2))
        that.allRentIncome = Number((allRentIncome/100).toFixed(2))
        that.allNotRentIncome = Number((allNotRentIncome/100).toFixed(2))
      })
    },
    setDayInfo(obj) {
      obj.dayDepositStr = (obj.deposit_income/100).toFixed(2)
      obj.vipCardIncomeStr = (obj.vip_income/100).toFixed(2)
      obj.rentIncomeStr = (obj.rent_income/100).toFixed(2)
      obj.notRentIncomeStr = (obj.depreciation/100).toFixed(2)
      this.dayInfo = obj
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

<style lang="scss" scoped>
.bs-box {
  margin: 16px;
  position: relative;
  .bs-top {
    height: 50px;
    display: flex;
    align-items: center;
    .bs-content {
      position: relative;
      margin-left: 100px;
      font-size: 14px;
      cursor: pointer;
      .block {
        width: 100%;
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
      }
    }
  }
  .game-cont-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .game-cont {
    flex: 1;
    color: #2C2C2C;
    background-color: #fff;
    border-radius: 8px;
    box-shadow:0px 2px 8px 0px rgba(0,0,0,0.5);
    padding: 16px 16px 32px;
    margin-bottom: 20px;
    .game-cont-title {
      font-weight: 600;
      font-size: 14px;
      margin-bottom: 14px;
    }
    .game-ul {
      font-size: 14px;
      display: flex;
      // justify-content: space-between;
      > li {
        margin-right: 50px;
      }

      .game-li-num {
        font-size: 18px;
        margin-top: 4px;
      }
    }
  }
  .table-column-header {
    display: inline-block;
    .el-icon-info {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 20px;
    }
  }
}

</style>
