<template>
  <div class="bs-box">
    <div class="bs-top">
      <span>{{ title }}（{{getTimeForam}}）</span>
      <div class="bs-content">
        <i class="el-icon-date" />
        <span>筛选月份</span>
        <div class="block">
          <!-- <span class="demonstration">带快捷选项</span> -->
          <el-date-picker
            v-model="value2"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions">
          </el-date-picker>
        </div>
      </div>
    </div>

    <div>
      <el-table
        ref="filterTable"
        size="mini"
        border
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column
          prop="date"
          label="日期"
          sortable
          :cell-style="{background: '#ccc'}"
          width="180"
          column-key="date"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          width="180">
          <template slot="header">
            <div class="table-column-header">
              <span>订单数</span>
              <!-- <i class="el-icon-info"></i> -->
              <el-tooltip class="item" effect="dark" content="提示文字" placement="bottom-end">
                <i class="el-icon-info"></i>
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="租金收入"
          width="180">
        </el-table-column>

        <el-table-column
          prop="name"
          label="会员卡收入"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="新增用户数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="回访用户数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="会员卡付费用户数"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="罚金收入"
          width="180">
        </el-table-column>
      </el-table>
      <div class="pagination-block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          :layout="pageLayout"
          :total="pageTotal">
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
import tableMixins from '@/mixins/tableMixins'
import moment from 'moment'
export default {
  name: 'BusinessSummary',
  mixins: [tableMixins],
  data() {
    return {
      title: '订单汇总',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      value2: '',
    }
  },
  computed: {
    getTimeForam () {
      let time = this.value2 || new Date()
      return moment(time).format("YYYY年MM月")
    }
  },
  mounted() {

  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    }
  }
}
</script>

<style lang="scss" scoped>
.bs-box {
  margin: 16px;
  position: relative;
  .bs-top {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .bs-content {
      position: relative;
      font-size: 14px;
      cursor: pointer;
      .block {
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
      }
    }
  }
  .table-column-header {
    display: flex;
    align-items: center;
    position: relative;
    .el-icon-info {
      position: absolute;
      right: 0;
    }
  }
}

</style>
