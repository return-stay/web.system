<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="添加公司"
      width="60%">
      <AddGameCompany @callback="callback" :isNavition="false" />
    </el-dialog>
  </div>
</template>

<script>
import AddGameCompany from '../Company/AddCompany'
export default {
  name: 'AddCompany',
  components: {AddGameCompany},
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    show() {
      this.dialogVisible = true
    },
    callback(id) {
      this.$emit('addCallback', {
        type: 'company',
        id: id
      })
      this.dialogVisible = false
    },
  }
}
</script>