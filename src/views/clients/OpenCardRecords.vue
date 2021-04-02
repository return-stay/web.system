<template>
  <div class="cs-box">
    <div class="title">
      <span class="title-text">卡开记录</span>
    </div>
    <div class="search-box">
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
        <el-form-item label="搜索条件：" prop="um">
          <!-- <el-col :span="6">
            <el-select v-model="ruleForm.region" placeholder="请选择">
              <el-option label="全部" value="0"></el-option>
            </el-select>
          </el-col> -->
          <el-col :span="6">
            <el-input v-model="ruleForm.um"></el-input>
          </el-col>
        </el-form-item>
        <el-row>
          <el-form-item label="来源渠道：" prop="ch">
            <el-col :span="6">
              <el-select v-model="ruleForm.ch" placeholder="请选择渠道">
                <el-option v-for="item in channelList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
              </el-col>
              <el-col :span="10">
                <el-form-item label="开卡类型：" prop="ct">
                  <el-select v-model="ruleForm.ct" placeholder="请选择渠道">
                    <el-option label="年卡" value="1"></el-option>
                    <el-option label="季卡" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
          </el-form-item>
        </el-row>
        <el-form-item label="开卡时间：">
          <el-col :span="6">
            <el-form-item prop="s_time">
              <el-date-picker type="date" placeholder="选择时间" v-model="ruleForm.s_time" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="1">至</el-col>
          <el-col :span="6">
            <el-form-item prop="e_time">
              <el-date-picker type="date" placeholder="选择时间" v-model="ruleForm.e_time" style="width: 100%;"></el-date-picker>
            </el-form-item> 
          </el-col>
        </el-form-item>
        <el-form-item label="">
          <el-button type="primary" @click="onSearchSubmit('ruleForm')">筛选</el-button>
          <el-button type="text" @click="resetSearchForm('ruleForm')">清空筛选</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-box">
      <el-table
        :data="tableData"
        @sort-change="sortTableChange"
        style="width: 100%">
        <el-table-column
          prop="card_no"
          label="开卡编号"
          align="center"
          width="120">
        </el-table-column>
        <el-table-column
          prop="username"
          label="客户信息"
          align="center"
          width="300">
          <template slot-scope="{row}">
            <div class="table-user" style="text-align: left;">
              <div class="table-user-l"></div>
              <div class="table-user-r">
                <p>微信昵称：{{row.username}}</p>
                <p>收货手机号：{{row.mobile||'17600112792'}}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="card_type"
          align="center"
          label="开卡类型">
          <template slot-scope="{row}">
            <div v-if="row.card_type === 1">年卡</div>
            <div v-if="row.card_type === 2">季卡</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="card_end_time"
          align="center"
          label="开卡后有效期"
          width="170">
          <template slot-scope="{row}">
            <div>
              {{moment(row.card_end_time).format("YYYY-MM-DD HH:mm:ss")}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="total_fee"
          align="center"
          label="消费金额"
          sortable
          width="100">
          <template slot-scope="{row}">
            <div>
              {{Number((row.total_fee/100).toFixed(2))}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="channel_name"
          align="center"
          label="来源渠道"
          width="100">
        </el-table-column>
        <el-table-column
          prop="create_time"
          align="center"
          label="开卡时间"
          sortable
          width="170">
          <template slot-scope="{row}">
            <div>
              {{moment(row.create_time).format("YYYY-MM-DD HH:mm:ss")}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <div>
              <span class="text-cursor" @click="detail(scope.row)">详情</span>
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
import { UserVipFeeLst, BaseChannelLst } from '@/api/api'
import tableMixins from '@/mixins/tableMixins'
import Pagination from '@/components/Pagination'
import moment from 'moment'
import { getList } from '@/utils/data'
export default {
  name: 'OpenCardRecords',
  components: { Tabs, Pagination },
  mixins: [ tableMixins ],
  data() {
    return {
      moment: moment,
      ruleForm: {
        um: '',
        ch: '',
        ct: '',
        s_time: '',
        e_time: '',
      },
      urls: {
        list: UserVipFeeLst,
      },
      channelList: [],
    }
  },
  mounted() {
    this.getSearchListInit()
  },
  methods: {
    detail(row) {
      this.$router.push({
        path: '/clients/detail/' + row.user_id
      })
    },

    async getSearchListInit () {
      this.channelList = await getList(BaseChannelLst)
    }
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
  .table-user {
    display: flex;
    &-l {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
    &-r {
      flex: 1;
    }
  }
}
</style>