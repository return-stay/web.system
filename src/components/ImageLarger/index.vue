<template>
  <img class="img-larger" :src="src" :alt="alt" @click="largerImg">
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
    }
  },
  methods: {
    largerImg() {

    },
  }
}
</script>

<style lang="scss" scoped>
.img-larger {
  width: 100%;
}
</style>