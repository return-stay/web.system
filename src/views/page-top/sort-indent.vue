<template>
  <div class="sp-box">
    <div class="sp-title">
      <span class="sp-title-left">订单游戏排行榜（订单数）</span>

      <span class="sp-title-right" @click="detial">详情</span>
    </div>

    <div>
      <div class="sp-item" v-for="item in portalList" :key="item.id">
        <div class="sp-item-title">{{item.page_name}}</div>
        <div class="sp-item-num">{{item.trade_indent}}</div>
        <div class="sp-item-bg" :style="'width'+ item.widthNumber + 'px'"></div>
      </div>
    </div>
    
  </div>
</template>
<script>
import utilMixin from './util-mixin'
export default {
  name: 'SortIndent',
  mixins: [ utilMixin ],
  data() {
    return {
      portalList: [],
    }
  },
  methods: {
    detial() {
      this.$router.push({
        path: '/interfaceSummary/index',
        query: {
          type: 'trade'
        }
      })
    },
    init(data) {
      this.getSortVisitList(data)
    },
     // 获取访问排行榜
    getSortVisitList(data) {
      const that = this
      this.getRequest({url: '/page/sort/trade.list', params: data }, (list) => {
        for(let i = 0;i<list.length;i++) {
          list[i].widthNumber = list[i].visit_user
        }
        that.portalList = list
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import './item.scss';
</style>