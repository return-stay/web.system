<template>
  <div class="oss-box">
    <slot></slot>
  </div>
</template>


<script>
export default {
  name: 'OrderSteps',
  props: {
    active: Number,
    simple: Boolean,
    direction: {
      type: String,
      default: 'horizontal'
    }
  },
  data() {
    return {
      steps: [],
    }
  },
  watch: {
    active(newVal, oldVal) {
      this.$emit('change', newVal, oldVal);
    },

    steps(steps) {
      steps.forEach((child, index) => {
        child.index = index;
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.oss-box {
  display: flex;
  justify-content: space-between;
  white-space: nowrap;
}
</style>