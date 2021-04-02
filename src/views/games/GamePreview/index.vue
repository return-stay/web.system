<template>
  <div v-if="isShow" class="gp-box" @click="hide">
    <div className="goods-info add-goods-box user-box" style='padding: 40px'>
      <div class="device-ios">
        <div class="device-inner" @click.stop="stop">
          <div class="phone-title">游戏详情</div>

          <div class="sc-bg">
            <div class="sc-bg-bottom"></div>
          </div>
          <div class="gd-info box-relative">
            <div class="info-right">
              <GameImage :src="gameInfo.cover" />
            </div>
            <div class="info-left">
              <!-- <game-name gameInfo="gameInfo" isArea="false" nameStyle="font-size: 26rpx;font-weight: 400;color: #6F6F6F;"></game-name> -->
              <div class="info-left-name">
                <img v-if="gameInfo.platform_id === 1" class="gi-bg"  src="@/assets/OSLabel/PS4.png" alt="">
                <img v-else-if="gameInfo.platform_id === 2" class="gi-bg" src="@/assets/OSLabel/PS3.png" alt="">
                <img v-else-if="gameInfo.platform_id === 3" class="gi-bg" src="@/assets/OSLabel/PSV.png" alt="">
                <span>{{gameInfo.view_name}}</span>
              </div>

              <div class="info-left-text" style="margin-top: 20rpx;">
                <span class="info-left-text-cont info-left-text-date">发售区域： {{gameInfo.area_name}}</span>
              </div>
              <div class="info-left-text">
                <span class="info-left-text-cont info-left-text-date">语言： {{gameInfo.language_name}}</span>
              </div>
              <div class="info-left-text">
                <span class="info-left-text-cont info-left-text-date">类型： {{gameInfo.sort_name}}</span>
              </div>
              <div class="info-left-text">
                <span class="info-left-text-cont info-left-text-date">开发公司： {{gameInfo.company_name}}</span>
              </div>
              <div class="info-left-text">
                <span class="info-left-text-cont info-left-text-date">发行日期： {{createTime}}</span>
              </div>
              <div class="info-left-text">
                <span class="info-left-text-cont info-left-text-date">官方奖杯编号：
                  <span v-for="item in discNos" :key="item"> #{{item}}</span>
                </span>
              </div>
              <div class="info-left-text">
                <span class="info-left-text-cont info-left-text-date">白金难度： </span>
                <span v-if="trophyInfo.level === 1">神作</span>
                <span v-else-if="trophyInfo.level === 2">极易</span>
                <span v-else-if="trophyInfo.level === 3">容易</span>
                <span v-else-if="trophyInfo.level === 4">普通</span>
              </div>

              <div class="info-left-bottom">
                <div class="info-left-disc-info">
                  <!-- 有库存 -->
                  <span v-if="gameInfo.depot_free>0" class="info-left-disc-yes">有库存</span>
                  <span v-else class="info-left-disc-no">无库存</span>
                </div>
              </div>
            </div>
          </div>

          <div class="rent-box box-relative">
            <div class="rent-item">
              <div class="rent-title">租金</div>
              <div class="rent-cont text-decorations" style="color: #6f6f6f;margin-bottom: 4px;" v-if="priceInfo.day_rent">{{(priceInfo.original_rent/100).toFixed(2)}}元/天</div>
              <div class="rent-cont ">{{(priceInfo.day_rent/100).toFixed(2)}}元/天</div>
            </div>
            <div class="rent-item">
              <div class="rent-title">押金</div>
              <div class="rent-cont">{{(priceInfo.deposit/100).toFixed(2)}}元</div>
            </div>
            <div class="rent-item">
              <div class="rent-title">起租天数</div>
              <div class="rent-cont" style="color: #FF4A20;">3天</div>
            </div>
            <div class="rent-item">
              <div class="rent-title">库存</div>
              <div class="rent-cont" v-if="gameInfo.depot_free>0">充足</div>
              <div class="rent-cont" style="color: #FF4A20;" wx:else>库存不足</div>
            </div>
          </div>

          <div class="gd-intro box-relative">
            <div class="gd-title">游戏简介</div>
            <div class="gd-intro-cont">
              <span>{{gameInfo.intro}}</span>
            </div>
          </div>

          <div class="gd-intro box-relative">
            <div class="gd-title">游戏截图</div>
            <div class="gd-imgs">
              <div class="gd-imgs-li" v-for="(item, index) in screenshotList" :key="index">
                <ImageLarger :src="item.preview_url" />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { postAjax } from '@/utils/ajax'
