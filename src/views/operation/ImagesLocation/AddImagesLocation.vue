<template>
  <div class="view-box ta-box">
    <div class="view-box-title">添加图片位</div>
    <el-form ref="form" :model="form" label-width="120px">
      <div class="ta-header">录入信息</div>
      <div class="ta-form">
        <el-row>
          <el-col :span="20">
            <el-form-item label="显示位置：">
              <el-select size="small" v-model="form.region" placeholder="请选择">
                <el-option label="全部" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="类型：">
              <el-select size="small" v-model="form.region" placeholder="请选择">
                <el-option label="全部" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="跳转内容：">
              <el-select size="small" v-model="form.region" placeholder="请选择">
                <el-option label="全部" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="图片：">
              <UploadImageOne uploadClass='upload-demo' uploadText="添加图片" />
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="标题/描述：" prop="desc">
              <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
      </div>
      <div class="ta-btns">
        <el-form-item style="margin-bottom: 0;" label-width="0px">
          <el-button>保存</el-button>
          <el-button type="primary" @click="onSubmit">发布图片位</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>


<script>
import UploadImageOne from '@/components/Upload/UploadImageOne'
import ImageLarger from '@/components/ImageLarger'
export default {
  name: 'AddImagesLocation',
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