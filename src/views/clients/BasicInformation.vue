<template>
  <div class="bi-box">
    <el-form ref="form" :model="form" label-width="120px">
      <div class="title">基本信息</div>

      <div class="bi-form-box clearfix">
        <el-col :span="16">
          <el-form-item label="客户编号：">
            <el-input size="small" v-model="userInfo.id" :disabled="true">
              <i
                style="color: #838383;"
                class="el-icon-lock el-input__icon"
                slot="suffix">
              </i>
            </el-input>
          </el-form-item>
          <el-form-item label="微信昵称：">
            <el-input size="small" v-model="userInfo.nickname" :disabled="true">
              <i
                style="color: #838383;"
                class="el-icon-lock el-input__icon"
                slot="suffix">
              </i>
            </el-input>
          </el-form-item>
          <el-form-item label="微信头像：">
            <div class="wechart-photo">
              <image-larger :src="userInfo.avatar_url" />
            </div>
          </el-form-item>
          <el-form-item label="最近收货人名称：">
            <el-input size="small" v-model="userInfo.username" :disabled="true">
              <i
                style="color: #838383;"
                class="el-icon-lock el-input__icon"
                slot="suffix">
              </i>
            </el-input>
          </el-form-item>
          <el-form-item label="最近收货人电话：">
            <el-input size="small" v-model="userInfo.mobile" :disabled="true">
              <i
                style="color: #838383;"
                class="el-icon-lock el-input__icon"
                slot="suffix">
              </i>
            </el-input>
          </el-form-item>
          <el-form-item label="注册时间：">
            <el-input size="small" v-model="createTime" :disabled="true">
              <i
                style="color: #838383;"
                class="el-icon-lock el-input__icon"
                slot="suffix">
              </i>
            </el-input>
          </el-form-item>
        </el-col>
      </div>


      <div class="title">消费相关</div>
      <div class="bi-form-box clearfix">
        <el-col :span="9">
          <el-form-item label="账户余额：">
            <el-input size="small" :value="Number((userInfo.free_balance/100).toFixed(2))||null" :disabled="true">
              <span
                style="color: #000;"
                slot="suffix">元
              </span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="其中押金：">
            <el-input size="small" :value="Number((userInfo.froze_balance/100).toFixed(2))||null" :disabled="true">
              <span
                style="color: #000;"
                slot="suffix">元
              </span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-row>
          <el-col :span="9">
            <el-form-item label="累计消费：">
              <el-input size="small" :value="Number((userInfo.total_fee/100).toFixed(2))||null" :disabled="true">
                <span
                  style="color: #000;"
                  slot="suffix">元
                </span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
        

      <div class="title">畅玩卡</div>
      <div class="bi-form-box clearfix">
        <el-row>
          <el-col :span="9">
            <el-form-item label="卡片类型：">
              <el-input size="small" v-model="cardTypeName" :disabled="true">
                <i
                  style="color: #838383;"
                  class="el-icon-lock el-input__icon"
                  slot="suffix">
                </i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="开通时间：">
              <el-input size="small" v-model="startTime" :disabled="true">
                <i
                  style="color: #838383;"
                  class="el-icon-lock el-input__icon"
                  slot="suffix">
                </i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="有效期：">
              <el-input size="small" v-model="endTime" :disabled="true">
                <i
                  style="color: #838383;"
                  class="el-icon-lock el-input__icon"
                  slot="suffix">
                </i>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
    </el-form>
  </div>
</template>

<script>
import ImageLarger from '@/components/ImageLarger'
import {postAjax} from '@/utils/ajax'
import { UserInfoDat } from '@/api/api'
import moment from 'moment'
export default {
  name: 'BasicInformation',
  components: {ImageLarger},
  data() {
    return {
      userInfo: {},
      startTime: null,
      endTime: null,
      createTime: null,
      cardTypeName: '',
      form: {
        name: '',
      }
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      const { id } = this.$route.params
      postAjax({
        url: UserInfoDat,
        data: {
          id: id
        }
      }).then(res=> {
        console.log(res)
        if(res.code === 1) {
          let resdata = res.data
          this.userInfo = resdata

          this.endTime = resdata.end_time ? moment(resdata.end_time).format('YYYY-MM-DD') : null
          this.startTime = resdata.start_time ? moment(resdata.start_time).format('YYYY-MM-DD') : null
          this.createTime = resdata.create_time ? moment(resdata.create_time).format('YYYY-MM-DD') : null
          this.cardTypeName = resdata.card_type === 2? '畅玩季卡' : '畅玩年卡'
        }
      })
    }
  }
}
</script>

<style>
.bi-box .el-input.is-disabled .el-input__inner {
  background-color: #eaeaea;
}
</style>

<style lang="scss" scoped>
.bi-box {
  .title {
    height: 40px;
    background-color: #F8F8F8;
    line-height: 40px;
    padding-left: 16px;
  }
  .el-form-item {
    margin-bottom: 14px;
  }
  .bi-form-box {
    margin-top: 14px;
    .wechart-photo {
      width: 120px;
      height: 120px;
      >img {
        width: 100%;
      }
    }
  }
}
</style>