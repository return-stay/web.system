<template>
  <div class="os-box">
    <order-table :tabAction="0" :searchConditionShow="true" :searchIconShow="false" title="查询订单" />
  </div>
</template>

<script>
import OrderTable from './OrderTable'
export default {
  name: 'OrderSearch',
  components: {OrderTable},
  data() {
    return {}
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
.os-box {
  background-color: #fff;
}
</style>