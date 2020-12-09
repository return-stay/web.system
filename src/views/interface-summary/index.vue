<template>
  <div class="td-box summary-cont-box">
        <!-- <header class="td-header">{{ title }}</header> -->
    <div class="summary-cont-top">
      <span>{{ title }} ({{ value2 }})</span>
      <div class="selece-cont"></div>
      <div class="summary-cont-content">
        <date-picker @change="pickerChange" :picker-options="pickerOptions" />
      </div>
      <div style="margin-left: 20px;">
        <el-select style="width: 120px;" v-model="platformValue" @change="platformChange" placeholder="请选择渠道">
          <el-option
            v-for="(item, i) in trenchList"
            :key="i"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>

    <div>
      <el-table
        ref="filterTable"
        border
        :data="list"
        style="width: 100%"
      >
        <el-table-column
          align="center"
          sortable
          column-key="page_name"
          prop="page_name">
          <template slot="header">
            <div class="table-column-header">
              <span>界面名称/路径</span>
              <el-tooltip class="item" effect="dark" content="界面名称和路径" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="visit"
          column-key="visit"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>浏览次数</span>
              <el-tooltip class="item" effect="dark" content="在当前界面浏览次数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="visit_user"
          column-key="visit_user"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>访问用户数</span>
              <el-tooltip class="item" effect="dark" content="在当前界面的访问用户总数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="new_visit_user"
          column-key="new_visit_user"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>新增用户数</span>
              <el-tooltip class="item" effect="dark" content="在当前界面的新增用户数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="back_visit_user"
          column-key="back_visit_user"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>回访用户数</span>
              <el-tooltip class="item" effect="dark" content="在当前界面的回访用户数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="trade_indent"
          column-key="trade_indent"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>订单数</span>
              <el-tooltip class="item" effect="dark" content="在当前界面发起的订单数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="new_vip_user"
          column-key="new_vip_user"
          sortable>
          <template slot="header">
            <div class="table-column-header">
              <span>新增会员卡用户数</span>
              <el-tooltip class="item" effect="dark" content="在当前界面发起开通成功的会员卡用户数" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
import moment from 'moment'
import DatePicker from '@/components/DatePicker'
import utilMixin from '../page-top/util-mixin'
export default {
  name: 'InterfaceSummary',
  data() {
    return {
      title: "近90天数据",
      value2: '', //显示 YYYY年MM月DD日 ~ YYYY年MM月DD日
      platformValue: 0,
      trenchList: [],
      pageurl: '',
      type: '',
      list: [],
      placeholderValue: '',
      s_time: '',
      e_time: '',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '昨天',
          onClick(picker) {
            const timestamp = new Date();
            const date = timestamp
            const dataArr = []
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            
            dataArr.push(date)
            const eDate = timestamp
            eDate.setTime(eDate.getTime())
            dataArr.push(eDate)
            picker.$emit('pick', dataArr);
          }
        }, {
          text: '前7天',
          onClick(picker) {
            const timestamp = new Date();
            const date = timestamp
            const dataArr = []
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            
            dataArr.push(date)
            const eDate = timestamp
            eDate.setTime(eDate.getTime())
            dataArr.push(eDate)
            picker.$emit('pick', dataArr);
          }
        }, {
          text: '前30天',
          onClick(picker) {
            const timestamp = new Date();
            const date = timestamp
            const dataArr = []
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
            
            dataArr.push(date)
            const eDate = timestamp
            eDate.setTime(eDate.getTime())
            dataArr.push(eDate)
            picker.$emit('pick', dataArr);
          }
        }]
      },
    }
  },
  components: {DatePicker},
  mixins: [utilMixin],
  mounted() {
    this.getInitTime()
    this.getTrenchList()

  },
  methods: {
    init() {
      console.log(this.$route.query.type)
      const {type} = this.$route.query
      this.typeToPageUrl(type)
      this.getList()
    },
    typeToPageUrl(type = '') {
      let pageurl = ''
      switch(type) {
        case 'visit':
          pageurl = '/page/sort/visit.list'
          break;
        case 'back':
          pageurl = '/page/sort/backuser.list'
          break;
        case 'trade':
          pageurl = '/page/sort/trade.list'
          break;
        case 'portal':
          pageurl = '/page/sort/portal.list'
          break;
        case 'vip':
          pageurl = '/page/sort/vip.list'
          break;
        default:
          pageurl = ''
      }
      this.pageurl = pageurl
    },
    getInitTime() {
      let timestamp=new Date()
      const etimeNumber =this.dateToMs(timestamp)- 24*60*60*1000
      this.e_time = etimeNumber
      let valuee = timestamp - 90 * 24 * 60*60*1000
      this.s_time = valuee
      this.value2 = moment(valuee).format('YYYY年MM月DD日') + ' ~ ' +moment(etimeNumber).format('YYYY年MM月DD日');
      this.placeholderValue = [new Date(this.s_time), new Date(this.e_time)]
      this.init()
    },
    dateToMs (date) {
      let result = new Date(date).getTime();
      return result;
    },
    platformChange(e) {
      this.platformValue = e
    },
    // 获取渠道列表
    getTrenchList() {
      this.$store.dispatch('game/getChannelList').then(res=> {
        let list = res
        list.unshift({
          id: -1,
          name: '全部',
        })
        this.trenchList = list
      })
    },
    pickerChange(data) {
      this.s_time = this.dateToMs(data[0])
      this.e_time = this.dateToMs(data[1])
      this.value2 = moment(data[0]).format('YYYY年MM月DD日') + ' ~ ' +moment(data[1]).format('YYYY年MM月DD日');
      this.placeholderValue = [new Date(this.s_time), new Date(this.e_time)]
      this.init()
    },
    initParmas() {
      const s_time = this.s_time, e_time = this.e_time, ch_id = this.platformValue , l = -1
      const initParmas = {
        s_time, e_time, ch_id, l,
      }
      console.log(initParmas)
      return initParmas
    },
    getList() {
      const that = this
      const parmas = this.initParmas()
      const pageurl = this.pageurl
      this.getRequest({url: pageurl, params: parmas }, (list) => {
        for(let i = 0;i<list.length;i++) {
          list[i].widthNumber = list[i].visit_user
        }
        that.list = list
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/summary-cont.scss";
</style>