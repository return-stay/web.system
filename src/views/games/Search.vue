<template>
  <div class="cs-box">
    <div class="title">
      <span class="title-text">查询</span>
    </div>
    <div class="search-box">
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
        <div class="search-form-line">
          <el-form-item label="搜索条件：" prop="region">
            <div class="search-form-line">
              <el-select size="small" v-model="ruleForm.region" placeholder="请选择">
                <el-option label="全部" value="0"></el-option>
              </el-select>
              <el-form-item prop="name">
                <el-input size="small" style="width: 194px;margin-left: 10px;" v-model="ruleForm.name"></el-input>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select size="small" v-model="ruleForm.region" placeholder="请选择状态">
              <el-option label="全部" value="0"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="search-form-line">
          <el-form-item label="平台：">
            <el-select size="small" v-model="ruleForm.region" placeholder="请选择平台">
              <el-option label="全部" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="游戏类型：">
            <el-select size="small" v-model="ruleForm.region" placeholder="请选择游戏类型">
              <el-option label="全部" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属系列：">
            <el-select size="small" v-model="ruleForm.region" placeholder="请选择所属系列">
              <el-option label="全部" value="0"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="search-form-line">
          <el-form-item label="区域版本：">
            <el-select size="small" v-model="ruleForm.region" placeholder="请选择区域版本">
              <el-option label="全部" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="语言：">
            <el-select size="small" v-model="ruleForm.region" placeholder="请选择语言">
              <el-option label="全部" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容分类：">
            <el-select size="small" v-model="ruleForm.region" placeholder="请选择内容分类">
              <el-option label="全部" value="0"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="search-form-line">
          <el-form-item label="奖杯完成度：">
            <el-select size="small" v-model="ruleForm.region" placeholder="请选择奖杯完成度">
              <el-option label="全部" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开发公司：">
            <el-select size="small" v-model="ruleForm.region" placeholder="请选择开发公司">
              <el-option label="全部" value="0"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="付费时间：">
          <div class="search-form-line">
            <el-date-picker size="small" type="date" placeholder="选择时间" v-model="ruleForm.date1" style="width: 194px;" />
            <span style="margin: 0 8px;">至</span>
            <el-date-picker size="small" type="date" placeholder="选择时间" v-model="ruleForm.date2" style="width: 194px;" />
          </div>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="onSubmit('ruleForm')">筛选</el-button>
          <el-button type="text" @click="resetForm('ruleForm')">清空筛选</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="tabs-box">
      <tabs @change='tabsChange' :tabsList="tabslist" :action='tabAction' />
    </div>

    <div class="table-box">
      <table-page :border="false" :columns="columns" :tableData="tableData" @operation="operation" />
    </div>
  </div>
</template>

<script>
import TablePage from '@/components/TablePage'
import Tabs from '@/components/Tabs'
export default {
  name: 'GameSearch',
  components: { TablePage, Tabs },
  data() {
    return {
      ruleForm: {
        name: '',
        date1: '',
        date2: '',
      },
      tabAction: 0,
      tabslist: [
        { key: 0, label: '全部', value: '全部' },
        { key: 1, label: '库存中', value: '库存中' },
        { key: 2, label: '无库存', value: '无库存' },
      ],
      columns: [
        {
          title: '奖杯编号',
          key: 'name',
          label: 'name',
          width: 100,
        },
        {
          title: '游戏',
          key: 'age',
          label: 'age',
          width: 240,
        },
         {
          title: '奖杯完成度',
          key: 'age',
          label: 'age',
          width: 240,
        },
        {
          title: '类型/系列',
          key: 'age',
          label: 'age',
          width: 240,
        },
        {
          title: '开发公司',
          key: 'age',
          label: 'age',
          width: 140,
        },
        {
          title: '押金',
          key: 'age',
          label: 'age',
          width: 100,
        },
        {
          title: '日租金',
          key: 'age',
          label: 'age',
          width: 240,
          sort: true,
        },
        {
          title: '库存',
          key: 'age',
          label: 'age',
          width: 240,
        },
        {
          title: '创建项目',
          key: 'age',
          label: 'age',
          width: 240,
          sort: true,
        },
        {
          title: '操作',
          key: 'lll',
          fixed: 'right',
          align: 'center',
          width: 210,
          render: [
            {
              fnName: 'operation',
              title: '调价'
            },
            {
              fnName: 'operation',
              title: '库存'
            },
            {
              fnName: 'operation',
              title: '详情'
            },
            {
              fnName: 'operation',
              title: '下架'
            },
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
    onSubmit(formName) {
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
      console.log(formName)
      this.$refs[formName].resetFields();
    },
    tabsChange() {},
    operation(row) {
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
    .el-form-item {
      margin-bottom: 10px;
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