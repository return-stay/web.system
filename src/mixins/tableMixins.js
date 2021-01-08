import { getAjax, postAjax } from '@/utils/ajax'
import {removeEmptyField} from '@/utils'
export default {
  data() {
    return {
      isMountedRequest: true, //进入mounted 是否发送请求
      paginationData:{ }, //分页
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
    onSearchSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log(this.ruleForm)
          this.tabAction = -1
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
  }
}
