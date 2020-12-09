<template>
  <div class="char-bar-class" :id="domid"></div>
</template>

<script>
export default {
  name: 'BarLabelTwo',
  props: {
    domid: {
      type: String,
      default: 'bar-chart'
    },
    listData: {
      type: Array,
      default: () => []
    },
  },
  mounted() {
    this.init()
  },
  methods: {
    proData() {
      let data = this.listData
      let xs = [], frees = [], frozes = [];
      for(let i= 0;i<data.length;i++) {
        xs.push(data[i].day)
        frees.push(data[i].free_deposit)
        frozes.push(data[i].froze_deposit)
      }
      return {
        xs,
        frees,
        frozes,
      }
    },
    init() {
      const {xs,frees,frozes} = this.proData()
      let app = {},
          posList = [
            'left', 'right', 'top', 'bottom',
            'inside',
            'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
            'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
          ];

      app.configParameters = {
        rotate: {
          min: -90,
          max: 90
        },
        align: {
          options: {
            left: 'left',
            center: 'center',
            right: 'right'
          }
        },
        verticalAlign: {
          options: {
            top: 'top',
            middle: 'middle',
            bottom: 'bottom'
          }
        },
        position: {
          options: this.$echarts.util.reduce(posList, function (map, pos) {
            map[pos] = pos;
            return map;
          }, {})
        },
        distance: {
          min: 0,
          max: 100
        }
      };

      app.config = {
        rotate: 90,
        align: 'left',
        verticalAlign: 'middle',
        position: 'insideBottom',
        distance: 15,
        onChange: function () {
          var labelOption = {
            normal: {
              rotate: app.config.rotate,
              align: app.config.align,
              verticalAlign: app.config.verticalAlign,
              position: app.config.position,
              distance: app.config.distance
            }
          };
          myChart.setOption({
            series: [{
              label: labelOption
            }, {
              label: labelOption
            }, {
              label: labelOption
            }, {
              label: labelOption
            }]
          });
        }
      };

      var labelOption = {
        show: true,
        position: app.config.position,
        distance: app.config.distance,
        align: app.config.align,
        verticalAlign: app.config.verticalAlign,
        rotate: app.config.rotate,
        formatter: '{c}  {name|{a}}',
        fontSize: 16,
        rich: {
          name: {
            textBorderColor: '#fff'
          }
        }
      };

      let option = {
        color: ['#8783ec', '#df7775', '#f8cf47'],
        tooltip: {
          show: false,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['可提现', '冻结']
        },
        toolbox: {
          show: false,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        xAxis: [
          {
            type: 'category',
            interval: 10,
            // splitLine: {
            //   show:true,
            //   interval: 1,
            // },
            // boundaryGap: false,
            //   axisLabel: {
            //   show: false
            // },
            // axisLine: {
            //   show: true,
            // },
            // axisTick: {show: false},
            data: xs
          }
        ],
        yAxis: [
          {
            type: 'value',
            interval: 100,
            splitLine: {show: false}
          }
        ],
        series: [
          {
            name: '可提现',
            type: 'bar',
            barGap: '30%',
            barWidth: 10,
            // label: labelOption,
            data: frees
          },
          {
            name: '冻结',
            type: 'bar',
            barGap: '30%',
            barWidth: 10,
            // label: labelOption,
            data: frozes
          },
        ]
      };
      const domid = this.domid || 'bar-chart'
      let myChart = this.$echarts.init(document.getElementById(domid))
      myChart.setOption(option);
    }
  }
}
</script>

<style lang="scss" scoped>
.char-bar-class {
  width: 100%;
  height: 100%;
}
</style>
