<template>
  <div class="os-step" :class="`is-${$parent.direction}`">
    <div class="os-step_head" :class="finish?'is-finish':''">
      <div class="os-step_line" :class="finish?'is-line-finish':''"></div>
      <div class="os-step_icon" :class="finish?'is-finish':''">
        <svg-icon icon-class="duihao" />
      </div>
    </div>
    <div class="os-step_mian">
      <div class="os-step_title" :class="finish?'is-finish':''">{{title}}</div>
      <div class="os-step_description" :class="finish?'is-finish':''">{{description}}</div>
      <div class="os-step_description os-step_value" :class="finish?'is-finish':''" v-if="valueInfo" @click="valueClick">{{valueInfo}}</div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'OrderStep',
  components: {},
  props: {
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
    valueInfo: {
      type: String,
      default: '',
    },

  },
  data() {
    return {
      finish: false,
      index: -1
    }
  },
  computed: {
    isLast () {
      const parent = this.$parent;
      return parent.steps[parent.steps.length - 1] === this;
    }
  },
  beforeCreate() {
    this.$parent.steps.push(this);
  },

  beforeDestroy() {
    const steps = this.$parent.steps;
    const index = steps.indexOf(this);
    if (index >= 0) {
      steps.splice(index, 1);
    }
  },
  mounted() {
    const unwatch = this.$watch('index', () => {
      const activeIndex = this.$parent.active;
      this.$watch('$parent.active', this.updateStatus, { immediate: true });
      this.updateStatus(activeIndex);
      unwatch()
    })
  },
  methods: {
    updateStatus(val) {
      if(val > this.index) {
        this.finish = true
      }else {
        this.finish = false
      }
    },
    valueClick() {
      this.$emit('callback', this.valueInfo)
    },
  }
}
</script>

<style lang="scss">
.os-step {
  text-align: center;
  width: 25%;
  flex-shrink: 0;
  .os-step_head {
    font-size: 25px;
    width: 100%;
    position: relative;
    text-align: center;
    .os-step_line {
      position: absolute;
      border-color: inherit;
      background-color: #C0C4CC;
      height: 2px;
      top: 11px;
      width: 100%;
      left: 50%;
      right: -50%;
    }
    .is-line-finish {
      background-color: #1890ff;
    }
    .os-step_line_none {
      display: none;
    }
    .os-step_icon {
      position: relative;
      background-color: #fff;
      color: #C0C4CC;
      z-index: 1;
      width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto;
    }
  }
  .os-step_head.is-finish, .os-step_icon.is-finish {
    color: #1890ff;
    border-color: #1890ff;
  }
  .os-step_mian {
    text-align: center;
    color: #C0C4CC;
    .os-step_title {
      font-size: 16px;
      line-height: 38px;
    }
    .os-step_title.is-finish, .os-step_description.is-finish {
      color: #1890ff;
    }
    .os-step_description {
      margin-top: -5px;
      font-size: 12px;
      line-height: 20px;
      font-weight: normal;
    }
    .os-step_value {
      cursor: pointer;
    }
  }
}
.os-step:last-of-type .os-step_line  {
  display: none;
}
</style>