<template>
  <div class="view-box s-box">
    <div class="s-box-title">
      <span v-if="edition === 'dev'">正在使用：白金饭小程序-测试版</span>
      <span v-if="edition === 'pro'">正在使用：白金饭小程序-正式版</span>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <span slot="reference" class="s-box-title-r"><svg-icon icon-class="cut" class="icon" /> 切换版本</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span @click="setEdition('pro')">正式版</span>
          </el-dropdown-item>
          <el-dropdown-item>
            <span @click="setEdition('dev')">测试版</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>


    <div class="s-top">
      <div class="s-top-item" @click="order('shipments')">
        <p class="s-top-item-h">{{info.paid || 0}}</p>
        <p class="s-top-item-t">待发货订单</p>
      </div>

      <div class="s-top-item" @click="order('qualityTesting')">
        <p class="s-top-item-h">{{info.received || 0}}</p>
        <p class="s-top-item-t">待质检归还</p>
      </div>

      <div class="s-top-item" @click="order('afterSale')">
        <p class="s-top-item-h">{{info.wait_process || 0}}</p>
        <p class="s-top-item-t">售后待处理</p>
      </div>

      <div class="s-top-item" @click="navigation('user')">
        <p class="s-top-item-h s-top-item-h-color">{{info.yesterday_visit_user}}</p>
        <p class="s-top-item-t">昨日访问用户</p>
      </div>

      <div class="s-top-item" @click="navigation('order')">
        <p class="s-top-item-h s-top-item-h-color">{{info.yesterday_trade}}</p>
        <p class="s-top-item-t">昨日订单数</p>
      </div>
      <div class="s-top-item" @click="navigation('wholeData')">
        <p class="s-top-item-h s-top-item-h-color">¥ {{info.yesterday_trade_fee}}</p>
        <p class="s-top-item-t">昨日交易额</p>
      </div>
    </div>

    <div class="s-box-title" style="margin: 40px 0 14px 0;">
      <span>常用功能</span>
    </div>

    <div class="s-cont">
      <div class="s-cont-item" v-for="item in contArr" :key="item.id" @click="navitionGo(item)">
        <img class="s-cont-item-img" src="@/assets/survey_star.png" alt="">
        <div class="s-cont-item-div">{{item.text}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { postAjax } from '@/utils/ajax'
import { SummaryInfoDat } from '@/api/api'
export default {
  name: 'Survey',
  data() {
    return {
      edition: 'dev',
      info: {},
      contArr: [
        {
          id: 1,
          img: '',
          text: '发布游戏',
          path: '/game/release',
        },
        {
          id: 2,
          img: '',
          text: '上架游戏盘',
          path: '/game/inventory/add',
        },
        {
          id: 3,
          img: '',
          text: '添加图片广告',
          path: '/operation/location/add',
        },
        {
          id: 4,
          img: '',
          text: '制作专题',
          path: '/operation/subject/add',
        },
        {
          id: 5,
          img: '',
          text: '添加游戏系列',
          path: '/game/series/add',
        },
        {
          id: 6,
          img: '',
          text: '添加游戏公司',
          path: '/game/company/add',
        },
        {
          id: 7,
          img: '',
          text: '定价调整',
          path: '/game/pricing/manage',
        },
        {
          id: 9,
          img: '',
          text: '渠道管理',
          path: '/operation/channel/index',
        },
        {
          id: 10,
          img: '',
          text: '奖杯调整',
          path: '/game/trophy/manage',
        },
      ],
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    navigation(type) {
      let path = ''
      switch(type) {
        case 'user':
          path = 'http://stats.platinumstar.store/#/userSummary/index'
          break;
        case 'order':
          path = 'http://stats.platinumstar.store/#/order/index'
          break;
        case 'wholeData':
          path = 'http://stats.platinumstar.store/#/wholeData/month'
          break;
        default:
      }
      window.open(path)
    },
    order(type) {
      let path = ''
      switch(type) {
        case 'shipments':
          path = '/order/shipments'
          break;
        case 'qualityTesting':
          path = '/order/qualityTesting'
          break;
        case 'afterSale':
          path = '/order/afterSale'
          break;
        default:
      }
      this.$router.push({
        path: path
      })
    },
    navitionGo(row) {
      this.$router.push({
        path: row.path
      })
    },
    setEdition(type) {
      this.edition = type
    },
    getInfo() {
      postAjax({
        url: SummaryInfoDat,
      }).then(res=> {
        const resdata = res.data
        this.info = resdata
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.s-box {
  &-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #2C2C2C;
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 14px;
    &-r {
      color: #606060;
      font-size: 12px;
      font-weight: 400;
      cursor: pointer;
    }
  }
  .s-top {
    background-color: #F8F8F8;
    display: flex;
    justify-content: space-between;
    padding: 0 50px;
    &-item {
      flex: 1;
      text-align: center;
      padding: 50px 0;
      cursor: pointer;
      &-h {
        height: 36px;
        line-height: 36px;
        font-size: 36px;
        color: #E7554E;
      }
      &-h-color {
        color: #4C87F9;
      }
      &-t {
        margin-top: 6px;
        color: #000;
      }
    }
  }
  .s-cont {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .s-cont-item {
      background-color: #F8F8F8;
      height: 80px;
      width: 300px;
      margin-bottom: 10px;
      margin-right: 10px;
      display: flex;
      align-items: center;
      padding-left: 20px;
      cursor: pointer;
      &-img {
        width: 50px;
        margin-right: 6px;
      }
      &-div {
        height: 40px;
        line-height: 40px;
        font-weight: 500;
        font-size: 14px;
      }
    }
  }
}
</style>