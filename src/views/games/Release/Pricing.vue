<template>
  <div class="gp-box">
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="120px">
      <div class="gr-title">定价</div>

      <div class="gd-cont">
        <el-form-item label="游戏：" prop="gid">
          <el-select v-model="form.gid" :disabled="isGameDisabled" style="width: 320px;" size="small" filterable placeholder="请选择游戏">
            <el-option v-for="item in gamelist" :key="item.id" :label="item.detailinfo" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-row>
          <el-col :span='24'>
            <el-form-item label="成本均价：" prop="cost">
              <el-input-number v-model="form.cost" :min="0" :disabled="true" controls-position="right" :precision="2" :step="1" size="small">
              </el-input-number>
              <span style="color: #000;border:none;padding: 10px;">元</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='24'>
            <el-form-item label="日租原价：" prop="odr">
              <el-input-number v-model="form.odr" :min="0" controls-position="right" :precision="2" :step="1" size="small">
              </el-input-number>
              <span style="color: #000;border:none;padding: 10px;">元</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='24'>
            <el-form-item label="日租金：" prop="dr">
              <el-input-number v-model="form.dr" :min="0" controls-position="right" :precision="2" :step="1" size="small"></el-input-number>
              <span style="color: #000;border:none;padding: 10px;">元</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='24'>
            <el-form-item label="押金：" prop="d">
              <el-input-number v-model="form.d" :min="0" controls-position="right" :precision="2" :step="1" size="small"></el-input-number>
              <span style="color: #000;border:none;padding: 10px;">元</span>
            </el-form-item>
          </el-col>
        </el-row>
      </div>

      <div class="gr-title">上架信息</div>
      <div class="gd-cont">
        <el-row>
          <el-col :span='24'>
            <el-form-item label="运费：" prop="df">
              <el-select v-model="form.df" size="small" placeholder="请选择">
                <el-option label="按重和距离远近计算" :value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span='12'>
            <el-form-item label="上架时间：" prop="ptime">
              <el-date-picker
                :disabled="isTimeDisabled"
                v-model="form.ptime"
                type="datetime"
                placeholder="选择上架时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="gd-btns">
        <el-button @click="onSubmit('form')">保存并预览</el-button>
        <!-- <el-button @click="onSubmit('form')">保存</el-button> -->
        <el-button type="primary" @click="puback('form')">确认发布</el-button>
      </div>
    </el-form>

    <GamePreview v-if="isGamePreview" ref="gamePreview" :id="gameid" @hide="previewHide" />


  </div>
</template>

<script>
import {postList} from "@/utils/data"
import {GameMiniLst, GamePriceSet, GamePriceInf} from '@/api/api'
import {postAjax} from '@/utils/ajax'
import GamePreview from '../GamePreview'
import moment from 'moment'
export default {
  name: 'Pricing',
  components: {GamePreview},
  props: {
    pid: {
      type: String | Number,
      default: '',
    }
  },
  data() {
    return {
      gameid: '',
      isGameDisabled: false,
      isTimeDisabled: false,
      isGamePreview: false,
      form: {
        gid: '',
        cost: null,
        odr: null,
        dr: null,
        d: null,
        df: 0,
        ptime: new Date(),
      },
      rules: {
        gid: [{ required: true, message: '请选择游戏', trigger: 'blur' }],
        cost: [{required: true, message: '请输入成本均价', trigger: 'blur'}],
        odr: [{required: true, message: '请输入日租原价', trigger: 'blur'}],
        dr: [{required: true, message: '请输入日租价', trigger: 'blur'}],
        d: [{required: true, message: '请输入押金', trigger: 'blur'}],
        df: [{required: true, message: '请选择运费', trigger: 'blur'}],
        ptime: [{required: true, message: '请选择上架时间', trigger: 'blur'}],
      },
      gamelist: [],
    }
  },
  mounted() {
    this.init()
    this.getGameList()
    this.getInfo()
    this.pGetInfo()

  },
  methods: {
    init() {
      if(this.$route.path.indexOf('pricing/adjustment')>-1) {
        this.isTimeDisabled = true
        this.isGameDisabled = true
      }
      if(this.$route.params.id && this.$route.query.type === 'detail') {
        this.isTimeDisabled = true
        this.isGameDisabled = true
      }
      if(this.pid) {
        this.isTimeDisabled = false
        this.isGameDisabled = true
      }
    },
    pGetInfo() {
      console.log('inventory=======')
      console.log(this.pid)
      if(this.pid) {
        this.gameid = this.pid
        this.form.gid = this.pid
      }
    },
    async getGameList () {
      let r = await postList(GameMiniLst)
      for(let i = 0;i<r.length;i++) {
        r[i].detailinfo = `${r[i].platform_name} | ${r[i].view_name} | ${r[i].area_name} ${r[i].language_name}`
      }
      this.gamelist = r
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.confirmRequest(() => {
            this.preview()
          })
        } else {
          return false;
        }
      })
    },
    previewHide() {
      this.isGamePreview = false
    },
    // 预览
    preview() {
      this.isGamePreview = true
      setTimeout(() => {
        this.$refs.gamePreview.show()
      }, 0);
    },
    puback(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.confirmRequest(() => {
            this.$emit('puback')
          })
        } else {
          return false;
        }
      })
    },
    getInfo() {
      const id = this.$route.params.id || this.pid
      if(id) {
        this.gameid = id
        postAjax({
          url: GamePriceInf,
          data: {
            gid: id
          }
        }).then(res=> {
          if(res.code === 1) {
            const resdata = res.data
            this.form = {
              gid: resdata.id,
              cost: Number((resdata.cost/100).toFixed(2)),
              odr: Number((resdata.original_rent/100).toFixed(2)),
              dr: Number((resdata.day_rent/100).toFixed(2)),
              d: Number((resdata.deposit/100).toFixed(2)),
              df:Number((resdata.delivery_fee/100).toFixed(2)),
              ptime: moment(resdata.update_time)
            }
          }
        })
      }
    },
    confirmRequest (callback) {
      // const taht = this
      let messageText = '上架成功'
      const thisForm = JSON.parse(JSON.stringify(this.form))
      thisForm.cost = thisForm.cost*100
      thisForm.odr = thisForm.odr*100
      thisForm.dr = thisForm.dr*100
      thisForm.d = thisForm.d*100
      thisForm.df = thisForm.df*100
      thisForm.ptime = new Date(thisForm.ptime).getTime()
      postAjax({
        url: GamePriceSet,
        data: {
          ...thisForm
        }
      }).then(res=> {
        console.log(res)
        if(res.code === 1) {
          this.$message.success(messageText)
          callback && callback()
        }
      })
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