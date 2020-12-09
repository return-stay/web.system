// import request from '@/utils/request'
export default {
  data() {
    return {
      currentPage: 1, //当前页数
      pageSizes: [10, 15, 20, 30, 40, 50], //每页显示个数
      pageSize: 30, //每页个数
      pageTotal: 0, //总页数
      pageLayout: 'total, sizes, prev, pager, next, jumper',
      allData: [], //所有数据列表
      screenData: [],//筛选之后的列表 
      tableData: [], //当前页面数据
      loading: true,
    }
  },

  methods: {
    getInit() {

    },

    sortBy(attr, rev) {

      //第二个参数没有传递 默认升序排列
      if (rev == undefined) {
        rev = 1;
      } else {
        if (rev === 'descending') {
          rev = -1
        } else if (rev === 'ascending') {
          rev = 1
        }
      }

      return function (a, b) {
        a = a[attr];
        b = b[attr];
        if (a < b) {
          return rev * -1;
        }
        if (a > b) {
          return rev * 1;
        }
        return 0;
      }
    },
    sortObjArr(prop, order) {
      const that = this
      const arr = this.screenData
      arr.sort(that.sortBy(prop, order))
      this.screenData = arr
      this.currentPage = 1
      this.handPagination()
    },

    // 筛选方法
    sortTableChange({ prop, order }) {
      console.log(prop, order)
      if (order === null) {
        // let allData = this.allData
        let allData = this.screenData
        let allDataNew = JSON.parse(JSON.stringify(allData))
        this.screenData = allDataNew
        this.setListData()
        this.handPagination()
      } else {
        let fieldName = ''
        switch (prop) {
          case 'day_rent_str':
            fieldName = 'day_rent'
            break;
          case 'cost_str':
            fieldName = 'cost'
            break;
          case 'total_fee_str':
            fieldName = 'total_fee'
            break;
          case 'depreciation_fee_str':
            fieldName = 'depreciation_fee'
            break;
          default:
            fieldName = prop
        }
        const sortingType = order;
        this.sortObjArr(fieldName, sortingType)
      }
    },
    handPagination() {
      let pageSize = this.pageSize
      let currentPage = this.currentPage - 1
      let screenData = this.screenData

      let startNum = Math.floor(currentPage * pageSize)
      let endNum = Math.floor(startNum + pageSize)
      let tableData = screenData.slice(startNum, endNum)
      this.tableData = tableData
    },
    // 修改每页显示的个数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pageSize = val
      this.handPagination()
    },
    // 当前页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val
      this.handPagination()
    },
    resetDateFilter() {
      this.$refs.filterTable.clearFilter('date')
    },
    clearFilter() {
      this.$refs.filterTable.clearFilter()
    },
    formatter(row, column) {
      return row.address
    },
    filterTag(value, row) {
      return row.tag === value
    },
    filterHandler(value, row, column) {
      const property = column['property']
      return row[property] === value
    }
  }
}
