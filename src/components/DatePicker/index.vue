<template>
  <div class="dp-box">
    <i class="el-icon-date" />
    <span class="dp-title">自定义日期范围</span>
    <div class="dp-content">
      <el-date-picker
        v-model="value"
        :type="type"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
        @change="dateChange"
        >
      </el-date-picker>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'DatePicker',
  data() {
    return {
      value: '',
    }
  },
  props: {
    type: {
      type: String,
      default: 'daterange'
    },
    pickerOptions: {
      type: Object,
      default: () => {
        return {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    }
  },
  methods: {
    dateChange(e) {
      const startTime = moment(e[0]).format('YYYY年MM月DD日')
      const endTime = moment(e[0]).format('YYYY年MM月DD日')
      this.value = startTime + '~' + endTime

      this.$emit('change', e)
    },
  }
}
</script>

<style scoped lang="scss">
.dp-box {
  position: relative;
  margin: 30px 0;
  display: inline-block;
  cursor: pointer;
  .dp-title {
    vertical-align: middle;
    font-size: 14px;
    color: #000;
  }
  .el-icon-date {
    vertical-align: middle;
  }
  .dp-content {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
  }
}
</style>