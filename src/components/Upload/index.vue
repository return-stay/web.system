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
      <img v-if="imageUrlShow && imgShow" :src="imageUrlShow" @error='defImg' class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
import {IMG_URL} from '@/api/api'
import {beforeAvatarUpload} from './upload'
import {convertToBinary} from '@/utils'
const defaultImg = require('@/assets/default_add.png')
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
    isNeedId: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
      default: '',
    },
  },
  computed: {
    imageUrlShow() {
      if(this.imgUrl) {
        return this.imgUrl
      }
      let imageUrl = this.imageUrl
      if(imageUrl && typeof imageUrl === 'string') {
        console.log(imageUrl.indexOf('http'))
        if(imageUrl.indexOf('http')>-1) {
          return  imageUrl
        }else {
          return IMG_URL + imageUrl
        }
      } else {
        return ''
      }
    },
  },
  data() {
    return {
      imgShow: true,
      imgUrl: '',
      uploadUrl: IMG_URL + this.api,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      defaultImg: defaultImg,
    };
  },
  mounted() {
    this.uploadUrl = IMG_URL + this.api
  },
  methods: {
    defImg(event) {
      console.log(event)
      let img = event.srcElement;
      img.src = this.defaultImg;
      img.onerror = null; //防止闪图
    },
    handleChange(file, fileList) {
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
    display: block;
  }
</style>