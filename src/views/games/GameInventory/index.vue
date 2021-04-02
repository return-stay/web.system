<template>
  <div class="cs-box">
    <div class="title">
      <span class="title-text">游戏盘库存</span>
      <span class="title-add" @click="add"><i class="el-icon-plus"></i>添加游戏盘</span>
    </div>
    <div class="search-box">
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
        <div class="search-form-line">
          <el-form-item label="盘编号：">
            <div class="search-form-line">
              <!-- <el-select size="small" v-model="ruleForm.region" placeholder="请选择">
                <el-option label="全部" value="0"></el-option>
              </el-select> -->
              <el-form-item prop="sn" style="margin-bottom: 0;">
                <el-input size="small" style="width: 194px;" placeholder="请输入盘编号" v-model="ruleForm.sn"></el-input>
              </el-form-item>
            </div>
          </el-form-item>
          <el-form-item label="游戏名称："  prop="gnm">
            <div class="search-form-line">
              <el-input size="small" style="width: 194px;" placeholder="请输入游戏名称" v-model="ruleForm.gnm"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="状态：" prop="st">
            <el-select size="small" v-model="ruleForm.st" placeholder="请选择状态" @change="stateChange">
              <el-option label="全部" :value="-1"></el-option>
              <el-option v-for="item in discStateLst" :key="item.value" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="search-form-line">
          <el-form-item label="平台：" prop="pid">
            <el-select size="small" v-model="ruleForm.pid" placeholder="请选择平台">
              <el-option label="全部" :value="0"></el-option>
              <el-option v-for="item in platformList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="货架号：" prop="sf">
            <el-input size="small" style="width: 194px;" placeholder="请输入货架号" v-model="ruleForm.sf"></el-input>
          </el-form-item>
        </div>
        <div class="search-form-line">
          <el-form-item label="区域版本：" prop="aid">
            <el-select size="small" v-model="ruleForm.aid" placeholder="请选择区域版本">
              <el-option label="全部" value="0"></el-option>
              <el-option v-for="item in areaList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="语言：" prop="lid">
            <el-select size="small" v-model="ruleForm.lid" placeholder="请选择语言">
              <el-option label="全部" :value="0"></el-option>
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
      <Tabs ref="tabs" @change='tabsChange' :tabsList="tabslist" :action='tabAction' />
    </div>

    <div class="table-box">
      <el-table
        :data="tableData"
        style="width: 100%"
        ref="multipleTable"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="serial"
          label="盘编号"
          width="100">
        </el-table-column>
        <el-table-column
          label="游戏">
          <template slot-scope="{row}">
            <div class="table-games" @click="goGameDetail(row.game_id)">
              <div class="table-games-l">
                <ImageLarger :src="row.cover" />
              </div>
              <div class="table-games-r">
                <p>{{row.platform_name}}  {{row.name}}</p>
                <p>{{row.area_name}}  {{row.language_name}}</p>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="shelves"
          label="货架号">
        </el-table-column>
        <el-table-column
          prop="disc_no"
          label="奖杯编号">
        </el-table-column>
        <el-table-column
          prop="cost"
          label="成本价"
          width="100">
          <template slot-scope="{row}">
            <span>{{Number(((row.cost || 0)/100).toFixed(2))}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="order_memo"
          label="备注">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态"
          width="130">
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
            <template v-if="row.status === '正常'">
              <el-divider direction="vertical"></el-divider>
              <el-popconfirm
                v-if="row.active"
                title="确定停用该游戏盘吗？"
                @onConfirm="offTheShelf(row)"
              >
                <span slot="reference" class="text-cursor">停用</span>
              </el-popconfirm>
              <el-popconfirm
                v-else
                title="确定启用该游戏盘吗？"
                @onConfirm="putShelves(row)"
              >
                <span slot="reference" class="text-cursor">启用</span>
              </el-popconfirm>
            </template>
            
          </template>
        </el-table-column>
      </el-table>

      <BatchOperation 
        @pageAll="pageAll" 
        @batchOffShelves="batchOffShelves"
        offText="停用"
      >
        <span @click="batchShelves">启用</span>
       </BatchOperation>

      <Pagination :limit="limit" :total="totalNumber" @pagination="pagination" />
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import Tabs from '@/components/Tabs'
import tableMixins from '@/mixins/tableMixins'
import {DiscListDat, 
  BaseSortLst, 
  BaseAreaLst,
  BaseLanguageLst,
  BasePlatformLst,
  BaseDefinesortLst,
  BaseGroupLst,
  BaseGameCompanyLst,
  DiscOnSet,
  DiscOffSet,
  BaseDiscStateLst,
  } from '@/api/api'
import {getList} from '@/utils/data'
import moment from 'moment'
import ImageLarger from '@/components/ImageLarger'
import BatchOperation from '@/components/BatchOperation'
import {stopOrEnableRequest} from '@/utils'
export default {
  name: 'GameInventory',
  components: { Tabs, Pagination, ImageLarger, BatchOperation },
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
      discStateLst: [],
      urls: {
        list: DiscListDat,
      },
      ruleForm: {
        pid: '',
        gnm: null,
        st: null,
      },
      tabAction: -1,
      tabslist: [],
    }
  },
  mounted() {
    this.getSearchListInit()
  },
  methods: {
    resetSearchForm(formName) {
      this.$refs[formName].resetFields();
      this.getList()
    },
    stateChange(e) {
      this.$refs.tabs.tabclick({
        key: e
      })
    },
    tabsChange(e) {
      this.ruleForm.st = e.key
      this.search(this.ruleForm)
    },
    async getSearchListInit() {
      this.sortList = await getList(BaseSortLst)
      this.areaList =  await getList(BaseAreaLst)
      this.languageList = await getList(BaseLanguageLst)
      this.platformList = await getList(BasePlatformLst)
      this.definesortList = await getList(BaseDefinesortLst)
      this.groupList = await getList(BaseGroupLst)
      this.gameCompanyLst = await getList(BaseGameCompanyLst)
      let stateList = await getList(BaseDiscStateLst)
      this.discStateLst = stateList
      let arr = [{ key: -1, label: '全部', value: '全部' },]
      for(let i = 0;i<stateList.length;i++) {
        arr.push({
          key: stateList[i].value,
          value: stateList[i].name,
          label:stateList[i].name
        })
      }
      this.tabslist = arr
    },
    add() {
      this.$router.push({
        path: '/game/inventory/add'
      })
    },
    edit(row) {
      this.$router.push({
        path: '/game/inventory/edit/' + row.id,
        query: {serial: row.serial}
      })
    },
    offTheShelf(row) {
      stopOrEnableRequest({
        url: DiscOffSet,
        data: {id: row.id},
        successText: '下架成功',
      }, () => {
        this.getList()
      })
    },
    putShelves(row) {
      stopOrEnableRequest({
        url: DiscOnSet,
        data: {id: row.id},
        successText: '上架成功',
      }, () => {
        this.getList()
      })
    },
    // 批量下架
    batchOffShelves() {
      let ids = this.batchProcessing()
      if(ids.length>0) {
        this.stopRequest(ids)
      }
    },
  }
}
</script>

<style lang="scss">
@import '../index.scss';
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