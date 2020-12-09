<template>
  <div class="char-bar-box">
    <div class="char-bar-header">
      <div class="char-bar-header-title">
        <span>收入</span>
        <!-- <span class="char-bar-header-detail">详情</span> -->
      </div>
      <div class="char-bar-header-cont">
        <span class="char-bar-header-span">
          <p><span class="char-bar-header-icon" style="background-color: #8783ec;"></span> 租金收入</p>
          <p class="char-bar-header-span-num">{{ rentAdd }}元</p>
        </span>
        <span class="char-bar-header-span">
          <p><span class="char-bar-header-icon" style="background-color: #df7775;"></span>非租金收入</p>
          <p class="char-bar-header-span-num">{{ depreciationAdd }}元</p>
        </span>
        <span class="char-bar-header-span">
          <p><span class="char-bar-header-icon" style="background-color: #f8cf47;"></span>会员卡收入</p>
          <p class="char-bar-header-span-num">{{vip_card_feeAdd}}元</p>
        </span>
      </div>
    </div>
    <div class="char-bar-class" :id="domid"></div>
  </div>
</template>

<script>
export default {
  name: 'BarLabelRotation',
  data() {
    return {
      rentAdd: 0,
      depreciationAdd: 0,  
      vip_card_feeAdd: 0,
    }
  },
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
    threeToMax(one, two, three) {
      let num = one 
      if(num < two) {
        num = two
      }
      if(num < three) {
        num = three
      }
      return num
    },
    proData() {
      let data = this.listData
      let xs =[],depreciations= [],vip_card_fees= [],rents=[], pmax = 0,
      depreciationAdd = 0, rentAdd = 0, vip_card_feeAdd = 0;
      for(let i=0;i<data.length;i++) {
        xs.push(data[i].day)
        let depreciation = Number(data[i].depreciation/100),
        rent = Number(data[i].rent/100),
        vip_card_fee = Number(data[i].vip_card_fee/100)
        depreciations.push(depreciation)
        rents.push(rent)
        depreciationAdd += depreciation
        rentAdd += rent
        vip_card_feeAdd += vip_card_fee
        vip_card_fees.push(vip_card_fee)
        let imax = this.threeToMax(depreciation, rent, vip_card_fee)
        pmax = pmax < imax ? imax : pmax
      }
      this.depreciationAdd = depreciationAdd
      this.rentAdd = rentAdd
      this.vip_card_feeAdd = vip_card_feeAdd
      return {
        xs,
        depreciations,
        rents,
        vip_card_fees,
        pmax,
      }
    },
    init() {
      const {xs,depreciations,rents,vip_card_fees,pmax } = this.proData()
      let max = Math.ceil(pmax/10)
      let app = {}
          // posList = [
          //   'left', 'right', 'top', 'bottom',
          //   'inside',
          //   'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
          //   'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
          // ];
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
        // position: {
        //   options: this.$echarts.util.reduce(posList, function (map, pos) {
        //     map[pos] = pos;
        //     return map;
        //   }, {})
        // },
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
        title: {
          show: false,
          text: '收入'
        },
        color: ['#8783ec', '#df7775', '#f8cf47'],
        tooltip: {
          show: false,
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          show: false,
          // data: ['租金收入', '非租金收入', '会员卡收入']
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
            axisTick: {show: false},
            // data: ['01', '02', '03', '04', '05', '06', '07']
            data: xs,
          }
        ],
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show:false,
              interval: 1,
            },
            interval: max,
          }
        ],
        series: [
          {
            name: '租金收入',
            type: 'bar',
            barGap: '30%',
            barWidth: 3,
            // label: labelOption,
            // data: [320, 332, 301, 334, 390,320, 332]
            data: rents,
          },
          {
            name: '非租金收入',
            type: 'bar',
            barGap: '30%',
            barWidth: 3,
            // label: labelOption,
            // data: [220, 182, 191, 234, 290,220, 182]
            data: depreciations,
          },
          {
            name: '会员卡收入',
            type: 'bar',
            barGap: '30%',
            barWidth: 3,
            // label: labelOption,
            // data: [150, 232, 201, 154, 190,150, 232]
            data: vip_card_fees,
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
.char-bar-box{
  height: 100%;
  width: 100%;
  padding-top: 50px;
  box-sizing: border-box;
  position: relative;
  .char-bar-header {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    padding: 0 20px;
    &-title {
      color: #000;
      font-size: 18px;
      font-weight: 700;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .char-bar-header-detail {
        font-size: 14px;
        color: #409eff;
        cursor: pointer;
        font-weight: 400;
      }
    }
    .char-bar-header-cont {
      display: flex;
      align-items: center;
    }
    .char-bar-header-span {
      font-size: 14px;
      color: #000;
      margin-right: 20px;
      &-num {
        font-size: 20px;
        margin-top: 4px;
      }
      p {
        line-height: 16px;
        height: 16px;
        display: flex;
        align-items: center;
      }
      .char-bar-header-icon {
        display: inline-block;
        height: 14px;
        width: 14px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 4px;
      }
    }
  }
  .char-bar-class {
    width: 100%;
    height: 100%;
    font-weight: 500;
  }
}

</style>
