<template>
  <div class="view-box ta-box">
    <el-form ref="form" :model="form" label-width="120px">
      <div class="ta-header">奖杯信息</div>
      <div class="ta-form">
        <el-form-item label="显示名称：">
          <el-input size="small" placeholder="请输入显示名称" />
        </el-form-item>
        <el-form-item label="原始名称：">
          <el-input size="small" placeholder="请输入原始名称" />
        </el-form-item>
        <el-form-item label="公司介绍：" prop="desc">
          <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
        </el-form-item>
        <el-form-item label="公司LOGO：">
          <upload-image-one />
        </el-form-item>
      </div>
      
      <div class="ta-btns">
        <el-form-item style="margin-bottom: 0;" label-width="0px">
          <el-button type="primary" @click="onSubmit">确定添加</el-button>
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>


<script>
import UploadImageOne from '@/components/Upload/UploadImageOne'
export default {
  name: 'AddCompany',
  components: {UploadImageOne},
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
    width: 50%;
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