<template>
  <div class="cs-box">
    <div class="title">
      <span class="title-text">游戏盘库存</span>
      <span class="title-add" @click="add"><i class="el-icon-plus"></i>添加游戏盘</span>
    </div>
    <div class="search-box">
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
        <div class="search-form-line">
          <el-form-item label="商品搜索：">
            <div class="search-form-line">
              <!-- <el-select size="small" v-model="ruleForm.region" placeholder="请选择">
                <el-option label="全部" value="0"></el-option>
              </el-select> -->
              <el-form-item prop="key" style="margin-bottom: 0;">
                <el-input size="small" style="width: 194px;margin-left: 10px;" v-model="ruleForm.key"></el-input>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select size="small" v-model="ruleForm.st" placeholder="请选择状态">
              <el-option label="全部" value="0"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="search-form-line">
          <el-form-item label="平台：" prop="pid">
            <el-select size="small" v-model="ruleForm.pid" placeholder="请选择平台">
              <el-option v-for="item in platformList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="货架号：">
            <el-select size="small" v-model="ruleForm.sf" placeholder="请选择游戏类型">
              <el-option label="全部" value="0"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="search-form-line">
          <el-form-item label="区域版本：">
            <el-select size="small" v-model="ruleForm.aid" placeholder="请选择区域版本">
              <el-option label="全部" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="语言：">
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
          prop="id"
          label="盘编号"
          width="80">
        </el-table-column>
        <el-table-column
          prop="name"
          label="游戏"
          width="180">
        </el-table-column>
        <el-table-column
          prop="shelves_id"
          label="货架号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="disc_no"
          label="奖杯编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="cost"
          label="成本价"
          width="100">
          <template slot-scope="{row}">
            <span>{{Number((row.cost/100).toFixed(2))}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="order_memo"
          label="备注"
          width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="180">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="添加时间"
          width="180">
          <template slot-scope="{row}">
            <span>{{moment(row.create_time).format('YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          width="120">
          <template slot-scope="{row}">
            <span class="text-cursor" @click="edit(row)">编辑</span>
            <el-divider direction="vertical"></el-divider>
            <span class="text-cursor">下架</span>
          </template>
        </el-table-column>
      </el-table>

      <Pagination :total="totalNumber" @pagination="pagination" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import Tabs from '@/components/Tabs'
import tableMixins from '@/mixins/tableMixins'
import {DiscListDat, BaseSortLst, BaseAreaLst,BaseLanguageLst,BasePlatformLst,BaseDefinesortLst,BaseGroupLst,BaseGameCompanyLst} from '@/api/api'
import {getList} from '@/utils/data'
import moment from 'moment'
export default {
  name: 'GameInventory',
  components: { Tabs, Pagination },
  mixins: [tableMixins],
  data() {
    return {
      moment: moment,
      sortList: [],
      areaList: [],
      languageList: [],
      platformList: [],
      definesortList: [],
      groupList: [],
      gameCompanyLst: [],
      urls: {
        list: DiscListDat,
      },
      ruleForm: {
        pid: '',
      },
      tabAction: 0,
      tabslist: [
        { key: 0, label: '全部', value: '全部' },
        { key: 1, label: '库存中', value: '库存中' },
        { key: 2, label: '无库存', value: '无库存' },
      ],
    }
  },
  mounted() {
    this.getSearchListInit()
  },
  methods: {
    tabsChange() {},
    async getSearchListInit() {
      this.sortList = await getList(BaseSortLst)
      this.areaList =  await getList(BaseAreaLst)
      this.languageList = await getList(BaseLanguageLst)
      this.platformList = await getList(BasePlatformLst)
      this.definesortList = await getList(BaseDefinesortLst)
      this.groupList = await getList(BaseGroupLst)
      this.gameCompanyLst = await getList(BaseGameCompanyLst)
    },
    add() {
      this.$router.push({
        path: '/game/inventory/add'
      })
    },
    edit(row) {
      this.$router.push({
        path: '/game/inventory/add',
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