<template>
  <div class="table-box">
    <slot></slot>
    <div class="block" :style="paginationStyle" v-if="paginationData.pageSize && isPagination && totalPage>0">
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
export default {
  name: 'GameTable',
  props: {
    totalPage: {
      type: Number,
      default: 0
    },
    isPagination: {
      type: Boolean,
      default: true,
    },
    paginationPosition: {
      type: String,
      default: 'right'
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
    }
  },
  mounted() {
    this.paginationStyleFun()
    this.initPagination()
  },
  methods: {
    // 初始化分页器
    initPagination () {
      // const pagination = this.pagination
      const totalPage = this.totalPage
      console.log(totalPage)
      const {currentPage = 1, pageSize = 15} = this.$route.query
      console.log(pageSize)
      this.paginationData = {
        pageSizeS: [15, 20, 50, 100, 200],
        pageSize: Number(pageSize),
        total: totalPage,
        currentPage: Number(currentPage),
        handleSizeChange: this.handleSizeChange,
        handleCurrentChange: this.handleCurrentChange,
        // ...pagination,
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
    // 每页多少条
    handleSizeChange(val) {
      const isPagination = this.isPagination
      if(isPagination) {
        const query = this.$route.query
        this.$router.push({
          query: {...query, pageSize: val}
        })
        this.$emit('handleSizeChange', val)
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
        this.$emit('handleCurrentChange', val)
      }
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
  .table-game-box {
    display: flex;
    .left {
      flex-shrink: 0;
      width: 50px;
      height: 50px;
      margin-right: 4px;
      >img {
        width: 100%;
      }
    }
    .right {
      flex: 1;
    }
  }
}
</style>
