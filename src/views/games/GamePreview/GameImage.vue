<template>
  <div class="gi-box" style="">
    <img v-if="platform === 'PS4' && isPlatform" class="gi-bg"  src="@/assets/OSLabel/PS4_BG.png" alt="">
    <img v-else-if="platform === 'PS3' && isPlatform" class="gi-bg" src="@/assets/OSLabel/PS3_BG.png" alt="">
    <img v-else-if="platform === 'PSV' && isPlatform" class="gi-bg" src="@/assets/OSLabel/PSV_BG.png" alt="">

    <div class="gi-image" style="">
      <!-- <my-image imgStyle="{{imgStyle}}" imageUrl="{{imgUrl}}" /> -->
      <!-- <img :src= alt=""> -->
      <ImageLarger :src="src" />
    </div>
  </div>
</template>

<script>
import ImageLarger from '@/components/ImageLarger'
export default {
  name: 'GameImage',
  components: {ImageLarger},
  props: {
    isPlatform: {
      type: Boolean,
      default: true,
    },
    platform: {
      type: String,
      default: '',
    },
    src: {
      type: String,
      default: '',
    }
  }
}
</script>