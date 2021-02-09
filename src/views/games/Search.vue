<template>
  <div class="cs-box">
    <div class="title">
      <span class="title-text">查询</span>
    </div>
    <div class="search-box">
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
        <div class="search-form-line">
          <el-form-item label="搜索条件：" prop="name">
            <el-input size="small" style="width: 194px;" v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="状态：">
            <el-select size="small" v-model="ruleForm.disc_status" placeholder="请选择状态">
              <!-- <el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.id"></el-option> -->
            </el-select>
          </el-form-item>
        </div>
        <div class="search-form-line">
          <el-form-item label="平台：">
            <el-select size="small" v-model="ruleForm.platform_id" placeholder="请选择平台">
              <el-option v-for="item in platformList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="游戏类型：">
            <el-select size="small" v-model="ruleForm.group_id" placeholder="请选择游戏类型">
              <el-option v-for="item in sortList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属系列：">
            <el-select size="small" v-model="ruleForm.group" placeholder="请选择所属系列">
                <el-option v-for="item in groupList" :key="item.id" :label="item.name" :value="item.id"></el-option>  
            </el-select>
          </el-form-item>
        </div>
        <div class="search-form-line">
          <el-form-item label="区域版本：">
            <el-select size="small" v-model="ruleForm.area_id" placeholder="请选择区域版本">
              <el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="语言：">
            <el-select size="small" v-model="ruleForm.language_id" placeholder="请选择语言">
              <el-option v-for="item in languageList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容分类：">
            <el-select size="small" v-model="ruleForm.content_id" placeholder="请选择内容分类">
              <el-option v-for="item in definesortList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="search-form-line">
          <el-form-item label="奖杯完成度：">
            <el-select size="small" v-model="ruleForm.disc_no" placeholder="请选择奖杯完成度">
              <!-- <el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.id"></el-option> -->
            </el-select>
          </el-form-item>
          <el-form-item label="开发公司：">
            <el-select size="small" v-model="ruleForm.company_id" placeholder="请选择开发公司">
              <el-option v-for="item in gameCompanyLst" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="付费时间：">
          <div class="search-form-line">
            <el-date-picker size="small" type="date" placeholder="选择时间" v-model="ruleForm.publish_start_time" style="width: 194px;" />
            <span style="margin: 0 8px;">至</span>
            <el-date-picker size="small" type="date" placeholder="选择时间" v-model="ruleForm.publish_end_time" style="width: 194px;" />
          </div>
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
        style="width: 100%">
        <el-table-column
          prop="id"
          label="商品编号"
          width="180">
        </el-table-column>
        <el-table-column
          prop="view_name"
          label="游戏"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="奖杯完成度"
          width="180">
        </el-table-column>
        <el-table-column
          prop="sort_name"
          label="类型/系列"
          width="180">
        </el-table-column>
        <el-table-column
          prop="address"
          label="开发公司"
          width="180">
        </el-table-column>
        <el-table-column
          prop="deposit"
          label="押金"
          width="180">
        </el-table-column>
        <el-table-column
          prop="day_rent"
          label="日租金"
          width="180">
        </el-table-column>
        <el-table-column
          prop="disc_count"
          label="库存"
          width="180">
        </el-table-column>
        <el-table-column
          prop="create_time"
          label="创建时间"
          width="180">
          <template slot-scope="{row}">
            <span>{{moment(row.create_time).format('YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          width="220">
          <template slot-scope="{row}">
            <span class="text-cursor">调价</span>
            <el-divider direction="vertical"></el-divider>
            <span class="text-cursor">库存</span>
            <el-divider direction="vertical"></el-divider>
            <span class="text-cursor" @click="operation(row)">详情</span>
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
import GameTable from '@/components/TablePage/GameTable'
import Tabs from '@/components/Tabs'
import {GameListDat, BaseSortLst,BaseAreaLst,BaseLanguageLst,BasePlatformLst,BaseDefinesortLst,BaseGroupLst,BaseGameCompanyLst} from '@/api/api'
import tableMixins from '@/mixins/tableMixins'
import {getList} from '@/utils/data'
import moment from 'moment'
export default {
  name: 'GameSearch',
  components: { GameTable, Tabs, Pagination },
  mixins: [tableMixins],
  data() {
    return {
      moment,
      urls: { list: GameListDat,typeJson: 'json' },
      ruleForm: {
        name: '',
      },
      sortList: [],
      areaList: [],
      languageList: [],
      platformList: [],
      definesortList: [],
      groupList: [],
      gameCompanyLst: [],
      tableData: [{id: 0}],
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
    async getSearchListInit() {
      this.sortList = await getList(BaseSortLst)
      this.areaList =  await getList(BaseAreaLst)
      this.languageList = await getList(BaseLanguageLst)
      this.platformList = await getList(BasePlatformLst)
      this.definesortList = await getList(BaseDefinesortLst)
      this.groupList = await getList(BaseGroupLst)
      this.gameCompanyLst = await getList(BaseGameCompanyLst)
    },
    tabsChange() {},
    operation(row) {
      this.$router.push({
        path: '/game/detail/' + row.id
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