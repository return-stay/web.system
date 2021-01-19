<template>
  <div class="steps-box">
    <div class="step" v-for="(item, index) in stepList" :key="item.id" @click="stepClick(item.label)">
      <div :class="dataAction === item.label ? 'step-after step-after-action': 'step-after'">
        <div v-if="index !== 0" class="step-after-bd"></div>
      </div>
      <div :class="dataAction === item.label?'step-text step-text-action': 'step-text'">{{item.value}}</div>
      <div :class="dataAction === item.label?'step-before step-before-action': 'step-before'"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Steps',
  props: {
    action: {
      type: String,
      default: '0'
    },
    stepList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      dataAction: this.action,
    }
  },
  methods: {
    next(n) {
      this.stepClick(n)
    },
    stepClick(label) {
      this.dataAction = label
      this.$emit('change', label)
    }
  }
}
</script>

<style lang="scss" scoped>
.steps-box {
  background-color: #fff;
  display: flex;
  .step {
    cursor: pointer;
    flex: 1;
    height: 50px;
    display: flex;
    font-size: 18px;
    &-after, &-before {
      width: 50px;
      height: 50px;
      flex-shrink: 0;
    }
    &-text {
      flex: 1;
      text-align: center;
      height: 50px;
      line-height: 50px;
      color: #515151;
      background-color: #E4E4E4;
    }
    &-text-action {
      background-color: #4C87F9;
      color: #fff;
    }

    &-after {
      background-color: #E4E4E4;
      &-bd {
        border: 25px solid transparent;
        border-right: none;
        border-left: 50px solid #fff;
      }
    }
    &-after-action {
      background-color: #4C87F9;
    }

    &-before {
      border: 25px solid transparent;
      border-right: none;
      border-left: 50px solid #E4E4E4;
    }
    &-before-action {
      border-left: 50px solid #4C87F9;
    }
  }

}
</style>