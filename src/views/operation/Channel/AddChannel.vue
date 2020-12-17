<template>
  <div class="view-box ta-box">
    <div class="view-box-title">添加渠道</div>
    <el-form ref="form" :model="form" label-width="120px">
      <div class="ta-header">录入信息</div>
      <div class="ta-form">
        <el-row>
          <el-col :span="20">
            <el-form-item label="渠道名称：">
              <el-input size="small" placeholder="前台显示，使用中文名称" />
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="说明：" prop="desc">
              <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
      </div>
      <div class="ta-btns">
        <el-form-item style="margin-bottom: 0;" label-width="0px">
          <el-button>保存并预览</el-button>
          <el-button type="primary" @click="onSubmit">确定添加</el-button>
        </el-form-item>
      </div>
      <div class="ta-header">预览和分享</div>
      <div class="ta-form">
        <el-row>
          <el-form-item label="访问片段：">
            <el-input size="small" :disabled="true"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="二维码：">
            <div style="width: 120px;height: 120px;">
              <image-larger src="" alt="" />
            </div>
          </el-form-item>
        </el-row>
      </div>
    </el-form>
  </div>
</template>


<script>
import UploadImageOne from '@/components/Upload/UploadImageOne'
import ImageLarger from '@/components/ImageLarger'
export default {
  name: 'AddChannel',
  components: {UploadImageOne, ImageLarger},
  data() {
    return {
      form: {
        region: '',
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
      console.log(this.form)
    },
    detail() {
      console.log("detail")
    }
  }
}
</script>

<style lang="scss">
.ta-form .el-form-item {
  margin-bottom: 14px;
}
</style>
<style lang="scss" scoped>
.ta-box {
  .ta-header {
    height: 40px;
    line-height: 40px;
    background-color: #F8F8F8;
    color: #2C2C2C;
    padding-left: 20px;
    margin-bottom: 20px;
  }
  .ta-form {
    width: 70%;
  }

  .ta-btns {
    height: 80px;
    margin-top: 20px;
    background-color: #FFF8CC;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>