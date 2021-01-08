<template>
  <div class="cs-box">
    <div class="title">
      <span class="title-text">游戏盘调整</span>
      <!-- <span class="title-add" @click="add"><i class="el-icon-plus"></i>添加游戏盘</span> -->
    </div>
    <div class="search-box">
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
        <div class="search-form-line">
          <el-form-item label="商品搜索：" prop="region">
            <div class="search-form-line">
              <el-select size="small" v-model="ruleForm.region" placeholder="请选择">
                <el-option label="全部" value="0"></el-option>
              </el-select>
              <el-form-item prop="name" style="margin-bottom: 0;">
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
          <el-form-item label="日租金范围：" prop="region">
            <div class="search-form-line">
              <el-input size="small" style="width: 194px;" placeholder="最低价" v-model="ruleForm.name">
                <span
                  style="color: #000;"
                  slot="suffix">元
                </span>
              </el-input>
              <span style="margin-left: 10px;">至</span>
              <el-form-item prop="name" style="margin-bottom: 0;">
                <el-input size="small" style="width: 194px;margin-left: 10px;" placeholder="最高价" v-model="ruleForm.name">
                  <span
                    style="color: #000;"
                    slot="suffix">元
                  </span>
                </el-input>
              </el-form-item>
            </div>
          </el-form-item>
        </div>
        <div class="search-form-line">
          <el-form-item label="押金范围：" prop="region">
            <div class="search-form-line">
              <el-input size="small" style="width: 194px;" placeholder="最低价" v-model="ruleForm.name">
                <span
                  style="color: #000;"
                  slot="suffix">元
                </span>
              </el-input>
              <span style="margin-left: 10px;">至</span>
              <el-form-item prop="name" style="margin-bottom: 0;">
                <el-input size="small" style="width: 194px;margin-left: 10px;" placeholder="最高价" v-model="ruleForm.name">
                  <span
                    style="color: #000;"
                    slot="suffix">元
                  </span>
                </el-input>
              </el-form-item>
            </div>
          </el-form-item>
        </div>
        <div class="search-form-line">
          <el-form-item label="平台：">
            <el-select size="small" v-model="ruleForm.region" placeholder="请选择平台">
              <el-option label="全部" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容分类：">
            <el-select size="small" v-model="ruleForm.region" placeholder="请选择游戏类型">
              <el-option label="全部" value="0"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="search-form-line">
          <el-form-item label="奖杯完成度：">
            <el-select size="small" v-model="ruleForm.region" placeholder="请选择平台">
              <el-option label="全部" value="0"></el-option>
            </el-select>
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
  name: 'PricingManage',
  components: { GameTable, Tabs },
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
        { key: 1, label: '未定价', value: '未定价' },
        { key: 2, label: '已定价', value: '已定价' },
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
          key: 'game',
          label: 'game',
          width: 240,
        },
         {
          title: '奖杯完成度',
          key: 'age',
          label: 'age',
          width: 100,
        },
        {
          title: '类型/系列',
          key: 'age',
          label: 'age',
          width: 100,
        },
        {
          title: '开发公司',
          key: 'age',
          label: 'age',
          width: 100,
        },
        {
          title: '押金',
          key: 'age',
          label: 'age',
          width: 260,
        },
        {
          title: '日租金',
          key: 'age',
          label: 'age',
          width: 260,
        },
        {
          title: '库存',
          key: 'age',
          label: 'age',
          width: 260,
        },
        {
          title: '添加时间',
          key: 'age',
          label: 'age',
          width: 200,
          sort: true,
        },
        {
          title: '操作',
          key: 'lll',
          fixed: 'right',
          width: 120,
          render: [
            {
              fnName: 'edit',
              title: '编辑'
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
    add() {
      this.$router.push({
        path: '/game/pricing/adjustment'
      })
    },
    edit(row) {
      this.$router.push({
        path: '/game/pricing/adjustment',
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