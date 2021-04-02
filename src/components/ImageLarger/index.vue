<template>
  <div class="il-box">
    <img class="img-larger" :style="imgstyle" :src="showSrc" :alt="alt" @click="largerImg">
    <div class="img-larger-box" v-if="largerShow" @click="largerHide">
      <img class="img-larger-image" :src="IMG_URL + l_src" alt="">
    </div>
    
  </div>
</template>

<script>
import {IMG_URL} from '@/api/api'
export default {
  name: 'ImageLarger',
  props: {
    src: {
      type: String,
      default: '',
    },
    fit: {
      type: String,
      default: '',
    },
    l_src: {
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
    },
    imgstyle: {
      type: String,
      default: 'width: 100%;'
    }
  },
  computed: {
    showSrc() {
      let dSrc= this.src
      let str = ''
      if(dSrc && dSrc.indexOf('http')>-1) {
        str = dSrc + '?t=' + (new Date().getTime())
      }else {
        str = IMG_URL + dSrc + '?t=' + (new Date().getTime())
      }
      return str
    },
  },
  data() {
    return {
      IMG_URL: IMG_URL,
      largerShow: false,
    }
  },
  methods: {
    largerHide() {
      this.largerShow = false
    },
    largerImg() {
      if(this.l_src) {
        this.largerShow = true
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.il-box {
  width: 100%;
  height: 100%;
  .img-larger-box {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    background-color: rgba(0,0,0,.45);
    display: flex;
    align-items: center;
    justify-content: center;
    .img-larger-image {
      width: 50%;
    }
  }
}

</style>