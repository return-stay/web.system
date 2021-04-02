<template>
  <div>
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
        <el-button size="small" style="margin-left: 10px;" @click="addSeriesList">{{addText}}</el-button>
        <slot name="add"></slot>
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
        <slot name="delete"></slot>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {GameMiniLst} from '@/api/api'
import {postAjax} from '@/utils/ajax'
export default {
  name: 'SelectGames',
  props: {
    addText: {
      type: String,
      default: '添加',
    },
    propsList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectList: [],
      list: [],
      selectKeys: [],
      gameMiniList: [],
    }
  },
  async mounted() {
    await this.getGameList()
    this.getList()
  },
  methods: {
    getList() {
      console.log(this.propsList)
      let plist = this.propsList
      if(plist && plist.length>0) {
        let newlist = []
        for(let i =0;i<plist.length;i++) {
          newlist.push([plist[i]])
        }
        console.log(newlist)
        this.selectKeys = newlist
        this.addSeriesList()
      } 
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
      console.log(list)
      this.selectList = list
      this.ids = ids
      this.selectKeys = []
      this.$emit('addCallback', ids)
    },
    async getGameList() {
      await postAjax({
        url: GameMiniLst,
      }).then(res=> {
        console.log(res)
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

<style lang="scss" scoped>
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
</style>