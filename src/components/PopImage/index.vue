<template>
  <div class="pi-box" @mouseover.stop='pimouseover'>
    <div class="pi-img-box">
      <div class="pi-img-box-img">
        <img class="img-larger" :src="IMG_URL + src" :alt="alt" @click.stop="largerImg">
      </div>
      <div class="pi-img-pop" v-if="isPopShow" @mouseout.stop='pimoseout'>
        <i class="el-icon-zoom-in" @click.stop="largerImg"></i>
        <i class="el-icon-delete" @click.stop="deleteImage"></i>
      </div>
    </div>
    <div class="img-larger-box" v-if="largerShow" @click.stop="largerHide" @mouseover.stop='()=> {}'>
      <img class="img-larger-image" :src="IMG_URL + l_src" alt="">
    </div>
  </div>
</template>

<script>
import {IMG_URL} from '@/api/api'
import {postAjax} from '@/utils/ajax'
export default {
  name: 'PopImage',
  props: {
    src: {
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
    deleteUrl: { //删除请求地址
      type: String,
      default: '',
    },
    deleteData: {//删除请求参数
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      IMG_URL: IMG_URL,
      largerShow: false,
      isPopShow: false,
    }
  },
  methods: {
    pimouseover() {
      this.isPopShow = true
    },
    pimoseout() {
      this.isPopShow = false
    },
    deleteImage() {
      postAjax({
        url: this.deleteUrl,
        data: this.deleteData,
      }).then(res=> {
        console.log()
        if(res.code === 1) {
          this.$message.success('删除成功')
          this.$emit('callback')
        }
        
      })
    },
    largerHide() {
      this.largerShow = false
    },
    largerImg() {
      console.log('kkk')
      
      console.log('jjjj')
      this.largerShow = true
      this.isPopShow = false
    },
  }
}
</script>

<style lang="scss" scoped>
.pi-box {
  width: 100%;
  height: 100%;
  .pi-img-box {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    &-img {
      width: 100%;
    }
  .pi-img-pop {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    border-radius: 6px;
    padding: 0 16px;
    .el-icon-delete, .el-icon-zoom-in {
      color: #fff;
      cursor: pointer;
      font-size: 20px;
    }
  }
  
  }
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