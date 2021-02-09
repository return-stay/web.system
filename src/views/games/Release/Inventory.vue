<template>
  <div class="gi-box">
    <el-form :model="form" status-icon :rules="rules" ref="form" label-width="120px">
      <div class="gr-title" v-if="title">{{title}}</div>

      <div class="gd-cont">
        <el-form-item label="选择游戏：" prop="gid">
          <el-select style="width: 100%;" v-model="form.gid" size="small" placeholder="前台显示的游戏名称，请使用中文">
            <el-option v-for="item in gamelist" :key="item.id" :label="item.detailinfo" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-row>
          <el-col :span='12'>
            <el-form-item label="盘号：" prop="sn">
              <el-input v-model="form.sn" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span='12'>
            <el-form-item label="成本价：" prop="c">
              <el-input v-model="form.c" size="small">
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
            <el-form-item label="货架号：" prop="sf">
              <!-- <el-select style="width: 100%;" v-model="form.sf" size="small" placeholder="请选择货架号">
                <el-option label="4-1-2" value="0"></el-option>
              </el-select> -->
              <el-input v-model="form.sf" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="备注：" prop="nm">
          <el-input v-model="form.nm"  type="textarea" size="small" placeholder="可以为空"></el-input>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-select v-model="form.status" size="small">
            <el-option key="item.id" value="item.id">正常</el-option>
          </el-select>
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
import {postList} from "@/utils/data"
import {GameMiniLst, DiscInfoSet, DiscInfoDat} from '@/api/api'
import { postAjax } from '@/utils/ajax'
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
      gamelist: [],
      form: {
        gid: '',
        sn: '',
        c: '',
        sf: '',
        nm: '',
      },
      rules: {},
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
    getInfo() {
      const id = this.$route.params.id
      postAjax({
        url: DiscInfoDat,
        data: {
          id: id
        }
      }).then(res=> {
        const resdata = res.data
        this.form = {
          gid: resdata.game_id,
          sn: resdata.serial,
          c: resdata.cost,
          sf: resdata.shelves_id,
          nm: resdata.order_memo,
        }
      })
    },
    next() {
      this.$emit('next', '2')
    },
    cancel() {
      this.$emit('cancel')
    },
    submitCallback() {
      const id = this.$route.query.id
      let params = this.form
      if(id) {
        params.id = id
      }
      postAjax({
        url: DiscInfoSet,
        data: params
      }).then(res=> {
        console.log(res)
      })
      // const btns = this.btns
      // this.$emit(`${btns.fnName}`)
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