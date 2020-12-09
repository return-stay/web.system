<template>
  <div>
    <order-table  :tabAction="8" title="售后记录" />
  </div>
</template>

<script>
import OrderTable from './OrderTable'
export default {
  name: 'AfterSale',
  components: {OrderTable},
}
</script>