<template>
  <div class="bs-box">
    <div class="bs-top">
      <span>{{ title }} ({{ value2 }})</span>

      <div class="selece-cont"></div>
      <div class="bs-content">
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

    <div class="game-cont-box">
      <div class="game-cont" style="margin-right: 20px;">
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
      </div>
      <div class="game-cont" style="flex: 1;">
        <p class="game-cont-title">汇总</p>

        <ul class="game-ul">
          <li>
            <p>累计用户数</p>
            <p class="game-li-num">{{allUser}}</p>
          </li>
          <li>
            <p>订单付费用户总数</p>
            <p class="game-li-num">{{feeUser}}</p>
          </li>
          <li>
            <p>会员卡付费用户总数</p>
            <p class="game-li-num">{{feeVipUser}}</p>
          </li>
          <li>
            <p>订单付费转化率</p>
            <p class="game-li-num">{{feeUserRate}}</p>
          </li>
          <li>
            <p>会员卡付费转化率</p>
            <p class="game-li-num">{{feeVipUserRate}}</p>
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
          prop="new_user">
          <template slot="header">
            <div class="table-column-header">
              <span>新增用户数</span>
              <el-tooltip class="item" effect="dark" content="新增用户数，指新授权小程序的微信用户数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="old_user"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>回访用户数</span>
              <el-tooltip class="item" effect="dark" content="回访用户数，指非新增的小程序用户数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>

        <el-table-column
          align="center"
          prop="fee_user"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>订单付费用户总数</span>
              <el-tooltip class="item" effect="dark" content="订单付费用户，指曾经通过订单付款的用户数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="fee_vip_user"
          align="center"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>会员卡付费用户总数</span>
              <el-tooltip class="item" effect="dark" content="会员卡付费用户数，现指当前有效期内的年卡用户数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="new_user_fee_rate"
          align="center"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>订单付费转化率</span>
              <el-tooltip class="item" effect="dark" content="订单付费转化率，新增用户进行订单付费的转化率" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
          <template slot-scope="{row}">
            <div>
              <span>{{row.regUserFeeRateStr}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="new_user_fee_vip_rate"
          align="center"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>会员卡付费转化率</span>
              <el-tooltip class="item" effect="dark" content="会员卡付费转化率，新增用户进行会员卡付费的转化率" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
          <template slot-scope="{row}">
            <div>
              <span>{{row.regUserFeeVipRateStr}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="fee_new_user"
          align="center"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>转化订单用户数</span>
              <el-tooltip class="item" effect="dark" content="当日新增用户在90天内的订单付费用户数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="fee_vip_new_user"
          align="center"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>转化会员卡用户数</span>
              <el-tooltip class="item" effect="dark" content="当日新增用户在90天内的会员卡付费用户数" placement="bottom-end">
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
  name: 'UserSummary',
  mixins: [tableMixins],
  components: {DatePicker},
  data() {
    return {
      title: '用户汇总',
      s_time: 0, 
      e_time: 0,
      allUser: 0, //累计用户数
      newUser: 0, //累计新用户数
      oldUser: 0, //回访用户数
      feeUser: 0, //付费用户数
      feeVipUser: 0, //付费vip用户数
      feeUserRate: 0, //订单付费转化率
      feeVipUserRate: 0, //付费vip转化率
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
      this.init()
    },
    pickerChange(data) {
      this.s_time = this.dateToMs(data[0])
      this.e_time = this.dateToMs(data[1])
      this.value2 = moment(data[0]).format('YYYY年MM月DD日') + ' ~ ' +moment(data[1]).format('YYYY年MM月DD日');
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
      this.$store.dispatch('game/getSummaryInfo', obj).then(res=> {
        console.log(res)
        if(res.code === 1) {
          const info = res.data
          this.allUser = info.total_user
          this.newUser = info.new_user
          this.oldUser = info.old_user
          this.feeUser = info.fee_user
          this.feeVipUser = info.fee_vip_user
          this.feeUserRate = (info.fee_rate * 100).toFixed(2) + '%'
          this.feeVipUserRate = (info.fee_vip_rate * 100).toFixed(2) + '%'
        }
      })
    },
    getList() {
      let timestamp=new Date().getTime()
      const obj = {
        s_time: this.s_time, e_time: this.e_time, ch_id: this.platformValue
      }
      const that = this
      this.$store.dispatch('game/getUserSummaryList', obj).then(res=> {

        if(res.code === 1 && res.data) {
          let list = res.data || []
          that.pageTotal = list.length;
          that.tableData = list
          for(let i = 0;i<list.length;i++) {
            list[i].regUserFeeRateStr = (list[i].new_user_fee_rate * 100).toFixed(2) + '%'
            list[i].regUserFeeVipRateStr = (list[i].new_user_fee_vip_rate * 100).toFixed(2) + '%'
          }
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
  }
   .game-cont {
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
      right: 10px;
    }
  }
}

</style>
