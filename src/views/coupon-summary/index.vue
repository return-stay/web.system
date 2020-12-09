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
      <div class="game-cont" style="flex: 1;">
        <p class="game-cont-title">汇总</p>

        <ul class="game-ul">
          <li>
            <p>使用免邮次数</p>
            <p class="game-li-num">{{deliveryCoupon}}</p>
          </li>
          <li>
            <p>优惠金额</p>
            <p class="game-li-num">{{freeCost}}</p>
          </li>
          <li>
            <p>订单付费用户数</p>
            <p class="game-li-num">{{tradeUser}}</p>
          </li>
          <li>
            <p>使用免邮用户数</p>
            <p class="game-li-num">{{deliveryCouponUser}}</p>
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
          align="center"
          sortable
          prop="delivery_coupon">
          <template slot="header">
            <div class="table-column-header">
              <span>使用免邮次数</span>
              <el-tooltip class="item" effect="dark" content="每日使用的免邮总次数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="free_cost"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>优惠金额</span>
              <el-tooltip class="item" effect="dark" content="每日使用的优惠总金额" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
          <template slot-scope="{row}">
            <div>
              <span>{{row.free_cost_str}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="trade_user"
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
          prop="delivery_coupon_user"
          align="center"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>使用免邮用户数</span>
              <el-tooltip class="item" effect="dark" content="每日使用免邮的用户数" placement="bottom-end">
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
  name: 'CouponSummary',
  mixins: [tableMixins],
  components: {DatePicker},
  data() {
    return {
      title: '优惠券汇总',
      s_time: 0, 
      e_time: 0,
      deliveryCoupon: 0, //使用免邮次数
      freeCost: 0, //优惠金额
      deliveryCouponUser: 0, //订单付费用户数
      tradeUser: 0, //使用免邮用户数
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
    multiply (num1, num2) {
      num1 = num1.split('')
      num2 = num2.split('')
      while (num1[0] === '0') num1.shift()
      if (num1.length === 0) return '0'
      while (num2[0] === '0') num2.shift()
      if (num2.length === 0) return '0'
      //下面从最高位开始针对每两位进行乘法，先不进位
      let str = []
      const l1 = num1.length;
      const l2 = num2.length;
      for (let i = 0; i < l1; i++)
          for (let j = 0; j < l2; j++) 
              str[i + j] ? str[i + j] += num1[i] * num2[j] : str[i + j] = num1[i] * num2[j]
      //从后向前依次进位，超过十位的向前一位丢，只保留除首位外每位都是各位
      //c可以是十位数以上，可以向上传递
      //最高位可以是任意位数字，形成字符串之后看不出差异
      for (let k = str.length - 1; k > 0; k--) {
          let c = (str[k] / 10) | 0
          str[k] = str[k] % 10
          str[k - 1] += c
      }
      return str.join('')
    },
    getInfo () {
      let timestamp=new Date().getTime()
      const obj = {
        s_time: this.s_time, e_time: this.e_time, ch_id: this.platformValue
      }
      const that = this
      this.$store.dispatch('game/getComboSummaryInfo', obj).then(res=> {
        const info = res.data
        this.deliveryCoupon = info.delivery_coupon
        this.freeCost = info.free_cost
        this.deliveryCouponUser = info.delivery_coupon_user
        this.tradeUser = info.trade_user
      })
    },
    getList() {
      let timestamp=new Date().getTime()
      const obj = {
        s_time: this.s_time, e_time: this.e_time, ch_id: this.platformValue
      }
      const that = this
      this.$store.dispatch('game/getComboSummaryList', obj).then(res=> {
        let list = res.data.list || []
        that.pageTotal = list.length;
        that.tableData = list
        for(let i = 0;i<list.length;i++) {
          list[i].free_cost_str = list[i].free_cost? (list[i].free_cost / 100).toFixed(2):0
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

<style scoped lang="scss">
@import "~@/styles/summary-cont.scss";

</style>
