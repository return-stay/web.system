<template>
  <div>
    <date-picker @change="dateChange"></date-picker>
    <table-page-list :columns="columns" :tableData="tableData" @add="add" @edit="edit"></table-page-list>
  </div>
</template>

<script>
import TablePageList from '@/components/TablePage/TablePageList'
import DatePicker from '@/components/DatePicker'
export default {
  name: 'CeshiTable',
  components: { TablePageList, DatePicker } ,
  data() {
    return {
      columns: () => {
        return [
        {
          title: 'id',
          key: 'id',
          label: 'id',
          prop: 'ids',
          width: 240,
          align: 'center',
          sort: true,
          headerIcon: true,
          headerIconObj: {
            icon: 'el-icon-info',
            text: '提示文字'
          }
        },
        {
          title: '姓名',
          key: 'name',
          label: 'name',
          width: 240,
        },
        {
          title: '年龄',
          key: 'age',
          label: 'age',
          width: 240,
          sort: true,
          render: [
            {
              labels: ['age', 'name'],
            }
          ]
        },
        {
          title: '操作',
          key: 'lll',
          label: 'lll',
          fixed: 'right',
          render: [
            {
              fnName: 'add', 
              title: '新增'
            },
            {
              fnName: 'edit', 
              title: '编辑'
            }
          ]
        }
      ]
      },
      tableData: []
    }
  },
  mounted() {
    let data = []
    for(let i = 0;i<100;i++) {
      data.push( {id: i, name: 'cao' + i, age: 1+i, lll: '0' +i},)
    }
    setTimeout(() => {
      this.tableData = data
    }, 1000)
  },
  methods: {
    add() {
      console.log('tinajia')
    },
    edit() {
      console.log('bianji')
    },
    dateChange(arr) {
      console.log(arr)
    }
  }
}
</script>