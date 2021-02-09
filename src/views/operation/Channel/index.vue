<template>
  <div class="cs-box">
    <div class="title">
      <span class="title-text">查询</span>
      <span class="title-add" @click="add"><i class="el-icon-plus"></i>添加渠道</span>
    </div>
    <div class="search-box">
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
        <div class="search-form-line">
          <el-form-item label="搜索条件：" prop="region">
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
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="age"
          align="center"
          label="说明">
        </el-table-column>
        <el-table-column
          prop="age"
          align="center"
          label="访问片段"
          width="100">
        </el-table-column>
        <el-table-column
          prop="create_time"
          align="center"
          label="修改时间"
          sortable
          width="170">
          <template slot-scope="scope">
            <div>
              {{moment(scope.row.create_time).format("YYYY-MM-DD HH:mm:ss")}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="status_name"
          align="center"
          label="创建时间"
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
              <span class="text-cursor" @click="qr(scope.row)">QR</span>
              <el-divider direction="vertical"></el-divider>
              <span class="text-cursor" @click="edit(scope.row)">编辑</span>
              <el-divider direction="vertical"></el-divider>
              <span class="text-cursor" @click="operation(scope.row)">停用</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :total="totalNumber" @pagination="pagination" />
    </div>
  </div>
</template>

<script>
import Tabs from '@/components/Tabs'
import {ChannelListDat} from '@/api/api'
import tableMixins from '@/mixins/tableMixins'
import Pagination from '@/components/Pagination'
import moment from 'moment'
export default {
  name: 'Channel',
  components: { Tabs, Pagination },
  mixins: [tableMixins],
  data() {
    return {
      moment,
      urls: {
        list: ChannelListDat,
        listMethod: 'get',
      },
      ruleForm: {
        name: '',
        date1: '',
        date2: '',
      },
      tabAction: 0,
      tabslist: [
        { key: 0, label: '全部', value: '全部' },
        { key: 1, label: '未使用', value: '未使用' },
        { key: 2, label: '已停用', value: '已停用' },
      ],
      columns: [
        {
          title: '渠道编号',
          key: 'name',
          label: 'name',
          width: 100,
        },
        {
          title: '渠道名称',
          key: 'game',
          label: 'game',
        },
         {
          title: '说明',
          key: 'age',
          label: 'age',
          width: 100,
        },
        {
          title: '访问片段',
          key: 'age',
          label: 'age',
          width: 200,
        },
        {
          title: '修改时间',
          key: 'create_time',
          label: 'create_time',
          width: 200,
          sort: true,
        },
        {
          title: '创建时间',
          key: 'age',
          label: 'age',
          width: 200,
          sort: true,
        },
      ],
    }
  },
  mounted() {
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
        path: '/operation/channel/add'
      })
    },
    edit(row) {
      this.$router.push({
        path: '/game/series/add',
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