<template>
  <div class="sgl-box">
    <div class="od-game-item" v-for="item in orderList" :key="item.id">
      <div class="od-game-item-title">
        <span class="od-game-item-title-t">游戏1</span>
        <span class="od-game-item-title-n">运单号：{{expressNo || '-'}}</span>
      </div>
      <div class="od-game-item-cont">
        <div class="od-game-item-cont-top">
          <div class="od-game-item-cont-left">
            <img :src="item.game_info.cover" alt="">
          </div>
          <div class="od-game-item-cont-middle" :style="isShipments !== 0?'margin-right: 0;':''">
            <div class="od-game-item-cont-middle-up">
              <div class="od-game-item-cont-middle-up-game" v-if="item.game_info">
                <p>{{item.game_info.platform_name}} {{item.game_info.name}}</p>
                <p>{{item.game_info.area_name}} {{item.game_info.language_name}}</p>
              </div>
              <div class="od-game-item-cont-middle-up-loca" v-if="item.disc_info">
                <p>盘编号：{{item.disc_info.serial}}</p>
                <p>货架号：{{item.disc_info.shelves}}</p>
              </div>
              <div class="od-game-item-cont-middle-up-loca" v-else>
                <p>盘编号：-</p>
                <p>货架号：-</p>
              </div>
            </div>
            <el-divider></el-divider>
          </div>
          <div class="od-game-item-cont-right" v-if="isShipments === 0">
            <div class="od-game-item-cont-right-up">
              <span>选择游戏盘：</span>
              <el-select v-model="item.freeValue" placeholder="请选择" @change="(e)=> freeChange(e, item.id)">
                <el-option
                  v-for="fl in item.freeList"
                  :key="fl.id"
                  :label="fl.shelves"
                  :value="fl.id">
                </el-option>
              </el-select>
            </div>
            <el-divider></el-divider>
          </div>
          <div class="od-game-item-cont-right" v-if="isShipments !== 0">
              <div class="od-game-item-cont-right-price">
                <span>租金：{{Number(item.day_rent/100).toFixed(2)}}元/天</span>
                <span>押金：{{Number(item.deposit/100).toFixed(2)}}元</span>
              </div>
          </div>
        </div>
        <div class="od-game-item-cont-bottom">
          <div class="od-game-item-cont-left"></div>
          <div class="od-game-item-cont-middle">
            <div class="od-game-item-cont-middle-un">
              <h5>上传该游戏发货照片（盒、盘面的正反各1张）</h5>
              <div class="od-game-item-cont-middle-un-imgs">
                <div class="od-game-item-cont-middle-un-imgs-item" v-for="(pi, pin) in item.photoList" :key="pin">
                  <UploadImageOrder v-if="'disca' === pi.field" name="disca" :src="pi.path" :params="{oid: item.id,field: 'disca' }" />
                  <UploadImageOrder v-if="'discb' === pi.field" name="discb" :src="pi.path" :params="{oid: item.id,field: 'discb' }" />
                  <UploadImageOrder v-if="'boxa' === pi.field" name="boxa" :src="pi.path" :params="{oid: item.id,field: 'boxa' }" />
                  <UploadImageOrder v-if="'boxb' === pi.field" name="boxb" :src="pi.path" :params="{oid: item.id,field: 'boxb' }" />
                </div>
                
              </div>
            </div>
          </div>
          <div class="od-game-item-cont-right" v-if="isShipments === 0">
            <!-- <div class="od-game-item-cont-right-un">
              <div>
                <span>快递公司：</span>
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div class="od-game-item-cont-right-un-num">
                <span>运单号：</span>
                <div style="margin-left: 4px;">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
                </div>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="od-shipments">
      <div style="margin-right: 20px;">
        <span>快递公司：</span>
        <el-select v-model="companyValue" placeholder="请选择">
          <el-option
            v-for="ci in companyLst"
            :key="ci.id"
            :label="ci.name"
            :value="ci.id">
          </el-option>
        </el-select>
      </div>
      <div class="od-game-item-cont-right-un-num">
        <span>运单号：</span>
        <div style="margin-left: 4px;">
          <el-input v-model="epsno" placeholder="请输入内容"></el-input>
        </div>
      </div>
    </div>
    <div class="od-btns">
      <el-button type="primary" @click="confirmShipments ">确定发货</el-button>
      <span class="od-btn od-save-btn" @click="saveAndReturn">保存并返回</span>
    </div>
  </div>
</template>

