<template>
  <div>
    <table-page
      :isPagination="false"
      :border="false" 
      :columns="columns" 
      :tableData="tableData" 
      @manage="manage"
      />
  </div>
</template>

<script>
import TablePage  from '@/components/TablePage'
export default {
  name: 'AfterSalesRecord',
  components: {TablePage},
  data() {
    return {
      columns: [
        {
          title: '售后编号',
          key: 'name',
          label: 'name',
          width: 240,
        },
        {
          title: '售后详情',
          key: 'age',
          label: 'age',
          width: 240,
        },
         {
          title: '分类',
          key: 'age',
          label: 'age',
          width: 240,
        },
        {
          title: '客户信息',
          key: 'age',
          label: 'age',
          width: 240,
        },
        {
          title: '退款金额',
          key: 'age',
          label: 'age',
          width: 240,
        },
        {
          title: '处理状态',
          key: 'age',
          label: 'age',
          width: 240,
        },
        {
          title: '申请时间',
          key: 'age',
          label: 'age',
          width: 240,
          sort: true,
        },
        {
          title: '处理时间',
          key: 'age',
          label: 'age',
          width: 240,
          sort: true,
        },
        {
          title: '操作',
          key: 'lll',
          fixed: 'right',
          align: 'center',
          width: 120,
          render: [
            {
              fnName: 'manage',
              title: '处理',
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
    manage() {}
  }
}
</script>