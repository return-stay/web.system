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
      <table-page 
        ref="tablechild"
        :urls="{list: listUrl}"
        @row-click="rowClick" 
        :border="false" 
        :columns="columns"
        :tableData="tableData" 
        @shipments="shipments" 
        @check="check"
        @close="close"
       />
    </div>
  </div>
</template>

<script>
import { postAjax, getAjax} from '@/utils/ajax'
import { TradeListDat, BaseChannelLst, BaseDeliveryCompanyLst, BaseTradeStatusLst, TradeCloseSet } from '@/api/api'
import TablePage from '@/components/TablePage'
import Tabs from '@/components/Tabs'
import TableMixins from '@/mixins/tableMixins'
export default {
  name: 'OrderTable',
  components: {TablePage, Tabs},
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
    }
  },
  data() {
    return {
      tabAction: -1,
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
      rules: {
        tid: [
          { required: false, message: '请输入订单ID', trigger: 'change' }
        ],
      },
      tabslist: [
        { key: -1, label: '全部', value: '全部' },
        { key: 1, label: '待支付', value: '待支付' },
        { key: 2, label: '待发货', value: '待发货' },
        { key: 3, label: '已发货', value: '已发货' },
        { key: 4, label: '归还中', value: '归还中' },
        { key: 5, label: '待质检', value: '待质检' },
        { key: 6, label: '已关闭', value: '已关闭' },
        { key: 7, label: '已退款', value: '已退款' },
        { key: 8, label: '已完成', value: '已完成' },
      ],
      columns: [
        {
          title: '订单号',
          key: 'transaction_id',
          label: 'transaction_id',
          width: 240,
        },
        {
          title: '商品',
          key: 'game_info',
          label: 'game_info',
          width: 240,
        },
         {
          title: '收货人',
          key: 'username',
          label: 'username',
          width: 240,
        },
        {
          title: '创建时间',
          key: 'create_time',
          label: 'create_time',
          width: 240,
          sort: true,
        },
        {
          title: '金额',
          key: 'fee',
          label: 'fee',
          width: 240,
        },
        {
          title: '订单状态',
          key: 'status_name',
          label: 'status_name',
          width: 240,
        },
        {
          title: '操作',
          key: 'lll',
          label: 'lll',
          fixed: 'right',
          width: 170,
          render: [
            {
              fnName: 'shipments',
              title: '发货',
            },
            {
              fnName: 'check',
              title: '查看',
            },
            {
              fnName: 'close',
              title: '关闭',
            },
          ]
        }
      ],
      listUrl: TradeListDat,
      tableData: [],
      channelList: [],
      companyLst: [],
    }
  },
  mounted() {
    this.getChannelList()
    this.getDeliveryCompanyLst()
    this.getTradeStatusLst()
  },
  methods: {
    // 获取订单状态
    getTradeStatusLst () {
      getAjax({
        url: BaseTradeStatusLst,
      }).then(res=> {
        console.log(res)
        if(res.code === 1) {
          const resdata = res.data
          // let arr = [{ key: -1, label: '全部', value: '全部' },]
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
    rowClick(row, column, event) {
      console.log(row, column)
      this.$router.push({
        path: '/order/detail/' + row.id
      })
    },
    shipments(row) {
      this.$router.push({
        path: '/order/detail/' + row.id
      })
    },
    check(row) {
      this.$router.push({
        path: '/order/detail/' + row.id
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
      // postAjax({
      //   url: TradeCloseSet,
      //   data: {
      //     id: id
      //   },
      // }).then(res=> {
      //   if(res.code === 1) {
      //     this.$message({
      //       message: '成功关闭该订单',
      //       type: 'success'
      //     });
      //     this.$refs.tablechild.getList()
      //   }
      //   console.log(res)
      // })
    },
    tabsChange(item) {
      this.tabAction = item.key
      this.resetSearchForm('ruleForm')
      this.$refs.tablechild.search({st: item.key});
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