<script>
import {DiscFreeLst, DiscOrderListDat, DiscOrderPhotoLst, BaseDeliveryCompanyLst, TradeDeliverySet, DiscOrderDiscSet} from '@/api/api'
import { getAjax, postAjax } from '@/utils/ajax'
import UploadImageOrder from '@/components/Upload/UploadImageOrder'
import ImageLarger from '@/components/ImageLarger'
export default {
  name: 'ShipmentsGameList',
  components: { UploadImageOrder, ImageLarger },
  props: {
    transactionId: {
      type: String,
      default: '',
    }
  },
  data() {
    return {
      isShipments: 0, //是否发货 0：未发货 1：已发货
      expressNo: '',
      epsno: '',
      value: '',
      companyValue: '',
      companyLst: [],
      orderList: [{id: 0, freeList: [{id: 0}], photoList: [], game_info: {},disc_info: {} }], //用户租借游戏盘列表
      options: [{
        value: 'shunfeng',
        label: '顺丰'
      }, {
        value: 'zhongtong',
        label: '中通'
      }, {
        value: 'yuantong',
        label: '圆通'
      }, {
        value: 'youzheng',
        label: '邮政速运'
      }],
    }
  },
  mounted() {
    this.getDiscOrderListDat()
    this.getDeliveryCompanyLst()
  },
  methods: {
    // 获取物流公司
    getDeliveryCompanyLst () {
      getAjax({
        url: BaseDeliveryCompanyLst,
      }).then(res=> {
        if(res.code === 1) {
          this.companyLst = res.data
        }else {
          this.companyLst = []
        }
      })
    },
    setPhotoList(photoList = []) {
      let arr = [
        { field: 'disca', path: '' },
        { field: 'discb', path: '' },
        { field: 'boxa', path: '' },
        { field: 'boxb', path: '' },
      ]

      for(let i = 0;i<arr.length;i++) {
        for(let j=0;j<photoList.length;j++) {
          if(arr[i].field === photoList[j].field) {
            arr[i].path = photoList[j].path
          }
        }
      }
      return arr
    },
    getDiscOrderPhotoLst (id) {
      return postAjax({
        url: DiscOrderPhotoLst,
        data: {
          oid: id,
        }
      })
    },
    // 根据游戏ID 获取可以发货的游戏盘
    getDiscFreeLst(id ) {
      return postAjax({
        url: DiscFreeLst,
        data: {
          gid: id
        }
      })
    },
    // 选择盘
    setDiscOrderDiscSet (e, id) {
      postAjax({
        url: DiscOrderDiscSet,
        data: {
          id: id,
          did: e,
        }
      })
    },
    // 获取用户租借游戏盘列表
    getDiscOrderListDat() {
      const { id } = this.$route.params
      const that = this
      postAjax({
        url: DiscOrderListDat,
        data: {
          tid: id,
        }
      }).then(async res=> {
        if(res.code === 1) {
          const resdata = res.data
          for(let i = 0;i<resdata.length;i++) {
            const oid = resdata[i].id, gid = resdata[i].game_info.id
            const freeList = await that.getDiscFreeLst(gid)
            resdata[i].freeList = freeList.data? [freeList.data]: []
            const photoList = await that.getDiscOrderPhotoLst(oid)
            const photoShowList = that.setPhotoList(photoList.data)
            resdata[i].photoList = photoShowList
          }
          that.orderList = resdata
        }
      })
    },
    saveAndReturn() {
      this.$emit('saveAndReturn', )
      this.updateParent()
    },
    confirmShipments() {
      this.isShipments = 1
      const { id } = this.$route.params,
          companyValue = this.companyValue, epsno = this.epsno
      postAjax({
        url: TradeDeliverySet,
        data: {
          id: id,
          did: companyValue,
          epsno: epsno,
        }
      }).then(res=> {
        if(res.code === 1) {
          this.$message.success('发货成功')
          this.updateParent()
        }
      })
    },
    // 选择游戏的游戏盘
    freeChange(e, id) {
      const orderList = this.orderList
      this.orderList = this.reasonIdUpdateItem(id, orderList, 'freeValue', e)
      this.setDiscOrderDiscSet(e, id)
    },

    // 根据ID 修改某一项的值  id 修改项的ID  arr 当前数组  key， 
    reasonIdUpdateItem (id, arr, key, value) {
      for(let i = 0;i<arr.length;i++) {
        if(arr[i].id === id) {
          arr[i][key] = value
        }
      }
      return arr
    },
    updateParent() {
      this.$emit('update')
    }
  },
}
</script>

<style lang="scss" scoped>
.sgl-box {
  .od-game-item {
    margin-bottom: 20px;
    &-title {
      height: 38px;
      &-t {
        font-size: 14px;
        color: #000;
        background-color:#F8F8F8;
        width: 140px;
        text-align: center;
      }
      &-n {
        font-size: 12px;
        color: #2C2C2C;
        min-width: 160px;
        margin-left: 80px;
      }
      >span {
        display: inline-block;
        height: 38px;
        line-height: 38px;
      }
    }
    &-cont {
      border: 3px solid #F8F8F8;
      padding: 20px 40px;
      &-top, &-bottom {
        display: flex;
      }
      &-left {
        width: 100px;
        height: 100px;
        flex-shrink: 0;
        margin-right: 30px;
        >img {
          width: 100%;
        }
      }
      &-middle, &-right {
        flex: 1;
      }
      &-middle {
        margin-right: 100px;
        &-up {
          height: 80px;
          padding: 15px 0;
          color: #000;
          font-size: 14px;
          line-height: 24px;
          display: flex;
          &-game {
            margin-right: 80px;
          }
        }
        &-un {
          &-imgs {
            margin-top: 20px;
            min-height: 80px;
            display: flex;
            &-item {
              margin-right: 10px;
              width: 100px;
              height: 100px;
            }
          }
        }
      }
      &-right {
        &-up {
          font-size: 16px;
          height: 80px;
          padding: 15px 0;
        }
        &-up, &-un {
          >span{
            display: inline-block;
            width: 150px;
            text-align: right;
          }
          >div {
            >span{
              display: inline-block;
              width: 150px;
              text-align: right;
            }
          }
        }
        &-un {
          &-num {
            // margin-top: 10px;
            display: flex;
            align-items: center;
          }
        }
        &-price {
          font-size: 14px;
          padding: 15px 0;
          >span {
            margin-right: 40px;
          }
        }
      }
    }
  }
  .od-shipments {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 16px;
    padding-right: 120px;
  }
  .od-btns {
    text-align: right;
    padding-right: 120px;
    .od-btn {
      display: inline-block;
      margin-left: 36px;
      font-size: 14px;
      color: #4C87F9;
      cursor: pointer;
    }
  }
}
</style>