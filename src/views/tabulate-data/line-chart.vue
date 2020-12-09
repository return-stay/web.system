<template>
  <div class="mychart" :id="domid"></div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'LineChart',
  data() {
    return {
      arr: [],
    }
  },
  props: {
    domid: {
      type: String,
      default: 'line-chart'
    },
    lineColor: {
      type: String,
      default: '#2757a5'
    },
    lineData: {
      type: Array,
      default: ()=> []
    },
  },
  // computed: {
  //   isShow() {
  //     // console.log(this.arr)
  //     const arr = []
  //     return arr.length>0 ? true:false
  //   }
  // },
  mounted() {
    this.init()
  },
  methods: {
    proData() {
      const lineData = this.lineData
      let xs = [], ys=[],series=[], pmax = 10;
      for(let i = 0;i<lineData.length;i++) {
        const num = Math.floor(Math.random() * 10)
        const time = moment(lineData[i].day,'YYYY-MM-DD hh:mm:ss').valueOf()
        const formtime = moment(time).format('YYYY-MM-DD')
        xs.push(time)
        const yvalue = lineData[i].user || lineData[i].value
        ys.push(yvalue)
        series.push([formtime, yvalue])
        pmax = pmax < yvalue ? yvalue: pmax
      }
      return { xs, ys, series, pmax}
    },
    init() {
      // 基于准备好的dom，初始化echarts实例
      const domid = this.domid
      const lineColor = this.lineColor
      let myChart = this.$echarts.init(document.getElementById(domid))
      // 绘制图表
      const {xs, ys, series,pmax} = this.proData()
      const max = pmax * 1.1
      let option = {
        xAxis: {
          type: 'category',
          interval: 10,
          splitLine: {
            show:true,
            interval: 1,
          },
          boundaryGap: false,
            axisLabel: {
            show: false
          },
          axisLine: {
            show: true,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '30%'],
          max: max,
          interval: Number((max/20).toFixed(2)),
          axisLabel: {
            show: false
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        visualMap: {
          type: 'piecewise',
          show: false,
          dimension: 0,
          seriesIndex: 0,
          pieces: [{
            gt: 1,
            lt: 3,
            color: 'rgba(0, 180, 0, 0.5)'
          }, {
            gt: 5,
            lt: 7,
            color: 'rgba(0, 180, 0, 0.5)'
          }]
        },
        series: [
          {
            type: 'line',
            smooth: 0.6,
            symbol: 'none',
            lineStyle: {
                color: lineColor,
                width: 2
            },
            // markLine: {
            //     symbol: ['none', 'none'],
            //     label: {show: false},
            //     data: [
            //         {xAxis: 1},
            //         {xAxis: 3},
            //         {xAxis: 5},
            //         {xAxis: 7}
            //     ]
            // },
            // areaStyle: {},
            data: series
          }
        ]
      }
      myChart.setOption(option);
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>