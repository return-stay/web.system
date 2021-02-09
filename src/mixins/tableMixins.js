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
      totalNumber: 0, //总数据量
      tabalPage: 0, //总页数
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
      let obj = {
        page: Number(currentPage),
      }
      if(urls.typeJson === 'json') {
        if(searchobj) {
          obj.data = JSON.stringify(searchobj)
        }
      }else {
        Object.assign(obj, searchobj)
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
          const resdata = res.data
          this.totalNumber = res.count || res.data.total || res.data.count || resdata.length
          this.totalPage = res.pages || res.data.pages
          this.tableData = resdata.list || res.data;
        }else {
          this.tableData = []
        }
      })
    },
    // page 当前第几页  limit 每页多少条
    pagination({page}) {
      const query = this.$route.query
      this.$router.push({
        query: {...query, currentPage: page}
      })
      this.getList()
    },
    handleCurrentChange(val) {
      const query = this.$route.query
      this.$router.push({
        query: {...query, currentPage: val}
      })
      // this.$emit('handleCurrentChange', val)
      this.getList()
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
