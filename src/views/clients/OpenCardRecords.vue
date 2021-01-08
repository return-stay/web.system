<template>
  <div class="cs-box">
    <div class="title">
      <span class="title-text">卡开记录</span>
    </div>
    <div class="search-box">
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
        <el-form-item label="搜索条件：">
          <el-col :span="6">
            <el-select v-model="ruleForm.region" placeholder="请选择">
              <el-option label="全部" value="0"></el-option>
            </el-select>
          </el-col>
          <el-col :span="6">
            <el-input style="margin-left: 10px;" v-model="ruleForm.name"></el-input>
          </el-col>
        </el-form-item>
        <el-row>
          <el-form-item label="来源渠道：">
            <el-col :span="6">
              <el-select v-model="ruleForm.region" placeholder="请选择渠道">
                <el-option label="全部" value="0"></el-option>
              </el-select>
              </el-col>
              <el-col :span="10">
                <el-form-item label="开卡类型：">
                  <el-select v-model="ruleForm.region" placeholder="请选择渠道">
                    <el-option label="全部" value="0"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
          </el-form-item>
        </el-row>
        
        <el-form-item label="开卡时间：">
          <el-col :span="6">
            <el-date-picker type="date" placeholder="选择时间" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">至</el-col>
          <el-col :span="6">
            <el-date-picker type="date" placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="onSubmit('ruleForm')">筛选</el-button>
          <el-button type="text">清空筛选</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-box">
      <table-page :urls="{list: UserTradeLst}" :border="false" :columns="columns" @detail="detail" />
    </div>
  </div>
</template>

<script>
import TablePage from '@/components/TablePage'
import Tabs from '@/components/Tabs'
import {UserTradeLst} from '@/api/api'
export default {
  name: 'OpenCardRecords',
  components: { TablePage, Tabs },
  data() {
    return {
      UserTradeLst: UserTradeLst,
      ruleForm: {
        name: '',
        date1: '',
        date2: '',
      },
      columns: [
        {
          title: '开卡编号',
          key: 'name',
          label: 'name',
          width: 100,
        },
        {
          title: '客户信息',
          key: 'age',
          label: 'age',
          width: 240,
        },
         {
          title: '开卡类型',
          key: 'age',
          label: 'age',
          width: 240,
        },
        {
          title: '开卡后有效期',
          key: 'age',
          label: 'age',
          width: 240,
        },
        {
          title: '消费金额',
          key: 'age',
          label: 'age',
          width: 140,
        },
        {
          title: '来源渠道',
          key: 'age',
          label: 'age',
          width: 100,
        },
        {
          title: '开卡时间',
          key: 'age',
          label: 'age',
          width: 240,
          sort: true,
        },
        {
          title: '操作',
          key: 'lll',
          fixed: 'right',
          width: 100,
          render: [
            {
              fnName: 'detail',
              title: '详情'
            }
          ]
        }
      ],
      tableData: []
    }
  },
  mounted() {
    let data = []
    for(let i = 0;i<5;i++) {
      data.push({id: i, name: 'cao' + i, age: 1+i, lll: '0' + i })
    }
    setTimeout(() => {
      this.tableData = data
    }, 10)
  },
  methods: {
    detail(row) {
      this.$router.push({
        path: '/clients/detail/' + row.id
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.cs-box {
  padding: 16px;
  min-height: 100%;
  background-color: #fff;
  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    padding: 0 20px;
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
    margin-top: 14px;
  }
}
</style>