import {GameInfoDat, GamePriceInf, GameTrophyInf } from '@/api/api'
import GameImage from './GameImage'
import ImageLarger from '@/components/ImageLarger'
import moment from 'moment'
export default {
  name: 'GamePreview',
  props: {
    id: {
      type: Number | String,
      default: 0,
    }
  },
  components: { GameImage, ImageLarger },
  data() {
    return {
      isShow: false,
      gameInfo: {},
      priceInfo: {},
      trophyInfo: {},
      screenshotList: [],
      discNos: [],
      createTime: '',
    }
  },
  computed: {
    cid() {
      const id = this.$route.params.id
      return this.id || id
    }
  },
  mounted() {
    this.getInfo()
    this.getPrice()
  },
  methods: {
    getInfo() {
      console.log(this.cid)
      if(this.cid) {
        postAjax({
          url: GameInfoDat,
          data: {
            id: this.cid
          }
        }).then(res=> {
          if(res.code === 1) {
            let resdata = res.data;
            this.gameInfo = resdata
            this.screenshotList = resdata.screenshot || []
            this.discNos = resdata.disc_no.split('-')
            this.getThophy(resdata.disc_no)

            this.createTime = moment(resdata.create_time).format('YYYY-MM-DD HH:mm:ss')
          }
        })
      }
    },
    getPrice() {
      if(this.cid) {
        postAjax({
          url: GamePriceInf,
          data: {
            gid: this.cid
          }
        }).then(res=> {
          if(res.code === 1) {
            this.priceInfo = res.data
          }
        })
      }
    },
    getThophy(dn) {
      postAjax({
        url: GameTrophyInf,
        data: {
          dn
        }
      }).then(res=> {
        if(res.code === 1) {
          this.trophyInfo= res.data
        }
      })
    },
    stop() {
      return false
    },
    hide() {
      this.isShow = false
      this.$emit('hide')
    },
    show() {
      this.isShow = true
    }
  }
}
</script>

<style lang="scss" scoped>
.gp-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,.5);
  z-index: 10000;
  .device-ios {
    margin: 0 auto;
    width: 415px;
    height: 847px;
    background: #111;
    border-radius: 55px;
    box-shadow: 0px 0px 0px 2px #aaa;
    padding: 75px 20px 105px 20px;
    position: relative;
  }

  .device-ios:before {
    content: '';
    width: 60px;
    height: 10px;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    margin-left: -30px;
    background: #333;
    top: 36px;
  }

  .device-ios:after {
    content: '';
    position: absolute;
    width: 60px;
    height: 60px;
    left: 50%;
    margin-left: -30px;
    bottom: 20px;
    border-radius: 100%;
    box-sizing: border-box;
    border: 5px solid #333;
  }

  .device-inner {
    height: 100%;
    background-color: #f5f5f5;
    overflow-x: hidden;
    overflow: auto;
    position: relative;
    padding-bottom: 20px;
    /* 背景色 */
    .sc-bg {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      overflow: hidden;
      &-bottom {
        flex-shrink: 0;
        width: 160%;
        margin: 0 auto;
        height: 140px;
        background-color: #01479D;
        border-bottom-left-radius: 100%;
        border-bottom-right-radius: 100%;
      }
    }
    .phone-title {
      position: relative;
      z-index: 100;
      color: #fff;
      text-align: center;
      height: 44px;
      line-height: 44px;
      font-size: 14px;
      font-weight: 600;
    }
    .box-relative {
      border-radius: 8px;
      margin: 10px auto 0;
      width: 357px;
      background-color: #fff;
    }
    .gd-info {
      display: flex;
      position: relative;
      padding: 15px 25px 23px 25px;
    }
    .gd-title {
      height: 35px;
      font-size: 14px;
      line-height: 35px;
      color: #545454;
      padding-left: 10px;
      font-weight: 600;
      position: relative;
    }

    .gd-bd-left {
      position: absolute;
      top: 0;
      left: 0;
      height: 40px;
      width: 4px;
      background-color: #029cbd;
    }

    .info-left {
      padding-top: 5px;
      margin-left: 13px;
      flex: 1;
      position: relative;
      font-size: 14px;
      &-name {
        margin-bottom: 10px;
        line-height: 18px;
        .gi-bg {
          width: 30px;
          height: 15px;
          margin-right: 5px;
          vertical-align: middle;
        }
      }
      &-bottom {
        position: absolute;
        bottom: -14px;
        right: 0;
        color: #fff;
        font-size: 9px;
        display: flex;
      }
      &-disc-info {
        width: 40px;
        height: 15px;
        line-height: 15px;
        text-align: center;
        border-radius: 3px;
        font-size: 10px;
      }
      &-disc-yes {
        color: #fff;
        background-color: #f7a061;
      }
      &-disc-no {
        line-height: 13px;
        color: #6f6f6f;
        border: 1px solid #a5a5a5;
      }
      &-text {
        min-height: 10px;
        line-height: 10px;
        margin-bottom: 5px;
        font-size: 10px;
        font-weight: 400;
        color: #6f6f6f;
      }
      &-text-cost {
        margin-right: 9px;
      }
    }
    .info-right {
      width: 132px;
      height: 118px;
      flex-shrink: 0;
      position: relative;
      text-align: center;
      border-radius: 2px;
      &-pla {
        height: 12px;
        width: 57px;
      }
      &-vip {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 59px;
        height: 20px;
      }
    }

    .pd-bg {
      margin-top: 20rpx;
      background-color: #fff;
      padding: 0 20rpx 20rpx;
    }

    
    .rent-box {
      min-height: 88px;
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      padding: 17px 20px 15px 33px;
      .rent-item {
        width: 64px;
        text-align: center;
        .rent-title {
          font-size: 13px;
          color: #545454;
          font-weight: 400;
          line-height: 13px;
          margin-bottom: 13px;
        }
        .rent-cont {
          font-size: 13px;
          color: #4387da;
          font-weight: 400;
          line-height: 12px;
        }
        .text-decorations {
          text-decoration: line-through;
        }
      }
    }
    .gd-intro {
      padding: 7px 10px 20px;
      &-cont {
        padding: 0 10px;
        font-size: 10px;
        color: #666;
        line-height: 18px;
      }
      .gd-imgs {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 0 5px;
        min-height: 100px;
        &-li {
          width: 160px;
          height: 90px;
          flex-shrink: 0;
          margin-top: 5px;
          &-img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>