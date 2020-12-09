<template>
  <div class="sv-box">
    <div class="sv-title">
      <span class="sv-title-left">访问排行榜</span>

      <span class="sv-title-right" @click="detail">详情</span>
    </div>
    <el-table
      ref="filterTable"
      :data="visitList"
      style="width: 100%"
      >
        <el-table-column
          prop="day"
          label="界面/路径"
          align="center"
          :cell-style="{background: '#ccc'}"
          column-key="day">
          <template slot-scope="{row}">
            <div class="sv-table-td">
              <div class="sv-table-td-num" :style="'background-color:'+ row.background">{{row.index}}</div>
              <span>{{row.page_name}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="new_user_fee_vip_rate"
          label="浏览次数"
          align="center" >
          <template slot-scope="{row}">
            <div>
              <span>{{row.visit}}</span>
            </div>
          </template>
        </el-table-column>
         <el-table-column
          prop="new_user_fee_vip_rate"
          label="访问用户"
          align="center" >
          <template slot-scope="{row}">
            <div>
              <span>{{row.visit_user}}</span>
            </div>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
import utilMixin from './util-mixin'
export default {
  name: 'SortVisit',
  mixins: [ utilMixin ],
  data() {
    return {
      visitList: [],
    }
  },
  methods: {
    init(data) {
      this.getSortVisitList(data)
    },
     // 获取访问排行榜
    getSortVisitList(data) {
      const that = this
      this.getRequest({url: '/page/sort/visit.list', params: data }, (list) => {
        for(let i = 0;i<list.length;i++) {
          list[i].index = i + 1
          if(i === 0) {
            list[i].background = '#f7cfce'
          } else if (i === 1) {
            list[i].background = '#a4c9fa'
          }else {
            list[i].background = '#ededed'
          }
          
        }
        that.visitList = list
      })
    },
    detail() {
      this.$router.push({
        path: '/interfaceSummary/index',
        query: {
          type: 'visit'
        }
      })
    }
  }
}
</script>

<style>
.sv-box .el-table th {
  background-color: #ededed;
}
</style>

<style lang="scss" scoped>

.sv-box {
  height: 100%;
  box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.5);
  background-color: #fff;
  padding: 0 10px 10px;
  border-radius: 6px;
  .sv-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    &-left {
      font-size: 16px;
      font-weight: 500;
      color: #000;
    }
    &-right {
      font-size: 14px;
      color: #0188fb;
      cursor: pointer;
    }
  }

  .sv-table-td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-num {
      height: 40px;
      width: 40px;
      background-color: #ededed;
      line-height: 40px;
      color: #000;
    }
  }
}
</style>