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
            <p>新增会员卡数</p>
            <p class="game-li-num">{{newVipCard}}</p>
          </li>
          <li>
            <p>新增会员卡用户数</p>
            <p class="game-li-num">{{newVipUser}}</p>
          </li>
          <li>
            <p>过期会员卡用户数</p>
            <p class="game-li-num">{{expiredVipUser}}</p>
          </li>
          <!-- <li>
            <p>人均开卡数</p>
            <p class="game-li-num">{{avgVipCard}}</p>
          </li> -->
          <li>
            <p>人均付费金额</p>
            <p class="game-li-num">{{avgVipCardFee}}</p>
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
          prop="new_vip_card">
          <template slot="header">
            <div class="table-column-header">
              <span>新增会员卡数</span>
              <el-tooltip class="item" effect="dark" content="每日新开会员卡数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="new_vip_user"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>新增会员卡用户数</span>
              <el-tooltip class="item" effect="dark" content="每日新增的首次开通会员卡用户数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column
          align="center"
          prop="fee_user"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>有效会员卡用户数</span>
              <el-tooltip class="item" effect="dark" content="每日累计有效会员卡用户数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="expired_vip_user"
          align="center"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>过期会员卡用户数</span>
              <el-tooltip class="item" effect="dark" content="每日过期的会员卡用户总数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <!-- <el-table-column
          prop="avg_vip_card"
          align="center"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>人均开卡数</span>
              <el-tooltip class="item" effect="dark" content="每日平均会员卡用户的会员卡数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="avg_vip_card_fee"
          align="center"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>人均付费金额</span>
              <el-tooltip class="item" effect="dark" content="每日平均会员卡用户的付费金额，单位人民币元" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
          <template slot-scope="{row}">
            <div>
              <span>{{row.avg_vip_card_fee_str}}</span>
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
  name: 'VipSummary',
  mixins: [tableMixins],
  components: {DatePicker},
  data() {
    return {
      title: '会员卡汇总',
      s_time: 0, 
      e_time: 0,
      newVipCard: 0, //累计用户数
      newVipUser: 0, //付费用户数
      expiredVipUser: 0, //订单付费转化率
      avgVipCard: 0, //人均开卡
      avgVipCardFee: 0, //付费用户金额
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
      this.$store.dispatch('game/getVipSummaryInfo', obj).then(res=> {
        const info = res
        if(res.code === 1) {
          const resdata = res.data
          that.newVipCard = resdata.new_vip_card
          that.newVipUser = resdata.new_vip_user
          that.expiredVipUser = resdata.expired_vip_user
          // that.avgVipCard = resdata.avg_vip_card
          that.avgVipCardFee = Number((resdata.avg_vip_card_fee/100).toFixed(2))
        }
        
      })
    },
    getList() {
      let timestamp=new Date().getTime()
      const obj = {
        s_time: this.s_time, e_time: this.e_time, ch_id: this.platformValue
      }
      const that = this
      this.$store.dispatch('game/getVipSummaryList', obj).then(res=> {
        console.log(res)
        let list = res.data.list || []
        that.pageTotal = list.length;
        that.tableData = list
        for(let i = 0;i<list.length;i++) {
          list[i].avg_vip_card_fee_str = (list[i].avg_vip_card_fee/100).toFixed(2)
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
