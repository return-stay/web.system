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

    <div class="pt-cont">

      <div class="pt-left">
        <sort-visit ref="visit" />
      </div>
      <div class="pt-right">
        <div class="pt-right-item" style="margin-bottom: 10px">
          <sort-portal ref='portal' />
        </div>
        <div class="pt-right-item" style="margin-bottom: 10px">
          <sort-back ref="back" />
        </div>
        <div class="pt-right-item">
          <sort-indent ref="indent" />
        </div>
        <div class="pt-right-item">
          <sort-vip ref="vip" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import moment from 'moment'
import DatePicker from '@/components/DatePicker'
import SortPortal from './sort-portal'
import SortVisit from './sort-visit'
import SortIndent from './sort-indent'
import SortVip from './sort-vip'
import SortBack from './sort-back'
export default {
  name: 'PageTop',
  data() {
    return {
      title: "近90天数据",
      value2: '', //显示 YYYY年MM月DD日 ~ YYYY年MM月DD日
      platformValue: 0,
      trenchList: [],
      placeholderValue: '',
      s_time: '',
      e_time: '',
      visitList: [], //
      portalList: [],
      backList: [],
      vipList: [],
      indentList: [],
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
  components: { SortVisit, SortPortal, SortIndent, SortVip, SortBack, DatePicker },
  mounted() {
    this.getInitTime()
    this.getTrenchList()
  },
  methods: {
    init() {
      const params = this.initParmas()
      const data = {
        ...this.initParmas(), l: 5
      }

      this.$refs.visit.init({
        ...params, l: 10,
      });
      this.$refs.portal.init(data);

      this.$refs.indent.init(data)
      this.$refs.back.init(data)
      this.$refs.vip.init(data)
      
    },
    initParmas() {
      const s_time = this.s_time, e_time = this.e_time, ch_id = this.platformValue , l = 5
      const initParmas = {
        s_time, e_time, ch_id, l,
      }
      return initParmas
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
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/summary-cont.scss";

.pt-cont {
  display: flex;
  margin-top: 20px;
  .pt-left {
    width: 50%;
  }
  .pt-right {
    margin-left: 20px;
    flex-shrink: 0;
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    &-item {
      width: 49%;
      flex-shrink: 0;
      box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.5);
      background-color: #fff;
      padding: 0 10px 10px;
      border-radius: 6px;
    }
  }
}
</style>