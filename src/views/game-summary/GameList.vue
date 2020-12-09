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
          <p class="game-li-num">{{totalDiscNum}}</p>
        </li>
        <li>
          <p>总成本</p>
          <p class="game-li-num">￥{{totalCost}}</p>
        </li>
        <li>
          <p>累计租金</p>
          <p class="game-li-num">￥{{totalRent}}</p>
        </li>
        <li>
          <p>回本率</p>
          <p class="game-li-num">{{backRate}}%</p>
        </li>
        <li>
          <p>浏览次数</p>
          <p class="game-li-num">{{totalVisitCount}}</p>
        </li>
        <li>
          <p>访问用户数</p>
          <p class="game-li-num">{{totalVisitUser}}</p>
        </li>
        <li>
          <p>租借次数</p>
          <p class="game-li-num">{{totalRentCount}}</p>
        </li>
        <li>
          <p>租借用户数</p>
          <p class="game-li-num">{{totalRentUser}}</p>
        </li>
        <li>
          <p>收藏用户数</p>
          <p class="game-li-num">{{totalFavoriteUser}}</p>
        </li>
        <li>
          <p>预定用户数</p>
          <p class="game-li-num">{{totalBookUser}}</p>
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
          width="300"
          label="游戏版本说明">
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
          prop="disc_num"
          align="center"
          sortable="custom"
          >
          <template slot="header">
            <div class="table-column-header">
              <span>游戏盘数</span>
              <el-tooltip class="item" effect="dark" content="每款游戏的游戏盘总数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
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
              <el-tooltip class="item" effect="dark" content="每款游戏的采购成本总金额，单位人民币元" placement="bottom-end">
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
              <span>租金收入</span>
              <el-tooltip class="item" effect="dark" content="每款游戏的租金收入金额，单位人民币元" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="visit_count"
          align="center"
          sortable="custom">
          <template slot="header">
            <div class="table-column-header">
              <span>浏览次数</span>
              <el-tooltip class="item" effect="dark" content="每款游戏的游戏详情页被浏览的总次数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="visit_user"
          align="center"
          sortable="custom">
          <template slot="header">
            <div class="table-column-header">
              <span>访问用户数</span>
              <el-tooltip class="item" effect="dark" content="每款游戏的游戏详情页被浏览的总用户数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="rent_count"
          align="center"
          sortable="custom">
          <template slot="header">
            <div class="table-column-header">
              <span>租借次数</span>
              <el-tooltip class="item" effect="dark" content="每款游戏的成功租借次数，同对应成功支付订单号数量" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="rent_user"
          align="center"
          sortable="custom">
          <template slot="header">
            <div class="table-column-header">
              <span>租借用户数</span>
              <el-tooltip class="item" effect="dark" content="每款游戏的成功租借用户数量，同对应成功支付订单用户数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="favorite_user"
          align="center"
          sortable="custom">
          <template slot="header">
            <div class="table-column-header">
              <span>收藏用户数</span>
              <el-tooltip class="item" effect="dark" content="每款游戏的游戏详情页被收藏的总用户数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="book_user"
          align="center"
          sortable="custom">
          <template slot="header">
            <div class="table-column-header">
              <span>预定用户数</span>
              <el-tooltip class="item" effect="dark" content="每款游戏的游戏详情页被预定的总用户数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
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
import { param } from '@/utils'
export default {
  name: 'GameList',
  mixins: [tableMixins],
  data() {
    return {
      title: '游戏汇总',
      languageChainList: [], //  全部中文版
      languageValue: null, //选中的语言
      languageArr: [
        {id: 0, name: '全部'},{id: 1, name: '中文'}, {id: 2, name: '非中文'}
      ],// 筛选语言 
      platformValue: null, //选中的平台
      platformArr: [], //筛选平台
      accUserCountShow: 0, //下单用户数记录显示
      accUserCount: 0, //下单用户数
      totalDiscNum: 0, //总盘数
      totalCost: 0, //总成本
      totalRent: 0, //总租金
      backRate: 0, //回本率
      totalVisitCount: 0, //总浏览次数
      totalVisitUser: 0, //总浏览人数
      totalRentCount: 0, //总租借次数
      totalRentUser: 0, //总租借人数
      totalFavoriteUser: 0, //总收藏用户
      totalBookUser: 0, //总预定人数
      value2: '',
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      const that = this
      that.loading = true
      const platformValue = this.platformValue
      const languageValue = this.languageValue
      const params = {
        p_id: platformValue || 0,
        l_id: languageValue || 0,
      }
      this.$store.dispatch('game/getGameDataList',params).then(res=> {
        if(res.code === 1) {
          const gameArr = res.data 
          // that.languageArr = res.language && res.language.dataList
          that.languageChainList = res.language && res.language.dataList
          if(res.platform) {
            that.platformArr = [{id: 0, name: '全部'}].concat(res.platform.dataList)
          }
          
          that.pageTotal = gameArr.length;
          that.tableData = gameArr.slice(0, that.pageSize)

          that.allData = JSON.parse(JSON.stringify(gameArr))
          that.screenData = gameArr
          that.setListData()
          that.loading = false
          
        }
      })
    },
    setListData() {
      let list = this.screenData
      let totalDiscNum = 0, totalCost=0, totalVisitCount=0, totalVisitUser=0,totalRentCount=0,
      totalRentUser=0, totalFavoriteUser=0,totalBookUser = 0, totalRent = 0,backRate=0;
      for(let i = 0;i<list.length;i++) {
        list[i].cost_str = Number((list[i].cost / 100).toFixed(2))
        list[i].total_rent_str = Number((list[i].total_rent/100).toFixed(2))
        list[i].rent_count_str = Number((list[i].rent_count/100).toFixed(2))

        totalDiscNum += list[i].disc_num
        totalCost += list[i].cost
        totalVisitCount += list[i].visit_count
        totalVisitUser += list[i].visit_user
        totalRentCount += list[i].rent_count
        totalRentUser += list[i].rent_user
        totalFavoriteUser += list[i].favorite_user
        totalBookUser += list[i].book_user
        totalRent += list[i].total_rent
      }
      this.totalDiscNum = totalDiscNum
      this.totalCost = Number((totalCost/100).toFixed(2))
      this.totalVisitCount = totalVisitCount
      this.totalVisitUser = totalVisitUser
      this.totalRentCount = totalRentCount
      this.totalRentUser = totalRentUser
      this.totalFavoriteUser = totalFavoriteUser
      this.totalBookUser = totalBookUser
      this.totalRent = Number((totalRent/100).toFixed(2))
      this.backRate = totalCost && Number((totalRent/totalCost).toFixed(4))
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
      this.languageValue = 0
      this.currentPage = 1
      this.getList()
    },
    // 选择语言
    languageChange(e) {
      this.languageValue = e
      this.currentPage = 1
      this.getList()
    },
    // 跳往单个游戏
    goGameInfo(e) {
      const languageValue = this.languageValue || 0
      const platformValue = this.platformValue || 0
      this.$router.push({
        path: '/gameSummary/SingleGame/' + e.game_id,
        query: {ch_id: languageValue, p_id: platformValue,disc_no: e.disc_no, game_name: e.game_name}
      })
    },
  }
}
</script>

<style scoped lang="scss">
@import "./index.scss";

</style>
