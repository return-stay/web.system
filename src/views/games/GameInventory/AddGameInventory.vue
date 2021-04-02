<template>
  <div class="agi-box view-box">
    <div class="title">{{addtitle}}</div>
    <inventory title="游戏盘信息" :btns="btns" @saveCallback="saveCallback" @cancel="cancel" />
  </div>
</template>

<script>
import Inventory from '../Release/Inventory'
export default {
  name: 'AddGameInventory',
  components: {Inventory},
  data() {
    return{
      addtitle: '',
      btns: {
        issave: true,
        fnName: 'saveCallback'
      }
    }
  },
  created() {
    
  },
  mounted() {
    const {id} = this.$route.params
    const {serial = ''} = this.$route.query
    let addtitle = ''
    if(id) {
      addtitle = '编辑游戏盘-盘编号：' + serial
      this.btns = {
        issave: true,
        fnName: 'saveCallback'
      }
    }else {
      addtitle = '添加游戏盘'
      this.btns = {
        add: true,
        fnName: 'saveCallback',
      }
    }
    this.addtitle = addtitle
  },
  methods: {
    saveCallback() {
      console.log('jjjj')
    },
    cancel() {
      this.$router.go(-1)
    },
  }
}
</script>

<style lang="scss" scoped>
.agi-box {
  .title {
    height: 60px;
    line-height: 60px;
    font-size: 20px;
    color: #000;
  }
}
</style>