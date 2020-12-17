<template>
  <div :class="'ui-box '+ uploadClass">
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove">
      <div class="icon-box">
        <i class="el-icon-plus"></i>
        <span class="icon-box-span" v-if="uploadText">{{uploadText}}</span>
      </div>
      
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UploadImageOne',
  props: {
    uploadText: {
      type: String,
      default: '',
    },
    uploadClass: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>

<style>
.ui-box {
  width: 100px;
  margin-right: 20px;
  margin-bottom: 20px;
  display: inline-block;
}
.ui-box .el-upload--picture-card {
  width: 100px;
  height: 100px;
  line-height: 98px;
}

.ui-box.upload-demo .el-upload--picture-card {
  width: 180px;
  height: 120px;
  line-height: 98px;
}

</style>
<style lang="scss" scoped>
.ui-box {
  .icon-box {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &-span {
      display: inline-block;
      font-size: 12px;
      line-height: 14px;
      height: 14px;
      color: #8c939d;
      margin-top: 4px;
    }
  }
}
</style>