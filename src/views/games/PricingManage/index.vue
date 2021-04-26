<template>
  <div class="cs-box">
    <div class="title">
      <span class="title-text">价格调整</span>
      <span class="title-add" @click="add"><i class="el-icon-plus"></i>添加价格</span>
    </div>
    <div class="search-box">
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
        <div class="search-form-line">
          <el-form-item label="游戏名称：">
            <!-- <div class="search-form-line">
              <el-select size="small" v-model="ruleForm.region" placeholder="请选择">
                <el-option label="全部" value="0"></el-option>
              </el-select>
              
            </div> -->
            <el-form-item prop="nm" style="margin-bottom: 0;">
              <el-input size="small" style="width: 194px;" placeholder="请输入游戏名称" v-model="ruleForm.nm"></el-input>
            </el-form-item>
          </el-form-item>
          <el-form-item label="奖杯编码：" prop="dn" style="margin-bottom: 0;">
              <el-input size="small" style="width: 194px;" placeholder="请输入奖杯编码" v-model="ruleForm.dn"></el-input>
            </el-form-item>
          <!-- <el-form-item label="状态：" prop='st'>
            <el-select size="small" v-model="ruleForm.st" placeholder="请选择状态">
              <el-option label="全部" value="0"></el-option>
            </el-select>
          </el-form-item> -->
        </div>
        <div class="search-form-line">
          <el-form-item label="日租金范围：" prop="mindr">
            <div class="search-form-line">
              <el-input size="small" style="width: 194px;" placeholder="最低价" v-model="ruleForm.mindr">
                <span
                  style="color: #000;"
                  slot="suffix">元
                </span>
              </el-input>
              <span style="margin-left: 10px;">至</span>
              <el-form-item prop="maxdr" style="margin-bottom: 0;">
                <el-input size="small" style="width: 194px;margin-left: 10px;" placeholder="最高价" v-model="ruleForm.maxdr">
                  <span
                    style="color: #000;"
                    slot="suffix">元
                  </span>
                </el-input>
              </el-form-item>
            </div>
          </el-form-item>
        </div>
        <div class="search-form-line">
          <el-form-item label="押金范围：" prop="mind">
            <div class="search-form-line">
              <el-input size="small" style="width: 194px;" placeholder="最低价" v-model="ruleForm.mind">
                <span
                  style="color: #000;"
                  slot="suffix">元
                </span>
              </el-input>
              <span style="margin-left: 10px;">至</span>
              <el-form-item prop="maxd" style="margin-bottom: 0;">
                <el-input size="small" style="width: 194px;margin-left: 10px;" placeholder="最高价" v-model="ruleForm.maxd">
                  <span
                    style="color: #000;"
                    slot="suffix">元
                  </span>
                </el-input>
              </el-form-item>
            </div>
          </el-form-item>
        </div>
        <div class="search-form-line">
          <el-form-item label="平台：" prop="pid">
            <el-select size="small" v-model="ruleForm.pid" placeholder="请选择平台">
              <el-option label="全部" :value="0"></el-option>
              <el-option v-for="item in platformList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="内容分类：" prop="dsid">
            <el-select size="small" v-model="ruleForm.dsid" placeholder="请选择内容分类">
              <el-option label="全部" :value="0"></el-option>
              <el-option v-for="item in definesortList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="search-form-line">
          <el-form-item label="奖杯完成度：" prop="lv">
            <el-select size="small" v-model="ruleForm.lv" placeholder="请选择奖杯完成度">
              <el-option label="全部" :value="0"></el-option>
              <el-option v-for="item in trophyLevelLst" :key="item.value" :label="item.name" :value="item.value"></el-option>
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
          label="奖杯编号"
          width="120">
        </el-table-column>
        <el-table-column
          prop=""
          label="游戏">
          <template slot-scope="{row}">
            <div class="table-games" @click="goGameDetail(row.id)">
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
          prop="level"
          label="奖杯完成度"
          width="120">
        </el-table-column>
        <el-table-column
          prop="group"
          label="类型/系列">
          <template  slot-scope="{row}">
            <div>
              <p>{{row.sort_name}}</p>
              <p style="cursor: pointer;" @click="goGruopInfo(row)">{{row.group_name}}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="company_name"
          label="开发公司"
          width="120">
        </el-table-column>
        <el-table-column
          prop="deposit"
          label="押金"
          width="120">
          <template slot-scope="{row}">
            <span>{{Number(((row.deposit/100).toFixed(2)))}}元</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="day_rent"
          label="日租金"
          width="120">
          <template slot-scope="{row}">
            <span>{{Number(((row.day_rent/100).toFixed(2)))}}元</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="depot"
          label="库存"
          width="120">
        </el-table-column>
        <el-table-column
          prop="update_time"
          label="更新时间"
          width="180">
          <template slot-scope="{row}">
            <span v-if="row.update_time">{{moment(row.update_time).format('YYYY-MM-DD HH:mm:ss')}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="address"
          label="操作"
          width="120">
          <template slot-scope="{row}">
            <span class="text-cursor" @click="stock(row)">库存</span>
            <el-divider direction="vertical"></el-divider>
            <span class="text-cursor" @click="modifyPrice(row)">调价</span>
          </template>
        </el-table-column>
      </el-table>
      <Pagination :limit="limit" :total="totalNumber" @pagination="pagination" />
    </div>
  </div>
</template>

<script>
import { GamePriceLst, BaseTrophyLevelLst, BasePlatformLst, BaseDefinesortLst } from '@/api/api'
import Tabs from '@/components/Tabs'
import moment from 'moment'
import tableMixins from '@/mixins/tableMixins'
import Pagination from '@/components/Pagination'
import ImageLarger from '@/components/ImageLarger'
import { getStoreList } from '@/utils/data'
export default {
  name: 'PricingManage',
  components: { Tabs, Pagination, ImageLarger },
  mixins: [tableMixins],
  data() {
    return {
      moment: moment,
      urls: {
        list: GamePriceLst,
      },
      trophyLevelLst: [],
      platformList: [],
      definesortList: [],
      ruleForm: {
        nm: "",
        st: "",
        mindr: null,
        maxdr: null,
        mind: null,
        maxd: null,
        pid: null,
        dsid: null,
        lv: null,
      },
      tabAction: -1,
      tabslist: [
        { key: -1, label: '全部', value: '全部' },
        { key: 0, label: '未定价', value: '未定价' },
        { key: 1, label: '已定价', value: '已定价' },
      ],
    }
  },
  mounted() {
    this.getSearchListInit()
  },
  methods: {
    async getSearchListInit() {
      this.trophyLevelLst = await getStoreList(BaseTrophyLevelLst)
      this.platformList = await getStoreList(BasePlatformLst)
      this.definesortList = await getStoreList(BaseDefinesortLst)
    },
    tabsChange(e) {
      this.tabSearch({
        st: e.key
      })
    },
    add() {
      this.$router.push({
        path: '/game/pricing/add'
      })
    },
    modifyPrice(row) {
      this.$router.push({
        path: '/game/pricing/adjustment/' + row.id,
        query: {type: 'price'}
      })
    },
    stock(row) {
      this.$router.push({
        path: '/game/inventory/edit/' + row.id,
        query: {serial: row.disc_no, source: 'price'}
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