<template>
  <div class="view-box ta-box">
    <div class="view-box-title">添加专题</div>
    <el-form ref="form" :model="form" label-width="120px">
      <div class="ta-header">专题信息</div>
      <div class="ta-form">
        <el-row>
          <el-col :span="20">
            <el-form-item label="专题标题：">
              <el-input size="small" placeholder="前台显示，使用中文名称" />
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="描述：" prop="desc">
              <el-input type="textarea" placeholder="专题页显示的描述，不超过500个汉字" v-model="form.desc" :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="专题图：">
              <UploadImageOrder uploadClass='upload-demo' uploadText="添加图片" />
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
      </div>
      
      <div class="ta-header">专题游戏</div>
      <div class="ta-form">
        <el-row>
          <el-col :span="20">
            <el-form-item label="选择游戏：">
              <el-select size="small" style="width: 100%;" v-model="form.region" placeholder="优先使用奖杯编号和游戏名称检索">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button size="small" style="margin-left: 10px;">添加到专题</el-button>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="20">
            <el-form-item label="已选择：" prop="desc">
              <el-input type="textarea" v-model="form.desc" :autosize="{ minRows: 8 }"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2" style="height: 100%;">
            <el-button size="small" style="margin-left: 10px;">从专题去掉</el-button>
          </el-col>
        </el-row>
      </div>
      
      <div class="ta-btns">
        <el-form-item style="margin-bottom: 0;" label-width="0px">
          <el-button>保存并预览</el-button>
          <el-button type="primary" @click="onSubmit">发布专题</el-button>
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>


<script>
import UploadImageOrder from '@/components/Upload/UploadImageOrder'
export default {
  name: 'AddGameSubject',
  components: {UploadImageOrder},
  data() {
    return {
      form: {
        region: '',
      }
    }
  },
  methods: {
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