<template>
  <div class="gv-game-item-cont">
    <div class="gv-game-item-cont-left">
      <ImageLarger :src="games.game_info.cover" :l_src="games.game_info.cover" alt="" />
    </div>
    <div class="gv-game-item-cont-middle">
      <div class="gv-game-item-cont-middle-up">
        <div class="gv-game-item-cont-middle-up-game">
          <p>{{games.game_info.platform_name}} {{games.game_info.name}}</p>
          <p>{{games.game_info.area_name}} {{games.game_info.language_name}}</p>
        </div>
        <div class="gv-game-item-cont-middle-up-loca" v-if="games.disc_info">
          <p>盘编号：{{games.disc_info.serial || '-'}}</p>
          <p>货架号：{{games.disc_info.shelves || '-'}}</p>
        </div>
      </div>
    </div>
    <div class="gv-game-item-cont-right">
      <div class="gv-game-item-cont-right-price">
        <span>租金：{{Number(games.day_rent/100).toFixed(2)}}元/天</span>
        <span>租金：{{Number(games.deposit/100).toFixed(2)}}元</span>
      </div>
      <div class="gv-game-item-cont-right-btns">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import ImageLarger from '@/components/ImageLarger'
export default {
  name: 'GameView',
  components: {ImageLarger},
  props: {
    expressNo: {
      type: String,
      default: '',
    },
    games: {
      type: Object,
      default: () => {
        return {
          game_info: {},
          disc_info: {},
        }
      },
    }
  }
}
</script>

<style lang="scss" scoped>
.gv-game-item-cont {
    display: flex;
    &-left {
      width: 100px;
      height: 100px;
      flex-shrink: 0;
      margin-right: 30px;
      >img {
        width: 100%;
      }
    }
    &-right {
      flex: 1;
    }
    &-middle {
      margin-right: 150px;
      &-up {
        height: 80px;
        padding: 15px 0;
        color: #000;
        font-size: 14px;
        line-height: 24px;
        display: flex;
        &-game {
          margin-right: 80px;
        }
      }
    }
    &-right {
      padding: 15px 0;
      display: flex;
      justify-content: space-between;
      flex: 1;
      &-price {
        font-size: 14px;
        >span{
          margin-right: 10px;
        }
      }
      &-btns {
        color: #4C87F9;
        font-size: 14px;
        >span {
          cursor: pointer;
          margin-left: 4px;
        }
      }
    }
  }
</style>