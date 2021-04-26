<template>
  <div class="view-box ta-box">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <div class="ta-header">游戏系列信息</div>
      <div class="ta-form">
        <el-row>
          <el-col :span="20">
            <el-form-item label="系列名称：" prop="nm">
              <el-input size="small" v-model="form.nm" placeholder="前台显示，使用中文名称" />
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
        <el-row>
          <el-col :span="20">
            <el-form-item label="简介：" prop="i">
              <el-input type="textarea" v-model="form.i" :autosize="{ minRows: 4, maxRows: 6 }"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="2"></el-col>
        </el-row>
      </div>
      <template v-if="isGameAdd">
        <div class="ta-header">系列游戏</div>
        <div class="ta-form">
          <SelectGames
            :propsList="gameIds" 
            addText="添加到系列" 
            delteText="从系列去掉" 
            @addCallback="addCallback"
            ></SelectGames>
        </div>
      </template>
      
      <div class="ta-btns">
        <el-form-item style="margin-bottom: 0;" label-width="0px">
          <el-button v-if="type === 'add'" type="primary" @click="onSubmit('form')">确定添加</el-button>
          <el-button v-else type="primary" @click="onSubmit('form')">保存游戏系列</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>


<script>
import UploadImageOrder from '@/components/Upload/UploadImageOrder'
import { GameGroupinf, GameGroupSet } from '@/api/api'
import {postAjax} from '@/utils/ajax'
import SelectGames from '@/components/SelectGames'
export default {
  name: 'AddSeries',
  components: {UploadImageOrder, SelectGames},
  data() {
    return {
      type: 'add',
      gameIds: [],
      selectList: [],
      selectKeys: [],
      form: {
        nm: '',
        i: '',
        isa: null,
      },
      rules: {
        nm: [ { required: true, message: '请输入系列名称', trigger: 'blur' } ],
      },
    }
  },
  props: {
    isNavition: {
      type: Boolean,
      default: true,
    },
    isGameAdd: { // 发布游戏添加的时候，不需要添加游戏
      type: Boolean,
      default: true,
    },
    isRequired: { //参数是否必填
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    const {id} = this.$route.query
    if(id) {
      this.type = 'edit'
      this.getDetail()
    }
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.addSeries()
        }
      })
    },
    paramsSet() {
      const {id} = this.$route.query, gameIds = this.gameIds
      let obj = this.form
      if(id) {
        obj.id = id
      }
      if(gameIds && gameIds.length>0) {
        obj.gms = gameIds.join(',')
      }
      obj.isow = true
      return obj
    },
    addSeries() {
      postAjax({
        url: GameGroupSet,
        data: this.paramsSet(),
      }).then(res=> {
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
    getDetail() {
      const {id} = this.$route.query
      postAjax({
        url: GameGroupinf,
        data: {
          id: id
        }
      }).then(res=> {
        if(res.code === 1) {
          const resdata = res.data
          this.form = {
            nm: resdata.name,
            i: resdata.intro,
          }
          let gamelist = resdata.game_list
          this.setGameIds(gamelist)
        }
      })
    },
    setGameIds(list = []) {
      let gameids = []
      for(let i = 0;i<list.length;i++) {
        gameids.push(list[i].id)
      }
      this.gameIds = gameids
    },
    // 添加系列
    addCallback(e) {
      this.gameIds = e
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
    width: 70%;
    .select-game-list {
      border: 1px solid #DCDFE6;
      border-radius: 4px;
      padding: 16px;
      min-height: 100px;
      >ul{
        >li {
          height: 26px;
          line-height: 26px;
        }
      }
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