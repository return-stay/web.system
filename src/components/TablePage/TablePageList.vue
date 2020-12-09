<template>
  <div class="table-box">

    <el-table
      v-loading="loading"
      @sort-change="sortTableChange"
      :border="border"
      :data="computedData"
      :style="tableStyle"
    >

      <el-table-column
        v-for="(item, index) in datacolumns" :key="index"
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
                  <el-button type="text" @click="handleBtnClick(row.row,fn.fnName)" :key="index">{{fn.title}}</el-button>
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
        layout="total, sizes, prev, pager, next, jumper"
        :total="paginationData.total">
      </el-pagination>
    </div>
    
  </div>
</template>

<script>
export default {
  name: 'TablePageList',
  props: {
    title: {
      type: String,
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
      type: Function,
      default: () => {}
    },
    tableData: {
      type: Array,
      default: () => []
    },
    pagination: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    const columns = this.columns()
    console.log(columns)
    for(let i = 0; i<columns.length;i++) {
      console.log(columns[i].render)
      if(columns[i].render) {
        columns[i].renderFunc = columns[i].render
      }
    }
    console.log(columns)
    this.datacolumns = columns
  },
  data() {
    return {
      datacolumns: [],
      paginationStyle: 'flex-end',
      paginationData: {},
      tableShowList: [],//显示的列表数据
    }
  },

  computed: {
    computedData() {
      const DisposeData = this.dataDispose()
      this.initPagination()
      return DisposeData
    }
  },

  mounted() {
    this.paginationStyleFun()
    this.dataDispose()
  },
  
  methods: {
    handleBtnClick(row,fnName) {
      console.log(fnName)
      this.$emit(`${fnName}`,row)
    },
    // 点击某行处理
    rowClick(row, column, event) {
      console.log(row, column, event)
      this.$emit('row-click', row, column, event)
    },
    // 数据源处理
    dataDispose() {
      let tableShowList = []
      const isPagination = this.isPagination
      const tableData = this.tableData
      if(isPagination) {
        const {currentPage = 1, pageSize = 10} = this.$route.query
        const start = (currentPage - 1) * pageSize
        const end = currentPage * pageSize
        tableShowList = tableData.slice(start, end)
      }else {
        tableShowList =tableData
      }
      return tableShowList
    },
    // 初始化分页器
    initPagination () {
      const pagination = this.pagination
      const tableData = this.tableData
      const {currentPage = 1, pageSize = 10} = this.$route.query
      this.paginationData = {
        pageSizeS: [10, 20, 50, 100, 200],
        pageSize: Number(pageSize),
        total: tableData.length,
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
        this.dataDispose()
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
        this.dataDispose()
      }
    },
    operation(row) {
      this.$emit('operation', row)
    },
    tableAdd() {
      this.$emit('add')
    },
    tableEdit(row) {
      console.log(row)
    },
    tableDelte(row) {
      console.log(row)
    },
    shipments(row) {
      console.log(row)
      this.$emit('shipments', row)
    }
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
