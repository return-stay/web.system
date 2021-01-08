<template>
  <div class="il-box">
    <img class="img-larger" :src="src" :alt="alt" @click="largerImg">
    <div class="img-larger-box" v-if="largerShow" @click="largerHide">
      <img class="img-larger-image" src="" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageLarger',
  props: {
    src: {
      type: String,
      default: '',
    },
    alt: {
      type: String,
      default: '',
    },
    isLarger: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      largerShow: false,
    }
  },
  methods: {
    largerHide() {
      this.largerShow = false
    },
    largerImg() {
      this.largerShow = true
    },
  }
}
</script>

<style lang="scss" scoped>
.il-box {
  width: 100%;
  height: 100%;
  .img-larger {
    width: 100%;
  }
  .img-larger-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: rgba(0,0,0,.45);
    display: flex;
    align-items: center;
    justify-content: center;
    .img-larger-image {
      width: 60%;
    }
  }
}

</style>