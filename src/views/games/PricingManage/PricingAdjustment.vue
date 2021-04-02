<template>
  <div class="view-box bi-box">
    <Pricing />
    <!-- <el-form ref="form" :model="form" label-width="120px">
      <div class="title">定价</div>
      <div class="bi-form-box clearfix">
        <el-row>
          <el-col :span="16">
            <el-form-item label="游戏：">
              <el-select size="small" style="width: 100%;" v-model="form.region" placeholder="请选择">
                <el-option label="全部" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="成本均价：">
              <el-input v-model="form.name" size="small" :disabled="true">
                <span
                  style="color: #000;"
                  slot="suffix">元
                </span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="日租原价">
              <el-input v-model="form.name" size="small">
                <span
                  style="color: #000;"
                  slot="suffix">元
                </span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="日租金：">
              <el-input v-model="form.name" size="small">
                <span
                  style="color: #000;"
                  slot="suffix">元
                </span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="9">
            <el-form-item label="押金：">
              <el-input v-model="form.name" size="small">
                <span
                  style="color: #000;"
                  slot="suffix">元
                </span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
        

      <div class="title">上架信息</div>

      <div class="bi-form-box clearfix">
        <el-row>
          <el-col :span="9">
            <el-form-item label="运费：">
              <el-select size="small" style="width: 100%;" v-model="form.region" placeholder="按重量和距离远近选择">
                <el-option label="全部" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <div class="gd-btns">
        <el-button type="primary" @click="onSubmit">保存并预览</el-button>
      </div>
    </el-form> -->
  </div>
</template>

<script>
import ImageLarger from '@/components/ImageLarger'
import UploadImageOrder from '@/components/Upload/UploadImageOrder'
import Pricing from '../Release/Pricing'
export default {
  name: 'PricingAdjustment',
  components: { ImageLarger, UploadImageOrder, Pricing },
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