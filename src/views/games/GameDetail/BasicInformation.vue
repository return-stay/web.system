<template>
  <div class="bi-box">
    <el-form ref="form" :model="form" label-width="120px">
      <div class="title">基本信息</div>

      <div class="bi-form-box clearfix">
        <el-col :span="16">
          <el-form-item label="显示名称：">
            <el-input size="small" v-model="form.name" :disabled="disabled">
              <i
                style="color: #838383;"
                class="el-icon-lock el-input__icon"
                slot="suffix">
              </i>
            </el-input>
          </el-form-item>
          <el-form-item label="原始名称：">
            <el-input size="small" v-model="form.name" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="显示简介：">
            <el-input size="small" v-model="form.name" :disabled="disabled"></el-input>
          </el-form-item>
          <el-form-item label="封面图：">
            <div class="wechart-photo">
              <image-larger />
            </div>
          </el-form-item>
        </el-col>
        
      </div>

      <div class="title">发行信息</div>

      <div class="bi-form-box clearfix">
        <el-col :span="9">
          <el-form-item label="平台：">
            <el-select size="small" style="width: 100%;" v-model="form.region" placeholder="请选择">
              <el-option label="全部" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="游戏类型：">
            <el-select size="small" style="width: 100%;" v-model="form.region" placeholder="请选择">
              <el-option label="全部" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-row>
          <el-col :span="9">
            <el-form-item label="区域版本：">
              <el-select size="small" style="width: 100%;" v-model="form.region" placeholder="请选择">
                <el-option label="全部" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="语言：">
              <el-select size="small" style="width: 100%;" v-model="form.region" placeholder="请选择">
                <el-option label="全部" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="开发公司：">
              <el-select size="small" style="width: 100%;" v-model="form.region" placeholder="请选择">
                <el-option label="全部" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="发行日期：">
              <el-date-picker
                style="width: 100%;"
                v-model="form.date"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="奖杯编码：">
              <el-input size="small" v-model="form.name" :disabled="disabled"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
        

      <div class="title">运营相关</div>

      <div class="bi-form-box clearfix">
        <el-row>
          <el-col :span="9">
            <el-form-item label="所属系列：">
              <el-select size="small" style="width: 100%;" v-model="form.region" placeholder="请选择">
                <el-option label="全部" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="内容分类：">
              <el-radio-group v-model="form.radio">
                <el-radio label="1">最新可租</el-radio>
                <el-radio label="2">推荐游戏</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-col :span="16">
          <el-form-item label="关键词：">
            <el-input size="small" type="textarea" :rows="4" v-model="form.name" :disabled="disabled">
              <i
                style="color: #838383;"
                class="el-icon-lock el-input__icon"
                slot="suffix">
              </i>
            </el-input>
          </el-form-item>
          <el-form-item label="游戏截图：">
            <div>
              <upload-image-order />
            </div>
          </el-form-item>
        </el-col>
      </div>

      <div class="gd-btns">
        <el-button type="primary" @click="onSubmit">保存并预览</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import ImageLarger from '@/components/ImageLarger'
import UploadImageOrder from '@/components/Upload/UploadImageOrder'

export default {
  name: 'BasicInformation',
  components: { ImageLarger, UploadImageOrder },
  data() {
    return {
      disabled: false,
      form: {
        name: '',
      }
    }
  },
  methods: {
    onSubmit() {},
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
  .gd-btns {
    height: 80px;
    line-height: 80px;
    margin-top: 20px;
    background-color: #FFF8CC;
    text-align: center;
  }
}
</style>