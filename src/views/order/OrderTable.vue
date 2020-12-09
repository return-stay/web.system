<template>
  <div class="ot-box">
    <div class="title">
      <span class="title-text">{{title}}</span>
      <span class="title-search" @click="showSearch" v-if="searchIconShow"><svg-icon icon-class='funnel'/>查询条件</span>
    </div>
    <div v-if="searchConditionShow" class="search-box">
      <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="100px">
        <el-form-item label="订单搜索：">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="下单时间：">
          <el-col :span="7">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">至</el-col>
          <el-col :span="7">
            <el-date-picker type="date" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="支付时间：">
          <el-col :span="7">
            <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">至</el-col>
          <el-col :span="7">
            <el-date-picker type="date" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-row>
          <el-col :span="6">
            <el-form-item label="订单状态：">
              <el-select v-model="ruleForm.region" placeholder="请选择订单状态">
                <el-option label="全部" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="配送方式：">
              <el-select v-model="ruleForm.region" placeholder="请选择配送方式">
                <el-option label="全部" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="渠道：">
              <el-select v-model="ruleForm.region" placeholder="请选择渠道">
                <el-option label="全部" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="">
          <el-button type="primary" @click="onSubmit('ruleForm')">筛选</el-button>
          <el-button>清空筛选</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="tabs-box">
      <tabs @change='tabsChange' :tabsList="tabslist" :action='tabAction' />
    </div>
    <div class="table-box">
      <table-page 
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

import TablePage from '@/components/TablePage'
import Tabs from '@/components/Tabs'
export default {
  name: 'OrderTable',
  components: {TablePage, Tabs},
  props: {
    tabAction: {
      type: Number,
      default: 0,
    },
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
      ruleForm: {
        name: '',
        date1: '',
        date2: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        date1: [
          { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
        ],
        date2: [
          { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
        ],
      },
      tabslist: [
        { key: 0, label: '全部', value: '全部' },
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
          key: 'name',
          label: 'name',
          width: 240,
        },
        {
          title: '商品',
          key: 'age',
          label: 'age',
          width: 240,
        },
         {
          title: '收货人',
          key: 'age',
          label: 'age',
          width: 240,
        },
        {
          title: '创建时间',
          key: 'age',
          label: 'age',
          width: 240,
          sort: true,
        },
        {
          title: '金额',
          key: 'age',
          label: 'age',
          width: 240,
        },
        {
          title: '订单状态',
          key: 'age',
          label: 'age',
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
      tableData: []
    }
  },
  mounted() {
    let data = []
    for(let i = 0;i<100;i++) {
      data.push( {id: i, name: 'cao' + i, age: 1+i, lll: '0' +i},)
    }
    setTimeout(() => {
      this.tableData = data
    }, 10)
  },
  methods: {
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
    check() {},
    close() {},
    onSubmit(formName) {
      console.log('submit!');
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    tabsChange(item) {
      console.log(item)
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