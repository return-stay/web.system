<template>
  <div class="view-box ta-box">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <div class="ta-header">{{title}}公司信息</div>
      <div class="ta-form">
        <el-form-item label="显示名称：" prop="v">
          <el-input size="small" placeholder="请输入显示名称" v-model="form.v" />
        </el-form-item>
        <el-form-item label="原始名称：" prop="org">
          <el-input size="small" placeholder="请输入原始名称" v-model="form.org" />
        </el-form-item>
        <el-form-item label="公司介绍：" prop="i">
          <el-input type="textarea" v-model="form.i" :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
        </el-form-item>
        <el-form-item label="公司LOGO：" prop="logo">
          <upload-image :imageUrl="logo"  @change="uploadChange" />
          <!-- <input type="file"> -->
          <!-- <el-input type="file" size="small" placeholder="请输入原始名称" v-model="form.logo" /> -->
        </el-form-item>
      </div>
      
      <div class="ta-btns">
        <el-form-item style="margin-bottom: 0;" label-width="0px">
          <el-button v-if="type === 'add'" type="primary" @click="onSubmit('form')">确定添加</el-button>
          <el-button v-if="type === 'edit'" type="primary" @click="onSubmit('form')">保存修改</el-button>
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>


<script>
import UploadImage from '@/components/Upload'
import {GameCompanyInf, GameCompanySet } from '@/api/api'
import { postAjax } from '@/utils/ajax'
import ajax from '@/utils/request'
export default {
  name: 'AddCompany',
  components: {UploadImage},
  data() {
    return {
      title: '添加',
      type: 'add',
      logo: '',
      form: {
        v: '',
        org: '',
        i: '',
      },
      rules: {
        v: [ { required: true, message: '请输入公司显示名称', trigger: 'blur' } ],
        org: [{ required: true, message: '请输入公司原始名称', trigger: 'blur' }],
      },
    }
  },
  props: {
    isNavition: {
      type: Boolean,
      default: true,
    }
  },
  mounted() {
    const { id } = this.$route.query
    console.log(this.$route)
    if(id) {
      this.getInfo(id)
      this.title = '编辑'
      this.type = 'edit'
    }
  },
  methods: {
    uploadChange(file) {
      console.log(file)
      this.logo = file.raw
    },
    getInfo(id) {
      postAjax({
        url: GameCompanyInf,
        data: {
          id
        }
      }).then(res=> {
        console.log(res)
        if(res.code === 1) {
          const resdata = res.data
          this.companyInfo = resdata

          this.form = {
            v: resdata.view_name,
            org: resdata.original_name,
            i: resdata.intro,
          }
          this.logo = resdata.logo
        }
      })
    },
    companyRequest() {
      let params = this.form
      const { id } = this.$route.query
      let fd = new FormData()
      if(id) {
        fd.append('id', id)
      }
      fd.append('v', params.v)
      fd.append('org', params.org)
      if(this.logo) {
        fd.append('logo', this.logo)
      }
      fd.append('i', params.i)

      ajax({
        method: 'post',
        formdata: true,
        url: GameCompanySet,
        data: fd,
        headers: {
          'Content-Type': 'multipart/form-data', // 关键
        },
      }).then(res=> {
        console.log(res)
        if(res.code === 1) {
          this.$message.success('添加成功')
          if(this.isNavition) {
            this.$router.back(-1)
          }else {
            this.$emit('callback', res.data.id)
          }
        }
      })
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.companyRequest()
        }
      })
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
    width: 50%;
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