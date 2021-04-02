<template>
  <div class="batch-box">
    <div class="batch-left">
      <span @click="pageAll">本页全选</span>
    </div>
    <div class="batch-right">
      <slot></slot>
      <span @click="batchOffShelves">{{offText}}</span>
      <!-- <span @click="batchShelves">上架</span> -->
      
    </div>
  </div>
</template>

<script>
export default {
  name: 'BatchOperation',
  props: {
    offText: {
      type: String,
      default: '下架',
    }
  },
  methods: {
    pageAll() {
      this.$emit('pageAll')
    },
    batchOffShelves() {
      this.$emit('batchOffShelves')
    },
    batchShelves() {
      this.$emit('batchShelves')
    },
  },
}
</script>

<style lang="scss" scoped>
.batch-box {
  display: flex;
  justify-content: space-between;
  color: #1890ff;
  align-items: center;
  height: 40px;
  font-size: 14px;
  background-color: #ededed;
  padding: 10px;
  .batch-left {
    >span {
      cursor: pointer;
    }
  }
  .batch-right {
    >span {
      margin-right: 20px;
      cursor: pointer;
    }
  }
}
</style>