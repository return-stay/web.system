<template>
  <div class="gp-box">
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="120px">
      <div class="gr-title">定价</div>

      <div class="gd-cont">
        <el-form-item label="游戏：" prop="pass">
          <el-input v-model="form.name" size="small" placeholder="前台显示的游戏名称，请使用中文" :disabled="true" ></el-input>
        </el-form-item>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="成本均价：" prop="pass">
              <el-input v-model="form.name" size="small">
                <span
                  style="color: #000;"
                  slot="suffix">元
                </span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="日租原价：" prop="pass">
              <el-input v-model="form.name" size="small">
                <span
                  style="color: #000;"
                  slot="suffix">元
                </span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="日租金：" prop="pass">
              <el-input v-model="form.name" size="small">
                <span
                  style="color: #000;"
                  slot="suffix">元
                </span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="押金：" prop="pass">
              <el-input v-model="form.name" size="small">
                <span
                  style="color: #000;"
                  slot="suffix">元
                </span>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </div>


      <div class="gr-title">上架信息</div>
      <div class="gd-cont">
        <el-row>
          <el-col :span='12'>
            <el-form-item label="运费：" prop="pass">
              <el-select style="width: 100%;" v-model="form.region" size="small" placeholder="按重和距离远近">
                <el-option label="4-1-2" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="上架时间：" prop="pass">
              <el-select style="width: 100%;" v-model="form.region" size="small" placeholder="立刻上架发布">
                <el-option label="4-1-2" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="gd-btns">
        <el-button @click="onSubmit">保存并预览</el-button>
        <el-button type="primary" @click="puback">确认发布</el-button>
      </div>
    </el-form>

  </div>
</template>

<script>
export default {
  name: 'Pricing',
  data() {
    return {
      form: {},
      rules: {},
    }
  },
  methods: {
    onSubmit() {},
    puback() {
      this.$emit('puback')
    },
  }
}
</script>



<style lang="scss">
@import './index.scss';
</style>
<style lang="scss" scoped>
.gp-box {
  .gd-cont {
    width: 60%;
  }
  .gd-cont-o {
    width: 65%;
  }
}
</style>