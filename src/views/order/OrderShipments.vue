<template>
  <div class="os-box">
    <div class="title">
      <span>订单号：{{orderInfo.transaction_id}}</span>
      <span v-if="orderInfo.status===50">已发货</span>
      <span v-else>发货准备</span>
    </div>
    <div class="od-user-info">
      <UserInfo :orderInfo="orderInfo" />
    </div>

    <div class="os-game-list">
      <div class="os-game-li" v-for="item in orderList" :key="item.id">
        <div class="os-game-li-title">
          <span class="os-game-li-title-t">游戏1</span>
          <span class="os-game-li-title-n">运单号：{{expressNo || '-'}}</span>
        </div>
        <div class="os-game-li-cont">
          <div class="os-game-li-cont-l">
            <ImageLarger :src="item.game_info.cover" :l_src="item.game_info.cover" alt="" />
          </div>
          <div class="os-game-li-cont-m">
            <div class="os-game-li-cont-m-t">
              <div class="os-game-li-cont-m-t-game" v-if="item.game_info">
                <p>{{item.game_info.platform_name}} {{item.game_info.name}}</p>
                <p>{{item.game_info.area_name}} {{item.game_info.language_name}}</p>
              </div>
              <div class="os-game-li-cont-m-t-loca" v-if="item.disc_info">
                <p>盘编号：{{item.disc_info.serial}}</p>
                <p>货架号：{{item.disc_info.shelves}}</p>
              </div>
            </div>
            <div class="os-game-li-cont-m-b">
              <h5>上传该游戏发货照片（盒、盘面的正反各1张）</h5>
              <div class="os-game-li-cont-m-b-imgs">
                <div class="os-game-li-cont-m-b-imgs-item" v-for="(pi, pin) in item.photoList" :key="pin">
                  <UploadImageOrder v-if="'disca' === pi.field" name="disca" :src="pi.path" :params="{oid: item.id,field: 'disca' }" />
                  <UploadImageOrder v-if="'discb' === pi.field" name="discb" :src="pi.path" :params="{oid: item.id,field: 'discb' }" />
                  <UploadImageOrder v-if="'boxa' === pi.field" name="boxa" :src="pi.path" :params="{oid: item.id,field: 'boxa' }" />
                  <UploadImageOrder v-if="'boxb' === pi.field" name="boxb" :src="pi.path" :params="{oid: item.id,field: 'boxb' }" />
                </div>
              </div>
            </div>
            <div class="os-game-li-cont-m-pan" v-if="item.status===50">
              <p>盘编号：{{item.disc_info.serial}}</p>
              <p style="margin-left: 100px;">货架号：{{item.disc_info.shelves}}</p>
            </div>
          </div>
          <div class="os-game-li-cont-r">
            <div class="os-game-li-cont-r-t">
              <span>选择游戏盘：</span>
              <el-select v-model="item.freeValue" placeholder="请选择可用游戏盘" no-data-text="无可用游戏盘" @change="(e)=> freeChange(e, item.id)">
                <el-option
                  v-for="fl in item.freeList"
                  :key="fl.id"
                  :label="fl.shelves + ' ' + fl.serial"
                  :value="fl.id">
                </el-option>
              </el-select>
            </div>
            <div class="os-game-li-cont-r-b"></div>
          </div>
        </div>
      </div>
      <template v-if="orderInfo.status<40">
        <div class="od-shipments">
          <div style="margin-right: 20px;">
            <span>快递公司：</span>
            <el-select v-model="companyValue" size="small" placeholder="请选择快递公司">
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
              <el-input v-model="epsno" size="small" placeholder="请输入内容"></el-input>
            </div>
          </div>
        </div>
        <div class="od-btns">
          <el-button type="primary" @click="confirmShipments ">确定发货</el-button>
          <!-- <span class="od-btn od-save-btn" @click="saveAndReturn">保存并返回</span> -->
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import UploadImageOrder from '@/components/Upload/UploadImageOrder'
import ImageLarger from '@/components/ImageLarger'
import UserInfo from './UserInfo'
import { postAjax } from '@/utils/ajax'
import { DiscOrderPhotoLst, DiscOrderListDat, DiscFreeLst, DiscOrderDiscSet, BaseDeliveryCompanyLst,TradeDeliverySet } from '@/api/api'
import { getStoreList } from '@/utils/data'
export default {
  name: 'OrderShipments',
  components: { UserInfo, UploadImageOrder, ImageLarger },
  props: {
    orderInfo: {
      type: Object,
      default: () => {}
    },
    expressNo: {
      type: String,
      default: '',
    },
  },
  computed: {
    companyValue() {
      return this.orderInfo.delivery_company_id || null
    }
  },
  data() {
    return {
      epsno: '',
      companyLst: [],
      orderList: [{id: 0, freeList: [], photoList: [], game_info: {},disc_info: {} }], //用户租借游戏盘列表
    }
  },
  async mounted() {
    await this.initBaselist()
    this.getDiscOrderListDat()
  },
  methods: {
    async initBaselist() {
      let list = await getStoreList(BaseDeliveryCompanyLst)
      console.log(list)
      this.companyLst = list
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
    // 设置截图
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
            resdata[i].freeList = freeList.data? freeList.data: []
            const photoList = await that.getDiscOrderPhotoLst(oid)
            const photoShowList = that.setPhotoList(photoList.data)
            resdata[i].photoList = photoShowList
          }
          that.orderList = resdata
        }
      })
    },
    // 选择盘
    setDiscOrderDiscSet (e, id) {
      console.log(e, id)
      return new Promise((resolve) => {
        postAjax({
          url: DiscOrderDiscSet,
          data: {
            id: id,
            did: e,
          }
        }).then(res=> {
          console.log(res)
          resolve(res)
        })
      })
      
    },
    // 选择游戏的游戏盘
    freeChange(e, id) {
      const orderList = this.orderList
      this.orderList = this.reasonIdUpdateItem(id, orderList, 'freeValue', e)
      // this.setDiscOrderDiscSet(e, id)
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
    saveAndReturn() {
      this.$emit('saveAndReturn', )
      this.updateParent()
    },
    async confirmShipments() {
      this.isShipments = 1
      const { id } = this.$route.params,
          companyValue = this.companyValue, 
          epsno = this.epsno
      let orderGameList = this.orderList
      if(!epsno) return this.$message.warning('请输入运单号')
      for(let i = 0;i<orderGameList.length;i++) {
        if(orderGameList[i].freeValue) {
          await this.setDiscOrderDiscSet(orderGameList[i].freeValue, orderGameList[i].id)
        }else {
          return this.$message.warning('请先选择游戏盘')
        }
      }
      
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
    updateParent() {
      this.$emit('update')
    }
  }
}
</script>

