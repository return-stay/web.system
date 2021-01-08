<template>
  <div class="v-box">
    <div class="v-select">
      <div class="v-left">
        <h1>荤菜种类</h1>
        <div class="v-list">
          <div v-for="item in vegetableDishes" class="v-list-li" :key="item.id">{{item.name}}</div>
        </div>
      </div>
      <div class="v-right">
        <h1>素菜种类</h1>
        <div class="v-list">
          <div v-for="item in meatDish" class="v-list-li" :key="item.id">{{item.name}}</div>
        </div>
      </div>
    </div> 

    <div>
      <el-button type="primary" @click="randomSelection">随机选择</el-button>
    </div>

    <div class="v-determine">
      <h1>选中的菜</h1>

      <div class='v-work'>
        <div class="v-work-item">
          <div class="v-work-item-w">
            <p>星期</p>
            <p v-for="item in workArr" :key='item'>{{item}}</p>

          </div>
          

          <div class="v-work-item-m">
            <p>菜</p>

            <p v-for="(mitem, index) in dishList" :key="index">
              <span v-for="i in mitem" style="marginRight: 10px" :key='i.id'>{{i.name}}</span>
            </p>

          </div>
          <!-- <div class="v-work-item-v">
            <p>荤菜</p>
            <p v-for="item in chosenVegetableDishes" :key="item.id">{{item.name}}</p>
          </div>
          <div class="v-work-item-m">
            <p>素菜</p>
            <p v-for="(mitem, index) in chosenMeatDish" :key="index">
              <span v-for="i in mitem" style="marginRight: 10px" :key='i.id'>{{i.name}}</span>
            </p>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Vegetables',
  data() {
    return {
      dishList: [],
      meatDish: [],
      vegetableDishes: [],
      chosenVegetableDishes: [],
      chosenMeatDish: [],
      workArr: ['周一', '周二', '周三', '周四', '周五'],
    }
  },

  mounted() {
    this.setDish()
  },
  methods: {
    setDish () {
      this.meatDish = [
        {
          id: 101,
          name: '地三鲜',
          type: '',
          materials: '',
        },
        {
          id: 102,
          name: '红烧茄子',
          type: '红烧',
          materials: '茄子',
        },
        {
          id: 103,
          name: '西红柿炒鸡蛋',
          type: '',
          materials: '鸡蛋',
        },
        {
          id: 104,
          name: '黄瓜鸡蛋',
          type: '',
          materials: '鸡蛋',
        },
        {
          id: 105,
          name: '洋葱鸡蛋',
          type: '',
          materials: '鸡蛋',
        },
        {
          id: 106,
          name: '尖椒鸡蛋',
          type: '',
          materials: '鸡蛋',
        },
        {
          id: 107,
          name: '家常豆腐',
          type: '',
          materials: '豆腐',
        },
        {
          id: 108,
          name: '清炒小白菜',
          type: '清炒',
          materials: '',
        },
        {
          id: 109,
          name: '清炒油菜',
          type: '清炒',
          materials: '',
        },
        {
          id: 110,
          name: '清炒西兰花',
          type: '清炒',
          materials: '',
        },
        {
          id: 111,
          name: '炝炒圆白菜',
          type: '炝炒',
          materials: '圆白菜',
        },
        {
          id: 112,
          name: '芹菜炒香干',
          type: '',
          materials: '',
        },
        {
          id: 113,
          name: '干煸四季豆',
          type: '干煸',
          materials: '',
        },
        {
          id: 114,
          name: '醋溜白菜',
          type: '',
          materials: '白菜',
        },
        {
          id: 115,
          name: '虎皮尖椒',
          type: '',
          materials: '',
        },
        {
          id: 116,
          name: '酸辣土豆丝',
          type: '',
          materials: '土豆',
        },
        {
          id: 117,
          name: '孜然土豆片',
          type: '',
          materials: '土豆',
        },
        {
          id: 118,
          name: '干锅菜花',
          type: '干锅',
          materials: '',
        },
        {
          id: 119,
          name: '菠菜炒鸡蛋',
          type: '',
          materials: '鸡蛋',
        },
        {
          id: 120,
          name: '摊鸡蛋',
          type: '',
          materials: '鸡蛋',
        },
        {
          id: 121,
          name: '孜然杏鲍菇',
          type: '',
          materials: '杏鲍菇',
        },
        {
          id: 122,
          name: '干锅土豆片',
          type: '干锅',
          materials: '土豆',
        },
        {
          id: 124,
          name: '豆腐白菜金针菇煲',
          type: '',
          materials: '豆腐',
        },
        {
          id: 125,
          name: '尖椒豆皮',
          type: '',
          materials: '尖椒',
        },
        {
          id: 127,
          name: '香菜土豆',
          type: '',
          materials: '土豆',
        },
        // {
        //   id: 128,
        //   name: '干锅包菜',
        //   type: '干锅',
        //   materials: '包菜',
        // },
        {
          id: 129,
          name: '蒜苔鸡蛋',
          type: '',
          materials: '鸡蛋',
        },
        {
          id: 130,
          name: '酱汁鸡蛋',
          type: '',
          materials: '鸡蛋',
        },
        {
          id: 131,
          name: '尖椒土豆片',
          type: '',
          materials: '土豆',
        },
        {
          id: 132,
          name: '韭菜小河虾',
          type: '',
          materials: '韭菜',
        },
        {
          id: 133,
          name: '紫菜鸡蛋汤',
          type: '汤',
          materials: '',
        },
        {
          id: 134,
          name: '西红柿鸡蛋汤',
          type: '汤',
          materials: '',
        },
        {
          id: 135,
          name: '嫩豆腐汤',
          type: '汤',
          materials: '',
        },
        {
          id: 136,
          name: '冬瓜海米汤',
          type: '汤',
          materials: '',
        }
      ]
      this.vegetableDishes = [
        {
          id: 201,
          name: '红烧肉',
          type: '红烧',
          materials: '',
        },
        {
          id: 202,
          name: '红烧排骨',
          type: '红烧',
          materials: '排骨',
        },
        {
          id: 203,
          name: '清炖排骨',
          type: '',
          materials: '排骨',
        },
        {
          id: 204,
          name: '酱牛肉',
          type: '',
          materials: '',
        },
        {
          id: 205,
          name: '红烧牛腩',
          type: '',
          materials: '',
        },
        {
          id: 206,
          name: '红烧鸡腿',
          type: '',
          materials: '',
        },
        {
          id: 207,
          name: '红烧大黄鱼',
          type: '',
          materials: '',
        },
        {
          id: 208,
          name: '红烧带鱼',
          type: '',
          materials: '',
        },
        {
          id: 209,
          name: '三杯鸡',
          type: '',
          materials: '',
        },
        {
          id: 210,
          name: '酱油鸡',
          type: '',
          materials: '',
        },
        {
          id: 211,
          name: '清炖三黄鸡',
          type: '',
          materials: '',
        },
        {
          id: 212,
          name: '豆角炒肉',
          type: '',
          materials: '',
        },
        {
          id: 213,
          name: '黄瓜炒肉',
          type: '',
          materials: '',
        },
        {
          id: 214,
          name: '青椒炒肉',
          type: '',
          materials: '',
        },
        {
          id: 215,
          name: '宫爆鸡丁',
          type: '',
          materials: '',
        },
        {
          id: 216,
          name: '鱼香肉丝',
          type: '',
          materials: '',
        },
        {
          id: 217,
          name: '水煮肉片',
          type: '',
          materials: '',
        },
        {
          id: 218,
          name: '土豆肥牛',
          type: '',
          materials: '',
        },
        {
          id: 219,
          name: '蒜苔炒肉',
          type: '',
          materials: '',
        },
      ]
    },

    randomSelection () {
      this.setRandomDish()
      const chosenMeatDish = this.chosenMeatDish, chosenVegetableDishes = this.chosenVegetableDishes
      const dishlength = chosenMeatDish.length;
      let dishList = []

      for(let i = 0;i<dishlength;i++) {
        let rn = Math.floor(Math.random() * dishlength)
        chosenMeatDish[i].splice(rn, 0, chosenVegetableDishes[i]);
        dishList.push(chosenMeatDish[i])
      }
      this.dishList = dishList
    },

    setRandomDish() {
      this.meatDishRandom()
      this.vegetableDishesRandom()
    },
    // 随机选出的一周素菜
    meatDishRandom (){
      let chosenMeatDish = []
      // debugger
      for(let i = 0; i < 5; i++) {
        chosenMeatDish.push(this.dayMeatDish())
      }
      this.chosenMeatDish = chosenMeatDish
    },

    // 随机选择素菜 meatDishSubs 所有可选择的素菜  days 当天选中的所有素菜
    randomMeatDish(meatDishSubs, days) {
      // console.log(meatDishSubs)
      let randomNum = Math.floor(Math.random()*(meatDishSubs.length))
      const meatDishSubsItem = meatDishSubs[randomNum]
      if(days.length>0) {
        const isDay = this.judgmentDayMeatDish(meatDishSubsItem, days)
        if(isDay) {
          return {meatDishItem: meatDishSubsItem, randomNum}
        } else {
          meatDishSubs.splice(randomNum, 1)
          return this.randomMeatDish(meatDishSubs, days)
        }
      }else {
        return {meatDishItem: meatDishSubsItem, randomNum}
      }

    },
    // 每天的素菜
    dayMeatDish () {
      const meatDish = this.meatDish
      let meatDishSubs = JSON.parse(JSON.stringify(meatDish))
      let dayChosenMeatDish = []
      for(let i = 0; i < 3 ; i++) {
        const {meatDishItem, randomNum} = this.randomMeatDish(meatDishSubs, dayChosenMeatDish)
        dayChosenMeatDish.push(meatDishItem)
        meatDishSubs.splice(randomNum, 1)
      }
      return dayChosenMeatDish
    },
    // 判断选中的菜 在当天是否有同类型， 同材料   chosenItem 选中的菜  days 当天的所有菜
    judgmentDayMeatDish (chosenItem, days) {
      let bool = true
      // 三种情况 1. type materials  都为空  2. type 为空  3. materials 为空
      if(!chosenItem.type && !chosenItem.materials) return true
      for(let i = 0;i<days.length;i++) {
        if(!chosenItem.type && chosenItem.materials) {
          if(chosenItem.materials === days[i].materials) {
            bool = false
            return bool
          }
        }
        if(chosenItem.type && !chosenItem.materials) {
          if(chosenItem.type === days[i].type) {
            bool = false
            return bool
          }
        }
      }
      return bool
    },

    vegetableDishesRandom () {
        const vegetableDishes = this.vegetableDishes
        let chosenVegetableDishes = []
        let vegetableDishesSubs = JSON.parse(JSON.stringify(vegetableDishes))
        for(let i = 0;i<5;i++) {
          let randomNum = Math.floor(Math.random()*(vegetableDishesSubs.length))
          chosenVegetableDishes.push(vegetableDishesSubs[randomNum])
          vegetableDishesSubs.splice(randomNum, 1)
        }
        this.chosenVegetableDishes = chosenVegetableDishes
    }
  }
}
</script>

<style lang="scss" scoped>
.v-box {
  padding: 20px;
  .v-select {
    display: flex;
    >div {
      padding: 30px;
      width: 50%;
      flex-shrink: 0;
      text-align: center;
      display: flex;
      flex-direction: column;
      > h1 {
        height: 20px;
        line-height: 20px;
        flex-shrink: 0;
      }
      .v-list {
        flex: 1;
        // justify-content: space-between;
        &-li {
          display: inline-block;
          flex-shrink: 0;
          width: 140px;
          margin-bottom: 4px;
          height: 22px;
          line-height: 22px;
        }
      }
    }
  }
  .v-determine {
    text-align: center;
    margin-top: 20px;
    .v-work {
      padding-top: 20px;
      &-item {
        margin-bottom: 10px;
        display: flex;
        justify-content: center;
        &-w, &-v, &-m {
          flex-shrink: 0;
          display: inline-block;
          text-align: left;
          >p {
            margin-bottom: 10px;
          }
        }
        &-w {
          width: 60px;
          color: #000;
        }
        &-v {
          width: 160px;
        }
        &-m {
          width: 400px;
        }
      }
    }
  }
}
</style>