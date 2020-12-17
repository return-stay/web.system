<template>
  <div class="gr-box">

    <div class="header">
      <Steps :action="stepAction" @change="stepsChange" ref="stepchild" />
    </div>

    <div class="gr-cont">
      <basic-info v-if="stepAction === '0'" @next="oneNext" />

      <inventory v-if="stepAction === '1'" @next="oneNext"  />

      <pricing v-if="stepAction === '2'" @puback="puback"  />
    </div>

  </div>
</template>

<script>
import Steps from '@/components/Steps'
import BasicInfo from './BasicInfo'
import Inventory from './Inventory'
import Pricing from './Pricing'
export default {
  name: 'GameRelease',
  components: { Steps, BasicInfo, Inventory, Pricing },
  data() {
    return {
      stepAction: '0',
    }
  },
  methods: {
    stepsChange(e) {
      this.stepAction = e
    },
    oneNext(n) {
      this.stepAction = n
      this.$refs.stepchild.next(n)
    },
    puback() {
      this.oneNext('0')
    },
  }
}
</script>

<style lang="scss">
@import './index.scss';
</style>

<style lang="scss" scoped>
.gr-box {
  padding: 16px;
  min-height: 100%;
  background-color: #fff;
  .gr-cont {
    margin-top: 14px;
  }
}
</style>