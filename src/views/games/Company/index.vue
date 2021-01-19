<template>
  <div class="cs-box">
    <div class="title">
      <span class="title-text">查询</span>
      <span class="title-add" @click="add"><i class="el-icon-plus"></i>添加开发公司</span>
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
      <game-table :urls="urls" >

        <el-table
          :data="tableData"
          @sort-change="sortTableChange"
          style="width: 100%">
          <el-table-column
            prop="logo_url"
            label="LOGO"
            align="center"
            width="100">
            <template slot-scope="scope">
              <img style="width: 100%;" :src="scope.row.logo_url" alt="">
              <!-- <div>图</div> -->
            </template>
          </el-table-column>
          <el-table-column
            prop="view_name"
            label="显示名称"
            align="center"
            width="180">
          </el-table-column>
          <el-table-column
            prop="original_name"
            align="center"
            label="原始名称">
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
            prop="address"
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
import {GameCompanyLst} from "@/api/api"
import tableMixins from '@/mixins/tableMixins'
import moment from 'moment'
export default {
  name: 'DevelopmentCompany',
  components: { GameTable, Tabs },
  mixins: [tableMixins],
  data() {
    return {
      moment: moment,
      urls: {list: GameCompanyLst},
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
  methods: {
    tabsChange(ev) {
      this.tabAction = e.key
    },
    add() {
      this.$router.push({
        path: '/game/company/add'
      })
    },
    edit(row) {
      // console.log(row)
      this.$router.push({
        path: '/game/company/add',
        query: {id: row.id}
      })
    },
    stop() {},
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