<template>
  <div class="view-box ta-box">
    <div class="view-box-title">添加图片位</div>
    <el-form ref="form" :model="form" label-width="120px">
      <div class="ta-header">录入信息</div>
      <div class="ta-form">
        <el-row>
          <el-col :span="20">
            <el-form-item label="显示位置：">
              <el-select size="small" v-model="form.l" placeholder="请选择">
                <el-option v-for="item in locationList" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="类型：">
              <el-select size="small" v-model="form.tp" placeholder="请选择">
                <el-option v-for="item in typeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="跳转内容：">
              <el-select size="small" v-model="form.rid" placeholder="请选择">
                <el-option label="全部" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="图片：">
              <upload-image :imageUrl="img" @change="uploadChange" />
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="标题/描述：" prop="desc">
              <el-input type="textarea" v-model="form.tt" :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
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
import { BaseContentTypeList, BaseContentLocationList,ContentInfoDat, ContentInfoSet, baseApi } from '@/api/api'
import {getList} from '@/utils/data'
import UploadImageOrder from '@/components/Upload/UploadImageOrder'
import ImageLarger from '@/components/ImageLarger'
import { postAjax } from '@/utils/ajax'
import ajax from '@/utils/request'
import UploadImage from '@/components/Upload'
export default {
  name: 'AddImagesLocation',
  components: {UploadImageOrder, ImageLarger, UploadImage},
  data() {
    return {
      typeList: [],
      locationList: [],
      img: '',
      form: {
        tp: '',
        l: '',
        rid: '631',
        tt: '',
        // img: '',
      }
    }
  },
  mounted() {
    this.getSearchListInit()
    this.getInfo()
  },
  methods: {
    async getSearchListInit() {
      this.typeList = await getList(BaseContentTypeList)
      this.locationList =  await getList(BaseContentLocationList)
    },
    inputchang(file) {
      console.log(file.target.files[0])
      this.img =  file.target.files[0]
    },
    uploadChange(file) {
      console.log(file)
      const that = this
      this.img = file.raw
      // convertToBinary(file.raw, (o) => {
      //   that.img = o
      // })
    },
    getInfo() {
      const {id} = this.$route.query
      if(id) {
        postAjax({
          url: ContentInfoDat,
          data: {id},
        }).then(res=> {
          const resdata = res.data
          this.form = {
            tp: resdata.type_name,
            l: resdata.location,
            rid: resdata.relation_id,
            tt: resdata.title,
          }
        })
      }
    },
    onSubmit() {
      const {id} = this.$route.query
      let fd = new FormData()
      let thisform = this.form
      if(id) {
        fd.append('id', id)
      }
      fd.append('tp', thisform.tp)
      fd.append('l', thisform.l)
      fd.append('rid', thisform.rid)
      fd.append('tt', thisform.tt)
      fd.append('img', new Blob([this.img]));
      ajax({
        method: 'post',
        url: ContentInfoSet,
        data: fd,
        headers: {
          'Content-Type': 'multipart/form-data', // 关键
        },
      }).then(res=> {
        console.log(res)
        if(res.code === 1) {
          this.$message.success('添加成功')
          this.$router.back(-1)
        }
      })
    },
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