<template>
  <div class="view-box ta-box">
    <div class="view-box-title">{{title}}</div>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <div class="ta-header">专题信息</div>
      <div class="ta-form">
        <el-row>
          <el-col :span="20">
            <el-form-item label="专题标题：" prop="tt">
              <el-input size="small" v-model="form.tt" placeholder="前台显示，使用中文名称" />
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="描述：" prop="des">
              <el-input type="textarea" placeholder="专题页显示的描述，不超过500个汉字" v-model="form.des" :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="专题图：">
              <UploadImage :imageUrl="img" uploadClass='upload-demo' defaultText='750 * 360'  @change="uploadChange" />
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
      </div>
      
      <div class="ta-header">专题游戏</div>
      <div class="ta-form">
        <SelectGames 
          :propsList="gameIds" 
          addText="添加到专题" 
          delteText="从专题去掉" 
          @addCallback="addCallback"
          ></SelectGames>
      </div>
      
      <div class="ta-btns">
        <el-form-item style="margin-bottom: 0;" label-width="0px">
          <el-button @click="onSubmit('form', false)">保存专题</el-button>
          <el-button type="primary" @click="onSubmit('form', true)">发布专题</el-button>
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import UploadImage from '@/components/Upload'
import SelectGames from '@/components/SelectGames'
import { TopicInfoDat, TopicInfoSet, TopicOnSet } from '@/api/api'
import { postAjax, stopOrEnableRequest } from '@/utils/ajax'
import ajax from '@/utils/request'
export default {
  name: 'AddGameSubject',
  components: { UploadImage, SelectGames },
  data() {
    return {
      title: '添加专题',
      gameIds: [],
      form: {
        tt: '',
        des: '',
      },
      fdimg: '',
      img: '',
      rules: {
        tt: [
          { required: true, message: '请输入专题标题', trigger: 'blur' }
        ],
      }
    }
  },
  mounted() {
    const { id } = this.$route.query
    if(id) {
      this.title = '编辑专题'
      this.getInfo(id)
    }
  },
  methods: {
    getInfo(id) {
      postAjax({
        url: TopicInfoDat,
        data: {
          id
        }
      }).then(res=> {
        if(res.code === 1) {
          const resdata = res.data
          this.form = {
            tt: resdata.title,
            des: resdata.description,
          }
          this.img = resdata.img
          this.gameIds = resdata.game_id_list
        }
      })
    },
    uploadChange(file) {
      this.img = ''
      this.fdimg = file.raw
    },
    addCallback(e) {
      this.gameIds = e
    },
    addSubjectRequest(bool) {
      let params = this.form
      const { id } = this.$route.query
      let fd = new FormData(), messageText = '保存成功'
      if(id) {
        fd.append('id', id)
        messageText = '编辑成功'
      }
      fd.append('tt', params.tt)
      fd.append('des', params.des)
      console.log(this.fdimg)
      if(!this.img) {
        fd.append('img', this.fdimg)
      }
      if(this.gameIds && this.gameIds.length>0) {
        fd.append('gms', this.gameIds.join('-'))
      }

      ajax({
        method: 'post',
        formdata: true,
        url: TopicInfoSet,
        data: fd,
        headers: {
          'Content-Type': 'multipart/form-data', // 关键
        },
      }).then(res=> {
        if(res.code === 1) {
          if(bool) {
            this.enableRequest(res.id)
          }else {
            this.$message.success(messageText)
            this.$router.back(-1)
          }
          callback&&callback(res)
        }
      })
    },
    // bool是否发布， true发布， false 不发布
    onSubmit(formName, bool) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addSubjectRequest(bool)
        }
      })
    },
    enableRequest(id) {
      const that = this
      if(id) {
        stopOrEnableRequest({
          url: TopicOnSet,
          data: {id: id},
          successText: '发布成功',
        }, () => {
          that.$router.back(-1)
        })
      }
    },
  }
}
</script>
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