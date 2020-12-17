<template>
  <div class="cs-box">
    <div class="title">
      <span class="title-text">查询</span>
      <span class="title-add" @click="add"><i class="el-icon-plus"></i>添加渠道</span>
    </div>
    <div class="search-box">
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
        <el-form-item label="位置：" prop="region">
          <div class="search-form-line">
            <el-select size="small" v-model="ruleForm.region" placeholder="请选择">
              <el-option label="全部" value="0"></el-option>
            </el-select>
          </div>
        </el-form-item>
        <el-form-item label="类型：" prop="region">
          <div class="search-form-line">
            <el-select size="small" v-model="ruleForm.region" placeholder="请选择">
              <el-option label="全部" value="0"></el-option>
            </el-select>
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
      <game-table :border="false" :columns="columns" :tableData="tableData" @edit="edit" />
    </div>
  </div>
</template>

<script>
import GameTable from '@/components/TablePage/GameTable'
import Tabs from '@/components/Tabs'
export default {
  name: 'ImagesLocation',
  components: { GameTable, Tabs },
  data() {
    return {
      ruleForm: {
        name: '',
        date1: '',
      },
      tabAction: 0,
      tabslist: [
        { key: 0, label: '全部', value: '全部' },
        { key: 1, label: '未使用', value: '未使用' },
        { key: 2, label: '已停用', value: '已停用' },
      ],
      columns: [
        {
          title: '预览图',
          key: 'name',
          label: 'name',
          width: 100,
        },
        {
          title: '位置',
          key: 'game',
          label: 'game',
        },
         {
          title: '类型',
          key: 'age',
          label: 'age',
          width: 100,
        },
        {
          title: '内容',
          key: 'age',
          label: 'age',
          width: 200,
        },
        {
          title: '标题/描述',
          key: 'age',
          label: 'age',
          width: 100,
        },
        {
          title: '状态',
          key: 'age',
          label: 'age',
          width: 100,
        },
        {
          title: '更新时间',
          key: 'age',
          label: 'age',
          width: 200,
          sort: true,
        },
        {
          title: '操作',
          key: 'lll',
          fixed: 'right',
          width: 160,
          render: [
            {
              fnName: 'edit',
              title: '编辑'
            },
            {
              fnName: 'release',
              title: '发布'
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
    add() {
      this.$router.push({
        path: '/operation/location/add'
      })
    },
    edit(row) {
      this.$router.push({
        path: '/operation/location/add',
        query: {id: row.id}
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
    &-add {
      cursor: pointer;
      font-size: 14px;
    }
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