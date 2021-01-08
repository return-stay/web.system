<template>
  <div class="table-box">

    <el-table
      v-loading="loading"
      @sort-change="sortTableChange"
      :border="border"
      :data="tableData"
      :style="tableStyle"
      :size="size"
    >
      <el-table-column
        v-for="(item, index) in columns" :key="index"
        :fixed="item.fixed"
        :align="item.align"
        :width="item.width"
        :label="item.title"
        :prop="item.prop || item.label"
        :sortable="item.sort"
        >
        <template slot="header" v-if="item.headerIconObj">
          <div class="table-column-header">
            <span>{{item.title}}</span>
            <el-tooltip class="item" effect="dark" :content="item.headerIconObj.text" placement="bottom-end">
              <i :class="item.headerIconObj.icon"></i>
            </el-tooltip>
          </div>
        </template>
        <template slot-scope="{row}">
          <div>
            <div v-if="item.render">
              <template v-for="(fn, index) in item.render">
                <template v-if="fn.fnName">
                  <el-divider direction="vertical" v-if="index>0" :key="index"/>
                  <el-button type="text" @click="handleBtnClick(row,fn.fnName)" :key="index">{{fn.title}}</el-button>
                </template>
                <template v-else>
                  <span v-for="l in fn.labels" :key="l">
                    {{row[l]}}
                  </span>
                </template>
              </template>
            </div>
            <div v-else>{{row[item.label]}}</div>
          </div>
        </template>
      </el-table-column>
    </el-table>

    <div class="block" :style="paginationStyle" v-if="paginationData.pageSize && isPagination">
      <el-pagination
        @size-change="paginationData.handleSizeChange"
        @current-change="paginationData.handleCurrentChange"
        :current-page="paginationData.currentPage"
        :page-sizes="paginationData.pageSizes"
        :page-size="paginationData.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="paginationData.total">
      </el-pagination>
    </div>
    
  </div>
</template>

<script>
import { getAjax, postAjax } from '@/utils/ajax'
import {removeEmptyField} from '@/utils'
export default {
  name: 'TablePage',
  props: {
    urls: {
      type: Object,
      default: () => {},
    },
    title: {
      type: String,
    },
    size: {
      type: String,
      default: 'small',
    },
    tableStyle: {
      type: String,
    },
    isPagination: {
      type: Boolean,
      default: true,
    },
    paginationPosition: {
      type: String,
      default: 'right'
    },
    border: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    columns: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      paginationStyle: 'flex-end',
      paginationData: {},
      tableShowList: [],//显示的列表数据
      tableData: [],
      searchobj: [],
    }
  },


  mounted() {
    this.getList()
    this.paginationStyleFun()
  },
  
  methods: {
    // 处理请求参数
    paramsManage() {
      const {currentPage = 1} = this.$route.query
      const searchobj = removeEmptyField(this.searchobj)
      let obj = {
        page: Number(currentPage),
        ...searchobj,
      }

      console.log(obj)
      return obj
    },
    search(searchobj) {
      const query = this.$route.query
      this.$router.push({
        query: {...query, currentPage: 1}
      })
      this.searchobj = searchobj
      this.getList()
    },
    getList () {
      const urls = this.urls
      const method = urls.listMethod || 'post' 
      let requestAajx = null;

      const params = this.paramsManage()
      if(method === 'get'){
        requestAajx = getAjax({
          url: urls.list,
          params: params,
        })
      }else {
        requestAajx = postAjax({
          url: urls.list,
          data: params,
        })
      }
      requestAajx.then(res=> {
        if(res.code === 1) {
          this.totalPage = res.data.total
          this.tableData = res.data.list || res.data;
          this.initPagination()
        }else {
          this.tableData = []
        }
      })
    },
    // 点击某行处理
    rowClick(row, column, event) {
      console.log(row, column, event)
      this.$emit('row-click', row, column, event)
    },
    // 初始化分页器
    initPagination () {
      const pagination = this.pagination
      const totalPage = this.totalPage
      const {currentPage = 1, pageSize = 15} = this.$route.query
      this.paginationData = {
        pageSize: Number(pageSize),
        total: totalPage,
        currentPage: Number(currentPage),
        handleSizeChange: this.handleSizeChange,
        handleCurrentChange: this.handleCurrentChange,
        ...pagination,
      }
    },
    // 判断分页器的位置
    paginationStyleFun() {
      const paginationPosition = this.paginationPosition
      let paginationStyle = ''
      if(paginationPosition === 'right') {
        paginationStyle = 'justify-content: flex-end;'
      }else if(paginationPosition === 'left') {
        paginationStyle = 'justify-content: flex-start;'
      }else {
        paginationStyle = 'justify-content: center;'
      }
      this.paginationStyle = paginationStyle
    },
    sortTableChange({ prop, order }) {
      console.log(prop, order)
    },
    // 每页多少条
    handleSizeChange(val) {
      const isPagination = this.isPagination
      if(isPagination) {
        const query = this.$route.query
        this.$router.push({
          query: {...query, pageSize: val}
        })
        this.getList()
      }
    },
    // 当前第几页
    handleCurrentChange(val) {
      const isPagination = this.isPagination
      if(isPagination){
        const query = this.$route.query
        this.$router.push({
          query: {...query, currentPage: val}
        })
        this.getList()
      }
    },
    handleBtnClick(row,fnName) {
      console.log(row, fnName)
      this.$emit(`${fnName}`,row)
    },
  }
}
</script>

<style lang="scss" scoped>
.table-box {
  position: relative;
  .table-column-header {
    display: inline-block;
    .el-icon-info {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 10px;
    }
  }
  .block {
    margin-top: 14px;
    display: flex;
    justify-content: flex-start;
  }
}
</style>
