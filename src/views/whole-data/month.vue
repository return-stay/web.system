<template>
  <div class="summary-cont-box">
    <div class="summary-cont-top">
      <span style="width: 353px;">{{ title }}（{{getTimeForam}}）</span>
      <div class="selece-cont"></div>
      <div class="summary-cont-content">
        <date-picker type='month' @change="pickerChange" :pickerOptions="pickerOptions" />
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

    <div class="game-cont">
      <p class="game-cont-title">概要</p>
      <ul class="game-ul">
        <li>
          <p>订单数</p>
          <p class="game-li-num">{{tholeInfo.trade}}</p>
        </li>
        <li>
          <p>新增用户数</p>
          <p class="game-li-num">{{tholeInfo.newUser}}</p>
        </li>
        <li>
          <p>回访用户数</p>
          <p class="game-li-num">{{tholeInfo.backUser}}</p>
        </li>
        <li>
          <p>付费用户数</p>
          <p class="game-li-num">{{tholeInfo.feeUser}}</p>
        </li>
        <li>
          <p>租金流水</p>
          <p class="game-li-num">￥{{tholeInfo.rent}}</p>
        </li>
        <li>
          <p>罚金流水</p>
          <p class="game-li-num">￥{{tholeInfo.depreciation}}</p>
        </li>
        <li>
          <p>会员卡流水</p>
          <p class="game-li-num">￥{{tholeInfo.vipCardFee}}</p>
        </li>
        <li>
          <p>押金流水</p>
          <p class="game-li-num">￥{{tholeInfo.deposit}}</p>
        </li>
      </ul>
    </div>
    <div>
      <el-table
        ref="filterTable"
        size="mini"
        border
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="day"
          label="日期"
          sortable
          :cell-style="{background: '#ccc'}"
          align="center"
          column-key="date"
        >
        </el-table-column>
        <el-table-column
          prop="trade"
          align="center">
          <template slot="header">
            <div class="table-column-header">
              <span>订单数</span>
              <el-tooltip class="item" effect="dark" content="每日支付成功的订单数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="new_user"
          align="center">
          <template slot="header">
            <div class="table-column-header">
              <span>新增用户数</span>
              <el-tooltip class="item" effect="dark" content="每日新增的用户数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="back_user"
          align="center">
          <template slot="header">
            <div class="table-column-header">
              <span>回访用户数</span>
              <el-tooltip class="item" effect="dark" content="每日回访的用户数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="fee_user"
          align="center">
          <template slot="header">
            <div class="table-column-header">
              <span>付费用户数</span>
              <el-tooltip class="item" effect="dark" content="每日订单及会员卡付费用户数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="rent_str"
          align="center">
          <template slot="header">
            <div class="table-column-header">
              <span>租金流水</span>
              <el-tooltip class="item" effect="dark" content="每日收到的租金流水金额，单位人民币元" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="depreciation_str"
          align="center">
          <template slot="header">
            <div class="table-column-header">
              <span>罚金收入</span>
              <el-tooltip class="item" effect="dark" content="每日收到的罚金流水金额，单位人民币元" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="vip_card_fee_str"
          align="center">
          <template slot="header">
            <div class="table-column-header">
              <span>会员卡流水</span>
              <el-tooltip class="item" effect="dark" content="每日收到的会员卡流水金额，单位人民币元" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="deposit_str"
          align="center">
          <template slot="header">
            <div class="table-column-header">
              <span>押金流水</span>
              <el-tooltip class="item" effect="dark" content="每日收到的订单押金金额，单位人民币元" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-block">
        <!-- <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          :layout="pageLayout"
          :total="pageTotal">
        </el-pagination> -->
      </div>
    </div>

  </div>
</template>

<script>
import tableMixins from '@/mixins/tableMixins'
import wholeMixin from './wholeMixin'
import DateUtil from '@/utils/date'
import DatePicker from '@/components/DatePicker'
import moment from 'moment'
export default {
  name: 'WholeData',
  mixins: [ tableMixins, wholeMixin ],
  components: {DatePicker},
  computed: {
    getTimeForam () {
      let time = this.dateShow || moment(new Date()).format("YYYY年MM月")
      return time
    }
  },
  data() {
    return {
      title: '整体数据',
      dateString: '',
      tableData: [], //数据源
      tholeInfo: {},
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '本月',
          onClick(picker) {
            const start = DateUtil.getStartDayOfMonth()
            const end = DateUtil.getNowDay()
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '上月',
          onClick(picker) {
            const start = DateUtil.getStartDayOfLastMonth()
            const end = DateUtil.getEndDayOfLastMonth()
            picker.$emit('pick', [start, end]);
          }
        }]
      },
    }
  },
  mounted() {
    this.getInitTime()
    this.getTrenchList()
  },
  methods: { 
    init() {
      this.getOverallDatalist()

    },
    getOverallDatalist() {
      const obj = {
        s_time: this.s_time, e_time: this.e_time, ch_id: this.platformValue
      }
      const that = this
      this.$store.dispatch('game/getOverallDataList', obj).then(res=> {
        const resdata = res.data
        let list = that.foreachList(resdata.list)
        that.tableData = list
        that.tholeInfo = resdata.info
      })
    },
    foreachList(arr = []) {
      for(let i = 0;i<arr.length;i++) {
        arr[i].deposit_str = Number((arr[i].deposit/100).toFixed(2))
        arr[i].depreciation_str = Number((arr[i].depreciation/100).toFixed(2))
        arr[i].vip_card_fee_str = Number((arr[i].vip_card_fee/100).toFixed(2))
        arr[i].rent_str = Number((arr[i].rent/100).toFixed(2))
      }
      return arr
    },
    // 初始化日期
    getInitTime() {
      let timestamp=new Date()
      let year = timestamp.getFullYear();
      let month = timestamp.getMonth()
      const etimeNumber =this.dateToMs(timestamp)- 24*60*60*1000
      this.e_time = etimeNumber
      let monthStartDate = this.dateToMs(new Date(year, month, 1))
      this.s_time = monthStartDate
      this.dateString = moment(monthStartDate).format('YYYY年MM月DD日') + ' ~ ' +moment(etimeNumber).format('YYYY年MM月DD日');
      this.placeholderValue = [new Date(this.s_time), new Date(this.e_time)]
      this.init()
    },
    // 切换时间
    pickerChange(parmas) {
      let data = []
      if(data.length<2) {
        const year = moment(parmas).format('YYYY')
        const month = moment(parmas).format('MM')
        let monthStartDate = new Date(year, month-1, 1);
        let monthEndDate = this.dateToMs(new Date(year, month, 1)) - 1000 * 60 *60 * 24
        data = [monthStartDate, monthEndDate]
      }else {
        data = parmas
      }
      this.s_time = this.dateToMs(data[0])
      this.e_time = this.dateToMs(data[1])
      const dateShow = moment(data[0]).format('YYYY年MM月DD日') + ' ~ ' +moment(data[1]).format('YYYY年MM月DD日');
      this.dateShow = dateShow
      this.placeholderValue = [new Date(this.s_time), new Date(this.e_time)]
      this.init()
    },
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/summary-cont.scss";

</style>
