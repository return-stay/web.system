<template>
  <div class="cs-box">
    <div class="title">
      <span class="title-text">查询</span>
      <span class="title-add" @click="add"><i class="el-icon-plus"></i>添加图片位</span>
    </div>
    <div class="search-box">
      <el-form ref="ruleForm" :model="ruleForm" label-width="100px">
        <div class="search-form-line">
          <el-form-item label="位置：" prop="lid">
            <el-select size="small" v-model="ruleForm.lid" placeholder="请选择位置">
              <el-option v-for="item in locationList" :key="item.value" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="类型：" prop="tp">
            <el-select size="small" v-model="ruleForm.tp" placeholder="请选择类型">
              <el-option v-for="item in typeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
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
          label="预览图"
          width="120">
          <template slot-scope="{row}">
            <div v-if="row.img" style="height: 40px;">
              <ImageLarger :src="row.img" imgstyle="height: 100%;" />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="location_name"
          label="位置"
          width="120">
        </el-table-column>
        <el-table-column
          prop="type_name"
          label="类型"
          width="120">
        </el-table-column>
        <el-table-column
          prop="relation_name"
          label="内容"
          width="180">
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题/描述"
          width="180">
        </el-table-column>
        <el-table-column
          prop="area_name"
          label="状态"
          width="120">
          <template slot-scope="{row}">
            <span v-if="row.active">启用</span>
            <span v-else>停用</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="update_time"
          label="更新时间"
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
import { IMG_URL, BaseContentTypeList, BaseContentLocationList, ContentInfoLst, ContentOffSet, ContentOnSet} from '@/api/api'
import {getList} from '@/utils/data'
import GameTable from '@/components/TablePage/GameTable'
import Tabs from '@/components/Tabs'
import tableMixins from '@/mixins/tableMixins'
import Pagination from '@/components/Pagination'
import moment from 'moment'
import {stopOrEnableRequest} from '@/utils/ajax'
import ImageLarger from '@/components/ImageLarger'
export default {
  name: 'ImagesLocation',
  components: { GameTable, Tabs, Pagination, ImageLarger },
  mixins: [tableMixins],
  data() {
    return {
      IMG_URL: IMG_URL,
      moment: moment,
      urls: {
        list: ContentInfoLst,
      },
      ruleForm: {
        tp: '',
        lid: '',
      },
      tabAction: -1,
      tabslist: [
        { key: -1, label: '全部', value: '全部' },
        { key: 0, label: '已停用', value: '已停用' },
      ],
      typeList: [],
      locationList: [],
    }
  },
  mounted() {
    this.getSearchListInit()
  },
  methods: {
    async getSearchListInit() {
      this.typeList = await getList(BaseContentTypeList)
      this.locationList =  await getList(BaseContentLocationList)
    },
    tabsChange(e) {
      this.tabSearch({
        st: e.key,
      })
    },
    add() {
      this.$router.push({
        path: '/operation/location/add'
      })
    },
    edit(row) {
      this.$router.push({
        path: '/operation/location/add',
        query: {id: row.id}
      })
    },
    stopUsing(row) {
      stopOrEnableRequest({
        url: ContentOffSet,
        data: {id: row.id},
        successText: '停用成功',
      }, () => {
        this.getList()
      })
    },
    enable(row) {
      stopOrEnableRequest({
        url: ContentOnSet,
        data: {id: row.id},
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
    .il-table-img {
      height: 40px;
    }
  }
}
</style>