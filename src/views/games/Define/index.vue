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
                <el-input size="small" style="width: 194px;" placeholder="请输入分类名称" v-model="ruleForm.key"></el-input>
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
      <el-table
        :border="false"
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="name"
          label="分类名称">
        </el-table-column>
        <el-table-column
          prop="intro"
          label="简介">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间">
          <template slot-scope="scope">
            <div v-if="scope.row.create_time">
              {{moment(scope.row.create_time).format('YYYY-MM-DD HH:mm:ss')}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="id"
          label="操作"
          width="170">
          <template slot-scope="{row}">
            <div>
              <span class="text-cursor" @click="edit(row)">编辑</span>
              <el-divider direction="vertical"></el-divider>
              <el-popconfirm
                v-if="row.active"
                title="确定停用该内容分类吗？"
                @onConfirm="stopUsing(row)"
              >
                <span slot="reference" class="text-cursor">停用</span>
              </el-popconfirm>
              <el-popconfirm
                v-else
                title="确定启用该内容分类吗？"
                @onConfirm="enable(row)"
              >
                <span slot="reference" class="text-cursor">启用</span>
              </el-popconfirm> 
            </div>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :limit="limit" :total="totalNumber" @pagination="pagination" />
    </div>
  </div>
</template>

<script>
import Tabs from '@/components/Tabs'
import tableMixins from '@/mixins/tableMixins'
import {GameDefineSortLst, GameDefineOnSet, GameDefineOffSet} from '@/api/api'
import moment from 'moment'
import Pagination from '@/components/Pagination'
import {stopOrEnableRequest} from '@/utils/ajax'
export default {
  name: 'Define',
  components: { Tabs, Pagination },
  mixins: [tableMixins],
  data() {
    return {
      urls: {list: GameDefineSortLst},
      moment: moment,
      ruleForm: {
        key: '',
      },
      tabAction: -1,
      tabslist: [
        { key: -1, label: '全部', value: '全部' },
        { key: 1, label: '已启用', value: '已启用' },
        { key: 0, label: '已停用', value: '已停用' },
      ],
    }
  },
  mounted() {
    
  },
  methods: {
    tabsChange(e) {
      this.tabSearch({
        st: e.key,
      })
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
    stopUsing(row) {
      stopOrEnableRequest({
        url: GameDefineOffSet,
        data: {id: row.id},
        successText: '停用成功',
      }, () => {
        this.getList()
      })
    },
    enable(row) {
      stopOrEnableRequest({
        url: GameDefineOnSet,
        data: {id: row.id},
        successText: '启用成功',
      }, () => {
        this.getList()
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