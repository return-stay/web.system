<template>
  <div class="view-box">
    <div>
      <div class="view-title">
        <span>渠道列表</span>
      </div>
      <div style="margin-left: 100px;">
        <el-select style="width: 120px;" v-model="platformValue" @change="platformChange" placeholder="请选择平台">
          <el-option
            v-for="item in platformArr"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
    </div>
    

    <div>
      <el-table
        ref="filterTable"
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="name"
          label="渠道名称"
          align="center"
          :cell-style="{background: '#ccc'}"
          column-key="name"
        >
        </el-table-column>
        <el-table-column
          prop="url_path"
          label="渠道标识"
          align="center"
          :cell-style="{background: '#ccc'}"
          column-key="url_path"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>

</template>

<script>
export default {
  name: 'TrenchList',
  data() {
    return {
      tableData: []
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.getTrenchList()
    },
    getTrenchList() {
      this.$store.dispatch('game/getChannelList').then(res=> {
        let list = res
        this.tableData = list
      })
    }

  }
}
</script>

<style lang="scss">
@import '../index.less';


</style>