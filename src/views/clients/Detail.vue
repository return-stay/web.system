<template>
  <div class="cd-box">
    <div class="tabs-box">
      <tabs @change='tabsChange' :tabsList="tabslist" :action='tabAction' />
    </div>

    <div class="cd-cont-box">
      <basic-information v-if="tabAction === 0" />

      <order-history v-if="tabAction === 1" />

      <after-sales-record v-if="tabAction === 2" />
    </div>
  </div>
</template>

<script>
import Tabs from '@/components/Tabs'
import BasicInformation from './BasicInformation'
import AfterSalesRecord from './AfterSalesRecord'
import OrderHistory from './OrderHistory'
export default {
  name: 'ClientsDetail',
  components: { Tabs ,BasicInformation, AfterSalesRecord, OrderHistory },
  data() {
    return {
      tabAction: 0,
      tabslist: [
        { key: 0, label: '基本信息', value: '基本信息' },
        { key: 1, label: '历史订单', value: '历史订单' },
        { key: 2, label: '售后记录', value: '售后记录' },
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