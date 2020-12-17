<template>
  <div class="gb-box">
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="120px">
      <div class="gr-title">基本信息</div>

      <div class="gd-cont">
        <el-form-item label="显示名称：" prop="pass">
          <el-input v-model="form.name" size="small" placeholder="前台显示的游戏名称，请使用中文"></el-input>
        </el-form-item>
        <el-form-item label="原始名称：" prop="pass">
          <el-input v-model="form.name" size="small" placeholder="仅在后台显示，可以用英文、日文或繁体等"></el-input>
        </el-form-item>
        <el-form-item label="显示简介：" prop="pass">
          <el-input v-model="form.name"  type="textarea" size="small" placeholder="前台显示游戏描述，最好不要超过200汉字"></el-input>
        </el-form-item>

        <el-form-item label="封面图：" prop="pass">
          <upload-image-one />
        </el-form-item>
      </div>

      <div class="gr-title">发行信息</div>

      <div class="gd-cont gd-cont-o">
        <el-row>
          <el-col :span='12'>
            <el-form-item label="平台：" prop="pass">
              <el-select style="width: 100%;" v-model="form.region" size="small" placeholder="请选择平台">
                <el-option label="全部" value="0"></el-option>
                <el-option label="PS4" value="1"></el-option>
                <el-option label="PSV" value="2"></el-option>
                <el-option label="PS3" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="游戏类型：" prop="pass">
              <el-select style="width: 100%;" v-model="form.region" size="small" placeholder="请选择游戏类型">
                <el-option label="全部" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="区域版本：" prop="pass">
              <el-select style="width: 100%;" v-model="form.region" size="small" placeholder="请选择区域版本">
                <el-option label="全部" value="0"></el-option>
                <el-option label="PS4" value="1"></el-option>
                <el-option label="PSV" value="2"></el-option>
                <el-option label="PS3" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="语言：" prop="pass">
              <el-select style="width: 100%;" v-model="form.region" size="small" placeholder="请选择语言">
                <el-option label="全部" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="开发公司：" prop="pass">
              <el-select style="width: 100%;" v-model="form.region" size="small" placeholder="游戏公司名称可检索">
                <el-option label="全部" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="发行日期：" prop="pass">
              <el-date-picker
                style="width: 100%;"
                v-model="form.date"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="奖杯编码：" prop="pass">
              <el-select style="width: 100%;" v-model="form.region" size="small" placeholder="使用奖杯编码检索">
                <el-option label="全部" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <div class="gr-title">运营相关</div>
      <div class="gd-cont gd-cont-o">
        <el-row>
          <el-col :span='12'>
            <el-form-item label="所属系列：" prop="name">
              <el-select style="width: 100%;" v-model="form.region" size="small">
                <el-option label="无系列" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="gd-cont">
        <el-form-item label="内容分类：" prop="type">
          <el-checkbox-group v-model="form.type">
            <el-checkbox label="最新可租" value="0"></el-checkbox>
            <el-checkbox label="推荐游戏" value="1"></el-checkbox>
            <el-checkbox label="热门预约" value="1"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item label="关键词：" prop="type">
          <el-input v-model="form.name"  type="textarea" size="small" placeholder="前台显示游戏描述，最好不要超过200汉字"></el-input>
        </el-form-item>

        <el-form-item label="游戏截图：" prop="type">
          <upload-image-one />
        </el-form-item>
      </div>

      <div class="gd-btns">
        <el-button @click="onSubmit">保存并预览</el-button>
        <el-button type="primary" @click="next">下一步</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import UploadImageOne from '@/components/Upload/UploadImageOne'
export default {
  name: 'BasicInfo',
  components: {UploadImageOne},
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      form: {
        name: '',
        date: '',
        type: [],
      },
      rules: {},
    }
  },
  methods: {
    next() {
      this.$emit('next', '1')
    },
    onSubmit() {},
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>


<style lang="scss">
@import './index.scss';
</style>
<style lang="scss" scoped>
.gb-box {
  .gd-cont {
    width: 60%;
  }
  .gd-cont-o {
    width: 65%;
  }
}
</style>