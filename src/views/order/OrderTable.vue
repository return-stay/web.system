<template>
  <div class="ot-box">
    <div class="title">
      <span class="title-text">{{title}}</span>
      <span class="title-search" @click="showSearch" v-if="searchIconShow"><svg-icon icon-class='funnel'/>查询条件</span>
    </div>
    <div v-if="searchConditionShow" class="search-box">
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
        <el-row>
          <el-col :span="6">
            <el-form-item label="订单搜索：" prop="transaction_id">
              <el-input v-model="ruleForm.transaction_id" placeholder="请输入订单号搜索"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="游戏名称：" prop="game_name">
              <el-input v-model="ruleForm.game_name" placeholder="请输入游戏名称搜索"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="收货人：" prop="username">
              <el-input v-model="ruleForm.username" placeholder="请输入收货人搜索"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="下单时间：">
          <el-col :span="5">
            <el-form-item prop="create_start_time">
              <el-date-picker type="datetime" placeholder="开始日期" v-model="ruleForm.create_start_time" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">至</el-col>
          <el-col :span="5">
            <el-form-item prop="create_end_time">
              <!-- <el-date-picker type="date" placeholder="结束时间" v-model="ruleForm.create_end_time" style="width: 100%;"></el-date-picker> -->
              <el-date-picker
                style="width: 100%;"
                v-model="ruleForm.create_end_time"
                type="datetime"
                default-time="23:59:59"
                placeholder="结束时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-button style="margin-left: 10px;" @click="setPlaceOrder('day')">今天</el-button>
            <el-button style="margin-left: 10px;" @click="setPlaceOrder('today')">昨天</el-button>
            <el-button style="margin-left: 10px;" @click="setPlaceOrder('7days')">最近7天</el-button>
            <el-button style="margin-left: 10px;" @click="setPlaceOrder('30days')">最近30天</el-button>
          </el-col>
        </el-form-item>
        <el-form-item label="支付时间：">
          <el-col :span="5">
            <el-form-item prop="paid_start_time">
              <el-date-picker type="datetime" placeholder="开始日期" v-model="ruleForm.paid_start_time" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">至</el-col>
          <el-col :span="5">
            <el-form-item prop="paid_end_time">
              <el-date-picker
                type="datetime"
                default-time="23:59:59" placeholder="结束时间" v-model="ruleForm.paid_end_time" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-button style="margin-left: 10px;" @click="setPayTime('day')">今天</el-button>
            <el-button style="margin-left: 10px;" @click="setPayTime('today')">昨天</el-button>
            <el-button style="margin-left: 10px;" @click="setPayTime('7days')">最近7天</el-button>
            <el-button style="margin-left: 10px;" @click="setPayTime('30days')">最近30天</el-button>
          </el-col>
        </el-form-item>
        <el-row>
          <el-col :span="6">
            <el-form-item label="订单状态：" prop="st">
              <el-select style="width: 100%;" v-model="ruleForm.st" placeholder="请选择订单状态">
                <el-option v-for="item in tabslist" :key="item.key" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="配送方式：" prop="delivery_company_id">
              <el-select style="width: 100%;" v-model="ruleForm.delivery_company_id" placeholder="请选择配送方式">
                <el-option v-for="item in companyLst" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="渠道：" prop="channel_id">
              <el-select style="width: 100%;" v-model="ruleForm.channel_id" placeholder="请选择渠道">
                <el-option v-for="item in channelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="">
          <el-button type="primary" @click="onSearchSubmit('ruleForm')">筛选</el-button>
          <el-button @click="resetSearchForm('ruleForm')" >清空筛选</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="tabs-box">
      <tabs @change='tabsChange' :tabsList="tabslist" :action='tabAction' />
    </div>
    <div class="table-box">
      <el-table
        :data="tableData"
        @sort-change="sortTableChange"
        style="width: 100%">
        <el-table-column
          prop="transaction_id"
          label="订单号"
          width="120">
        </el-table-column>
        <el-table-column
          label="商品">
          <template slot-scope="{row}">
            <div v-if="row.game_list && row.game_list.length>0 ">
              <p v-for="gl in row.game_list" :key="gl.id">{{gl.platform_name}} {{gl.name}} ({{gl.area_name}} {{gl.language_name}})</p>
            </div>
            <div v-else><span>{{row.game_info}}</span></div>
          </template>
        </el-table-column>
        <el-table-column
          prop="username"
          label="收货人">
          <template slot-scope="{row}">
            <div>
              <span>{{row.username}}</span> <span>{{row.mobile}}</span>
            </div>
            <div>
              <span>{{row.province}}</span><span>{{row.city}}</span><span>{{row.county}}</span><span>{{row.address}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="更新时间"
          width="170">
          <template slot-scope="{row}">
            <div v-if="row.update_time">
              {{moment(row.update_time).format("YYYY-MM-DD HH:mm:ss")}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          width="170">
          <template slot-scope="{row}">
            <div v-if="row.create_time">
              {{moment(row.create_time).format("YYYY-MM-DD HH:mm:ss")}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="fee"
          label="金额"
          width="100">
          <template slot-scope="{row}">
            <div>
              {{Number((row.fee/100).toFixed(2))}}元
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="status_name"
          label="订单状态"
          width="170">
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          width="170">
          <template slot-scope="{row}">
            <div>
              <template v-if="row.status === 30">
                <span class="text-cursor" @click="navigateTo(row, 'deliver')">发货</span>
                <el-divider direction="vertical"></el-divider>
              </template>
              <template v-if="row.status === 90 || row.status === 100">
                <span class="text-cursor" @click="navigateTo(row, 'quality')">质检</span>
                <el-divider direction="vertical"></el-divider>
              </template>
              <span class="text-cursor" @click="navigateTo(row, 'check')">查看</span>
              <template v-if="row.status < 60 && row.status !== 0">
                <el-divider direction="vertical"></el-divider>
                <el-popconfirm
                  title="确定关闭该订单吗？"
                  @onConfirm="close(row)"
                >
                  <span slot="reference" class="text-cursor">关闭</span>
                </el-popconfirm>
              </template>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :limit="limit" :total="totalNumber" @pagination="pagination" />
    </div>
  </div>
</template>

<script>
import { postAjax } from '@/utils/ajax'
import { TradeListDat, BaseChannelLst, BaseDeliveryCompanyLst, BaseTradeStatusLst, TradeCloseSet } from '@/api/api'
import Pagination from '@/components/Pagination'
import Tabs from '@/components/Tabs'
import TableMixins from '@/mixins/tableMixins'
import moment from 'moment'
import DateUtil from '@/utils/date'
import { getStoreList } from '@/utils/data'
export default {
  name: 'OrderTable',
  components: { Tabs, Pagination },
  mixins: [TableMixins],
  props: {
    searchIconShow: {
      type: Boolean,
      default: true,
    },
    searchConditionShow: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: '',
    },
    action: {
      type: Number,
      default: -999,
    },
  },
  computed: {
    tabAction() {
      return this.dataAction || this.action
    }
  },
  data() {
    return {
      moment: moment,
      urls: {
        list: TradeListDat,
        typeJson: 'json'
      },
      ruleForm: {
        transaction_id: '',
        game_name: '',
        username: '',
        create_start_time: '',
        create_end_time: '',
        paid_start_time: '',
        paid_end_time: '',
        st: '',
        delivery_company_id: '',
        channel_id: '',
      },
      dataAction: 0,
      tabslist: [
        { key: -999, label: '全部', value: '全部' },
        { key: 1, label: '待支付', value: '待支付' },
        { key: 2, label: '待发货', value: '待发货' },
        { key: 3, label: '已发货', value: '已发货' },
        { key: 4, label: '归还中', value: '归还中' },
        { key: 5, label: '待质检', value: '待质检' },
        { key: 6, label: '已关闭', value: '已关闭' },
        { key: 7, label: '已退款', value: '已退款' },
        { key: 8, label: '已完成', value: '已完成' },
      ],
      channelList: [],
      companyLst: [],
    }
  },
  created() {
    if(this.tabAction > 0) {
      this.isMountedRequest = false
    }
  },
  mounted() {
    // this.getChannelList()
    // this.getDeliveryCompanyLst()
    // this.getTradeStatusLst()
    this.getSearchList()
    if(this.tabAction > 0) {
      this.tabSearch({st: this.tabAction})
    }
  },
  methods: {
    setPayTime(type) {
      let paid_start_time ='' , paid_end_time = '';
      switch(type) {
        case 'day':
          const {start, end} = DateUtil.getDay()
          paid_start_time = start
          paid_end_time = end
          break;
        case 'today':
          const {stoday, etoday} = DateUtil.getToday()
          paid_start_time = stoday
          paid_end_time = etoday
          break;
        case '7days':
          const {s7day, e7day } = DateUtil.get7day()
          paid_start_time = s7day
          paid_end_time = e7day
          break;
        case '30days':
          const {s30day, e30day} = DateUtil.get30Day()
          paid_start_time = s30day
          paid_end_time = e30day
          break;
        default:
      }
      this.ruleForm.paid_start_time = paid_start_time
      this.ruleForm.paid_end_time = paid_end_time
    },
    setPlaceOrder(type) {
      let create_start_time ='' , create_end_time = '';
      switch(type) {
        case 'day':
          const {start, end} = DateUtil.getDay()
          create_start_time = start
          create_end_time = end
          break;
        case 'today':
          const {stoday, etoday} = DateUtil.getToday()
          create_start_time = stoday
          create_end_time = etoday
          break;
        case '7days':
          const {s7day, e7day } = DateUtil.get7day()
          create_start_time = s7day
          create_end_time = e7day
          break;
        case '30days':
          const {s30day, e30day} = DateUtil.get30Day()
          create_start_time = s30day
          create_end_time = e30day
          break;
        default:

      }
      this.ruleForm.create_start_time = create_start_time
      this.ruleForm.create_end_time = create_end_time
    },

    async getSearchList() {
      // 获取订单状态
      let statuslist = await getStoreList(BaseTradeStatusLst)
      let arr = [{ key: -999, label: '全部', value: '全部' },]
      for(let i = 0;i<statuslist.length; i++ ) {
        arr.push({
          key: statuslist[i].value,
          label: statuslist[i].name,
          value: statuslist[i].name
        })
      }
      this.tabslist = arr
      // 获取渠道列表
      this.channelList = await getStoreList(BaseChannelLst)
      // 获取状态
      this.companyLst = await getStoreList(BaseDeliveryCompanyLst)
    },
    navigateTo(row, type) {
      if(type === 'quality') {
        if(row.disc_num === 1) {
          this.$router.push({
            path: '/order/settlement/' + row.id,
          })
        }else {
          this.$router.push({
            path: '/order/detail/' + row.id,
          })
        }
      }else {
        this.$router.push({
          path: '/order/detail/' + row.id,
          query: {
            type: type
          }
        })
      }
    },
    close(row) {
      this.confimRequest(row.id)
    },
    confimRequest (id) {
      postAjax({
        url: TradeCloseSet,
        data: {
          id: id
        },
      }).then(res=> {
        if(res.code === 1) {
          this.$message({
            message: '成功关闭该订单',
            type: 'success'
          });
          this.getList()
        }
      })
    },
    tabsChange(item) {
      this.dataAction = item.key
      if(this.searchConditionShow) {
        this.$refs['ruleForm'].resetFields();
      }
      // this.ruleForm.st = item.key
      this.tabSearch({st: item.key});
    },
    showSearch() {
      this.$router.push({
        path: '/order/search'
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.ot-box {
  padding: 16px;
  background-color: #fff;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    padding: 0 20px;
    &-text {
      font-size: 24px;
      color: #2C2C2C;
    }
    &-search {
      color: #606060;
      font-size: 14px;
      cursor: pointer;
    }
  }
  .search-box {
    background-color: #F8F8F8;
    padding: 15px 15px 1px;
    .line {
      text-align: center;
    }
  }
  .tabs-box {
    margin-top: 14px;
  }
  .table-box {
    margin-top: 8px;
  }
}
</style>