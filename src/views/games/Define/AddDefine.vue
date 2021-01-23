<template>
  <div class="view-box ta-box">
    <el-form ref="form" :model="form" label-width="120px">
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
      <div class="ta-header">系列游戏</div>
      <div class="ta-form">
        <el-row>
          <el-col :span="20">
            <el-form-item label="选择游戏：">
              <!-- <el-select size="small" style="width: 100%;" v-model="form.region" placeholder="优先使用奖杯编号和游戏名称检索">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select> -->
              <div class="block">
                <el-cascader
                  :value="selectKeys"
                  @change="cascaderChange"
                  style="width: 100%;"
                  placeholder="搜索"
                  :options="gameMiniList"
                  :props="{ multiple: true, value: 'id', label: 'detailinfo' }"
                  filterable></el-cascader>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-button size="small" style="margin-left: 10px;" @click="addSeriesList">添加到系列</el-button>
          </el-col>
        </el-row>
        <el-row>

          <el-col :span="20">
            <el-form-item label="已选择：" prop="desc">
              <div class="select-game-list">
                <ul>
                  <li v-for="item in selectList" :key="item.id">#{{item.id}} | {{item.platform_name}} | {{item.view_name}} | {{item.area_name}}  {{item.language_name}}</li>
                </ul>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="2" style="height: 100%;">
            <!-- <el-button size="small" style="margin-left: 10px;">从系列去掉</el-button> -->
          </el-col>
        </el-row>
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
import UploadImageOrder from '@/components/Upload/UploadImageOrder'
import { GameDefineSortInf, GameDefineSortSet, GameMiniLst } from '@/api/api'
import {postAjax} from '@/utils/ajax'
export default {
  name: 'AddDefine',
  components: {UploadImageOrder},
  data() {
    return {
      gameMiniList: [],
      selectList: [],
      selectKeys: [],
      form: {
        nm: '',
        i: '',
        isa: null,
      }
    }
  },
  mounted() {
    const {id} = this.$route.query
    if(id) {
      this.getDetail()
    }
    this.getGameList()
  },
  methods: {
    onSubmit() {
      console.log('submit!');
      console.log(this.form)
      this.addSeries()
    },
    // 获取游戏公司列表
    getGameList() {
      postAjax({
        url: '',
      }).then(res=> {
        console.log(res)
        if(res.code === 1) {
          this.gameList = res.data
        }
      })
    },
    paramsSet() {
      const {id} = this.$route.query, ids = this.ids
      let obj = this.form
      if(id) {
        obj.id = id
      }
      obj.gms = ids.join(',')
      return obj
    },
    addSeries() {
      postAjax({
        url: GameDefineSortSet,
        data: this.paramsSet(),
      }).then(res=> {
        console.log(res)
        if(res.code === 1) {
          this.$message.success('添加成功')
          this.$router.back(-1)
        }
      })
    },
    getDetail() {
      console.log(this.$route)
      const {id} = this.$route.query
      postAjax({
        url: GameDefineSortInf,
        data: {
          id: id
        }
      }).then(res=> {
        console.log(res)
        if(res.code === 1) {
          const resdata = res.data
          this.form = {
            nm: resdata.name,
            i: resdata.intro,
          }
          this.selectList = resdata.game_list
        }
      })
    },
    cascaderChange(e) {
      console.log(e)
      this.selectKeys = e
    },
    addSeriesList() {
      let list = [], ids=[], selectKeys = this.selectKeys,gameMiniList = this.gameMiniList
      for(let i = 0;i<selectKeys.length;i++) {
        for(let j = 0;j<gameMiniList.length;j++) {
          if(selectKeys[i][0] === gameMiniList[j].id) {
            list.push(gameMiniList[j])
            ids.push(gameMiniList[j].id)
          }
        }
      }

      this.selectList = list
      this.ids = ids


      this.selectKeys = []
    },
    getGameList() {
      postAjax({
        url: GameMiniLst,
      }).then(res=> {
        const r = res.data || []
        for(let i = 0 ; i< r.length;i++) {
          r[i].detailinfo = `${r[i].id} | ${r[i].platform_name} | ${r[i].view_name} | ${r[i].area_name} ${r[i].language_name}`
        }
        this.gameMiniList = r
      })
    },
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