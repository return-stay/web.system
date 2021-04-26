<template>
  <div class="cd-box">
    <div class="tabs-box">
      <tabs @change='tabsChange' :tabsList="tabslist" :action='tabAction' />
    </div>

    <div class="cd-cont-box">
      <BasicInfo v-if="tabAction === 0 && gameInfo.id" @next="next" :isNext="false" :gameInfo="gameInfo" />

      <Inventory :btns="{isconfirm: true}" v-if="tabAction === 1 && gameInfo.id"  @next="next" :pGameInfo="gameInfo" />

      <Pricing v-if="tabAction === 2" />

    </div>
  </div>
</template>

<script>
import Tabs from '@/components/Tabs'
import BasicInfo from '../Release/BasicInfo'
import Inventory from '../Release/Inventory'
import Pricing from '../Release/Pricing'
import {GameInfoDat} from '@/api/api'
import {postAjax} from '@/utils/ajax'
export default {
  name: 'ClientsDetail',
  components: { Tabs ,BasicInfo, Inventory, Pricing },
  data() {
    return {
      gameInfo: {},
      tabAction: 0,
      tabslist: [
        { key: 0, label: '基本信息', value: '基本信息' },
        { key: 1, label: '游戏盘库存', value: '游戏盘库存' },
        { key: 2, label: '定价', value: '定价' },
      ],
    }
  },
  created() {
    this.init()
  },
  mounted() {
    const id = this.$route.params.id
    if(id) {
      this.getGameInfo(id)
    }
  },
  methods: {
    init() {
      const {type} = this.$route.query
      let num = 0;
      switch(type) {
        case 'detail':
          num = 0
          break;
        case 'stock':
          num = 1
          break;
        case 'price':
          num = 2
          break;
        default:
          num = 0
      }
      this.tabAction = num
    },
    next(i) {
      console.log(i)
      this.tabAction = Number(i)
    },
    tabsChange(item) {
      console.log(item)
      this.tabAction = item.key
      // let type = 'detail'
      // switch(item.key) {

      // }
      // this.$router.push({
      //   query: {type: 'price'}
      // })
    },
    getGameInfo(id) {
      postAjax({
        url: GameInfoDat,
        data:{
          id: id,
        },
      }).then(res=> {
        if(res.code === 1) {
          const resdata = res.data
          this.gameInfo = resdata
        }
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.cd-box {
  background-color: #fff;
  padding: 16px;
  min-height: 100%;
  .cd-cont-box {
    margin-top: 14px;
  }
}
</style>