<style lang="scss" scoped>
.os-box {
  .title {
    height: 40px;
    color: #000;
    font-size: 20px;
    font-weight: 500;
  }
  .od-user-info {
    background-color: #F8F8F8;
    padding: 20px 42px;
    font-size: 14px;
    color: #444;
    margin-top: 14px;
  }
  .os-game-list {
    margin-top: 20px;
    .os-game-li {
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
        display: flex;
        border: 3px solid #F8F8F8;
        padding: 20px 40px;
        &-l {
          width: 100px;
          height: 100px;
          flex-shrink: 0;
          margin: 10px 46px 0 10px;
          >img {
            width: 100%;
          }
        }
        &-m, &-r {
          flex: 1;
          &-t {
            height: 136px;
            border-bottom: 1px solid #BABABA;
          }
          &-b {
            height: 158px;
          }
        }
        &-m {
          margin-right: 170px;
          position: relative;
          &-pan {
            position: absolute;
            right: -320px;
            top: 0;
            display: flex;
            padding: 15px 0;
            color: #000;
            font-size: 14px;
            line-height: 30px;
          }
          &-t {
            display: flex;
            padding: 15px 0;
            color: #000;
            font-size: 14px;
            line-height: 30px;
            box-sizing: border-box;
            &-game {
              flex: 1;
              margin-right: 20px;
            }
            &-loca {
              flex: 1;
            }
          }
          &-b {
            padding-top: 20px;
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
        
      }
    }

    .od-shipments {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-bottom: 16px;
      padding-right: 120px;
      .od-game-item-cont-right-un-num {
        display: flex;
        align-items: center;
      }
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
}
</style>