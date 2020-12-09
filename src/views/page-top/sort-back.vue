<template>
  <div class="sp-box">
    <div class="sp-title">
      <span class="sp-title-left">回访排行榜（回访用户数）</span>

      <span class="sp-title-right" @click="detial">详情</span>
    </div>

    <div>
      <div class="sp-item" v-for="item in portalList" :key="item.id">
        <div class="sp-item-title">{{item.page_name}}</div>
        <div class="sp-item-num">{{item.back_visit_user}}</div>
        <div class="sp-item-bg" :style="'width'+ item.widthNumber + 'px'"></div>
      </div>
    </div>
    
  </div>
</template>
<script>
import utilMixin from './util-mixin'
export default {
  name: 'SortBack',
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
          type: 'back'
        }
      })
    },
    init(data) {
      this.getSortVisitList(data)
    },
     // 获取访问排行榜
    getSortVisitList(data) {
      const that = this
      this.getRequest({url: '/page/sort/backuser.list', params: data }, (list) => {
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