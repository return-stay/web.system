<template>
  <div :class="'ui-box '+ uploadClass">
    <el-upload
      class="avatar-uploader"
      :action="uploadUrl"
      :show-file-list="false"
      :name='name'
      :data="params"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload">
      <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar">
      <div class="avatar-uploader-icon icon-box" v-else>
        <i class="el-icon-plus"></i>
        <span class="icon-box-span">{{uploadText}}</span>
      </div>
    </el-upload>
    <!-- <el-upload
      :action="uploadUrl"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-success="handleAvatarSuccess"
      :name='name'
      :data="params"
      :on-remove="handleRemove">

      <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar">
      <div class="icon-box" v-else>
        <i class="el-icon-plus"></i>
        <span class="icon-box-span" v-if="uploadText">{{uploadText}}</span>
      </div>
    </el-upload> -->
    <!-- <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog> -->
  </div>
</template>

<script>
import {baseApi} from '@/api/api'
export default {
  name: 'UploadImageOrder',
  props: {
    src: {
      type: String,
      default: '',
    },
    name: {
      type: String,
      default: 'filed',
    },
    params: {
      type: Object,
      default: () => {},
    },
    oid: {
      type: Number,
      default: 0,
    },
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
      uploadUrl: baseApi + '/disc/order/photo.set',
      dialogImageUrl: this.src,
      dialogVisible: false
    }
  },
  mounted() {
    // console.log(baseApi)
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.dialogImageUrl = URL.createObjectURL(file.raw);
      this.dialogVisible = true;
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log(file)
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>

<style>


.ui-box {
  height: 100%;
  width: 100px;
  margin-right: 20px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
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
<style lang="scss" scoped>
.ui-box {
  .avatar {
    width: 100%;
  }
  .icon-box {
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