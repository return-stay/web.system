<template>
    <div class="td-box summary-cont-box">
        <!-- <header class="td-header">{{ title }}</header> -->
      <div class="summary-cont-top">
        <span>{{ title }} ({{ value2 }})</span>
        <div class="selece-cont"></div>
        <div class="summary-cont-content">
          <date-picker @change="pickerChange" :pickerOptions="pickerOptions" />
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

      <div class="td-card">
        <div class="chart-box">
          <div v-if="listUser.length>0"><line-chart domid="user-line" :lineData="listUser" lineColor="#347ccd" /></div>
          <div class="chart-title">
            <div class="chart-img">
              <img src="../../assets/home/yonghu.png" alt="">
            </div>
            <div class="chart-num">{{totalUser}}</div>
            <div class="chart-text">用户数</div>
          </div>
        </div>
        <div class="chart-box">
          <div v-if="listIncomeLine.length>0"><line-chart domid="money-line" :lineData="listIncomeLine" lineColor="#d2319e" /></div>
          <div class="chart-title">
            <div class="chart-img" style="background-color: #e9f6ee;">
              <img src="../../assets/home/qianqian.png" alt="">
            </div>
            <div class="chart-num">{{totalIncome}}元</div>
            <div class="chart-text">收入金额</div>
          </div>
        </div>
        <div class="chart-box">
          <div v-if="listTrade.length>0"><line-chart domid="order-line" :lineData="listTrade" lineColor="#347ccd" /></div>
          <div class="chart-title">
            <div class="chart-img" style="background-color: #f9ebea;">
              <img src="../../assets/home/gouwuche.png" alt="">
            </div>
            <div class="chart-num">{{totalTrade}}</div>
            <div class="chart-text">订单数</div>
          </div>
        </div>
        <div class="chart-box">
          <div v-if="listDisc.length>0"><line-chart domid="disc-line" :lineData="listDisc" lineColor="#d2319e" /></div>
          <div class="chart-title">
            <div class="chart-img" style="background-color: #d8d8d8;">
              <img src="../../assets/home/zhuanjiguangpan.png" alt="">
            </div>
            <div class="chart-num">{{totalDisc}}</div>
            <div class="chart-text">游戏盘数</div>
          </div>
        </div>
      </div>

      <div class="td-cont">
        <div class="chart-left">
          <bar-label-rotation v-if="listIncome.length>0" :listData="listIncome" />
        </div>
        <!-- <div class="chart-box"></div> -->
      </div>
      <div class="td-cont">
        <div class="chart-left" style="margin-bottom: 20px;">
          <double-line-label v-if="listRent.length>0" :listData="listRent" />
        </div>
        <div class="chart-box">
          <bar-label-two v-if="listDeposit.length>0" domid="min-bar-chart" :listData="listDeposit" />
        </div>
      </div>
    </div>
</template>

<script>
import BarLabelRotation from './bar-label-rotation'
import DoubleLineLabel from './double-line-label'
import BarLabelTwo from './bar-label-two'
import LineChart from './line-chart'
import DatePicker from '@/components/DatePicker'
import moment from 'moment'
export default {
    name: "tabulateData",
    components: { BarLabelRotation, DoubleLineLabel, BarLabelTwo, LineChart, DatePicker},
    data() {
      return {
        title: "近90天数据",
        value2: '', //显示 YYYY年MM月DD日 ~ YYYY年MM月DD日
        platformValue: -1,
        placeholderValue: [], //时间选择器的默认值
        trenchList: [],
        listUser: [],
        totalUser: 0, //总用户
        listRent: [], //租金收入
        listIncome: [], //收入数据 柱图
        listDeposit: [], //冻结，可提现 集合
        listTotal:[], //
        listIncomeLine: [], //收入折线图
        totalIncome: 0,
        listTrade: [], //订单， 交易
        totalTrade: 0,
        listDisc: [], //游戏盘折线图
        totalDisc: 0,
        pickerOptions: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '昨天',
            onClick(picker) {
              const timestamp = new Date();
              const date = timestamp
              const dataArr = []
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              
              dataArr.push(date)
              const eDate = timestamp
              eDate.setTime(eDate.getTime())
              dataArr.push(eDate)
              picker.$emit('pick', dataArr);
            }
          }, {
            text: '前7天',
            onClick(picker) {
              const timestamp = new Date();
              const date = timestamp
              const dataArr = []
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              
              dataArr.push(date)
              const eDate = timestamp
              eDate.setTime(eDate.getTime())
              dataArr.push(eDate)
              picker.$emit('pick', dataArr);
            }
          }, {
            text: '前30天',
            onClick(picker) {
              const timestamp = new Date();
              const date = timestamp
              const dataArr = []
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
              
              dataArr.push(date)
              const eDate = timestamp
              eDate.setTime(eDate.getTime())
              dataArr.push(eDate)
              picker.$emit('pick', dataArr);
            }
          }]
        },
      };
    },
    mounted() {
      this.getInitTime()
      this.getTrenchList()
    },
    methods: {
      init() {
        this.getData()
      },
      platformChange(e) {
        this.platformValue = e
      },
      getData() {
        const that = this
        const s_time = this.s_time
        const e_time = this.e_time

        this.$store.dispatch('game/getHomeData', {
          s_time,e_time,ch_id: 0,
        }).then(res=> {
          const resdata = res.data
          
          that.listTotal = resdata.list_total
          that.listRent = resdata.list_rent
          that.listIncome = resdata.list_income
          that.listDeposit = resdata.list_deposit
          that.foreachList(resdata.list_total)
        })
      },
      foreachList (arr) {
        let listUser = [], listIncomeLine = [], listTrade = [], listDisc = [], totalUser = 0,
          totalIncome = 0, totalTrade = 0, totalDisc = 0
        for(let i = 0;i < arr.length; i++) {
          listUser.push({day: arr[i].day, value: arr[i].user})
          totalUser += arr[i].user
          listIncomeLine.push({day: arr[i].day, value: Number((arr[i].income/100))})
          totalIncome += arr[i].income
          listTrade.push({day: arr[i].day, value: arr[i].trade})
          totalTrade += arr[i].trade
          listDisc.push({day: arr[i].day, value: arr[i].disc})
          totalDisc += arr[i].disc
        }
        const afterList = arr[arr.length-1]
        this.listUser = listUser
        this.totalUser = afterList.user
        this.listIncomeLine = listIncomeLine
        this.totalIncome = Number(afterList.income/100)
        this.listTrade = listTrade
        this.totalTrade = afterList.trade
        this.listDisc = listDisc
        this.totalDisc = afterList.disc
      },
      dateToMs (date) {
        let result = new Date(date).getTime();
        return result;
      },
      pickerChange(data) {
        this.s_time = this.dateToMs(data[0])
        this.e_time = this.dateToMs(data[1])
        this.value2 = moment(data[0]).format('YYYY年MM月DD日') + ' ~ ' +moment(data[1]).format('YYYY年MM月DD日');
        this.placeholderValue = [new Date(this.s_time), new Date(this.e_time)]
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
      },
      getInitTime() {
        let timestamp=new Date()
        const etimeNumber =this.dateToMs(timestamp)- 24*60*60*1000
        this.e_time = etimeNumber
        let valuee = timestamp - 90 * 24 * 60*60*1000
        this.s_time = valuee
        this.value2 = moment(valuee).format('YYYY年MM月DD日') + ' ~ ' +moment(etimeNumber).format('YYYY年MM月DD日');
        this.placeholderValue = [new Date(this.s_time), new Date(this.e_time)]
        this.init()
      },
    }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/summary-cont.scss";
@import './index.scss';

</style>
