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
      <table-page 
        :urls="{list: UserListDat,}"
        :border="false"
        :columns="columns"
        @operation="operation" />
    </div>
  </div>
</template>

<script>
import TablePage from '@/components/TablePage'
import Tabs from '@/components/Tabs'
import {UserListDat, BaseChannelLst} from '@/api/api'
import {getAjax} from '@/utils/ajax'
export default {
  name: 'ClientsSearch',
  components: { TablePage, Tabs },
  data() {
    return {
      ruleForm: {
        um: '',
        ch: '',
        pstime: '',
        petime: '',
      },
      UserListDat: UserListDat,
      channelList: [],
      tabAction: 0,
      tabslist: [
        { key: 0, label: '全部', value: '全部' },
        { key: 1, label: '畅玩卡用户', value: '畅玩卡用户' },
        { key: 2, label: '非畅玩卡用户', value: '非畅玩卡用户' },
      ],
      columns: [
        {
          title: '客户编号',
          key: 'id',
          label: 'id',
          width: 100,
        },
        {
          title: '客户信息',
          key: 'nickname',
          label: 'nickname',
          width: 240,
        },
         {
          title: '账户余额',
          key: 'age',
          label: 'age',
          width: 240,
        },
        {
          title: '畅玩卡/有效期',
          key: 'age',
          label: 'age',
          width: 240,
        },
        {
          title: '累计消费金额',
          key: 'total_fee',
          label: 'total_fee',
          width: 140,
        },
        {
          title: '消费次数',
          key: 'fee_times',
          label: 'fee_times',
          width: 100,
        },
        {
          title: '上次消费时间',
          key: 'age',
          label: 'age',
          width: 240,
          sort: true,
        },
        {
          title: '注册时间',
          key: 'age',
          label: 'age',
          width: 240,
          sort: true,
        },
        {
          title: '操作',
          key: 'lll',
          fixed: 'right',
          width: 100,
          render: [
            {
              fnName: 'operation',
              title: '详情'
            }
          ]
        }
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