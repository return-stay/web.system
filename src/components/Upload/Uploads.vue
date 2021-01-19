<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :action="uploadUrl"
      :name='name'
      :data="params"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="handleSuccess">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import {baseApi} from '@/api/api'
export default {
  name: 'Uploads',
  props: {
    name: {
      type: String,
      default: 'filed',
    },
    params: {
      type: Object,
      default: () => {},
    },
    url: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      uploadUrl: '',
      dialogImageUrl: '',
      dialogVisible: false
    };
  },
  mounted() {
    this.uploadUrl = baseApi + this.url
  },
  methods: {
    handleSuccess() {
      this.$emit('success')
    },
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .el-upload--picture-card {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    width: 100px;
    height: 100px;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>