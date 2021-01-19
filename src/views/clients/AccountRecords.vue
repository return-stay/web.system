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
import TableMixins from '@/mixins/tableMixins'
export default {
  name: 'AccountRecords',
  components: {TablePage},
  mixins: [TableMixins],
  data() {
    return {
      columns: [
        {
          title: '单号',
          key: 'name',
          label: 'name',
          width: 240,
        },
        {
          title: '记录内容',
          key: 'age',
          label: 'age',
          width: 240,
        },
         {
          title: '客户',
          key: 'age',
          label: 'age',
          width: 240,
        },
        {
          title: '发生时间',
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
          title: '状态',
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
              fnName: 'manage',
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
    manage() {}
  }
}
</script>