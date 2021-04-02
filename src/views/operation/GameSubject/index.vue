<template>
  <div class="cs-box">
    <div class="title">
      <span class="title-text">查询</span>
      <span class="title-add" @click="add"><i class="el-icon-plus"></i>添加专题</span>
    </div>
    <div class="search-box">
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
        <div class="search-form-line">
          <el-form-item label="专题名称：" prop="tt">
            <el-input size="small" style="width: 194px" placeholder="请输入专题名称" v-model="ruleForm.tt"></el-input>
          </el-form-item>
          <el-form-item label="游戏名称：" prop="gnm">
            <el-input size="small" style="width: 194px" placeholder="请输入游戏名称" v-model="ruleForm.gnm"></el-input>
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
          prop="img"
          align="center"
          label="专题图"
          width="120">
          <template slot-scope="{row}">
            <div v-if="row.img" style="height: 40px;">
              <ImageLarger :src="row.img" imgstyle="height: 100%;" />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          align="center"
          label="专题名称">
        </el-table-column>
        <el-table-column
          prop="description"
          align="center"
          label="简介">
        </el-table-column>
        <el-table-column
          prop="game_id_list"
          align="center"
          label="游戏数量"
          width="170">
          <template slot-scope="scope">
            <div v-if="scope.row.game_id_list">
              {{scope.row.game_id_list.length}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="update_time"
          align="center"
          label="更细时间"
          width="170">
          <template slot-scope="scope">
            <div>
              {{moment(scope.row.update_time).format("YYYY-MM-DD HH:mm:ss")}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          align="center"
          label="操作"
          width='120'>
          <template slot-scope="{row}">
            <span class="text-cursor" @click="edit(row)">编辑</span>
            <el-divider direction="vertical"></el-divider>
            <el-popconfirm
              v-if="row.active"
              title="确定停用该专题吗？"
              @onConfirm="stopUsing(row)"
            >
              <span slot="reference" class="text-cursor">停用</span>
            </el-popconfirm>
            <el-popconfirm
              v-else
              title="确定启用该启用吗？"
              @onConfirm="enable(row)"
            >
              <span slot="reference" class="text-cursor">启用</span>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :limit="limit" :total="totalNumber" @pagination="pagination" />
    </div>
  </div>
</template>

<script>
import {IMG_URL, TopicOnSet, TopicOffSet} from '@/api/api'
import Tabs from '@/components/Tabs'
import tableMixins from '@/mixins/tableMixins'
import {TopicListDat} from '@/api/api'
import moment from 'moment'
import Pagination from '@/components/Pagination'
import {stopOrEnableRequest} from '@/utils/ajax'
import ImageLarger from '@/components/ImageLarger'
export default {
  name: 'GameSubject',
  components: { Tabs, Pagination, ImageLarger },
  mixins: [tableMixins],
  data() {
    return {
      IMG_URL,
      moment: moment,
      ruleForm: {
        tt: '',
        gnm: '',
      },
      urls: {
        list: TopicListDat,
      },
      tabAction: -1,
      tabslist: [
        { key: -1, label: '全部', value: '全部' },
        { key: 1, label: '未使用', value: '未使用' },
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
        path: '/operation/subject/add'
      })
    },
    edit(row) {
      this.$router.push({
        path: '/operation/subject/add',
        query: {id: row.id}
      })
    },
    stopUsing(row) {
      stopOrEnableRequest({
        url: TopicOffSet,
        data: {id: row.id},
        successText: '停用成功',
      }, () => {
        this.getList()
      })
    },
    enable(row) {
      stopOrEnableRequest({
        url: TopicOnSet,
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