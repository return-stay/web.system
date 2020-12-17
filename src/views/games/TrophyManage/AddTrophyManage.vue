<template>
  <div class="view-box ta-box">

    <div class="ta-game-list" v-if="tableData.length>0">
      <div class="ta-header" style="margin-bottom: 10px;">关联游戏</div>
      <game-table :border="false" :columns="columns" :tableData="tableData" @detail="detail" :isPagination="false" />
    </div>
    <el-form ref="form" :model="form" label-width="120px">
      <div class="ta-header">奖杯信息</div>
      <div class="ta-form">
        <el-form-item label="奖杯编号">
          <el-input size="small" placeholder="请输入奖杯编号" />
        </el-form-item>
        <el-form-item label="奖杯名称">
          <el-input size="small" placeholder="请输入奖杯名称" />
        </el-form-item>
        <el-form-item label="完成度">
          <el-select size="small" style="width: 100%;" v-model="form.region" placeholder="请选择完成度">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="白金奖杯">
          <el-select size="small" style="width: 100%;" v-model="form.region" placeholder="请选择白金奖杯">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="金奖杯">
          <el-select size="small" style="width: 100%;" v-model="form.region" placeholder="请选择金奖杯">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="银奖杯">
          <el-select size="small" style="width: 100%;" v-model="form.region" placeholder="请选择银奖杯">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="铜奖杯">
          <el-select size="small" style="width: 100%;" v-model="form.region" placeholder="请选择铜奖杯">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </div>
      
      <div class="ta-btns">
        <el-form-item style="margin-bottom: 0;" label-width="0px">
          <el-button type="primary" @click="onSubmit">确定添加</el-button>
          <!-- <el-button>取消</el-button> -->
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>


<script>
import GameTable from '@/components/TablePage/GameTable'
export default {
  name: 'AddTrophyManage',
  components: {GameTable},
  data() {
    return {
      columns: [
        {
          title: '奖杯编号',
          key: 'name',
          label: 'name',
          width: 100,
        },
        {
          title: '关联游戏',
          key: 'game',
          label: 'game',
          width: 240,
        },
         {
          title: '奖杯完成度',
          key: 'age',
          label: 'age',
          width: 100,
        },
        {
          title: '奖杯数量',
          key: 'age',
          label: 'age',
          width: 100,
        },
        {
          title: '平台',
          key: 'age',
          label: 'age',
          width: 100,
        },
        {
          title: '版本',
          key: 'age',
          label: 'age',
          width: 100,
        },
        {
          title: '语言',
          key: 'age',
          label: 'age',
          width: 100,
        },
        {
          title: '创建时间',
          key: 'age',
          label: 'age',
          width: 200,
          sort: true,
        },
        {
          title: '操作',
          key: 'lll',
          fixed: 'right',
          width: 120,
          render: [
            {
              fnName: 'edit',
              title: '编辑'
            },
            {
              fnName: 'operation',
              title: '停用'
            },
          ]
        }
      ],
      tableData: [],
      form: {
        region: '',
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
      console.log(this.form)
    },
    detail() {
      console.log("detail")
    }
  }
}
</script>

<style lang="scss">
.ta-form .el-form-item {
  margin-bottom: 14px;
}
</style>
<style lang="scss" scoped>
.ta-box {
  .ta-game-list {
    margin-bottom: 30px;
  }
  .ta-header {
    height: 40px;
    line-height: 40px;
    background-color: #F8F8F8;
    color: #2C2C2C;
    padding-left: 20px;
    margin-bottom: 20px;
  }
  .ta-form {
    width: 50%;
  }

  .ta-btns {
    height: 80px;
    margin-top: 20px;
    background-color: #FFF8CC;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>