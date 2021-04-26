<template>
  <div>
    <el-row>
      <el-col :span="20">
        <el-form-item label="选择游戏：">
          <div class="block">
            <el-cascader
              :value="selectArrIds"
              @change="cascaderChange"
              style="width: 100%;"
              placeholder="搜索"
              :options="cascaderGameList"
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
            <el-checkbox-group size="small" v-model="checkedGameIds">
              <el-checkbox v-for="item in selectGameList" :key="item.id" :label="item.id">#{{item.id}} | {{item.platform_name}} | {{item.view_name}} | {{item.area_name}}  {{item.language_name}}</el-checkbox>
            </el-checkbox-group>
          </div>
        </el-form-item>
      </el-col>
      <el-col :span="2" style="height: 100%;">
        <el-button size="small" style="margin-left: 10px;" @click="deleteGamelist">{{delteText}}</el-button>
        <slot name="delete"></slot>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {GameMiniLst} from '@/api/api'
import {postAjax} from '@/utils/ajax'
import {getStoreList} from '@/utils/data'
export default {
  name: 'SelectGames',
  props: {
    addText: {
      type: String,
      default: '添加',
    },
    propsList: { // 父组件传递过来的游戏ID列表 格式 [id, id]
      type: Array,
      default: () => [],
    },
    delteText: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      selectArrIds: [], //下拉框选中的游戏ID  格式[ [id], [id], [id] ]
      gameMiniList: [], //所有游戏集合
      checkedGameIds: [], //已选中的游戏， 选中的要去掉的游戏ID 格式 [ id, id ]
    }
  },
  computed: {
    gameIds() { //父组件传过来的ID列表
      return this.propsList
    },
    cascaderGameList() { //下拉框里面显示的游戏列表
      let gameList = [], selectIds = []
      let selectGameList = this.selectGameList
      for(let j = 0;j<selectGameList.length;j++) {
        selectIds.push(selectGameList[j].id)
      }
      let gameMiniList = this.gameMiniList
      for(let i = 0;i<gameMiniList.length;i++) {
        if(selectIds.indexOf(gameMiniList[i].id)<0) {
          gameList.push(gameMiniList[i])
        }
      }
      return gameList
    },
    selectGameList() { //选中的游戏集合
      let gameids = this.gameIds
      let gameMiniList = this.gameMiniList
      let list = []
      for(let j = 0;j<gameMiniList.length;j++) {
        for(let i = 0;i<gameids.length;i++) {
          if(gameids[i] === gameMiniList[j].id) {
            list.push(gameMiniList[j])
          }
        }
      }
      return list
    },
  },
  mounted() {
    this.getGameList()
  },
  methods: {
    cascaderChange(e) {
      this.selectArrIds = e
    },
    deleteGamelist() {
      let checkedGameIds = this.checkedGameIds
      let selectGameList = this.selectGameList
      let newlist = [], ids = []
      if(checkedGameIds && checkedGameIds.length>0) {
        for(let i = 0;i<selectGameList.length;i++) {
          if(checkedGameIds.indexOf(selectGameList[i].id)< 0) {
            newlist.push(selectGameList[i])
            ids.push(selectGameList[i].id)
          }
        }
      }
      this.ids = ids
      this.$emit('addCallback', ids)
    },
    addSeriesList() {
      let list = this.selectGameList, gameMiniList = this.gameMiniList, selectArrIds = this.selectArrIds
      for(let j = 0;j<gameMiniList.length;j++) {
        for(let i = 0;i<selectArrIds.length;i++) {
          if(selectArrIds[i][0] === gameMiniList[j].id) {
            list.push(gameMiniList[j])
          }
        }
      }
      this.selectArrIds = []
      this.callbackIds()
    },
    callbackIds () {
      let gamelist = this.selectGameList, ids = []
      for(let i = 0;i<gamelist.length;i++) {
        ids.push(gamelist[i].id)
      }
      this.$emit('addCallback', ids)
    },
    async getGameList() {
      let r = await getStoreList(GameMiniLst)
      for(let i = 0 ; i< r.length;i++) {
        r[i].detailinfo = `${r[i].id} | ${r[i].platform_name} | ${r[i].view_name} | ${r[i].area_name} ${r[i].language_name}`
      }
      this.gameMiniList = r

      // return new Promise((reject) => {
      //   postAjax({
      //     url: GameMiniLst,
      //   }).then(res=> {
      //     const r = res.data || []
      //     for(let i = 0 ; i< r.length;i++) {
      //       r[i].detailinfo = `${r[i].id} | ${r[i].platform_name} | ${r[i].view_name} | ${r[i].area_name} ${r[i].language_name}`
      //     }
      //     this.gameMiniList = r
      //     reject(res)
      //   })
      // })
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