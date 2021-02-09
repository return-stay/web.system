<template>
  <div class="cs-box">
    <div class="title">
      <span class="title-text">查询</span>
    </div>
    <div class="search-box">
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
        <el-form-item label="搜索条件：">
          <!-- <el-col :span="7">
            <el-select v-model="ruleForm.um" style="width: 100%;" placeholder="请选择">
              <el-option label="全部" value="0"></el-option>
            </el-select>
          </el-col>
          <el-col class="line" :span="1">至</el-col> -->
          <el-col :span="7">
            <el-input v-model="ruleForm.um" placeholder="请输入用户名"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="渠道：">
          <el-col :span="7">
            <el-select v-model="ruleForm.ch" style="width: 100%;" placeholder="请选择渠道">
              <el-option v-for="item in channelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="付费时间：">
          <el-col :span="7">
            <el-date-picker type="date" placeholder="选择时间" v-model="ruleForm.pstime" style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">至</el-col>
          <el-col :span="7">
            <el-date-picker type="date" placeholder="选择时间" v-model="ruleForm.petime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="onSubmit('ruleForm')">筛选</el-button>
          <el-button type="text">清空筛选</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="tabs-box">
      <tabs @change='tabsChange' :tabsList="tabslist" :action='tabAction' />
    </div>

    <div class="table-box">
        <el-table
        :data="tableData"
        @sort-change="sortTableChange"
        style="width: 100%">
        <el-table-column
          prop="id"
          label="客户编号"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="nickname"
          label="客户信息"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="age"
          align="center"
          label="账户余额">
        </el-table-column>
        <el-table-column
          prop="game_num"
          align="center"
          label="畅玩卡/有效期"
          width="100">
        </el-table-column>
        
        <el-table-column
          prop="total_fee"
          align="center"
          label="累计消费金额"
          sortable
          width="170">
        </el-table-column>
        <el-table-column
          prop="fee_times"
          align="center"
          label="消费次数"
          width="170">
        </el-table-column>
        <el-table-column
          prop="fee_times"
          align="center"
          label="上次消费时间"
          width="170">
        </el-table-column>
        <el-table-column
          prop="create_time"
          align="center"
          label="注册时间"
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
              <span class="text-cursor" @click="operation(scope.row)">详情</span>
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
import {UserListDat, BaseChannelLst} from '@/api/api'
import {getAjax} from '@/utils/ajax'
import Pagination from '@/components/Pagination'
import tableMixins from '@/mixins/tableMixins'
export default {
  name: 'ClientsSearch',
  components: { Tabs, Pagination },
  mixins: [tableMixins],
  data() {
    return {

      ruleForm: {
        um: '',
        ch: '',
        pstime: '',
        petime: '',
      },
      urls: {list: UserListDat},
      channelList: [],
      tabAction: 0,
      tabslist: [
        { key: 0, label: '全部', value: '全部' },
        { key: 1, label: '畅玩卡用户', value: '畅玩卡用户' },
        { key: 2, label: '非畅玩卡用户', value: '非畅玩卡用户' },
      ],
    }
  },
  mounted() {
    this.getChannelList()
  },
  methods: {
    tabsChange(e) {
      console.log(e)
      this.tabAction = e.key
    },
    operation(row) {
      this.$router.push({
        path: '/clients/detail/' + row.id
      })
    },
    // 获取渠道列表
    getChannelList() {
      getAjax({
        url: BaseChannelLst,
      }).then(res=> {
        if(res.code === 1) {
          this.channelList = res.data
        }else {
          this.channelList = []
        }
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
  }
  .search-box {
    background-color: #F8F8F8;
    padding: 15px 15px 1px;
    .line {
      text-align: center;
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