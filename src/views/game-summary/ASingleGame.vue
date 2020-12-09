<template>
  <div class="summary-cont-box">
    <div class="summary-cont-top">
      <span>游戏盘</span>
    </div>
    <div class="game-cont-box">
      <div class="game-cont" style="flex: 1;">
        <p class="game-cont-title">概要</p>
        <ul class="game-ul">
          <li>
            <p>成本</p>
            <p class="game-li-num">￥{{cost}}</p>
          </li>
          <li>
            <p>累计租金</p>
            <p class="game-li-num">{{totalRent}}</p>
          </li>
          <li>
            <p>回本率</p>
            <p class="game-li-num">{{backRate}}%</p>
          </li>
          <li>
            <p>累计罚金</p>
            <p class="game-li-num">￥{{totalDepreciation}}</p>
          </li>
          <li>
            <p>租借次数</p>
            <p class="game-li-num">{{rentTimes}}</p>
          </li>
          <li>
            <p>租借用户数</p>
            <p class="game-li-num">{{rentUser}}</p>
          </li>
          <li>
            <p>历史最长租期</p>
            <p class="game-li-num">{{maxLease}}</p>
          </li>
          <li>
            <p>历史最高租金</p>
            <p class="game-li-num">￥{{maxRent}}</p>
          </li>
          <li>
            <p>平均租期</p>
            <p class="game-li-num">{{avgLease}}</p>
          </li>
          <li>
            <p>平均租金</p>
            <p class="game-li-num">￥{{avgRent}}</p>
          </li>
        </ul>
      </div>
    </div>

    <el-table
        ref="filterTable"
        border
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="order_date_str"
          label="下单日期"
          align="center"
          sortable
          :cell-style="{background: '#ccc'}"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="day_rent_str"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>日租金</span>
              <el-tooltip class="item" effect="dark" content="下单时的日租金金额，单位人民币元" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          sortable
          prop="fee_lease">
          <template slot="header">
            <div class="table-column-header">
              <span>计费租期</span>
              <el-tooltip class="item" effect="dark" content="该次租借结算时使用的租期，单位天" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="lease"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>实际租期</span>
              <el-tooltip class="item" effect="dark" content="租借结束时间-开始时间，单位天" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="total_rent_str"
          align="center"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>实收租金</span>
              <el-tooltip class="item" effect="dark" content="日租金 * 计费租期" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="depreciation_fee_str"
          align="center"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>折损金额</span>
              <el-tooltip class="item" effect="dark" content="该次租借结算时确定的折损，单位人民币元" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
import tableMixins from '@/mixins/tableMixins'
import moment from 'moment'
export default {
  name: 'ASingleGame',
  components: {tableMixins},
  data() {
    return {
      platformValue: 0,
      platformArr: [],
      tableData: [],
      cost: 0, //成本
      totalRent: 0, //累计租金
      backRate: '', //回本率
      totalDepreciation: 0, //累计罚金
      rentTimes: 0, //租借次数
      rentUser: 0, //租借用户数
      maxLease: 0, //最长租期
      maxRent: 0, //最高租金
      avgLease: 0, //平均租期
      avgRent: 0, //平均租金
    }
  },
  mounted() {
    this.getGameList()
    this.getTopInfo()
  },
  methods: {
    getTopInfo() {
      const { id } = this.$route.params
      const that = this
      this.$store.dispatch('game/getGameDetailInfo', {
        g_id: id,
      }).then(res=> {
        const resdata = res.data;
        const cost = resdata.cost
        const total_rent = resdata.total_rent
        that.cost = Number((cost/100).toFixed(2))
        that.totalRent = Number((total_rent/100).toFixed(2))
        that.totalDepreciation = Number((resdata.total_depreciation/100).toFixed(2))
        that.backRate = ((resdata.cost_back_rate)).toFixed(2)
        that.rentTimes = resdata.rent_times
        that.rentUser = resdata.rent_user
        that.maxLease = resdata.max_lease
        that.maxRent = Number((resdata.max_rent/100).toFixed(2))
        that.avgLease = resdata.avg_lease
        that.avgRent = Number((resdata.avg_rent/100).toFixed(2))
      })
    },
    getGameList(chid) {
      // const ch_id = chid || this.$route.query.ch_id
      const { id } = this.$route.params
      const that = this
      this.$store.dispatch('game/getGameOrderList', {
        g_id: id,
      }).then(res=> {
        console.log(res)
        if(res.platform) {
            that.platformArr = [{id: 0, name: '全部'}].concat(res.platform.dataList)
          }
        if(res.code ===1) {
          let resdata = res.data || []
          for(let i =0;i<resdata.length;i++) {
            resdata[i].order_date_str = moment(resdata[i].order_date).format("YYYYMMDD")
            resdata[i].day_rent_str = Number((resdata[i].day_rent/100).toFixed(2))
            resdata[i].total_rent_str = Number((resdata[i].total_rent/100).toFixed(2))
            resdata[i].depreciation_fee_str = Number((resdata[i].depreciation_fee/100).toFixed(2))
          }
          that.tableData = res.data
        }
      })
    },
    goNavigation(e) {
      console.log(e)
      this.$router.push('/gameSummary/singleGame/10')
    },
  }
}
</script>

<style scoped lang="scss">
@import "~@/styles/summary-cont.scss";
</style>
