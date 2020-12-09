<template>
  <div class="od-box">
    <div class="title">
      <span>订单号：1066666666</span>
      <span> / </span>
      <span>下单时间：2020-09-12 12:09:10</span>
    </div>

    <div class="od-status">
      <div class="od-status-left">
        <div class="od-status-title">待支付</div>
        <div class="od-status-text">该客户还未支付，请耐心等待支付完成。</div>
        <div class="od-status-btns">
          <el-button type="primary">关闭订单</el-button>
        </div>
      </div>
      <div class="od-status-steps">
        <div style="width: 100%;">
          <el-steps :active="1" align-center finish-status="finish">
            <el-step title="客户下单" description="2020-07-20 15:35:59" icon="el-icon-success"></el-step>
            <el-step title="客户支付" description="" icon="el-icon-success"></el-step>
            <el-step title="仓库发货" description="" icon="el-icon-success"></el-step>
            <el-step title="客户收货" description="" icon="el-icon-success"></el-step>
          </el-steps>
        </div>
      </div>
    </div>

    <div class="od-user-info">
      <el-row :gutter="76">
        <el-col :span="6">
          <div>
            <h3>收货信息</h3>
            <p>收货人：另一个人</p>
            <p>联系电话：134102348679</p>
            <p>地址：北京市朝阳区农展南路11号瑞辰国际中心907</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <h3>配送信息</h3>
            <p>配送方式：韵达快递</p>
            <p>配送时间：工作日、节假日均可</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <h3>支付信息</h3>
            <p>支付金额：300.00 元</p>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <h3>客户信息</h3>
            <p>微信昵称：金师傅</p>
            <p>备注：请挑一张港版机器可以玩的，最好是美版英文</p>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="od-game-info">
      <div class="od-game-item">
        <div class="od-game-item-title">
          <span class="od-game-item-title-t">游戏1</span>
          <span class="od-game-item-title-n">运单号：-</span>
        </div>
        <div class="od-game-item-cont">
          <div class="od-game-item-cont-left">
            <img src="" alt="">
          </div>
          <div class="od-game-item-cont-middle">
            <div class="od-game-item-cont-middle-up">
              <div class="od-game-item-cont-middle-up-game">
                <p>PS4 血污 夜之仪式</p>
                <p>美版 中文</p>
              </div>
              <div class="od-game-item-cont-middle-up-loca">
                <p>盘编号：-</p>
                <p>货架号：-</p>
              </div>
            </div>
            <el-divider></el-divider>
            <div class="od-game-item-cont-middle-un">
              <h5>上传该游戏发货照片（盒、盘面的正反各1张）</h5>
              <div class="od-game-item-cont-middle-un-imgs">
                  <UploadImageOne />
                  <UploadImageOne />
                  <UploadImageOne />
                  <UploadImageOne />
              </div>
            </div>
          </div>
          <div class="od-game-item-cont-right">
            <div class="od-game-item-cont-right-up">
              <span>选择游戏盘：</span>
              <el-select v-model="value" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <el-divider></el-divider>
            <div class="od-game-item-cont-right-un">
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
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="od-btns">
      <el-button type="primary">主要按钮</el-button>
      <span class="od-btn od-save-btn">保存并返回</span>
    </div>
  </div>
</template>

<script>
import UploadImageOne from '@/components/Upload/UploadImageOne'
export default {
  name: 'OrderDetail',
  components: {UploadImageOne},
  props: {},
  data() {
    return {
      dialogVisible: false,
      dialogImageUrl: '',
      input: '',
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
      value: '',
    }
  }
}
</script>

<style lang="scss" scoped>
.od-box {
  background-color: #fff;
  min-height: 100%;
  padding: 16px;
  .el-divider--horizontal {
    margin: 20px 0;
  }
  .title {
    height: 40px;
    color: #000;
    font-size: 20px;
    font-weight: 500;
  }
  .od-status {
    background-color: #F8F8F8;
    padding: 3px;
    display: flex;
    .od-status-left {
      width: 350px;
      height: 200px;
      background-color: #fff;
      margin-right: 3px;
      padding: 30px 40px;
      .od-status-title {
        font-size: 30px;
        color: #000;
        font-weight: 500;
      }
      .od-status-text {
        font-size: 14px;
        margin-top: 20px;
      }
      .od-status-btns {
        margin-top: 20px;
      }
    }
    .od-status-steps {
      flex: 1;
      background-color: #fff;
      display: flex;
      align-items: center;
    }
  }
  .od-user-info {
    background-color: #F8F8F8;
    padding: 20px 42px;
    font-size: 14px;
    color: #444;
    margin-top: 14px;
    h3 {
      margin-bottom: 14px;
    }
    p {
      line-height: 20px;
    }
  }
  .od-game-info {
    margin-top: 20px;
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
        display: flex;
        padding: 20px 40px;
        &-left {
          width: 100px;
          height: 100px;
          flex-shrink: 0;
          margin-right: 30px;
          background-color: red;
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
              margin-top: 10px;
              display: flex;
              align-items: center;
            }
          }
        }
      }
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
</style>