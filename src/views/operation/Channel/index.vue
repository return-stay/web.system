<template>
  <div class="cs-box">
    <div class="title">
      <span class="title-text">查询</span>
      <span class="title-add" @click="add"><i class="el-icon-plus"></i>添加渠道</span>
    </div>
    <div class="search-box">
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
        <div class="search-form-line">
          <el-form-item label="搜索条件：" prop="id">
            <div class="search-form-line">
              <!-- <el-select size="small" v-model="ruleForm.id" placeholder="请选择">
                <el-option label="全部" value="0"></el-option>
              </el-select> -->
              <el-form-item prop="id" style="margin-bottom: 0;">
                <el-input size="small" style="width: 194px;margin-left: 10px;" v-model="ruleForm.id"></el-input>
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
    
    <div class="table-box">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="渠道编号"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="name"
          label="渠道名称"
          align="center">
        </el-table-column>
        <el-table-column
          prop="description"
          align="center"
          label="说明">
        </el-table-column>
        <el-table-column
          prop="qr_code"
          align="center"
          label="访问片段">
        </el-table-column>
        <el-table-column
          prop="update"
          align="center"
          label="修改时间"
          sortable
          width="170">
          <template slot-scope="{row}">
            <div v-if="row.update">
              {{moment(row.update).format("YYYY-MM-DD HH:mm:ss")}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="create"
          align="center"
          label="创建时间"
          width="170">
          <template slot-scope="{row}">
            <div v-if="row.create">
              {{moment(row.create).format("YYYY-MM-DD HH:mm:ss")}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          label="操作"
          width="170">
          <template slot-scope="{row}">
            <div>
              <el-popover
                placement="bottom"
                trigger="click">
                <div style="text-align: center;">
                  <ImageLarger :src="row.qr_code" imgstyle="width: 120px;height: 120px;" />
                </div>
                <span slot="reference" class="text-cursor">QR</span>
              </el-popover>
              <el-divider direction="vertical"></el-divider>
              <span class="text-cursor" @click="edit(row)">编辑</span>
              <el-divider direction="vertical"></el-divider>
              <el-popconfirm
                v-if="row.active"
                title="确定停用该渠道吗？"
                @onConfirm="stopUsing(row)"
              >
                <span slot="reference" class="text-cursor">停用</span>
              </el-popconfirm>
              <el-popconfirm
                v-else
                title="确定启用该渠道吗？"
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
import {ChannelListDat, ChannelOnSet, ChannelOffSet} from '@/api/api'
import tableMixins from '@/mixins/tableMixins'
import Pagination from '@/components/Pagination'
import moment from 'moment'
import {stopOrEnableRequest} from '@/utils/ajax'
import ImageLarger from '@/components/ImageLarger'
export default {
  name: 'Channel',
  components: { Tabs, Pagination, ImageLarger },
  mixins: [tableMixins],
  data() {
    return {
      moment,
      urls: {
        list: ChannelListDat,
      },
      ruleForm: {
        id: '',
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
    add() {
      this.$router.push({
        path: '/operation/channel/add'
      })
    },
    edit(row) {
      this.$router.push({
        path: '/operation/channel/eidt',
        query: {id: row.id}
      })
    },
    stopUsing(row) {
      stopOrEnableRequest({
        url: ChannelOffSet,
        data: {id: row.id},
        successText: '停用成功',
      }, () => {
        this.getList()
      })
    },
    enable(row) {
      stopOrEnableRequest({
        url: ChannelOnSet,
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