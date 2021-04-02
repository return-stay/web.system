<template>
  <div class="cs-box">
    <div class="title">
      <span class="title-text">奖杯管理</span>
      <span class="title-add" @click="add"><i class="el-icon-plus"></i>添加新奖杯</span>
    </div>
    <div class="search-box">
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
        <div class="search-form-line">
          <el-form-item label="奖杯编号：" prop="region">
            <!-- <div class="search-form-line">
              <el-select size="small" v-model="ruleForm.region" placeholder="请选择">
                <el-option label="全部" value="0"></el-option>
              </el-select>
            </div> -->
            <el-form-item prop="dn" style="margin-bottom: 0;">
              <el-input size="small" style="width: 194px;" placeholder="请输入编号" v-model="ruleForm.dn"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item label="游戏名称：" prop="nm" style="margin-bottom: 0;">
            <el-input size="small" style="width: 194px;" placeholder="请输入游戏名称" v-model="ruleForm.nm"></el-input>
          </el-form-item>
        </div>
        <div class="search-form-line">
          <el-form-item label="奖杯完成度：" prop="l">
            <el-select size="small" v-model="ruleForm.l" placeholder="请选择奖杯完成度">
              <el-option v-for="item in trophyLevelLst" :key="item.value" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开发公司：" prop="cid">
            <el-select size="small" v-model="ruleForm.cid" placeholder="请选择开发公司">
              <el-option v-for="item in gameCompanyLst" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="search-form-line">
          <el-form-item label="平台：" prop="pid">
            <el-select size="small" v-model="ruleForm.pid" placeholder="请选择平台">
              <el-option v-for="item in platformList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="游戏类型：" prop="sid">
            <el-select size="small" v-model="ruleForm.sid" placeholder="请选择游戏类型">
              <el-option v-for="item in sortList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="search-form-line">
          <el-form-item label="区域版本：" prop="aid">
            <el-select size="small" v-model="ruleForm.aid" placeholder="请选择区域版本">
              <el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="语言：" prop="lid">
            <el-select size="small" v-model="ruleForm.lid" placeholder="请选择语言">
              <el-option v-for="item in languageList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
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
          prop="disc_no"
          label="奖杯编号">
        </el-table-column>
        <!-- <el-table-column
          prop="view_name"
          label="关联游戏">
          <template slot-scope="{row}">
            <span v-if="row.game_info">{{row.game_info.name}}</span>
          </template>
        </el-table-column> -->
        <el-table-column
          prop="level_name"
          label="奖杯完成度">
        </el-table-column>
        <el-table-column
          prop=""
          label="奖杯数量">
          <template slot-scope="{row}">
            <span v-if="row.platinum">白{{row.platinum}} </span>
            <span v-if="row.gold">&nbsp;金{{row.gold}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="update_time"
          label="创建时间">
          <template slot-scope="{row}">
            <span>{{moment(row.update_time).format('YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          width="120">
          <template slot-scope="{row}">
            <span class="text-cursor" @click="edit(row)">编辑</span>
            <el-divider direction="vertical"></el-divider>
            <el-popconfirm
              v-if="row.active"
              title="确定停用该图片位吗？"
              @onConfirm="stopUsing(row)"
            >
              <span slot="reference" class="text-cursor">停用</span>
            </el-popconfirm>
            <el-popconfirm
              v-else
              title="确定启用该图片位吗？"
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
import { 
  GameTrophyLst,
  BaseSortLst,
  BaseAreaLst,
  BaseLanguageLst,
  BasePlatformLst,
  BaseGameCompanyLst,
  BaseTrophyLevelLst,
  GameTrophyOnSet,
  GameTrophyOffSet,
} from '@/api/api'
import tableMixins from '@/mixins/tableMixins'
import Tabs from '@/components/Tabs'
import moment from 'moment'
import { getList } from '@/utils/data'
import Pagination from '@/components/Pagination'
import {stopOrEnableRequest} from '@/utils/ajax'
export default {
  name: 'TrophyManage',
  components: { Tabs, Pagination },
  mixins: [tableMixins],
  data() {
    return {
      moment,
      trophyLevelLst: [],
      urls: {
        list: GameTrophyLst,
        methods: "post",
      },
      ruleForm: {
        l: null,
        dn: '',
        cid: null,
        pid: null,
        sid: null,
        aid: null,
        lid: null,
      },
      tabAction: -1,
      tabslist: [
        { key: -1, label: '全部', value: '全部' },
        { key: 0, label: '信息不全', value: '信息不全' },
        { key: 1, label: '信息完整', value: '信息完整' },
      ],
      languageList: [],
      areaList: [],
      gameCompanyLst: [],
      platformList: [],
      sortList: [],
    }
  },
  mounted() {
    this.getSearchListInit()
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          return false;
        }
      });
    },
    async getSearchListInit() {
      this.sortList = await getList(BaseSortLst)
      this.areaList =  await getList(BaseAreaLst)
      this.languageList = await getList(BaseLanguageLst)
      this.platformList = await getList(BasePlatformLst)
      this.gameCompanyLst = await getList(BaseGameCompanyLst)
      this.trophyLevelLst = await getList(BaseTrophyLevelLst)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    tabsChange(e) {
      this.tabSearch({
        fi: e.key
      })
    },
    add() {
      this.$router.push({
        path: '/game/trophy/add'
      })
    },
    edit(row) {
      this.$router.push({
        path: '/game/trophy/add',
        query: {id: row.disc_no}
      })
    },
    stopUsing(row) {
      stopOrEnableRequest({
        url: GameTrophyOffSet,
        data: { dn: row.disc_no, gid: row.game_id || 0 },
        successText: '停用成功',
      }, () => {
        this.getList()
      })
    },
    enable(row) {
      stopOrEnableRequest({
        url: GameTrophyOnSet,
        data: { dn: row.disc_no, gid: row.game_id || 0 },
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