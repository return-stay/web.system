<template>
  <div>
    <el-upload
      action="#"
      class="avatar-uploader"
      :auto-upload="false"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-change="handleChange"
      :on-remove="handleRemove">
      <div class="upload-default">
        <i class="el-icon-plus"></i>
        <span class="upload-default-text" v-if="defaultText">{{defaultText}}</span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img class="avatar" v-for="(item, index) in fileList" :key="index" width="100%" :src="item.src" alt="">
    </el-dialog>
  </div>
</template>

<script>
import {IMG_URL} from '@/api/api'
import {beforeAvatarUpload} from './upload'
// import {convertToBinary} from '@/utils'
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
      default: ''
    },
  },
  computed: {
    imageUrlShow() {
      if(this.imgUrl) {
        return this.imgUrl
      }
      let imageUrl = this.imgUrl
      if(imageUrl && typeof imageUrl === 'string') {
        if(imageUrl.indexOf('http') > -1) {
          return imageUrl+ '?t=' + (new Date().getTime())
        }else {
          return IMG_URL + imageUrl + '?t=' + (new Date().getTime())
        }
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
      fileList: [],
    };
  },
  mounted() {
    this.uploadUrl = IMG_URL + this.api
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      console.log(file)
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleChange(file, fileList) {
      console.log(file, fileList)
      // if(this.isNeedId && !this.params.id) {
      //   this.$message.warning('请先添加游戏')
      // }else {
      //   convertToBinary(file.raw, (res) => {
      //     this.imgUrl = res
      //   })
      //   this.$emit('change', file, fileList)
      // }
      this.$emit('change', fileList, file)
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
<style>
  .avatar-uploader .el-upload--picture-card {
    width: 100px;
    height: 100px;
    line-height: 100px;
  }
  .el-upload-list--picture-card .el-upload-list__item {
    height: 100px;
    width: 100px;
    text-align: center;
  }
  .el-upload-list--picture-card .el-upload-list__item-thumbnail {
    width: auto;
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
</style>