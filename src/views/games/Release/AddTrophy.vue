<template>
  <div>
    <el-dialog
      :visible.sync="dialogVisible"
      title="添加奖杯"
      width="60%">
      <AddTrophyManage @callback="callback" :isNavition="false" :isRequired="false" :tname="tname" />
    </el-dialog>
  </div>
</template>

<script>
import AddTrophyManage from '../TrophyManage/AddTrophyManage'
export default {
  name: 'AddTrophy',
  components: {AddTrophyManage},
  data() {
    return {
      dialogVisible: false,
      tname: ''
    }
  },
  methods: {
    show(params) {
      this.dialogVisible = true
      this.tname = params.tname
    },
    callback(id) {
      this.$emit('addCallback', {
        type: 'trophy',
        id: id
      })
      this.dialogVisible = false
    },
  }
}
</script>