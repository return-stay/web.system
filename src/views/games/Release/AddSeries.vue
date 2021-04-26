<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="添加系列"
      width="60%">
      <AddGameSeries @callback="callback" :isNavition="false" :isGameAdd="false" />
    </el-dialog>
  </div>
</template>

<script>
import AddGameSeries from '../Series/AddSeries'
export default {
  name: 'AddSeries',
  components: {AddGameSeries},
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
        type: 'series',
        id: id
      })
      this.dialogVisible = false
    },
  }
}
</script>