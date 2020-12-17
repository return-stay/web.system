<template>
  <div class="cs-box">
    <div class="title">
      <span class="title-text">查询</span>
      <span class="title-add" @click="add"><i class="el-icon-plus"></i>添加专题</span>
    </div>
    <div class="search-box">
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
        <div class="search-form-line">
          <el-form-item label="检索：" prop="region">
            <div class="search-form-line">
              <el-select size="small" v-model="ruleForm.region" placeholder="请选择">
                <el-option label="全部" value="0"></el-option>
              </el-select>
              <el-form-item prop="name" style="margin-bottom: 0;">
                <el-input size="small" style="width: 194px;margin-left: 10px;" v-model="ruleForm.name"></el-input>
              </el-form-item>
            </div>
          </el-form-item>
        </div>
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
  name: 'GameSubject',
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
          title: '专题图',
          key: 'names',
          label: 'names',
          width: 100,
        },
        {
          title: '专题名称',
          key: 'names',
          label: 'names',
        },
         {
          title: '简介',
          key: 'age',
          label: 'age',
          width: 200,
        },
        {
          title: '游戏数量',
          key: 'age',
          label: 'age',
          width: 200,
        },
        {
          title: '创建时间',
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
              title: '停用'
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
        path: '/operation/subject/add'
      })
    },
    edit(row) {
      this.$router.push({
        path: '/operation/subject/add',
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