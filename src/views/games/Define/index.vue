<template>
  <div class="cs-box">
    <div class="title">
      <span class="title-text">查询</span>
      <span class="title-add" @click="add"><i class="el-icon-plus"></i>添加内容分类</span>
    </div>
    <div class="search-box">
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
        <div class="search-form-line">
          <el-form-item label="检索：" prop="region">
            <div class="search-form-line">
              <!-- <el-select size="small" v-model="ruleForm.region" placeholder="请选择">
                <el-option label="全部" value="0"></el-option>
              </el-select> -->
              <el-form-item prop="key" style="margin-bottom: 0;">
                <el-input size="small" style="width: 194px;margin-left: 10px;" v-model="ruleForm.key"></el-input>
              </el-form-item>
            </div>
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
      <game-table :urls="urls" @edit="edit">
        <el-table
          :border="false"
          :data="tableData"
          style="width: 100%">
          <el-table-column
            prop="name"
            label="分类名称"
            width="220">
          </el-table-column>
          <el-table-column
            prop="intro"
            label="简介">
          </el-table-column>
          <el-table-column
            prop="create_time"
            label="创建时间"
            width="170">
            <template slot-scope="scope">
              <div>
                {{moment(scope.row.create_time).format('YYYY-MM-DD HH:mm:ss')}}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="id"
            align="center"
            label="操作"
            width="170">
            <template slot-scope="scope">
              <div>
                <span class="text-cursor" @click="edit(scope.row)">编辑</span>
                  <el-divider direction="vertical"></el-divider>
                <span class="text-cursor" @click="stop(scope.row)">停用</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </game-table>
    </div>
  </div>
</template>

<script>
import GameTable from '@/components/TablePage/GameTable'
import Tabs from '@/components/Tabs'
import tableMixins from '@/mixins/tableMixins'
import {GameDefineSortLst} from '@/api/api'
import moment from 'moment'
export default {
  name: 'Define',
  components: { GameTable, Tabs },
  mixins: [tableMixins],
  data() {
    return {
      urls: {list: GameDefineSortLst},
      moment: moment,
      ruleForm: {
        key: '',
      },
      tabAction: 0,
      tabslist: [
        { key: 0, label: '全部', value: '全部' },
        { key: 1, label: '未使用', value: '未使用' },
        { key: 2, label: '已停用', value: '已停用' },
      ],
    }
  },
  mounted() {
    
  },
  methods: {
    tabsChange(e) {
      console.log(e)
      this.tabAction = e.key
    },
    add() {
      this.$router.push({
        path: '/game/define/add'
      })
    },
    edit(row) {
      this.$router.push({
        path: '/game/define/add',
        query: {id: row.id}
      })
    },
    stop() {
      
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