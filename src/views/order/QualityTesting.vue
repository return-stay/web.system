<template>
  <div>
    <order-table  :tabAction="3" title="待质检订单" />
  </div>
</template>

<script>
import OrderTable from './OrderTable'
export default {
  name: 'QualityTesting',
  components: {OrderTable},
}
</script>