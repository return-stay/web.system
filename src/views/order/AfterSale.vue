<template>
  <div class="as-box">
    <!-- <order-table  :tabAction="8" title="售后记录" /> -->
    <div class="title">
      <span class="title-text">售后记录</span>
    </div>
    <div class="search-box">
      <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="100px">
        <el-form-item label="订单搜索：" prop="tid">
          <el-col :span="7">
            <el-input v-model="ruleForm.tid" placeholder="请输入订单号搜索"></el-input>
          </el-col>
        </el-form-item>
        <el-row>
          <el-col :span="6">
            <el-form-item label="分类：" prop="tp">
              <el-select style="width: 100%;" v-model="ruleForm.tp" placeholder="请选择分类">
                <!-- <el-option v-for="item in companyLst" :key="item.id" :label="item.name" :value="item.id"></el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="处理状态：" prop="st">
              <el-select style="width: 100%;" v-model="ruleForm.st" placeholder="请选择处理状态">
                <el-option v-for="item in statuslist" :key="item.key" :label="item.label" :value="item.key"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="申请时间：">
          <el-col :span="5">
            <el-form-item prop="stime">
              <el-date-picker type="date" placeholder="开始日期" v-model="ruleForm.stime" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">至</el-col>
          <el-col :span="5">
            <el-form-item prop="etime">
              <el-date-picker type="date" placeholder="结束时间" v-model="ruleForm.etime" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="onSearchSubmit('ruleForm')">筛选</el-button>
          <el-button @click="resetSearchForm('ruleForm')" >清空筛选</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="table-box">
      <el-table
        :data="tableData"
        @sort-change="sortTableChange"
        style="width: 100%">
        <el-table-column
          prop="transaction_id"
          label="订单号"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="game_info"
          label="商品"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="username"
          align="center"
          label="收货人">
        </el-table-column>
        <el-table-column
          prop="game_num"
          align="center"
          label="游戏数量"
          width="100">
        </el-table-column>
        <el-table-column
          prop="create_time"
          align="center"
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
          align="center"
          label="余额"
          sortable
          width="170">
        </el-table-column>
        <el-table-column
          prop="status_name"
          align="center"
          label="订单状态"
          width="170">
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          label="操作"
          width="170">
          <template slot-scope="scope">
            <div>
              <span class="text-cursor" @click="shipments(scope.row)">处理</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="totalNumber" @pagination="pagination" /> 
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import TableMixins from '@/mixins/tableMixins'
import { RefundListDat } from '@/api/api'
import moment from 'moment'
import Tabs from '@/components/Tabs'
export default {
  name: 'AfterSale',
  components: { Pagination, Tabs },
  mixins: [TableMixins],
  data() {
    return {
      moment,
      urls: {
        list: RefundListDat,
      },
      ruleForm: {
        tid: '',
        stime: '',
        etime: '',
        tp: '',
        st: '',
      },
      rules: {
        tid: [
          { required: false, message: '请输入订单ID', trigger: 'change' }
        ],
      },
      statuslist: [
        { key: 1, label: '全部', value: '全部' },
        { key: 2, label: '待处理', value: '待处理' },
        { key: 3, label: '已处理', value: '已处理' },
      ],
      companyLst: [],
    }
  },
  mounted() {
    this.getSearchListInit()
  },
  methods: {
    async getSearchListInit() {
      // this.companyLst = await getList(BaseDeliveryCompanyLst)
    },
    shipments(row) {
      this.$router.push({
        path: '/clients/cardDetail/' + row.id
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.as-box {
  padding: 16px;
  background-color: #fff;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    padding: 0 20px;
    &-text {
      font-size: 22px;
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