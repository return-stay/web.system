<template>
  <div class="bs-box">
    <div class="bs-top">
      <div class="bs-top">
        <span>{{ title }}</span>
        <div style="margin-left: 100px;">
          <el-select style="width: 120px;" v-model="platformValue" @change="platformChange" placeholder="请选择平台">
            <el-option
              v-for="item in platformArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>

          <el-select style="width: 120px;" v-model="languageValue" @change="languageChange" placeholder="请选择语言">
            <el-option
              v-for="item in languageArr"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
      
      <div class="bs-content">
        <!-- <div class="bs-cont-item">
          <svg-icon icon-class="platform" />
          筛选平台
        </div>
        <div class="bs-cont-item">
          <svg-icon icon-class="languageword" />
          筛选语言
        </div> -->
      </div>
    </div>

    <div class="game-cont">

      <p class="game-cont-title">概要</p>

      <ul class="game-ul">
        <li>
          <p>游戏盘数</p>
          <p class="game-li-num">{{pageTotal}}</p>
        </li>
        <li>
          <p>累计租金</p>
          <p class="game-li-num">￥{{accRent}}</p>
        </li>
        <li>
          <p>罚金收入</p>
          <p class="game-li-num">￥{{accDepreciationFee}}</p>
        </li>
        <li>
          <p>成本</p>
          <p class="game-li-num">￥{{accCost}}</p>
        </li>
        <li>
          <p>租借用户数</p>
          <p class="game-li-num">{{accUserCount}}</p>
        </li>
        <li>
          <p>租借次数</p>
          <p class="game-li-num">{{accOrderCount}}</p>
        </li>
        <li>
          <p>平均租金</p>
          <p class="game-li-num">￥{{meanRent}}</p>
        </li>
        <li>
          <p>回本率</p>
          <p class="game-li-num">{{totalFeeRateStr}}</p>
        </li>
      </ul>
    </div>

    <div>
      <el-table
        v-loading="loading"
        @sort-change="sortTableChange"
        ref="filterTable"
        border
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          align="center"
          prop="disc_serial">
          <template slot="header">
            <div class="table-column-header">
              <span>游戏盘编号</span>
              <i class="el-icon-info"></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          width="300"
          label="游戏名称">
          <template slot-scope="{row}">
            <div style="text-align: left;cursor: pointer;" @click="goGameInfo(row)">
              <span>{{row.platform}}</span>
              <span>{{row.game_name}}</span>
              <span>{{row.area}}</span>
              <span>{{row.language_name}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="cost_str"
          align="center"
          sortable="custom"
          >
          <template slot="header">
            <div class="table-column-header">
              <span>成本</span>
              <el-tooltip class="item" effect="dark" content="成本，指定游戏盘的采购成本金额，单位人民币" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="day_rent_str"
          align="center"
          sortable="custom">
          <template slot="header">
            <div class="table-column-header">
              <span>日租金</span>
              <el-tooltip class="item" effect="dark" content="日租，指定游戏盘的单日租金金额，单位人民币" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="order_user_count"
          align="center"
          sortable="custom">
          <template slot="header">
            <div class="table-column-header">
              <span>下单用户数</span>
              <el-tooltip class="item" effect="dark" content="下单用户数，指定游戏盘的成功租借用户数量" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="order_count"
          align="center"
          sortable="custom">
          <template slot="header">
            <div class="table-column-header">
              <span>下单次数</span>
              <el-tooltip class="item" effect="dark" content="下单次数，指定游戏盘的成功租借次数，同对应订单号数量" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="total_rent_str"
          align="center"
          sortable="custom">
          <template slot="header">
            <div class="table-column-header">
              <span>累计租金</span>
              <el-tooltip class="item" effect="dark" content="累计租金，指定游戏盘累计的租金总金额，单位人民币" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="depreciation_fee_str"
          align="center"
          sortable="custom">
          <template slot="header">
            <div class="table-column-header">
              <span>罚金收入</span>
              <el-tooltip class="item" effect="dark" content="罚金收入，指定游戏盘累计的折损总金额，单位人民币" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="total_fee_rate"
          align="center"
          sortable="custom">
          <template slot="header">
            <div class="table-column-header">
              <span>回本率</span>
              <el-tooltip class="item" effect="dark" content="回本率，累计租金除以成本" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
          <template slot-scope="{row}">
            <div>
              <span>{{row.total_fee_rate_str}}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination-block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          :layout="pageLayout"
          :total="pageTotal">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
import tableMixins from '@/mixins/tableMixins'
import moment from 'moment'
export default {
  name: 'GameSummary',
  mixins: [tableMixins],
  data() {
    return {
      title: '游戏盘汇总',
      languageChainList: [], //  全部中文版
      languageValue: null, //选中的语言
      languageArr: [
        {id: 0, name: '全部'},{id: 1, name: '中文'}, {id: 2, name: '非中文'}
      ],// 筛选语言 
      platformValue: null, //选中的平台
      platformArr: [], //筛选平台
      accRent: 0, //累计租金
      meanRent: '0', //平均租金
      accCost: 0, //累计成本
      accDepreciationFee: 0, //罚金收入
      accUserCountShow: 0, //下单用户数记录显示
      accUserCount: 0, //下单用户数
      accOrderCount: 0, //下单个数
      maxLease: 0, //最长租期
      meanLease: '0', //平均租期
      accTotalFee: 0, //回本金额
      totalFeeRateStr: '', //回本率
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      value2: '',
    }
  },
  mounted() {
    this.getList()
    this.getInfo()
    this.sortObjArr()
  },
  methods: {
    getInfo() {
      // this.$store.dispatch('game/').then(res=> {
      //   console.log(res)
      //   const resdata = res.data
      //   this.accUserCountShow = resdata.rent_user
      //   this.accUserCount = resdata.rent_user
      // })
    },
    getList() {
      // const that = this
      // that.loading = true
      // this.$store.dispatch('game/').then(res=> {
      //   if(res.code === 1) { }
      // })
    },
    setListData() {
      let list = this.screenData
      let accRent = 0, accDepreciationFee = 0, accCost = 0, accUserCount = 0,accOrderCount = 0, maxLease = 0,meanLease = '0',accTotalFee = 0,allLease = 0
      for(let i = 0;i<list.length;i++) {
        list[i].day_rent_str = Number((list[i].day_rent / 100).toFixed(2))
        list[i].cost_str = Number((list[i].cost / 100).toFixed(2))
        list[i].total_fee_str = Number((list[i].total_fee/100).toFixed(2))
        list[i].depreciation_fee_str = Number((list[i].depreciation_fee/100).toFixed(2))
        list[i].total_rent_str = Number((list[i].total_rent/100).toFixed(2))
        if(list[i].cost) {
          list[i].total_fee_rate = Number((list[i].total_rent/list[i].cost*100))
          list[i].total_fee_rate_str = Number((list[i].total_rent/list[i].cost*100).toFixed(2)) + '%'
        }else {
          list[i].total_fee_rate = 0
          list[i].total_fee_rate_str = Number((0).toFixed(2)) + '%'
        }

        accRent += list[i].total_rent
        accDepreciationFee += list[i].depreciation_fee
        accCost += list[i].cost
        // accUserCount += list[i].order_user_count
        accOrderCount += list[i].order_count
        if(maxLease < list[i].lease) {
          maxLease = list[i].lease
        }
        allLease += list[i].lease
        accTotalFee += list[i].total_fee
      }

      if(accCost) {
        this.totalFeeRateStr = (accRent/accCost*100).toFixed(2) + '%'
      }else [
        this.totalFeeRateStr = (0).toFixed(2) + '%'
      ]

      this.accRent = Number((accRent / 100).toFixed(2))
      this.accDepreciationFee = Number((accDepreciationFee / 100).toFixed(2))
      this.accCost = Number((accCost / 100).toFixed(2))
      // this.accUserCount = accUserCount
      this.accOrderCount = accOrderCount
      this.maxLease = maxLease
      this.meanLease = (allLease / list.length).toFixed(2)
      if(accOrderCount) {
        this.meanRent = (accRent / accOrderCount / 100).toFixed(2)
      }else {
        this.meanRent = (0 / 100).toFixed(2)
      }
      this.accTotalFee = (accTotalFee / 100).toFixed(2)
    },
    // 筛选数据
    screenDataFunc() {
      const that = this
      let allData = this.allData
      let arr = []
      const platformValue = this.platformValue ? this.platformValue : 0
      const languageValue = this.languageValue ? this.languageValue : 0
      if(platformValue ===0 && languageValue === 0) {
        arr = allData
        this.accUserCount = this.accUserCountShow
      }else {
        for(let i = 0;i<allData.length;i++) {
          if(platformValue !==0 && languageValue!==0) {
            if(languageValue === 1) {
              if(allData[i].platform_id === platformValue && this.isChainese(allData[i].language_name)) {
                arr.push(allData[i])
              }
            }else {
              if(allData[i].platform_id === platformValue && !this.isChainese(allData[i].language_name)) {
                arr.push(allData[i])
              }
            }
          }
          if(platformValue === 0 && languageValue!==0) {
            if(languageValue === 1) {
              if(this.isChainese(allData[i].language_name)) {
                arr.push(allData[i])
              }
            }else {
              if(!this.isChainese(allData[i].language_name)) {
                  arr.push(allData[i])
                }
              }
          }
          if(platformValue !==0 && languageValue === 0) {
            if(allData[i].platform_id === platformValue) {
              arr.push(allData[i])
            }
          }
        }
        this.accUserCount = '--'
      }
      this.screenData = arr
      this.pageTotal = arr.length;
      this.tableData = arr.slice(0, that.pageSize)
      this.setListData()
      this.handPagination()
    },
    // 判断是不是中文
    isChainese(name) {
      const languageChainList = this.languageChainList
      for(let i =0;i<languageChainList.length;i++) {
        if(name === languageChainList[i].name) {
          return true
        }
      }
      return false
    },
    // 选择平台
    platformChange(e) {
      this.platformValue = e
      this.currentPage = 1
      this.screenDataFunc()
    },
    // 选择语言
    languageChange(e) {
      this.languageValue = e
      this.currentPage = 1
      this.screenDataFunc()
    },
    // 跳往单个游戏
    goGameInfo(e) {
      console.log(e)
      this.$router.push('/gameSummary/aSingleGame/10')
    },
  }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";

</style>
