import { getAjax, postAjax, stopOrEnableRequest } from '@/utils/ajax'
import { removeEmptyField } from '@/utils'
import { GameOffset, GameOnset } from '@/api/api'
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
      limit: 20,
      tabObj: {},
      selectList: [], //选中的当前页
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
      const {currentPage = 1, st} = this.$route.query
      // const stnum = Number(st)
      const searchobj = removeEmptyField(this.searchobj)
      const tabObj = this.tabObj
      let params = {
        ...searchobj,
      }
      const urls = this.urls
      let obj = {
        page: Number(currentPage),
        ...tabObj,
      }
      if(urls.typeJson === 'json') {
        if(params) {
          obj.data = JSON.stringify(params)
        }else {
          obj.data = JSON.stringify({})
        }
      }else {
        Object.assign(obj, params)
      }
      return obj
    },
    tabSearch(obj) {
      this.tabObj = obj
      this.getList()
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
          const resdata = res.data
          this.totalNumber = res.count || resdata.total || resdata.count || resdata.length
          this.totalPage = res.pages || resdata.pages
          this.limit = resdata.per_page
          this.tableData = resdata.list || resdata;
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
          this.dataAction = -999
          this.search(this.ruleForm)
        } else {
          return false;
        }
      });
    },
    resetSearchForm(formName) {
      this.$refs[formName].resetFields();
      this.getList()
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
      const query = this.$route.query
      this.$router.push({
        query: {...query, currentPage: val}
      })
      this.getList()
    },
    // 本页全选
    pageAll() {
      let tables = this.tableData
      if (tables) {
        tables.forEach(item => {
          this.$refs.multipleTable.toggleRowSelection(item);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      console.log(val)
      this.selectList = val
    },
    // 下架 
    stopRequest(ids) {
      stopOrEnableRequest({
        url: GameOffset,
        data: {ids: ids.join(',')},
        successText: '批量下架成功'
      },() => {
        this.getList()
      })
    },
    // 上架
    putRequest(ids) {
      stopOrEnableRequest({
        url: GameOnset,
        data: {ids: ids.join(',')},
        successText: '批量上架成功'
      },() => {
        this.getList()
      })
    },

    batchProcessing() {
      let ids = []
      let selectList = this.selectList
      console.log(selectList)
      if(selectList.length>0) {
        for(let i = 0;i<selectList.length;i++) {
          ids.push(selectList[i].id)
        }
        return ids
      }else {
        this.$message.warning('请先选择游戏')
        return []
      }
    },
    // 批量下架
    batchOffShelves() {
      let ids = this.batchProcessing()
      if(ids.length>0) {
        this.stopRequest(ids)
      }
    },
    // 批量上架
    batchShelves() {
      let ids = this.batchProcessing()
      console.log(ids)
      if(ids.length>0) {
        this.putRequest(ids)
      }
    },

    // 选择专题
    selectSubject() {
      let selectList = this.selectList
      if(selectList.length>0) {
        this.$refs.gameType.show('subject')
      }else {
        this.$message.warning('请先选择游戏')
      }
    },

    // 选择系列
    selectSeries() {
      let selectList = this.selectList
      if(selectList.length>0) {
        this.$refs.gameType.show('series')
      }else {
        this.$message.warning('请先选择游戏')
      }
    },

    // 去游戏详情
    goGameDetail(gameid) {
      if(gameid) {
        this.$router.push({
          path: '/game/detail/' + gameid,
          query: {type: 'detail'}
        })
      }
    },
  }
}
