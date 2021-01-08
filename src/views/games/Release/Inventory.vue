<template>
  <div class="gi-box">
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="120px">
      <div class="gr-title" v-if="title">{{title}}</div>

      <div class="gd-cont">
        <el-form-item label="选择游戏：" prop="pass">
          <!-- <el-input v-model="form.name" size="small" placeholder="前台显示的游戏名称，请使用中文"></el-input> -->
          <el-select style="width: 100%;" v-model="form.name" size="small" placeholder="前台显示的游戏名称，请使用中文">
            <el-option label="游戏名称" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-row>
          <el-col :span='12'>
            <el-form-item label="盘号：" prop="pass">
              <el-input v-model="form.name" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span='12'>
            <el-form-item label="成本价：" prop="pass">
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
            <el-form-item label="货架号：" prop="pass">
              <el-select style="width: 100%;" v-model="form.region" size="small" placeholder="请选择货架号">
                <el-option label="4-1-2" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="备注：" prop="pass">
          <el-input v-model="form.name"  type="textarea" size="small" placeholder="可空"></el-input>
        </el-form-item>
      </div>

      <div class="gd-btns">
        <template v-if="btns.isnext">
          <el-button @click="onSubmit">保存并继续添加</el-button>
          <el-button type="primary" @click="next">下一步</el-button>
        </template>

        <template v-if="btns.issave">
          <el-button type="primary" @click="submitCallback">保存并继续添加</el-button>
          <el-button @click="cancel">取消</el-button>
        </template>

        <template v-if="btns.isconfirm">
          <el-button type="primary" @click="submitCallback">确定增加库存</el-button>
        </template>

        
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Inventory',
  props: {
    title: {
      type: String,
      default: '添加游戏盘'
    },
    btns: {
      type: Object,
      default: () => ({
          isnext: true,
          fnName: ''
      })
    },
  },
  data() {
    return {
      form: {},
      rules: {},
    }
  },
  methods: {
    next() {
      this.$emit('next', '2')
    },
    cancel() {
      this.$emit('cancel')
    },
    submitCallback() {
      const btns = this.btns
      this.$emit(`${btns.fnName}`)
    },
    onSubmit(e) {
      console.log(e)
    },
  }
}
</script>



<style lang="scss">
@import './index.scss';
</style>
<style lang="scss" scoped>
.gi-box {
  .gd-cont {
    width: 60%;
  }
  .gd-cont-o {
    width: 65%;
  }
}
</style>