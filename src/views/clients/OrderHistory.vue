<template>
  <div>
    <table-page
      :isPagination="false"
      :border="false" 
      :columns="columns" 
      :tableData="tableData" 
      @check="check"
      />
  </div>
</template>

<script>
import TablePage  from '@/components/TablePage'
export default {
  name: 'OrderHistory',
  components: {TablePage},
  data() {
    return {
      columns: [
        {
          title: '订单号',
          key: 'name',
          label: 'name',
          width: 240,
        },
        {
          title: '商品',
          key: 'age',
          label: 'age',
          width: 240,
        },
         {
          title: '收货人',
          key: 'age',
          label: 'age',
          width: 240,
        },
        {
          title: '创建时间',
          key: 'age',
          label: 'age',
          width: 240,
          sort: true,
        },
        {
          title: '金额',
          key: 'age',
          label: 'age',
          width: 240,
        },
        {
          title: '订单状态',
          key: 'age',
          label: 'age',
          width: 240,
        },
        {
          title: '操作',
          key: 'lll',
          fixed: 'right',
          align: 'center',
          width: 120,
          render: [
            {
              fnName: 'check',
              title: '查看',
            },
          ]
        }
      ],
      tableData: [
        {
          id: 0,
          age: 0,
          name: 'name',
        }
      ],
    }
  },
  methods: {
    check() {}
  }
}
</script>