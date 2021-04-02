<template>
  <div class="cs-box">
    <div class="title">
      <span class="title-text">查询</span>
    </div>
    <div class="search-box">
      <el-form ref="ruleForm" :rules="rules" :model="ruleForm" label-width="100px">
        <el-form-item label="搜索条件：">
          <el-col :span="7">
            <el-select style="width: 100%;" v-model="searchType" placeholder="请选择" @change="searchChange">
              <el-option label="用户名" :value="0" :key="0"></el-option>
              <el-option label="手机号" :value="1" :key="1"></el-option>
            </el-select>
          </el-col>
          <!-- <el-col class="line" :span="1">至</el-col> -->
          <el-col :span="7" style="margin-left: 20px;">
            <el-form-item prop="un" v-if="searchType === 0">
              <el-input v-model="ruleForm.un" placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item prop="um" v-if="searchType === 1">
              <el-input v-model="ruleForm.um" placeholder="请输入收货手机号"></el-input>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="渠道：" prop="ch">
          <el-col :span="7">
            <el-select v-model="ruleForm.ch" style="width: 100%;" placeholder="请选择渠道">
              <el-option v-for="item in channelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item label="付费时间：">
          <el-col :span="7">
            <el-form-item prop="pstime">
              <el-date-picker type="date" placeholder="选择时间" v-model="ruleForm.pstime" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">至</el-col>
          <el-col :span="7">
            <el-form-item prop="petime">
              <el-date-picker type="date" placeholder="选择时间" v-model="ruleForm.petime" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
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
          align="center">
          <template slot-scope="{row}">
            <div>
              <div></div>
              <div style="text-align: left;">
                <div><span>微信昵称：</span><span>{{row.nickname}}</span></div>
                <div><span>收货手机号：</span><span>{{row.mobile}}</span></div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          align="center"
          label="账户余额">
          <template slot-scope="{row}">
            <div style="text-align: right;">
              <div>{{Number(((row.froze_balance/100).toFixed(2)))}}元</div>
              <div>押金{{Number(((row.free_balance/100).toFixed(2)))}}元</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          align="center"
          label="畅玩卡/有效期">
          <template slot-scope="{row}">
            <div style="text-align: left;">
              <div v-if="newTime>row.start_time && newTime<row.end_time">可用</div>
              <div v-else>不可用</div>
              <div>
                {{moment(row.paid_time).format("YYYY-MM-DD")}} 前可用
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="total_fee"
          align="center"
          label="累计消费金额">
        </el-table-column>
        <el-table-column
          prop="fee_times"
          align="center"
          label="消费次数">
        </el-table-column>
        <el-table-column
          prop=""
          align="center"
          label="上次消费时间"
          width="170">
          <template slot-scope="{row}">
            <div>
              {{moment(row.paid_time).format("YYYY-MM-DD HH:mm:ss")}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="create_time"
          align="center"
          label="注册时间"
          width="170">
          <template slot-scope="scope">
            <div>
              {{moment(scope.row.reg_time).format("YYYY-MM-DD HH:mm:ss")}}
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
              <span class="text-cursor" @click="detail(scope.row)">详情</span>
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
import {UserListDat, BaseChannelLst} from '@/api/api'
import {getAjax} from '@/utils/ajax'
import Pagination from '@/components/Pagination'
import tableMixins from '@/mixins/tableMixins'
import moment from 'moment'
export default {
  name: 'ClientsSearch',
  components: { Tabs, Pagination },
  mixins: [tableMixins],
  data() {
    return {
      moment,
      searchType: 0,
      rules: {

      },
      newTime: new Date().getTime(),
      ruleForm: {
        un: '',
        um: null,
        ch: '',
        pstime: '',
        petime: '',
      },
      urls: {list: UserListDat},
      channelList: [],
      tabAction: 0,
      tabslist: [],
    }
  },
  mounted() {
    this.getChannelList()
  },
  methods: {
    searchChange(e) {
      this.searchType = e
      this.ruleForm.un = ''
      this.ruleForm.um = null
    },
    tabsChange(e) {
      console.log(e)
      this.tabAction = e.key
    },
    detail(row) {
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