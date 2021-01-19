<template>
  <div class="view-box ta-box">
    <el-form ref="form" :model="form" label-width="120px">
      <div class="ta-header">奖杯信息</div>
      <div class="ta-form">
        <el-form-item label="显示名称：" prop="view_name">
          <el-input size="small" placeholder="请输入显示名称" v-model="form.v" />
        </el-form-item>
        <el-form-item label="原始名称：" prop="original_name">
          <el-input size="small" placeholder="请输入原始名称" v-model="form.org" />
        </el-form-item>
        <el-form-item label="公司介绍：" prop="i">
          <el-input type="textarea" v-model="form.i" :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
        </el-form-item>
        <el-form-item label="公司LOGO：" prop="logo">
          <upload-image @change="uploadChange" />
          <!-- <input type="file"> -->
          <!-- <el-input type="file" size="small" placeholder="请输入原始名称" v-model="form.logo" /> -->
        </el-form-item>
      </div>
      
      <div class="ta-btns">
        <el-form-item style="margin-bottom: 0;" label-width="0px">
          <el-button type="primary" @click="onSubmit">确定添加</el-button>
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
import {convertToBinary} from '@/utils'
export default {
  name: 'AddCompany',
  components: {UploadImage},
  data() {
    return {
      form: {
        v: '',
        org: '',
        logo: '',
        i: '',
      }
    }
  },
  mounted() {
    const { id } = this.$route.query
    console.log(this.$route)
    if(id) {
      this.getInfo(id)
    }
  },
  methods: {
    uploadChange(file) {
      console.log(file)
      this.form.logo = file.raw
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
            org: resdata.original_name
          }
        }
      })
    },
    onSubmit() {
      let params = this.form

      const { id } = this.$route.query
      // let fd = new FormData()
      if(id) {
        params.id = id
        // fd.append('id', id)
      }

      convertToBinary(params.logo, (filed) => {
        params.logo = filed

        // fd.append('v', params.v)
        // fd.append('org', params.org)
        // fd.append('logo', params.logo)
        // fd.append('i', params.id)
        // console.log(fd)
        console.log(params)
        postAjax({
          url: GameCompanySet,
          data: params
        }).then(res=> {
          console.log(res)
          if(res.code === 1) {
            this.$message.success('添加成功')
            this.$router.back(-1)
          }
        })
      })
      
    },
    detail() {
      console.log("detail")
    }
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