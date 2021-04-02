<template>
  <div class="ot-box">
    <div class="title">
      <span class="title-text">{{title}}</span>
      <span class="title-search" @click="showSearch" v-if="searchIconShow"><svg-icon icon-class='funnel'/>查询条件</span>
    </div>
    <div v-if="searchConditionShow" class="search-box">
      <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="100px">
        <el-form-item label="订单搜索：" prop="tid">
          <el-col :span="7">
            <el-input v-model="ruleForm.tid" placeholder="请输入订单号搜索"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="下单时间：">
          <el-col :span="5">
            <el-form-item prop="cstime">
              <el-date-picker type="date" placeholder="开始日期" v-model="ruleForm.cstime" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">至</el-col>
          <el-col :span="5">
            <el-form-item prop="cetime">
              <el-date-picker type="date" placeholder="结束时间" v-model="ruleForm.cetime" style="width: 100%;"></el-date-picker>
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
            <el-form-item prop="pstime">
              <el-date-picker type="date" placeholder="开始日期" v-model="ruleForm.pstime" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">至</el-col>
          <el-col :span="5">
            <el-form-item prop="petime">
              <el-date-picker type="date" placeholder="结束时间" v-model="ruleForm.petime" style="width: 100%;"></el-date-picker>
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
            <el-form-item label="配送方式：" prop="dcid">
              <el-select style="width: 100%;" v-model="ruleForm.dcid" placeholder="请选择配送方式">
                <el-option v-for="item in companyLst" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="渠道：" prop="ch">
              <el-select style="width: 100%;" v-model="ruleForm.ch" placeholder="请选择渠道">
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
          prop="game_info"
          label="商品">
        </el-table-column>
        <el-table-column
          prop="username"
          label="收货人"
          width="180">
        </el-table-column>
        <el-table-column
          prop="game_num"
          label="游戏数量"
          width="100">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          sortable
          width="170">
          <template slot-scope="scope">
            <div>
              {{moment(scope.row.create_time).format("YYYY-MM-DD HH:mm:ss")}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="fee"
          label="余额"
          sortable
          width="100">
          <template slot-scope="{row}">
            <div>
              {{Number((row.fee/100).toFixed(2))}}
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
              <template v-if="tabAction === 30">
                <span class="text-cursor" @click="navigateTo(row, 'deliver')">发货</span>
                <el-divider direction="vertical"></el-divider>
              </template>
              <template v-if="tabAction === 90">
                <span class="text-cursor" @click="navigateTo(row, 'quality')">质检</span>
                <el-divider direction="vertical"></el-divider>
              </template>
              <span class="text-cursor" @click="navigateTo(row, 'check')">查看</span>
              <el-divider direction="vertical"></el-divider>
              <el-popconfirm
                title="确定关闭该订单吗？"
                @onConfirm="close(row)"
              >
                <span slot="reference" class="text-cursor">关闭</span>
              </el-popconfirm>
            </div>
          </template>
        </el-table-column>
      </el-table>

      <Pagination :limit="limit" :total="totalNumber" @pagination="pagination" />
      
    </div>
  </div>
</template>

<script>
import { postAjax, getAjax} from '@/utils/ajax'
import { TradeListDat, BaseChannelLst, BaseDeliveryCompanyLst, BaseTradeStatusLst, TradeCloseSet } from '@/api/api'
import Pagination from '@/components/Pagination'
import Tabs from '@/components/Tabs'
import TableMixins from '@/mixins/tableMixins'
import moment from 'moment'
import DateUtil from '@/utils/date'
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
      },
      ruleForm: {
        tid: '',
        cstime: '',
        cetime: '',
        pstime: '',
        petime: '',
        st: '',
        dcid: '',
        ch: '',
      },
      dataAction: 0,
      rules: {
        tid: [
          { required: false, message: '请输入订单ID', trigger: 'change' }
        ],
      },
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
    this.getChannelList()
    this.getDeliveryCompanyLst()
    this.getTradeStatusLst()
    if(this.tabAction > 0) {
      this.tabSearch({st: this.tabAction})
    }
  },
  methods: {
    setPayTime(type) {
      let pstime ='' , petime = '';
      switch(type) {
        case 'day':
          const {start, end} = DateUtil.getDay()
          pstime = start
          petime = end
          break;
        case 'today':
          const {stoday, etoday} = DateUtil.getToday()
          pstime = stoday
          petime = etoday
          break;
        case '7days':
          const {s7day, e7day } = DateUtil.get7day()
          pstime = s7day
          petime = e7day
          break;
        case '30days':
          const {s30day, e30day} = DateUtil.get30Day()
          pstime = s30day
          petime = e30day
          break;
        default:

      }
      this.ruleForm.pstime = pstime
      this.ruleForm.petime = petime
    },
    setPlaceOrder(type) {
      let cstime ='' , cetime = '';
      switch(type) {
        case 'day':
          const {start, end} = DateUtil.getDay()
          cstime = start
          cetime = end
          break;
        case 'today':
          const {stoday, etoday} = DateUtil.getToday()
          cstime = stoday
          cetime = etoday
          break;
        case '7days':
          const {s7day, e7day } = DateUtil.get7day()
          cstime = s7day
          cetime = e7day
          break;
        case '30days':
          const {s30day, e30day} = DateUtil.get30Day()
          cstime = s30day
          cetime = e30day
          break;
        default:

      }
      this.ruleForm.cstime = cstime
      this.ruleForm.cetime = cetime
    },
    // 获取订单状态
    getTradeStatusLst () {
      getAjax({
        url: BaseTradeStatusLst,
      }).then(res=> {
        if(res.code === 1) {
          const resdata = res.data
          let arr = [{ key: -999, label: '全部', value: '全部' },]
          for(let i = 0;i<resdata.length; i++ ) {
            arr.push({
              key: resdata[i].value,
              label: resdata[i].name,
              value: resdata[i].name
            })
          }
          this.tabslist = arr
        }
      })
    },
    // 获取渠道列表
    getChannelList() {
      getAjax({
        url: BaseChannelLst,
      }).then(res=> {
        if(res.code === 1) {
          this.channelList = res.data
        }else {
          this.channelList = []
        }
      })
    },
    // 获取状态
    getDeliveryCompanyLst () {
      getAjax({
        url: BaseDeliveryCompanyLst,
      }).then(res=> {
        if(res.code === 1) {
          this.companyLst = res.data
        }else {
          this.companyLst = []
        }
      })
    },
    navigateTo(row, type) {
      this.$router.push({
        path: '/order/detail/' + row.id,
        query: {
          type: type
        }
      })
    },
    close(row) {
      this.$confirm('确定关闭该订单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.confimRequest(row.id)
      })
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
        this.resetSearchForm('ruleForm')
      }
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