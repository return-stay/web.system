<template>
  <div class="view-box ta-box">
    <div class="view-box-title">{{title}}渠道</div>
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <div class="ta-header">录入信息</div>
      <div class="ta-form">
        <el-row>
          <el-col :span="20">
            <el-form-item label="渠道名称：" prop="nm">
              <el-input size="small" v-model="form.nm" placeholder="前台显示，使用中文名称" />
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="说明：" prop="des">
              <el-input type="textarea" v-model="form.des" :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
      </div>
      <div class="ta-btns">
        <el-form-item style="margin-bottom: 0;" label-width="0px">
          <el-button @click="onSubmit('form', 'save')">保存并预览</el-button>
          <el-button type="primary" @click="onSubmit('form')" v-if="title === '添加'">确定添加</el-button>
          <el-button type="primary" @click="onSubmit('form')" v-else>保存修改</el-button>
        </el-form-item>
      </div>
      <div class="ta-header" style="margin-top: 20px;">预览和分享</div>
      <div class="ta-form">
        <el-row>
          <el-form-item label="访问片段：">
            <el-input size="small" v-model="url_frag" :disabled="true"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="二维码：">
            <div style="width: 120px;height: 120px;">
              <image-larger :src="qr_code" :l_src="qr_code" alt="" />
            </div>
          </el-form-item>
        </el-row>
      </div>
    </el-form>
  </div>
</template>


<script>
import UploadImageOrder from '@/components/Upload/UploadImageOrder'
import ImageLarger from '@/components/ImageLarger'
import {postAjax} from '@/utils/ajax'
import {ChannelInfoSet, ChannelInfoDat} from '@/api/api'
export default {
  name: 'AddChannel',
  components: {UploadImageOrder, ImageLarger},
  data() {
    return {
      title: "添加",
      form: {
        nm: '',
        des: '',
      },
      rules: {
        nm: [ { required: true, message: '请输入渠道名称', trigger: 'blur' } ],
        des: [{ required: true, message: '请输入渠道说明', trigger: 'change' }],
      },
      url_frag: '',
      qr_code: '',
    }
  },
  mounted() {
    const {id} = this.$route.query
    if(id) {
      this.title = '编辑'
      this.getInfo(id)
    }
  },
  methods: {
    getInfo(id) {
      postAjax({
        url: ChannelInfoDat,
        data: {
          id: id
        }
      }).then(res=> {
        if(res.code === 1) {
          const resdata = res.data
          this.form = {
            nm: resdata.name,
            des: resdata.description,
          }
          this.url_frag = resdata.url_frag
          this.qr_code = resdata.qr_code
          this.selectList = resdata.game_list
        }
      })
    },
    onSubmit(formName, type) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addOrEidtRequest(() => {
            if(type === 'save') {}
          })
        }
      })
    },
    addOrEidtRequest(callback) {
      const {id} = this.$route.query
      let params = this.form, messageText = '添加成功'
      if(id) {
        params.id = id
        messageText = '编辑成功'
      }
      postAjax({
        url: ChannelInfoSet,
        data: params,
      }).then(res=> {
        console.log(res)
        if(res.code === 1) {
          this.$message.success(messageText)
          this.$router.back(-1)
          callback && callback()
        }
      })
    },
    detail() {
      console.log("detail")
    }
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