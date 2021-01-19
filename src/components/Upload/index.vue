<template>
  <div>
    <!-- <img v-if="file.url" :src="file.url" alt=""> -->
    <el-upload
      class="avatar-uploader"
      :name='name'
      :data="params"
      :action="uploadUrl"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrlShow" :src="imageUrlShow" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import {IMG_URL} from '@/api/api'
export default {
  name: 'UploadImage',
  props: {
    name: {
      type: String,
      default: 'filed',
    },
    params: {
      type: Object,
      default: () => {},
    },
    api: {
      type: String,
      default: '',
    },
    url: {
      type: String,
      default: ''
    },
  },
  computed: {
    imageUrlShow() {
      let img = ''
      if(this.imageUrl) {
        return this.imageUrl
      }
      if(this.url) {
        return IMG_URL + this.url
      }
      return ''
    },
  },
  data() {
    return {
      uploadUrl: IMG_URL + this.api,
      file: {},
      fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      imageUrl: '',
    };
  },
  mounted() {
    this.uploadUrl = IMG_URL + this.api
  },
  methods: {
    handleChange(file, fileList) {
      console.log(file, fileList)
      this.file = file
      this.fileList = fileList
      this.$emit('change', file, fileList)
    },
    handleAvatarSuccess(res, file) {
      console.log(res)
      if(res.code === 1) {
        this.$emit('success')
      }
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    handlePreview(file) {
      console.log(file)
    },
    handleRemove(file) {
      console.log(file);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
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
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
</style>