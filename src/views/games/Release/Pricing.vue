<template>
  <div class="gp-box">
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="120px">
      <div class="gr-title">定价</div>

      <div class="gd-cont">
        <el-form-item label="游戏：" prop="pass">
          <el-select v-model="form.gid" style="width: 320px;" size="small" filterable placeholder="请选择">
            <el-option v-for="item in gamelist" :key="item.id" :label="item.detailinfo" :value="item.id"></el-option>
          </el-select>
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
              <el-input v-model="form.odr" size="small">
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
              <el-input v-model="form.dr" size="small">
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
              <el-input v-model="form.d" size="small">
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
import {postList} from "@/utils/data"
import {GameMiniLst, GamePriceSet, GamePriceInf} from '@/api/api'
import {postAjax} from '@/utils/ajax'
export default {
  name: 'Pricing',
  data() {
    return {
      form: {
        gid: '',
        odr: 0,
        dr: 0,
        d: 0,
      },
      rules: {},
      gamelist: [],
    }
  },
  mounted() {
    this.getGameList()
    this.getInfo()
  },
  methods: {
    async getGameList () {
      let r = await postList(GameMiniLst)
      for(let i = 0;i<r.length;i++) {
        r[i].detailinfo = `${r[i].platform_name} | ${r[i].view_name} | ${r[i].area_name} ${r[i].language_name}`
      }
      this.gamelist = r
    },
    onSubmit() {
      this.confirmRequest()
    },
    puback() {
      this.$emit('puback')
    },
    getInfo() {
      const id = this.$route.params.id
      if(id) {
        postAjax({
          url: GamePriceInf,
          data: {
            gid: id
          }
        }).then(res=> {
          console.log(res)
          if(res.code === 1) {
            const resdata = res.data
            console.log(resdata)
            this.form = {
              gid: resdata.id,
              odr: Number((resdata.original_rent/100).toFixed(2)),
              dr: Number((resdata.day_rent/100).toFixed(2)),
              d: Number((resdata.deposit/100).toFixed(2)),
            }
          }
        })
      }
    },
    confirmRequest () {
      const taht = this
      postAjax({
        url: GamePriceSet,
        data: {
          ...this.form
        }
      }).then(res=> {
        console.log(res)
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