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
      <img v-if="imageUrlShow" :src="imageUrlShow" @error='defImg' class="avatar">
      <div v-else class="upload-default">
        <i class="el-icon-plus avatar-uploader-icon"></i>
        <span class="upload-default-text" v-if="defaultText">{{defaultText}}</span>
      </div>
      
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
    defaultText: {
      type: String,
      default: '',
    }
  },
  computed: {
    imageUrlShow() {
      if(this.imgUrl) {
        return this.imgUrl
      }
      let imageUrl = this.imageUrl + '?t=' + new Date().getTime()
      if(this.imageUrl && imageUrl && typeof imageUrl === 'string') {
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
      imgUrl: '',
      uploadUrl: IMG_URL + this.api,
      defaultImg: defaultImg,
    };
  },
  mounted() {
    this.uploadUrl = IMG_URL + this.api
  },
  methods: {
    defImg(event) {
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
@import './upload.css';
</style>