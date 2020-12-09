<template>
  <div class="tabs-box">
    <div v-for="item in tabsList" :key="item.key" :class="item.key === actionKey ? 'action tabs-item':'tabs-item'"
    @click="tabclick(item)"
    >
      {{item.value}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabs',
  props: {
    tabsList: {
      type: Array,
      default: () => []
    },
    action: {
      type: Number,
      default: 0,
    }
  },
  data() {
    return {
      actionKey: this.action
    }
  },
  methods: {
    tabclick(item) {
      this.actionKey = item.key
      this.$emit('change', {...item})
    }
  }
}
</script>
<style lang="scss" scoped>
.tabs-box {
  background-color: #fff;
  display: flex;
  align-items: center;
  border-bottom: 2px solid #F8F8F8;
  .tabs-item {
    width: 140px;
    text-align: center;
    font-size: 14px;
    color: #2C2C2C;
    height: 36px;
    line-height: 36px;
    cursor: pointer;
  }
  .tabs-item.action {
    font-size: 16px;
    color: #000000;
    background-color: #F8F8F8;
  }
}
</style>