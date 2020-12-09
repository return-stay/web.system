<template>
  <div id="double-chart"></div>
</template>

<script>
export default {
  name: 'DoubleLineLabel',
  props: {
    listData: {
      type: Array,
      default: () => []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    proData() {
      let data = this.listData, xs = [], givebacks = [], rents = [], pmax = 0
      for(let i =0;i<data.length;i++) {
        xs.push(data[i].day)
        let giveback_disc = data[i].giveback_disc, rent_disc = data[i].rent_disc
        givebacks.push(giveback_disc)
        rents.push(rent_disc)
        const imax = giveback_disc < rent_disc ? rent_disc : giveback_disc
        pmax = pmax < imax? imax : pmax
      }
      return {
        xs,
        givebacks,
        rents,
        pmax,
      }
    },
    init() {
      const {xs,givebacks, rents,pmax} = this.proData()
      const max = Math.floor(pmax/10)
      let option = {
        title: {
          text: '租借与归还'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: [ '已归还','租借中']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          show: false,
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          interval: 1,
          splitLine: {
            // show:true,
            interval: 1,
          },
          // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日','周一', '周二', '周三', '周四', '周五', '周六', '周日']
          data: xs,
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show:false,
            interval: 1,
          },
          interval: max,
        },
        series: [
          {
            name: '租借中',
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: {
              color: '#e33374',
              width: 3,
            },
            // data: [120, 332, 201, 134, 390, 230, 210,120, 332, 201, 134, 390, 230, 210]
            data: rents,
          },
          {
            name: '已归还',
            type: 'line',
            smooth: true,
            symbol: 'none',
            lineStyle: {
              color: '#295fad',
              width: 3,
            },
            // data: [0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0]
            data: givebacks,
          },
        ]
      };
      let myChart = this.$echarts.init(document.getElementById("double-chart"))
      myChart.setOption(option);
    }
  }
}
</script>

<style lang="scss" scoped>
#double-chart {
  width: 100%;
  height: 100%;
}
</style>
