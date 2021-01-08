<template>
  <div class="view-box ta-box">
    <div class="view-box-title">当前开关</div>
    <el-form ref="form" :model="form" label-width="120px">
      <div class="ta-header">分组：畅玩卡</div>
      <div class="ta-form">
        <el-row v-for="item in list" :key="item.id">
          <el-col :span="14">
            <div class="form-col-title">{{item.name}}</div>
          </el-col>
          <el-col :span="10">
            <el-switch
              v-model="item.is_on"
              active-text="已打开"
              inactive-text="已关闭"
              @change="(e)=> switchChange(e, item.id)"
              >
            </el-switch>
          </el-col>
        </el-row>
      </div>

      <!-- <div class="ta-header">分组：其他</div>
      <div class="ta-form">
        <el-row>
          <el-col :span="14">
            <div class="form-col-title">其他设置</div>
          </el-col>
          <el-col :span="10">
            <el-switch
              v-model="form.other"
              active-text="已打开"
              inactive-text="已关闭">
            </el-switch>
          </el-col>
        </el-row>
      </div>
      <div class="ta-btns">
        <el-form-item style="margin-bottom: 0;" label-width="0px">
          <el-button type="primary" @click="onSubmit">保存并更新</el-button>
        </el-form-item>
      </div> -->
    </el-form>
  </div>
</template>


<script>
import UploadImageOrder from '@/components/Upload/UploadImageOrder'
import ImageLarger from '@/components/ImageLarger'
import { SwitchListDat, SwitchInfoSet } from '@/api/api'
import request from '@/utils/request'
import { postAjax } from '@/utils/ajax'
export default {
  name: 'SettingSwitch',
  components: {UploadImageOrder, ImageLarger},
  data() {
    return {
      value1: true,
      list: [],
      form: {
        home: true,
        gameDetail: false,
        shopCar: false,
        share: true,
        other: true,
      }
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList() {
      request({
        url: SwitchListDat,
        method: 'post',
      }).then(res=> {
        const resdata = res.data;
        this.list = resdata
      })
    },
    // 开关控制
    switchChange(bool, id) {
      console.log(bool, id)
      this.switchRequest(bool, id)
    },
    switchRequest(bool, id ) {
      const that = this
      postAjax({
        url: SwitchInfoSet,
        data: {
          id, 
          is_on: bool
        }
      }).then(res=> {
        if(res.code === 1){
          that.$message({
            message: '操作成功',
            type: 'success'
          })
        }else {
          that.$message.error('操作失败')
        }
      }).catch(()=> {
        // that.getList()
      })
    },
    onSubmit() {
      console.log('submit!');
      console.log(this.form)
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
    width: 70%;
    .form-col-title {
      width: 230px;
      text-align: right;
      margin-bottom: 30px;
    }
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