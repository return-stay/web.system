<template>
  <div class="cs-box">
    <div class="title">
      <span class="title-text">定价调整</span>
      <span class="title-add" @click="add"><i class="el-icon-plus"></i>添加新奖杯</span>
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
        </div>
        <div class="search-form-line">
          <el-form-item label="奖杯完成度：" prop="l">
            <el-select size="small" v-model="ruleForm.l" placeholder="请选择奖杯完成度">
              <el-option v-for="item in trophyLevelLst" :key="item.value" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开发公司：">
            <el-select size="small" v-model="ruleForm.region" placeholder="请选择开发公司">
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
        </div>
        <el-form-item label="">
          <el-button type="primary" @click="onSearchSubmit('ruleForm')">筛选</el-button>
          <el-button type="text" @click="resetSearchForm('ruleForm')">清空筛选</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="tabs-box">
      <tabs @change='tabsChange' :tabsList="tabslist" :action='tabAction' />
    </div>

    <div class="table-box">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="disc_no"
          label="奖杯编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="view_name"
          label="关联游戏"
          width="180">
          <template slot-scope="{row}">
            <span>{{row.game_info.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="level_name"
          label="奖杯完成度"
          width="180">
        </el-table-column>
        <el-table-column
          prop=""
          label="奖杯数量"
          width="180">
          <template slot-scope="{row}">
            <span v-if="row.platinum">白{{row.platinum}} </span>
            <span v-if="row.gold">&nbsp;金{{row.gold}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="platinum"
          label="平台"
          width="180">
          <template slot-scope="{row}">
            <span>{{row.game_info.platform_name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="area_name"
          label="版本"
          width="180">
          <template slot-scope="{row}">
            <span>{{row.game_info.area_name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="语言"
          width="180">
          <template slot-scope="{row}">
            <span>{{row.game_info.language_name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          width="180">
          <template slot-scope="{row}">
            <span>{{moment(row.create_time).format('YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          width="120">
          <template slot-scope="{row}">
            <span class="text-cursor" @click="edit(row)">编辑</span>
            <el-divider direction="vertical"></el-divider>
            <span class="text-cursor" @click="operation(row)">停用</span>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="totalNumber" @pagination="pagination" />
    </div>
  </div>
</template>

<script>
import { GameTrophyLst, BaseTrophyLevelLst } from '@/api/api'
import tableMixins from '@/mixins/tableMixins'
import Tabs from '@/components/Tabs'
import moment from 'moment'
import { getList } from '@/utils/data'
import Pagination from '@/components/Pagination'
export default {
  name: 'TrophyManage',
  components: { Tabs, Pagination },
  mixins: [tableMixins],
  data() {
    return {
      moment: moment,
      trophyLevelLst: [],
      urls: {
        list: GameTrophyLst,
        methods: "post",
      },
      rules: {},
      ruleForm: {
        l: 0,
        name: '',
        region: '',
      },
      tabAction: 0,
      tabslist: [
        { key: 0, label: '全部', value: '全部' },
        { key: 1, label: '信息不全', value: '信息不全' },
        { key: 2, label: '信息完整', value: '信息完整' },
      ],
      columns: [
        {
          title: '奖杯编号',
          key: 'name',
          label: 'name',
          width: 100,
        },
        {
          title: '关联游戏',
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
          title: '奖杯数量',
          key: 'age',
          label: 'age',
          width: 100,
        },
        {
          title: '平台',
          key: 'age',
          label: 'age',
          width: 100,
        },
        {
          title: '版本',
          key: 'age',
          label: 'age',
          width: 100,
        },
        {
          title: '语言',
          key: 'age',
          label: 'age',
          width: 100,
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
          width: 120,
          render: [
            {
              fnName: 'edit',
              title: '编辑'
            },
            {
              fnName: 'operation',
              title: '停用'
            },
          ]
        }
      ],
    }
  },
  mounted() {
    this.getSearchListInit()
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
    async getSearchListInit() {
      this.trophyLevelLst = await getList(BaseTrophyLevelLst)
    },
    resetForm(formName) {
      console.log(formName)
      this.$refs[formName].resetFields();
    },
    tabsChange() {},
    add() {
      this.$router.push({
        path: '/game/trophy/add'
      })
    },
    edit(row) {
      this.$router.push({
        path: '/game/trophy/add',
        query: {id: row.disc_no}
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