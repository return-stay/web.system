<template>
  <div>
    <el-upload
      class="avatar-uploader"
      :name='name'
      :data="params"
      action="#"
      :auto-upload="false"
      :show-file-list="false"
      :on-change="handleChange"
      :before-upload="beforeAvatarUpload">
      <img v-if="imageUrlShow" :src="imageUrlShow" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import {IMG_URL} from '@/api/api'
import {beforeAvatarUpload} from './upload'
import {convertToBinary} from '@/utils'
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
    imageUrl: {
      type: String,
      default: '',
    },
  },
  computed: {
    imageUrlShow() {
      if(this.imageUrl) {
        return this.imageUrl
      }
      if(this.imgUrl) {
        return this.imgUrl
      }
    },
  },
  data() {
    return {
      imgUrl: '',
      uploadUrl: IMG_URL + this.api,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
    };
  },
  mounted() {
    this.uploadUrl = IMG_URL + this.api
  },
  methods: {
    handleChange(file, fileList) {
      console.log(file)
      convertToBinary(file.raw, (res) => {
        this.imgUrl = res
      })
      this.$emit('change', file, fileList)
    },
    beforeAvatarUpload(file) {
      return beforeAvatarUpload(file)
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