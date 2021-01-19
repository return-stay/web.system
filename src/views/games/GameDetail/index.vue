<template>
  <div class="cd-box">
    <div class="tabs-box">
      <tabs @change='tabsChange' :tabsList="tabslist" :action='tabAction' />
    </div>

    <div class="cd-cont-box">
      <BasicInfo v-if="tabAction === 0" />

      <inventory :btns="{isconfirm: true}" v-if="tabAction === 1" />

      <pricing-adjustment v-if="tabAction === 2" />

    </div>
  </div>
</template>

<script>
import Tabs from '@/components/Tabs'
// import BasicInformation from './BasicInformation'
import BasicInfo from '../Release/BasicInfo'
import Inventory from '../Release/Inventory'
import PricingAdjustment from '../PricingManage/PricingAdjustment'
export default {
  name: 'ClientsDetail',
  components: { Tabs ,BasicInfo, Inventory, PricingAdjustment },
  data() {
    return {
      tabAction: 0,
      tabslist: [
        { key: 0, label: '基本信息', value: '基本信息' },
        { key: 1, label: '游戏盘库存', value: '游戏盘库存' },
        { key: 2, label: '定价', value: '定价' },
      ],
    }
  },
  methods: {
    tabsChange(item) {
      console.log(item)
      this.tabAction = item.key
    }
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