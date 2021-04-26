<template>
  <div class="cs-box">
    <div class="title">
      <span class="title-text">查询</span>
    </div>
    <div class="search-box">
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
        <div class="search-form-line">
          <el-form-item label="游戏名称：" prop="name">
            <el-input size="small" style="width: 194px;" v-model="ruleForm.name" placeholder="请输入游戏名称"></el-input>
          </el-form-item>
          <el-form-item label="奖杯编码：" prop="disc_no">
            <el-input size="small" style="width: 194px;" v-model="ruleForm.disc_no" placeholder="请输入奖杯编码"></el-input>
          </el-form-item>
          <el-form-item label="状态：" prop="status">
            <el-select size="small" v-model="ruleForm.status" placeholder="请选择状态">
              <el-option label="全部" :value="-1"></el-option>
              <el-option label="已上架" :value="1"></el-option>
              <el-option label="已下架" :value="0"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="search-form-line">
          <el-form-item label="平台：" prop="platform_id">
            <el-select size="small" v-model="ruleForm.platform_id" placeholder="请选择平台">
              <el-option label="全部" :value="0"></el-option>
              <el-option v-for="item in platformList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="游戏类型：" prop="sort_id">
            <el-select size="small" v-model="ruleForm.sort_id" placeholder="请选择游戏类型">
              <el-option label="全部" :value="0"></el-option>
              <el-option v-for="item in sortList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属系列：" prop="group_id">
            <el-select size="small" v-model="ruleForm.group_id" placeholder="请选择所属系列">
              <el-option label="全部" :value="0"></el-option>
              <el-option v-for="item in groupList" :key="item.id" :label="item.name" :value="item.id"></el-option>  
            </el-select>
          </el-form-item>
        </div>
        <div class="search-form-line">
          <el-form-item label="区域版本：" prop="area_id">
            <el-select size="small" v-model="ruleForm.area_id" placeholder="请选择区域版本">
              <el-option label="全部" :value="0"></el-option>
              <el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="语言：" prop="language_id">
            <el-select size="small" v-model="ruleForm.language_id" placeholder="请选择语言">
              <el-option label="全部" :value="0"></el-option>
              <el-option v-for="item in languageList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容分类：" prop="define_sort_id">
            <el-select size="small" v-model="ruleForm.define_sort_id" placeholder="请选择内容分类">
              <el-option label="全部" :value="0"></el-option>
              <el-option v-for="item in definesortList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="search-form-line">
          <el-form-item label="奖杯完成度：" prop="level">
            <el-select size="small" v-model="ruleForm.level" placeholder="请选择奖杯完成度">
              <el-option label="全部" :value="0"></el-option>
              <el-option v-for="item in trophyLevelLst" :key="item.value" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开发公司：" prop="company_id">
            <el-select size="small" v-model="ruleForm.company_id" filterable placeholder="请选择开发公司">
              <el-option label="全部" :value="0"></el-option>
              <el-option v-for="item in gameCompanyLst" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item label="发行时间：">
          <div class="search-form-line">
            <el-form-item prop="publish_start_time">
              <el-date-picker size="small" type="datetime"
                default-time="00:00:00" placeholder="选择时间" v-model="ruleForm.publish_start_time" style="width: 200px;" />
            </el-form-item>
            <span style="margin: 0 8px;">至</span>
            <el-form-item prop="publish_end_time">
              <el-date-picker size="small" type="datetime"
                default-time="23:59:59" placeholder="选择时间" v-model="ruleForm.publish_end_time" style="width: 200px;" />
            </el-form-item>
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
        ref="multipleTable"
        @selection-change="handleSelectionChange"
        @row-click="handleRowClick"
        style="width: 100%">
         <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="disc_no"
          align="center"
          label="奖杯编号"
          width="100">
        </el-table-column>
        <el-table-column
          align="center"
          label="游戏">
          <template slot-scope="{row}">
            <div class="table-games">
              <div class="table-games-l">
                <ImageLarger :src="row.cover" imgstyle="height: 100%;" />
              </div>
              <div class="table-games-r">
                <p>{{row.platform_name}}  {{row.view_name}}</p>
                <p>{{row.area_name}}  {{row.language_name}}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="level_name"
          align="center"
          label="奖杯完成度"
          width="120">
          <template slot-scope="{row}">
            <span v-if="row.level === 1">神作</span>
            <span v-else-if="row.level === 2">极易</span>
            <span v-else-if="row.level === 3">容易</span>
            <span v-else-if="row.level === 4">普通</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="sort_name"
          align="center"
          label="类型/系列"
          width="200">
          <template  slot-scope="{row}">
            <div>
              <p>{{row.sort_name}}</p>
              <p style="cursor: pointer;" @click="goGruopInfo(row)">{{row.group_name}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="company_name"
          align="center"
          label="开发公司"
          width="120">
        </el-table-column>
        <el-table-column
          prop="deposit"
          align="center"
          label="押金"
          width="100">
          <template slot-scope="{row}">
            <span>{{Number(((row.deposit/100).toFixed(2)))}}元</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="day_rent"
          align="center"
          label="日租金"
          width="80">
          <template slot-scope="{row}">
            <span>{{Number(((row.day_rent/100).toFixed(2)))}}元</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="disc_count"
          align="center"
          label="库存"
          width="80">
        </el-table-column>
        <el-table-column
          prop="create_time"
          align="center"
          label="创建时间"
          width="170">
          <template slot-scope="{row}">
            <span v-if="row.create_time">{{moment(row.create_time).format('YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          align="center"
          label="操作"
          width="220">
          <div slot-scope="{row}" @click.stop="stopRow">
            <span class="text-cursor" @click="modifyPrice(row)">调价</span>
            <el-divider direction="vertical"></el-divider>
            <span class="text-cursor" @click="stock(row)">库存</span>
            <el-divider direction="vertical"></el-divider>
            <span class="text-cursor" @click="detail(row)">详情</span>
            <el-divider direction="vertical"></el-divider>
            <el-popconfirm
                v-if="row.active"
                title="确定下架该游戏吗？"
                @onConfirm="offTheShelf(row)"
              >
                <span slot="reference" class="text-cursor">下架</span>
              </el-popconfirm>
              <el-popconfirm
                v-else
                title="确定上架该游戏吗？"
                @onConfirm="putShelves(row)"
              >
                <span slot="reference" class="text-cursor">上架</span>
              </el-popconfirm>
          </div>
        </el-table-column>
      </el-table>
      <BatchOperation 
        @pageAll="pageAll" 
        @cancelChoice="cancelChoice"
        @batchOffShelves="batchOffShelves"
        @batchShelves="batchShelves"
       >
        <span @click="selectSubject">加专题</span>
        <span @click="selectSeries">加系列</span>
       </BatchOperation>

      <Pagination :limit="limit" :total="totalNumber" @pagination="pagination" />

      <!-- 选择专题  选择系列 -->
      <SelectGameType ref="gameType" @typecallback="typecallback" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import BatchOperation from '@/components/BatchOperation'
import Tabs from '@/components/Tabs'
import {
  GameListDat,
  GameOffset, 
  GameOnset, 
  BaseSortLst,
  BaseAreaLst,
  BaseLanguageLst,
  BasePlatformLst,
  BaseDefinesortLst,
  BaseGroupLst,
  BaseTrophyLevelLst,
  BaseGameCompanyLst,
  GameGroupSet,
  TopicInfoGamesSet,
  } from '@/api/api'
import tableMixins from '@/mixins/tableMixins'
import { getStoreList } from '@/utils/data'
import moment from 'moment'
import { stopOrEnableRequest, postAjax } from '@/utils/ajax'
import ImageLarger from '@/components/ImageLarger'
import SelectGameType from './SelectGameType'
import ajax from '@/utils/request'
import {stopPropagation} from '@/utils'
export default {
  name: 'GameSearch',
  components: { Tabs, Pagination, ImageLarger, BatchOperation, SelectGameType },
  mixins: [tableMixins],
  data() {
    return {
      moment,
      urls: { list: GameListDat, typeJson: 'json' },
      ruleForm: {
        name: '',
        disc_no: null,
        platform_id: null,
        language_id: '',
        sort_id: null,
        group_id: null,
        area_id: null,
        language_id: null,
        define_sort_id: null,
        level: null,
        status: null,
        company_id: null,
        publish_start_time: null,
        publish_end_time: null,
      },
      sortList: [],
      areaList: [],
      languageList: [],
      platformList: [],
      definesortList: [],
      groupList: [],
      gameCompanyLst: [],
      trophyLevelLst: [],
      tabAction: -1,
      tabslist: [
        { key: -1, label: '全部', value: '全部' },
        { key: 1, label: '库存中', value: '库存中' },
        { key: 0, label: '无库存', value: '无库存' },
      ],
    }
  },
  mounted() {
    this.getSearchListInit()
  },
  methods: {
    stopRow(e) {
      stopPropagation(e)
    },
    async getSearchListInit() {
      this.sortList = await getStoreList(BaseSortLst)
      this.areaList =  await getStoreList(BaseAreaLst)
      this.languageList = await getStoreList(BaseLanguageLst)
      this.platformList = await getStoreList(BasePlatformLst)
      this.definesortList = await getStoreList(BaseDefinesortLst)
      this.groupList = await getStoreList(BaseGroupLst)
      this.gameCompanyLst = await getStoreList(BaseGameCompanyLst)
      this.trophyLevelLst = await getStoreList(BaseTrophyLevelLst)

    },

    tabsChange(e) {
      this.tabSearch({
        ivt: e.key
      })
    },
    modifyPrice(row) {
      this.$router.push({
        path: '/game/detail/' + row.id,
        query: {type: 'price'}
      })
    },
    stock(row) {
      this.$router.push({
        path: '/game/detail/' + row.id,
        query: {type: 'stock'}
      })
    },
    detail(row) {
      this.$router.push({
        path: '/game/detail/' + row.id,
        query: {type: 'detail'}
      })
    },
    offTheShelf(row) {
      stopOrEnableRequest({
        url: GameOffset,
        data: {ids: row.id},
        successText: '下架成功',
      }, () => {
        this.getList()
      })
    },
    putShelves(row) {
      stopOrEnableRequest({
        url: GameOnset,
        data: {ids: row.id},
        successText: '上架成功',
      }, () => {
        this.getList()
      })
    },
    // 添加系列 添加专题 type == subject :专题  series：系列
    typecallback(row) {
      console.log(row)
      if(row.type ==='series') {
        this.batchAddSeries(row.id)
      }else if(row.type ==='subject') {
        this.batchSubject(row.id)
      }
    },
    // 批量添加系列请求
    batchAddSeries(id) {
      let gameids = this.batchProcessing()
      postAjax({
        url: GameGroupSet,
        data: {
          id: id,
          gms: gameids.join(',')
        },
      }).then(res=> {
        if(res.code === 1) {
          this.$message.success('添加成功')
        }
      })
    },
    // 添加专题请求
    batchSubject(id) {
      let fd = new FormData(), messageText = '添加成功'
      fd.append('id', id)
      let gameids = this.batchProcessing()
      fd.append('gms', gameids.join('-'))
      ajax({
        method: 'post',
        formdata: true,
        // url: TopicInfoSet,
        url: TopicInfoGamesSet,
        data: fd,
        headers: {
          'Content-Type': 'multipart/form-data', // 关键
        },
      }).then(res=> {
        if(res.code === 1) {
          this.$message.success(messageText)
        }
      })
    },
    // 去系列详情
    goGruopInfo(row) {
      this.$router.push({
        path: '/game/series/add',
        query: {id: row.group_id}
      })
    },
  }
}
</script>
<style lang="scss">
@import './index.scss';
</style>
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