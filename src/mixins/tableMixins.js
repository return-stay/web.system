import { getAjax, postAjax } from '@/utils/ajax'
import {removeEmptyField} from '@/utils'
export default {
  data() {
    return {
      isMountedRequest: true, //进入mounted 是否发送请求
      paginationData: {
        handleSizeChange: this.handleSizeChange,
        handleCurrentChange: this.handleCurrentChange,
        // ...pagination,
      }, //分页
      totalPage: 0,
      tableData: [], //列表数据源
    }
  },

  mounted() {
    if(this.isMountedRequest) {
      this.getList()
    }
  },

  methods: {
    // 处理请求参数
    paramsManage() {
      const {currentPage = 1} = this.$route.query
      const searchobj = removeEmptyField(this.searchobj)
      const urls = this.urls
      let obj = {}
      if(urls.typeJson === 'json') {
        obj = {
          page: Number(currentPage),
          data: JSON.stringify(searchobj)
        }
      }else {
        obj = {
          page: Number(currentPage),
          ...searchobj,
        }
      }
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
        console.log(res)
        if(res.code === 1) {
          this.totalPage = res.data.total
          this.pageSize = res.data.pages
          this.tableData = res.data.list || res.data;
          this.initPagination()
        }else {
          this.tableData = []
        }
      })
    },
    handleCurrentChange(val) {
      const query = this.$route.query
      this.$router.push({
        query: {...query, currentPage: val}
      })
      // this.$emit('handleCurrentChange', val)
      this.getList()
    },
    // 初始化分页器
    initPagination () {
      // const pagination = this.pagination
      const totalPage = this.totalPage
      const {currentPage = 1, pageSize = 15} = this.$route.query
      this.paginationData = {
        pageSizeS: [10, 20, 50, 100, 200],
        pageSize: Number(pageSize),
        total: totalPage,
        currentPage: Number(currentPage),
        handleSizeChange: this.handleSizeChange,
        handleCurrentChange: this.handleCurrentChange,
        // ...pagination,
      }
    },
    onSearchSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          this.tabAction = 0
          // this.$refs.tablechild.search(this.ruleForm);
          this.search(this.ruleForm)

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetSearchForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 排序方式
    sortTableChange({ prop, order }) {
      console.log(prop, order)
    },
    // 点击某行处理
    rowClick(row, column, event) {
      console.log(row, column, event)
    },
    // 每页多少条
    handleSizeChange(val) {
      const query = this.$route.query
      this.$router.push({
        query: {...query, pageSize: val}
      })
      this.getList()
    },
    // 当前第几页
    handleCurrentChange(val) {
      console.log(val)
      const query = this.$route.query
      this.$router.push({
        query: {...query, currentPage: val}
      })
      this.getList()
    },
  }
}
