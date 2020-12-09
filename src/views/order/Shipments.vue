<template>
  <div>
    <order-table :tabAction="2" title="待发货订单" />
  </div>
</template>

<script>
import OrderTable from './OrderTable.vue'
export default {
  name: 'Shipments',
  components: {OrderTable},
}
</script>