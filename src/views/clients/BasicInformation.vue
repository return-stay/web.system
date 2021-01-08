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
            <el-input size="small" v-model="userInfo.nickname" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="微信头像：">
            <div class="wechart-photo">
              <image-larger />
            </div>
          </el-form-item>
          <el-form-item label="收件人名称：">
            <el-input size="small" v-model="form.name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="收件人电话：">
            <el-input size="small" v-model="form.name" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="注册时间：">
            <el-input size="small" v-model="userInfo.create_time" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        
      </div>


      <div class="title">消费相关</div>
      <div class="bi-form-box clearfix">
        <el-col :span="9">
          <el-form-item label="账户余额：">
            <el-input size="small" v-model="form.name" :disabled="true">
              <span
                style="color: #000;"
                slot="suffix">元
              </span>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="其中押金：">
            <el-input size="small" v-model="form.name" :disabled="true">
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
              <el-input size="small" v-model="form.name" :disabled="true">
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
              <el-input size="small" v-model="form.name" :disabled="true">
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
              <el-input size="small" v-model="form.name" :disabled="true">
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
              <el-input size="small" v-model="form.name" :disabled="true">
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
export default {
  name: 'BasicInformation',
  components: {ImageLarger},
  props: {
    userInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      form: {
        name: '',
      }
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