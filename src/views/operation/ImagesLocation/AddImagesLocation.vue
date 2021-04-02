<template>
  <div class="view-box ta-box">
    <div class="view-box-title">添加图片位</div>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <div class="ta-header">录入信息</div>
      <div class="ta-form">
        <el-row>
          <el-col :span="20">
            <el-form-item label="显示位置：" prop="l">
              <el-select size="small" v-model="form.l" placeholder="请选择">
                <el-option v-for="item in locationList" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="类型：" prop="tp">
              <el-select size="small" v-model="form.tp" placeholder="请选择"  @change="typeChange">
                <el-option v-for="item in typeList" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="跳转内容：" prop="rid">
              <el-select size="small" v-model="form.rid" placeholder="请选择">
                <el-option v-for="item in contentList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="图片：" prop="img">
              <UploadImage :imageUrl="fdimg" @change="uploadChange" />
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="标题/描述：" prop="tt">
              <el-input type="textarea" v-model="form.tt" :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
      </div>
      <div class="ta-btns">
        <el-form-item style="margin-bottom: 0;" label-width="0px">
          <el-button>保存</el-button>
          <el-button type="primary" @click="submitForm('form')">发布图片位</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import { 
  BaseContentTypeList,
  BaseContentLocationList,
  ContentInfoDat, 
  ContentInfoSet,
  TopicListDat,
  GameMiniLst,
  BaseSortLst,
  BaseDefinesortLst,
  BaseGroupLst,
  BaseGameCompanyLst } from '@/api/api'
import {getList, postList} from '@/utils/data'
import ImageLarger from '@/components/ImageLarger'
import { postAjax } from '@/utils/ajax'
import ajax from '@/utils/request'
import UploadImage from '@/components/Upload'
export default {
  name: 'AddImagesLocation',
  components: { ImageLarger, UploadImage},
  data() {
    return {
      typeList: [],
      locationList: [],
      contentList: [],
      fdimg: null,
      form: {
        tp: 1,
        l: 1,
        rid: 634,
        tt: '',
        img: '',
      },
      rules: {
        l: [ { required: true, message: '请选择显示位置', trigger: 'blur' } ],
        tp: [ { required: true, message: '请选择类型', trigger: 'blur' } ],
        rid: [ { required: true, message: '请选择跳转内容', trigger: 'blur' } ],
        tt: [ { required: true, message: '请输入标题/描述', trigger: 'blur' } ],
        img: [ { required: true, message: '请上传图片', trigger: 'change' } ],
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
      await this.typeChange(1, (i) => {
        this.form = {
          tp: 1,
          l: 1,
          rid: i,
          tt: '',
          img: '',
        }
      })
    },
    async typeChange(e, callback) {
      let list = [], gid = 0
      switch(e) {
        case 1: //游戏
          list = await postList(GameMiniLst)
          for(let i = 0 ; i< list.length;i++) {
            list[i].name = `${list[i].id} | ${list[i].platform_name} | ${list[i].view_name} | ${list[i].area_name} ${list[i].language_name}`
            list[i].lable = list[i].id
            if(i === 0) {
              gid = list[i].id
            }
          }
          break;
        case 2: //专题
          list = await postList(TopicListDat)
          for(let i = 0 ; i< list.length;i++) {
            list[i].lable = list[i].id
            list[i].name = list[i].title
          }
          break;
        case 3: //游戏公司
          list = await getList(BaseGameCompanyLst)
          break;
        case 4: //游戏分类
          list = await getList(BaseSortLst)
          break;
        case 5: //系列
          list = await getList(BaseGroupLst)
          break;
        case 6: //内容分类
          list = await getList(BaseDefinesortLst)
          break;
        case 9: //小程序页面
          list = []
          break;
        default:
          list= []
      }
      this.form.rid = null
      this.contentList = list
      callback && callback(gid)
    },
    uploadChange(file) {
      this.form.img = file.raw
      this.fdimg = file.raw
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
            tp: resdata.type,
            l: resdata.location,
            rid: resdata.relation_id,
            tt: resdata.title,
            img: resdata.img
          }
          this.fdimg = resdata.img
        })
      }
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.onSubmit()
        }
      })
    },
    onSubmit() {
      const {id} = this.$route.query
      let fd = new FormData(), thisform = this.form, messageText = '添加成功'
      if(id) {
        fd.append('id', id)
        messageText = '编辑成功'
      }
      fd.append('tp', thisform.tp)
      fd.append('l', thisform.l)
      fd.append('rid', thisform.rid)
      fd.append('tt', thisform.tt)
      if(!(thisform.img || this.fdimg)) {
        this.$message.warning('请先上传图片')
        return 
      }
      if(!thisform.img) {
        fd.append('img', this.fdimg);
      }
      ajax({
        method: 'post',
        url: ContentInfoSet,
        formdata: true,
        data: fd,
        headers: {
          'Content-Type': 'multipart/form-data', // 关键
        },
      }).then(res=> {
        if(res.code === 1) {
          this.$message.success(messageText)
          this.$router.back(-1)
        }
      })
    },
  }
}
</script>

<style lang="scss">
.ta-form .el-form-item {
  margin-bottom: 20px;
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