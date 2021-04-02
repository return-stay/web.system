<template>
  <div>
    <OrderTable :action="30" title="待发货订单" />
  </div>
</template>

<script>
import OrderTable from './OrderTable.vue'
export default {
  name: 'Shipments',
  components: {OrderTable},
}
</script>